import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsContainerComponent } from './comments-container.component';
import { NewSubjectComponent } from '../new-subject/new-subject.component';
import { SubjectComponent } from '../subject/subject.component';
import { CardComponent } from '../card/card.component';
import { CommentComponent } from '../comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentMockService } from '../../../../services/mocks/comments.mock.service';
import { CommentsService } from '../../../../services/comments.service';
import { MessageEditorComponent } from '../message-editor/message-editor.component';
import { CommenterComponent } from '../commenter/commenter.component';
import { FocusDirective } from 'src/app/directives/focus.directive';
import { ClickAndEnterDirective } from 'src/app/directives/click-and-enter.directive';


describe('CommentsContainerComponent', () => {
  let component: CommentsContainerComponent;
  let fixture: ComponentFixture<CommentsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        CommentsContainerComponent,
        NewSubjectComponent,
        SubjectComponent,
        CommentComponent,
        MessageEditorComponent,
        CommenterComponent,
        FocusDirective,
        ClickAndEnterDirective
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ], providers: [
        {
          provide: CommentsService,
          useClass: CommentMockService
        }

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
