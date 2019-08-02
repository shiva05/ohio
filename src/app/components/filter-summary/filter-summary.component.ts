import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debug } from 'util';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';


@Component({
  selector: 'filter-summary',
  templateUrl: './filter-summary.component.html',
  styleUrls: ['./filter-summary.component.css']
})


export class FilterSummaryComponent implements OnInit {

  @Input() FilterSummary;
  FilterSummaryKeys: any;
  FilterSummaryData: any = [];
  panelExpanded: boolean = false;

  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private store: Store<AppState>) {
    // this.metaData = store.select('metaData');

  }
  ngOnInit() {
    this.FilterSummaryKeys =
      [
        {
          fieldName: 'Career Fields',
          fieldKey: 'selectedCareers',
          fieldType: '1'
        },
        {
          fieldName: 'Strand',
          fieldKey: 'selectedStrands',
          fieldType: '1'
        },
        {
          fieldName: 'Outcome',
          fieldKey: 'selectedOutcomes',
          fieldType: '1'
        },
        {
          fieldName: 'Competency',
          fieldKey: 'selectedCompetencies',
          fieldType: '1'
        },
        {
          fieldAcadamicName: 'Academic Subjects',
          fieldAcadamicKey: 'selectedAcadamicSubjects',
          fieldAcadamicValue: '',
          fieldGradeName: 'Grade',
          fieldGradeKey: 'grade',
          fieldGradeValue: '',
          fieldClusterName: 'Cluster',
          fieldClusterKey: 'cluster',
          fieldClusterValue: '',
          fieldStandardNumberName: 'Standard Number',
          fieldStandardNumberValue: '',
          fieldStandardNumberKey: 'standardNumber',
          fieldType: '2'
        }
      ];
    this.store.select('advancedSearch').subscribe(data => {
      if (data.alignmentSearchSelectedFilters) {
        this.formatSearchDataToSummary(data.alignmentSearchSelectedFilters);
      }
    });

  }

  goBackToSearch() {
    this.onPageSelect.emit('Search');
  }

  formatSearchDataToSummary(source) {
    // const source = {
    //   selectedKeyword: 'Test',
    //   selectedAcadamicSubjects: [
    //     {
    //       item_id: 1, item_text: 'Math',
    //       grade: [
    //         { item_id: 3, item_text: 'Geometry' }
    //       ],
    //       cluster: [
    //         { item_id: 3, item_text: 'Circles' }
    //       ],
    //       standardNumber: [
    //         { item_id: 1, item_text: 'G.C.4' }
    //       ]
    //     }],
    //   selectedStandards: [
    //     { item_id: 4, item_text: 'Electrical' }
    //   ],
    //   selectedOutcome: [
    //     { item_id: 1, item_text: 'Motors and Power' }
    //   ],
    //   selectedCareers: [
    //     { item_id: 3, item_text: 'Construction' }
    //   ],
    //   selectedCompetency: [
    //     { item_id: 3, item_text: 'Assess the roles of nonprofit and for-profit businesses' }
    //   ]
    // };
    this.FilterSummaryKeys.forEach(element => {
      if (element.fieldType === '1') {
        if (source[element.fieldKey]) {
          const temp = element;
          temp.fieldValue = this.getFormatedName(source[element.fieldKey]);
          this.FilterSummaryData.push(temp);
        }
      }
      if (element.fieldType === '2') {
        if (source[element.fieldAcadamicKey]) {
          source[element.fieldAcadamicKey].forEach(value => {
            const temp = JSON.parse(JSON.stringify(element));
            temp.fieldAcadamicValue = value.item_text;
            if (value[element.fieldGradeKey]) {
              temp.fieldGradeValue = this.getFormatedName(value[element.fieldGradeKey]);
            }
            if (value[element.fieldClusterKey]) {
              temp.fieldClusterValue = this.getFormatedName(value[element.fieldClusterKey]);
            }
            if (value[element.fieldStandardNumberKey]) {
              temp.fieldStandardNumberValue = this.getFormatedName(value[element.fieldStandardNumberKey]);
            }
            this.FilterSummaryData.push(temp);
          });
        }
      }
    });
    // console.log(this.FilterSummaryData);
  }
  getFormatedName(arg) {
    let result;
    if (arg && arg.length > 0) {
      result = arg[0].item_text;
      if (arg.length > 1) {
        result = result + '  ' + (arg.length - 1);
      }
      return result;
    }

  }


}
