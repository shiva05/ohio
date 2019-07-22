import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignmentSearchComponent } from './alignment-search.component';

describe('AlignmentSearchComponent', () => {
  let component: AlignmentSearchComponent;
  let fixture: ComponentFixture<AlignmentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlignmentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
