import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import { environment } from '../../environments/environment';
import { UtilsContext } from '../models/utils-context';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: AppHttpService) { }

  SubmitFiles(data ) : Observable<object> {
    const formData: FormData = new FormData();
    formData.append(data[0].id, data[0],  data[0].name);
    formData.append(data[1].id, data[1], data[1].name);
    formData.append(data[2].id, data[2], data[2].name);
    formData.append(data[3].id, data[3], data[3].name);
    formData.append(data[4].id, data[4], data[4].name);
    formData.append(data[5].id, data[5], data[5].name);
    return this.http.post(environment.UPLOADFILES + '?moduleKey=32&assetTemplateKey=242710&detailKey=1',formData ,);
  }
}
