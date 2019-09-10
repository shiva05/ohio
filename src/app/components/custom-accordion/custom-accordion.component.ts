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
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.css']
})

export class CustomAccordionComponent implements OnInit {
  data: any;
  subjectToCareerData: any = [];
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
  Level1Ids: any = [];
  Level2Ids: any = [];
  Level3Ids: any = [];
  reportPayload = {
    Keywords: '',
    CareerFiledIds: [],
    StrandIds: [],
    OutcomeIds: [],
    CompetencyIds: [],
    Subjects: [],
    CteToAcademic: true
  };
  dataReceived = false;
  academicSubjectIds = {
    Math: 1,
    ELA: 2,
    Science: 3,
    Social: 4
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

  constructor(private store: Store<AppState>, private httpService: HttpClient, private searchResultService: SearchResultService, private rout: Router) {
    this.cteToAcademic = true;
  }

  ngOnInit() {
    this.getAlignmentSearchResult();
  }

  getAlignmentSearchResult() {

    this.store.select('advancedSearch').subscribe(data => {
      if (this.dataReceived === false){
      if (data.alignmentSearchSelectedFilters) {
        this.dataReceived = true;
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
            if (this.cteToAcademic) {
              if (this.searchResultData.CareerField) {
                this.searchResultData.CareerField.forEach(element => {
                  this.searchResultDataArray.push(element);
                  this.noResultFound = false;
                });
                this.formatSearchResultDataArray();
              } else {
                this.noResultFound = true;
              }
            } else {
              if (this.searchResultData.Subject.length > 0) {
                this.subjectToCareerData = this.searchResultData.Subject;
                this.noResultFound = false;
                this.formatAlignmentSearchData();
              } else {
                this.noResultFound = true;
              }
            }
            return;
          },
          err => {
          });
        // console.log(data);
        return;
      }
    }
    });
  }

  formatSearchResultDataArray() {
    //add color pallets here AcademicSubject
    this.searchResultDataArray.forEach(element => {
      if (element.Alignment) {
        this.totalSearchResults = this.totalSearchResults + element.Alignment;
      }
      this.academicSubjectColorPallet.forEach((item) => {
        if (element.AcademicSubjectName === item.Subject) {
          element['Color'] = item.Color;
        }
      });
    });
  }

  formatAlignmentSearchData() {
    //add color pallets here AcademicSubject
    this.totalSearchResults = 0;
    this.subjectToCareerData.forEach(element => {
      if (element.Alignment) {
        this.totalSearchResults = this.totalSearchResults + element.Alignment;
      }
      this.academicSubjectColorPallet.forEach((item) => {
        if (element.SubjectName === item.Subject) {
          element['Color'] = item.Color;
        }
      });
    });
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

  // Click event on Subject
  subjectCheckBox(parentObj) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < parentObj.Level.length; i++) {
      parentObj.Level[i].isSelected = parentObj.isSelected;
      if (parentObj.Level[i].ChildLevel) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < parentObj.Level[i].ChildLevel.length; j++) {
          parentObj.Level[i].ChildLevel[j].isSelected = parentObj.isSelected;

          if (parentObj.Level[i].ChildLevel[j].ChildLevel) {
            // tslint:disable-next-line:prefer-for-of
            for (let k = 0; k < parentObj.Level[i].ChildLevel[j].ChildLevel.length; k++) {
              parentObj.Level[i].ChildLevel[j].ChildLevel[k].isSelected = parentObj.isSelected;
            }
          }
        }
      }
    }
  }

  // Click event on Level Checkbox
  levelCheckBox(parent, parentObj) {
    // tslint:disable-next-line:only-arrow-functions
    parent.isSelected = parent.Level.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    if (parentObj.ChildLevel) {
      if (parentObj.isSelected) {
        parentObj.ChildLevel.forEach(item => {
          item.isSelected = true;
          if (item.ChildLevel) {
            item.ChildLevel.forEach(data => {
              data.isSelected = true;
            });
          }
        });
      } else {
        parentObj.ChildLevel.forEach(item => {
          item.isSelected = false;
          if (item.ChildLevel) {
            item.ChildLevel.forEach(data => {
              data.isSelected = false;
            });
          }
        });
      }
    }
  }

  // Click event on Child Level 1 Checkbox
  childLevel1CheckBox(career, strands, outcome) {
    // tslint:disable-next-line:only-arrow-functions
    strands.isSelected = strands.ChildLevel.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    career.isSelected = career.Level.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    if (outcome.ChildLevel) {
      if (outcome.isSelected) {
        outcome.ChildLevel.forEach(item => {
          item.isSelected = true;
        });
      } else {
        outcome.ChildLevel.forEach(item => {
          item.isSelected = false;
        });
      }
    }
  }

  // Click event on Child Level 2 Checkbox
  childLevel2CheckBox(career, strand, outcome) {
    // tslint:disable-next-line:only-arrow-functions
    outcome.isSelected = outcome.ChildLevel.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    strand.isSelected = strand.ChildLevel.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    career.isSelected = career.Level.every(function (itemChild: any) {
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

  // Expand/Collapse event on Subject
  expandCollapseSubjectField(obj) {
    obj.isSubjectFieldClosed = !obj.isSubjectFieldClosed;
  }

  // Expand/Collapse event on Strand
  expandCollapseASStrand(obj) {
    obj.isASStrandClosed = !obj.isASStrandClosed;
  }

  // Expand/Collapse event on Outcome
  expandCollapseASOutcome(obj) {
    obj.isOutcomeClosed = !obj.isOutcomeClosed;
  }

  getSelect() {
    this.reportPayload.Keywords = '';
    this.reportPayload.CareerFiledIds = [];
    this.reportPayload.StrandIds = [];
    this.reportPayload.OutcomeIds = [];
    this.reportPayload.CompetencyIds = [];
    this.reportPayload.Subjects = [];
    this.Level1Ids = [];
    this.Level2Ids = [];
    this.Level3Ids = [];

    if (this.cteToAcademic) {
      this.searchResultDataArray.forEach(careerField => {
        this.reportPayload.Subjects.push({ SubjectId: careerField.AcademicSubjectId });

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
    } else {
      this.subjectToCareerData.forEach(careerField => {
        // Career Field ID is missing in the JSON result so for now hardcoded
        this.reportPayload.CareerFiledIds = [1];

        this.Level1Ids = [];
        careerField.Level.forEach(level => {
          if (level.isSelected) {
            this.Level1Ids.push(level.LevelValue1);
          }

          this.Level2Ids = [];
          level.ChildLevel.forEach(childLevel1 => {
            if (childLevel1.isSelected) {
              this.Level2Ids.push(childLevel1.LevelValue2);
            }

            this.Level3Ids = [];
            childLevel1.ChildLevel.forEach(childLevel2 => {
              if (childLevel2.isSelected) {
                this.Level3Ids.push(childLevel2.LevelValue3);
              }
            });
          });
        });

        this.reportPayload.Subjects.push({
          SubjectId: careerField.SubjectId,
          Level1Ids: this.Level1Ids,
          Level2Ids: this.Level2Ids,
          Level3Ids: this.Level3Ids
        });
      });
    }

    //this.goToPage(obj);
    this.rout.navigate(['/AlignmentSearchReport']);
    this.alignmentSearchSelectedFilters['selectedAsSearchResults'] = this.reportPayload;
    this.store.dispatch({ type: AdvancedSearchActions.SAVE_AS_SELECTED_FILTERS, payload: this.alignmentSearchSelectedFilters });
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }

  goBackToSearch() {
    //let lable = localStorage.getItem('searchLable');
    //this.onPageSelect.emit('SearchAlignment');
    this.rout.navigate(['/AlignmentSearch']);
  }

  onToggleClick(value) {
    this.cteToAcademic = !this.cteToAcademic;
    this.reportPayload.CteToAcademic = this.cteToAcademic;
    this.getAlignmentSearchResult();
  }
}
