// update app APIs here, these should match http://server/swagger/
export const BASE_HREF = '/case';

export const api = function (serverUrl) {
    return {
      GetAlignmentMetaData: `${serverUrl}AlignmentSearch/alignmentsMetadata`,
      GetCompetencyData: `${serverUrl}AlignmentSearch/cteCompetencyMetadata`,
      GetSearchResultData: `${serverUrl}AlignmentSearch/searchResults`,
      GetReportData: `${serverUrl}AlignmentSearch/searchReport`,
      GetDownloadedReport: `${serverUrl}AlignmentSearch/downloadPdfReport`,

      GetCourseMetaData: `${serverUrl}CourseSearch/courseMetadata`,
      GetCourseSearchResult: `${serverUrl}CourseSearch/courseSearchResults`,
      GetCourseSearchReportData: `${serverUrl}CourseSearch/courseSearchReport`,
      GetCourseSearchDownloadedReport: `${serverUrl}CourseSearch/downloadPdfReport`,
    };
};
