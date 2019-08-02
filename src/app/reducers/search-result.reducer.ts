import * as SearchResultActions from '../actions/search-result.action';
import { CustomSearch } from '../models/searchResult.model';

export interface SearchResultData {
    searchResultList: CustomSearch[];
}

const initialState: SearchResultData = {
    searchResultList: []
};

export function searchResultReducer(state = initialState, Action: SearchResultActions.Actions) {
    switch (Action.type) {
        case SearchResultActions.LOAD_SEARCH_RESULT_SUCCESS:
            return {
                ...state,
                searchResultList: Action.payload.searchResultList
            };
        case SearchResultActions.LOAD_SEARCH_RESULT_FAILURE:
            return {
                ...state, searchResultList: Action.payload.searchResultList
            };
        default:
            return state;
    }
}
