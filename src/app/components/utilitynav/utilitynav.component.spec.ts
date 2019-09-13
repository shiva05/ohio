import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitynavComponent } from './utilitynav.component';
import { Store } from '@ngrx/store';
import { ClickAndEnterDirective } from 'src/app/directives/click-and-enter.directive';

class MockStore {
  select() {
    return {
      subscribe: () => { }
    };
  }
  subscribe() { }
}

describe('UtilitynavComponent', () => {
  let component: UtilitynavComponent;
  let fixture: ComponentFixture<UtilitynavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UtilitynavComponent, ClickAndEnterDirective],
      providers: [{
        provide: Store,
        useClass: MockStore
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitynavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
