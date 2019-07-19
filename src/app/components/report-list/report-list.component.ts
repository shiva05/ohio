import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Test } from './../../models/test.model';
import { AppState } from './../../app.state';
import * as TestActions from './../../actions/test.actions';
import * as ReportsActions from './../../actions/report.actions';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  results: any = [];
  @Output() onPageSelect = new EventEmitter<any>();
  constructor(private store: Store<AppState>) {
    // this.metaData = store.select('metaData');
    this.store.dispatch({ type: ReportsActions.LOAD_REPORT_DATA });
  }
  ngOnInit() {
    const result = {
      title: 'Find surface area and volume for three‐dimensional objects, accurate to a specified level of precision',
      strand: 'Planning and Design',
      careerField: 'Construction',
      outcome: 'Construction Math',
      competency: 'Find surface area and volume for three‐dimensional objects, accurate to a specified level of precision',
      academicSubject: 'Math',
      domain: 'Circles',
      grade: 'Geometry',
      standards:
        [
          { standardType: 'A', standardDesc: 'G.C.4' },
          { standardType: 'R', standardDesc: 'G.C.5' },
          { standardType: 'E', standardDesc: 'G.C.6' }
        ]
    };
    this.results.push(result);
    const result1 = {
      title: 'Use economic indicators to identify economic trends and conditions (e.g., inflation, interest rate fluctuations, unemployment rates).',
      strand: 'Business Operations/21st Century Skills',
      careerField: 'Construction',
      outcome: 'Principles of Business Economics',
      competency: 'Use economic indicators to identify economic trends and conditions (e.g., inflation, interest rate fluctuations, unemployment rates).',
      academicSubject: 'Math',
      domain: 'Circles',
      grade: 'Geometry',
      standards:
        [
          { standardType: 'A', standardDesc: 'G.C.1' },
          { standardType: 'R', standardDesc: 'G.C.2' },
          { standardType: 'E', standardDesc: 'G.C.3' }
        ]
    };
    this.results.push(result1);
  }
  goToPage(org) {
    this.onPageSelect.emit(org);
  }
}
