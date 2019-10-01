import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsOverviewComponent } from './comments-overview.component';

describe('CommentsOverviewComponent', () => {
  let component: CommentsOverviewComponent;
  let fixture: ComponentFixture<CommentsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
