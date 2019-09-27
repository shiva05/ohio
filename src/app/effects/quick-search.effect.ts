import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as quickSearchActions from './../actions/quick-search.actions';
import { QuickSearchService } from './../services/quick-search.service';
import { of } from 'rxjs';

@Injectable()
export class QuickSearchEffects {
  @Effect()
  loadMetaData$ =
    this.actions$.pipe(
      ofType(quickSearchActions.LOAD_QS_META_DATA),
      mergeMap(result => this.advancedSearchService.getMetaData()
        .pipe(
          map(
            data =>
              ({ type: quickSearchActions.LOAD_QS_META_DATA_SUCCESS, payload: data })),
          catchError(() => of({ type: quickSearchActions.LOAD_QS_META_DATA_SUCCESS, payload: result }))
        )
      )
    );

  constructor(private actions$: Actions, private advancedSearchService: QuickSearchService) { }
}

