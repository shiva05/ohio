import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Docs, DocumentHistory, Permission } from '../../../../models/docs';
import { AlertTypes } from '../../../../models/alerts';
import { ErrorMessages } from '../../../../models/error-messages';
import { DocsService } from '../../../../services/docs.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-list-docs',
  templateUrl: './list-docs.component.html',
  styleUrls: ['./list-docs.component.css']
})
export class ListDocsComponent implements OnInit, OnChanges {

  @Input() docsList: Docs[];
  // @Input() alertType: AlertTypes;
  // @Input() alertMsg: string;
  @Input() hideDocMessages: boolean;
  @Input() docHistoryPermissions: Permission;
  @Input() docReviewPermissions: Permission;

  @Output() doPreviewDoc = new EventEmitter<any>();
  @Output() doDeleteDocs = new EventEmitter<any>();
  @Output() doLoadDocs = new EventEmitter<any>();

  docs = [];
  // disableDelete: boolean = false;
  showHist = [];
  displayHist = false;
  displayDeleteConfirm = false;
  displayDeleteZero = false;
  docDeleteCount = 0;
  currentStyle = '';
  docHistory: DocumentHistory[] = [];

  constructor(private docService: DocsService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.docsList != null && this.docsList.length > 0) {
      this.docs = this.docsList.map((doc) => {
        const reviewed = (doc.docReviewed) ? 'Yes' : 'No';
        return {
          ...doc,
          docFileNameDecoded: doc.docFileName.split('_').join(' '),
          docTypeNameDecoded: doc.docTypeName.split('_').join(' '),
          todelete: false,
          reviewed: reviewed
        };
      });
      // Determine if delete option should be available
      // this.docs.find(x => x)
    } else {
      this.docs = [];
    }

    // Hide any document messages if document list is re-loaded due to tab change
    if (this.hideDocMessages) {
      this.hideDeleteDocMessages();
    }
  }

  previewDoc(doc: Docs) {
    this.doPreviewDoc.emit(doc);
  }

  loadDocs() {
    const hideDeleteDocStatus = true;
    this.doLoadDocs.emit(hideDeleteDocStatus);
  }

  confirmDeleteDocs() {
    this.docDeleteCount = this.docs.filter((doc) => {
      return doc.todelete;
    }).length;

    if (this.docDeleteCount > 0) {
      // Display delete confirmation message
      this.displayDeleteConfirm = true;
      this.displayDeleteZero = false;
    } else {
      // Display warning message that zero documents were selected for deletion
      this.displayDeleteConfirm = false;
      this.displayDeleteZero = true;
    }

    // this.alertMsg = '';
  }

  hideDeleteDocMessages() {
    console.log('list-docs.hideDeleteDocMessages()');

    this.displayDeleteConfirm = false;
    this.displayDeleteZero = false;
  }

  deleteDocs() {
    // console.log('list-docs.deleteDocs() docs = ', this.docs);
    const docsKeysToDelete = this.docs.filter((doc) => {
      return doc.todelete;
    }).map((doc) => {
      return { documentKey: doc.docKey, docTypeKey: doc.docTypeKey };
    });
    // console.log('list-docs.deleteDocs() docsKeysToDelete = ', docsKeysToDelete);
    this.doDeleteDocs.emit(docsKeysToDelete);

    // // TODO: Add BFF delete to handle multiple keys in parameter list

    // Close UI message section for deleting documents
    this.hideDeleteDocMessages();
  }

  openHistory(index: number, documentRelationInstanceKey: number) {
    if (this.showHist[index] === true) {
      this.showHist[index] = false;
    } else {
      this.showHist[index] = true;
    }
  }

    showHistory(index: number) {
      // Get document history
      // this.fetchDocHistory(documentRelationInstanceKey);

      // Set the document description

      // Show history panel
      return this.showHist[index];
      // this.displayHist = !this.displayHist;
    }



  canDelete() {
    const docsAllowedToDelete = this.docsList.filter(x => x.permission.delete === true);
    if (docsAllowedToDelete != null && docsAllowedToDelete.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}

