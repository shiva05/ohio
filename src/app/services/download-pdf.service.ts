import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppHttpService } from './app-http.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DownloadPDFService {

  constructor(private httpService: AppHttpService) { }

  public getPDF(obj): Observable<any> {
    const uri = environment.GetDownloadedReport;
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.httpService.getPDFFile(uri, obj);
  }

  public getCoursePDF(obj): Observable<any> {
    const uri = environment.GetCourseSearchDownloadedReport;
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.httpService.getPDFFile(uri, obj);
  }
}
