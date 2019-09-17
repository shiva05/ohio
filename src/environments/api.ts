// update app APIs here, these should match http://server/swagger/
export const BASE_HREF = '/case';

export const api = function (serverUrl) {
    return {
      GetAlignmentMetaData: `${serverUrl}AlignmnetSearch/alignmentsMetadata`,
      GetCompetencyData: `${serverUrl}AlignmnetSearch/cteCompetencyMetadata`,
      GetSearchResultData: `${serverUrl}AlignmnetSearch/searchResults`,
      GetReportData: `${serverUrl}AlignmnetSearch/searchReport`,
      GetDownloadedReport: `${serverUrl}AlignmnetSearch/downloadPdfReport`,

      GetCourseMetaData: `${serverUrl}CourseSearch/courseMetadata`,
      GetCourseSearchResult: `${serverUrl}CourseSearch/courseSearchResults`,
      GetCourseSearchReportData: `${serverUrl}CourseSearch/courseSearchReport`,
      GetCourseSearchDownloadedReport: `${serverUrl}CourseSearch/downloadPdfReport`,
    };
};
