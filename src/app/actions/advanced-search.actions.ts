import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { MetaData } from './../models/meta-data.model'
import { AlignmentSearchSelectedFilters } from './../models/alignment-search-selected-filters.model'

export const LOAD_META_DATA  = '[MetaData] Fetch'
export const LOAD_META_DATA_SUCCESS  = '[MetaData] Sucsess'
export const LOAD_META_DATA_FAILURE  = '[MetaData] Failure'
export const SAVE_AS_SELECTED_FILTERS = '[AlignmentSearchSelectedFilters] Save'


export class MetaDataFetch implements Action {
  readonly type = LOAD_META_DATA

}


export class MetaDataFetchSucess implements Action {
  readonly type = LOAD_META_DATA_SUCCESS
  constructor(public payload: MetaData) {}
}


export class MetaDataFetchFailure implements Action {
  readonly type = LOAD_META_DATA_FAILURE
  constructor(public payload: MetaData) {}
}


export class SaveAsSelectedFilters implements Action {
  readonly type = SAVE_AS_SELECTED_FILTERS
  constructor(public payload: AlignmentSearchSelectedFilters) {}
}

export type Actions = MetaDataFetch | MetaDataFetchSucess | MetaDataFetchFailure | SaveAsSelectedFilters
