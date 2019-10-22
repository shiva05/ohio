import { Component, OnInit ,ElementRef} from '@angular/core';
import { Utilities } from '../../models/util-nav-item';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import * as UtilsActions from '../../actions/utils-actions';
import { environment } from '../../../environments/environment';

import { UtilsContext } from '../../models/utils-context';
import { FlagService } from '../../services/flag.service';
import { Flags } from '../../models/flags';
import { DocsService } from '../../services/docs.service';
import { Docs, DocDeleteRecords, DocDeleteRecord, ImportDocs, DocImportRecord, DocImportRecords } from '../../models/docs';
import { CommentsService } from 'src/app/services/comments.service';
import { CommentSubject, CommentResponseViewModel, CommentSources } from 'src/app/models/comment-subject';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertTypes } from '../../models/alerts';
import { Permission } from '../../models/permission';
import { forkJoin } from 'rxjs';

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.css']
})
export class UtilityComponent implements OnInit {

  showDocs = false;
  showFlags = false;
  showContacts = false;
  showHistory = false;
  showComments = false;
  context: UtilsContext;
  flagResults: Flags = null;
  flagOverviewResults: Flags = null;
  docsResults: Docs[] = null;
  importDocsResults: ImportDocs[] = null;
  subjects: CommentSubject[] = [];
  sources: CommentSources[] = [];
  // commentOverview: CommentResponseViewModel = {sources: [], subjects: []};
  docStatusMessage = '';
  alertType: AlertTypes;
  importDocPermissions: Permission = null;
  addDocPermissions: Permission = null;
  docHistoryPermissions: Permission = null;
  docReviewPermissions: Permission = null;
  initFlagResults: Flags = { count: 0, editable: [], readOnly: [], sources: [] };
  hideUtilityDivs: boolean = false;

  // Fork Join Doc Permission Variables
  addDocumentPermissions: any = null;
  importDocumentPermissions: any = null;
  viewHistoryDocumentPermissions: any = null;
  viewStatusDocumentPermissions: any = null;

  hideDocMessages = false;
  canSee: boolean = true;

  show(e: any) {
    this.canSee = true;
  }
  hide(e: any) {
    this.canSee = false;
  }
  constructor(
    private store: Store<AppState>,
    private flagService: FlagService,
    private docsService: DocsService,
    private commentsSerice: CommentsService,
    private _eref: ElementRef) { }
  currentAssetTemplateKey: number;
  currentDetailKey: number;

  ngOnInit() {
    const hideDeleteDocStatus = true;
    const hideImportDocStatus = true;
    const utilsContext = this.store.select(state => state.utilsState.utilityContext);

    utilsContext.subscribe((ctx) => {
      console.log('UtilityComponent ngOnInit() state.utilsState.utilityContext', ctx);

      this.context = ctx;

      if (ctx !== null && ctx.assetTemplateKey > 0 && ctx.detailKey > 0
        && ctx.isDetailAsset != null && ctx.isDetailAsset
        && ctx.moduleKey != null && ctx.moduleKey > 0
        && (this.currentAssetTemplateKey !== ctx.assetTemplateKey || this.currentDetailKey !== ctx.detailKey)) {
        this.currentAssetTemplateKey = ctx.assetTemplateKey;
        this.currentDetailKey = ctx.detailKey;

        if (this.showDocs) {
          this.importDocsResults = [];
          this.docsResults = [];
          this.loadImportDocs();
          this.loadDocs(hideDeleteDocStatus);
        } else {
          this.importDocsResults = [];
          this.loadDocsCount();
        }
      }
      // need to load docs and other items here.
    });

    // subscribe to updates of utility state changes to show or hide utilities
    this.store.select('utilsState').subscribe((utilityState) => {
      if (utilityState && utilityState.activeUtility === Utilities.none) {
        this.hideUtilityDivs = true;
        this.showDocs = false;
        this.showFlags = false;
        this.showComments = false;
        this.showHistory = false;
        this.showContacts = false;
        console.log('HideUtility: Utility Options Subscribe to UtilityState: ' + utilityState.activeUtility);
      } else {
        this.hideUtilityDivs = false;
        console.log('Utility Options Subscribe to UtilityState: ' + utilityState.activeUtility);
      }
    });
  }


  utilNav(util: Utilities) {
    this.showDocs = (util === Utilities.Documents && !this.showDocs);

    const showUtils = (this.showDocs || this.showFlags || this.showContacts || this.showHistory || this.showComments);

    if (this.showDocs) {
      this.importDocsResults = [];
      this.docsResults = [];
      this.loadDocs(true);
    }

    if (!showUtils) {
      this.store.dispatch(new UtilsActions.UtilsNavigate(Utilities.none));
    } else {
      this.store.dispatch(new UtilsActions.UtilsNavigate(util));
    }

    if (showUtils) {
      this.clearDocStatusMessage(true);
    }
  }
  onClick() {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.showDocs = false;
    }
  }
  IsOverview() {
    if (this.context.assetTemplateKey === 154110) {
      return true;
    }
    return false;
  }

  loadDocsCount() {
    if (this.context.moduleKey != null && this.context.assetTemplateKey != 154000 && this.context.assetTemplateKey != 154030 && this.context.assetTemplateKey != 154100) {
      this.docsService.fetchDocCount(this.context).subscribe((docCount: number) => {
        if (docCount != null) {
          this.store.dispatch(new UtilsActions.UtilsSetDocCount(docCount));
        }

      },
        (error: HttpErrorResponse) =>
        this.store.dispatch(new UtilsActions.UtilsSetDocCount(0)));
    }

  }

  loadImportDocs() {
    this.docsService.getDocsToImport(this.context).subscribe((importDocs: ImportDocs[]) => {
      const docBaseViewUrl = environment.DOCS_GET_DOC_FILE_API;

      if (importDocs !== null && importDocs.length > 0) {
        this.importDocsResults = importDocs.map(doc => {
          return {
            ...doc,
          };
        });
      } else {
        importDocs = [];
        this.importDocsResults = [];
      }

    },
      (error: HttpErrorResponse) =>
        console.log(`Error Status: ${JSON.stringify(error.status)};
      Error Status Text: ${JSON.stringify(error.statusText)};
      Error Msg: ${JSON.stringify(error.message)};`));
  }

  loadDocs(hideDeleteDocStatus: boolean) {
    const docBaseViewUrl = environment.DOCS_GET_DOC_FILE_API;

    // Get permissions first
    //this.loadDocComponentPermissions();



    // Get documents next
    this.docsService.fetchDocs(this.context).subscribe((docs: Docs[]) => {



      if (docs !== null && docs.length > 0) {
        this.docsResults = docs.map(doc => {
          return {
            ...doc,
            docUrl: docBaseViewUrl + doc.docUrl
          };
        });
      } else {
        docs = [];
        this.docsResults = [];
      }

      this.store.dispatch(new UtilsActions.UtilsSetDocCount(docs.length));


    },
      (error: HttpErrorResponse) =>
      console.log(`Error Status: ${JSON.stringify(error.status)};
      Error Status Text: ${JSON.stringify(error.statusText)};
      Error Msg: ${JSON.stringify(error.message)};`));
  }

  loadDocComponentPermissions() {
    const addDoc = 'AddDocuments';
    const importDoc = 'ImportDocuments';
    const docHistory = 'DocumentHistory';
    const docReview = 'DocumentReview';

    // Doc permissions forkjoin
    forkJoin(
      this.docsService.fetchUiComponentPermissions(this.context, addDoc),
      this.docsService.fetchUiComponentPermissions(this.context, importDoc),
      this.docsService.fetchUiComponentPermissions(this.context, docHistory),
      this.docsService.fetchUiComponentPermissions(this.context, docReview),
    )
      .subscribe(([res1, res2, res3, res4]) => {
        this.addDocumentPermissions = res1;
        this.addDocPermissions = this.addDocumentPermissions;

        this.importDocumentPermissions = res2;
        this.importDocPermissions = this.importDocumentPermissions;

        this.viewHistoryDocumentPermissions = res3;
        this.docHistoryPermissions = this.viewHistoryDocumentPermissions;

        this.viewStatusDocumentPermissions = res4;
        this.docReviewPermissions = this.viewStatusDocumentPermissions;

      });



  }

  removeDocs(docKeys: DocDeleteRecord[]) {
    const i = 0;
    this.hideDocMessages = false;

    // Build list of docKeys & docTypeKeys
    const docDeleteRecords = new DocDeleteRecords();
    docDeleteRecords.documents = docKeys;

    // Multiple doc delete
    this.docsService.deleteDocuments(this.context, docDeleteRecords).subscribe(() => {
      const hideDeleteDocStatus = false;
      this.loadDocs(hideDeleteDocStatus);

      this.docStatusMessage = `${docKeys.length} document(s) were deleted from the list.`;
      this.alertType = AlertTypes.success;
    },
      (error: HttpErrorResponse) => {
        console.log(`Error Status: ${JSON.stringify(error.status)};
          Error Status Text: ${JSON.stringify(error.statusText)};
          Error Msg: ${JSON.stringify(error.message)};`);

        this.docStatusMessage = `Unable to delete ${docKeys.length} document(s) due to an error.`;
        this.alertType = AlertTypes.error;
      }
    );
  }

  importDocs(docKeys: DocImportRecord[]) {
    const i = 0;

    // Build list of docKeys & docTypeKeys
    const docImportRecords = new DocImportRecords();
    docImportRecords.documents = docKeys;

    // Import documents
    this.docsService.importDocuments(this.context, docImportRecords).subscribe(() => {
      this.loadDocs(true);

      this.docStatusMessage = `${docKeys.length} document(s) were imported.`;
      this.alertType = AlertTypes.success;
    },
      (error: HttpErrorResponse) => {
        console.log(`Error Status: ${JSON.stringify(error.status)};
          Error Status Text: ${JSON.stringify(error.statusText)};
          Error Msg: ${JSON.stringify(error.message)};`);

        this.docStatusMessage = `Unable to import ${docKeys.length} document(s) due to an error.`;
        this.alertType = AlertTypes.error;
      }
    );

  }

  clearDocStatusMessage(hideDocStatusMessage: boolean) {
    if (hideDocStatusMessage) {
      this.docStatusMessage = '';
    }

  }


  loadSubjects() {
    this.commentsSerice.getSubjects(this.context).subscribe((response: CommentResponseViewModel) => {
      this.subjects = response.subjects;
      if (this.IsOverview()) {
        this.sources = response.sources;
      }

      this.store.dispatch(new UtilsActions.UtilsSetCommentsCount(this.subjects.length));
    });
  }

  loadSubjectsCount() {
    if (this.context.moduleKey != null && this.context.assetTemplateKey != 154000 && this.context.assetTemplateKey != 154100
      && this.context.assetTemplateKey != 154030 && this.context.assetTemplateKey != 154240) {
      this.commentsSerice.getSubjectsCount(this.context).subscribe((subjectsCount: number) => {
        if (subjectsCount != null) {
          this.store.dispatch(new UtilsActions.UtilsSetCommentsCount(subjectsCount));
        }

      });
    }
  }

  addSubject(subject: CommentSubject) {
    this.commentsSerice.addSubject(subject, this.context).subscribe((subjects: CommentSubject[]) => {
      if (this.IsOverview()) {
        this.loadSubjects();
      } else {
        this.subjects = subjects;
        this.store.dispatch(new UtilsActions.UtilsSetCommentsCount(subjects.length));
      }
    });
  }

  addComment(subject: CommentSubject) {
    this.commentsSerice.addComment(subject, this.context).subscribe((subjects: CommentSubject[]) => {
      if (this.IsOverview()) {
        this.loadSubjects();
      } else {
        let updatedSubject = subjects.find(subj => subj.subjectKey === subject.subjectKey);
        this.subjects.find(subj => subj.subjectKey === subject.subjectKey).comments = updatedSubject.comments;
        this.store.dispatch(new UtilsActions.UtilsSetCommentsCount(subjects.length));
      }

    });
  }

  updateComment(subject: CommentSubject) {
    this.commentsSerice.updateComment(subject, this.context).subscribe((subjects: CommentSubject[]) => {
      let updatedSubject = subjects.find(subj => subj.subjectKey === subject.subjectKey);
      this.store.dispatch(new UtilsActions.UtilsSetCommentsCount(subjects.length));
    });
  }
}
