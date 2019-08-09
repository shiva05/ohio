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
  academicSubjects: any  = [];
  strands :any = [];
  outcomes: any  = [];
  grades: any = [];
  clusters: any = [];
  standardNumbers: any = [];
  strandsDropdown: any = [];
  outcomesDropdown: any = [];
  selectedKeyword: any;
  selectedItems: any = [];
  selectedCareer: any = [];
  selectedAcadamicSubjects: any = [];
  selectedStrands: any = [];
  selectedOutcome: any = [];
  selectedCompetencyNumbers: any = [];
  selectedGrades: any = [];
  selectedClusters: any = [];
  selectedStandardNumbers: any = [];
  dropdownSettings: any = {};
  compitencyDropdownSettings :any ={};
  careerFieldDropdownSettings: any = {};
  strandDropdownSettings: any = {};
  outcomeDropdownSettings: any = {};
  academicSubjectDropdownSettings: any = {};
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
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'CareerFieldId', textField: 'CareerFieldName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    }
    this.careerFieldDropdownSettings = {
      singleSelection: false,
      idField: 'CareerFieldId', textField: 'CareerFieldName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.strandDropdownSettings = {
      singleSelection: false,
      idField: 'StrandPk', textField: 'StrandName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.outcomeDropdownSettings = {
      singleSelection: false,
      idField: 'OutcomePk', textField: 'OutcomeName',
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
    this.academicSubjectDropdownSettings = {
      singleSelection: false,
      idField: 'SubjectId', textField: 'SubjectName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.compitencyDropdownSettings = {
      singleSelection: false,
      idField: 'CompetencyPk', textField: 'CompetencyName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.store.select('advancedSearch').subscribe(data => {
      debugger
      this.metaData = data.metaData;
      this.careers = this.metaData['CareerFields'];
      this.strands = this.metaData['Strands'];
      this.outcomes = this.metaData['Outcomes'];
      this.grades = this.metaData['Grades'];
      this.clusters = this.metaData['clusters'];
      this.standardNumbers = this.metaData['standardNumbers'];
      this.competencyNumbers = data.competencies;
      if(this.metaData['Subjects']){
        this.metaData['Subjects'].forEach(element => {
          this.academicSubjects.push({SubjectId :element.SubjectId,SubjectName :element.SubjectName});
       });
      }
      if(data.alignmentSearchSelectedFilters){
        if (data.alignmentSearchSelectedFilters.selectedCareers.length > 0) {
          this.selectedCareer = data.alignmentSearchSelectedFilters.selectedCareers;
        }
        if (data.alignmentSearchSelectedFilters.selectedStrands.length > 0) {
          this.selectedStrands = data.alignmentSearchSelectedFilters.selectedStrands;
        }
        if(data.alignmentSearchSelectedFilters.selectedOutcomes.length>0){
          this.selectedOutcome = data.alignmentSearchSelectedFilters.selectedOutcomes;
        }
        if(data.alignmentSearchSelectedFilters.selectedCompetencies.length >0){
          this.selectedCompetencyNumbers =  data.alignmentSearchSelectedFilters.selectedCompetencies;
        }
         this.selectedAcadamicSubjects = data.alignmentSearchSelectedFilters.selectedAcadamicSubjects.length>0 ? data.alignmentSearchSelectedFilters.selectedAcadamicSubjects :[];
      }
    });


  }
  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
  onCareerSelect() {
    this.strandsDropdown = [];
    this.strands.forEach(eachStrand => {
      this.selectedCareer.forEach(eachCareer => {
        if (eachStrand.CareerFieldPk === eachCareer.CareerFieldId) {
          console.log(eachStrand);
          this.strandsDropdown.push(eachStrand);
        }
      });
    });
  }
  onStrandSelect() {
    this.outcomesDropdown = [];
    this.outcomes.forEach(eachOutcome => {
      this.selectedStrands.forEach(eachStrand => {
        if (eachOutcome.StrandPk === eachStrand.StrandPk) {
          console.log(eachOutcome);
          this.outcomesDropdown.push(eachOutcome);
        }
      });
    });
    console.log(this.strandsDropdown);
  }

  onOutcomeSelect(outcome) {
    debugger
    // TODO: Call API
    this.store.dispatch({ type: AdvancedSearchActions.LOAD_COMPETENCY_DATA ,payload :this.selectedOutcome});
    console.log(this.competencyNumbers)
  }
  search() {
    this.goToPage('SearchResults');
    this.searchObj = {
      selectedCareers: this.selectedCareer,
      selectedStrands: this.selectedStrands,
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
}
