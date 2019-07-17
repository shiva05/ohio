import { Component, EventEmitter, Output, Input, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as util from 'util';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Observable } from 'rxjs/Observable';
import { MetaData } from './../../models/meta-data.model';
import * as AdvancedSearchActions from './../../actions/advanced-search.actions';

// import { SearchSchoolStandardsService } from '../../_services/search-school-standards/search-school-standards.service';

@Component({
  selector: 'advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AdvancedSearchComponent implements OnInit {

  disabled = false;
  ShowFilter = true;
  limitSelection = false;
  careers: any = [];
  academicSubjects = [];
  stadards = [];
  outcomes = [];
  grades = [];
  clusters = [];
  standardNumbers = [];
  selectedKeyword: any;
  selectedItems: any = [];
  selectedCareer: any = [];
  selectedAcadamicSubjects: any = [];
  selectedStandards: any = [];
  selectedOutcome: any = [];
  selectedGrades: any = [];
  selectedClusters: any = [];
  selectedStandardNumbers: any = [];
  dropdownSettings: any = {};
  searchObj: any;
  selectedCompetencyNumber: any;
  competencyNumbers :any;
  metaData: Observable<MetaData>;

  constructor(private httpService: HttpClient,
              private ref: ChangeDetectorRef, private store: Store<AppState>) {
    // this.metaData = store.select('metaData');
    this.store.dispatch({type: AdvancedSearchActions.LOAD_META_DATA});
  }
  ngOnInit() {
    this.store.select('advancedSearch').subscribe(data => {
      this.metaData = data;
      this.careers =this.metaData['careers'];
      debugger
      this.academicSubjects =this.metaData['academicSubjects'];
      this.stadards =this.metaData['standards'];
      this.outcomes =this.metaData['outcomes'];
      this.grades =this.metaData['grades'];
      this.clusters =this.metaData['clusters'];
      this.standardNumbers =this.metaData['standardNumbers'];
      this.competencyNumbers =this.metaData['competencyNumbers'];

    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id', textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

  }

  search() {
    this.searchObj = JSON.stringify({
      selectedKeyword: this.selectedKeyword,
      selectedAcadamicSubjects: this.selectedAcadamicSubjects,
      selectedStandards: this.selectedStandards,
      selectedOutcome: this.selectedOutcome,
      selectedCompetencyNumber: this.selectedCompetencyNumber,
      selectedCareers: this.selectedCareer
    });
    console.log(this.searchObj);
  }
  onAcadamicSubjectSelect() {
    console.log('hi');

  }
  onGradeSelect(grade, acasub) {
    this.selectedAcadamicSubjects.forEach(element => {
      if (element.item_id === acasub.item_id) {
        if (element.grade) {
          element.grade.push({ item_id: grade[0].item_id, item_text: grade[0].item_text });
        } else {
          element.grade = [];
          element.grade.push({ item_id: grade[0].item_id, item_text: grade[0].item_text });
        }
      }
    });
    console.log(this.selectedAcadamicSubjects);
  }
  onClusterSelect(cluster, acasub) {
    this.selectedAcadamicSubjects.forEach(element => {
      if (element.item_id === acasub.item_id) {
        if (element.cluster) {
          element.cluster.push({ item_id: cluster[0].item_id, item_text: cluster[0].item_text });
        } else {
          element.cluster = [];
          element.cluster.push({ item_id: cluster[0].item_id, item_text: cluster[0].item_text });
        }
      }
    });
    console.log(this.selectedAcadamicSubjects);
  }
  onStandardNumberSelect(standardNumbers, acasub) {
    this.selectedAcadamicSubjects.forEach(element => {
      if (element.item_id === acasub.item_id) {
        if (element.standardNumber) {
          element.standardNumber.push({ item_id: standardNumbers[0].item_id, item_text: standardNumbers[0].item_text });
        } else {
          element.standardNumber = [];
          element.standardNumber.push({ item_id: standardNumbers[0].item_id, item_text: standardNumbers[0].item_text });
        }
      }
    });
    console.log(this.selectedAcadamicSubjects);
  }

}
