import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class SearchResultService {

    constructor(private http: HttpClient) { }

    getSearchResultData(payload) {
        var URL = 'https://edu-dev-sbd-commonfunctions.azurewebsites.net/api/SearchAlignments?code=wyCpr8XXH2VJEOTx9OLB1E2URsGMi7rOJ3xNTYipccXbGkVodBXd0A==';
        return this.http.post(URL, payload);
    }

    getCourseSearchResult(payload) {
        var URL = 'https://edu-dev-sbd-commonfunctions.azurewebsites.net/api/GetCourseSearchResults?code=gQisfH5rAr8gU64EymE4N3eXE6h0YNKqGfKLDzdZaHmr6Im2kGvH7g==';
        return this.http.post(URL, payload);
    }
}
