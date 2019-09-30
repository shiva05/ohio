import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SafePipe } from '../../../../pipes/safe-pipe';
import { Store } from '@ngrx/store';

import { PreviewDocsComponent } from './preview-docs.component';
import { DocsService } from '../../../../services/docs.service';

class MockDocService {
  fetchDocFileByUrl() {
    return {
        subscribe: () => {
      }
    };
  }
}

class MockStore {
  select() {
    return {
      subscribe: () => { }
    };
  }
  subscribe() { }
}

describe('PreviewDocsComponent', () => {
  let component: PreviewDocsComponent;
  let fixture: ComponentFixture<PreviewDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewDocsComponent, SafePipe ],
      providers: [{
        provide: Store,
        useClass: MockStore
      }, {
        provide: DocsService,
        useClass: MockDocService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
