import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDocsComponent } from './history-docs.component';

describe('HistoryDocsComponent', () => {
  let component: HistoryDocsComponent;
  let fixture: ComponentFixture<HistoryDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
