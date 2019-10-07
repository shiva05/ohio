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
      SystemKey: 20
  }];

const hostname = window.location.hostname;
const currentSpa = childWebSPAs.find(x => x.WebServer === hostname);

const environment = {
  ...api(apiServer),
  production: false,
  name: '(DEV)',
  localhost: true,
  AUTH_API: apiServer + 'Auth/authtoken',
  PUBLIC_AUTH_API: apiServer + 'Auth/publictoken',
  systemKey : currentSpa.SystemKey,
  MENU_API: apiServer + 'Menu/menus',
  Auth_Assets : apiServer +'Auth/assets',
  // CLAIMS_API :apiServer+'Auth/authclaims',
  safeUrl: '/assets/fake/fake-safe.html',
  FLAGS_GET_API: apiServer + 'Flag/flags',
  DOCS_GET_DOC_FILE_API: apiServer + 'Document/documents/file',
  FLAGS_COUNT_GET_API: apiServer + 'Flag/flags/count',
  DOCS_SAVE_API: apiServer + 'Document/documents/saved',
  DOCS_IMPORT_GET_API: apiServer + 'Document/documents/import',
  DOCS_IMPORT_API: apiServer + 'Document/documents/importing',
  DOCS_MULTI_DELETE_API: apiServer + 'Document/documents/deleteselected',
  DOCS_DELETE_API: apiServer + 'Document/documents',
  DOCS_COUNT_GET_API: apiServer + 'Document/documents/count',
  UTILS_API: apiServer + 'Menu/utilityNav',
  DOCS_GET_API: apiServer + 'Document/documents',
  // DOCS_GET_PERMISSIONS_API: API_SERVER + '/assets/fake/docs-response.json',
  DOCS_GET_PERMISSIONS_API: apiServer + 'Document/permissions',
  // DOCS_GET_HISTORY_API: API_SERVER + '/assets/fake/docs-response.json',
  DOCS_GET_HISTORY_API: apiServer + 'Document/history',
  // DOCS_GET_STATUS_API: API_SERVER + '/assets/fake/docs-response.json',
  DOCS_GET_STATUS_API: apiServer + 'Document/statuses',
  // DOCS_UPDATE_STATUS_API: API_SERVER + '/assets/fake/docs-response.json',
  DOCS_UPDATE_STATUS_API: apiServer + 'Document/status',
  DOCS_GET_DOC_TYPES_API: apiServer + 'Document/doctypes',
  DOCS_GET_FILE_TYPES_API: apiServer + 'Document/filetypes',
  COMMENT_SUBJECTS: apiServer + 'Comment/subjects',
  COMMENT_SUBJECTS_COUNT: apiServer + 'Comment/subjects/count',
  COMMENT_COMMENTS:  apiServer + 'Comment/subjects/{subjectKey}/comments'
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
