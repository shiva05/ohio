// update app APIs here, these should match http://server/swagger/
export const BASE_HREF = '/case';

export const api = function(serverUrl) {
    return {
      GetAlignmentMetaData: `${serverUrl}AlignmentSearch/alignmentsMetadata`,
      GetCompetencyData: `${serverUrl}AlignmentSearch/cteCompetencyMetadata`,
      GetSearchResultData: `${serverUrl}AlignmentSearch/searchResults`,
      GetReportData: `${serverUrl}AlignmentSearch/searchReport`,
      GetDownloadedReport: `${serverUrl}AlignmentSearch/downloadPdfReport`,
      AsSaveToProfile : `${serverUrl}AlignmentSearch/savePdfReport`,

      GetCourseMetaData: `${serverUrl}CourseSearch/courseMetadata`,
      GetCourseSearchResult: `${serverUrl}CourseSearch/courseSearchResults`,
      GetCourseSearchReportData: `${serverUrl}CourseSearch/courseSearchReport`,
      GetCourseSearchDownloadedReport: `${serverUrl}CourseSearch/downloadPdfReport`,
      CsSaveToProfile : `${serverUrl}CourseSearch/savePdfReport`,

      AUTH_API: serverUrl + 'Auth/authtoken',
      PUBLIC_AUTH_API: serverUrl + 'Auth/publictoken',
      MENU_API: serverUrl + 'Menu/menus',
      Auth_Assets : serverUrl +'Auth/assets',
      // CLAIMS_API :apiServer+'Auth/authclaims',
      safeUrl: '/assets/fake/fake-safe.html',
      FLAGS_GET_API: serverUrl + 'Flag/flags',
      DOCS_GET_DOC_FILE_API: serverUrl + 'Document/documents/file',
      FLAGS_COUNT_GET_API: serverUrl + 'Flag/flags/count',
      DOCS_SAVE_API: serverUrl + 'Document/documents/saved',
      DOCS_IMPORT_GET_API: serverUrl + 'Document/documents/import',
      DOCS_IMPORT_API: serverUrl + 'Document/documents/importing',
      DOCS_MULTI_DELETE_API: serverUrl + 'Document/documents/deleteselected',
      DOCS_DELETE_API: serverUrl + 'Document/documents',
      DOCS_COUNT_GET_API: serverUrl + 'Document/documents/count',
      UTILS_API: serverUrl + 'Menu/utilityNav',
      DOCS_GET_API: serverUrl + 'Document/documents',
      // DOCS_GET_PERMISSIONS_API: API_SERVER + '/assets/fake/docs-response.json',
      DOCS_GET_PERMISSIONS_API: serverUrl + 'Document/permissions',
      // DOCS_GET_HISTORY_API: API_SERVER + '/assets/fake/docs-response.json',
      DOCS_GET_HISTORY_API: serverUrl + 'Document/history',
      // DOCS_GET_STATUS_API: API_SERVER + '/assets/fake/docs-response.json',
      DOCS_GET_STATUS_API: serverUrl + 'Document/statuses',
      // DOCS_UPDATE_STATUS_API: API_SERVER + '/assets/fake/docs-response.json',
      DOCS_UPDATE_STATUS_API: serverUrl + 'Document/status',
      DOCS_GET_DOC_TYPES_API: serverUrl + 'Document/doctypes',
      DOCS_GET_FILE_TYPES_API: serverUrl + 'Document/filetypes',
      COMMENT_SUBJECTS: serverUrl + 'Comment/subjects',
      COMMENT_SUBJECTS_COUNT: serverUrl + 'Comment/subjects/count',
      COMMENT_COMMENTS:  serverUrl + 'Comment/subjects/{subjectKey}/comments'
    };
};
