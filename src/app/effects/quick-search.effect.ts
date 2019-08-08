import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as quickSearchActions from './../actions/quick-search.actions';
import { QuickSearchService } from './../services/quick-search.service';
import { of } from 'rxjs';
import { debug } from 'util';

@Injectable()
export class QuickSearchEffects {
 result1: any;
  @Effect()
  loadMetaData$ =
    this.actions$.pipe(
      ofType(quickSearchActions.LOAD_QS_META_DATA),
      mergeMap(result => this.advancedSearchService.getMetaData()
        .pipe(
        map(
          movies =>
            ({ type: quickSearchActions.LOAD_QS_META_DATA_SUCCESS, payload:movies})),
        catchError((movies) => of({ type: quickSearchActions.LOAD_QS_META_DATA_SUCCESS,  payload: movies }))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private advancedSearchService: QuickSearchService
  ) {
    const careers = [
    { item_id: 1, item_text: 'Hospitality and Tourism' },
    { item_id: 2, item_text: 'Engineering and Science Technologies' },
    { item_id: 3, item_text: 'Construction' },
    { item_id: 4, item_text: 'Law & Public Safety' },
    { item_id: 5, item_text: 'Health Science' },
    { item_id: 6, item_text: 'Business, Marketing, and Finance' },
    { item_id: 7, item_text: 'Manufacturing' },
    { item_id: 8, item_text: 'Transportation' },
    { item_id: 9, item_text: 'Information Technology' },
    { item_id: 10, item_text: 'Agriculture and Environmental Science' },
    { item_id: 11, item_text: 'Education and Training' },
    { item_id: 12, item_text: 'Arts and Communication' }
  ];

    const acadamicSubjects = [ // There is no academic Subjects in the Data
    { item_id: 1, item_text: 'Math' },
    { item_id: 2, item_text: 'Science' },
    { item_id: 3, item_text: 'ELA' },
    { item_id: 4, item_text: 'Social Studies' }
  ];
    this.result1 = {
      academicSubjects: acadamicSubjects,
      careers :careers
    };
  }

}

