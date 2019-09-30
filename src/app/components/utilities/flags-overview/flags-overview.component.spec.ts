import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsOverviewComponent } from './flags-overview.component';

describe('FlagsOverviewComponent', () => {
  let component: FlagsOverviewComponent;
  let fixture: ComponentFixture<FlagsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
