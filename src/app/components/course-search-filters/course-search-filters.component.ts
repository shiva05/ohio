
import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Observable } from 'rxjs/Observable';
import { CourseSearchData } from './../../models/courseSearch.model';
import * as CourseSearchActions from './../../actions/course-search.actions';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SharedService } from '../../services/shared.service';

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
  isVisible: boolean = false;

  constructor(private httpService: HttpClient, private ref: ChangeDetectorRef, private store: Store<AppState>, private rout: Router, private shared: SharedService, ) {
    this.store.dispatch({ type: CourseSearchActions.LOAD_COURSESEARCH_DATA });
  }

  @Output() onPageSelect = new EventEmitter<any>();

  ngOnInit() {
    this.careerPathSettings = this.shared.careerPathSettings;
    this.careerPathCourseSettings = this.shared.careerPathSettings;
    this.academicSubjectsSettings = this.shared.academicSubjectsSettings;
    this.subjectsDefaultSettings = this.shared.subjectsDefaultSettings;
    this.academicSubjectCourseSettings = this.shared.academicSubjectCourseSettings;

    this.store.select('courseSearch').subscribe(data => {
      this.courseSearchData = data.courseSearchData;
      this.careerPath = this.courseSearchData['CareerPath'];
      this.courses = this.courseSearchData['CareerPathCourses'];
      this.academicSubjects = this.courseSearchData['Subjects'];


      this.academicSubjectCourse = [];
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
        this.selectedAcadamicSubjects = data.courseSearchSelectedFilters.selectedAcademicSubject.length > 0 ? data.courseSearchSelectedFilters.selectedAcademicSubject : [];
        if (data.courseSearchSelectedFilters.selectedAcademicSubject.length > 0) {
          this.selectedAcademicItems = this.selectedAcadamicSubjects;
          this.selectListCreation();
        }
      }
    });
    // if we are navigating from other pages except updatesearch of alignmentSearchResults, we are clearing the search data.
    if (!this.shared.updateCourseSearch) {
      this.clearSearch();
    }
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

  onCareerPathSelectAll() {
    this.coursesDropdown = [];
    this.courses.forEach(course => {
      this.coursesDropdown.push(course);
    });
  }

  onCareerPathDeSelectAll() {
    this.coursesDropdown = [];
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
    this.store.dispatch({ type: CourseSearchActions.RESET_COURSE_SELECTED_FILTERS });
    this.selectedCareerPath = [];
    this.selectedAcadamicSubjects = [];
    this.selectedCourses = [];
    this.coursesDropdown = [];
    this.selectedAcademicItems = [];
  }
  showAlert(): void {
    if (this.isVisible) {
      return;
    }
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 4000);
  }
  search() {
    if (this.selectedCareerPath.length < 1 && this.selectedAcademicItems.length < 1) {
      this.showAlert();
    } else {
      this.searchObj = {
      selectedCareerPath: this.selectedCareerPath,
      selectedCareerPathCourses: this.selectedCourses,
      selectedAcademicSubject: this.selectedAcadamicSubjects,
      selectedAcademicSubjectCourses: this.selectedAcademicItems
    };
      this.store.dispatch({ type: CourseSearchActions.SAVE_CS_SELECTED_FILTERS, payload: this.searchObj });
      localStorage.setItem('searchLable', 'SearchCourse');
      this.rout.navigate(['/CourseSearchResults']);
    }
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }
}
