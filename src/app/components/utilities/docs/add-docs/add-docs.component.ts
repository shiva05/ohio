import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DocsService } from '../../../../services/docs.service';
import { UtilsContext } from '../../../../models/utils-context';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers';
import * as cuid from 'cuid';
import { environment } from '../../../../../environments/environment';

import { DocType, DocTypeLabelValue, DocTypeRecord, DocState, FileState, DocUploadValidation, DocFileType } from '../../../../models/docs';
import { FileDraggableState } from '../../../../models/file-draggable-state';
import { FileUploader } from 'ng2-file-upload';
import { repeat } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

const initialDocumentState: FileState = {
  docTypeKey: 0,
  parentAssetTemplateKey: 0,
  docDescription: '',
  immediateOwnerSourceKey: 0,
  immediateOwnerTypeKey: 0,
  compositeOwnerSourceKey: 0,
  compositeOwnerTypeKey: 0,
  showFileDrop: false
};

@Component({
  selector: 'app-add-docs',
  templateUrl: './add-docs.component.html',
  styleUrls: ['./add-docs.component.css']
})
export class AddDocsComponent implements OnInit {
  @Output() doLoadDocs = new EventEmitter<any>();
  @Output() hideAddDocs = new EventEmitter<any>();

  context: UtilsContext;
  docTypeResults: DocTypeLabelValue[] = null;
  selectedDocType: DocTypeRecord = null;
  documentState: DocState = new DocState();
  docFileTypes: DocFileType[] = null;

  fileDraggableState: FileDraggableState = new FileDraggableState();

  docUploadValidation: DocUploadValidation = new DocUploadValidation();
  uploadAllowedFileTypes: string[] = [];
  uploadAllowedMimeTypes: string[] = [];

  addDocTypes = 'add';

  headers: any;
  authJwt = '';
  claimsJwt = '';

  model = { docTypeId: 0, fileRef: '' };

  constructor(private store: Store<AppState>, private docService: DocsService) {
    this.selectedDocType = new DocTypeRecord();

    this.store.select(appState => appState.authState.authJwt).subscribe(authJwt => {
      // console.log('authJwt', authJwt);
      this.authJwt = authJwt;
    });
    this.store.select(appState => appState.claimsState.claimsJwt).subscribe(claimsJwt => {
      // console.log('claimsJwt', claimsJwt);
      if (claimsJwt !== null) {
          this.claimsJwt = claimsJwt;
      }
    });
  }

  ngOnInit() {
    const utilsContext = this.store.select(state => state.utilsState.utilityContext);
    utilsContext.subscribe((ctx) => {
      this.context = ctx;
    });

    this.initFileUploader();

    this.getAuthorizedDocTypes();
  }

  hide(){
    this.hideAddDocs.emit(true);
  }

  initFileUploader(): void {
    const MAX_FILE_SIZE_MB = 25;
    const MAX_DOC_UPLOAD_COUNT = 5;

    // Fetch file and mime types
    this.getFileTypes();

    this.documentState = { ...initialDocumentState };

    this.fileDraggableState.uploadUrl = this.getDocumentUploadUrl();

    this.fileDraggableState.fileUploader =
      new FileUploader({ url: this.fileDraggableState.uploadUrl, autoUpload: true });

    this.fileDraggableState.fileUploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

    this.docUploadValidation.maxFileSizeMb = MAX_FILE_SIZE_MB;
    this.docUploadValidation.uploadMaxFileSize = MAX_FILE_SIZE_MB * 1024 * 1024;
    this.docUploadValidation.uploadAllowedFileTypes = this.uploadAllowedFileTypes;
    this.docUploadValidation.uploadAllowedMimeTypes = this.uploadAllowedMimeTypes;
    this.docUploadValidation.uploadDocumentMaxCount = MAX_DOC_UPLOAD_COUNT;

  }

  documentTypeChange(event: DocTypeLabelValue) {
    // 'event' is null when 'X' is clicked on dropdownlist
    if (event) {

      this.documentState.docTypeKey = event.value;
      this.documentState.docDescription = event.label;
      this.documentState.showFileDrop = true;

      // Add URL for posting document to cloud
      const url = this.docService.getDocumentUploadUrl(this.context, this.documentState);
      this.fileDraggableState.fileUploader.options.url = url;
      this.fileDraggableState.uploadUrl = url;

    } else {

      this.documentState = { ...initialDocumentState };

    }
  }

  getAuthorizedDocTypes() {
    this.docService.fetchDocTypes(this.context, this.addDocTypes).subscribe((docTypeList: DocType[]) => {
      if (docTypeList != null && docTypeList.length > 0) {
        this.docTypeResults = docTypeList.map((typeData) => {
          return { label: typeData.docTypeName, value: typeData.docTypeKey };
        });
      } else {
        console.log('No doc types found');

        docTypeList = [];
        this.docTypeResults = [];
      }
    },
    (error: HttpErrorResponse) =>
      console.log(`Error Status: ${JSON.stringify(error.status)};
    Error Status Text: ${JSON.stringify(error.statusText)};
    Error Msg: ${JSON.stringify(error.message)};`));
  }

  getFileTypes() {
    this.docService.fetchFileTypes().subscribe((fileTypeList: DocFileType[]) => {

      let allowedFileTypes = fileTypeList.map((typeData: DocFileType) => {
        return typeData.fileExt;
      });

      let filteredFileTypes: string[] = [];

      allowedFileTypes.forEach((item) => {
        if (!filteredFileTypes.includes(item)) {
          filteredFileTypes.push(item);
        }
      });

      this.uploadAllowedFileTypes = filteredFileTypes;

      this.uploadAllowedFileTypes.sort((ft1, ft2): number => {
        if (ft1 < ft2) { return -1; }
        if (ft1 > ft2) { return 1; }
        return 0;
      });

      this.uploadAllowedMimeTypes = fileTypeList.map((typeData: DocFileType) => {
        return typeData.mimeTypeName;
      });

      this.docUploadValidation.uploadAllowedFileTypes = this.uploadAllowedFileTypes;
      this.docUploadValidation.uploadAllowedMimeTypes = this.uploadAllowedMimeTypes;
    });
  }

  getDocumentUploadUrl() {
    let url = '';

    url = environment.DOCS_SAVE_API + '?detailKey=' + this.context.detailKey + '&assetTemplateKey=' + this.context.assetTemplateKey +
      '&docType=' + this.documentState.docTypeKey + '&docTypeName=' + this.documentState.docDescription.split(' ').join('_');

    return url;
  }

  loadDocs() {
    // Emit event to parent to update doc list and count
    const hideDeleteDocStatus = true;
    this.doLoadDocs.emit(hideDeleteDocStatus);
  }
}
