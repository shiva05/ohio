import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { FileDraggableComponent } from './file-draggable.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'ng2-file-upload';
import { DocsService } from '../../../../services/docs.service';
import { Component, Input } from '@angular/core';
import { FileDraggableState } from 'src/app/models/file-draggable-state';
import { FileUploader, FileItem, FileLikeObject, ParsedResponseHeaders, FileUploaderOptions } from 'ng2-file-upload';

class MockStore {
  select() {
    return {
      subscribe: () => { }
    };
  }
  subscribe() { }
}

class MockDocumentService {
  getDocumentUploadUrl() {
    return '';
  }
}

describe('FileDraggableComponent', () => {
  let component: FileDraggableComponent;
  let fixture: ComponentFixture<FileDraggableComponent>;

  @Component({
    selector: 'app-file-draggable',
    template: '<div></div>'
  })
  class FakeFileDraggableComponent {
    @Input() fileDraggableStateChild: FileDraggableState = new FileDraggableState();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FileDraggableComponent,
        FakeFileDraggableComponent ],
      imports: [FormsModule, NgSelectModule, FileUploadModule],
      providers: [{
        provide: Store,
        useClass: MockStore
      },
      {
        provide : DocsService,
        useClass: MockDocumentService
      }]
        })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDraggableComponent);
    component = fixture.componentInstance;
    component.context = {assetTemplateKey: 0, detailKey: 0, moduleKey: 0, isDetailAsset: false};
    component.docUploadValidation = {
      maxFileSizeMb: 0,
      uploadMaxFileSize: 0,
      uploadAllowedFileTypes: [],
      uploadAllowedMimeTypes: [],
      uploadDocumentMaxCount: 0
    };
    component.fileDraggableStateChild.fileUploader  = new FileUploader(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
