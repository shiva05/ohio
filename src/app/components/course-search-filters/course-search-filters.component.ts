
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Observable } from 'rxjs/Observable';
import { CourseSearchData } from './../../models/courseSearch.model';
import * as CourseSearchActions from './../../actions/course-search.actions';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { _ } from 'underscore';

@Component({
  selector: 'app-course-search-filters',
  templateUrl: './course-search-filters.component.html',
  styleUrls: ['./course-search-filters.component.css']
})

export class CourseSearchFiltersComponent implements OnInit {
  careers: any = [];
  careerPath: any = [];
  courses: any = [];
  academicSubjects: any = [];
  academicSubjectCourse: any = [];
  selectedKeyword: any = '';
  careerFieldDropdownSettings: any = {};
  careerPathSettings: any = {};
  careerPathCourseSettings: any = {};
  academicSubjectsSettings: any = {};
  academicSubjectCourseSettings: any = [];
  subjectsDefaultSettings: any = {};
  selectedCareer: any = [];
  selectedCareerPath: any = [];
  selectedCourses: any = [];
  selectedAcadamicSubjects: any = [];
  selectedAcademicSubjectCourse: any = [];
  selectedMathsCourses: any = [];
  selectedELACourses: any = [];
  selectedScienceCourses: any = [];
  selectedSocialCourses: any = [];

  searchObj: any;
  careerPathDropdown: any = [];
  coursesDropdown: any = [];
  courseSearchData: Observable<CourseSearchData>;

  selectedAcademicItems: any = [];
  selectedAcademicCourses: any = [];
  isVisible: boolean = false;

  constructor(private store: Store<AppState>, private rout: Router, private shared: SharedService) {
    this.store.dispatch({ type: CourseSearchActions.LOAD_COURSESEARCH_DATA });
  }

  @Output() onPageSelect = new EventEmitter<any>();

  ngOnInit() {
    this.careerFieldDropdownSettings = this.shared.careerFieldDropdownSettings;
    this.careerPathSettings = this.shared.careerPathSettings;
    this.careerPathCourseSettings = this.shared.careerPathCourseSettings;
    this.academicSubjectsSettings = this.shared.academicSubjectsSettings;
    this.subjectsDefaultSettings = this.shared.subjectsDefaultSettings;
    this.academicSubjectCourseSettings = this.shared.academicSubjectCourseSettings;

    this.store.select('courseSearch').subscribe(data => {
      this.courseSearchData = data.courseSearchData;
      this.careers = this.courseSearchData['CareerFields'];
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
        this.selectedKeyword = data.courseSearchSelectedFilters.selectedKeyword;
        if (data.courseSearchSelectedFilters.selectedCareers.length > 0) {
          this.selectedCareer = data.courseSearchSelectedFilters.selectedCareers;
          this.onCareerFieldSelect(this.selectedCareer);
        }
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

  onCareerFieldSelect(selectedCareer) {
    const data = selectedCareer;
    this.careerPathDropdown = [];
    let selectedCareerFieldIds = [];
    let SelectedCareerPathIds = [];
    let finalUpdatedSelectListIds: any = [];

    this.careerPath.forEach(careerPath => {
      data.forEach(career => {
        if (career.CareerFieldId === careerPath.CareerFieldId) {
          this.careerPathDropdown.push(careerPath);
        }
      });
    });

    this.careerPathDropdown.forEach(career => {
      SelectedCareerPathIds.push(career.CareerPathId);
    });

    this.selectedCareerPath.forEach(element => {
      selectedCareerFieldIds.push(element.CareerPathId);
    });
    finalUpdatedSelectListIds = _.intersection(SelectedCareerPathIds, selectedCareerFieldIds);

    if (finalUpdatedSelectListIds.length === 0) {
      this.selectedCareerPath = [];
      this.selectedCourses = [];
      this.coursesDropdown = [];
    } else {
      this.selectedCareerPath = [];
      this.careerPathDropdown.forEach(careerPath => {
        finalUpdatedSelectListIds.forEach(element => {
          if (careerPath.CareerPathId === element) {
            this.selectedCareerPath.push(careerPath);
          }
        });
      });
    }
  }

  onCareerFieldSelectAll() {
    this.careerPathDropdown = [];
    this.careerPath.forEach(careerPath => {
      this.careerPathDropdown.push(careerPath);
    });
  }

  onCareerFieldDeSelectAll() {
    this.careerPathDropdown = [];
    this.selectedCareerPath = [];
    this.coursesDropdown = [];
    this.selectedCourses = [];
  }

  onCareerPathSelect(selectedPaths) {
    const data = selectedPaths;
    this.coursesDropdown = [];
    let selectedCareerIds = [];
    let SelectedCoursesIds = [];
    let finalUpdatedSelectListIds: any = [];
    this.courses.forEach(course => {
      data.forEach(careerPath => {
        if (course.CareerPathId === careerPath.CareerPathId) {
          this.coursesDropdown.push(course);
        }
      });
    });
    this.coursesDropdown.forEach(item => {
      selectedCareerIds.push(item.CourseId);
    });
    this.selectedCourses.forEach(item => {
      SelectedCoursesIds.push(item.CourseId);
    });
    finalUpdatedSelectListIds = _.intersection(SelectedCoursesIds, selectedCareerIds);
    this.selectedCourses = [];
    if (finalUpdatedSelectListIds.length === 0) {
      this.selectedCourses = [];
    } else {
      this.coursesDropdown.forEach(course => {
        finalUpdatedSelectListIds.forEach(element => {
          if (course.CourseId === element) {
            this.selectedCourses.push(course);
          }
        });
      });
    }
  }

  onCareerPathSelectAll() {
    this.coursesDropdown = [];
    this.courses.forEach(course => {
      this.coursesDropdown.push(course);
    });
  }

  onCareerPathDeSelectAll() {
    this.coursesDropdown = [];
    this.selectedCourses = [];
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
      selectedCareers: [],
      selectedCareerPath: [],
      selectedCareerPathCourses: [],
      selectedAcademicSubject: [],
      selectedAcademicSubjectCourses: []
    };
    this.store.dispatch({ type: CourseSearchActions.RESET_COURSE_SELECTED_FILTERS });
    this.selectedCareer = [];
    this.selectedCareerPath = [];
    this.selectedAcadamicSubjects = [];
    this.selectedCourses = [];
    this.careerPathDropdown = [];
    this.coursesDropdown = [];
    this.selectedAcademicItems = [];
    this.selectedKeyword = '';
  }

  showAlert(): void {
    if (this.isVisible) {
      return;
    }
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 4000);
  }

  search() {
    if (this.selectedCareer.length < 1 || this.selectedAcademicItems.length < 1) {
      this.showAlert();
    } else {
      this.searchObj = {
        selectedKeyword: this.selectedKeyword,
        selectedCareers: this.selectedCareer,
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
}
