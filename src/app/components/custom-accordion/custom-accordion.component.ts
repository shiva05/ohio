import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as util from 'util';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as SearchResultsActions from './../../actions/search-result.action';
import { SearchResultData } from './../../models/searchResult.model';
import { Observable } from 'rxjs/Observable';
import { SearchResultService } from '../../services/search-result.service';
import * as AdvancedSearchActions from './../../actions/advanced-search.actions';

@Component({
  selector: 'custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.css']
})

export class CustomAccordionComponent implements OnInit {
  data: any;
  formattedData: any = [];
  accordionData: any;
  cteToAcademic = true;
  noResultFound = false;
  strands: any = [];
  competency: any = [];
  outcomes: any = [];
  searchResultData: any = {};
  searchResultDataArray: any = [];
  formattedSearchResultData: any = [];
  finalSearchResults: any[];
  alignmentSearchSelectedFilters: {};
  totalSearchResults = 0;
  reportPayload = {
    Keywords: '',
    CareerFiledIds: [],
    StrandIds: [],
    OutcomeIds: [],
    CompetencyIds: [],
    Subjects: [],
    CteToAcademic: true
  };
  academicSubjectIds = {
    Math: 1,
    ELA: 2,
    Science: 3,
    Social: 4
  };
  academicSubjectColorPallet :any = [
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
    ]
  

  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private store: Store<AppState>, private httpService: HttpClient, private searchResultService: SearchResultService) { }

  ngOnInit() {
    this.store.select('advancedSearch').subscribe(data => {
      if (data.alignmentSearchSelectedFilters) {
        this.alignmentSearchSelectedFilters = data.alignmentSearchSelectedFilters;
        let careerfeilds = [];
        data.alignmentSearchSelectedFilters.selectedCareers.forEach(element => {
          careerfeilds.push(element.CareerFieldId);
        });

        let strands = [];
        data.alignmentSearchSelectedFilters.selectedStrands.forEach(element => {
          strands.push(element.StrandPk);
        });

        let outcomes = [];
        data.alignmentSearchSelectedFilters.selectedOutcomes.forEach(element => {
          outcomes.push(element.OutcomePk);
        });

        let CompetencyIds = [];
        data.alignmentSearchSelectedFilters.selectedCompetencies.forEach(element => {
          CompetencyIds.push(element.CompetencyPk);
        });

        let subjects = [];
        data.alignmentSearchSelectedFilters.selectedAcadamicSubjects.forEach(element => {
          let level1 = [];
          if (element.Level[0] && element.Level[0].SelectedItems && element.Level[0].SelectedItems.length > 0) {
            element.Level[0].SelectedItems.forEach(element => {
              level1.push(element.LevelValue1);
            });
          }

          let level2 = [];
          if (element.Level[1] && element.Level[1].SelectedItems && element.Level[1].SelectedItems.length > 0) {
            element.Level[1].SelectedItems.forEach(element => {
              level2.push(element.LevelValue1);
            });
          }

          let level3 = [];
          if (element.Level[3] && element.Level[2].SelectedItems && element.Level[2].SelectedItems.length > 0) {
            element.Level[3].SelectedItems.forEach(element => {
              level3.push(element.LevelValue1);
            });
          }

          let subject = {
            SubjectId: element.SubjectId,
            Level1Ids: level1,
            Level2Ids: level2,
            Level3Ids: level3
          };
          subjects.push(subject);
        });

        let obj = {
          Keywords: '',
          CareerFiledIds: careerfeilds,
          StrandIds: strands,
          OutcomeIds: outcomes,
          CompetencyIds,
          Subjects: subjects,
          CteToAcademic: this.cteToAcademic
        };
        this.searchResultService.getSearchResultData(obj).subscribe(
          data => {
            this.searchResultData = data;
            if (this.searchResultData.CareerField) {
              this.searchResultData.CareerField.forEach(element => {
                this.searchResultDataArray.push(element);
                this.noResultFound = false;
              });
              this.formatSearchResultDataArray();
            } else {
              this.noResultFound = true;
            }
          },
          err => {
            console.log(err);
          });
      }
    });
  }

  formatSearchResultDataArray() {
    //add color pallets here AcademicSubject
    this.searchResultDataArray.forEach(element => {
      if (element.Alignment ) {
        this.totalSearchResults = this.totalSearchResults + element.Alignment;
      }
      this.academicSubjectColorPallet.forEach((item) => {
        if (element.AcademicSubject === item.Subject) {
          element['Color'] = item.Color;
        }
      });
    });    
  //  console.log(this.searchResultDataArray);
  }

  updatePayload(obj, type) {
    this.reportPayload.Subjects = [];
    if (type == 'competency') {
      if (obj.CompetencyPk !== 0) {
        this.reportPayload.CompetencyIds.push(obj.CompetencyPk);
        this.reportPayload.Subjects.push({ SubjectId: this.academicSubjectIds[obj.AcademicSubject[0]] });
      }
    }
    if (type == 'careerField') {
      this.reportPayload.CareerFiledIds.push(obj.CareerFieldId);
      this.reportPayload.Subjects.push({ SubjectId: this.academicSubjectIds[obj.AcademicSubject[0]] });
    }
    if (type == 'strand') {
      this.reportPayload.StrandIds.push(obj.StrandPk);
      this.reportPayload.Subjects.push({ SubjectId: this.academicSubjectIds[obj.AcademicSubject[0]] });
    }
    if (type == 'outcome') {
      this.reportPayload.OutcomeIds.push(obj.OutcomePk);
      this.reportPayload.Subjects.push({ SubjectId: this.academicSubjectIds[obj.AcademicSubject[0]] });
    }
    console.log(obj + type);
  }

  // Click event on Career Field
  careerFieldCheckBox(parentObj) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < parentObj.Strand.length; i++) {
      parentObj.Strand[i].isSelected = parentObj.isSelected;
      if (parentObj.Strand[i].Outcome) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < parentObj.Strand[i].Outcome.length; j++) {
          parentObj.Strand[i].Outcome[j].isSelected = parentObj.isSelected;

          if (parentObj.Strand[i].Outcome[j].Competency) {
            // tslint:disable-next-line:prefer-for-of
            for (let k = 0; k < parentObj.Strand[i].Outcome[j].Competency.length; k++) {
              parentObj.Strand[i].Outcome[j].Competency[k].isSelected = parentObj.isSelected;
            }
          }
        }
      }
    }
  }

  // Click event on Strand Checkbox
  strandCheckBox(parent, parentObj) {
    // tslint:disable-next-line:only-arrow-functions
    parent.isSelected = parent.Strand.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    if (parentObj.Outcome) {
      if (parentObj.isSelected) {
        parentObj.Outcome.forEach(item => {
          item.isSelected = true;
          if (item.Competency) {
            item.Competency.forEach(data => {
              data.isSelected = true;
            });
          }
        });
      } else {
        parentObj.Outcome.forEach(item => {
          item.isSelected = false;
          if (item.Competency) {
            item.Competency.forEach(data => {
              data.isSelected = false;
            });
          }
        });
      }
    }
  }

  // Click event on Outcome Checkbox
  outcomeCheckBox(career, strands, outcome) {

    // tslint:disable-next-line:only-arrow-functions
    strands.isSelected = strands.Outcome.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    career.isSelected = career.Strand.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    if (outcome.Competency) {
      if (outcome.isSelected) {
        outcome.Competency.forEach(item => {
          item.isSelected = true;
        });
      } else {
        outcome.Competency.forEach(item => {
          item.isSelected = false;
        });
      }
    }
  }

  // Click event on Outcome Checkbox
  competencyCheckBox(career, strand, outcome) {
    // tslint:disable-next-line:only-arrow-functions
    outcome.isSelected = outcome.Competency.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    strand.isSelected = strand.Outcome.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    career.isSelected = career.Strand.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });
  }

  // Expand/Collapse event on Career Field
  expandCollapseCareerField(obj) {
    obj.isCareerFieldClosed = !obj.isCareerFieldClosed;
  }

  // Expand/Collapse event on Strand
  expandCollapseStrand(obj) {
    obj.isStrandClosed = !obj.isStrandClosed;
  }

  // Expand/Collapse event on Outcome
  expandCollapseOutcome(obj) {
    obj.isOutcomeClosed = !obj.isOutcomeClosed;
  }

  getCheckedValues(item) {
    // console.log(item);
  }

  getSelect(obj) {
    this.reportPayload.Keywords = '';
    this.reportPayload.CareerFiledIds = [];
    this.reportPayload.StrandIds = [];
    this.reportPayload.OutcomeIds = [];
    this.reportPayload.CompetencyIds = [];
    this.reportPayload.Subjects = [];


    this.searchResultDataArray.forEach(careerField => {
      if (this.reportPayload.Subjects.length <= 0) {
        this.reportPayload.Subjects.push({ SubjectId: this.academicSubjectIds[careerField.AcademicSubject[0]] });
      }

      if (careerField.isSelected) {
        this.reportPayload.CareerFiledIds.push(careerField.CareerFieldId);
      }

      careerField.Strand.forEach(stand => {
        if (stand.isSelected) {
          this.reportPayload.StrandIds.push(stand.StrandPk);
        }

        stand.Outcome.forEach(outcome => {
          if (outcome.isSelected) {
            this.reportPayload.OutcomeIds.push(outcome.OutcomePk);
          }

          outcome.Competency.forEach(competency => {
            if (competency.isSelected) {
              this.reportPayload.CompetencyIds.push(competency.CompetencyPk);
            }
          });
        });
      });
    });

    console.log(this.reportPayload);
    this.goToPage(obj);
    this.alignmentSearchSelectedFilters['selectedAsSearchResults'] = this.reportPayload;
    this.store.dispatch({ type: AdvancedSearchActions.SAVE_AS_SELECTED_FILTERS, payload: this.alignmentSearchSelectedFilters });
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }

  goBackToSearch() {
    let lable = localStorage.getItem('searchLable');
    this.onPageSelect.emit(lable);
  }

  onToggleClick(value) {
    this.cteToAcademic = !this.cteToAcademic;
    this.reportPayload.CteToAcademic = this.cteToAcademic;
  }

  getAccordionData() {
    let data = [];
    // var ParentChildchecklist = {};
    // data.push(ParentChildchecklist);

    // tslint:disable-next-line:prefer-for-of
    for (let h = 0; h < this.accordionData.length; h++) {
      data.push({
        id: h,
        value: `${this.accordionData[h].CareerField}`,
        academicSubject: `Math`,
        parent: null,
        strands: []
      });

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.accordionData[h].Strands.length - 1; i++) {
        data[h].strands.push({
          id: i,
          value: `${this.accordionData[h].Strands[i].StrandTitle}`,
          academicSubject: `Math`,
          parent: data[h].name,
          outcomes: []
        });


        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.accordionData[h].Strands[i].Outcomes.length; j++) {
          data[h].strands[i].outcomes.push({
            id: j,
            value: `${this.accordionData[h].Strands[i].Outcomes[j].OutcomeTitle}`,
            academicSubject: `Math`,
            parent: data[h].strands[i].name,
            competency: []
          });


          // tslint:disable-next-line:prefer-for-of
          for (let k = 0; k < this.accordionData[h].Strands[i].Outcomes[j].Competencies.length; k++) {
            data[h].strands[i].outcomes[j].competency.push({
              value: `${this.accordionData[h].Strands[i].Outcomes[j].Competencies[k].CompetencyTitle}`,
              academicSubject: `Math`,
              parent: data[h].strands[i].outcomes[j].name,
              greatGrandChildList: []
            });
          }

        }


      }

    }
    console.log(data);

    return data;
  }
}
