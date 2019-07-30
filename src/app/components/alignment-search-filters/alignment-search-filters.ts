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
  selector: 'app-alignment-search-filters',
  templateUrl: './alignment-search-filters.html',
  styleUrls: []
})
export class AlignmentSearchFiltersComponent implements OnInit {


  disabled = false;
  ShowFilter = true;
  limitSelection = false;
  careers: any = [];
  academicSubjects = [];
  stadards = [];
  outcomes = [];
  grades = [];
  clusters = [];
  standardNumbers = [];
  selectedKeyword: any;
  selectedItems: any = [];
  selectedCareer: any = [];
  selectedAcadamicSubjects: any = [];
  selectedStandards: any = [];
  selectedOutcome: any = [];
  selectedCompetencyNumbers: any = [];
  selectedGrades: any = [];
  selectedClusters: any = [];
  selectedStandardNumbers: any = [];
  dropdownSettings: any = {};
  searchObj: any;
  selectedCompetencyNumber: any;
  competencyNumbers: any;
  metaData: Observable<MetaData>;

  constructor(private httpService: HttpClient, private ref: ChangeDetectorRef, private store: Store<AppState>) {
    // this.metaData = store.select('metaData');
    this.store.dispatch({ type: AdvancedSearchActions.LOAD_META_DATA });
  }

  @Output() onPageSelect = new EventEmitter<any>();

  ngOnInit() {
    this.store.select('advancedSearch').subscribe(data => {
      this.metaData = data.metaData;
      this.careers = this.metaData['careers'];
      this.academicSubjects = this.metaData['academicSubjects'];
      this.stadards = this.metaData['standards'];
      this.outcomes = this.metaData['outcomes'];
      this.grades = this.metaData['grades'];
      this.clusters = this.metaData['clusters'];
      this.standardNumbers = this.metaData['standardNumbers'];
      this.competencyNumbers = this.metaData['competencyNumbers'];
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id', textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

  }

  search() {
    this.goToPage('SearchResults');
    this.searchObj = {
      selectedCareers: this.selectedCareer,
      selectedStrands: this.selectedStandards,
      selectedOutcomes: this.selectedOutcome,
      selectedCompetencies: this.selectedCompetencyNumbers,
      selectedAcadamicSubjects: this.selectedAcadamicSubjects
    };
    localStorage.setItem('searchLable', 'SearchAlignment');
    this.goToPage('SearchResults');
    this.store.dispatch({ type: AdvancedSearchActions.SAVE_AS_SELECTED_FILTERS ,payload:this.searchObj});
  }

  onAcadamicSubjectSelect() {
    console.log('hi');
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }

  onGradeSelect(grade, acasub) {
    this.selectedAcadamicSubjects.forEach(element => {
      if (element.item_id === acasub.item_id) {
        if (element.grade) {
          element.grade.push({ item_id: grade[0].item_id, item_text: grade[0].item_text });
        } else {
          element.grade = [];
          element.grade.push({ item_id: grade[0].item_id, item_text: grade[0].item_text });
        }
      }
    });
    console.log(this.selectedAcadamicSubjects);
  }
  onClusterSelect(cluster, acasub) {
    this.selectedAcadamicSubjects.forEach(element => {
      if (element.item_id === acasub.item_id) {
        if (element.cluster) {
          element.cluster.push({ item_id: cluster[0].item_id, item_text: cluster[0].item_text });
        } else {
          element.cluster = [];
          element.cluster.push({ item_id: cluster[0].item_id, item_text: cluster[0].item_text });
        }
      }
    });
    console.log(this.selectedAcadamicSubjects);
  }
  onStandardNumberSelect(standardNumbers, acasub) {
    this.selectedAcadamicSubjects.forEach(element => {
      if (element.item_id === acasub.item_id) {
        if (element.standardNumber) {
          element.standardNumber.push({ item_id: standardNumbers[0].item_id, item_text: standardNumbers[0].item_text });
        } else {
          element.standardNumber = [];
          element.standardNumber.push({ item_id: standardNumbers[0].item_id, item_text: standardNumbers[0].item_text });
        }
      }
    });
    console.log(this.selectedAcadamicSubjects);
  }
}
