import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { AppHttpService } from './app-http.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http: AppHttpService) {}

  getAll() {
    return this.http.get('/movies');
  }
}
