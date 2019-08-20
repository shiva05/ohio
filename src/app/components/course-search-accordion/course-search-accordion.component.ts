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

  courseSearchReportPayload = {
    Keywords: '',
    CareerPathIds: [],
    CourseIds: [],
    Subjects: [],
    CareerPathToSubject: true
  };

  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private store: Store<AppState>, private httpService: HttpClient, private searchResultService: SearchResultService) { }

  ngOnInit() {
    this.store.select('courseSearch').subscribe(data => {
      console.log(data);
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

        console.log(obj);

        // this.searchResultService.getSearchResultCourseSearch(obj).subscribe(
        //   data => {
        //     this.searchResultData = data;
        //     this.searchResultData.CareerField.forEach(element => {
        //       this.searchResultDataArray.push(element);
        //     });
        //     this.formatSearchResultDataArray();
        //   },
        //   err => {
        //     // Log errors if any
        //     console.log(err);
        //   });
      }
    });
  }

  getCourseSearchReport(obj) {
    this.courseSearchReportPayload.Keywords = '';
    this.courseSearchReportPayload.CareerPathIds = [];
    this.courseSearchReportPayload.CourseIds = [];
    this.courseSearchReportPayload.Subjects = [];
    this.courseSearchReportPayload.CareerPathToSubject = this.careerPathToSubject;

    // this.searchResultDataArray.forEach(careerField => {
    //   if (this.courseSearchReportPayload.Subjects.length <= 0) {
    //     this.courseSearchReportPayload.Subjects.push({ SubjectId: this.academicSubjectIds[careerField.AcademicSubject[0]] });
    //   }

    //   if (careerField.isSelected) {
    //     this.courseSearchReportPayload.CareerFiledIds.push(careerField.CareerFieldId);
    //   }

    //   careerField.Strand.forEach(stand => {
    //     if (stand.isSelected) {
    //       this.courseSearchReportPayload.StrandIds.push(stand.StrandPk);
    //     }

    //     stand.Outcome.forEach(outcome => {
    //       if (outcome.isSelected) {
    //         this.courseSearchReportPayload.OutcomeIds.push(outcome.OutcomePk);
    //       }

    //       outcome.Competency.forEach(competency => {
    //         if (competency.isSelected) {
    //           this.courseSearchReportPayload.CompetencyIds.push(competency.CompetencyPk);
    //         }
    //       });
    //     });
    //   });
    // });

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
  }

}
