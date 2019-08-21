import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSearchAccordionComponent } from './course-search-accordion.component';

describe('CourseSearchAccordionComponent', () => {
  let component: CourseSearchAccordionComponent;
  let fixture: ComponentFixture<CourseSearchAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSearchAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSearchAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
