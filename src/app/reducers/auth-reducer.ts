import * as AuthActions from '../actions/auth-actions';
import { Application } from '../models/application';
import { Audience } from '../models/audience';
import { AuthJwtPayload } from '../models/auth-jwt-payload';
import { Organization } from '../models/organization';
import { parseAuthJwt } from '../helpers/jwt-helper';
import { environment } from '../../environments/environment';
import { debug } from 'util';

export interface AuthState {
    loading: boolean;
    error: any;
    authJwt: string;
    authJwtPayload: AuthJwtPayload;
    orgs: Organization[];
    selectedOrg: Organization;
    selectedAudience: Audience;
    selectedApplication: Application;
    expiration: number;
    isPublic: boolean;
}

const initialState: AuthState = {
    loading: false,
    error: null,
    authJwt: null,
    authJwtPayload: null,
    orgs: [],
    selectedOrg: null,
    selectedAudience: null,
    selectedApplication: null,
    expiration: null,
    isPublic: false
};

export function AuthReducer(state = initialState, action: AuthActions.Actions): AuthState {
    switch (action.type) {
        case AuthActions.GET_JWT_TOKEN:
            return { ...state, loading: true };
        case AuthActions.GET_PUBLIC_JWT_TOKEN:
            return { ...state, loading: true };
        case AuthActions.GET_JWT_TOKEN_ERROR:
            return { ...state, loading: false, error: action.payload };
        case AuthActions.GET_JWT_TOKEN_SUCCESS:
            if (action.payload !== null) {
                localStorage.setItem(environment.name + '_as', JSON.stringify(action.payload));
            }
            return {
                ...state,
                loading: false,
                error: null,
                authJwt: action.payload.AccessToken,
                authJwtPayload: parseAuthJwt(action.payload.AccessToken),
                orgs: action.payload.Orgs,
                expiration: parseAuthJwt(action.payload.AccessToken).exp,
                isPublic: action.payload.Public
            };
        case AuthActions.SET_SELECTED_ORG:
            return { ...state, selectedOrg: action.payload };
        case AuthActions.SET_SELECTED_AUDIENCE:
            return { ...state, selectedAudience: action.payload };
        case AuthActions.SET_SELECTED_APPLICATION:
            return { ...state, selectedApplication: action.payload };
        case AuthActions.RESET_AUTH:
            localStorage.removeItem(environment.name + '_at');
            localStorage.removeItem(environment.name + '_as');
            return initialState;
        default:
            return state;
    }
}
