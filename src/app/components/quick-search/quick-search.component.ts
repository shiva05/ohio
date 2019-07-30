import { Component, EventEmitter, Output, Input, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { SharedService } from '../../services/shared.service';
import * as QuickSearchActions from './../../actions/quick-search.actions';
import { Observable } from 'rxjs/Observable';
import { QsMetaData } from './../../models/qs-meta-data.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.css']
})
export class QuickSearchComponent implements OnInit {
  keyword: any = '';
  careers: any = [];
  academicSubjects = [];
  qsMetaData: Observable<QsMetaData>;
  dropdownSettings: any = {};
  selectedCareer: any = [];
  selectedAcadamicSubjects: any = [];

  constructor(private translate: TranslateService,private sharedData: SharedService, private router: Router,private store: Store<AppState>,private httpService: HttpClient, private ref: ChangeDetectorRef,) {
    console.log(this.sharedData);
    translate.setDefaultLang('en');
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id', textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.store.dispatch({ type: QuickSearchActions.LOAD_QS_META_DATA });
  }

  ngOnInit() {
    this.store.select('quickSearch').subscribe(data => {
      this.qsMetaData = data;
      this.careers = this.qsMetaData['careers'];
      this.academicSubjects = this.qsMetaData['academicSubjects'];

    });
  }

  sendSearch() {
    this.sharedData.data = this.keyword;
    localStorage.setItem('sharedData', this.sharedData.data);
    (window as any).open('http://edu-dev-sbd.azurewebsites.net/Search', '_blank');
    // this.router.navigate(['/Search']);
  }
}
