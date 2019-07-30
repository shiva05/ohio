import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class QuickSearchService {
  constructor (private http: HttpClient) {}

  getMetaData() {
    return this.http.get('/movies');

  }
}
