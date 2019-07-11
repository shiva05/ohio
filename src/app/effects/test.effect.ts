import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap} from 'rxjs/operators';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as testActions from './../actions/test.actions';
import { TestService } from './../services/test.service';
import { of } from 'rxjs';
import { debug } from 'util';


@Injectable()
export class TestEffects {


    @Effect()
    loadMovies$ =
      this.actions$.pipe(
        ofType(testActions.ADD_TEST),
        mergeMap(() => this.testService.getAll()
          .pipe(
          map(
            movies =>
             ({ type:testActions.LOAD_TEST })),
          catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
          )
        )
      )


   constructor(
     private actions$: Actions,
     private testService: TestService
   ) {}
 }
