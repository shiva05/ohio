import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignmentSearchReportListComponent } from './alignment-search-report-list.component';

describe('AlignmentSearchReportListComponent', () => {
  let component: AlignmentSearchReportListComponent;
  let fixture: ComponentFixture<AlignmentSearchReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlignmentSearchReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignmentSearchReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
