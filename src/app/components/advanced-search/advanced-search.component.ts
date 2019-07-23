import { Component, EventEmitter, Output, Input, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as util from 'util';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Observable } from 'rxjs/Observable';
import { MetaData } from './../../models/meta-data.model';
import * as AdvancedSearchActions from './../../actions/advanced-search.actions';

// import { SearchSchoolStandardsService } from '../../_services/search-school-standards/search-school-standards.service';

@Component({
  selector: 'advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AdvancedSearchComponent {


  constructor(private httpService: HttpClient,
              private ref: ChangeDetectorRef, private store: Store<AppState>) {
    // this.metaData = store.select('metaData');
    this.store.dispatch({type: AdvancedSearchActions.LOAD_META_DATA});
  }
  @Output() onPageSelect = new EventEmitter<any>();
  
  goToPage(org) {
    this.onPageSelect.emit(org);
  }

}
