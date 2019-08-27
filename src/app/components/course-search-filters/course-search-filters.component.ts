
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
  careerPath: any = [];
  courses: any = [];
  academicSubjects: any = [];
  academicSubjectCourse: any = [];

  careerPathSettings: any = {};
  careerPathCourseSettings: any = {};
  academicSubjectsSettings: any = {};
  academicSubjectCourseSettings: any = [];
  subjectsDefaultSettings: any = {};
  selectedCareerPath: any = [];
  selectedCourses: any = [];
  selectedAcadamicSubjects: any = [];
  selectedAcademicSubjectCourse: any = [];
  selectedMathsCourses: any = [];
  selectedELACourses: any = [];
  selectedScienceCourses: any = [];
  selectedSocialCourses: any = [];

  searchObj: any;
  coursesDropdown: any = [];
  courseSearchData: Observable<CourseSearchData>;

  selectedAcademicItems: any = [];
  selectedAcademicCourses: any = [];

  constructor(private httpService: HttpClient, private ref: ChangeDetectorRef, private store: Store<AppState>) {
    // this.metaData = store.select('metaData');
    this.store.dispatch({ type: CourseSearchActions.LOAD_COURSESEARCH_DATA });
  }

  @Output() onPageSelect = new EventEmitter<any>();

  ngOnInit() {
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
      idField: 'CourseId', textField: 'CourseName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.academicSubjectsSettings = {
      singleSelection: false,
      idField: 'SubjectId', textField: 'SubjectName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.subjectsDefaultSettings = {
      singleSelection: false,
      idField: 'GradeSubjectId', textField: 'LevelValue',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.academicSubjectCourseSettings = {
      singleSelection: false,
      idField: 'LevelId', textField: 'LevelValue',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.store.select('courseSearch').subscribe(data => {
      this.courseSearchData = data.courseSearchData;
      this.careerPath = this.courseSearchData['CareerPath'];
      this.courses = this.courseSearchData['CareerPathCourses'];
      this.academicSubjects = this.courseSearchData['Subjects'];


      this.academicSubjectCourse = [];
      // if (this.metaData['Subjects'] && data.alignmentSearchSelectedFilters.selectedAcadamicSubjects.length == 0) {
      this.academicSubjectCourse = this.courseSearchData['SubjectCourses'];
      if (this.academicSubjectCourse != undefined) {
        if (this.academicSubjectCourse.length > 0) {
          this.academicSubjectCourse.forEach((subject) => {
            subject.GradeSubjects.forEach((item) => {
              item['SelectedItems'] = {}; // to maintain the individual selected list from the dropdowns.
              item['DropdownList'] = item.SubjectLevels;
            });
          });
        }
      }

      if (data.courseSearchSelectedFilters) {
        if (data.courseSearchSelectedFilters.selectedCareerPath.length > 0) {
          this.selectedCareerPath = data.courseSearchSelectedFilters.selectedCareerPath;
          this.onCareerPathSelect(this.selectedCareerPath);
        }
        if (data.courseSearchSelectedFilters.selectedCareerPathCourses.length > 0) {
          this.selectedCourses = data.courseSearchSelectedFilters.selectedCareerPathCourses;
        }
        // if (data.courseSearchSelectedFilters.selectedAcademicSubject.length > 0) {
        //   this.selectedAcadamicSubjects = data.courseSearchSelectedFilters.selectedAcademicSubject;
        //   this.onSubjectSelect(this.selectedAcadamicSubjects);
        // }
        this.selectedAcadamicSubjects = data.courseSearchSelectedFilters.selectedAcademicSubject.length > 0 ? data.courseSearchSelectedFilters.selectedAcademicSubject : [];
        if (data.courseSearchSelectedFilters.selectedAcademicSubject.length > 0) {
          this.selectedAcademicItems = this.selectedAcadamicSubjects;
          this.selectListCreation();
        }
      }
    });

  }

  onCareerPathSelect(selectedPaths) {
    const data = selectedPaths;
    this.coursesDropdown = [];
    this.courses.forEach(course => {
      data.forEach(careerPath => {
        if (course.CareerPathId === careerPath.CareerPathId) {
          this.coursesDropdown.push(course);
        }
      });
    });
  }

  getData(data) {
  }

  onSubjectSelect(event) {
    this.selectedAcademicItems = this.selectedAcadamicSubjects;
    this.selectListCreation();
  }

  OnSubjectDeSelect(event) {
    this.selectedAcademicItems = this.selectedAcadamicSubjects;
    this.selectListCreation();
  }

  onSubjectSelectAll(event) {
    this.selectedAcademicItems = [];
    this.selectedAcademicItems = event;
    this.selectListCreation();
  }

  onSubjectDeSelectAll(event) {
    this.selectedAcademicItems = [];
    this.selectedAcadamicSubjects = [];
  }

  selectListCreation() {
    this.selectedAcademicItems.forEach((e) => {
      this.academicSubjectCourse.forEach((ace) => {
        if (e.SubjectId === ace.SubjectId) {
          e['GradeSubjects'] = ace.GradeSubjects;
        }
      });
    });
  }
  clearSearch() {
    this.searchObj = {
      selectedCareerPath: [],
      selectedCareerPathCourses: [],
      selectedAcademicSubject: [],
      selectedAcademicSubjectCourses: []
    };
    this.store.dispatch({ type: CourseSearchActions.SAVE_AS_SELECTED_FILTERS_COURSESEARCH, payload: this.searchObj });
    this.selectedCareerPath = [];
    this.selectedAcadamicSubjects = [];
    this.selectedCourses = [];
    this.coursesDropdown = [];
    this.selectedAcademicItems = [];
  }
  search() {
    this.searchObj = {
      selectedCareerPath: this.selectedCareerPath,
      selectedCareerPathCourses: this.selectedCourses,
      selectedAcademicSubject: this.selectedAcadamicSubjects,
      // selectedAcademicSubjectCourses: [this.selectedMathsCourses, this.selectedELACourses, this.selectedScienceCourses, this.selectedSocialCourses]
      selectedAcademicSubjectCourses: this.selectedAcademicItems
    };
    this.store.dispatch({ type: CourseSearchActions.SAVE_AS_SELECTED_FILTERS_COURSESEARCH, payload: this.searchObj });
    localStorage.setItem('searchLable', 'SearchCourse');
    this.goToPage('SearchResults');
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }
}
