import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './../../app.state';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-course-search-report-list',
  templateUrl: './course-search-report-list.component.html',
  styleUrls: ['./course-search-report-list.component.css']
})

export class CourseSearchReportListComponent implements OnInit {
  results: any = [];
  reportListhResultData: any = [];
  localReportErr: boolean = false;
  @Output() reportFail = new EventEmitter<any>();
  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private store: Store<AppState>, private reportService: ReportService) { }

  ngOnInit() {
    this.store.select('courseSearch').subscribe(data => { 
      if (data.courseSearchSelectedFilters.selectedCourseSearchResults) {
        let objTemp = data.courseSearchSelectedFilters.selectedCourseSearchResults;
        this.reportService.getCourseSearchReportData(objTemp).subscribe(
          data => {
            this.reportListhResultData = data;
          },
          err => {
            console.log('Report FAILED');
            this.localReportErr = true;
            this.reportFail.emit();
          });
      } else {
        console.log('Report FAILED');
        this.localReportErr = true;
        this.reportFail.emit();
      }
    });
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }

  calculateStrandClasses(type) {
    let strandClasses = {
      A: 'legend-application',
      R: 'legend-reinforcement',
      E: 'legend-enrichment'
    };
    return strandClasses[type];
  }
}
