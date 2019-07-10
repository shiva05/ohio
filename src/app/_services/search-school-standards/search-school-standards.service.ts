import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchSchoolStandardsService {
  private subject = new BehaviorSubject<any>('N/A');
  currentSubject = this.subject.asObservable();

  sendSearch(search: any) {
    this.subject.next({ text: search });
    console.log(search);
  }

  clearSearch() {
    // TODO Fill this out
    // this.subject.next();
  }

  getSearch(): Observable<any> {
    return this.currentSubject;
  }
}
