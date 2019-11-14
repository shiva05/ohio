import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoaderService } from './loader.service';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import * as AuthActions from './../actions/auth-actions';
import * as ClaimsActions from './../actions/claims-actions';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthOrchestration } from './../services/auth-orchestration.service';


@Injectable()

export class HttpLoadInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService, private store: Store<AppState>, private rout: Router, private authOrchestration: AuthOrchestration) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loaderService.isLoading.next(true);
    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            this.removeRequest(req); observer.error(err);
            if (err.status === 401) {
              const isPublicUser = localStorage.getItem(environment.name + '_at') === 'Public';
              if (isPublicUser) {
                // Navigate to the login page for Public
                this.showPublicLogin();
              } else {
                // Navigate to Safe Login Page
                this.showSafeLogin();
              }
            }
          },
          () => { this.removeRequest(req); observer.complete(); });
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
  showSafeLogin() {
    this.store.dispatch(new AuthActions.ResetAuth({}));
    this.store.dispatch(new ClaimsActions.ResetClaims({}));
    // window.location.href = environment.safeUrl;
    this.rout.navigate(['']);
    this.authOrchestration.handleAuthentication(null, false);
  }

  showPublicLogin() {
    this.store.dispatch(new AuthActions.ResetAuth({}));
    this.store.dispatch(new ClaimsActions.ResetClaims({}));
    // window.location.href = `${window.location.protocol}//${window.location.host}`;
    this.rout.navigate(['']);
    this.authOrchestration.handleAuthentication(null, false);
  }
}
