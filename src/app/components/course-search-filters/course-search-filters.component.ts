
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

  mathsCourseName: any = [];
  ELACourseName: any = [];
  scienceCourseName: any[];
  socialCourseName: any[];

  selectedAcademicCourses: any = [];

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
      this.academicSubjects = this.courseSearchData['Subjects'];
      this.academicSubjectCourse = this.courseSearchData['SubjectCourses'];
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

    this.academicSubjectCourseSettings = {
      singleSelection: false,
      idField: 'LevelId', textField: 'LevelValue',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
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

  onAcadamicSubjectSelect(selectedSubject) {
    this.mathsCourseName = [];
    this.ELACourseName = [];
    this.scienceCourseName = [];
    this.socialCourseName = [];

    selectedSubject.forEach(sub => {
      if (sub.SubjectId === 1) {
        this.academicSubjectCourse[0].GradeSubjects.forEach(element => {
          this.mathsCourseName.push(element.LevelValue);
        });
      } else if (sub.SubjectId === 2) {
        this.academicSubjectCourse[1].GradeSubjects.forEach(element => {
          this.ELACourseName.push(element.LevelValue);
        });
      } else if (sub.SubjectId === 3) {
        this.academicSubjectCourse[2].GradeSubjects.forEach(element => {
          this.scienceCourseName.push(element.LevelValue);
        });
      } else if (sub.SubjectId === 4) {
        this.academicSubjectCourse[3].GradeSubjects.forEach(element => {
          this.socialCourseName.push(element.LevelValue);
        });
      }
    });
  }

  selectAllAcademicSubject(data) {

  }

  deSelectAllAcademicSubject(data) {

  }

  search() {
    this.searchObj = {
      selectedCareerPath: this.selectedCareerPath,
      selectedCareerPathCourses: this.selectedCourses,
      selectedAcademicSubject: this.selectedAcadamicSubjects,
      selectedAcademicSubjectCourses: [this.selectedMathsCourses, this.selectedELACourses, this.selectedScienceCourses, this.selectedSocialCourses]
    };
    this.store.dispatch({ type: CourseSearchActions.SAVE_AS_SELECTED_FILTERS_COURSESEARCH, payload: this.searchObj });
    localStorage.setItem('searchLable', 'SearchCourse');
    this.goToPage('SearchResults');
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }
}
