import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Docs, DocumentHistory, Permission } from '../../../../models/docs';
import { DocsService } from '../../../../services/docs.service';

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
  data: any = [];
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
    const docsKeysToDelete = this.docs.filter((doc) => {
      return doc.todelete;
    }).map((doc) => {
      return { documentKey: doc.docKey, docTypeKey: doc.docTypeKey };
    });
    this.doDeleteDocs.emit(docsKeysToDelete);
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
    return this.showHist[index];
  }

  canDelete() {
    const docsAllowedToDelete = this.docsList.filter(x => x.permission.delete === true);
    if (docsAllowedToDelete != null && docsAllowedToDelete.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  formatDescription(data) {
    this.data = data.split('|');
  }
}

