import { Component, EventEmitter, Output, Input, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as util from 'util';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Observable } from 'rxjs/Observable';
import { MetaData } from './../../models/meta-data.model';
import * as AdvancedSearchActions from './../../actions/advanced-search.actions';
import { _ } from 'underscore';
@Component({
  selector: 'app-alignment-search-filters',
  templateUrl: './alignment-search-filters.html',
  styleUrls: []
})
export class AlignmentSearchFiltersComponent implements OnInit {


  disabled = false;
  ShowFilter = true;
  limitSelection = false;
  careers: any = [];
  academicSubjects :any = [];
  strands :any = [];
  outcomes :any = [];
  grades :any = [];
  clusters : any= [];
  standardNumbers :any = [];
  strandsDropdown :any = [];
  outcomesDropdown :any = [];
  selectedKeyword: any;
  selectedItems: any = [];
  selectedCareer: any = [];
  selectedAcadamicSubjects: any = [];
  selectedStrands: any = [];
  selectedOutcome: any = [];
  selectedCompetencyNumbers: any = [];
  selectedGrades: any = [];
  selectedClusters: any = [];
  selectedStandardNumbers: any = [];
  dropdownSettings: any = {};
  compitencyDropdownSettings: any = {};
  academicDropdownSettings: any = {};
  careerFieldDropdownSettings: any = {};
  strandDropdownSettings: any = {};
  outcomeDropdownSettings: any = {};
  academicSubjectDropdownSettings: any = {};
  searchObj: any;
  selectedCompetencyNumber: any;
  competencyNumbers: any;
  metaData: Observable<MetaData>;

  selectedGradesI1: any = [];
  selectedClustersI1: any = [];
  selectedStandardNumbersI1: any = [];
  selectedGradesI2: any = [];
  selectedClustersI2: any = [];
  selectedStandardNumbersI2: any = [];
  selectedGradesI3: any = [];
  selectedClustersI3: any = [];
  selectedStandardNumbersI3: any = [];
  selectedGradesI4: any = [];
  selectedClustersI4: any = [];
  selectedStandardNumbersI4: any = [];

  dataSubject1: any = [];
  dataSubject2: any = [];
  dataSubject3: any = [];
  dataSubject4: any = [];
  dataSubject5: any = [];
  dataSubject6: any = [];
  dataSubject7: any = [];
  dataSubject8: any = [];
  dataSubject9: any = [];
  dataSubject10: any = [];
  dataSubject11: any = [];
  dataSubject12: any = [];

  gradeMathData: any = [];
  clusterMathData: any = [];
  standardMathData: any = [];
  gradeELAdata: any = [];
  clusterELAdata: any = [];
  standardELAdata: any = [];
  gradeScienceData: any = [];
  clusterScienceData: any = [];
  standardScienceData: any = [];
  gradeSocialData: any = [];
  clusterSocialData: any = [];
  standardSocialData: any = [];

  constructor(private httpService: HttpClient, private ref: ChangeDetectorRef, private store: Store<AppState>) {
    // this.metaData = store.select('metaData');
    this.store.dispatch({ type: AdvancedSearchActions.LOAD_META_DATA });
  }

  @Output() onPageSelect = new EventEmitter<any>();

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'CareerFieldId', textField: 'CareerFieldName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    }
    this.careerFieldDropdownSettings = {
      singleSelection: false,
      idField: 'CareerFieldId', textField: 'CareerFieldName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.strandDropdownSettings = {
      singleSelection: false,
      idField: 'StrandPk', textField: 'StrandName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.outcomeDropdownSettings = {
      singleSelection: false,
      idField: 'OutcomePk', textField: 'OutcomeName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.careerFieldDropdownSettings = {
      singleSelection: false,
      idField: 'CareerFieldId', textField: 'CareerFieldName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.academicSubjectDropdownSettings = {
      singleSelection: false,
      idField: 'SubjectId', textField: 'SubjectName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.compitencyDropdownSettings = {
      singleSelection: false,
      idField: 'CompetencyPk', textField: 'CompetencyName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.academicDropdownSettings = {
      singleSelection: false,
      idField: 'SubjectLevelsPk', textField: 'LevelValue1',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    }
    this.store.select('advancedSearch').subscribe(data => {
      debugger
      this.metaData = data.metaData;
      this.careers = this.metaData['CareerFields'];
      this.strands = this.metaData['Strands'];
      this.outcomes = this.metaData['Outcomes'];
      this.grades = this.metaData['Grades'];
      this.clusters = this.metaData['clusters'];
      this.standardNumbers = this.metaData['standardNumbers'];
      this.competencyNumbers = data.competencies;
      if (this.metaData['Subjects']) {
        this.academicSubjects = this.metaData['Subjects'];
        this.academicSubjects.forEach((subject) => {
          if (subject.SubjectId === 1) {
            this.dataSubject1 = subject.Level[0].SubjectLevels;
            this.gradeMathData = this.dataSubject1;
            this.dataSubject2 = subject.Level[1].SubjectLevels;
            this.dataSubject3 = subject.Level[2].SubjectLevels;
          } else if (subject.SubjectId === 2) {
            this.dataSubject4 = subject.Level[0].SubjectLevels;
            this.gradeELAdata = this.dataSubject4;
            this.dataSubject5 = subject.Level[1].SubjectLevels;
            this.dataSubject6 = subject.Level[2].SubjectLevels;
          }
          else if (subject.SubjectId === 3) {
            this.dataSubject7 = subject.Level[0].SubjectLevels;
            this.gradeScienceData = this.dataSubject7;
            this.dataSubject8 = subject.Level[1].SubjectLevels;
            this.dataSubject9 = subject.Level[2].SubjectLevels;
          }
          else if (subject.SubjectId === 4) {
            this.dataSubject10 = subject.Level[0].SubjectLevels;
            this.gradeSocialData = this.dataSubject10;
            this.dataSubject11 = subject.Level[1].SubjectLevels;
            this.dataSubject12 = subject.Level[2].SubjectLevels;
          }
        });
       // this.metaData['Subjects'].forEach(element => {
       //   this.academicSubjects.push({SubjectId :element.SubjectId,SubjectName :element.SubjectName});
       //});
      }
      if(data.alignmentSearchSelectedFilters){
        if (data.alignmentSearchSelectedFilters.selectedCareers.length > 0) {
          this.selectedCareer = data.alignmentSearchSelectedFilters.selectedCareers;
        }
        if (data.alignmentSearchSelectedFilters.selectedStrands.length > 0) {
          this.selectedStrands = data.alignmentSearchSelectedFilters.selectedStrands;
        }
        if(data.alignmentSearchSelectedFilters.selectedOutcomes.length>0){
          this.selectedOutcome = data.alignmentSearchSelectedFilters.selectedOutcomes;
        }
        if(data.alignmentSearchSelectedFilters.selectedCompetencies.length >0){
          this.selectedCompetencyNumbers =  data.alignmentSearchSelectedFilters.selectedCompetencies;
        }
         this.selectedAcadamicSubjects = data.alignmentSearchSelectedFilters.selectedAcadamicSubjects.length>0 ? data.alignmentSearchSelectedFilters.selectedAcadamicSubjects :[];
      }
    });


  }
  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
  onCareerSelect() {
    this.strandsDropdown = [];
    this.strands.forEach(eachStrand => {
      this.selectedCareer.forEach(eachCareer => {
        if (eachStrand.CareerFieldPk === eachCareer.CareerFieldId) {
         // console.log(eachStrand);
          this.strandsDropdown.push(eachStrand);
        }
      });
    });
  }
  onStrandSelect() {
    this.outcomesDropdown = [];
    this.outcomes.forEach(eachOutcome => {
      this.selectedStrands.forEach(eachStrand => {
        if (eachOutcome.StrandPk === eachStrand.StrandPk) {
          //console.log(eachOutcome);
          this.outcomesDropdown.push(eachOutcome);
        }
      });
    });
    //console.log(this.strandsDropdown);
  }

  collectingSubjectIds(set1, set2, obj1) {
    let set1Id : any = [];
    let set2Id: any = [];
    let res: any = [];
    set1.forEach((element) => {
      set1Id.push(element.SubjectLevelsPk);
    });
    set2.forEach((element) => {
      set2Id.push(element.SubjectLevelsPk);
    });
    res = _.intersection(set1Id, set2Id);
    if (obj1 === 'this.selectedClustersI1') {
      if (res.length === 0) {
        this.selectedClustersI1 = [];
      } else {
        this.selectedClustersI1 = [];
        set2.forEach((set) => {
          res.forEach((resId) => {
            if (set.SubjectLevelsPk === resId) {  
              this.selectedClustersI1.push(set);
            }
          });
        });
      }
    }
    else if (obj1 === 'this.selectedStandardNumbersI1') {
      if (res.length === 0) {
        this.selectedStandardNumbersI1 = [];
      } else {
        this.selectedStandardNumbersI1 = [];
        set2.forEach((set) => {
          res.forEach((resId) => {
            if (set.SubjectLevelsPk === resId) {
              this.selectedStandardNumbersI1.push(set);
            }
          });
        });
      }
    }

    else if (obj1 === 'this.selectedClustersI2') {
      if (res.length === 0) {
        this.selectedClustersI2 = [];
      } else {
        this.selectedClustersI2 = [];
        set2.forEach((set) => {
          res.forEach((resId) => {
            if (set.SubjectLevelsPk === resId) {
              this.selectedClustersI2.push(set);
            }
          });
        });
      }
    }
    else if (obj1 === 'this.selectedStandardNumbersI2') {
      if (res.length === 0) {
        this.selectedStandardNumbersI2 = [];
      } else {
        this.selectedStandardNumbersI2 = [];
        set2.forEach((set) => {
          res.forEach((resId) => {
            if (set.SubjectLevelsPk === resId) {
              this.selectedStandardNumbersI2.push(set);
            }
          });
        });
      }
    }

    else  if (obj1 === 'this.selectedClustersI3') {
      if (res.length === 0) {
        this.selectedClustersI3 = [];
      } else {
        this.selectedClustersI3 = [];
        set2.forEach((set) => {
          res.forEach((resId) => {
            if (set.SubjectLevelsPk === resId) {
              this.selectedClustersI3.push(set);
            }
          });
        });
      }
    }
    else if (obj1 === 'this.selectedStandardNumbersI3') {
      if (res.length === 0) {
        this.selectedStandardNumbersI3 = [];
      } else {
        this.selectedStandardNumbersI3 = [];
        set2.forEach((set) => {
          res.forEach((resId) => {
            if (set.SubjectLevelsPk === resId) {
              this.selectedStandardNumbersI3.push(set);
            }
          });
        });
      }
    }

    else  if (obj1 === 'this.selectedClustersI4') {
      if (res.length === 0) {
        this.selectedClustersI4 = [];
      } else {
        this.selectedClustersI4 = [];
        set2.forEach((set) => {
          res.forEach((resId) => {
            if (set.SubjectLevelsPk === resId) {
              this.selectedClustersI4.push(set);
            }
          });
        });
      }
    }
    else if (obj1 === 'this.selectedStandardNumbersI4') {
      if (res.length === 0) {
        this.selectedStandardNumbersI4 = [];
      } else {
        this.selectedStandardNumbersI4 = [];
        set2.forEach((set) => {
          res.forEach((resId) => {
            if (set.SubjectLevelsPk === resId) {
              this.selectedStandardNumbersI4.push(set);
            }
          });
        });
      }
    }

  }
  //Academic subjects dropdown list mapping functions
  onMathGradeSelect(item, data) {
    this.clusterMathData = [];
    if (this.selectedGradesI1.length > 0) {
      this.selectedGradesI1.forEach((mathGrade) => {
        this.dataSubject2.forEach((cluster,  index) => {
          if (mathGrade.SubjectLevelsPk === cluster.ParentLevelPk) {
            this.clusterMathData.push(cluster);
          } 
        });
      });
      this.collectingSubjectIds(this.selectedClustersI1, this.clusterMathData, 'this.selectedClustersI1');// make sure you send selected list and final list in the same order.
      
    } else {
      this.selectedClustersI1 = [];
      this.selectedStandardNumbersI1 = [];
      this.standardMathData = [];
    }
  }
  onMathClusterSelect(item, data) {
    this.standardMathData = [];
    if (this.selectedClustersI1.length > 0) {
      this.selectedClustersI1.forEach((mathCluster) => {
        this.dataSubject3.forEach((standard) => {
          if (mathCluster.SubjectLevelsPk === standard.ParentLevelPk) {
            this.standardMathData.push(standard);
          }
        });
      });
      this.collectingSubjectIds(this.selectedStandardNumbersI1, this.standardMathData, 'this.selectedStandardNumbersI1');
    } else {
      this.selectedStandardNumbersI1 = [];
    }
  }
  onMathStandardNumberSelect(item, data) {
    //console.log(item);
  }

  onELAgradeSelect(item, data) {
    this.clusterELAdata = [];
    if (this.selectedGradesI2.length > 0) {
      this.selectedGradesI2.forEach((mathGrade) => {
        this.dataSubject5.forEach((cluster) => {
          if (mathGrade.SubjectLevelsPk === cluster.ParentLevelPk) {
            this.clusterELAdata.push(cluster);
          }
        });
      });
      this.collectingSubjectIds(this.selectedClustersI2, this.clusterELAdata, 'this.selectedClustersI2');
    } else {
      this.selectedClustersI2 = [];
      this.selectedStandardNumbersI2 = [];
      this.standardELAdata = [];
    }
  }
  onELAclusterSelect(item, data) {
    this.standardELAdata = [];
    if (this.selectedClustersI2.length > 0) {
    this.selectedClustersI2.forEach((mathCluster) => {
      this.dataSubject6.forEach((standard) => {
        if (mathCluster.SubjectLevelsPk === standard.ParentLevelPk) {
          this.standardELAdata.push(standard);
        }
      });
      });
    this.collectingSubjectIds(this.selectedStandardNumbersI2, this.standardELAdata, 'this.selectedStandardNumbersI2');
    } else {
      this.selectedStandardNumbersI2 = [];
    }
  }
  onELAstandardNumberSelect(item, data) {
    //console.log(item);
  }

  onScienceGradeSelect(item, data) {
    this.clusterScienceData = [];
    if (this.selectedGradesI3.length > 0) {
    this.selectedGradesI3.forEach((mathGrade) => {
      this.dataSubject8.forEach((cluster) => {
        if (mathGrade.SubjectLevelsPk === cluster.ParentLevelPk) {
          this.clusterScienceData.push(cluster);
        }
      });
      });
    this.collectingSubjectIds(this.selectedClustersI3, this.clusterScienceData, 'this.selectedClustersI3');
    } else {
      this.selectedClustersI3 = [];
      this.selectedStandardNumbersI3 = [];
      this.standardScienceData = [];
    }
  }
  onScienceClusterSelect(item, data) {
    this.standardScienceData = [];
    if (this.selectedClustersI3.length > 0) {
    this.selectedClustersI3.forEach((mathCluster) => {
      this.dataSubject9.forEach((standard) => {
        if (mathCluster.SubjectLevelsPk === standard.ParentLevelPk) {
          this.standardScienceData.push(standard);
        }
      });
      });
    this.collectingSubjectIds(this.selectedStandardNumbersI3, this.standardScienceData, 'this.selectedStandardNumbersI3');
    } else {
      this.selectedStandardNumbersI3 = [];
    }
  }
  onScienceStandardNumberSelect(item, data) {
    //console.log(item);
  }

  onSocialGradeSelect(item, data) {
    this.clusterSocialData = [];
    if (this.selectedGradesI4.length > 0) {
    this.selectedGradesI4.forEach((mathGrade) => {
      this.dataSubject11.forEach((cluster) => {
        if (mathGrade.SubjectLevelsPk === cluster.ParentLevelPk) {
          this.clusterSocialData.push(cluster);
        }
      });
      });
    this.collectingSubjectIds(this.selectedClustersI4, this.clusterSocialData, 'this.selectedClustersI4');
    } else {
      this.selectedClustersI4 = [];
      this.selectedStandardNumbersI4 = [];
      this.standardSocialData = [];
    }
  }
  onSocialClusterSelect(item, data) {
    this.standardSocialData = [];
    if (this.selectedClustersI4.length > 0) {
    this.selectedClustersI4.forEach((mathCluster) => {
      this.dataSubject12.forEach((standard) => {
        if (mathCluster.SubjectLevelsPk === standard.ParentLevelPk) {
          this.standardSocialData.push(standard);
        }
      });
      });
    this.collectingSubjectIds(this.selectedStandardNumbersI4, this.standardSocialData, 'this.selectedStandardNumbersI4');
    } else {
      this.selectedStandardNumbersI4 = [];
    }
  }
  onSocialStandardNumberSelect(item, data) {
    //console.log(item);
  }


  onOutcomeSelect(outcome) {
    debugger
    // TODO: Call API
    this.store.dispatch({ type: AdvancedSearchActions.LOAD_COMPETENCY_DATA ,payload :this.selectedOutcome});
    console.log(this.competencyNumbers)
  }
  search() {
    this.goToPage('SearchResults');
    this.searchObj = {
      selectedCareers: this.selectedCareer,
      selectedStrands: this.selectedStrands,
      selectedOutcomes: this.selectedOutcome,
      selectedCompetencies: this.selectedCompetencyNumbers,
      selectedAcadamicSubjects: this.selectedAcadamicSubjects,
      selectedGradesI1: this.selectedGradesI1,
      selectedClustersI1: this.selectedClustersI1,
      selectedStandardNumbersI1: this.selectedStandardNumbersI1,
      selectedGradesI2: this.selectedGradesI2,
      selectedClustersI2: this.selectedClustersI2,
      selectedStandardNumbersI2: this.selectedStandardNumbersI2,
      selectedGradesI3: this.selectedGradesI3,
      selectedClustersI3: this.selectedClustersI3,
      selectedStandardNumbersI3: this.selectedStandardNumbersI3,
      selectedGradesI4: this.selectedGradesI4,
      selectedClustersI4: this.selectedClustersI4,
      selectedStandardNumbersI4: this.selectedStandardNumbersI4,
    };
    localStorage.setItem('searchLable', 'SearchAlignment');
    this.goToPage('SearchResults');
    this.store.dispatch({ type: AdvancedSearchActions.SAVE_AS_SELECTED_FILTERS ,payload:this.searchObj});
  }

  onAcadamicSubjectSelect() {
    console.log('hi');
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }
}
