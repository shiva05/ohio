import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor (private http: HttpClient) {}

  getAll() {
    return this.http.get('/movies');
  }
}