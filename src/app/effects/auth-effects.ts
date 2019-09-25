import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, merge, switchMap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth-actions';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()

export class AuthEffectsService {

    constructor(private authService: AuthService, private actions$: Actions) { }

    @Effect()
    getJwtToken(): Observable<Action> {
        return this.actions$.pipe(
            ofType<Action>(AuthActions.GET_JWT_TOKEN),
            mergeMap((action: AuthActions.GetJwtToken) =>
                this.authService.fetchJwt(action.payload).pipe(
                    map((data) => new AuthActions.GetJwtTokenSuccess(data)),
                    catchError(() => of(new AuthActions.GetJwtTokenError({ error: 'unable to fetch token' }))
                    )
                )
            ));
    }

    @Effect()
    getPublicJwtToken(): Observable<Action> {
        return this.actions$.pipe(
            ofType<Action>(AuthActions.GET_PUBLIC_JWT_TOKEN),
            mergeMap((action: AuthActions.GetPublicJwtToken) =>
                this.authService.fetchPublicJwt(action.payload).pipe(
                    map((data) => new AuthActions.GetJwtTokenSuccess(data)),
                    catchError((e) => of(new AuthActions.GetJwtTokenError({ error: 'unable to fetch public token' + e.message }))
                    )
                )
            ));
    }

    @Effect()
    getJwtTokenFromStore(): Observable<Action> {
        const data = JSON.parse(localStorage.getItem(environment.name + '_as'));
        return this.actions$.pipe(
            ofType<Action>(AuthActions.GET_JWT_TOKEN_FROM_STORE),
            switchMap(() => of(new AuthActions.GetJwtTokenSuccess(data))),
            catchError(() => of(new AuthActions.GetJwtTokenError({ error: 'unable to fetch token' }))
            ));
    }
}


