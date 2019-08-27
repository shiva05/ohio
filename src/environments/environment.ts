// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const alignmentSearchAPI = 'https://edu-dev-sbd-alignmentsearch.azurewebsites.net/api/';
const webServer = 'https://edu-dev-sbd.azurewebsites.net/';
const userApi = 'https://edu-dev-sbd-commonfunctions.azurewebsites.net/api/';

const environment = {
  production: false,
  name: '(DEV)',
  GetAlignmentMetaData: `${alignmentSearchAPI}GetAlignmentMetaData?code=E1ya26DNWM67/EJxQQKsdDR/RtTdW0bt9FIhCptxwUY4i0XUaL9quA==`,
  GetCourseMetaData: `${alignmentSearchAPI}GetCourseSearchMetadata?code=7xai9trSe6C5gfgUYdj7U4nTS3CkahLTtWDWmQDyuoNHExjYVxRipg==`,
  GetCompetencyData: `${alignmentSearchAPI}GetCTECompetencyMetadata?code=VUcOyaCmFOHX7GJ6S8jmllLiZdue3nsCAoFS3gUSCR0TnHBVaNFxhA==`,
  GetSearchResultData: `${userApi}SearchAlignments?code=wyCpr8XXH2VJEOTx9OLB1E2URsGMi7rOJ3xNTYipccXbGkVodBXd0A==`,
  GetCourseSearchResult: `${userApi}GetCourseSearchResults?code=gQisfH5rAr8gU64EymE4N3eXE6h0YNKqGfKLDzdZaHmr6Im2kGvH7g==`,
  GetReportData: `${userApi}GetCTEAlignmentSearchReport?code=Qjp8OlEY1C4fCfz6WD7F1C/nTLUkrDp2ieI7/tJJXeH9AZo4ioPauQ==`,
  GetCourseSearchReportData: `${userApi}GetCourseSearchReport?code=zaotM7g/5ER2nfrpa9/l/TSIpAAyFw29vjPNiSAnI8lXjhuvPLw0Iw==`,
  GetDownloadedReport: `${userApi}DownloadReport?code=PfEH7CvobnXFfZ41tJ9bLl/3c0kyKv/oposUqcDLkbr1IXjjTeqs2Q==`
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
