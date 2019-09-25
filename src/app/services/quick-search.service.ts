import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppHttpService } from './app-http.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class QuickSearchService {
  constructor(private http: AppHttpService) {}

  getMetaData() {
    return this.http.get(environment.GetAlignmentMetaData);

  }
}
