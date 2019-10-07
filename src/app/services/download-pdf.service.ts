import { Injectable } from '@angular/core';
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
  public asSaveToProfile(obj, fileName): Observable<any> {
    const uri = environment.AsSaveToProfile + '?moduleKey=32&detailKey=0&assetTemplateKey=242710&docType=1182&documentName=' + fileName;
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.httpService.post(uri, obj);
  }
  public csSaveToProfile(obj, fileName): Observable<any> {
    const uri = environment.CsSaveToProfile + '?moduleKey=32&detailKey=0&assetTemplateKey=242710&docType=1182&documentName=' + fileName;
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.httpService.post(uri, obj);
  }
  public getPermissions() {
    return this.httpService.get(environment.Auth_Assets + '?moduleKey=32&assetTemplateKey=242710&assetTypeName=doc' );
  }
}
