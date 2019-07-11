import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { MetaData } from './../models/meta-data.model'

export const LOAD_META_DATA  = '[MetaData] Fetch'
export const LOAD_META_DATA_SUCCESS  = '[MetaData] Sucsess'
export const LOAD_META_DATA_FAILURE  = '[MetaData] Failure'


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


export type Actions = MetaDataFetch | MetaDataFetchSucess | MetaDataFetchFailure
