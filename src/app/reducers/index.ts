// import {
//   ActionReducer,
//   ActionReducerMap,
//   createFeatureSelector,
//   createSelector,
//   MetaReducer
// } from '@ngrx/store';
// import { environment } from '../../environments/environment';

// export interface State {

// }

// export const reducers: ActionReducerMap<State> = {

// };


// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

import { AuthReducer, AuthState } from './auth-reducer';
import { ClaimsReducer, ClaimsState } from './claims-reducer';
import { quickSearchReducer ,QsMetaData } from './quick-search.reducer';
import { searchResultReducer ,SearchResultData } from './search-result.reducer';
import { reportReducer,ReportData } from './report.reducer';
import { advancedSearchReducer, AdvancedSearchData } from './advanced-search.reducer';
import { courseSearchReducer,CourseSearch } from './course-search.reducer';


export const Reducers = {
  authState: AuthReducer,
  claimsState: ClaimsReducer,
  advancedSearch: advancedSearchReducer,
  report: reportReducer,
  quickSearch: quickSearchReducer,
  searchResult: searchResultReducer,
  courseSearch: courseSearchReducer
};


export interface AppState {
  authState: AuthState;
  claimsState: ClaimsState;
  advancedSearch:AdvancedSearchData,
  report :ReportData,
  SearchResultData :SearchResultData,
  quickSearch:QsMetaData
  CourseSearch:CourseSearch
}
