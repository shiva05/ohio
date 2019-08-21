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
