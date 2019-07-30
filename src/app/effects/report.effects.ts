import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as advancedSearchActions from './../actions/advanced-search.actions';
import * as reportActions from './../actions/report.actions';
import { ReportService } from './../services/report.service';
import { of } from 'rxjs';
import { debug } from 'util';

@Injectable()
export class ReportEffects {
  results : any =[];
  @Effect()
  loadMetaData$ =
    this.actions$.pipe(
      ofType(reportActions.LOAD_REPORT_DATA),
      mergeMap(result => this.reportService.getMetaData()
        .pipe(
        map(
          movies =>
            ({ type: reportActions.LOAD_REPORT_DATA_SUCCESS, payload: this.results })),
        catchError(() => of({ type: reportActions.LOAD_REPORT_DATA_FAILURE,  payload: this.results }))
        )
      )
    )

  constructor(
    private actions$: Actions,
    private reportService: ReportService
  ) {
    var result = {
      title: 'Store Mechanical systems fluids and waste products',
      strand:'2. safety tools',
      careerField: 'Trasportation',
      outcome: 'General Maintenance',
      competency: '2.4.12 Store Mechanical systems fluids and waste products',
      academicSubject: 'ELA',
      domain: 'Reading for information',
      grade: '11-12',
      standards:
        [
          { standardType: 'A', standardDesc: '1.R1.11-12.1 Cite strong and through texual evidence' },
          { standardType: 'R', standardDesc: '1.R1.11-12.1 Cite strong and through texual evidence' },
          { standardType: 'E', standardDesc: '1.R1.11-12.1 Cite strong and through texual evidence' },
          { standardType: 'E', standardDesc: '1.R1.11-12.1 Cite strong and through texual evidence' }
        ]
    };
    this.results.push(result);
    this.results.push(result);
    this.results.push(result);
    this.results.push(result);
    this.results.push(result);


  }

}

