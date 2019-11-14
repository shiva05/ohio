import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UtilsContext } from '../../../../models/utils-context';
import { DocsService } from '../../../../services/docs.service';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { DocumentStatusUpdate, DocStatus, UpdateDocumentStatus, Permission } from '../../../../models/docs';

@Component({
  selector: 'app-preview-docs',
  templateUrl: './preview-docs.component.html',
  styleUrls: ['./preview-docs.component.css']
})
export class PreviewDocsComponent implements OnInit, AfterViewInit {
  @Input() docName = '';
  @Input() docUrl = '';
  @Input() docResponseType = '';
  @Input() docPreviewFlag = false;
  @Input() docRelationInstanceId: number;
  @Input() docReviewPermissions: Permission;

  @Output() closePreviewDoc = new EventEmitter<any>();

  // @ViewChild('myIframe') myIframe: ElementRef;
  // @ViewChild('objData') objData: ElementRef;
  // @ViewChild('embedSrc') embedSrc: ElementRef;

  context: UtilsContext;
  objUrl: any;
  embedUrl: any;

  docStatusUpdate: DocumentStatusUpdate = { currentStatus: '', documentStatuses: [], authorizedToUpdate: false };
  updateDocStatusModel: UpdateDocumentStatus = { documentRelationInstanceKey: null, documentStatusKey: null };
  constructor(private docService: DocsService, private store: Store<AppState>) { }

  ngOnInit() {

    if (this.docPreviewFlag) {
      const utilsContext = this.store.select(state => state.utilsState.utilityContext);
      utilsContext.subscribe((ctx) => {
        this.context = ctx;
      });

      const docUrl = this.docUrl;

      // Blob
      this.docService.fetchDocFileByUrl(this.context, docUrl).subscribe((file: Blob) => {

        this.docResponseType = file.type;

        const docBlob = new Blob([file], { type: this.docResponseType });
        const fileUrl = window.URL.createObjectURL(docBlob);

        this.objUrl = fileUrl;
        this.embedUrl = fileUrl;

        // Get document statuses
        //this.fetchDocStatuses();
      },
        (error: HttpErrorResponse) =>
          console.log(`Error Status: ${JSON.stringify(error.status)};
        Error Status Text: ${JSON.stringify(error.statusText)};
        Error Msg: ${JSON.stringify(error.message)};`));
    }
  }

  ngAfterViewInit() {
  }

  onDownloadDoc() {
    const utilsContext = this.store.select(state => state.utilsState.utilityContext);
    utilsContext.subscribe((ctx) => {
      this.context = ctx;
    });

    const docUrl = this.docUrl;

    // Blob
    this.docService.fetchDocFileByUrl(this.context, docUrl).subscribe((file: Blob) => {
      let docName = '';

      if (this.docName == null || this.docName === '') {
        docName = 'Unknown.txt';
      }

      this.docResponseType = file.type;

      const docBlob = new Blob([file], { type: this.docResponseType });

      const fileUrl = window.URL.createObjectURL(docBlob);

      // Download document logic
      const downloadLink = document.createElement('a');
      downloadLink.href = fileUrl;
      downloadLink.download = this.docName;
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // window.URL.revokeObjectURL(fileUrl);
    },
      (error: HttpErrorResponse) =>
        console.log(`Error Status: ${JSON.stringify(error.status)};
      Error Status Text: ${JSON.stringify(error.statusText)};
      Error Msg: ${JSON.stringify(error.message)};`));
  }

  updateDocumentStatus(documentStatusKey: number) {
    this.updateDocStatusModel.documentStatusKey = documentStatusKey;
    this.updateDocStatusModel.documentRelationInstanceKey = this.docRelationInstanceId;

    this.docService.updateDocumentStatus(this.context, this.updateDocStatusModel).subscribe(() => {
      // Get document statuses
      this.fetchDocStatuses();
    });

  }

  fetchDocStatuses() {
    // Get document statuses
    this.docService.fetchDocStatuses(this.context, this.docRelationInstanceId).subscribe((docStatusUpdate: DocumentStatusUpdate) => {
      this.docStatusUpdate.documentStatuses = docStatusUpdate.documentStatuses.filter(status => status.documentStatusSelected !== true);
      this.docStatusUpdate.authorizedToUpdate = docStatusUpdate.authorizedToUpdate;
      this.docStatusUpdate.currentStatus
        = docStatusUpdate.documentStatuses.find(status => status.documentStatusSelected === true).documentStatusName;
    },
      (error: HttpErrorResponse) =>
        console.log(`Error Status: ${JSON.stringify(error.status)};
    Error Status Text: ${JSON.stringify(error.statusText)};
    Error Msg: ${JSON.stringify(error.message)};`));
  }

  onClosePreviewDoc(event) {
    this.closePreviewDoc.emit({});
  }

  canChangeStatus() {
    return (this.docStatusUpdate.authorizedToUpdate) ? '' : 'disabled';
  }
}
