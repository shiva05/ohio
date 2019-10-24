import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SearchResultService } from '../../services/search-result.service';
import * as CourseSearchActions from './../../actions/course-search.actions';
import { Router } from '@angular/router';
import { _ } from 'underscore';
import { SharedService } from '../../services/shared.service';
import { take } from 'rxjs/internal/operators/take';

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
  totalSearchResults = 0;
  Level1Ids: any = [];
  Level2Ids: any = [];
  isCSVisible: boolean = false;
  isASVisible: boolean = false;
  isSelectedValidation: boolean = false;
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
      SubjectId: 1,
      Subject: 'Math',
      Color: '#000000'
    },
    {
      SubjectId: 2,
      Subject: 'ELA',
      Color: '#5E8000'
    },
    {
      SubjectId: 3,
      Subject: 'Science',
      Color: '#BF181A'
    },
    {
      SubjectId: 4,
      Subject: 'Social',
      Color: '#0B5688'
    }
  ];

  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private store: Store<AppState>, private searchResultService: SearchResultService, private rout: Router, private _shared: SharedService) { }

  ngOnInit() {
    this.getCourseSearchResult();
  }

  goBackToCourseSearch() {
    this.store.dispatch({ type: CourseSearchActions.RESET_COURSE_SELECTED_FILTERS });
    this.rout.navigate(['/coursesearch']);
  }

  getCourseSearchResult() {
    this.store.select('courseSearch').pipe(take(1)).subscribe(data => {
      if (data.courseSearchSelectedFilters && data.courseSearchSelectedFilters.selectedCareerPath.length > 0 && data.courseSearchSelectedFilters.selectedAcademicSubject.length > 0) {
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
        // this.careerPathToSubject = this._shared.toggleCareer;
        let obj = {
          Keywords: data.courseSearchSelectedFilters && data.courseSearchSelectedFilters.selectedKeyword ? data.courseSearchSelectedFilters.selectedKeyword : '',
          CareerPathIds: careerPathIds,
          CourseIds: courseIds,
          Subjects: subjects,
          CareerPathToSubject: this.careerPathToSubject
        };

        this.searchResultService.getCourseSearchResult(obj).subscribe(
          (data: any) => {
            this.totalSearchResults = 0;
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
                this.subjectToCareerPathData.forEach(element => {
                  element['IsChildPartiallySelected'] = false;
                  element['isSelected'] = false;
                  if (element.SubjecToStandards.length > 0) {
                    element.SubjecToStandards.forEach(item => {
                      item['IsChildPartiallySelected'] = false;
                      item['isSelected'] = false;
                      if (item.Standards.length > 0) {
                        item.Standards.forEach(child => {
                          child['isSelected'] = false;
                        });
                      }
                    });
                  }
                });
                this.noCourseResultFound = false;
              } else {
                this.noCourseResultFound = true;
              }
            }
            this.careerPathToSubjectData.forEach(element => {
              element['IsChildPartiallySelected'] = false;
              element['isSelected'] = false;
              if (element['Courses'].length > 0) {
                element['Courses'].forEach((courses) => {
                  courses['IsChildPartiallySelected'] = false;
                  courses['isSelected'] = false;
                  if (courses['Competencies'].length > 0) {
                    courses['Competencies'].forEach((competencies) => {
                      competencies['isSelected'] = false;
                    });
                  }
                });
              }
              this.totalSearchResults += element.AlignmentCount;
            });
          });
      }
    });
  }

  findSubjectColor(SubjectId) {
    for (let i = 0; i < this.academicSubjectColorPallet.length; i++) {
      if (this.academicSubjectColorPallet[i].SubjectId === SubjectId) {
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
    obj.IsChildPartiallySelected = false;
    for (let i = 0; i < obj.Courses.length; i++) {
      obj.Courses[i].isSelected = obj.isSelected;
      obj.Courses[i].IsChildPartiallySelected = false;
      if (obj.Courses[i].Competencies) {
        for (let j = 0; j < obj.Courses[i].Competencies.length; j++) {
          obj.Courses[i].Competencies[j].isSelected = obj.isSelected;
        }
      }
    }
  }

  // Click event on Courses Checkbox
  courseCheckBox(career, course) {
    course.IsChildPartiallySelected = false;
    career.isSelected = career.Courses.every(function (itemChild: any) {
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
    this.trackCareersStatus(career);
  }

  // Click event on Competency Checkbox
  competencyCheckBox(career, course) {
    course.isSelected = course.Competencies.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    career.isSelected = career.Courses.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });
    this.trackCareerCompetencyStatus(career, course);
  }

  trackCareerCompetencyStatus(career, course) {
    let competencyStatus = [];
    for (let comp = 0; comp < course.Competencies.length; comp++) {// to update Compatency and outcomes status
      course.Competencies.forEach((element) => {
        competencyStatus.push(element.isSelected);
      });
      competencyStatus = _.uniq(competencyStatus);
      if (competencyStatus.length > 1) {
        course.IsChildPartiallySelected = true;
        course.isSelected = false;
        career.IsChildPartiallySelected = true;
      } else if (competencyStatus.length === 1) {
        if (competencyStatus[0] === true) {
          course.IsChildPartiallySelected = false;
          course.isSelected = true;
          career.IsChildPartiallySelected = true;
        } else if (competencyStatus[0] === false) {
          course.IsChildPartiallySelected = false;
          course.isSelected = false;
        }
      }
    }
    this.trackCareersStatus(career);
  }

  trackCareersStatus(career) {
    let coursesPatialSelectedList = [];
    for (let sub = 0; sub < career.Courses.length; sub++) {
      career.Courses.forEach((course) => {
        coursesPatialSelectedList.push(course.IsChildPartiallySelected);
      });
      coursesPatialSelectedList = _.uniq(coursesPatialSelectedList);
      if (coursesPatialSelectedList.length > 1) {
        career.IsChildPartiallySelected = true;
        career.isSelected = false;
      } else if (coursesPatialSelectedList.length === 1) {
        if (coursesPatialSelectedList[0] === true) {
          career.IsChildPartiallySelected = true;
          career.isSelected = false;
        } else if (coursesPatialSelectedList[0] === false) {
          let coursesSelectedList = [];
          career.Courses.forEach((career) => {
            coursesSelectedList.push(career.isSelected);
          });
          coursesSelectedList = _.uniq(coursesSelectedList);
          if (coursesSelectedList.length > 1) {
            career.IsChildPartiallySelected = true;
            career.isSelected = false;
          } else if (coursesSelectedList.length === 1) {
            if (coursesSelectedList[0] === true) {
              career.IsChildPartiallySelected = false;
              career.isSelected = true;
            } else if (coursesSelectedList[0] === false) {
              career.IsChildPartiallySelected = false;
              career.isSelected = false;
            }
          }
        }
      }
    }
  }

  // Click event on Subject
  subjectCheckBox(obj) {
    for (let i = 0; i < obj.SubjecToStandards.length; i++) {
      obj.SubjecToStandards[i].isSelected = obj.isSelected;
      if (obj.SubjecToStandards[i].Standards) {
        for (let j = 0; j < obj.SubjecToStandards[i].Standards.length; j++) {
          obj.SubjecToStandards[i].Standards[j].isSelected = obj.isSelected;
        }
      }
    }
    obj.IsChildPartiallySelected = false;
    obj.SubjecToStandards.forEach(element => {
      element.IsChildPartiallySelected = false;
    })
  }

  // Click event on Grade Checkbox
  gradeCheckBox(career, course) {
    //career.isSelected = career.SubjecToStandards.every(function (itemChild: any) {
    //  return itemChild.isSelected === true;
    //});
    course.IsChildPartiallySelected = false;
    if (course.Standards) {
      if (course.isSelected) {
        course.Standards.forEach(item => {
          item.isSelected = true;
        });
      } else {
        course.Standards.forEach(item => {
          item.isSelected = false;
        });
      }
    }
    this.trackStrandsStatus(career);
  }

  // Click event on Standard Checkbox
  standardCheckBox(career, course) {
    //course.isSelected = course.Standards.every(function (itemChild: any) {
    //  return itemChild.isSelected === true;
    //});

    //career.isSelected = career.SubjecToStandards.every(function (itemChild: any) {
    //  return itemChild.isSelected === true;
    //});
    let courseStatus: any = [];
    
    course.Standards.forEach(strand => {
      courseStatus.push(strand.isSelected);
    });
    courseStatus = _.uniq(courseStatus);
    if (courseStatus.length > 1) {
      course.IsChildPartiallySelected = true;
      course.isSelected = false;
    } else if (courseStatus.length === 1) {
      if (courseStatus[0] === true) {
        course.IsChildPartiallySelected = false;
        course.isSelected = true;
      } else if (courseStatus[0] === false) {
        course.IsChildPartiallySelected = false;
        course.isSelected = false;
      }
    }
    this.trackStrandsStatus(career);
  }

  trackStrandsStatus(parent) {
    let strandsStatus: any = [];
    let strandsPartialStatus: any = [];
    parent.SubjecToStandards.forEach(element => {
      strandsStatus.push(element.isSelected);
      strandsPartialStatus.push(element.IsChildPartiallySelected);
    });
    strandsStatus = _.uniq(strandsStatus);
    strandsPartialStatus = _.uniq(strandsPartialStatus);
    if (strandsStatus.length > 1) {
      parent.IsChildPartiallySelected = true;
      parent.isSelected = false;
    } else if (strandsStatus.length === 1) {
      if (strandsStatus[0] === true) {
        parent.IsChildPartiallySelected = false;
        parent.isSelected = true;
      } else if (strandsStatus[0] === false) {
        parent.isSelected = false;
        if (strandsPartialStatus.length > 1) {
          parent.IsChildPartiallySelected = true;
        } else if (strandsPartialStatus.length === 1) {
          if (strandsPartialStatus[0] === true) {
            parent.IsChildPartiallySelected = true;
          } else if (strandsPartialStatus[0] === false) {
            parent.IsChildPartiallySelected = false;
          }
        }
      }

    }
  }

  getCourseSearchReport(obj) {
    this.courseSearchReportPayload.Keywords = '';
    this.courseSearchReportPayload.CareerPathIds = [];
    this.courseSearchReportPayload.CourseIds = [];
    this.courseSearchReportPayload.Subjects = [];
    this.courseSearchReportPayload.CareerPathToSubject = this.careerPathToSubject;

    this.isSelectedValidate();

    if (!this.isSelectedValidation) {
      if (this.careerPathToSubject) {
        this.careerPathToSubjectData.forEach(careerPath => {
          if (careerPath.isSelected === true || careerPath.IsChildPartiallySelected === true) {
            this.courseSearchReportPayload.CareerPathIds.push(careerPath.CareerPathId);
            this.courseSearchReportPayload.Subjects.push({ SubjectId: careerPath.SubjectId });
          }

          careerPath.Courses.forEach(course => {
            if (course.isSelected === true || course.IsChildPartiallySelected === true) {
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
        this.Level1Ids = [];
        this.Level2Ids = [];
        this.subjectToCareerPathData.forEach(subject => {          
          subject.SubjecToStandards.forEach(grade => {
            if (grade.isSelected === true || grade.IsChildPartiallySelected === true ) {
              this.Level1Ids.push(grade.Level1Value);
            }

            grade.Standards.forEach(standard => {
              if (standard.isSelected) {
                this.Level2Ids.push(standard.StandardDesc);
              }
            });
          });

          if (subject.isSelected === true || subject.IsChildPartiallySelected === true ) {
            this.courseSearchReportPayload.CareerPathIds.push(subject.CareerPathId);

            this.courseSearchReportPayload.Subjects.push({
              SubjectId: subject.SubjectId,
              Level1Ids: this.Level1Ids,
              Level2Ids: this.Level2Ids
            });
          }
        });
      }
      this.rout.navigate(['/CourseSearchReport']);
      this.courseSearchSelectedFilters['selectedCourseSearchResults'] = this.courseSearchReportPayload;
      this.store.dispatch({ type: CourseSearchActions.SAVE_CS_SELECTED_FILTERS, payload: this.courseSearchSelectedFilters });
    } else {
      if (this.careerPathToSubject) {
        this.isASVisible = false;
        this.isCSVisible = true;
        setTimeout(() => this.isCSVisible = false, 4000);
      } else {
        this.isCSVisible = false;
        this.isASVisible = true;
        setTimeout(() => this.isASVisible = false, 4000);
      }
    }
  }

  isSelectedValidate() {
    this.isSelectedValidation = true;
    if (this.careerPathToSubject) {
      this.careerPathToSubjectData.forEach(careerPath => {
        if (careerPath.isSelected) {
          this.isSelectedValidation = false;
        }
        careerPath.Courses.forEach(course => {
          if (course.isSelected) {
            this.isSelectedValidation = false;
          }
          course.Competencies.forEach(competency => {
            if (competency.isSelected) {
              this.isSelectedValidation = false;
            }
          });
        });
      });
    } else {
      this.subjectToCareerPathData.forEach(subject => {
        subject.SubjecToStandards.forEach(grade => {
          if (grade.isSelected) {
            this.isSelectedValidation = false;
          }
          grade.Standards.forEach(standard => {
            if (standard.isSelected) {
              this.isSelectedValidation = false;
            }
          });
        });
        if (subject.isSelected) {
          this.isSelectedValidation = false;
        }
      });
    }
  }

  onToggleClick() {
    this.careerPathToSubject = !this.careerPathToSubject;
    this.courseSearchReportPayload.CareerPathToSubject = this.careerPathToSubject;
    // this._shared.toggleCareer = this.careerPathToSubject;
    this.getCourseSearchResult();
  }
}
