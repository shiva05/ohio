import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as util from 'util';
@Component({
  selector: 'custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.css']
})

export class CustomAccordionComponent implements OnInit {
  data: any;
  formattedData: any = {ParentChildchecklist: []};
  accordionData: any;
  childList: any = [];
  parentChildList: any = [];
  ParentChildchecklist: any = [];
  careerToAcademic = true;
  academicToCareer = false;

  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.httpService.get('../../../assets/json/CareerCompetency.json').subscribe(
      data => {
        this.accordionData = data;
        console.log(this.accordionData);

        if (this.accordionData) {
          this.ParentChildchecklist = this.getAccordionData(this.accordionData);
          this.formattedData.ParentChildchecklist = (this.ParentChildchecklist);
          console.log(this.formattedData);
        }

      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

    this.data = {};

    // this.childList = [
    //   // tslint:disable-next-line:max-line-length
    //   { id: 1, academicSubject: 'Math', value: 'Select materials and lay out rough\u2010in wiring runs according to specifications, drawings and code requirements.' },
    //   { id: 2, academicSubject: 'Math', value: 'Lay out and install conduit or cable runs, raceways and cable systems.' }
    // ];

    // this.parentChildList = [
    //   { id: 1, academicSubject: 'Math', value: 'Planning and Design' },
    //   { id: 2, academicSubject: 'Math', value: 'Business Operations\/21st Century Skills' },
    //   { id: 3, academicSubject: 'Math', value: 'Construction and Facility Management' },
    //   { id: 4, academicSubject: 'Math', value: 'Electrical', childList: JSON.parse(JSON.stringify(this.childList)) },
    //   { id: 5, academicSubject: 'Math', value: 'Environmental Systems and Plumbing' },
    //   { id: 6, academicSubject: 'Math', value: 'Structural Construction' },
    //   { id: 7, academicSubject: 'Math', value: 'Safety, Tools, and Equipment' }
    // ];

    // // List object having hierarchy of parents and its children
    // this.data.ParentChildchecklist = [
    //   { id: 1, academicSubject: 'Science', value: 'Hospitality and Tourism' },
    //   { id: 2, academicSubject: 'Social', value: 'Business, Marketing, and Finance' },
    //   { id: 3, academicSubject: 'Science', value: 'Agriculture and Environmental Science' },
    //   { id: 4, academicSubject: 'Science', value: 'Engineering and Science Technologies' },
    //   { id: 5, academicSubject: 'Math', value: 'Manufacturing' },
    //   { id: 6, academicSubject: 'Social', value: 'Education and Training' },
    //   { id: 7, academicSubject: 'Math', value: 'Construction', parentChildList: JSON.parse(JSON.stringify(this.parentChildList)) },
    //   { id: 8, academicSubject: 'Math', value: 'Transportation' },
    //   { id: 9, academicSubject: 'Social', value: 'Human Services' },
    //   { id: 10, academicSubject: 'Social', value: 'Law & Public Safety' },
    //   { id: 11, academicSubject: 'Math', value: 'Information Technology' },
    //   { id: 12, academicSubject: 'ELA', value: 'Arts and Communication' },
    //   { id: 13, academicSubject: 'Science', value: 'Health Science' }
    // ];

    // console.log(this.data);
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
    parent.isSelected = parent.parentChildList.every(function(itemChild: any) {
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
    parentObj.isSelected = parentObj.childList.every(function(itemChild: any) {
      return itemChild.isSelected === true;
    });
    // tslint:disable-next-line:only-arrow-functions
    parent.isSelected = parent.parentChildList.every(function(itemChild: any) {
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

  getAccordionData(search) {
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
        parentChildList: []
      });

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.accordionData[h].Strands.length - 1; i++) {
        data[h].parentChildList.push({
          id: i,
          value: `${this.accordionData[h].Strands[i].StrandTitle}`,
          academicSubject: `Math`,
          parent: data[h].name,
          childList: []
        });


        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.accordionData[h].Strands[i].Outcomes.length; j++) {
          data[h].parentChildList[i].childList.push({
            id: j,
            value: `${this.accordionData[h].Strands[i].Outcomes[j].OutcomeTitle}`,
            academicSubject: `Math`,
            parent: data[h].parentChildList[i].name,
            grandChildList: []
          });


          // tslint:disable-next-line:prefer-for-of
          for (let k = 0; k < this.accordionData[h].Strands[i].Outcomes[j].Competencies.length; k++) {
            data[h].parentChildList[i].childList[j].grandChildList.push({
              name: `${this.accordionData[h].Strands[i].Outcomes[j].Competencies[k].CompetencyTitle}`,
              parent: null,
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
