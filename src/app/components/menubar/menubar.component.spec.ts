import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { MenubarComponent } from './menubar.component';
import { SocialComponent } from '../social/social.component';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../routes';
import { IframeComponent } from '../iframe/iframe.component';
import { SafePipe } from '../../pipes/safe-pipe';
import { InteropService } from '../../services/interop.service';

class MockStore {
  select() {
    return {
      subscribe: () => { }
    };
  }
  subscribe() { }
}

describe('MenubarComponent', () => {
  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenubarComponent, SocialComponent, IframeComponent, SafePipe],
      imports: [RouterModule.forRoot(AppRoutes)],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, {
        provide: Store,
        useClass: MockStore
      }, InteropService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
