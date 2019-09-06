// update app APIs here, these should match http://server/swagger/
export const BASE_HREF = '/case';

export const api = function (serverUrl) {
    return {
      GetAlignmentMetaData: `${serverUrl}GetAlignmentMetaData?code=E1ya26DNWM67/EJxQQKsdDR/RtTdW0bt9FIhCptxwUY4i0XUaL9quA==`,
      GetCompetencyData: `${serverUrl}GetCTECompetencyMetadata?code=VUcOyaCmFOHX7GJ6S8jmllLiZdue3nsCAoFS3gUSCR0TnHBVaNFxhA==`,
      GetSearchResultData: `${serverUrl}AlignmnetSearch/SearchAlignments`,
      GetReportData: `${serverUrl}AlignmnetSearch/searchReport`,
      GetDownloadedReport: `${serverUrl}AlignmnetSearch/downloadPdfReport`,

      GetCourseMetaData: `${serverUrl}CourseSearch/courseMetadata`,
      GetCourseSearchResult: `${serverUrl}CourseSearch/courseSearchResults`,
      GetCourseSearchReportData: `${serverUrl}CourseSearch/courseSearchReport`,
    };
};
