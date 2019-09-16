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
import { Utilities } from './models/util-nav-item';
import { UtilsContext } from './models/utils-context';
import * as UtilsActions from './actions/utils-actions';
import { NavResize } from './actions/nav-actions';
import { InteropService } from './services/interop.service';
import { InteropDataPacket } from './models/interop-datapacket';
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
  ready = false;
  mainWidth = window.innerWidth - 80;
  mainLeft = 56;
  utilsWidth = 0;
  mainHeight = 1400;
  currentUtil: Utilities = Utilities.none;
  constructor(private http: HttpClient,
              private store: Store<AppState>,
              public loaderService: LoaderService,
              private translate: TranslateService,
              private authService: AuthService,
              private interopService: InteropService,
              private authOrchestration: AuthOrchestration) {
    translate.setDefaultLang('en');
    window.onresize = () => {
      this.utilNav(this.currentUtil);
    };
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

    this.store.select('claimsReducer').subscribe((claimsState) => {

      this.ready = (claimsState.claimsJwtPayload.app_id !== null);       // show the reset of app
      // if (this.ready) {
      //   // this.loading = false;
      //   // claimsState.menus.items.forEach(item => {
      //   //   // if (item.menuKey === claimsState.menus.defaultMenuKey) {
      //   //   //   // this.mySource = item.url;
      //   //   //   // this.mapPathToApp(item.url);
      //   //   // }
      //   // });
      //   // use this when testing locally so you don't need to click everything.
      //   // this.testUtilsOnLoad();
      // }

      // // console.log('claimsState:' , claimsState);
      // if (claimsState && claimsState.error) {
      //   this.appError = true;
      //   this.errorMessage = claimsState.error.error;
      //   this.loading = false;
      // }
    });

    const utilsContext = this.store.select(state => state.utilsState.utilityContext);
    utilsContext.subscribe((ctx) => {
      // if (ctx !== null && ctx.detailKey > 0 && ctx.assetTemplateKey !== 154000) {
      // if (ctx !== null && ctx.isDetailAsset && ctx.moduleKey) {
      //   console.log('MENU SPA SUBSCRIBING TO CONTEXT CHANGE FROM CASE SPA - CHECKING DETAIL BOOLEAN', ctx.isDetailAsset);
      //   console.log('MENU SPA SUBSCRIBING TO CONTEXT CHANGE FROM CASE SPA - CHECKING MODULE KEY', ctx.moduleKey);
      // }

      // if (ctx !== null && ctx.detailKey > 0 && ctx.isDetailAsset) {
      //   this.currentAssetTemplateKey = ctx.assetTemplateKey;
      // }
      // else {
      //   this.currentAssetTemplateKey = 0;
      // }
    });

    this.store.select('utilsState').subscribe((utilityState) => {
      if (utilityState && utilityState.activeUtility) {
        this.utilNav(utilityState.activeUtility);
      }
    });

    this.store.select('utilsState', 'utilityContext').subscribe((current: UtilsContext) => {
      if (current) {
        this.store.dispatch(new UtilsActions.UtilsContextChanged(current));
      }
    });


    this.interopService.dataStream().subscribe((data: InteropDataPacket) => {
            debugger
            // console.log('utilsContext:', data);
            if (data && data.utilsContext && data.utilsContext.detailKey > 0) {
              this.store.dispatch(new UtilsActions.UtilsSetContext(data.utilsContext));
            } else {
              this.store.dispatch(new UtilsActions.UtilsReset({}));
            }
            if (data && data.url && data.url !== document.location.pathname) {
              history.pushState(null, null, data.url);
            }
            if (data && data.appSize && data.appSize.scrollHeight > 0) {
              this.mainHeight = data.appSize.scrollHeight + 250;
            }

            if (data && data.utilsContext.moduleKey > 0) {
              console.log(' handshake from child SPA completed: ',  new Date().toLocaleString());
              this.loading = false;
            }

            if (data && data.error) {
              this.appError = true;
              this.errorMessage = data.error.error;
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
  setIframeWidth(utilWidth: number) {
    this.utilsWidth = utilWidth;
    this.mainWidth = window.innerWidth - 75 - utilWidth;
    this.mainLeft = utilWidth;
    const newIframeWidth = window.innerWidth - utilWidth - 20;
    this.store.dispatch(new NavResize(newIframeWidth));
  }

  utilNav(util: Utilities) {
    this.currentUtil = util;
    const baseWidth = window.innerWidth - 75;
    // define target widths for each utility
    const targetWidth = {};

    targetWidth[Utilities.Documents] = baseWidth * .5;
    targetWidth[Utilities.Flags] = baseWidth * .3;
    targetWidth[Utilities.contacts] = baseWidth * .4;
    targetWidth[Utilities.history] = baseWidth * .2;
    targetWidth[Utilities.Comments] = baseWidth * .4;

    const width = (util !== Utilities.none) ? targetWidth[util] : 55;
    this.setIframeWidth(width);
  }
}

