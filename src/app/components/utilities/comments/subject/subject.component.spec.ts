import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SubjectComponent } from './subject.component';
import { CardComponent } from '../card/card.component';
import { CommentComponent } from '../comment/comment.component';
import { MessageEditorComponent } from '../message-editor/message-editor.component';
import { CommenterComponent } from '../commenter/commenter.component';
import { FocusDirective } from 'src/app/directives/focus.directive';
import { ClickAndEnterDirective } from 'src/app/directives/click-and-enter.directive';


describe('SubjectComponent', () => {
  let component: SubjectComponent;
  let fixture: ComponentFixture<SubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SubjectComponent,
        CommentComponent,
        CardComponent,
        MessageEditorComponent,
        CommenterComponent,
        FocusDirective,
        ClickAndEnterDirective
       ],
      imports:[
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
