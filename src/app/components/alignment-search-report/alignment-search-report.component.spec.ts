import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignmentSearchReportComponent } from './alignment-search-report.component';

describe('AlignmentSearchReportComponent', () => {
  let component: AlignmentSearchReportComponent;
  let fixture: ComponentFixture<AlignmentSearchReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlignmentSearchReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignmentSearchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
