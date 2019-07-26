import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.css']
})

export class CustomAccordionComponent implements OnInit {
  data: any;
  childList: any = [];
  parentChildList: any = [];
  careerToAcademic: boolean = true;
  academicToCareer: boolean = false;

  @Output() onPageSelect = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.data = {};

    this.childList = [
      // tslint:disable-next-line:max-line-length
      { id: 1, academicSubject: 'Math', value: 'Select materials and lay out rough\u2010in wiring runs according to specifications, drawings and code requirements.' },
      { id: 2, academicSubject: 'Math', value: 'Lay out and install conduit or cable runs, raceways and cable systems.' }
    ];

    this.parentChildList = [
      { id: 1, academicSubject: 'Math', value: 'Planning and Design' },
      { id: 2, academicSubject: 'Math', value: 'Business Operations\/21st Century Skills' },
      { id: 3, academicSubject: 'Math', value: 'Construction and Facility Management' },
      { id: 4, academicSubject: 'Math', value: 'Electrical', isChildClosed: true, childList: JSON.parse(JSON.stringify(this.childList)) },
      { id: 5, academicSubject: 'Math', value: 'Environmental Systems and Plumbing' },
      { id: 6, academicSubject: 'Math', value: 'Structural Construction' },
      { id: 7, academicSubject: 'Math', value: 'Safety, Tools, and Equipment' }
    ];

    // List object having hierarchy of parents and its children
    this.data.ParentChildchecklist = [
      { id: 1, academicSubject: 'Science', value: 'Hospitality and Tourism' },
      { id: 2, academicSubject: 'Social', value: 'Business, Marketing, and Finance' },
      { id: 3, academicSubject: 'Science', value: 'Agriculture and Environmental Science' },
      { id: 4, academicSubject: 'Science', value: 'Engineering and Science Technologies' },
      { id: 5, academicSubject: 'Math', value: 'Manufacturing' },
      { id: 6, academicSubject: 'Social', value: 'Education and Training' },
      { id: 7, academicSubject: 'Math', value: 'Construction', isClosed: true, parentChildList: JSON.parse(JSON.stringify(this.parentChildList)) },
      { id: 8, academicSubject: 'Math', value: 'Transportation' },
      { id: 9, academicSubject: 'Social', value: 'Human Services' },
      { id: 10, academicSubject: 'Social', value: 'Law & Public Safety' },
      { id: 11, academicSubject: 'Math', value: 'Information Technology' },
      { id: 12, academicSubject: 'ELA', value: 'Arts and Communication' },
      { id: 13, academicSubject: 'Science', value: 'Health Science' }
    ];
  }

  // Click event on parent checkbox
  parentCheckBox(parentObj) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < parentObj.parentChildList.length; i++) {
      parentObj.parentChildList[i].isSelected = parentObj.isSelected;
      if (parentObj.parentChildList[i].childList) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < parentObj.parentChildList[i].childList.length; j++) {
          parentObj.parentChildList[i].childList[j].isSelected = parentObj.isSelected;
        }
      }
    }
  }

  // Click event on Parent Child Checkbox
  parentChildCheckBox(parent, parentObj) {
    // tslint:disable-next-line:only-arrow-functions
    parent.isSelected = parent.parentChildList.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });

    if (parentObj.childList) {
      if (parentObj.isSelected) {
        parentObj.childList.forEach(item => {
          item.isSelected = true;
        });
      } else {
        parentObj.childList.forEach(item => {
          item.isSelected = false;
        });
      }
    }
  }

  // Click event on Child Checkbox
  childCheckBox(parent, parentObj) {
    // tslint:disable-next-line:only-arrow-functions
    parentObj.isSelected = parentObj.childList.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });
    // tslint:disable-next-line:only-arrow-functions
    parent.isSelected = parent.parentChildList.every(function (itemChild: any) {
      return itemChild.isSelected === true;
    });
  }

  // Expand/Collapse event on each parent
  expandCollapse(obj) {
    obj.isClosed = !obj.isClosed;
  }

  // Expand/Collapse event on each parent
  expandChildCollapse(obj) {
    obj.isChildClosed = !obj.isChildClosed;
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

