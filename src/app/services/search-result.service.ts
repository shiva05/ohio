import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppHttpService } from './app-http.service';

@Injectable({
    providedIn: 'root'
})

export class SearchResultService {

    constructor(private http: AppHttpService) { }

    getSearchResultData(payload) {
        return this.http.post(environment.GetSearchResultData, payload);
    }

    getCourseSearchResult(payload) {
      return this.http.post(environment.GetCourseSearchResult, payload);

    }
}
