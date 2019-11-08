import { Injectable } from '@angular/core';
import { AppHttpService } from './app-http.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: AppHttpService) { }

  SubmitFiles(data) {
    return this.http.post(environment.uploadFiles, data);
  }
}
