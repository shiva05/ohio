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
            mergeMap(data => this.searchResultService.getSearchResultData()
                .pipe(
                    map(
                        searchData =>
                            ({ type: SearchResultActions.LOAD_SEARCH_RESULT_SUCCESS, payload: this.result })),
                    catchError(() => of({ type: SearchResultActions.LOAD_SEARCH_RESULT_FAILURE, payload: this.result }))
                )
            )
        );

    constructor(private actions$: Actions, private searchResultService: SearchResultService) {
        const competency = [
            { id: 1, academicSubject: 'Math', value: 'Use economic indicators to identify economic trends and conditions.' },
            { id: 2, academicSubject: 'Math', value: 'Find surface area and volume for three‐dimensional objects, accurate to a specified level of precision.' }
        ];

        const outcomes = [
            // tslint:disable-next-line:max-line-length
            { id: 1, academicSubject: 'Math', value: 'Select materials and lay out rough\u2010in wiring runs according to specifications, drawings and code requirements.' },
            { id: 2, academicSubject: 'Math', value: 'Lay out and install conduit or cable runs, raceways and cable systems.', competency: JSON.parse(JSON.stringify(competency)) }
        ];

        const strands = [
            { id: 1, academicSubject: 'Math', value: 'Planning and Design' },
            { id: 2, academicSubject: 'Math', value: 'Business Operations\/21st Century Skills' },
            { id: 3, academicSubject: 'Math', value: 'Construction and Facility Management' },
            { id: 4, academicSubject: 'Math', value: 'Electrical', outcomes: JSON.parse(JSON.stringify(outcomes)) },
            { id: 5, academicSubject: 'Math', value: 'Environmental Systems and Plumbing' },
            { id: 6, academicSubject: 'Math', value: 'Structural Construction' },
            { id: 7, academicSubject: 'Math', value: 'Safety, Tools, and Equipment' }
        ];

        // List object having hierarchy of parents and its children
        const careerField = [
            { id: 1, academicSubject: 'Science', value: 'Hospitality and Tourism' },
            { id: 2, academicSubject: 'Social', value: 'Business, Marketing, and Finance' },
            { id: 3, academicSubject: 'Science', value: 'Agriculture and Environmental Science' },
            { id: 4, academicSubject: 'Science', value: 'Engineering and Science Technologies' },
            { id: 5, academicSubject: 'Math', value: 'Manufacturing' },
            { id: 6, academicSubject: 'Social', value: 'Education and Training' },
            { id: 7, academicSubject: 'Math', value: 'Construction', strands: JSON.parse(JSON.stringify(strands)) },
            { id: 8, academicSubject: 'Math', value: 'Transportation' },
            { id: 9, academicSubject: 'Social', value: 'Human Services' },
            { id: 10, academicSubject: 'Social', value: 'Law & Public Safety' },
            { id: 11, academicSubject: 'Math', value: 'Information Technology' },
            { id: 12, academicSubject: 'ELA', value: 'Arts and Communication' },
            { id: 13, academicSubject: 'Science', value: 'Health Science' }
        ];

        this.result = {
            searchResultList: careerField
        };
    }

}

