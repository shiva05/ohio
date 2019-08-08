import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdvancedSearchService {
  constructor(private http: HttpClient) {}

  getMetaData() {
    return this.http.get(environment.GetAlignmentMetaData);
  }
  getCompetencyData(result) {
    var outcomeIds =[];
    result.forEach(element => {
      outcomeIds.push(element.OutcomePk);
    });
    return this.http.post(environment.GetCompetencyData,outcomeIds);
  }
}
