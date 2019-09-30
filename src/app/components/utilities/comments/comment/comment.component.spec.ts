import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { MessageEditorComponent } from '../message-editor/message-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommenterComponent } from '../commenter/commenter.component';
import { FocusDirective } from 'src/app/directives/focus.directive';
import { ClickAndEnterDirective } from 'src/app/directives/click-and-enter.directive';


describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [CommentComponent, MessageEditorComponent, CommenterComponent, FocusDirective, ClickAndEnterDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = {
      commentKey: 0,
      commentText: 'text',
      compositeOwnerSourceKey: 0,
      compositeOwnerTypeKey: 0,
      createPersonKey: 0,
      createTS: '',
      immediateOwnerSourceKey: 0,
      immediateOwnerTypeKey: 0,
      updatePersonKey: 0,
      updateTS: '',
      permission: null,
      person: {
        name: 'name',
        roles: [{
          name: 'role name',
          organizationName: 'org name'
        }, {
          name: 'role name',
          organizationName: 'org name'
        }]
      }
    };
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
