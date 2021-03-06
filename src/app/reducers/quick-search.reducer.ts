import * as QuickSearchActions from '../actions/quick-search.actions';

export interface QsMetaData { }

const initialState: QsMetaData = {};

export function quickSearchReducer(state = initialState, Action: QuickSearchActions.Actions) {
  switch (Action.type) {
    case QuickSearchActions.LOAD_QS_META_DATA_SUCCESS:
      return {
        ...state,
        QsMetaData: Action.payload
      };
    case QuickSearchActions.LOAD_QS_META_DATA_FAILURE:
      return {
        ...state,
        QsMetaData: Action.payload
      };
    default:
      return state;
  }
}
