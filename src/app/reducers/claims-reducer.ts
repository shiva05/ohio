import * as ClaimsActions from '../actions/claims-actions';
import { ClaimsJwtPayload } from '../models/claims-jwt-payload';
import { parseClaimsJwt } from '../helpers/jwt-helper';

import { environment } from '../../environments/environment';

export interface ClaimsState {
    loading: boolean;
    error: any;
    claimsJwt: string;
    claimsJwtPayload: ClaimsJwtPayload;
}

const initialState: ClaimsState = {
    loading: false,
    error: null,
    claimsJwt: null,
    claimsJwtPayload: null
};

export function ClaimsReducer(state = initialState, action: ClaimsActions.Actions): ClaimsState {
    switch (action.type) {
        case ClaimsActions.GET_CLAIMS_JWT:
            return { ...state, loading: true };
        case ClaimsActions.GET_CLAIMS_JWT_SUCCESS:
            if (action.payload !== null) {
                localStorage.setItem(environment.name + '_cs', JSON.stringify(action.payload));
            }

            return {
                ...state, loading: false,
                claimsJwt: action.payload.ClaimsJwt,
                claimsJwtPayload: parseClaimsJwt(action.payload.ClaimsJwt),
                error: null
            };
        case ClaimsActions.GET_CLAIMS_JWT_ERROR:
            return { ...state, loading: false, error: action.payload };
        case ClaimsActions.RESET_CLAIMS:
            localStorage.removeItem(environment.name + '_cs');
            return initialState;
        default:
            return state;
    }
}
