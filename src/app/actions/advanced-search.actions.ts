import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { MetaData } from './../models/meta-data.model';
import { AlignmentSearchSelectedFilters } from './../models/alignment-search-selected-filters.model';
import { Outcome } from 'src/app/models/outcome.model';

export const RESET_ALIGNMENTSEARCH_FILTERS = '[AlignmentSearchSelectedFilters] Reset';
export const LOAD_META_DATA  = '[MetaData] Fetch';
export const LOAD_META_DATA_SUCCESS  = '[MetaData] Success';
export const LOAD_META_DATA_FAILURE  = '[MetaData] Failure';
export const SAVE_AS_SELECTED_FILTERS = '[AlignmentSearchSelectedFilters] Save';


export const LOAD_COMPETENCY_DATA  = '[COMPETENCIES] Fetch';
export const LOAD_COMPETENCY_DATA_SUCCESS  = '[COMPETENCIES] Success';
export const LOAD_COMPETENCY_DATA_FAILURE = '[COMPETENCIES] Failure';

export class MetaDataFetch implements Action {
  readonly type = LOAD_META_DATA;

}


export class MetaDataFetchSucess implements Action {
  readonly type = LOAD_META_DATA_SUCCESS;
  constructor(public payload: MetaData) {}
}


export class MetaDataFetchFailure implements Action {
  readonly type = LOAD_META_DATA_FAILURE;
  constructor(public payload: MetaData) {}
}


export class SaveAsSelectedFilters implements Action {
  readonly type = SAVE_AS_SELECTED_FILTERS;
  constructor(public payload: AlignmentSearchSelectedFilters) {}
}

export class ResetAlignmentSearchFilters implements Action {
  readonly type = RESET_ALIGNMENTSEARCH_FILTERS;
  constructor(public payload: AlignmentSearchSelectedFilters) { }
}


export class CompetencyDataFetchSucess implements Action {
  readonly type = LOAD_COMPETENCY_DATA_SUCCESS;
  constructor(public payload: MetaData) {}
}


export class CompetencyDataFetchFailure implements Action {
  readonly type = LOAD_COMPETENCY_DATA_FAILURE;
  constructor(public payload: MetaData) {}
}


export class CompetencyDataFetch implements Action {
  readonly type = LOAD_COMPETENCY_DATA;
  constructor(public payload: Outcome[]) {}
}

export type Actions = MetaDataFetch |
  MetaDataFetchSucess |
  MetaDataFetchFailure |
  SaveAsSelectedFilters |
  CompetencyDataFetch |
  CompetencyDataFetchFailure |
  ResetAlignmentSearchFilters |
  CompetencyDataFetchSucess;
