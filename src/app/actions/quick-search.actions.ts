import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { QsMetaData } from './../models/qs-meta-data.model';

export const LOAD_QS_META_DATA  = '[QsMetaData] Fetch';
export const LOAD_QS_META_DATA_SUCCESS  = '[QsMetaData] Success';
export const LOAD_QS_META_DATA_FAILURE  = '[QsMetaData] Failure';


export class QsMetaDataFetch implements Action {
  readonly type = LOAD_QS_META_DATA;

}


export class QsMetaDataFetchSucess implements Action {
  readonly type = LOAD_QS_META_DATA_SUCCESS;
  constructor(public payload: QsMetaData) {}
}


export class QsMetaDataFetchFailure implements Action {
  readonly type = LOAD_QS_META_DATA_FAILURE;
  constructor(public payload: QsMetaData) {}
}


export type Actions = QsMetaDataFetch | QsMetaDataFetchSucess | QsMetaDataFetchFailure;
