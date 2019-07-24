import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.css']
})

export class CustomAccordionComponent implements OnInit {
  data: any;

  ngOnInit() {
    this.data = {};

    // // List object having hierarchy of parents and its children
    this.data.ParentChildchecklist = [
      {
        id: 1, value: 'Parent - 1', isClosed: true,
        parentChildList: [
          { id: 1, value: 'PChild - 1' },
          {
            id: 2, value: 'PChild - 2', isChildClosed: true,
            childList: [
              { id: 1, value: 'Child 1' },
              { id: 2, value: 'Child 2' }
            ]
          }
        ]
      },
      {
        id: 2, value: 'Parent - 2', isClosed: true,
        parentChildList: [
          { id: 1, value: 'PChild - 1' },
          {
            id: 2, value: 'PChild - 2', isChildClosed: true,
            childList: [
              { id: 1, value: 'Child 1' },
              { id: 2, value: 'Child 2' }
            ]
          }
        ]
      },
      {
        id: 3, value: 'Parent - 3', isClosed: true,
        parentChildList: [
          { id: 1, value: 'PChild - 1' },
          {
            id: 2, value: 'PChild - 2', isChildClosed: true,
            childList: [
              { id: 1, value: 'Child 1' },
              { id: 2, value: 'Child 2' }
            ]
          }
        ]
      }
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
    console.log(item);
  }
}
  
