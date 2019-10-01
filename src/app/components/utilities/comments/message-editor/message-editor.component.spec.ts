import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageEditorComponent } from './message-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FocusDirective } from 'src/app/directives/focus.directive';
import { ClickAndEnterDirective } from 'src/app/directives/click-and-enter.directive';

describe('MessageEditorComponent', () => {
  let component: MessageEditorComponent;
  let fixture: ComponentFixture<MessageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ MessageEditorComponent, FocusDirective, ClickAndEnterDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
