import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import { environment } from '../../environments/environment';
import { UtilsContext } from '../models/utils-context';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: AppHttpService) { }

  SubmitFiles(data, utilsContext) {
    return this.http.post(environment.uploadFiles + '?moduleKey=' + utilsContext.moduleKey + '&assetTemplateKey=' + utilsContext.assetTemplateKey + '&detailKey=' +
      utilsContext.detailKey, data);
  }
}
