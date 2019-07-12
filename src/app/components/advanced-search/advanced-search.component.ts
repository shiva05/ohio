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
  acadamicSubjects = [];
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
  metaData: Observable<MetaData>;

  constructor(private httpService: HttpClient,
              private ref: ChangeDetectorRef, private store: Store<AppState>) {
    // this.metaData = store.select('metaData');
    this.store.dispatch({type: AdvancedSearchActions.LOAD_META_DATA});
  }
  ngOnInit() {
    this.careers = [{ item_id: 1, item_text: 'Agriculture'},
    { item_id: 2, item_text: 'Software Developer'},
    { item_id: 3, item_text: 'Postman'},
    { item_id: 4, item_text: 'Delivery boy'},
    { item_id: 5, item_text: 'Driver'},
    { item_id: 6, item_text: 'Cook'},
    { item_id: 7, item_text: 'Support'},
    { item_id: 8, item_text: 'Admin'},
    { item_id: 9, item_text: 'Hardware'}];

    this.acadamicSubjects = [{ item_id: 1, item_text: 'Maths'},
    { item_id: 2, item_text: 'Sciences'},
    { item_id: 3, item_text: 'English'},
    { item_id: 4, item_text: 'French'},
    { item_id: 5, item_text: 'Software development'},
    { item_id: 6, item_text: 'Networking'},
    { item_id: 7, item_text: 'History'},
    { item_id: 8, item_text: 'Music'},
    { item_id: 9, item_text: 'Technology'}];

    this.stadards = [{ item_id: 1, item_text: 'Business operation'},
    { item_id: 2, item_text: 'Software operation'},
    { item_id: 3, item_text: 'artificial'},
    { item_id: 4, item_text: 'Operating system'},
    { item_id: 5, item_text: 'Computer networking'},
    { item_id: 6, item_text: 'Information technology'},
    { item_id: 7, item_text: 'Electronic devices'},
    { item_id: 8, item_text: 'Environment sciences'},
    { item_id: 9, item_text: 'Hyperlooping'}];

    this.outcomes = [{ item_id: 1, item_text: 'Maths'},
    { item_id: 2, item_text: 'Sciences'},
    { item_id: 3, item_text: 'English'},
    { item_id: 4, item_text: 'French'},
    { item_id: 5, item_text: 'Software development'},
    { item_id: 6, item_text: 'Networking'},
    { item_id: 7, item_text: 'History'},
    { item_id: 8, item_text: 'Music'},
    { item_id: 9, item_text: 'Technology'}];

    this.grades = [{ item_id: 1, item_text: 'G1'},
    { item_id: 3, item_text: 'G2'},
    { item_id: 4, item_text: 'G3'},
    { item_id: 5, item_text: 'G4'},
    { item_id: 6, item_text: 'G5'},
    { item_id: 7, item_text: 'G6'},
    { item_id: 8, item_text: 'G7'},
    { item_id: 9, item_text: 'G8'}];

    this.clusters = [{ item_id: 1, item_text: 'Test1'},
    { item_id: 3, item_text: 'Test2'},
    { item_id: 4, item_text: 'Test3'},
    { item_id: 5, item_text: 'Test4'},
    { item_id: 6, item_text: 'Test5'},
    { item_id: 7, item_text: 'Test6'},
    { item_id: 8, item_text: 'Test7'},
    { item_id: 9, item_text: 'Test8'}];


    this.standardNumbers = [{ item_id: 1, item_text: 'Number1'},
    { item_id: 3, item_text: 'Number2'},
    { item_id: 4, item_text: 'Number3'},
    { item_id: 5, item_text: 'Number4'},
    { item_id: 6, item_text: 'Number5'},
    { item_id: 7, item_text: 'Number6'},
    { item_id: 8, item_text: 'Number7'},
    { item_id: 9, item_text: 'Number8'}];

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
