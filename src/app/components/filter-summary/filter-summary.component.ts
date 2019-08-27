import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';

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
  searchAlignment: any;
  searchCourse: any;

  filterCareerPathData: any = [];
  filterCareerPathCourseData: any = [];
  filterAcadamicSubjectData: any = [];
  filterAcadamicSubjectCourseData: any = [];

  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private store: Store<AppState>) {
    this.searchLable = localStorage.getItem('searchLable');
  }

  ngOnInit() {
    this.store.select('advancedSearch').subscribe(data => {
      if (data.alignmentSearchSelectedFilters) {
        let careerfields = [];
        data.alignmentSearchSelectedFilters.selectedCareers.forEach(element => {
          careerfields.push(element.CareerFieldName);
        });

        let strands = [];
        data.alignmentSearchSelectedFilters.selectedStrands.forEach(element => {
          strands.push(element.StrandName);
        });

        let outcomes = [];
        data.alignmentSearchSelectedFilters.selectedOutcomes.forEach(element => {
          outcomes.push(element.OutcomeName);
        });

        let CompetencyIds = [];
        data.alignmentSearchSelectedFilters.selectedCompetencies.forEach(element => {
          CompetencyIds.push(element.CompetencyName);
        });


        let subjects = [];
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

    if (this.searchLable === 'SearchAlignment') {
      this.store.select('advancedSearch').subscribe(data => {
        if (data.alignmentSearchSelectedFilters) {
          this.formatSearchDataToSummary(data.alignmentSearchSelectedFilters);
        }
      });

      this.searchAlignment = true;
      this.searchCourse = false;
    } else {

      this.store.select('courseSearch').subscribe(data => {
        if (data.courseSearchSelectedFilters) {
          this.formatSearchCourseData(data.courseSearchSelectedFilters);
        }
      });
      this.searchAlignment = false;
      this.searchCourse = true;
    }
  }

  goBackToSearch() {
    this.onPageSelect.emit('Search');
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
