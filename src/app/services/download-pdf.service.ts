import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import { AppHttpService } from './app-http.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DownloadPDFService {

  constructor(private httpService: HttpClient) { }

  public getPDF(obj): Observable<Blob> {
    const uri = environment.GetDownloadedReport;
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.httpService.post(uri, obj, { responseType: 'blob' });
  }
}
