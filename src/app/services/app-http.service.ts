import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';
import * as cuid from 'cuid';
import { Store } from '@ngrx/store';
import { Reducers } from '../reducers';
import { AppState } from './../app.state';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

    authJwt = '';
    claimsJwt = '';

    constructor(private http: HttpClient, private store: Store<AppState>) {

      this.store.select(appState => appState.authState).subscribe(authJwt => {
        // console.log('authJwt', authJwt);

        this.authJwt = authJwt.authJwt;
      });
      this.store.select(appState => appState.claimsState).subscribe(claimsJwt => {

        // console.log('claimsJwt', claimsJwt);
        if (claimsJwt !== null) {

            this.claimsJwt = claimsJwt.claimsJwt;
        }
      });
    }

    get(url: string, reqObject: any = null) {
      if (reqObject != null) {
        url += '?' + this.objectToParams(reqObject);
      }

      return this.http.get(url, this.getHeaders());
   }

    getFile(url: string, reqObject: any = null) {
      if (reqObject != null) {
        url += '?' + this.objectToParams(reqObject);
      }

      return this.http.get(url, this.getFileHeaders());
    }

    post(url: string, data: any) {
        return this.http.post(url, data, this.getHeaders());
    }

    put(url: string, data: any) {
        return this.http.put(url, data, this.getHeaders());
    }

    delete(url: string) {
        return this.http.delete(url, this.getHeaders());
    }
    getPDFFile(url: string, data: any) {
    return this.http.post(url, data, this.getFileHeaders());
     }

    getHeaders() {
        const rid = cuid();
        let headerOptions: any = {
            'x-requestid': rid
        };
        if (this.authJwt !== '' && this.authJwt) {
            const authObj = { authorization: 'Bearer ' + this.authJwt };
            headerOptions = { ...headerOptions, ...authObj };
        }
        if (this.claimsJwt !== '' && this.claimsJwt) {
            const claimsObj = { Claims: this.claimsJwt };
            headerOptions = { ...headerOptions, ...claimsObj };
        }

        return { headers: new HttpHeaders(headerOptions) };
    }

    getFileHeaders() {
      const rid = cuid();
      let headerOptions: any = {
          'x-requestid': rid
      };
      if (this.authJwt !== '') {
          const authObj = { authorization: 'Bearer ' + this.authJwt };
          headerOptions = { ...headerOptions, ...authObj };
      }
      if (this.claimsJwt !== '') {
          const claimsObj = { Claims: this.claimsJwt };
          headerOptions = { ...headerOptions, ...claimsObj };
      }

      // headerOptions = { ...headerOptions, 'Accept': 'application/pdf' };
      // headerOptions = { ...headerOptions, 'Accept': 'text/plain' };
      // headerOptions = { ...headerOptions, 'Accept': 'image/png' };

      // observe: 'response' as 'body', // return header info + data
      // responseType: 'arraybuffer' as 'json'  // return type for binary data

      // let type0 = ResponseContentType.Text; // 0
      // let type1 = ResponseContentType.Json; // 1
      // let type2 = ResponseContentType.ArrayBuffer; // 2
      // let type3 = ResponseContentType.Blob; // 3

      const options = {
        headers: new HttpHeaders(headerOptions),
        observe: 'body' as 'body', // return data only
        responseType: 'blob' as 'json' // return type for binary data; json is default
      };

      return options;
    }

    objectToParams(obj: any) {

      const params = new URLSearchParams();
      for (const key in obj) {
        params.set(key, obj[key]);
      }
      return params.toString();
    }

}
