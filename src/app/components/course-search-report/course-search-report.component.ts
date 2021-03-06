import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DownloadPDFService } from '../../services/download-pdf.service';
import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';

import { AppState } from './../../app.state';
import { Router } from '@angular/router';
import { UtilsContext } from '../../models/utils-context';
import { DocsService } from '../../services/docs.service';
import * as UtilsActions from '../../actions/utils-actions';
import { take } from 'rxjs/internal/operators/take';
import { browserRefresh } from '../../app.component';
import * as CourseSearchActions from './../../actions/course-search.actions';

@Component({
  selector: 'app-course-search-report',
  templateUrl: './course-search-report.component.html',
  styleUrls: ['./course-search-report.component.css']
})

export class CourseSearchReportComponent implements OnInit {

  @Output() onPageSelect = new EventEmitter<any>();
  reportFail: boolean = false;
  nameDialogue: boolean = false;
  PDFName: string = '';
  isPublic: boolean = false;
  context: UtilsContext;
  public browserRefresh: boolean;
  courseSearchSelectedFilters: {};

  constructor(private downloadPDFService: DownloadPDFService, private store: Store<AppState>, public datepipe: DatePipe, private rout: Router, private docsService: DocsService) { }

  ngOnInit() {
    this.browserRefresh = browserRefresh;
    window.addEventListener('beforeunload', (event) => {
      alert("Refreshing will clear all of your search results.");
      event.preventDefault();
      event.returnValue = '';
    });

    if (this.browserRefresh === true) {
      this.rout.navigate(['']);
    }
    this.store.select('authState').subscribe((authState) => {
      if (authState != null) {
        this.isPublic = authState.isPublic;
      }
    });

    this.store.select('courseSearch').pipe(take(1)).subscribe(data => {
      this.courseSearchSelectedFilters = data.courseSearchSelectedFilters;
      // let validateLength = Object.keys(data.courseSearchSelectedFilters.selectedCourseSearchResults).length === 0;

      if (!data.courseSearchSelectedFilters.selectedCourseSearchResults) {
        this.rout.navigate(['/alignmentsearch']);
      }
    });
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }

  openNameDialogue() {
    this.nameDialogue = true;
  }

  public downloadPDF(): void {
    this.store.select('courseSearch').pipe(take(1)).subscribe(data => {
      if (data.courseSearchSelectedFilters) {
        const objTemp = data.courseSearchSelectedFilters.selectedCourseSearchResults;
        this.downloadPDFService.getCoursePDF(objTemp)
          .subscribe(x => {
            // It is necessary to create a new blob object with mime-type explicitly set
            // otherwise only Chrome works like it should
            const newBlob = new Blob([x], { type: 'application/pdf' });

            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(newBlob, 'Report.pdf');
              return;
            }

            // For other browsers:
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(newBlob);

            const link = document.createElement('a');
            link.href = data;

            let dataNow = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
            link.download = 'Course search Report ' + dataNow + '.pdf'; // There isn't that much of a reason to even think about what I'm doing and instead just do it because there isn't a
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(() => {
              // For Firefox it is necessary to delay revoking the ObjectURL
              window.URL.revokeObjectURL(data);
              link.remove();
            }, 100);
          });
      }
    });

  }

  clearCourseSearch() {
    delete this.courseSearchSelectedFilters['selectedCourseSearchResults'];
    this.store.dispatch({ type: CourseSearchActions.SAVE_CS_SELECTED_FILTERS, payload: this.courseSearchSelectedFilters });
    this.rout.navigate(['/CourseSearchResults']);
  }

  public saveToProfile(fileName: any): void {
    this.store.select('courseSearch').pipe(take(1)).subscribe(data => {
      if (data.courseSearchSelectedFilters) {
        const objTemp = data.courseSearchSelectedFilters.selectedCourseSearchResults;
        this.downloadPDFService.csSaveToProfile(objTemp, fileName)
          .subscribe(data => {
            this.store.select('utilsState').pipe(take(1)).subscribe((utilityState) => {
              if (utilityState && utilityState.utilityContext) {
                this.context = utilityState.utilityContext;
                if (utilityState.utilityContext !== null && utilityState.utilityContext.assetTemplateKey > 0 && utilityState.utilityContext.detailKey > 0
                  && utilityState.utilityContext.isDetailAsset != null && utilityState.utilityContext.isDetailAsset
                  && utilityState.utilityContext.moduleKey != null && utilityState.utilityContext.moduleKey > 0) {
                  this.docsService.fetchDocCount(this.context).subscribe((docCount: number) => {
                    if (docCount != null) {
                      this.store.dispatch(new UtilsActions.UtilsSetDocCount(docCount));
                    }
                  },
                    (error) =>
                      this.store.dispatch(new UtilsActions.UtilsSetDocCount(0)));
                }
              }
            });
          });
      }
    });
  }
}
