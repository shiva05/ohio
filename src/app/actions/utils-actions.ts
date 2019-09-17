import { Action } from '@ngrx/store';
import { UtilsContext } from '../models/utils-context';

const PREFIX = 'utils-actions:';

export const UTILS_RESET = PREFIX + 'revert utils to initial state';
export const UTILS_INIT = PREFIX + 'initialize utils so that they icons can be shown';
export const UTILS_NAV = PREFIX + 'show a certain utility on left';
export const UTILS_SET_CONTEXT = PREFIX + 'set the context with asset template key and detail key';
export const UTILS_CONTEXT_CHANGED = PREFIX + 'fired when any one of utility context object values were changed';
export const UTILS_ERROR = PREFIX + 'set error on utils';
export const UTILS_SET_FLAG_COUNT = PREFIX + 'set the flag count';
export const UTILS_SET_DOC_COUNT = PREFIX + 'set the doc count';
export const UTILS_SET_COMMENTS_COUNT = PREFIX + 'set the comments count';


export class UtilsReset implements Action {
    readonly type = UTILS_RESET;
    constructor(public payload: any) { }
}

export class UtilsInit implements Action {
    readonly type = UTILS_INIT;
    constructor(public payload: any) { }
}

export class UtilsNavigate implements Action {
    readonly type = UTILS_NAV;
    constructor(public payload: any) { }
}

export class UtilsSetContext implements Action {
    readonly type = UTILS_SET_CONTEXT;
    constructor(public payload: UtilsContext) { }
}

export class UtilsContextChanged implements Action {
    readonly type = UTILS_CONTEXT_CHANGED;
    constructor(public payload: UtilsContext) { }
}

export class UtilsError implements Action {
    readonly type = UTILS_ERROR;
    constructor(public payload: any) { }
}
export class UtilsSetFlagCount implements Action {
    readonly type = UTILS_SET_FLAG_COUNT;
    constructor(public payload: any) { }
}
export class UtilsSetDocCount implements Action {
    readonly type = UTILS_SET_DOC_COUNT;
    constructor(public payload: any) { }
}

export class UtilsSetCommentsCount implements Action {
    readonly type = UTILS_SET_COMMENTS_COUNT;
    constructor(public payload: any) { }
}

export type Actions
    = UtilsReset
    | UtilsInit
    | UtilsNavigate
    | UtilsSetContext
    | UtilsContextChanged
    | UtilsError
    | UtilsSetFlagCount
    | UtilsSetDocCount
    | UtilsSetCommentsCount;
