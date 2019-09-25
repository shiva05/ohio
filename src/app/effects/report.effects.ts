import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as reportActions from './../actions/report.actions';
import { ReportService } from './../services/report.service';
import { of } from 'rxjs';

@Injectable()

export class ReportEffects {
  results: any = [];

  @Effect()
  loadMetaData$ =
    this.actions$.pipe(
      ofType(reportActions.LOAD_REPORT_DATA),
      mergeMap(result => this.reportService.getReportData(result)
        .pipe(
          map(
            data =>
              ({ type: reportActions.LOAD_REPORT_DATA_SUCCESS, payload: data })),
          catchError(() => of({ type: reportActions.LOAD_REPORT_DATA_FAILURE, payload: result }))
        )
      )
    );

  constructor(private actions$: Actions, private reportService: ReportService) { }
}
