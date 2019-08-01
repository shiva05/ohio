import { Action } from '@ngrx/store';
import { SearchResultData } from '../models/searchResult.model';

export const LOAD_SEARCH_RESULT = '[SearchResultData] Fetch';
export const LOAD_SEARCH_RESULT_SUCCESS = '[SearchResultData] Sucsess';
export const LOAD_SEARCH_RESULT_FAILURE = '[SearchResultData] Failure';

export class SearchResultDataFetch implements Action {
    readonly type = LOAD_SEARCH_RESULT;
}

export class SearchResultDataSucess implements Action {
    readonly type = LOAD_SEARCH_RESULT_SUCCESS;
    constructor(public payload: SearchResultData) { }
}

export class SearchResultDataFailure implements Action {
    readonly type = LOAD_SEARCH_RESULT_FAILURE;
    constructor(public payload: SearchResultData) { }
}

export type Actions = SearchResultDataFetch | SearchResultDataSucess | SearchResultDataFailure;
