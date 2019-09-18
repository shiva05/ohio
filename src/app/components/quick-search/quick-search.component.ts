import { Component, EventEmitter, Output, Input, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { SharedService } from '../../services/shared.service';
import * as QuickSearchActions from './../../actions/quick-search.actions';
import { Observable } from 'rxjs/Observable';
import { QsMetaData } from './../../models/qs-meta-data.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.css']
})
export class QuickSearchComponent implements OnInit {
  keyword: any = '';
  careers: any = [];

  qsMetaData: Observable<QsMetaData>;
  dropdownSettings: any = {};
  careerFieldDropdownSettings: any = {};
  subjectDropdownSettings: any = {};
  selectedCareer: any = [];
  selectedAcadamicSubjects: any = [];
  academicSubjects = [];
  strands = [];
  quickSearchSharedData = {
    'KeyWords': '',
    'CareerFields': [],
    'AcademicSubjects' : []
  };

  constructor(private sharedData: SharedService,
              private router: Router,
              private store: Store<AppState>,
              private httpService: HttpClient,
              private ref: ChangeDetectorRef, ) {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id', textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.careerFieldDropdownSettings = {
      singleSelection: false,
      idField: 'CareerFieldId', textField: 'CareerFieldName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.subjectDropdownSettings = {
      singleSelection: false,
      idField: 'SubjectId', textField: 'SubjectName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.store.dispatch({ type: QuickSearchActions.LOAD_QS_META_DATA });
  }

  ngOnInit() {
    localStorage.removeItem('QuickSearchData');
    this.store.select('quickSearch').subscribe(data => {
      this.academicSubjects = [];
      if (data.QsMetaData) {
        this.qsMetaData = data.QsMetaData;
      //  debugger;
        this.careers = this.qsMetaData['CareerFields'];
        // this.academicSubjects = this.qsMetaData['academicSubjects'];
        this.qsMetaData['Subjects'].forEach(element => {
          this.academicSubjects.push({SubjectId : element.SubjectId, SubjectName : element.SubjectName});
       });
      }
    });
  }

  sendSearch() {
    this.quickSearchSharedData.KeyWords = this.keyword;
    this.quickSearchSharedData.CareerFields = this.selectedCareer;
    this.quickSearchSharedData.AcademicSubjects = this.selectedAcadamicSubjects;
    localStorage.setItem('QuickSearchData', JSON.stringify(this.quickSearchSharedData));
    (window as any).open('http://edu-dev-sbd.azurewebsites.net/#/AlignmentSearchResults', '_parent');

    // (window as any).open('http://edu-dev-sbd.azurewebsites.net/Search', '_blank');
    //  (window as any).open('http://edu-dev-sbd.azurewebsites.net/AlignmentSearchResults', '_blank');
    //this.router.navigate(['/AlignmentSearchResults']);

  }
}
