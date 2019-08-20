
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

  mathsCourseName: any = [];
  ELACourseName: any = [];
  scienceCourseName: any =[];
  socialCourseName: any =[];
  selectedAcademicItems: any = [];

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

        // this.metaData['Subjects'].forEach(element => {
        //   this.academicSubjects.push({SubjectId :element.SubjectId,SubjectName :element.SubjectName});
        //});
     // }
     // console.log(this.academicSubjectCourse);
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
    console.log(data);
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
      this.academicSubjectCourse.forEach((ace) => {
        if (e.SubjectId === ace.SubjectId) {
          e['GradeSubjects'] = ace.GradeSubjects;
        }
      });
    });
    console.log(this.selectedAcademicItems);
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
     // selectedAcademicSubjectCourses: [this.selectedMathsCourses, this.selectedELACourses, this.selectedScienceCourses, this.selectedSocialCourses]
      selectedAcademicSubjectCourses : this.selectedAcademicItems
    };
    this.store.dispatch({ type: CourseSearchActions.SAVE_AS_SELECTED_FILTERS_COURSESEARCH, payload: this.searchObj });
    localStorage.setItem('searchLable', 'SearchCourse');
    this.goToPage('SearchResults');
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }
}
