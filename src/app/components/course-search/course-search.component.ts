import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})

export class CourseSearchComponent implements OnInit {
  showCsFilter = true;
  showCsResults = false;
  showCsReport = false;

  constructor() { }

  ngOnInit() {
  }

  onPageSelect(org) {
    this.showCsFilter = false;
    this.showCsResults = false;
    this.showCsReport = false;
    if (org === 'Search') {
      this.showCsFilter = true;
    } else if (org === 'SearchResults') {
      this.showCsResults = true;
    } else if (org === 'CourseSearchReport') {
      this.showCsReport = true;
    }
  }
}
