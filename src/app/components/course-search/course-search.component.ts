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
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent implements OnInit {

  showCsFilter = true;
  showCsResults = false;
  showCsReport = false;

  constructor(private httpService: HttpClient, private ref: ChangeDetectorRef, private store: Store<AppState>) { }

  ngOnInit() {

  }

  onPageSelect(org) {
    this.showCsFilter = false;
    this.showCsResults = false;
    this.showCsReport = false;
    if (org === 'Search') {
      this.showCsFilter = true;
    } else if (org === 'SearchResults') {
      this.showCsResults = true;
    } else if (org === 'Report') {
      this.showCsReport = true;
    }
  }
}
