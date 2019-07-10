import { Action } from '@ngrx/store';
import {Test } from './../models/test.model';
import * as TestActions from '../actions/test.actions';


const initialState : Test = {
    name : 'Initial state',
    url :'google.com'
}

export function testReducer(state :Test[] = [initialState] ,Action :TestActions.Actions){
  switch(Action.type){
    case TestActions.ADD_TEST:
      return [...state,Action.payload];
    default:
      return state;
  }
}
