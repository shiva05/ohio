import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsComponent } from './flags.component';
import { Store } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FlagService } from '../../../services/flag.service';

class MockStore {
  select() {
    return {
      subscribe: () => { }
    };
  }
  subscribe() { }
}



describe('FlagsComponent', () => {
  let component: FlagsComponent;
  let fixture: ComponentFixture<FlagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlagsComponent],
      imports: [FormsModule, NgSelectModule],
      providers: [{
        provide: Store,
        useClass: MockStore
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagsComponent);
    component = fixture.componentInstance;

    component.flags = { sources: null, count: 1, readOnly: null, editable: null };

    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
