import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Test } from './../models/test.model'

export const ADD_TEST       = '[TEST] Add'
export const REMOVE_TEST    = '[TEST] Remove'

export class AddTest implements Action {
  readonly type = ADD_TEST

  constructor(public payload: Test) {}
}

export class RemoveTest implements Action {
  readonly type = REMOVE_TEST

  constructor(public payload: number) {}
}

export type Actions = AddTest | RemoveTest
