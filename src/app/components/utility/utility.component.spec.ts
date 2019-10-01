import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityComponent } from './utility.component';
import { DocsComponent } from '../utilities/docs/docs.component';
import { FlagsComponent } from '../utilities/flags/flags.component';
import { HistoryComponent } from '../utilities/history/history.component';
import { ContactsComponent } from '../utilities/contacts/contacts.component';
import { UtilitynavComponent } from '../utilitynav/utilitynav.component';
import { Store } from '@ngrx/store';
import { AddDocsComponent } from '../utilities/docs/add-docs/add-docs.component';
import { ImportDocsComponent } from '../utilities/docs/import-docs/import-docs.component';
import { PreviewDocsComponent } from '../utilities/docs/preview-docs/preview-docs.component';
import { ListDocsComponent } from '../utilities/docs/list-docs/list-docs.component';
import { HistoryDocsComponent } from '../utilities/docs/history-docs/history-docs.component';
import { CardComponent } from '../utilities/comments/card/card.component';
import { CommentsContainerComponent } from '../utilities/comments/comments-container/comments-container.component';
import { NewSubjectComponent } from '../utilities/comments/new-subject/new-subject.component';
import { SubjectComponent } from '../utilities/comments/subject/subject.component';
import { CommentComponent } from '../utilities/comments/comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlagService } from '../../services/flag.service';
import { DocsService } from '../../services/docs.service';
import { CommentsService } from '../../services/comments.service';
import { CommentMockService } from '../../services/mocks/comments.mock.service';
import { Component, Input } from '@angular/core';
import { FileDraggableState } from 'src/app/models/file-draggable-state';
import { MessageEditorComponent } from '../utilities/comments/message-editor/message-editor.component';
import { CommenterComponent } from '../utilities/comments/commenter/commenter.component';
import { ClickAndEnterDirective } from 'src/app/directives/click-and-enter.directive';
import { FocusDirective } from 'src/app/directives/focus.directive';
import { SafePipe } from '../../pipes/safe-pipe';
import { AlertTypes } from '../../models/alerts';
import { FlagsOverviewComponent } from '../utilities/flags-overview/flags-overview.component';

class MockDocService {
  fetchDocs() {
    return {
        subscribe: () => {
      }
    };
  }
}

class MockFlagService {
  fetchFlags() {
    return {
        subscribe: () => {
      }
    };
  }
  addFlag() {
    return {
      subscribe: () => { }
    };
  }
  removeFlag() {
    return {
      subscribe: () => { }
    };
  }
}
class MockStore {
  select() {
    return {
      subscribe: () => { }
    };
  }
  subscribe() { }
}

describe('UtilityComponent', () => {
  let component: UtilityComponent;
  let fixture: ComponentFixture<UtilityComponent>;

  @Component({
    selector: 'app-file-draggable',
    template: '<div></div>'
  })
  class FakeFileDraggableComponent {
    @Input() fileDraggableStateChild: FileDraggableState;
    @Input() docUploadValidation: any;
    @Input() uploadAllowedFileTypes: any;
    @Input() uploadAllowedMimeTypes: any;
  }

  @Component({
    selector: 'app-alert-message',
    template: '<div></div>'
  })
  class FakeAlertMessageComponent {
    @Input() type: AlertTypes;
    @Input() message: string;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UtilityComponent,
        DocsComponent,
        FlagsComponent,
        HistoryComponent,
        ContactsComponent,
        UtilitynavComponent,
        AddDocsComponent,
        ImportDocsComponent,
        PreviewDocsComponent,
        ListDocsComponent,
        HistoryDocsComponent,
        FakeFileDraggableComponent,
        CardComponent,
        CommentsContainerComponent,
        NewSubjectComponent,
        SubjectComponent,
        CommentComponent,
        MessageEditorComponent,
        CommenterComponent,
        ClickAndEnterDirective,
        FocusDirective,
        SafePipe,
        FakeAlertMessageComponent,
        FlagsOverviewComponent
      ],
      imports: [
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule
      ],
      providers: [{
        provide: Store,
        useClass: MockStore
      }, {
        provide: FlagService,
        useClass: MockFlagService
      }, {
        provide: DocsService,
        useClass: MockDocService
      }, {
        provide: CommentsService,
        useClass: CommentMockService
      }]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
