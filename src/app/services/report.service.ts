import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getReportData(obj) {
    var URL = 'https://edu-dev-sbd-commonfunctions.azurewebsites.net/api/GetCTEAlignmentSearchReport?code=Qjp8OlEY1C4fCfz6WD7F1C/nTLUkrDp2ieI7/tJJXeH9AZo4ioPauQ==';
    return this.http.post(URL,obj);
  }
  getCourseSearchReportData(obj){
    var URL = 'https://edu-dev-sbd-commonfunctions.azurewebsites.net/api/GetCourseSearchReport?code=zaotM7g/5ER2nfrpa9/l/TSIpAAyFw29vjPNiSAnI8lXjhuvPLw0Iw==';
    return this.http.post(URL,obj);
  }
}
