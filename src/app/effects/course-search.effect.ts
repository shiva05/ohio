import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as courseSearchActions from './../actions/course-search.actions';
import { CourseSearchService } from './../services/course-search.service';
import { of } from 'rxjs';

@Injectable()
export class CourseSearchEffects {
    result1: any;
    @Effect()
    loadMetaData$ =
        this.actions$.pipe(
            ofType(courseSearchActions.LOAD_COURSESEARCH_DATA),
            mergeMap(result => this.courseSearchService.getMetaData()
                .pipe(
                    map(movies =>
                        ({ type: courseSearchActions.LOAD_COURSESEARCH_DATA_SUCCESS, payload: movies })),
                    catchError(() => of({ type: courseSearchActions.LOAD_COURSESEARCH_DATA_FAILURE, payload: result }))
                )
            )
        );

    constructor(private actions$: Actions, private courseSearchService: CourseSearchService) { }

}

