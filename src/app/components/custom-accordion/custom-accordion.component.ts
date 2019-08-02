import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
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
  strands: any = [];
  competency: any = [];
  outcomes: any = [];
  careerToAcademic: boolean = true;
  academicToCareer: boolean = false;

  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private store: Store<AppState>) {
    this.store.dispatch({ type: SearchResultsActions.LOAD_SEARCH_RESULT });
  }

  ngOnInit() {
    this.data = {};

    this.store.select('searchResult').subscribe(response => {
      this.data = response.searchResultList;
    });
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
    parent.isSelected = parent.strands.every(function (itemChild: any) {
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
    strands.isSelected = strands.outcomes.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    career.isSelected = career.strands.every(function (itemChild: any) {
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
    outcome.isSelected = outcome.competency.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    strand.isSelected = strand.outcomes.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    // tslint:disable-next-line:only-arrow-functions
    career.isSelected = career.strands.every(function (itemChild: any) {
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
}

