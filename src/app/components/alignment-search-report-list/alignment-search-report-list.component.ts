import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/internal/operators/take';
import { AppState } from './../../app.state';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-alignment-search-report-list',
  templateUrl: './alignment-search-report-list.component.html',
  styleUrls: ['./alignment-search-report-list.component.css']
})

export class AlignmentSearchReportListComponent implements OnInit {
  academicSubjectColorPallet: any = [
    {
      SubjectId: 1,
      Subject: 'Math',
      Color: '#000000'
    },
    {
      SubjectId: 2,
      Subject: 'ELA',
      Color: '#5E8000'
    },
    {
      SubjectId: 3,
      Subject: 'Science',
      Color: '#BF181A'
    },
    {
      SubjectId: 4,
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
    this.store.select('advancedSearch').pipe(take(1)).subscribe(data => {
      if (data.alignmentSearchSelectedFilters && data.alignmentSearchSelectedFilters.selectedAsSearchResults && data.alignmentSearchSelectedFilters.selectedAsSearchResults.CareerFiledIds.length > 0 && data.alignmentSearchSelectedFilters.selectedAsSearchResults.Subjects.length > 0) {
        let objTemp = data.alignmentSearchSelectedFilters.selectedAsSearchResults;
        this.reportService.getReportData(objTemp).subscribe(
          data => {
            this.reportListhResultData = data;
            if (this.reportListhResultData.Competencies.length === 0 && this.reportListhResultData.Standards.length === 0) {
              this.localReportErr = true;
              this.reportFail.emit();
            }
            this.reportListhResultData.Competencies.forEach((element) => {
              this.academicSubjectColorPallet.forEach((item) => {
                if (element.AcademicSubject === item.Subject) {
                  element['Color'] = item.Color;
                }
              });
            });
          },
          err => {
            this.localReportErr = true;
            this.reportFail.emit();
          });
      } else {
        this.localReportErr = true;
        this.reportFail.emit();
      }
    });
  }

  findSubjectColor(SubjectId) {
    for (let i = 0; i < this.academicSubjectColorPallet.length; i++) {
      if (this.academicSubjectColorPallet[i].SubjectId === SubjectId) {
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
