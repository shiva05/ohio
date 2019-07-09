import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debug } from 'util';


@Component({
  selector: 'filter-summary',
  templateUrl: './filter-summary.component.html',
  styleUrls: ['./filter-summary.component.css']
})


export class FilterSummaryComponent {

    @Input() FilterSummary;
    FilterSummaryKeys : any;
    FilterSummaryData :any = [];
    ngOnInit() {
      this.FilterSummaryKeys = [{
        'fieldName': 'Career Fields',
        'fieldKey' :'selectedCareers',
        'fieldType' :'1'
      },
      {
        'fieldName': 'Standards',
        'fieldKey' :'selectedStandards',
        'fieldType' :'1'
      }, {
        'fieldName': 'Outcome',
        'fieldKey': 'selectedOutcome',
        'fieldType' :'1'
      },
      {
        'fieldName': 'Competensy Number',
        'fieldKey': 'selectedCompetencyNumber',
        'fieldType' :'1'
      },
      {
        'fieldAcadamicName': 'Acadamic Subjects',
        'fieldAcadamicKey': 'selectedAcadamicSubjects',
        'fieldAcadamicValue': '',
        'fieldGradeName': 'Grade',
        'fieldGradeKey': 'grade',
        'fieldGradeValue': '',
        'fieldClusterName': 'Cluster',
        'fieldClusterKey': 'cluster',
        'fieldClusterValue': '',
        'fieldStandardNumberName': 'Standard Number',
        'fieldStandardNumberValue': '',
        'fieldStandardNumberKey':'standardNumber',
        'fieldType' :'2'
      }
      ];
      this.formatSearchDataToSummary();
    }
    formatSearchDataToSummary(){
        var source =   {"selectedKeyword":"hi","selectedAcadamicSubjects":[{"item_id":1,"item_text":"Maths","grade":[{"item_id":3,"item_text":"G2"}],"cluster":[{"item_id":4,"item_text":"Test3"}],"standardNumber":[{"item_id":5,"item_text":"Number4"}]},{"item_id":2,"item_text":"Sciences","grade":[{"item_id":3,"item_text":"G2"}],"cluster":[{"item_id":4,"item_text":"Test3"}],"standardNumber":[{"item_id":7,"item_text":"Number6"}]}],"selectedStandards":[{"item_id":1,"item_text":"Business operation"},{"item_id":2,"item_text":"Software operation"},{"item_id":3,"item_text":"artificial"}],"selectedOutcome":[{"item_id":1,"item_text":"Maths"},{"item_id":2,"item_text":"Sciences"}],"selectedCompetencyNumber":"hi","selectedCareers":[{"item_id":3,"item_text":"Postman"},{"item_id":4,"item_text":"Delivery boy"}]};
        this.FilterSummaryKeys.forEach(element => {
          if (element.fieldType == 1) {
            if (source[element.fieldKey]) {
              var temp = element;
              temp.fieldValue = this.getFormatedName(source[element.fieldKey]);
              this.FilterSummaryData.push(temp);
            }
          }
          if(element.fieldType == 2){
            if(source[element.fieldAcadamicKey]){
              source[element.fieldAcadamicKey].forEach(value => {
                var temp = JSON.parse(JSON.stringify(element));
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
        console.log(this.FilterSummaryData);
    }
    getFormatedName(arg){
      var result;
        if(arg && arg.length>0){
            result = arg[0].item_text;
            if(arg.length >1 ){
              result = result +"  "+ (arg.length -1);
            }
            return result;
        }

    }


  }
