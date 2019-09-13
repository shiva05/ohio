import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDocsComponent } from './import-docs.component';

describe('ImportDocsComponent', () => {
  let component: ImportDocsComponent;
  let fixture: ComponentFixture<ImportDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
