import { api } from './api';

const alignmentSearchAPI = 'https://edu-qa-sbd-alignmentsearch.azurewebsites.net/api/';
const webServer = 'https://edu-qa-sbd.azurewebsites.net/';
const apiServer = 'https://edu-qa-sbd-gateway.azurewebsites.net/api/';

const environment = {
    ...api(apiServer),
    production: false,
    name: '(qa)',

};

export { environment };
