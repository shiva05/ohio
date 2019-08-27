import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from './../../app.state';
import * as ReportsActions from './../../actions/report.actions';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  academicSubjectColorPallet: any = [
    {
      Subject: 'Math',
      Color: '#000000'
    },
    {
      Subject: 'ELA',
      Color: '#5E8000'
    },
    {
      Subject: 'Science',
      Color: '#BF181A'
    },
    {
      Subject: 'Social',
      Color: '#0B5688'
    }
  ]
  results: any = [];
  reportListhResultData: any = [];
  @Output() onPageSelect = new EventEmitter<any>();
  constructor(private store: Store<AppState>, private reportService: ReportService) {
  }
  ngOnInit() {
    this.store.select('advancedSearch').subscribe(data => {
      if (data.alignmentSearchSelectedFilters) {
        let objTemp = data.alignmentSearchSelectedFilters.selectedAsSearchResults;
        this.reportService.getReportData(objTemp).subscribe(
          data => {
            this.reportListhResultData = data;
            this.reportListhResultData.Competencies.forEach((element) => {
              this.academicSubjectColorPallet.forEach((item) => {
                if (element.AcademicSubject === item.Subject) {
                  element['Color'] = item.Color;
                }
              });
            });
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
    let strandClasses = {
          A: 'legend-application',
          R: 'legend-reinforcement',
          E: 'legend-enrichment'
    };
    return strandClasses[type];
}
}
