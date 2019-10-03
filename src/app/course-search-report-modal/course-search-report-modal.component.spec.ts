import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSearchReportModalComponent } from './course-search-report-modal.component';

describe('CourseSearchReportModalComponent', () => {
  let component: CourseSearchReportModalComponent;
  let fixture: ComponentFixture<CourseSearchReportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSearchReportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSearchReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
