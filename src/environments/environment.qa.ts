const alignmentSearchAPI = 'http://edu-qa-sbd-alignmentsearch.azurewebsites.net/api/';
const webServer = 'https://edu-dev-sbd.azurewebsites.net/';

const environment = {
    production: false,
    name :"(qa)",
    GetAlignmentMetaData: `${alignmentSearchAPI}GetAlignmentMetaData?code=E1ya26DNWM67/EJxQQKsdDR/RtTdW0bt9FIhCptxwUY4i0XUaL9quA==`,
    GetCompetencyData: `${alignmentSearchAPI}GetCTECompetencyMetadata?code=VUcOyaCmFOHX7GJ6S8jmllLiZdue3nsCAoFS3gUSCR0TnHBVaNFxhA==`,
    GetCourseMetaData: `${alignmentSearchAPI}GetCourseSearchMetadata?code=7xai9trSe6C5gfgUYdj7U4nTS3CkahLTtWDWmQDyuoNHExjYVxRipg==`
};

export { environment };
