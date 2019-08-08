
import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Observable } from 'rxjs/Observable';
import { CourseSearchData } from './../../models/courseSearch.model';
import * as CourseSearchActions from './../../actions/course-search.actions';

@Component({
  selector: 'app-course-search-filters',
  templateUrl: './course-search-filters.component.html',
  styleUrls: ['./course-search-filters.component.css']
})

export class CourseSearchFiltersComponent implements OnInit {
  disabled = false;
  ShowFilter = true;
  limitSelection = false;
  careerPath: any = [];
  courses: any = [];
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
  careerPathSettings: any = {};
  careerPathCourseSettings: any = {};
  searchObj: any;
  selectedCompetencyNumber: any;
  competencyNumbers: any;
  courseSearchData: Observable<CourseSearchData>;

  constructor(private httpService: HttpClient, private ref: ChangeDetectorRef, private store: Store<AppState>) {
    // this.metaData = store.select('metaData');
    this.store.dispatch({ type: CourseSearchActions.LOAD_COURSESEARCH_DATA });
  }

  @Output() onPageSelect = new EventEmitter<any>();

  ngOnInit() {
    this.store.select('courseSearch').subscribe(data => {
      this.courseSearchData = data.courseSearchData;
      this.careerPath = this.courseSearchData['CareerPath'];
      this.courses = this.courseSearchData['CareerPathCourses'];
    });

    this.careerPathSettings = {
      singleSelection: false,
      idField: 'CareerPathId', textField: 'CareerPathName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.careerPathCourseSettings = {
      singleSelection: false,
      idField: 'CourseId', textField: 'CourseId',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  search() {
    this.searchObj = JSON.stringify({
      selectedKeyword: this.selectedKeyword,
      selectedAcadamicSubjects: this.selectedAcadamicSubjects,
      selectedStandards: this.selectedStandards,
      selectedOutcome: this.selectedOutcome,
      selectedCompetencyNumber: this.selectedCompetencyNumber,
      selectedCareers: this.selectedCareer
    });
    console.log(this.searchObj);
    localStorage.setItem('searchLable', 'SearchCourse');
    this.goToPage('SearchResults');
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
  }

}
