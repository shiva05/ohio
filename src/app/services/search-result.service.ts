import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class SearchResultService {
    constructor(private http: HttpClient) { }

    getSearchResultData() {
        return this.http.get('/movies');
    }
}
