import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSearchReportComponent } from './course-search-report.component';

describe('CourseSearchReportComponent', () => {
  let component: CourseSearchReportComponent;
  let fixture: ComponentFixture<CourseSearchReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSearchReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSearchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
