import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignmentSearchAccordionComponent } from './alignment-search-accordion.component';

describe('AlignmentSearchAccordionComponent', () => {
  let component: AlignmentSearchAccordionComponent;
  let fixture: ComponentFixture<AlignmentSearchAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlignmentSearchAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignmentSearchAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
