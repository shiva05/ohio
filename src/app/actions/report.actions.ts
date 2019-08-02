import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ReportData } from './../models/report-data.model';

export const LOAD_REPORT_DATA  = '[ReportData] Fetch';
export const LOAD_REPORT_DATA_SUCCESS  = '[ReportData] Success';
export const LOAD_REPORT_DATA_FAILURE  = '[ReportData] Failure';


export class ReportDataFetch implements Action {
  readonly type = LOAD_REPORT_DATA;

}


export class ReportDataFetchSucess implements Action {
  readonly type = LOAD_REPORT_DATA_SUCCESS;
  constructor(public payload: ReportData) {}
}


export class  ReportDataFetchFailure implements Action {
  readonly type = LOAD_REPORT_DATA_FAILURE;
  constructor(public payload: ReportData) {}
}


export type Actions = ReportDataFetch | ReportDataFetchSucess | ReportDataFetchFailure;
