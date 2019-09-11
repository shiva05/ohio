import { Action } from '@ngrx/store';

const PREFIX = 'claims-actions:';

export const RESET_CLAIMS = PREFIX + 'resets the claims state to inital state';
export const GET_CLAIMS_JWT = PREFIX + 'get claims jwt';
export const GET_CLAIMS_JWT_SUCCESS = PREFIX + 'get claims jwt success';
export const GET_CLAIMS_JWT_ERROR = PREFIX + 'get claims jwt error';
export const GET_CLAIMS_JWT_FROM_STORE = PREFIX + 'get claims jwt from store';

export class ResetClaims implements Action {
    readonly type = RESET_CLAIMS;
    constructor(public payload: any) { }
}

export class GetClaimsJwt implements Action {
    readonly type = GET_CLAIMS_JWT;
    constructor(public payload: any) { }
}

export class GetClaimsJwtFromStore implements Action {
    readonly type = GET_CLAIMS_JWT_FROM_STORE;
    constructor(public payload: any) { }
}

export class GetClaimsJwtSuccess implements Action {
    readonly type = GET_CLAIMS_JWT_SUCCESS;
    constructor(public payload: any) { }
}

export class GetClaimsJwtError implements Action {
    readonly type = GET_CLAIMS_JWT_ERROR;
    constructor(public payload: any) { }
}

export type Actions
    = ResetClaims
    | GetClaimsJwt
    | GetClaimsJwtFromStore
    | GetClaimsJwtSuccess
    | GetClaimsJwtError;
