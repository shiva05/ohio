import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSearchReportListComponent } from './course-search-report-list.component';

describe('CourseSearchReportListComponent', () => {
  let component: CourseSearchReportListComponent;
  let fixture: ComponentFixture<CourseSearchReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSearchReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSearchReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
