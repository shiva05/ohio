import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as advancedSearchActions from './../actions/advanced-search.actions';
import { AdvancedSearchService } from './../services/advanced-search.service';
import { of } from 'rxjs';
import { debug } from 'util';

@Injectable()
export class AdvancedSearchEffects {

  @Effect()
  loadMetaData$ =
    this.actions$.pipe(
      ofType(advancedSearchActions.LOAD_META_DATA),
      mergeMap(result => this.advancedSearchService.getMetaData()
        .pipe(
        map( movies =>
            ({ type: advancedSearchActions.LOAD_META_DATA_SUCCESS, payload:movies})),
        catchError(() => of({ type: advancedSearchActions.LOAD_META_DATA_FAILURE, payload: result }))
        )
      )
    );

    @Effect()
    loaCompetencyData$ =
      this.actions$.pipe(
        ofType(advancedSearchActions.LOAD_COMPETENCY_DATA),
        mergeMap(result => this.advancedSearchService.getCompetencyData(result['payload'])
          .pipe(
          map( movies =>
              ({ type: advancedSearchActions.LOAD_COMPETENCY_DATA_SUCCESS, payload:movies})),
          catchError(() => of({ type: advancedSearchActions.LOAD_COMPETENCY_DATA_FAILURE, payload: result }))
          )
        )
      );

  constructor(
    private actions$: Actions,
    private advancedSearchService: AdvancedSearchService
  ) {
  }

}

