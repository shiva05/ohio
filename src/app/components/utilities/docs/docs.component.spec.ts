import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsComponent } from './docs.component';
import { AddDocsComponent } from './add-docs/add-docs.component';
import { ImportDocsComponent } from './import-docs/import-docs.component';
import { PreviewDocsComponent } from './preview-docs/preview-docs.component';
import { ListDocsComponent } from './list-docs/list-docs.component';
import { HistoryDocsComponent } from './history-docs/history-docs.component';
import { FormsModule } from '@angular/forms';
import { DocsService } from '../../../services/docs.service';

import { FileUploader } from 'ng2-file-upload';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'ng2-file-upload';
import { Component, Input } from '@angular/core';
import { FileDraggableState } from 'src/app/models/file-draggable-state';
import { SafePipe } from '../../../pipes/safe-pipe';
import { AlertTypes } from '../../../models/alerts';

class MockDocService {
  fetchDocs() {
    return {
      subscribe: () => {

      }
    };
  }
}

describe('DocsComponent', () => {
  let component: DocsComponent;
  let fixture: ComponentFixture<DocsComponent>;

  @Component({
    selector: 'app-file-draggable',
    template: '<div></div>'
  })
  class FakeFileDraggableComponent {
    @Input() fileDraggableStateChild: FileDraggableState;
    @Input() docUploadValidation: any;
    @Input() uploadAllowedFileTypes: any;
    @Input() uploadAllowedMimeTypes: any;
  }

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
      declarations: [DocsComponent, AddDocsComponent, ImportDocsComponent, PreviewDocsComponent, ListDocsComponent, HistoryDocsComponent,
        FakeFileDraggableComponent, SafePipe, FakeAlertMessageComponent ],
      imports: [FormsModule, NgSelectModule, FileUploadModule],
      providers: [{
        provide: DocsService,
        useClass: MockDocService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsComponent);
    component = fixture.componentInstance;
    component.docs = [];
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
