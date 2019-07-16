import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor (private http: HttpClient) {}

  getMetaData() {
    return this.http.get('/report');

  }
}
