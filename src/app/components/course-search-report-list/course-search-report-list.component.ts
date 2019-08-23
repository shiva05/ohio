import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from './../../app.state';
import * as ReportsActions from './../../actions/report.actions';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-course-search-report-list',
  templateUrl: './course-search-report-list.component.html',
  styleUrls: ['./course-search-report-list.component.css']
})
export class CourseSearchReportListComponent implements OnInit {

  results: any = [];
  reportListhResultData: any = [];
  @Output() onPageSelect = new EventEmitter<any>();
  constructor(private store: Store<AppState>, private reportService: ReportService) {
  }
  ngOnInit() {
    console.log('app-course-search-report-list');
    this.store.select('courseSearch').subscribe(data => {
      if (data.courseSearchSelectedFilters.selectedCourseSearchResults) {
        var objTemp = data.courseSearchSelectedFilters.selectedCourseSearchResults;
        this.reportService.getCourseSearchReportData(objTemp).subscribe(
          data => {
            this.reportListhResultData = data;
          },
          err => {
          });
      }
    });
  }
  goToPage(org) {
    this.onPageSelect.emit(org);
  }
  calculateStrandClasses(type) {
    var strandClasses = {
      'A': 'legend-application',
      'R': 'legend-reinforcement',
      'E': 'legend-enrichment'
    };
    return strandClasses[type];
  }
}
