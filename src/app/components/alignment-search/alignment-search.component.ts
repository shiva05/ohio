import { Component, EventEmitter, Output, Input, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as util from 'util';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Observable } from 'rxjs/Observable';
import { MetaData } from './../../models/meta-data.model';
import * as AdvancedSearchActions from './../../actions/advanced-search.actions';

@Component({
  selector: 'app-alignment-search',
  templateUrl: './alignment-search.component.html',
  styleUrls: ['./alignment-search.component.css']
})
export class AlignmentSearchComponent implements OnInit {

  showAsFilter = true;
  showAsResults = false;
  showAsReport = false;

  constructor(private httpService: HttpClient,
              private ref: ChangeDetectorRef,
              private store: Store<AppState>) {
  }
  ngOnInit() {
  }
  onPageSelect(org) {
    this.showAsFilter = false;
    this.showAsResults = false;
    this.showAsReport = false;
    if (org === 'Search') {
      this.showAsFilter = true;
    } else if (org === 'SearchResults') {
      this.showAsResults = true;
    } else if (org === 'Report') {
      this.showAsReport = true;
    }
  }
}
