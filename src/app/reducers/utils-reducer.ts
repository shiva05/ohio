import * as UtilsActions from '../actions/utils-actions';
import { Utilities } from '../models/util-nav-item';
import { UtilsContext } from '../models/utils-context';

export interface UtilsState {
    tabs: string[];
    activeUtility: Utilities;
    utilityContext: UtilsContext;
    flagCount: number;
    docCount: number;
    commentsCount: number;
}

const initialState: UtilsState = {
    tabs: null,
    activeUtility: Utilities.none,
    utilityContext: null,
    flagCount: null,
    docCount: null,
    commentsCount: null
};

export function UtilsReducer(state = initialState, action: UtilsActions.Actions): UtilsState {
    switch (action.type) {
        case UtilsActions.UTILS_RESET:
            return initialState;
        case UtilsActions.UTILS_INIT:
            return {
                ...state,
                tabs: action.payload
            };
        case UtilsActions.UTILS_NAV:
            return {
                ...state,
                activeUtility: action.payload
            };
        case UtilsActions.UTILS_SET_CONTEXT:
            if (state.utilityContext && action.payload &&
                (state.utilityContext.assetTemplateKey === action.payload.assetTemplateKey &&
                    state.utilityContext.detailKey === action.payload.detailKey &&
                    state.utilityContext.moduleKey === action.payload.moduleKey)) {
                return state;
            } else {
                return {
                    ...state,
                    utilityContext: action.payload
                };
            }
        case UtilsActions.UTILS_SET_FLAG_COUNT:
            return {
                ...state,
                flagCount: action.payload
            };
        case UtilsActions.UTILS_SET_DOC_COUNT:
            return {
                ...state,
                docCount: action.payload
            };
        case UtilsActions.UTILS_SET_COMMENTS_COUNT:
            return {
                ...state,
                commentsCount: action.payload
            }
        default:
            return state;
    }
}
