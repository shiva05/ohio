import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SearchResultService } from '../../services/search-result.service';
import * as CourseSearchActions from './../../actions/course-search.actions';

@Component({
  selector: 'app-course-search-accordion',
  templateUrl: './course-search-accordion.component.html',
  styleUrls: ['./course-search-accordion.component.css']
})

export class CourseSearchAccordionComponent implements OnInit {
  careerPathToSubject = true;
  courseSearchSelectedFilters: {};
  careerPathToSubjectData: any = [];
  subjectToCareerPathData: any = [];
  noCourseResultFound = false;
  courseSearchReportPayload = {
    Keywords: '',
    CareerPathIds: [],
    CourseIds: [],
    CompetencyIds: [],
    Subjects: [],
    CareerPathToSubject: true
  };
  academicSubjectColorPallet: any = [
    {
      Subject: 'Math',
      Color: '#000000'
    },
    {
      Subject: 'ELA',
      Color: '#5E8000'
    },
    {
      Subject: 'Science',
      Color: '#BF181A'
    },
    {
      Subject: 'Social',
      Color: '#0B5688'
    }
  ];

  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private store: Store<AppState>, private httpService: HttpClient, private searchResultService: SearchResultService) { }

  ngOnInit() {
    this.getCourseSearchResult();
  }

  getCourseSearchResult() {
    this.store.select('courseSearch').subscribe(data => {
      if (data.courseSearchSelectedFilters) {
        this.courseSearchSelectedFilters = data.courseSearchSelectedFilters;

        let careerPathIds = [];
        data.courseSearchSelectedFilters.selectedCareerPath.forEach(element => {
          careerPathIds.push(element.CareerPathId);
        });

        let courseIds = [];
        data.courseSearchSelectedFilters.selectedCareerPathCourses.forEach(element => {
          courseIds.push(element.CourseId);
        });

        let subjects = [];
        data.courseSearchSelectedFilters.selectedAcademicSubject.forEach(element => {
          let level1 = [];

          if (element.SelectedItems && element.SelectedItems.length > 0) {
            element.SelectedItems.forEach(level => {
              level1.push(level.LevelValue);
            });
          }

          let subject = {
            SubjectId: element.SubjectId,
            Level1Ids: level1,
          };

          subjects.push(subject);
        });

        let obj = {
          Keywords: '',
          CareerPathIds: careerPathIds,
          CourseIds: courseIds,
          Subjects: subjects,
          CareerPathToSubject: this.careerPathToSubject
        };

        this.searchResultService.getCourseSearchResult(obj).subscribe(
          (data: any) => {
            if (this.careerPathToSubject) {
              this.careerPathToSubjectData = data.CareerPathToAcademicSubjects;
              if (this.careerPathToSubjectData.length > 0) {
                this.noCourseResultFound = false;
              } else {
                this.noCourseResultFound = true;
              }
            } else {
              this.subjectToCareerPathData = data.AcademicSubjectToCareePaths;
              if (this.subjectToCareerPathData.length > 0) {
                this.noCourseResultFound = false;
              } else {
                this.noCourseResultFound = true;
              }
            }
          },
          err => {
            console.log(err);
          });
      }
    });
  }

  findSubjectColor(subject) {
    for (let i = 0; i < this.academicSubjectColorPallet.length; i++) {
      if (this.academicSubjectColorPallet[i].Subject === subject) {
        return this.academicSubjectColorPallet[i].Color;
      }
    }
  }

  // Expand/Collapse event on Career Path
  expandCollapseCareerPath(obj) {
    obj.isCareerPathClosed = !obj.isCareerPathClosed;
  }

  // Expand/Collapse event on Course
  expandCollapseCourse(obj) {
    obj.isCourseClosed = !obj.isCourseClosed;
  }

  // Click event on Career Path
  careerPathCheckBox(obj) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < obj.Courses.length; i++) {
      obj.Courses[i].isSelected = obj.isSelected;
      if (obj.Courses[i].Competencies) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < obj.Courses[i].Competencies.length; j++) {
          obj.Courses[i].Competencies[j].isSelected = obj.isSelected;
        }
      }
    }
  }

  // Click event on Courses Checkbox
  courseCheckBox(career, course) {
    // tslint:disable-next-line:only-arrow-functions
    career.isSelected = career.Courses.every(function(itemChild: any) {
      return itemChild.isSelected === true;
    });

    if (course.Competencies) {
      if (course.isSelected) {
        course.Competencies.forEach(item => {
          item.isSelected = true;
        });
      } else {
        course.Competencies.forEach(item => {
          item.isSelected = false;
        });
      }
    }
  }

  // Click event on Competency Checkbox
  competencyCheckBox(career, course) {
    // tslint:disable-next-line:only-arrow-functions
    course.isSelected = course.Competencies.every(function(itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    career.isSelected = career.Courses.every(function(itemChild: any) {
      return itemChild.isSelected === true;
    });
  }

  getCourseSearchReport(obj) {
    this.courseSearchReportPayload.Keywords = '';
    this.courseSearchReportPayload.CareerPathIds = [];
    this.courseSearchReportPayload.CourseIds = [];
    this.courseSearchReportPayload.Subjects = [];
    this.courseSearchReportPayload.CareerPathToSubject = this.careerPathToSubject;

    if (this.careerPathToSubject) {
      this.careerPathToSubjectData.forEach(careerPath => {

        if (careerPath.isSelected) {
          this.courseSearchReportPayload.CareerPathIds.push(careerPath.CareerPathId);
          this.courseSearchReportPayload.Subjects.push({ SubjectId: careerPath.SubjectId });
        }

        careerPath.Courses.forEach(course => {
          if (course.isSelected) {
            this.courseSearchReportPayload.CourseIds.push(course.CourseId);
          }

          course.Competencies.forEach(competency => {
            if (competency.isSelected) {
              this.courseSearchReportPayload.CompetencyIds.push(competency.Id);
            }
          });
        });
      });
    } else {

    }

    console.log(this.courseSearchReportPayload);
    this.goToPage(obj);
    this.courseSearchSelectedFilters['selectedCourseSearchResults'] = this.courseSearchReportPayload;
    this.store.dispatch({ type: CourseSearchActions.SAVE_AS_SELECTED_FILTERS_COURSESEARCH, payload: this.courseSearchSelectedFilters });
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }

  onToggleClick(value) {
    this.careerPathToSubject = !this.careerPathToSubject;
    this.courseSearchReportPayload.CareerPathToSubject = this.careerPathToSubject;
    this.getCourseSearchResult();
  }

}
