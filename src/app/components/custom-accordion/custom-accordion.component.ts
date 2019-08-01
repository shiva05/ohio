import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.data = {};

    this.competency = [
      // tslint:disable-next-line:max-line-length
      { id: 1, academicSubject: 'Math', value: 'Use economic indicators to identify economic trends and conditions.' },
      { id: 2, academicSubject: 'Math', value: 'Find surface area and volume for three‐dimensional objects, accurate to a specified level of precision.' }
    ];

    this.outcomes = [
      // tslint:disable-next-line:max-line-length
      { id: 1, academicSubject: 'Math', value: 'Select materials and lay out rough\u2010in wiring runs according to specifications, drawings and code requirements.' },
      { id: 2, academicSubject: 'Math', value: 'Lay out and install conduit or cable runs, raceways and cable systems.', competency: JSON.parse(JSON.stringify(this.competency)) }
    ];

    this.strands = [
      { id: 1, academicSubject: 'Math', value: 'Planning and Design' },
      { id: 2, academicSubject: 'Math', value: 'Business Operations\/21st Century Skills' },
      { id: 3, academicSubject: 'Math', value: 'Construction and Facility Management' },
      { id: 4, academicSubject: 'Math', value: 'Electrical', outcomes: JSON.parse(JSON.stringify(this.outcomes)) },
      { id: 5, academicSubject: 'Math', value: 'Environmental Systems and Plumbing' },
      { id: 6, academicSubject: 'Math', value: 'Structural Construction' },
      { id: 7, academicSubject: 'Math', value: 'Safety, Tools, and Equipment' }
    ];

    // List object having hierarchy of parents and its children
    this.data.careerField = [
      { id: 1, academicSubject: 'Science', value: 'Hospitality and Tourism' },
      { id: 2, academicSubject: 'Social', value: 'Business, Marketing, and Finance' },
      { id: 3, academicSubject: 'Science', value: 'Agriculture and Environmental Science' },
      { id: 4, academicSubject: 'Science', value: 'Engineering and Science Technologies' },
      { id: 5, academicSubject: 'Math', value: 'Manufacturing' },
      { id: 6, academicSubject: 'Social', value: 'Education and Training' },
      { id: 7, academicSubject: 'Math', value: 'Construction', strands: JSON.parse(JSON.stringify(this.strands)) },
      { id: 8, academicSubject: 'Math', value: 'Transportation' },
      { id: 9, academicSubject: 'Social', value: 'Human Services' },
      { id: 10, academicSubject: 'Social', value: 'Law & Public Safety' },
      { id: 11, academicSubject: 'Math', value: 'Information Technology' },
      { id: 12, academicSubject: 'ELA', value: 'Arts and Communication' },
      { id: 13, academicSubject: 'Science', value: 'Health Science' }
    ];
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

    // tslint:disable-next-line:only-arrow-functions
    // career.strands.isSelected = strands.outcomes.every(function (itemChild: any) {
    //   return itemChild.isSelected === true;
    // });

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
    console.log(career);
    console.log(strand);
    console.log(outcome);

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
}

