import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdvancedSearchService {
  constructor (private http: HttpClient) {}

  getMetaData() {
    return this.http.get('http://edu-dev-sbd-alignmentsearch.azurewebsites.net/api/GetAlignmentMetaData?code=E1ya26DNWM67/EJxQQKsdDR/RtTdW0bt9FIhCptxwUY4i0XUaL9quA==');

  }
}
