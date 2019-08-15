import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from './../../app.state';
import * as ReportsActions from './../../actions/report.actions';
import {ReportService} from '../../services/report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  results: any = [];
  reportListhResultData :any =[];
  @Output() onPageSelect = new EventEmitter<any>();
  constructor(private store: Store<AppState>,private reportService :ReportService) {
    // this.metaData = store.select('metaData');
    //this.store.dispatch({ type: ReportsActions.LOAD_REPORT_DATA });
  }
  ngOnInit() {
    this.store.select('advancedSearch').subscribe(data => {
      if (data.alignmentSearchSelectedFilters) {
        var objTemp =  data.alignmentSearchSelectedFilters.selectedAsSearchResults;
        this.reportService.getReportData(objTemp).subscribe(
          data => {
            debugger
            this.reportListhResultData =data["Competencies"];
            // this.searchResultData =data;
            // this.searchResultDataArray.push(this.searchResultData);
            // this.formatSearchResultDataArray();
          },
          err => {
              // Log errors if any
              console.log(err);
          });
      }
    });
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
          { standardType: 'A', standardDesc: '1. RI.11-12.1 Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text, including determining where the text leaves matters uncertain ' },
          {
            standardType: 'R', standardDesc: `2. RI.11-12.2 Analyze informational text development.
            a. Determine two or more central ideas of a text and analyze their development over the course of the text, including how they interact and build on one another.
            b.Craft an informative abstract that delineates how the central ideas of a text interact and build on one another` },
          { standardType: 'E', standardDesc: '3. RI.11-12.3 Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text, including determining where the text leaves matters uncertain' }
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
          { standardType: 'A', standardDesc: '1. RI.11-12.1 Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text, including determining where the text leaves matters uncertain ' },
          {
            standardType: 'R', standardDesc: `2. RI.11-12.2 Analyze informational text development.
            a. Determine two or more central ideas of a text and analyze their development over the course of the text, including how they interact and build on one another.
            b.Craft an informative abstract that delineates how the central ideas of a text interact and build on one another` },
          { standardType: 'E', standardDesc: '3. RI.11-12.3 Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text, including determining where the text leaves matters uncertain' }
        ]
    };
    this.results.push(result1);
  }
  goToPage(org) {
    this.onPageSelect.emit(org);
  }
}
