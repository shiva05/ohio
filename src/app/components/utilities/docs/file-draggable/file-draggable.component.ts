import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FileUploader, FileItem, FileLikeObject, ParsedResponseHeaders } from 'ng2-file-upload';
import { environment } from '../../../../../environments/environment';
import * as cuid from 'cuid';

import { DocsService } from '../../../../services/docs.service';
import { FileDraggableState } from '../../../../models/file-draggable-state';
import { DocState, FileState, Docs, DocUploadValidation } from '../../../../models/docs';

import { UtilsContext } from '../../../../models/utils-context';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers';

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
  selector: 'app-file-draggable',
  templateUrl: './file-draggable.component.html',
  styleUrls: ['./file-draggable.component.css']
})
export class FileDraggableComponent implements OnInit, OnChanges {
// export class FileDraggableComponent implements OnInit {
  @Input() fileDraggableStateChild: FileDraggableState = new FileDraggableState();
  @Input() docUploadValidation: DocUploadValidation;
  @Input() uploadAllowedMimeTypes: string[];
  @Output() doLoadDocs = new EventEmitter<any>();

  context: UtilsContext;
  documentState: DocState = new DocState();
  docsResults: Docs[] = null;

  errorMessage = { messageId: 0, message: '' };
  initErrorMessage = { initMessageId: 0, initMessage: '' };

  authJwt = '';
  claimsJwt = '';


  constructor(private store: Store<AppState>, private docService: DocsService) {
  }

  ngOnInit() {
    const utilsContext = this.store.select(state => state.utilsState.utilityContext);
    utilsContext.subscribe((ctx) => {
      this.context = ctx;
    });

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

    this.initFileUploader();
  }

  initFileUploader(): void {

    this.documentState = { ...initialDocumentState };

    this.setJwtToHeader();

    // Reset error message
    this.errorMessage.message = this.initErrorMessage.initMessage;

  }

  // Add "onChange" logic here for updates to this.docUploadValidation
  ngOnChanges(changes: SimpleChanges) {
    if (changes.uploadAllowedMimeTypes || changes.fileDraggableStateChild) {
      this.initFileUploaderWithEvents();
    }
  }

  initFileUploaderWithEvents() {

    this.fileDraggableStateChild.fileUploader =
      new FileUploader({
        url: this.fileDraggableStateChild.uploadUrl,
        autoUpload: true,
        maxFileSize: this.docUploadValidation.uploadMaxFileSize,
        allowedMimeType: this.uploadAllowedMimeTypes,
        queueLimit: this.docUploadValidation.uploadDocumentMaxCount });

    this.fileDraggableStateChild.fileUploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

    // Event fires after a document fails to upload
    this.fileDraggableStateChild.fileUploader.onErrorItem =
    (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {

      this.onErrorItem(item, response, status, headers);

    };

    // Event fires after all document processes have completed
    this.fileDraggableStateChild.fileUploader.onCompleteAll = () => {

      this.onCompleteAll();

    };

    // Event fires after a document fails to upload
    this.fileDraggableStateChild.fileUploader.onWhenAddingFileFailed =
      (item: FileLikeObject, filter: any, options: any) => {

        this.onWhenAddingFileFailed(item, filter, options);

    };
  }

  fileOverBase(event): void {
    this.fileDraggableStateChild.hasBaseDropZoneOver = event;

    if (event) {
      this.errorMessage.message = this.initErrorMessage.initMessage;
    }
  }

  fileOverAnother(event): void {
    this.fileDraggableStateChild.hasAnotherDropZoneOver = event;

    if (event) {
      this.errorMessage.message = this.initErrorMessage.initMessage;
    }
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    // console.log('fileDraggable.fileUploader.onSuccessItem():');
  }

  onCompleteAll(): any {
    // Emit event to parent to update doc list and count
    this.loadDocs();
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const DOC_ERROR_MESSAGE = 'Unable to upload document due to application error.';

    // TODO: Display message on UI if error occurs

    console.log('PCCM fileDraggable.fileUploader.onErrorItem():' +
    ' response = ' + response);

    console.log('PCCM fileDraggable.fileUploader.onErrorItem():' +
    ' status = ' + status);

    this.errorMessage.message = DOC_ERROR_MESSAGE;
  }

  onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any): any {
    // If multiple docs uploaded, will upload documents with valid file size; Ignore invalid sizes and display error msg;
    const FILE_SIZE_ERROR = 'fileSize';
    // If multiple docs uploaded, will upload documents with valid file type; Ignore invalid types and display error msg;
    const MIME_TYPE_ERROR = 'mimeType';
    // Will upload max number of documents; Ignore remainder docs and display error msg;
    const MAX_DOC_COUNT_ERROR = 'queueLimit';

    let docErrorMessage = '';

    switch (filter.name) {
      case FILE_SIZE_ERROR:
        docErrorMessage = `Exceeded maximum size of a document to upload.
          <div>(Max Size allowed: ${this.docUploadValidation.maxFileSizeMb}M)</div>`;
        break;
      case MIME_TYPE_ERROR:
        // const allowedTypes = this.uploadAllowedFileTypes.join(', ');
        const allowedTypes = this.docUploadValidation.uploadAllowedFileTypes.join(', ');
        docErrorMessage = `File Type is not permitted to upload.
          <div>[File: ${item.name}]</div>
          <div>Allowed file types: ${allowedTypes}</div>`;
        break;
      case MAX_DOC_COUNT_ERROR:
        docErrorMessage = `Exceeded limit of documents to upload.
          <div>Maximum number of documents allowed to upload at same time: ${this.docUploadValidation.uploadDocumentMaxCount}</div>`;
        break;
      default:
        docErrorMessage = `Unknown error occurred (Error name is ${filter.name})`;
        break;
    }

    this.errorMessage.message = `** ERROR ** ${docErrorMessage}`;
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

  setJwtToHeader() {
    // Add authorization JWT to header
    this.fileDraggableStateChild.fileUploader.options.headers = [];
    this.fileDraggableStateChild.fileUploader.options.headers.push({ name: 'Authorization', value: 'Bearer ' + this.authJwt });
    this.fileDraggableStateChild.fileUploader.options.headers.push({ name: 'Claims', value: this.claimsJwt });
    this.fileDraggableStateChild.fileUploader.options.headers.push({ name: 'x-requestid', value: cuid() });
  }

  

 

}
