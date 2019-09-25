import { Component, OnInit, Input } from '@angular/core';
import { NavItem } from '../../models/claims-response';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import * as NavActions from '../../actions/nav-actions';
import { Router } from '@angular/router';
import { InteropService } from '../../services/interop.service';

import { Utilities } from '../../models/util-nav-item';
import * as UtilsActions from '../../actions/utils-actions';
import * as _ from 'lodash';

class UINavItem implements NavItem {
  url;
  originalUrl;
  label;
  selected;
  children;
  subHidden = false;

  constructor(url: string, label: string, selected: boolean, originalUrl: string, children: UINavItem[]) {
    this.url = url;
    this.label = label;
    this.selected = selected;
    this.originalUrl = originalUrl;
    this.children = children;
  }
}

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})

export class MenubarComponent implements OnInit {

  @Input() isPublic = false;

  firstName = 'User';
  lastName = 'Public';
  orgName = '';
  links;
  authJwt = '';
  claimsJwt = '';
  isLoaded = false;
  defaultMenuKey = 0;

  constructor(private store: Store<AppState>, private router: Router, private interopService: InteropService) { }

  ngOnInit() {
    this.store.select((appState) => {
      return {
        authJwt: appState.authState.authJwt,
        claimsJwt: appState.claimsState.claimsJwt,
        menus: appState.claimsState.menus
      };
    }).subscribe(returnObject => {

      if (returnObject.menus && returnObject.menus.Items) {
        this.defaultMenuKey = this.isPublic
          ? returnObject.menus.DefaultMenuKey || 14610400
          : returnObject.menus.DefaultMenuKey || 14610200;
        this.links = returnObject.menus.Items.map((item) => {
          const url = item.Url
            + '?menuKey=' + item.MenuKey
            + '&authJwt=' + returnObject.authJwt + '&claimsJwt=' + returnObject.claimsJwt;

          return new UINavItem(url, item.Label, true, item.Url,
            this.createChildLink(item, returnObject.authJwt, returnObject.claimsJwt));
        });
      }
    });
  }

  createChildLink(parentItem, authJwt, claimsJwt) {
    const parentRoute = parentItem.Url;
    const children = parentItem.Submenu;
    return children.map((item) => {
      const url = parentRoute + item.Url
        + '?menuKey=' + item.MenuKey
        + '&authJwt=' + authJwt + '&claimsJwt=' + claimsJwt;
      return new UINavItem(url, item.Label, true, parentItem.Url + item.Url, []);
    });
  }

  showSub(navIndex, val) {
    this.links[navIndex].subHidden = val;
  }

  showStatus(url) {
    window.status = url;
  }

  openUtils() {
  }

  navigate(url: string, menuName: string, hasChildren: boolean = true) {

    if (!hasChildren) { }

    this.store.dispatch(new UtilsActions.UtilsReset(Utilities.none));
    this.store.dispatch(new NavActions.NavSetMenuName(menuName));

    this.router.navigateByUrl(url);

    const message = { originator: 'MENU_CLICK', htmlPushUrl: url };
    this.interopService.publish(message);
  }

  filterData(data, predicate) {
    return !!!data ? null : data.reduce((list, entry) => {
      let clone = null;
      if (predicate(entry)) {
        clone = Object.assign({}, entry);
      } else if (entry.children != null) {
        const children = this.filterData(entry.children, predicate);
        if (children.length > 0) {
          clone = Object.assign({}, entry, { children: children });
        }
      }
      if (clone) {
        list.push(clone);
        return list;
      }
      return list;
    }, []);
  }
}
