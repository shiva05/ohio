import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Docs, ImportDocs, Permission } from '../../../models/docs';
import { DocsService } from '../../../services/docs.service';
import { UtilsContext } from '../../../models/utils-context';
import { AlertTypes } from '../../../models/alerts';

import { HttpErrorResponse } from '@angular/common/http';

enum DocsPanels {
  add = 'add',
  import = 'import',
  preview = 'preview',
  none = ''
}

@Component({
  selector: 'utils-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {
  @Input() docs: Docs[];
  @Input() importDocs: ImportDocs[];
  @Input() utilsContext: UtilsContext;
  @Input() docStatusMessage: string;
  @Input() alertType: AlertTypes;
  @Input() alertMsg: string;
  @Input() addDocPermissions: Permission;
  @Input() importDocPermissions: Permission;
  @Input() docHistoryPermissions: Permission;
  @Input() docReviewPermissions: Permission;
  @Input() hideDocMessages: boolean;

  @Output() doLoadDocs = new EventEmitter<any>();
  @Output() doDeleteDocs = new EventEmitter<any>();
  @Output() doLoadImportDocs = new EventEmitter<any>();
  @Output() doImportDocs = new EventEmitter<any>();

  panels: DocsPanels;
  showAdd = false;
  showImport = false;
  showPreview = false;

  docName = '';
  docUrl = '';
  docResponseType = '';
  docPreviewFlag = false;
  docRelationInstanceId = 0;

  constructor(private docsService: DocsService) { }

  ngOnInit() {
  }

  show(panel: DocsPanels) {
    this.showAdd = (panel === DocsPanels.add && !this.showAdd);
    this.showImport = (panel === DocsPanels.import && !this.showImport);
    this.showPreview = (panel === DocsPanels.preview && !this.showPreview);

    const hideDeleteDocStatus = true;
    this.clearDocStatusMessage(hideDeleteDocStatus);

    if (this.showImport) {
      // Get document list for import
      this.importDocs = [];
      this.doLoadImportDocs.emit();
    }
  }

  showDocPanel(panel: DocsPanels, displayFlag: boolean) {
    this.showAdd = (panel === DocsPanels.add && displayFlag);
    this.showImport = (panel === DocsPanels.import && displayFlag);
    this.showPreview = (panel === DocsPanels.preview && displayFlag);

    const hideDeleteDocStatus = true;
    this.clearDocStatusMessage(hideDeleteDocStatus);
  }

  loadDocs(hideDeleteDocStatus: boolean) {
    // Emit event to parent to update doc list and count
    this.doLoadDocs.emit(hideDeleteDocStatus);
  }

  testLoadDocs() {
    // this service is in container since it's responsible for counts
    const hideDeleteDocStatus = true;
    this.doLoadDocs.emit(hideDeleteDocStatus);
  }

  deleteDocs(docKeys) {
    // console.log('doc keys', docKeys);
    this.doDeleteDocs.emit(docKeys);
  }

  hideImportDocs(closeDocImport) {
    if (closeDocImport) {
      this.showImport = false;
    }
  }

  hideAddDocs(closeDocAdd) {
    if (closeDocAdd) {
      this.showAdd = false;
    }
  }

  importingDocs(docKeys) {
    this.doImportDocs.emit(docKeys);
    this.hideImportDocs(true);
  }

  previewDoc(doc: Docs) {

    this.docName = doc.docFileName;
    this.docUrl = doc.docUrl;
    this.docResponseType = doc.docResponseType;
    this.docPreviewFlag = doc.docPreviewFlag;
    this.docRelationInstanceId = doc.documentRelationInstanceKey;

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // IE - Do not show the preview
      this.docsService.fetchDocFileByUrl(this.utilsContext, doc.docUrl).subscribe((file: Blob) => {
        this.docResponseType = file.type;
         const docBlob = new Blob([file], { type:   'application/pdf'  });
         window.navigator.msSaveOrOpenBlob(docBlob, doc.docFileName+'.pdf');
      });
    } else {
      // Other Browsers
      // this.showDocPanel(DocsPanels.preview, false);
      // setTimeout(() => {
      //   this.showDocPanel(DocsPanels.preview, true);
      // }, 500);
      this.docsService.fetchDocFileByUrl(this.utilsContext,  doc.docUrl).subscribe((file: Blob) => {
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
  }

  closePreviewDoc() {
    this.showPreview = false;
    this.loadDocs(true);
  }

  // clearDocStatusMessage() {
  //   this.docStatusMessage = '';
  //   this.hideDocMessages = true;
  // }

  clearDocStatusMessage(hideDeleteDocStatus: boolean) {
    if (hideDeleteDocStatus) {
      this.docStatusMessage = '';
    }

    this.hideDocMessages = true;
  }
}

