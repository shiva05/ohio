import { Component, EventEmitter, Output, Input, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as util from 'util';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Observable } from 'rxjs/Observable';
import { MetaData } from './../../models/meta-data.model';
import * as AdvancedSearchActions from './../../actions/advanced-search.actions';
import { _ } from 'underscore';
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
  strands: any = [];
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
  compitencyDropdownSettings: any = {};
  academicDropdownSettings: any = {};
  careerFieldDropdownSettings: any = {};
  strandDropdownSettings: any = {};
  outcomeDropdownSettings: any = {};
  academicSubjectDropdownSettings: any = {};
  searchObj: any;
  selectedCompetencyNumber: any;
  competencyNumbers: any;
  metaData: Observable<MetaData>;
  selectedAcademicItems: any = [];
  subjectsDefaultSettings: any = {};
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
    };
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
    this.subjectsDefaultSettings = {
      singleSelection: false,
      idField: 'SubjectLevelsPk', textField: 'LevelValue1',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };


    this.store.select('advancedSearch').subscribe(data => {
      this.metaData = data.metaData;
      this.careers = this.metaData['CareerFields'];
      this.strands = this.metaData['Strands'];
      this.outcomes = this.metaData['Outcomes'];
      this.grades = this.metaData['Grades'];
      this.clusters = this.metaData['clusters'];
      this.standardNumbers = this.metaData['standardNumbers'];
      this.competencyNumbers = data.competencies;
      if (this.metaData['Subjects'] && data.alignmentSearchSelectedFilters.selectedAcadamicSubjects.length == 0) {
        this.academicSubjects = this.metaData['Subjects'];
        this.academicSubjects.forEach((subject) => {
          subject.Level.forEach((item) => {
            item['SelectedItems'] = {}; // to maintain the individual selected list from the dropdowns.
            item['DropdownList'] = []; // to set the data for the dropdowns of each item of a subject.
            if (item.LevelNumber === 1) { // to bind the data for the 1st column dropdown list.
              item['DropdownList'] = item.SubjectLevels;
            }
          });
        });
       // this.metaData['Subjects'].forEach(element => {
       //   this.academicSubjects.push({SubjectId :element.SubjectId,SubjectName :element.SubjectName});
       // });
      }
      if (data.alignmentSearchSelectedFilters) {
        if (data.alignmentSearchSelectedFilters.selectedCareers.length > 0) {
          this.selectedCareer = data.alignmentSearchSelectedFilters.selectedCareers;
        }
        if (data.alignmentSearchSelectedFilters.selectedStrands.length > 0) {
          this.selectedStrands = data.alignmentSearchSelectedFilters.selectedStrands;
        }
        if (data.alignmentSearchSelectedFilters.selectedOutcomes.length > 0) {
          this.selectedOutcome = data.alignmentSearchSelectedFilters.selectedOutcomes;
        }
        if (data.alignmentSearchSelectedFilters.selectedCompetencies.length > 0) {
          this.selectedCompetencyNumbers =  data.alignmentSearchSelectedFilters.selectedCompetencies;
        }
        this.selectedAcadamicSubjects = data.alignmentSearchSelectedFilters.selectedAcadamicSubjects.length > 0 ? data.alignmentSearchSelectedFilters.selectedAcadamicSubjects : [];
        if (data.alignmentSearchSelectedFilters.selectedAcadamicSubjects.length > 0) {
           this.selectedAcademicItems = this.selectedAcadamicSubjects;
           this.selectListCreation();
         }
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
       //   console.log(eachStrand);
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
        //  console.log(eachOutcome);
          this.outcomesDropdown.push(eachOutcome);
        }
      });
    });
   // console.log(this.strandsDropdown);
  }
  onCareerSelectAll() {
    this.strandsDropdown = [];
    this.strands.forEach(eachStrand => {
          this.strandsDropdown.push(eachStrand);
    });
  }
  onCareerDeSelectAll() {
    this.strandsDropdown = [];
  }
  onStrandSelectAll() {
    this.outcomesDropdown = [];
    this.outcomes.forEach(eachOutcome => {
          //  console.log(eachOutcome);
          this.outcomesDropdown.push(eachOutcome);
    });
  }
  onStrandDeSelectAll() {
    this.outcomesDropdown = [];
  }

  //onOutcomeSelectAll() { }
  //onOutcomeDeSelectAll() { }


  onItemSelect(event) {
    this.selectedAcademicItems = this.selectedAcadamicSubjects;
    this.selectListCreation();
  }
  OnItemDeSelect(event) {
    this.selectedAcademicItems = this.selectedAcadamicSubjects;
    this.selectListCreation();
  }
  onSelectAll(event) {
    this.selectedAcademicItems = [];
    this.selectedAcademicItems = event;
    this.selectListCreation();
  }
  onDeSelectAll(event) {
    this.selectedAcademicItems = [];
    this.selectedAcadamicSubjects = [];
  }

  selectListCreation() {
    this.selectedAcademicItems.forEach((e) => {
      this.academicSubjects.forEach((ace) => {
        if (e.SubjectId === ace.SubjectId) {
          e['Level'] = ace.Level;
        }
      });
    });

  }

  sendSub(item) {
    console.log(item);
  }

  onSubjectLevelsSelect(data) {
    let dropDownSetId: any = [];
    let selectedSetId: any = [];
    let updatedSelectedSetId: any = [];
    let tempData = this.selectedAcademicItems;
    tempData.map((subject) => {
        if (data.SubjectId === subject.SubjectId) { // comparing the selected items  level id with below statement which is the data of main object
          subject.Level.map((mainCourse, index) => {
            if (data.LevelId + 1 === mainCourse.LevelId) {
              mainCourse.DropdownList = [];
              data.SelectedItems.map((selectedItem) => {   // assigning parent level dropdown data
                  mainCourse.SubjectLevels.map((targetedDropdown) => { // setting the vakle of dropdown here
                    if (selectedItem.SubjectLevelsPk === targetedDropdown.ParentLevelPk) {
                      mainCourse.DropdownList.push(targetedDropdown);
                    }
                  });
                  // if (selectedItem.SubjectLevelsPk === )
              });
              // to set the values of only selected list options
              mainCourse.DropdownList.forEach((dropwdownList) => { dropDownSetId.push(dropwdownList.SubjectLevelsPk); }); // start mappiing the next dropdown
              if (mainCourse.SelectedItems.length > 0) {
                  mainCourse.SelectedItems.forEach((selectedList) => { selectedSetId.push(selectedList.SubjectLevelsPk); });
                  updatedSelectedSetId = _.intersection(dropDownSetId, selectedSetId);
                  if (updatedSelectedSetId.length === 0) {
                    mainCourse.SelectedItems = [];
                  } else {
                    mainCourse.SelectedItems = [];
                    mainCourse.SubjectLevels.forEach((set) => {
                      updatedSelectedSetId.forEach((resId) => {
                        if (set.SubjectLevelsPk === resId) {
                          mainCourse.SelectedItems.push(set);
                        }
                      });
                    });
                  }
                } else {
                  mainCourse.SelectedItems = [];
                } // end mappiing the next dropdown
              this.onSubjectLevelsSelect(mainCourse);
            }

             // to remove the 3rd level values if parent lavel is empty.
          });

        }
    });
    this.selectedAcademicItems = tempData;
    this.ref.detectChanges();
   // console.log(this.selectedAcademicItems);
  }


  onSubjectLevelsSelectAll(data) {
    let selectedAll = [];
    data.SelectedItems = [];
    data.SelectedItems = data.SubjectLevels;
    this.onSubjectLevelsSelect(data);
  }
  onSubjectLevelsDeSelectAll(data) {
    let selectedAll = [];
    data.SelectedItems = [];
    this.onSubjectLevelsSelect(data);
  }

  onOutcomeSelect(outcome) {
    // TODO: Call API
    this.store.dispatch({ type: AdvancedSearchActions.LOAD_COMPETENCY_DATA , payload : this.selectedOutcome});
    console.log(this.competencyNumbers);
  }
  search() {
    this.goToPage('SearchResults');
    // debugger;
    this.searchObj = {
      selectedCareers: this.selectedCareer,
      selectedStrands: this.selectedStrands,
      selectedOutcomes: this.selectedOutcome,
      selectedCompetencies: this.selectedCompetencyNumbers,
      selectedAcadamicSubjects: this.selectedAcadamicSubjects,
      finalSelectedObject : this.selectedAcademicItems
    };
    localStorage.setItem('searchLable', 'SearchAlignment');
    this.goToPage('SearchResults');
    this.store.dispatch({ type: AdvancedSearchActions.SAVE_AS_SELECTED_FILTERS , payload: this.searchObj});
  }

  onAcadamicSubjectSelect() {
    console.log('hi');
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }
}
