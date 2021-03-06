import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  constructor(private http: AppHttpService) { }

  getReportData(obj) {
    return this.http.post(environment.GetReportData, obj);
  }

  getCourseSearchReportData(obj) {
    return this.http.post(environment.GetCourseSearchReportData, obj);
  }
}
