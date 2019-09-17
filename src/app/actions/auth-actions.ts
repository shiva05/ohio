import { Action } from '@ngrx/store';

const PREFIX = 'auth-actions:';

export const RESET_AUTH = PREFIX + 'reset the auth state';
export const GET_JWT_TOKEN = PREFIX + 'get jwt token';
export const GET_PUBLIC_JWT_TOKEN = PREFIX + 'get public jwt token';
export const GET_JWT_TOKEN_SUCCESS = PREFIX + 'get jwt token success';
export const GET_JWT_TOKEN_ERROR = PREFIX + 'get jwt token error';
export const SET_SELECTED_ORG = PREFIX + 'set selected org';
export const SET_SELECTED_AUDIENCE = PREFIX + 'set selected audience';
export const SET_SELECTED_APPLICATION = PREFIX + 'set selected application';
export const GET_JWT_TOKEN_FROM_STORE = PREFIX + 'get perviously generated jwt token from store';

export class ResetAuth implements Action {
    readonly type = RESET_AUTH;
    constructor(public payload: any) { }
}

export class GetJwtToken implements Action {
    readonly type = GET_JWT_TOKEN;
    constructor(public payload: any) { }
}

export class GetPublicJwtToken implements Action {
    readonly type = GET_PUBLIC_JWT_TOKEN;
    constructor(public payload: number) { }
}

export class GetJwtTokenFromStore implements Action {
    readonly type = GET_JWT_TOKEN_FROM_STORE;
    constructor(public payload: any) { }
}

export class GetJwtTokenSuccess implements Action {
    readonly type = GET_JWT_TOKEN_SUCCESS;
    constructor(public payload: any) { }
}

export class GetJwtTokenError implements Action {
    readonly type = GET_JWT_TOKEN_ERROR;
    constructor(public payload: any) { }
}

export class SetSelectedOrg implements Action {
    readonly type = SET_SELECTED_ORG;
    constructor(public payload: any) { }
}

export class SetSelectedAudience implements Action {
    readonly type = SET_SELECTED_AUDIENCE;
    constructor(public payload: any) { }
}

export class SetSelectedApplication implements Action {
    readonly type = SET_SELECTED_APPLICATION;
    constructor(public payload: any) { }
}

export type Actions
    = ResetAuth
    | GetJwtToken
    | GetPublicJwtToken
    | GetJwtTokenFromStore
    | GetJwtTokenSuccess
    | GetJwtTokenError
    | SetSelectedOrg
    | SetSelectedAudience
    | SetSelectedApplication;
