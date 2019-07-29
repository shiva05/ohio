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
 result1: any;
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
    );

  constructor(
    private actions$: Actions,
    private advancedSearchService: AdvancedSearchService
  ) {
    const careers = [
    { item_id: 1, item_text: 'Agriculture and Environmental Science' },
    { item_id: 2, item_text: 'Arts and Communication' },
    { item_id: 3, item_text: 'Business, Marketing, and Finance' },
    { item_id: 4, item_text: 'Construction' },
    { item_id: 5, item_text: 'Education and Training' },
    { item_id: 6, item_text: 'Engineering and Science Technologies' },
    { item_id: 7, item_text: 'Health Science' },
    { item_id: 8, item_text: 'Hospitality and Tourism' },
    { item_id: 9, item_text: 'Information Technology' },
    { item_id: 10, item_text: 'Law & Public Safety' },
    { item_id: 11, item_text: 'Manufacturing' },
    { item_id: 12, item_text: 'Transportation' }
  ];

    const acadamicSubjects = [ // There is no academic Subjects in the Data
    { item_id: 1, item_text: 'Computer Science' },
    { item_id: 2, item_text: 'Math' },
    { item_id: 3, item_text: 'Science' }
  ];

    const strands = [      // Based on Construction
    { item_id: 1, item_text: 'Business Operations/21st Century Skills' },
    { item_id: 2, item_text: 'Construction and Facility Management' },
    { item_id: 3, item_text: 'Electrical' },
    { item_id: 4, item_text: 'Environmental Systems and Plumbing' },
    { item_id: 5, item_text: 'Planning and Design' },
    { item_id: 6, item_text: 'Structural Construction' }
  ];

    const outcomes = [      // Based on Construction->Electrical
      { item_id: 1, item_text: 'Circuits' },
      { item_id: 2, item_text: 'Electrical Theory' },
      { item_id: 3, item_text: 'Motors and Power' }
  ];

    const grades = [
    { item_id: 8, item_text: '7' },
    { item_id: 1, item_text: '8' },
    { item_id: 5, item_text: 'Algebra' },
    { item_id: 7, item_text: 'Functions' },
    { item_id: 3, item_text: 'Geometry' },
    { item_id: 4, item_text: 'Number and Quantity' },
    { item_id: 6, item_text: 'Statistics and Probability' }
  ];

    const competencyNumbers = [
      { item_id: 1, item_text: '245' },
      { item_id: 3, item_text: '246' },
      { item_id: 4, item_text: '247' },
    ];

    const clusters = [
    { item_id: 3, item_text: 'Circles' },
    { item_id: 5, item_text: 'Congruence' },
    { item_id: 1, item_text: 'Geometric Measurement and Dimension' },
    { item_id: 2, item_text: 'Modeling with Geometry' },
    { item_id: 4, item_text: 'Similarity, Right Triangles, and Trigonometry' }
  ];

    const standardNumbers = [
    { item_id: 1, item_text: 'G.C.4' },
    { item_id: 2, item_text: 'G.C.5' },
    { item_id: 3, item_text: 'G.C.6' },
    { item_id: 4, item_text: 'G.C.3' },
    { item_id: 5, item_text: 'G.C.2' }
  ];

    this.result1 = {
      academicSubjects: acadamicSubjects,
      standards: strands,
      careers,
      outcomes,
      grades,
      standardNumbers,
      clusters,
      competencyNumbers
    };
  }

}

