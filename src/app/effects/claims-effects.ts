import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { catchError, map, mergeMap, merge, switchMap } from 'rxjs/operators';
import * as ClaimsActions from '../actions/claims-actions';
import { ClaimsService } from '../services/claims.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ClaimsEffectsService {
    constructor(
        private claimsService: ClaimsService,
        private actions$: Actions
    ) { }


    @Effect()
    getClaimsToken(): Observable<Action> {
        return this.actions$.pipe(
            ofType<Action>(ClaimsActions.GET_CLAIMS_JWT),
            mergeMap((action: ClaimsActions.GetClaimsJwt) =>
                this.claimsService.fetchClaimsJwt(action.payload).pipe(
                    // @todo -need to cast into type
                    map((claimsResponse) => (new ClaimsActions.GetClaimsJwtSuccess(claimsResponse)),
                        catchError(() => of(new ClaimsActions.GetClaimsJwtError({ error: 'unable to fetch claims response' }))
                        )
                    )
                )));
    }

    @Effect()
    getMenus(): Observable<Action> {
        return this.actions$.pipe(
            ofType<Action>(ClaimsActions.GET_CLAIMS_JWT),
            mergeMap((action: ClaimsActions.GetClaimsJwt) =>
                this.claimsService.fetchClaimsJwt(action.payload).pipe(
                    // @todo -need to cast into type
                    map((claimsResponse) => new ClaimsActions.GetClaimsJwtSuccess(claimsResponse)),
                    catchError(() => of(new ClaimsActions.GetClaimsJwtError({ error: 'unable to fetch claims response' }))
                    )
                )
            ));
    }

    @Effect()
    getClaimsTokenFromStore(): Observable<Action> {
        const data = JSON.parse(localStorage.getItem(environment.name + '_cs'));
        return this.actions$.pipe(
            ofType<Action>(ClaimsActions.GET_CLAIMS_JWT_FROM_STORE),
            switchMap(() => of(new ClaimsActions.GetClaimsJwtSuccess(data))),
            catchError(() => of(new ClaimsActions.GetClaimsJwtError({ error: 'unable to fetch claims response' }))
        ));
    }
}
