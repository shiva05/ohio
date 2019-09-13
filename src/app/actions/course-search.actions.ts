import { Action } from '@ngrx/store';
import { CourseSearchData } from '../models/courseSearch.model';
import { CourseSearchSelectedFilters } from '../models/courseSearch-selected-filters.model';

export const LOAD_COURSESEARCH_DATA = '[CourseSearchData] Fetch';
export const LOAD_COURSESEARCH_DATA_SUCCESS = '[CourseSearchData] Success';
export const LOAD_COURSESEARCH_DATA_FAILURE = '[CourseSearchData] Failure';
export const SAVE_AS_SELECTED_FILTERS_COURSESEARCH = '[CourseSearchSelectedFilters] Save';
export const RESET_COURSE_SELECTED_FILTERS = '[CourseSearchSelectedFilters] Reset';

export class CourseSearchDataFetch implements Action {
    readonly type = LOAD_COURSESEARCH_DATA;
}

export class CourseSearchDataSucess implements Action {
    readonly type = LOAD_COURSESEARCH_DATA_SUCCESS;
    constructor(public payload: CourseSearchData) { }
}

export class CourseSearchDataFailure implements Action {
    readonly type = LOAD_COURSESEARCH_DATA_FAILURE;
    constructor(public payload: CourseSearchData) { }
}

export class SaveAsSelectedFilters implements Action {
    readonly type = SAVE_AS_SELECTED_FILTERS_COURSESEARCH;
    constructor(public payload: CourseSearchSelectedFilters) { }
}
export class ResetCourseSelectedFilters implements Action {
  readonly type = RESET_COURSE_SELECTED_FILTERS;
}

export type Actions = CourseSearchDataFetch | CourseSearchDataSucess | CourseSearchDataFailure | SaveAsSelectedFilters | ResetCourseSelectedFilters;
