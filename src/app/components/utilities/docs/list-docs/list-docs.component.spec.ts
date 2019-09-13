import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocsComponent } from './list-docs.component';
import { HistoryDocsComponent } from '../history-docs/history-docs.component';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { AlertTypes } from '../../../../models/alerts';

describe('ListDocsComponent', () => {
  let component: ListDocsComponent;
  let fixture: ComponentFixture<ListDocsComponent>;

  @Component({
    selector: 'app-alert-message',
    template: '<div></div>'
  })
  class FakeAlertMessageComponent {
    @Input() type: AlertTypes;
    @Input() message: string;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListDocsComponent, HistoryDocsComponent, FakeAlertMessageComponent],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
