import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { AddDocsComponent } from './add-docs.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileSelectDirective } from 'ng2-file-upload';
import { DocsService } from '../../../../services/docs.service';
import { Component, Input } from '@angular/core';
import { FileDraggableState } from 'src/app/models/file-draggable-state';
import { UtilsContext } from '../../../../models/utils-context';
import { UtilsSetContext } from 'src/app/actions/utils-actions';

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
  fetchDocTypes() {
    return {
      subscribe: () => { }
    };
  }
  fetchFileTypes() {
    return {
      subscribe: () => { }
    };
  }
  subscribe() { }
}

describe('AddDocsComponent', () => {
  let component: AddDocsComponent;
  let fixture: ComponentFixture<AddDocsComponent>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocsComponent, FileSelectDirective, FakeFileDraggableComponent ],
      imports: [ FormsModule, NgSelectModule ],
      providers: [
        {
          provide: Store,
          useClass: MockStore
        },
        {
          provide : DocsService,
          useClass: MockDocumentService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocsComponent);
    component = fixture.componentInstance;
    component.context = {assetTemplateKey: 0, detailKey: 0, moduleKey: 0, isDetailAsset: false};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
