import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Test } from './../models/test.model';

export const ADD_TEST     = '[TEST] Add';
export const REMOVE_TEST  = '[TEST] Remove';
export const LOAD_TEST    = '[TEST] Load';

export class LoadTest implements Action {
  readonly type = LOAD_TEST;


}

export class AddTest implements Action {
  readonly type = ADD_TEST;

  constructor(public payload: Test) {}
}

export class RemoveTest implements Action {
  readonly type = REMOVE_TEST;

  constructor(public payload: number) {}
}


export type Actions = AddTest | RemoveTest | LoadTest;
