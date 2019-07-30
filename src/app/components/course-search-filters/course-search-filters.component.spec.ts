import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSearchFiltersComponent } from './course-search-filters.component';

describe('CourseSearchFiltersComponent', () => {
  let component: CourseSearchFiltersComponent;
  let fixture: ComponentFixture<CourseSearchFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSearchFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
