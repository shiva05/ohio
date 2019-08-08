const alignmentSearchAPI = 'http://edu-dev-sbd-alignmentsearch.azurewebsites.net/api/';
const webServer = 'https://edu-dev-sbd.azurewebsites.net/';

const environment = {
  production: true,
  GetAlignmentMetaData: `${alignmentSearchAPI}GetAlignmentMetaData?code=E1ya26DNWM67/EJxQQKsdDR/RtTdW0bt9FIhCptxwUY4i0XUaL9quA==`,
  GetCompetencyData: `${alignmentSearchAPI}GetCTECompetencyMetadata?code=VUcOyaCmFOHX7GJ6S8jmllLiZdue3nsCAoFS3gUSCR0TnHBVaNFxhA==`

};

export { environment };
