import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommenterComponent } from './commenter.component';

describe('CommenterComponent', () => {
  let component: CommenterComponent;
  let fixture: ComponentFixture<CommenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommenterComponent);
    component = fixture.componentInstance;
    component.commenter = {
      name:"name",
      roles:[{
        name:"role name",
        organizationName:"organization name"
      }]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
