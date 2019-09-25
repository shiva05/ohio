import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as AdvancedSearchActions from './../../actions/advanced-search.actions';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'filter-summary',
    templateUrl: './filter-summary.component.html',
    styleUrls: ['./filter-summary.component.css']
})

export class FilterSummaryComponent implements OnInit {

  @Input() FilterSummary;
  FilterSummaryKeys: any;
  FilterSummaryData: any = [];
  panelExpanded: boolean = false;
  searchLable: any;
  alignmentSearchResults: any;
  courseSearchResults: any;
  searchObj: any;


  filterCareerPathData: any = [];
  filterCareerPathCourseData: any = [];
  filterAcadamicSubjectData: any = [];
  filterAcadamicSubjectCourseData: any = [];
  cookieValue: any;

  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private store: Store<AppState>,
              private rout: Router,
              private shared: SharedService,
              private http: HttpClient,
              private cookieService: CookieService) {
    this.searchLable = localStorage.getItem('searchLable');
  //  this.store.dispatch({ type: AdvancedSearchActions.LOAD_META_DATA });
  }

  ngOnInit() {
    this.courseSearchResults = false;
    this.alignmentSearchResults = true;
    this.shared.updateAlignmentSearch = false;
    this.shared.updateCourseSearch = false;
    // console.log(this.cookieValue);
    if (this.cookieService.get('Test')) {
      this.cookieValue = this.cookieService.get('Test');
      let quickSearchData = JSON.parse(this.cookieValue);
      if (quickSearchData) {
        this.FilterSummaryKeys = {
          Keywords: '',
          CareerFieldIds: [],
          StrandIds: [],
          OutcomeIds: [],
          CompetencyIds: [],
          Subjects: [],
          CteToAcademic: true
        };

        if (quickSearchData['AcademicSubjects'].length > 0) {
          quickSearchData['AcademicSubjects'].forEach((subject) => {
            let selectedSubject = {
              SubjectId: 0,
              SubjectName: '',
              Level1Ids: [],
              Level2Ids: [],
              Level3Ids: []
            };
            selectedSubject.SubjectId = subject.SubjectId;
            this.FilterSummaryKeys.Subjects.push(selectedSubject);
            selectedSubject.SubjectName = subject.SubjectName;
          });
        }
        if (quickSearchData['CareerFields'].length > 0) {
          quickSearchData['CareerFields'].forEach((career) => {
            this.FilterSummaryKeys.CareerFieldIds.push(career.CareerFieldName);
          });
        }
        this.searchObj = {
          selectedCareers: quickSearchData['CareerFields'],
          selectedAcadamicSubjects: quickSearchData['AcademicSubjects']
        };
        this.store.dispatch({ type: AdvancedSearchActions.SAVE_AS_SELECTED_FILTERS, payload: this.searchObj });
        this.cookieService.delete('Test');
      }
    }
    this.store.select('advancedSearch').subscribe(data => {
            if (data.alignmentSearchSelectedFilters) {
                let careerfields = [];
                let strands = [];
                let outcomes = [];
                let CompetencyIds = [];
                let subjects = [];
                if (data.alignmentSearchSelectedFilters.selectedCareers) {
                    data.alignmentSearchSelectedFilters.selectedCareers.forEach(element => {
                        careerfields.push(element.CareerFieldName);
                    });
                }
                if (data.alignmentSearchSelectedFilters.selectedStrand) {
                    data.alignmentSearchSelectedFilters.selectedStrands.forEach(element => {
                        strands.push(element.StrandName);
                    });
                }
                if (data.alignmentSearchSelectedFilters.selectedOutcomes) {
                    data.alignmentSearchSelectedFilters.selectedOutcomes.forEach(element => {
                        outcomes.push(element.OutcomeName);
                    });
                }
                if (data.alignmentSearchSelectedFilters.selectedCompetencies) {
                    data.alignmentSearchSelectedFilters.selectedCompetencies.forEach(element => {
                        CompetencyIds.push(element.CompetencyName);
                    });
                }
                if (data.alignmentSearchSelectedFilters.selectedAcadamicSubjects) {
                    data.alignmentSearchSelectedFilters.selectedAcadamicSubjects.forEach(element => {
                        let level1 = [];
                        let level1Name = element.Level[0].LevelName;
                        if (element.Level[0] && element.Level[0].SelectedItems && element.Level[0].SelectedItems.length > 0) {
                            element.Level[0].SelectedItems.forEach(element => {
                                level1.push(element.LevelValue1);
                            });
                        }

                        let level2 = [];
                        let level2Name = element.Level[1].LevelName;
                        if (element.Level[1] && element.Level[1].SelectedItems && element.Level[1].SelectedItems.length > 0) {
                            element.Level[1].SelectedItems.forEach(element => {
                                level2.push(element.LevelValue1);
                            });
                        }
                        let level3 = [];
                        let level3Name = element.Level[2].LevelName;
                        if (element.Level[2] && element.Level[2].SelectedItems && element.Level[2].SelectedItems.length > 0) {
                            element.Level[2].SelectedItems.forEach(element => {
                                level3.push(element.LevelValue1);
                            });
                        }
                        let subject = {
                            SubjectId: element.SubjectId,
                            SubjectName: element.SubjectName,
                            Level1Ids: level1,
                            level1Name,
                            Level2Ids: level2,
                            level2Name,
                            Level3Ids: level3,
                            level3Name
                        };
                        subjects.push(subject);
                    });
                }
                let obj = {
                    Keywords: '',
                    CareerFieldIds: careerfields,
                    StrandIds: strands,
                    OutcomeIds: outcomes,
                    CompetencyIds,
                    Subjects: subjects,
                    CteToAcademic: true
                };
                this.FilterSummaryKeys = obj;

            }
        });


    if (this.searchLable === 'alignmentSearchResults') {
            this.store.select('advancedSearch').subscribe(data => {
                if (data.alignmentSearchSelectedFilters) {
                    this.formatSearchDataToSummary(data.alignmentSearchSelectedFilters);
                    this.alignmentSearchResults = true;
                    this.courseSearchResults = false;

                }
            });


        } else {

            this.store.select('courseSearch').subscribe(data => {
                if (data.courseSearchSelectedFilters.selectedAcademicSubject.length != 0 || data.courseSearchSelectedFilters.selectedAcademicSubjectCourses.length != 0 || data.courseSearchSelectedFilters.selectedCareerPath.length != 0 || data.courseSearchSelectedFilters.selectedCareerPathCourses.length != 0) {
                    this.formatSearchCourseData(data.courseSearchSelectedFilters);
                    this.alignmentSearchResults = false;
                    this.courseSearchResults = true;
                }
            });

        }
    }

    goBackToAlignmentSearch() {
        this.shared.updateAlignmentSearch = true;
        this.rout.navigate(['/AlignmentSearch']);
    }
    goBackToCourseSearch() {
        this.shared.updateCourseSearch = true;
        this.rout.navigate(['/CourseSearch']);
    }

    formatSearchDataToSummary(source) {
    }

    formatSearchCourseData(source) {
        this.filterCareerPathData = source.selectedCareerPath;
        this.filterCareerPathCourseData = source.selectedCareerPathCourses;
        this.filterAcadamicSubjectData = source.selectedAcademicSubject;
        this.filterAcadamicSubjectCourseData = source.selectedAcademicSubjectCourses;
    }

    getFormatedName(arg) {
        let result;
        if (arg && arg.length > 0) {
            result = arg[0].item_text;
            if (arg.length > 1) {
                result = result + '  ' + (arg.length - 1);
            }
            return result;
        }
    }
}
