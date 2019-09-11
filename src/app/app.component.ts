import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { AuthOrchestration } from './services/auth-orchestration.service';
import * as AuthActions from './actions/auth-actions';
import * as ClaimsActions from './actions/claims-actions';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { LoaderService } from './services/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'StandardsByDesignWeb';
  isLocal = false;
  appError = false;
  errorMessage = '';
  isPublic = false;
  loading = true;

  constructor(private http: HttpClient,
              private store: Store<AppState>,
              public loaderService: LoaderService,
              private translate: TranslateService,
              private authService: AuthService,
              private authOrchestration: AuthOrchestration) {
    translate.setDefaultLang('en');
   }

  ngOnInit() {

    this.isLocal = environment.localhost;
    //this.titleService.setTitle(environment.title);
    const params = new URLSearchParams(window.location.search);
    const fromSafe = (params.get('auth') === 'dev' || params.get('auth') === 'qa' || params.get('auth') === 'prod');

    if (fromSafe) {
      // reset both stores since we're starting over
      this.showSafeLogin();
      return;
    }

    const token = params.get('token');
    const authorized = this.authService.isAuthorized();
    const expired = this.authService.isAuthTokenExpired();

    if (token) {
      // Internal User; Get Auth and Claims Token using the safe token
      this.authOrchestration.handleAuthentication(token, false);
    } else {
      // Two Possibilities
      // 1. Public User
      // 2. Page Refresh Internal or Public User
      if (!authorized) {
        // Public User
        this.authOrchestration.handleAuthentication(null, false);
      } else {
        // There is a token in Session Storage
        if (expired) {
          // The token in session storage is expired
          const isPublicUser = localStorage.getItem(environment.name + '_at') === 'Public';
          if (isPublicUser) {
            // Navigate to the login page for Public
            //this.showPublicLogin();
          } else {
            // Navigate to Safe Login Page
            //this.showSafeLogin();
          }
          return;
        } else {
          // token  in session storage is not expired
          this.authOrchestration.handleAuthentication(null, true);
        }
      }
    }

    this.store.select('authState').subscribe((authState) => {
      this.appError = (authState.error !== null);
      this.errorMessage = (authState.error !== null) ? authState.error.error : '';
      if (authState != null) {
        this.isPublic = authState.isPublic;
        const userType = authState.isPublic ? 'Public' : 'Internal';
        localStorage.setItem(environment.name + '_at', userType);
      }
      // call this when they are all set
      if (authState.authJwt != null) {
        this.authOrchestration.handleClaims(authState.selectedOrg, authState.selectedAudience, authState.selectedApplication);
      }

      // console.log('authState:', authState);
      if (authState && authState.error) {
        this.appError = true;
        this.errorMessage = authState.error.error;
        this.loading = false;
      }
    });





  }

  showSafeLogin() {
    this.store.dispatch(new AuthActions.ResetAuth({}));
    this.store.dispatch(new ClaimsActions.ResetClaims({}));
    window.location.href = environment.safeUrl;
  }

  showPublicLogin() {
    this.store.dispatch(new AuthActions.ResetAuth({}));
    this.store.dispatch(new ClaimsActions.ResetClaims({}));
    window.location.href = `${window.location.protocol}//${window.location.host}`;
  }
}

