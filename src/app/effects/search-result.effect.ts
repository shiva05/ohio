import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as SearchResultActions from './../actions/search-result.action';
import { SearchResultService } from './../services/search-result.service';
import { of } from 'rxjs';

@Injectable()

export class SearchResultEffects {
    result: any;

    @Effect()
    loadMetaData$ =
        this.actions$.pipe(
            ofType(SearchResultActions.LOAD_SEARCH_RESULT),
            mergeMap(data => this.searchResultService.getSearchResultData(data)
                .pipe(
                    map(
                        searchData =>
                            ({ type: SearchResultActions.LOAD_SEARCH_RESULT_SUCCESS, payload: this.result })),
                    catchError(() => of({ type: SearchResultActions.LOAD_SEARCH_RESULT_FAILURE, payload: this.result }))
                )
            )
        );

    constructor(private actions$: Actions, private searchResultService: SearchResultService) { }
}

