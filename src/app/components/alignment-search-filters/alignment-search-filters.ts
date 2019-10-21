import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Observable } from 'rxjs/Observable';
import { MetaData } from './../../models/meta-data.model';
import * as AdvancedSearchActions from './../../actions/advanced-search.actions';
import { _ } from 'underscore';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-alignment-search-filters',
  templateUrl: './alignment-search-filters.html',
  styleUrls: ['./alignment-search-filters.css']
})

export class AlignmentSearchFiltersComponent implements OnInit {
  careers: any = [];
  academicSubjects: any = [];
  strands: any = [];
  outcomes: any = [];
  grades: any = [];
  clusters: any = [];
  standardNumbers: any = [];
  strandsDropdown: any = [];
  outcomesDropdown: any = [];
  selectedKeyword: any;
  selectedCareer: any = [];
  selectedAcadamicSubjects: any = [];
  selectedStrands: any = [];
  selectedOutcome: any = [];
  selectedCompetencyNumbers: any = [];
  selectedGrades: any = [];
  selectedClusters: any = [];
  selectedStandardNumbers: any = [];
  dropdownSettings: any = {};
  competencyDropdownSettings: any = {};
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
  quickSearchSharedData = {
    KeyWords: '',
    CareerFields: [],
    AcademicSubjects: []
  };
  subjectsDefaultSettings: any = {};
  isVisible: boolean = false;

  constructor(private store: Store<AppState>, private shared: SharedService, private rout: Router) {
    this.store.dispatch({ type: AdvancedSearchActions.LOAD_META_DATA });
  }

  @Output() onPageSelect = new EventEmitter<any>();

  ngOnInit() {
    this.dropdownSettings = this.shared.dropdownSettings;
    this.careerFieldDropdownSettings = this.shared.careerFieldDropdownSettings;
    this.strandDropdownSettings = this.shared.strandDropdownSettings;
    this.outcomeDropdownSettings = this.shared.outcomeDropdownSettings;
    this.careerFieldDropdownSettings = this.shared.careerFieldDropdownSettings;
    this.academicSubjectDropdownSettings = this.shared.academicSubjectDropdownSettings;
    this.competencyDropdownSettings = this.shared.competencyDropdownSettings;
    this.subjectsDefaultSettings = this.shared.academicSubjectsDefaultSettings;

    let quickSearchData = JSON.parse(localStorage.getItem('QuickSearchData'));

    this.store.select('advancedSearch').subscribe(data => {
      this.metaData = data.metaData;
      if (this.careers.length === 0) {
        this.careers = this.metaData['CareerFields'];
      }
      this.strands = this.metaData['Strands'];
      this.outcomes = this.metaData['Outcomes'];
      this.grades = this.metaData['Grades'];
      this.clusters = this.metaData['clusters'];
      this.standardNumbers = this.metaData['standardNumbers'];
      this.competencyNumbers = data.competencies;
      if (this.metaData['Subjects'] && data.alignmentSearchSelectedFilters.selectedAcadamicSubjects.length == 0 && this.selectedAcadamicSubjects.length == 0) {
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
      }
      if (data.alignmentSearchSelectedFilters) {
        if (data.alignmentSearchSelectedFilters.selectedCareers) {
          if (data.alignmentSearchSelectedFilters.selectedCareers.length > 0) {
            this.selectedCareer = data.alignmentSearchSelectedFilters.selectedCareers;
            this.onCareerSelect();
          }
        }
        if (data.alignmentSearchSelectedFilters.selectedStrands) {
          if (data.alignmentSearchSelectedFilters.selectedStrands.length > 0) {
            this.selectedStrands = data.alignmentSearchSelectedFilters.selectedStrands;
            this.onStrandSelect();
          }
        }
        if (data.alignmentSearchSelectedFilters.selectedOutcomes) {
          if (data.alignmentSearchSelectedFilters.selectedOutcomes.length > 0) {
            this.selectedOutcome = data.alignmentSearchSelectedFilters.selectedOutcomes;
          }
        }
        if (data.alignmentSearchSelectedFilters.selectedCompetencies) {
          if (data.alignmentSearchSelectedFilters.selectedCompetencies.length > 0) {
            this.selectedCompetencyNumbers = data.alignmentSearchSelectedFilters.selectedCompetencies;
          }
        }
        if (data.alignmentSearchSelectedFilters.selectedAcadamicSubjects) {
          if (data.alignmentSearchSelectedFilters.selectedAcadamicSubjects.length > 0) {
            this.selectedAcadamicSubjects = data.alignmentSearchSelectedFilters.selectedAcadamicSubjects;
            this.selectedAcademicItems = this.selectedAcadamicSubjects;
            this.academicSubjects = data.alignmentSearchSelectedFilters.finalSelectedObject;
          }
        }
      }

      if (quickSearchData) {
        if (quickSearchData['AcademicSubjects'].length > 0) {
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
          this.selectedAcadamicSubjects = quickSearchData['AcademicSubjects'];
          this.selectedAcademicItems = quickSearchData['AcademicSubjects'];
          this.selectListCreation();
        }
        if (quickSearchData['CareerFields'].length > 0) {
          this.selectedCareer = quickSearchData['CareerFields'];
        }
      }
    });

    // if we are navigating from other pages except updatesearch of alignmentSearchResults, we are clearing the search data.
    if (!this.shared.updateAlignmentSearch) {
      this.clearSearch();
    }
  }


  onCareerSelect() {
    this.strandsDropdown = [];
    let strandsId: any = [];
    let selectedStrandId: any = [];
    let finalUpdatedSelectListIds: any = [];
    this.strands.forEach(eachStrand => {
      this.selectedCareer.forEach(eachCareer => {
        if (eachStrand.CareerFieldPk === eachCareer.CareerFieldId) {
          this.strandsDropdown.push(eachStrand);
        }
      });
    });
    this.strandsDropdown.forEach(item => {
      strandsId.push(item.StrandPk);
    });
    this.selectedStrands.forEach(element => {
      selectedStrandId.push(element.StrandPk);
    });
    finalUpdatedSelectListIds = _.intersection(selectedStrandId, strandsId);
    this.selectedStrands = [];
    if (finalUpdatedSelectListIds.length === 0) {
      this.selectedStrands = [];
      this.selectedOutcome = [];
      this.outcomesDropdown = [];
    } else {
      this.strands.forEach(strand => {
        finalUpdatedSelectListIds.forEach(element => {
          if (strand.StrandPk === element) {
            this.selectedStrands.push(strand);
          }
        });
        if (this.selectedOutcome.length > 0) {
          this.onStrandSelect();
        }

      });
    }
  }

  onStrandSelect() {
    let outcomesId: any = [];
    let selectedOutcomesId: any = [];
    let finalUpdatedSelectListIds: any = [];
    this.outcomesDropdown = [];
    this.outcomes.forEach(eachOutcome => {
      this.selectedStrands.forEach(eachStrand => {
        if (eachOutcome.StrandPk === eachStrand.StrandPk) {
          this.outcomesDropdown.push(eachOutcome);
        }
      });
    });

    this.outcomesDropdown.forEach(item => {
      outcomesId.push(item.OutcomePk);
    });
    this.selectedOutcome.forEach(element => {
      selectedOutcomesId.push(element.OutcomePk);
    });
    finalUpdatedSelectListIds = _.intersection(selectedOutcomesId, outcomesId);
    this.selectedOutcome = [];
    if (finalUpdatedSelectListIds.length === 0) {
      this.selectedOutcome = [];
    } else {
      this.outcomes.forEach(strand => {
        finalUpdatedSelectListIds.forEach(element => {
          if (strand.OutcomePk === element) {
            this.selectedOutcome.push(strand);
          }
        });
      });
    }
  }

  onCareerSelectAll() {
    this.strandsDropdown = [];
    this.strands.forEach(eachStrand => {
      this.strandsDropdown.push(eachStrand);
    });
  }

  onCareerDeSelectAll() {
    this.strandsDropdown = [];
    this.selectedStrands = [];
    this.selectedOutcome = [];
    this.outcomesDropdown = [];
    this.competencyNumbers = [];
    this.selectedCompetencyNumbers = []
  }

  onStrandSelectAll() {
    this.outcomesDropdown = [];
    this.outcomes.forEach(eachOutcome => {
      this.outcomesDropdown.push(eachOutcome);
    });
  }

  onStrandDeSelectAll() {
    this.outcomesDropdown = [];
    this.selectedOutcome = [];
    this.competencyNumbers = [];
    this.selectedCompetencyNumbers = []
  }

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

  onSubjectLevelsSelect(data) {
    let dropDownSetId: any = [];
    let selectedSetId: any = [];
    let updatedSelectedSetId: any = [];
    let tempData = this.selectedAcademicItems;
    tempData.map((subject) => {
      if (data.SubjectId === subject.SubjectId) { // comparing the selected items level id with below statement which is the data of main object
        subject.Level.map((mainCourse, index) => {
          if (data.LevelId + 1 === mainCourse.LevelId) {
            mainCourse.DropdownList = [];
            data.SelectedItems.map((selectedItem) => {   // assigning parent level dropdown data
              mainCourse.SubjectLevels.map((targetedDropdown) => { // setting the value of dropdown here
                if (selectedItem.SubjectLevelsPk === targetedDropdown.ParentLevelPk) {
                  mainCourse.DropdownList.push(targetedDropdown);
                }
              });
            });
            mainCourse.DropdownList.forEach((dropwdownList) => { dropDownSetId.push(dropwdownList.SubjectLevelsPk); }); // start mapping the next dropdown
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
            } // end mapping the next dropdown
            this.onSubjectLevelsSelect(mainCourse);
          }
        });
      }
    });
    this.selectedAcademicItems = tempData;
  }

  clearSearch() {
    localStorage.removeItem('QuickSearchData');
    this.searchObj = {
      selectedCareers: [],
      selectedStrands: [],
      selectedOutcomes: [],
      selectedCompetencies: [],
      selectedAcadamicSubjects: [],
      finalSelectedObject: [],
    };
    this.store.dispatch({ type: AdvancedSearchActions.RESET_ALIGNMENTSEARCH_FILTERS });
    this.selectedKeyword = '';
    this.selectedCareer = [];
    this.selectedAcadamicSubjects = [];
    this.selectedStrands = [];
    this.selectedOutcome = [];
    this.selectedCompetencyNumbers = [];
    this.selectedAcademicItems = [];
    this.strandsDropdown = [];
    this.outcomesDropdown = [];
    this.competencyNumbers = [];
    this.academicSubjects.forEach((subject) => {
      subject.Level.forEach((item) => {
        item['SelectedItems'] = {}; // to maintain the individual selected list from the dropdowns.
        item['DropdownList'] = []; // to set the data for the dropdowns of each item of a subject.
        if (item.LevelNumber === 1) { // to bind the data for the 1st column dropdown list.
          item['DropdownList'] = item.SubjectLevels;
        }
      });
    });
  }

  onSubjectLevelsSelectAll(data) {
    data.SelectedItems = [];
    data.SelectedItems = data.SubjectLevels;
    this.onSubjectLevelsSelect(data);
  }

  onSubjectLevelsDeSelectAll(data) {
    data.SelectedItems = [];
    this.onSubjectLevelsSelect(data);
  }

  onOutcomeSelect() {
    this.store.dispatch({ type: AdvancedSearchActions.LOAD_COMPETENCY_DATA, payload: this.selectedOutcome });
  }

  showAlert(): void {
    if (this.isVisible) {
      return;
    }
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 4000);
  }

  onOutcomeSelectAll() {
    this.competencyNumbers = [];
    this.selectedOutcome = this.outcomesDropdown;
    this.store.dispatch({ type: AdvancedSearchActions.LOAD_COMPETENCY_DATA, payload: this.selectedOutcome });
  }

  onOutcomeDeSelectAll() {
    this.competencyNumbers = [];
    this.selectedCompetencyNumbers = [];
  }

  search() {
    if (this.selectedCareer.length < 1 || this.selectedAcademicItems.length < 1) {
      this.showAlert();
    } else {
      this.searchObj = {
        selectedKeyword: this.selectedKeyword,
        selectedCareers: this.selectedCareer,
        selectedStrands: this.selectedStrands,
        selectedOutcomes: this.selectedOutcome,
        selectedCompetencies: this.selectedCompetencyNumbers,
        selectedAcadamicSubjects: this.selectedAcademicItems,
        finalSelectedObject: this.academicSubjects
      };
      localStorage.setItem('searchLable', 'SearchAlignment');
      this.rout.navigate(['/AlignmentSearchResults']);
      this.store.dispatch({ type: AdvancedSearchActions.SAVE_AS_SELECTED_FILTERS, payload: this.searchObj });
    }
  }
}
