import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as util from 'util';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as SearchResultsActions from './../../actions/search-result.action';

@Component({
  selector: 'custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.css']
})

export class CustomAccordionComponent implements OnInit {
  data: any;
  formattedData: any = [];
  accordionData: any;
  childList: any = [];
  parentChildList: any = [];
  ParentChildchecklist: any = [];
  careerToAcademic = true;
  academicToCareer = false;
  strands: any = [];
  competency: any = [];
  outcomes: any = [];


  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private store: Store<AppState>,
              private httpService: HttpClient) {
    this.store.dispatch({ type: SearchResultsActions.LOAD_SEARCH_RESULT });
  }

  ngOnInit() {
    this.httpService.get('../../../assets/json/CareerCompetency.json').subscribe(
      data => {
        this.accordionData = data;
        console.log(this.accordionData);

        if (this.accordionData) {
          this.formattedData = this.getAccordionData();
          console.log(this.formattedData);
        }

      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

    // this.data = {};


    // this.store.select('searchResult').subscribe(response => {
    //   this.data = response.searchResultList;
    // });
  }

  // Click event on Career Field
  careerFieldCheckBox(parentObj) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < parentObj.strands.length; i++) {
      parentObj.strands[i].isSelected = parentObj.isSelected;
      if (parentObj.strands[i].outcomes) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < parentObj.strands[i].outcomes.length; j++) {
          parentObj.strands[i].outcomes[j].isSelected = parentObj.isSelected;

          if (parentObj.strands[i].outcomes[j].competency) {
            // tslint:disable-next-line:prefer-for-of
            for (let k = 0; k < parentObj.strands[i].outcomes[j].competency.length; k++) {
              parentObj.strands[i].outcomes[j].competency[k].isSelected = parentObj.isSelected;
            }
          }
        }
      }
    }
  }

  // Click event on Strand Checkbox
  strandCheckBox(parent, parentObj) {
    // tslint:disable-next-line:only-arrow-functions
    parent.isSelected = parent.strands.every(function(itemChild: any) {
      return itemChild.isSelected === true;
    });

    if (parentObj.outcomes) {
      if (parentObj.isSelected) {
        parentObj.outcomes.forEach(item => {
          item.isSelected = true;
          if (item.competency) {
            item.competency.forEach(data => {
              data.isSelected = true;
            });
          }
        });
      } else {
        parentObj.outcomes.forEach(item => {
          item.isSelected = false;
          if (item.competency) {
            item.competency.forEach(data => {
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
    strands.isSelected = strands.outcomes.every(function(itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    career.isSelected = career.strands.every(function(itemChild: any) {
      return itemChild.isSelected === true;
    });

    if (outcome.competency) {
      if (outcome.isSelected) {
        outcome.competency.forEach(item => {
          item.isSelected = true;
        });
      } else {
        outcome.competency.forEach(item => {
          item.isSelected = false;
        });
      }
    }
  }

  // Click event on Outcome Checkbox
  competencyCheckBox(career, strand, outcome) {
    // tslint:disable-next-line:only-arrow-functions
    outcome.isSelected = outcome.competency.every(function(itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    strand.isSelected = strand.outcomes.every(function(itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    career.isSelected = career.strands.every(function(itemChild: any) {
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
    this.goToPage(obj);
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }

  goBackToSearch() {
    const lable = localStorage.getItem('searchLable');
    this.onPageSelect.emit(lable);
  }

  onToggleClick(value) {
    if (value) {
      this.careerToAcademic = false;
      this.academicToCareer = true;
    } else {
      this.careerToAcademic = true;
      this.academicToCareer = false;
    }
  }

  getAccordionData() {
    const data = [];
    // const ParentChildchecklist = {};
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
