import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpService } from './app-http.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: AppHttpService) { }

  fetchJwt(token: string) {
    debugger
    const url = environment.AUTH_API + '?token=' + encodeURIComponent(token);
    return this.http.get(url);
  }

  fetchPublicJwt(systemKey: number) {
    const url = environment.PUBLIC_AUTH_API + '?systemKey=' + systemKey;
    return this.http.get(url);
  }

  isAuthorized(): boolean {
    return  localStorage.getItem(environment.name + '_at') !== null &&
    localStorage.getItem(environment.name + '_as') !== null;
  }

  isAuthTokenExpired(): boolean {
    const jwt  = localStorage.getItem(environment.name + '_as');
    const hasValidToken =  localStorage.getItem(environment.name + '_at') !== null && jwt !== null;
    let expired = false;
    if (hasValidToken) {
      const authToken = JSON.parse(jwt);
      if (authToken !== null) {
        // const expiryDate = new Date(authToken.jwt.expires);
        // const currentDt = environment.localhost
        //       ? new Date(new Date(Date.now()).getTime() + 21600000)
        //       : new Date(Date.now());
        const currentDt = new Date(Date.now());
        const expiryDate = environment.localhost
                ? new Date(new Date(authToken.expires).getTime() - 14400000)  // 4 hours: 5: Hours during Day Light Savings
                : new Date(authToken.expires);

        if (expiryDate < currentDt) {
          expired = true;
          console.log('Token expired; Get new Token');
        }
      }
    }

    return expired;
  }
}
