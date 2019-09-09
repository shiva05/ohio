import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpService } from './app-http.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ClaimsService {

  constructor(private http: AppHttpService) { }

  fetchClaimsJwt(claimsObject) {
    const url = environment.MENU_API + '?OrgKey=' + claimsObject.org_id
      + '&AudienceKey=' + claimsObject.aud_id
      + '&ApplicationKey=' + claimsObject.app_id;

    return this.http.get(url);
  }

}
