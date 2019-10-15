import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import * as QuickSearchActions from './../../actions/quick-search.actions';
import { Observable } from 'rxjs/Observable';
import { QsMetaData } from './../../models/qs-meta-data.model';
import { CookieService } from 'ngx-cookie-service';

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
  selectedKeyword :'';
  academicSubjects = [];
  strands = [];
  quickSearchSharedData = {
    KeyWords: '',
    CareerFields: [],
    AcademicSubjects: []
  };

  constructor(private store: Store<AppState>, private cookieService: CookieService) {

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
    this.store.select('quickSearch').subscribe(data => {
      this.academicSubjects = [];
      if (data.QsMetaData) {
        this.qsMetaData = data.QsMetaData;
        this.careers = this.qsMetaData['CareerFields'];
        this.qsMetaData['Subjects'].forEach(element => {
          this.academicSubjects.push({ SubjectId: element.SubjectId, SubjectName: element.SubjectName });
        });
      }
    });
  }

  sendSearch() {
    this.quickSearchSharedData.KeyWords = this.selectedKeyword;
    this.quickSearchSharedData.CareerFields = this.selectedCareer;
    this.quickSearchSharedData.AcademicSubjects = this.selectedAcadamicSubjects;
    this.cookieService.set('Test', JSON.stringify(this.quickSearchSharedData));
    (window as any).open('http://edu-dev-sbd.azurewebsites.net/#/AlignmentSearchResults', '_blank');
  }
  clearQuickSearch() {
    this.selectedCareer = [];
    this.selectedAcadamicSubjects = [];
    this.selectedKeyword ='';
  }
}
