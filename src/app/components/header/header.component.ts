import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {



  @Output() onPageSelect = new EventEmitter<any>();
  ngOnInit() {

  }
  goToPage(org) {
    this.onPageSelect.emit(org);
  }
  constructor(private store: Store<AppState>) {

  }
  addTutorial(name, url) {



  }

}
