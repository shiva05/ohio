import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DownloadPDFService {

  constructor(private httpService: HttpClient) { }

  public getPDF(obj): Observable<Blob> {
    const uri = 'https://edu-dev-sbd-commonfunctions.azurewebsites.net/api/DownloadReport?code=PfEH7CvobnXFfZ41tJ9bLl/3c0kyKv/oposUqcDLkbr1IXjjTeqs2Q== ';
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.httpService.post(uri,obj,{ responseType: 'blob' },);
  }
}
