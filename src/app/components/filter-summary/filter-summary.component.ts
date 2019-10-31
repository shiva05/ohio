import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import * as AdvancedSearchActions from './../../actions/advanced-search.actions';
import { CookieService } from 'ngx-cookie-service';
import { browserRefresh } from '../../app.component';

@Component({
    selector: 'filter-summary',
    templateUrl: './filter-summary.component.html',
    styleUrls: ['./filter-summary.component.css']
})

export class FilterSummaryComponent implements OnInit {
    //refresh start
    public browserRefresh: boolean;
    //refresh end
    @Input() FilterSummary;
    FilterSummaryKeys: any;
    panelExpanded: boolean = false;
    searchLable: any;
    alignmentSearchResults: any;
    courseSearchResults: any;
    searchObj: any;

    filterCareerFieldData: any = [];
    filterCareerPathData: any = [];
    courseSearchKeywords: any = '';
    filterCareerPathCourseData: any = [];
    filterAcadamicSubjectData: any = [];
    filterAcadamicSubjectCourseData: any = [];
    cookieValue: any;

    @Output() onPageSelect = new EventEmitter<any>();

    constructor(private store: Store<AppState>, private rout: Router, private shared: SharedService, private cookieService: CookieService) {
        this.searchLable = localStorage.getItem('searchLable');
    }

    ngOnInit() {
        this.courseSearchResults = false;
        this.alignmentSearchResults = true;
        this.shared.updateAlignmentSearch = false;
        this.shared.updateCourseSearch = false;
        this.browserRefresh = browserRefresh;
        window.addEventListener('beforeunload', (event) => {
            alert("Refreshing will clear all of your search results.");
            event.preventDefault();
            event.returnValue = '';
        });
        if (this.browserRefresh == true) {
            this.rout.navigate(['']);
        };
        if (this.cookieService.get('Test')) {
            this.cookieValue = this.cookieService.get('Test');
            let quickSearchData = JSON.parse(this.cookieValue);
            console.log(quickSearchData);
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
                    selectedKeyword: (quickSearchData && quickSearchData['KeyWords']) ? quickSearchData['KeyWords'] : '',
                    selectedCareers: quickSearchData['CareerFields'],
                    selectedAcadamicSubjects: quickSearchData['AcademicSubjects']
                };
                this.store.dispatch({ type: AdvancedSearchActions.SAVE_AS_SELECTED_FILTERS, payload: this.searchObj });
                this.cookieService.delete('Test');
            }
        }
        this.store.select('advancedSearch').subscribe(data => {
            if (data.alignmentSearchSelectedFilters) {
                let keyWords = '';
                let careerfields: any = [];
                let strands: any = [];
                let outcomes: any = [];
                let CompetencyIds: any = [];
                let subjects: any = [];
                if (data.alignmentSearchSelectedFilters.selectedKeyword) {
                    keyWords = data.alignmentSearchSelectedFilters.selectedKeyword;
                }
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
                        let level1: any = [];
                        let level1Name = element.Level[0].LevelName;
                        if (element.Level[0] && element.Level[0].SelectedItems && element.Level[0].SelectedItems.length > 0) {
                            element.Level[0].SelectedItems.forEach(element => {
                                level1.push(element.LevelValue1);
                            });
                        }

                        let level2: any = [];
                        let level2Name = element.Level[1].LevelName;
                        if (element.Level[1] && element.Level[1].SelectedItems && element.Level[1].SelectedItems.length > 0) {
                            element.Level[1].SelectedItems.forEach(element => {
                                level2.push(element.LevelValue1);
                            });
                        }
                        let level3: any = [];
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
                    Keywords: keyWords,
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

        if (this.searchLable === 'SearchAlignment') {
            this.store.select('advancedSearch').subscribe(data => {
                if (data.alignmentSearchSelectedFilters) {
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
        this.rout.navigate(['/alignmentsearch']);
    }

    goBackToCourseSearch() {
        this.shared.updateCourseSearch = true;
        this.rout.navigate(['/coursesearch']);
    }

    formatSearchCourseData(source) {
        this.courseSearchKeywords = source.selectedKeyword;
        this.filterCareerFieldData = source.selectedCareers;
        this.filterCareerPathData = source.selectedCareerPath;
        this.filterCareerPathCourseData = source.selectedCareerPathCourses;
        this.filterAcadamicSubjectData = source.selectedAcademicSubject;
        this.filterAcadamicSubjectCourseData = source.selectedAcademicSubjectCourses;
    }
}
