import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { NewSubjectComponent } from './new-subject.component';
import { FocusDirective } from 'src/app/directives/focus.directive';
import { ClickAndEnterDirective } from 'src/app/directives/click-and-enter.directive';


describe('NewSubjectComponent', () => {
  let component: NewSubjectComponent;
  let fixture: ComponentFixture<NewSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        NewSubjectComponent,
        CardComponent,
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
    fixture = TestBed.createComponent(NewSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
