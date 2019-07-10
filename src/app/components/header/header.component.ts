import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Test } from './../../models/test.model';
import { AppState } from './../../app.state';
import * as TestActions from './../../actions/test.actions';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  tests: Observable<Test[]>;
  @Output() onPageSelect = new EventEmitter<any>();
  ngOnInit() {

  }
  goToPage(org) {
    this.onPageSelect.emit(org);
  }
  constructor(private store: Store<AppState>) {
    this.tests = store.select('test');
 }
 addTutorial(name, url) {

  this.store.dispatch(new TestActions.AddTest({name :'Test State',url:'google.com'}));

}

}
