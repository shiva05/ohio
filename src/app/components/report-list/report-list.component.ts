import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './../../app.state';
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
  ];
  results: any = [];
  reportListhResultData: any = [];

  localReportErr: boolean = false;
  @Output() reportFail = new EventEmitter<any>();
  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private store: Store<AppState>, private reportService: ReportService) { }

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
            console.log('Report FAILED');
            this.localReportErr = true;
            this.reportFail.emit();
          });
      }
    });
  }

  findSubjectColor(subject) {
    for (let i = 0; i < this.academicSubjectColorPallet.length; i++) {
      if (this.academicSubjectColorPallet[i].Subject === subject) {
        return this.academicSubjectColorPallet[i].Color;
      }
    }
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
