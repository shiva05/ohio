import { api } from './api';

const alignmentSearchAPI = 'https://edu-qa-sbd-alignmentsearch.azurewebsites.net/api/';
const webServer = 'https://edu-qa-sbd.azurewebsites.net/';
const apiServer = 'https://edu-qa-sbd-gateway.azurewebsites.net/api/';



const childWebSPAs = [
  {
      Name: 'Standard by Design',
      WebServer: 'edu-qa-sbd.azurewebsites.net',
      SpaServer: 'localhost:4200',
      SystemKey: 21
  }];

const hostname = window.location.hostname;
const currentSpa = childWebSPAs.find(x => x.WebServer === hostname);

const environment = {
    ...api(apiServer),
    production: false,
    name: '(qa)',
    localhost: true,
    systemKey : currentSpa.SystemKey,

};

export { environment };
