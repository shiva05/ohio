import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SearchResultService } from '../../services/search-result.service';
import * as AdvancedSearchActions from './../../actions/advanced-search.actions';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { _ } from 'underscore';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-alignment-search-accordion',
  templateUrl: './alignment-search-accordion.component.html',
  styleUrls: ['./alignment-search-accordion.component.css']
})

export class AlignmentSearchAccordionComponent implements OnInit {
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
  isSelectedValidation: boolean = false;
  isASVisible: boolean = false;
  isCSVisible: boolean = false;
  Level1Ids: any = [];
  Level2Ids: any = [];
  Level3Ids: any = [];
  conformationPopup: boolean;
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
  academicSubjectColorPallet: any = [
    {
      SubjectId: 1,
      Subject: 'Math',
      Color: '#000000'
    },
    {
      SubjectId: 2,
      Subject: 'English literature',
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

  quickSearchFilterData: any = {
    CareerFiledIds: [],
    CompetencyIds: [],
    CteToAcademic: true,
    Keywords: '',
    OutcomeIds: [],
    StrandIds: [],
    Subjects: [],
  };

  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private store: Store<AppState>, private searchResultService: SearchResultService, private rout: Router, private _shared: SharedService) {
  }

  ngOnInit() {
    this.getAlignmentSearchResult();
  }

  getAlignmentSearchResult() {
    this.store.select('advancedSearch').pipe(take(1)).subscribe(data => {
      if (data.alignmentSearchSelectedFilters && data.alignmentSearchSelectedFilters.selectedCareers.length > 0 && data.alignmentSearchSelectedFilters.selectedAcadamicSubjects.length > 0) {

        this.alignmentSearchSelectedFilters = data.alignmentSearchSelectedFilters;
        let careerfeilds = [];
        data.alignmentSearchSelectedFilters.selectedCareers.forEach(element => {
          careerfeilds.push(element.CareerFieldId);
        });

        let strands = [];
        if (data.alignmentSearchSelectedFilters && data.alignmentSearchSelectedFilters.selectedStrands) {
          data.alignmentSearchSelectedFilters.selectedStrands.forEach(element => {
            strands.push(element.StrandPk);
          });
        }
        let outcomes = [];
        if (data.alignmentSearchSelectedFilters && data.alignmentSearchSelectedFilters.selectedOutcomes) {
          data.alignmentSearchSelectedFilters.selectedOutcomes.forEach(element => {
            outcomes.push(element.OutcomePk);
          });
        }

        let CompetencyIds = [];
        if (data.alignmentSearchSelectedFilters && data.alignmentSearchSelectedFilters.selectedCompetencies) {
          data.alignmentSearchSelectedFilters.selectedCompetencies.forEach(element => {
            CompetencyIds.push(element.CompetencyPk);
          });
        }
        let subjects = [];
        data.alignmentSearchSelectedFilters.selectedAcadamicSubjects.forEach(element => {
          let level1 = [];
          let level2 = [];
          let level3 = [];
          if (element.Level) {
            if (element.Level[0] && element.Level[0].SelectedItems && element.Level[0].SelectedItems.length > 0) {
              element.Level[0].SelectedItems.forEach(element => {
                level1.push(element.LevelValue1);
              });
            }


            if (element.Level[1] && element.Level[1].SelectedItems && element.Level[1].SelectedItems.length > 0) {
              element.Level[1].SelectedItems.forEach(element => {
                level2.push(element.LevelValue1);
              });
            }


            if (element.Level[3] && element.Level[2].SelectedItems && element.Level[2].SelectedItems.length > 0) {
              element.Level[3].SelectedItems.forEach(element => {
                level3.push(element.LevelValue1);
              });
            }

          }
          let subject = {
            SubjectId: element.SubjectId,
            Level1Ids: level1,
            Level2Ids: level2,
            Level3Ids: level3
          };
          subjects.push(subject);
        });
        // this.cteToAcademic = this._shared.toggleAlignment;
        let obj = {
          Keywords: data.alignmentSearchSelectedFilters && data.alignmentSearchSelectedFilters.selectedKeyword ? data.alignmentSearchSelectedFilters.selectedKeyword : '',
          CareerFiledIds: careerfeilds,
          StrandIds: strands,
          OutcomeIds: outcomes,
          CompetencyIds,
          Subjects: subjects,
          CteToAcademic: this.cteToAcademic
        };
        this.searchResultDataArray = [];
        this.searchResultService.getSearchResultData(obj).subscribe(
          data => {
            this.searchResultData = data;
            if (this.cteToAcademic) {
              if (this.searchResultData.CareerField) {
                this.searchResultData.CareerField.forEach(element => {
                  element['IsChildPartiallySelected'] = false;
                  element['isSelected'] = false;
                  if (element['Strand'].length > 0) {
                    element['Strand'].forEach((strand) => {
                      strand['IsChildPartiallySelected'] = false;
                      strand['isSelected'] = false;
                      if (strand['Outcome'].length > 0) {
                        strand['Outcome'].forEach((outcome) => {
                          outcome['IsChildPartiallySelected'] = false;
                          outcome['isSelected'] = false;

                          if (outcome['Competency'].length > 0) {
                            outcome['Competency'].forEach((competency) => {
                              competency['isSelected'] = false;
                            });
                          }

                        });
                      }
                    });
                  }
                  this.searchResultDataArray.push(element);
                  this.noResultFound = false;
                });

                this.searchResultData.CareerField.forEach(career => {
                  if (this.searchResultData.CareerField.length === 1) {
                    career['isCareerFieldClosed'] = true;
                    if (career.Strand.length === 1) {
                      career.Strand[0]['isStrandClosed'] = true;
                      if (career.Strand[0].Outcome.length === 1) {
                        career.Strand[0].Outcome[0]['isOutcomeClosed'] = true;
                      }
                    }
                  }
                });
                this.formatSearchResultDataArray();
              } else {
                this.noResultFound = true;
              }
            } else {
              if (this.searchResultData.Subject.length > 0) {
                this.subjectToCareerData = this.searchResultData.Subject;
                this.subjectToCareerData[0]['IsChildPartiallySelected'] = false;
                this.subjectToCareerData[0]['isSelected'] = false;
                if (this.subjectToCareerData[0].Level.length > 0) {
                  this.subjectToCareerData[0].Level.forEach(element => {
                    element['IsChildPartiallySelected'] = false;
                    element['isSelected'] = false;
                    if (element['ChildLevel'].length > 0) {
                      element['ChildLevel'].forEach(child1 => {
                        child1['IsChildPartiallySelected'] = false;
                        child1['isSelected'] = false;
                        if (child1['ChildLevel'].length > 0) {
                          child1['ChildLevel'].forEach(child2 => {
                            child2['isSelected'] = false;
                          });
                        }
                      })
                    }
                  });
                }
                this.noResultFound = false;
                this.formatAlignmentSearchData();
                if (this.searchResultData.Subject.length === 1) {
                  var subject = this.searchResultData.Subject[0];
                  subject['isSubjectFieldClosed'] = true;
                  if (subject.Level.length === 1) {
                    subject.Level[0]['isASStrandClosed'] = true;
                    if (subject.Level[0].ChildLevel.length === 1) {
                      subject.Level[0].ChildLevel[0]['isOutcomeClosed'] = true;
                    }
                  }
                }

              } else {
                this.noResultFound = true;
              }
            }
            return;
          },
          err => {
          });
        return;
      }
    });
  }

  formatSearchResultDataArray() {
    // add color pallets here AcademicSubject
    this.totalSearchResults = 0;
    this.searchResultDataArray.forEach(element => {
      if (element.Alignment) {
        this.totalSearchResults = this.totalSearchResults + element.Alignment;
      }
      this.academicSubjectColorPallet.forEach((item) => {
        if (element.AcademicSubjectId === item.SubjectId) {
          element['Color'] = item.Color;
        }
      });
    });
  }

  formatAlignmentSearchData() {
    // add color pallets here AcademicSubject
    this.totalSearchResults = 0;
    this.subjectToCareerData.forEach(element => {
      if (element.Alignment) {
        this.totalSearchResults = this.totalSearchResults + element.Alignment;
      }
      this.academicSubjectColorPallet.forEach((item) => {
        if (element.SubjectId === item.SubjectId) {
          element['Color'] = item.Color;
        }
      });
    });
  }

  // Click event on Career Field
  careerFieldCheckBox(parentObj) {
    parentObj.IsChildPartiallySelected = false;
    for (let i = 0; i < parentObj.Strand.length; i++) {
      parentObj.Strand[i].isSelected = parentObj.isSelected;
      parentObj.Strand[i].IsChildPartiallySelected = false;
      if (parentObj.Strand[i].Outcome) {
        for (let j = 0; j < parentObj.Strand[i].Outcome.length; j++) {
          parentObj.Strand[i].Outcome[j].isSelected = parentObj.isSelected;
          parentObj.Strand[i].Outcome[j].IsChildPartiallySelected = false;
          if (parentObj.Strand[i].Outcome[j].Competency) {
            for (let k = 0; k < parentObj.Strand[i].Outcome[j].Competency.length; k++) {
              parentObj.Strand[i].Outcome[j].Competency[k].isSelected = parentObj.isSelected;
            }
          }
        }
      }
    }
  }

  // Click event on Strand Checkbox
  strandCheckBox(CareerFieldData, StrandData) {
    StrandData.IsChildPartiallySelected = false;
    CareerFieldData.isSelected = CareerFieldData.Strand.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    if (StrandData.Outcome) {
      if (StrandData.isSelected) {
        StrandData.Outcome.forEach(item => {
          item.isSelected = true;
          item.IsChildPartiallySelected = false;
          if (item.Competency) {
            item.Competency.forEach(data => {
              data.isSelected = true;
            });
          }
        });
      } else {
        StrandData.Outcome.forEach(item => {
          item.isSelected = false;
          if (item.Competency) {
            item.Competency.forEach(data => {
              data.isSelected = false;
            });
          }
        });
      }
    }
    this.trackCareersStatus(CareerFieldData);
  }

  // Click event on Outcome Checkbox
  outcomeCheckBox(CareerFieldData, StrandData, OutcomeData) {
    // tslint:disable-next-line:only-arrow-functions
    StrandData.isSelected = StrandData.Outcome.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    CareerFieldData.isSelected = CareerFieldData.Strand.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    if (OutcomeData.Competency) {
      if (OutcomeData.isSelected) {
        OutcomeData.Competency.forEach(item => {
          item.isSelected = true;
        });
      } else {
        OutcomeData.Competency.forEach(item => {
          item.isSelected = false;
        });
      }
    }
    this.trackOutcomesStatus(CareerFieldData, StrandData, OutcomeData);
    this.trackStrandsStatus(CareerFieldData, StrandData);
    this.trackCareersStatus(CareerFieldData);
  }

  // Click event on Competency Checkbox
  competencyCheckBox(careerField, strand, outcome) {
    this.trackOutcomesStatus(careerField, strand, outcome);
  }

  trackOutcomesStatus(CareerFieldData, StrandData, OutcomeData) {
    let competencyStatus = [];
    for (let comp = 0; comp < OutcomeData.Competency.length; comp++) {// to update Compatency and outcomes status
      OutcomeData.Competency.forEach((element) => {
        competencyStatus.push(element.isSelected);
      });
      competencyStatus = _.uniq(competencyStatus);
      if (competencyStatus.length > 1) {
        OutcomeData.IsChildPartiallySelected = true;
        OutcomeData.isSelected = false;
        CareerFieldData.IsChildPartiallySelected = true;
        StrandData.IsChildPartiallySelected = true;
        //   return;
      } else if (competencyStatus.length === 1) {
        if (competencyStatus[0] === true) {
          OutcomeData.IsChildPartiallySelected = false;
          OutcomeData.isSelected = true;
          CareerFieldData.IsChildPartiallySelected = true;
          StrandData.IsChildPartiallySelected = true;
        } else if (competencyStatus[0] === false) {
          OutcomeData.IsChildPartiallySelected = false;
          OutcomeData.isSelected = false;
          let outComesStatus = [];
          StrandData.Outcome.forEach((outComes) => {
            outComesStatus.push(outComes.IsChildPartiallySelected);
          });
          outComesStatus = _.uniq(outComesStatus);
          if (outComesStatus.length > 1) {
            StrandData.IsChildPartiallySelected = true;
          } else if (outComesStatus.length === 1) {
            if (outComesStatus[0] === true) {
              StrandData.IsChildPartiallySelected = false;
            } else if (outComesStatus[0] === false) {
              StrandData.IsChildPartiallySelected = false;
            }
          }
          CareerFieldData.IsChildPartiallySelected = false;
        }
      }
    }
    this.trackStrandsStatus(CareerFieldData, StrandData);
    this.trackCareersStatus(CareerFieldData);
  }

  trackStrandsStatus(CareerFieldData, StrandData) {
    StrandData.IsChildPartiallySelected = false;
    let strandStatus = []; // to update strands status
    for (let strand = 0; strand < StrandData.Outcome.length; strand++) {
      StrandData.Outcome.forEach((element) => {
        strandStatus.push(element.IsChildPartiallySelected);
      });
      strandStatus = _.uniq(strandStatus);
      if (strandStatus.length > 1) {
        StrandData.isSelected = false;
        StrandData.IsChildPartiallySelected = true;
        CareerFieldData.IsChildPartiallySelected = true;
      } else if (strandStatus.length === 1) {
        if (strandStatus[0] === true) {
          StrandData.isSelected = false;
          StrandData.IsChildPartiallySelected = true;
        } else if (strandStatus[0] === false) {
          let outComesSelectedStatus = [];
          StrandData.Outcome.forEach((element) => {
            outComesSelectedStatus.push(element.isSelected);
          });
          outComesSelectedStatus = _.uniq(outComesSelectedStatus);
          if (outComesSelectedStatus.length > 1) {
            StrandData.isSelected = false;
            StrandData.IsChildPartiallySelected = true;
            CareerFieldData.IsChildPartiallySelected = true;
            CareerFieldData.isSelected = false;
          } else if (outComesSelectedStatus.length === 1) {
            if (outComesSelectedStatus[0] === true) {
              StrandData.isSelected = true;
              StrandData.IsChildPartiallySelected = false;
              CareerFieldData.IsChildPartiallySelected = true;
              CareerFieldData.isSelected = false;
            }
          }
        }
      }
    }
  }

  trackCareersStatus(CareerFieldData) {
    let carrerStatus = [];
    for (let career = 0; career < CareerFieldData.Strand.length; career++) {
      CareerFieldData.Strand.forEach((element) => {
        carrerStatus.push(element.IsChildPartiallySelected);
      });
      carrerStatus = _.uniq(carrerStatus);
      if (carrerStatus.length > 1) {
        CareerFieldData.isSelected = false;
        CareerFieldData.IsChildPartiallySelected = true;
      } else if (carrerStatus.length === 1) {
        if (carrerStatus[0] === true) {
          CareerFieldData.isSelected = false;
          CareerFieldData.IsChildPartiallySelected = true;
        } else if (carrerStatus[0] === false) {
          let strandsSelectedStatus = [];
          CareerFieldData.Strand.forEach((element) => {
            strandsSelectedStatus.push(element.isSelected);
          });
          strandsSelectedStatus = _.uniq(strandsSelectedStatus);
          if (strandsSelectedStatus.length > 1) {
            CareerFieldData.isSelected = false;
            CareerFieldData.IsChildPartiallySelected = true;
          } else if (strandsSelectedStatus.length === 1) {
            if (strandsSelectedStatus[0] === true) {
              CareerFieldData.isSelected = true;
              CareerFieldData.IsChildPartiallySelected = false;
            } else if (strandsSelectedStatus[0] === false) {
              CareerFieldData.isSelected = false;
              CareerFieldData.IsChildPartiallySelected = false;
            }
          }
        }
      }
    }
  }

  // Click event on Subject
  subjectCheckBox(parentObj) {
    parentObj.IsChildPartiallySelected = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < parentObj.Level.length; i++) {
      parentObj.Level[i].isSelected = parentObj.isSelected;
      parentObj.Level[i].IsChildPartiallySelected = false;
      if (parentObj.Level[i].ChildLevel) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < parentObj.Level[i].ChildLevel.length; j++) {
          parentObj.Level[i].ChildLevel[j].isSelected = parentObj.isSelected;
          parentObj.Level[i].ChildLevel[j].IsChildPartiallySelected = false;
          if (parentObj.Level[i].ChildLevel[j].ChildLevel) {
            // tslint:disable-next-line:prefer-for-of
            for (let k = 0; k < parentObj.Level[i].ChildLevel[j].ChildLevel.length; k++) {
              parentObj.Level[i].ChildLevel[j].ChildLevel[k].isSelected = parentObj.isSelected;
              parentObj.Level[i].ChildLevel[j].ChildLevel[k].IsChildPartiallySelected = false;
              parentObj.Level[i].ChildLevel[j].ChildLevel[k].Competency.forEach(element => {
                element.isSelected = false;
              });
            }
          }
        }
      }
    }
  }

  // Click event on Level Checkbox
  levelCheckBox(parent, parentObj) {
    parentObj.IsChildPartiallySelected = false;
    // tslint:disable-next-line:only-arrow-functions
    parent.isSelected = parent.Level.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });
    parentObj.ChildLevel.forEach(item => {
      item.IsChildPartiallySelected = false;
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
    this.setParentLevelStatus(parent, parentObj);
  }



  // Click event on Child Level 1 Checkbox
  childLevel1CheckBox(career, strands, outcome) {
    // outcome.isSelected = !outcome.isSelected;
    // tslint:disable-next-line:only-arrow-functions
    //strands.isSelected = strands.ChildLevel.every(function (itemChild: any) {
    //  return itemChild.isSelected === true;
    //});

    //// tslint:disable-next-line:only-arrow-functions
    //career.isSelected = career.Level.every(function (itemChild: any) {
    //  return itemChild.isSelected === true;
    //});

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
    this.trackChildStatus(career, strands, outcome);
  }
  trackChildStatus(newParent, newChild, newSubchild) {
    newSubchild.IsChildPartiallySelected = false;
    let childStatus: any = [];
    newSubchild.ChildLevel.forEach(subchild => {
      subchild.IsChildPartiallySelected = false;
    });
    newChild.ChildLevel.forEach(element => {
      childStatus.push(element.isSelected);
    });

    childStatus = _.uniq(childStatus);
    if (childStatus.length > 1) {
      newChild.IsChildPartiallySelected = true;
      newChild.isSelected = false;
    } else if (childStatus.length === 1) {
      if (childStatus[0] === true) {
        newChild.IsChildPartiallySelected = false;
        newChild.isSelected = true;
      } else if (childStatus[0] === false) {
        newChild.IsChildPartiallySelected = false;
        newChild.isSelected = false;
      }
    }
    this.setParentLevelStatus(newParent, newChild);

  }
  // Click event on Child Level 2 Checkbox
  childLevel2CheckBox(careerField, strand, outcome) {
    // tslint:disable-next-line:only-arrow-functions
    //outcome.isSelected = outcome.ChildLevel.every(function (itemChild: any) {
    //  return itemChild.isSelected === true;
    //});

    //// tslint:disable-next-line:only-arrow-functions
    //strand.isSelected = strand.ChildLevel.every(function (itemChild: any) {
    //  return itemChild.isSelected === true;
    //});

    //// tslint:disable-next-line:only-arrow-functions
    //career.isSelected = career.Level.every(function (itemChild: any) {
    //  return itemChild.isSelected === true;
    //});
    this.trackCheckboxStatus(careerField, strand, outcome);

  }
  trackCheckboxStatus(parent, child, subchild) {
    let subchildStatus: any = [];
    let parentStatusCheck: any = [];
    subchild.ChildLevel.forEach(element => {
      subchildStatus.push(element.isSelected);
    });

    subchildStatus = _.uniq(subchildStatus);
    if (subchildStatus.length > 1) {
      subchild.IsChildPartiallySelected = true;
      subchild.isSelected = false;
    } else if (subchildStatus.length === 1) {
      if (subchildStatus[0] === true) {
        subchild.IsChildPartiallySelected = false;
        subchild.isSelected = true;
      } else if (subchildStatus[0] === false) {
        subchild.IsChildPartiallySelected = false;
        subchild.isSelected = false;
      }
    }
    child.ChildLevel.forEach(set => {
      parentStatusCheck.push(set.IsChildPartiallySelected);
    });
    parentStatusCheck = _.uniq(parentStatusCheck);
    if (parentStatusCheck.length > 1) {
      child.IsChildPartiallySelected = true;
      child.isSelected = false;
    } else if (parentStatusCheck.length === 1) {
      if (parentStatusCheck[0] === true) {
        child.IsChildPartiallySelected = true;
        child.isSelected = false;
      } else if (parentStatusCheck[0] === false) {
        child.IsChildPartiallySelected = false;
        child.isSelected = false;
      }
    }

    this.setParentLevelStatus(parent, child);
  }
  setParentLevelStatus(level1, level2) {
    let childLevelStatus: any = [];
    let childLevelpartialStatus: any = [];
    level2.ChildLevel.forEach(item => {
      childLevelStatus.push(item.isSelected);
    });
    level2.ChildLevel.forEach(child => {
      childLevelpartialStatus.push(child.IsChildPartiallySelected);
    });
    childLevelpartialStatus = _.uniq(childLevelpartialStatus);
    childLevelStatus = _.uniq(childLevelStatus);
    if (childLevelStatus.length > 1) {
      level2.childLevelpartialStatus = true;
    } else if (childLevelStatus.length === 1) {
      if (childLevelStatus[0] === true) {
        level2.childLevelpartialStatus = false;
        level2.isSelected = true;;
      } else if (childLevelStatus[0] === false) {
        level2.childLevelpartialStatus = false;
        level2.isSelected = false;

        if (childLevelpartialStatus.length > 1) {
          level2.childLevelpartialStatus = true;
          level2.isSelected = false;
        } else if (childLevelpartialStatus.length == 1) {
          if (childLevelpartialStatus[0] === true) {
            level2.childLevelpartialStatus = true;
            level2.isSelected = false;
          } else if (childLevelpartialStatus[0] === false) {
            level2.childLevelpartialStatus = false;
            level2.isSelected = false;
          }
        }
      }
    }

    let parentLevelStatus: any = [];
    let partialCheckStatusOdChild: any = [];
    level1.Level.forEach(element => {
      parentLevelStatus.push(element.isSelected);
    })
    level1.Level.forEach(level => {
      partialCheckStatusOdChild.push(level.IsChildPartiallySelected);
    });
    partialCheckStatusOdChild = _.uniq(partialCheckStatusOdChild);
    parentLevelStatus = _.uniq(parentLevelStatus);
    if (parentLevelStatus.length > 1) {
      level1.isSelected = false;
      level1.IsChildPartiallySelected = true;
    } else if (parentLevelStatus.length === 1) {
      if (parentLevelStatus[0] === true) {
        level1.isSelected = true;
        level1.IsChildPartiallySelected = false;
      } else if (parentLevelStatus[0] === false) {
        if (partialCheckStatusOdChild.length > 1) {
          level1.isSelected = false;
          level1.IsChildPartiallySelected = true;
        } else if (partialCheckStatusOdChild.length === 1) {
          if (partialCheckStatusOdChild[0] === true) {
            level1.isSelected = false;
            level1.IsChildPartiallySelected = true;
          } else if (partialCheckStatusOdChild[0] === false) {
            level1.isSelected = false;
            level1.IsChildPartiallySelected = false;
          }
        }
      }
    }
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

    this.isSelectedValidate();

    if (!this.isSelectedValidation) {

      if (this.cteToAcademic) {
        this.searchResultDataArray.forEach(careerField => {
          if (careerField.isSelected === true || careerField.IsChildPartiallySelected === true) {
            this.reportPayload.Subjects.push({ SubjectId: careerField.AcademicSubjectId });
            this.reportPayload.CareerFiledIds.push(careerField.CareerFieldId);
          }
          careerField.Strand.forEach(stand => {
            if (stand.isSelected === true || stand.IsChildPartiallySelected === true) {
              this.reportPayload.StrandIds.push(stand.StrandPk);
            }
            stand.Outcome.forEach(outcome => {
              if (outcome.isSelected === true || outcome.IsChildPartiallySelected === true) {
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
        if (this.reportPayload['CompetencyIds'].length > 10) {
          this.checkForConformation();
        } else {
          this.generateReports();
        }
      } else {
        this.subjectToCareerData.forEach(careerField => {
          if (careerField.isSelected === true || careerField.IsChildPartiallySelected === true) {
            this.reportPayload.CareerFiledIds.push(careerField.CareerFieldId);
          }


          careerField.Level.forEach(level => {
            if (level.isSelected === true || level.IsChildPartiallySelected === true) {
              this.Level1Ids.push(level.LevelValue1);
            }


            level.ChildLevel.forEach(childLevel1 => {
              if (childLevel1.isSelected === true || childLevel1.IsChildPartiallySelected === true) {
                this.Level2Ids.push(childLevel1.LevelValue2);
              }


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
        if (this.reportPayload['Subjects'][0]['Level3Ids'].length > 10) {
          this.checkForConformation();
        } else {
          this.generateReports();
        }
      }


    } else {
      if (this.cteToAcademic) {
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

  checkForConformation() {
    this.conformationPopup = true;
  }
  cancelReports() {
    this.conformationPopup = false;
  }
  generateReports() {
    this.rout.navigate(['/AlignmentSearchReport']);
    this.alignmentSearchSelectedFilters['selectedAsSearchResults'] = this.reportPayload;
    this.store.dispatch({ type: AdvancedSearchActions.SAVE_AS_SELECTED_FILTERS, payload: this.alignmentSearchSelectedFilters });
    this.conformationPopup = false;
  }

  isSelectedValidate() {
    this.isSelectedValidation = true;
    if (this.cteToAcademic) {
      this.searchResultDataArray.forEach(careerField => {
        if (careerField.isSelected) {
          this.isSelectedValidation = false;
        }
        careerField.Strand.forEach(stand => {
          if (stand.isSelected) {
            this.isSelectedValidation = false;
          }
          stand.Outcome.forEach(outcome => {
            if (outcome.isSelected) {
              this.isSelectedValidation = false;
            }
            outcome.Competency.forEach(competency => {
              if (competency.isSelected) {
                this.isSelectedValidation = false;
              }
            });
          });
        });
      });
    } else {
      this.subjectToCareerData.forEach(careerField => {
        careerField.Level.forEach(level => {
          if (level.isSelected) {
            this.isSelectedValidation = false;
          }
          level.ChildLevel.forEach(childLevel1 => {
            if (childLevel1.isSelected) {
              this.isSelectedValidation = false;
            }
            childLevel1.ChildLevel.forEach(childLevel2 => {
              if (childLevel2.isSelected) {
                this.isSelectedValidation = false;
              }
            });
          });
        });
      });
    }
  }

  goBackToSearch() {
    this.store.dispatch({ type: AdvancedSearchActions.RESET_ALIGNMENTSEARCH_FILTERS });
    this.rout.navigate(['/alignmentsearch']);
  }

  onToggleClick(value) {
    this.cteToAcademic = !this.cteToAcademic;
    this.reportPayload.CteToAcademic = this.cteToAcademic;
    // this._shared.toggleAlignment = this.cteToAcademic;
    this.getAlignmentSearchResult();
  }
}
