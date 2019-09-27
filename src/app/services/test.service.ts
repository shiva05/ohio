import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';

@Injectable({
  providedIn: 'root'
})

export class TestService {
  constructor(private http: AppHttpService) { }

  getAll() {
    return this.http.get('/movies');
  }
}
