import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'StandardsByDesignWeb';
  List: any = [];
  childArray: any = [];
  childArray1: any = [];
  someParam: any;
  someParamKid: any;
  loopNumber: any;
  showAdvancedSearch = false; showSearchResults = false;
  showReport = false;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    console.log('hear init hapenned ');
    this.showAdvancedSearch = true;
    this.loopNumber = 1;
    this.childArray1 = [
      { id: 1, academicSubject: 'Math', value: 'Select materials and lay out rough\u2010in wiring runs according to specifications, drawings and code requirements.'},
      { id: 2, academicSubject: 'Math', value: 'Lay out and install conduit or cable runs, raceways and cable systems.'}
  ];

    this.childArray = [
      { id: 1, academicSubject: 'Math', value: 'Planning and Design'},
      { id: 2, academicSubject: 'Math', value: 'Business Operations\/21st Century Skills'},
      { id: 3, academicSubject: 'Math', value: 'Construction and Facility Management'},
      { id: 4, academicSubject: 'Math', value: 'Electrical', children: JSON.parse(JSON.stringify(this.childArray1))},
      { id: 5, academicSubject: 'Math', value: 'Environmental Systems and Plumbing'},
      { id: 6, academicSubject: 'Math', value: 'Structural Construction' },
      { id: 7, academicSubject: 'Math', value: 'Safety, Tools, and Equipment' }
  ];

    this.List = [
      { id: 1, academicSubject: 'Science', value: 'Hospitality and Tourism' },
      { id: 2, academicSubject: 'Social', value: 'Business, Marketing, and Finance' },
      { id: 3, academicSubject: 'Science', value: 'Agriculture and Environmental Science' },
      { id: 4, academicSubject: 'Science', value: 'Engineering and Science Technologies' },
      { id: 5, academicSubject: 'Math', value: 'Manufacturing' },
      { id: 6, academicSubject: 'Social', value: 'Education and Training' },
      { id: 7, academicSubject: 'Math', value: 'Construction', children: JSON.parse(JSON.stringify(this.childArray)) },
      { id: 8, academicSubject: 'Math', value: 'Transportation' },
      { id: 9, academicSubject: 'Social', value: 'Human Services' },
      { id: 10, academicSubject: 'Social', value: 'Law & Public Safety' },
      { id: 11, academicSubject: 'Math', value: 'Information Technology' },
      { id: 12, academicSubject: 'ELA', value: 'Arts and Communication' },
      { id: 13, academicSubject: 'Science', value: 'Health Science' }
    ];
  }
  onItemSelect(item: any) {
    console.log('on item slplselect', item);
  }
  onSelectAll(item: any) {
    console.log('on select all', item);
  }
  onPageSelect(org) {
    this.showAdvancedSearch = false;
    this.showSearchResults = false;
    this.showReport = false;
    if (org === 'Search') {
      this.showAdvancedSearch = true;
    }
    if (org === 'SearchResults') {
      this.showSearchResults = true;
    }
    if (org === 'Report') {
      this.showReport = true;
    }
  }
}

