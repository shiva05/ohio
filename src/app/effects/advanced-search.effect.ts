import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as testActions from './../actions/test.actions';
import * as advancedSearchActions from './../actions/advanced-search.actions';
import { AdvancedSearchService } from './../services/advanced-search.service';
import { TestService } from './../services/test.service';
import { of } from 'rxjs';
import { debug } from 'util';

@Injectable()
export class AdvancedSearchEffects {
 result1 : any;
  @Effect()
  loadMetaData$ =
    this.actions$.pipe(
      ofType(advancedSearchActions.LOAD_META_DATA),
      mergeMap(result => this.advancedSearchService.getMetaData()
        .pipe(
        map(
          movies =>
            ({ type: advancedSearchActions.LOAD_META_DATA_SUCCESS, payload: this.result1 })),
        catchError(() => of({ type: advancedSearchActions.LOAD_META_DATA_FAILURE,  payload: this.result1 }))
        )
      )
    )

  constructor(
    private actions$: Actions,
    private advancedSearchService: AdvancedSearchService
  ) {
    var careers = [{ item_id: 1, item_text: 'Agriculture' },
    { item_id: 2, item_text: 'Software Developer' },
    { item_id: 3, item_text: 'Postman' },
    { item_id: 4, item_text: 'Delivery boy' },
    { item_id: 5, item_text: 'Driver' },
    { item_id: 6, item_text: 'Cook' },
    { item_id: 7, item_text: 'Support' },
    { item_id: 8, item_text: 'Admin' },
    { item_id: 9, item_text: 'Hardware' }];

    var acadamicSubjects = [{ item_id: 1, item_text: 'Maths' },
    { item_id: 2, item_text: 'Sciences' },
    { item_id: 3, item_text: 'English' },
    { item_id: 4, item_text: 'French' },
    { item_id: 5, item_text: 'Software development' },
    { item_id: 6, item_text: 'Networking' },
    { item_id: 7, item_text: 'History' },
    { item_id: 8, item_text: 'Music' },
    { item_id: 9, item_text: 'Technology' }];

    var stadards = [{ item_id: 1, item_text: 'Business operation' },
    { item_id: 2, item_text: 'Software operation' },
    { item_id: 3, item_text: 'artificial' },
    { item_id: 4, item_text: 'Operating system' },
    { item_id: 5, item_text: 'Computer networking' },
    { item_id: 6, item_text: 'Information technology' },
    { item_id: 7, item_text: 'Electronic devices' },
    { item_id: 8, item_text: 'Environment sciences' },
    { item_id: 9, item_text: 'Hyperlooping' }];

    var outcomes = [{ item_id: 1, item_text: 'Maths' },
    { item_id: 2, item_text: 'Sciences' },
    { item_id: 3, item_text: 'English' },
    { item_id: 4, item_text: 'French' },
    { item_id: 5, item_text: 'Software development' },
    { item_id: 6, item_text: 'Networking' },
    { item_id: 7, item_text: 'History' },
    { item_id: 8, item_text: 'Music' },
    { item_id: 9, item_text: 'Technology' }];

    var grades = [{ item_id: 1, item_text: 'G1' },
    { item_id: 3, item_text: 'G2' },
    { item_id: 4, item_text: 'G3' },
    { item_id: 5, item_text: 'G4' },
    { item_id: 6, item_text: 'G5' },
    { item_id: 7, item_text: 'G6' },
    { item_id: 8, item_text: 'G7' },
    { item_id: 9, item_text: 'G8' }];

    var clusters = [{ item_id: 1, item_text: 'Test1' },
    { item_id: 3, item_text: 'Test2' },
    { item_id: 4, item_text: 'Test3' },
    { item_id: 5, item_text: 'Test4' },
    { item_id: 6, item_text: 'Test5' },
    { item_id: 7, item_text: 'Test6' },
    { item_id: 8, item_text: 'Test7' },
    { item_id: 9, item_text: 'Test8' }];


    var standardNumbers = [{ item_id: 1, item_text: 'Number1' },
    { item_id: 3, item_text: 'Number2' },
    { item_id: 4, item_text: 'Number3' },
    { item_id: 5, item_text: 'Number4' },
    { item_id: 6, item_text: 'Number5' },
    { item_id: 7, item_text: 'Number6' },
    { item_id: 8, item_text: 'Number7' },
    { item_id: 9, item_text: 'Number8' }];

    this.result1 = {
      academicSubjects: acadamicSubjects,
      standards: stadards,
      careers: careers,
      outcomes: outcomes,
      grades: grades,
      standardNumbers: standardNumbers
    };
  }

}

