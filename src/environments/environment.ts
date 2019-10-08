// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.




import { api } from './api';

const alignmentSearchAPI = 'https://edu-dev-sbd-alignmentsearch.azurewebsites.net/api/';
const webServer = 'https://edu-dev-sbd.azurewebsites.net/';
const apiServer = 'https://edu-dev-sbd-gateway.azurewebsites.net/api/v1/';


const childWebSPAs = [
  {
      Name: 'Standard by Design',
    WebServer: 'localhost',
      SpaServer: 'localhost:4200',
      SystemKey: 21
  }];

const hostname = window.location.hostname;
const currentSpa = childWebSPAs.find(x => x.WebServer === hostname);

const environment = {
  ...api(apiServer),
  production: false,
  name: '(DEV)',
  localhost: true,
  systemKey : currentSpa.SystemKey,

};


export { environment };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
