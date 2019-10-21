import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AppState } from './../../app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isPublic = false;

  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private store: Store<AppState>, private route: Router) { }

  ngOnInit() {
    this.store.select('authState').subscribe((authState) => {
      if (authState != null) {
        this.isPublic = authState.isPublic;
      }
    });
  }

  goToPage(org) {
    this.route.navigate(['/alignmentsearch']);
  }
}
