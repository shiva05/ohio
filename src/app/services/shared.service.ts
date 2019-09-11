import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  data: any = [];
  updateAlignmentSearch = false;
  updateCourseSearch = false;
  constructor() { }
}
