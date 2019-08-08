import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CourseSearchService {
    constructor(private http: HttpClient) { }

    getMetaData() {
        return this.http.get(environment.GetCourseMetaData);
    }
}
