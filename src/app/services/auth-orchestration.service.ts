import { Injectable } from '@angular/core';
import { AppState } from './../app.state';
import { Store } from '@ngrx/store';
import * as AuthActions from '../actions/auth-actions';
import * as ClaimsActions from '../actions/claims-actions';
import * as _ from 'lodash';
import { Organization } from '../models/organization';
import { Audience } from '../models/audience';
import { Application } from '../models/application';
import { environment } from 'src/environments/environment';

@Injectable()

export class AuthOrchestration {
  constructor(private store: Store<AppState>) { }

  handleAuthentication(token: string = null, loadFromStore: boolean) {
    if (loadFromStore) {
      this.store.dispatch(new AuthActions.GetJwtTokenFromStore(true));
      this.store.dispatch(new ClaimsActions.GetClaimsJwtFromStore(true));
    } else {
      // reset both stores since we're starting over
      this.store.dispatch(new AuthActions.ResetAuth({}));
      this.store.dispatch(new ClaimsActions.ResetClaims({}));

      // get the auth jwt token
      if (token) {
        this.store.dispatch(new AuthActions.GetJwtToken(token));
      } else {
        this.store.dispatch(new AuthActions.GetPublicJwtToken(environment.systemKey));
      }
    }

    // subscribe only to changes in orgID, call apps and audiences service
    this.store.select(appState => appState.authState.orgs).subscribe(orgs => {
      if (orgs) {
        this.autoSelectOrg(orgs);
      }
    });

    this.store
      .select(appState => appState.authState.selectedOrg)
      .subscribe(selectedOrg => {
        if (selectedOrg && selectedOrg.Audiences) {
          this.autoSelectAudience(selectedOrg.Audiences);
        }
      });

    this.store
      .select(appState => appState.authState.selectedAudience)
      .subscribe(selectedAudience => {
        if (selectedAudience && selectedAudience.Applications) {
          this.autoSelectApplication(selectedAudience.Applications);
        }
      });
  }

  handleClaims(org, aud, app) {
    if (org && aud && app) {
      const claimsObj = {
        org_id: org.Org_id,
        aud_id: aud.Aud_id,
        app_id: app.App_id
      };
      this.store.dispatch(new ClaimsActions.GetClaimsJwt(claimsObj));
    }
  }

  handleAutoNavigate() { }

  autoSelectOrg(orgs: Organization[]) {
    if (orgs.length === 1) {
      this.store.dispatch(new AuthActions.SetSelectedOrg(_.first(orgs)));
    }
  }

  autoSelectAudience(audiences: Audience[]) {
    if (audiences.length === 1) {
      this.store.dispatch(
        new AuthActions.SetSelectedAudience(_.first(audiences))
      );
    }
  }

  autoSelectApplication(applications: Application[]) {
    if (applications.length === 1) {
      this.store.dispatch(
        new AuthActions.SetSelectedApplication(_.first(applications))
      );
    }
  }
}
