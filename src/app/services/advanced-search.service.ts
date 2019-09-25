import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AdvancedSearchService {

  constructor(private http: AppHttpService) { }

  getMetaData() {
    return this.http.get(environment.GetAlignmentMetaData);
  }

  getCompetencyData(result) {
    let outcomeIds = [];
    result.forEach(element => {
      outcomeIds.push(element.OutcomePk);
    });
    return this.http.post(environment.GetCompetencyData, outcomeIds);
  }
}
