import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
    console.log('hear init hapenned ');
    this.showAdvancedSearch = true;
    this.loopNumber = 1;
    this.childArray1 = [{id: 1, value: 'item1'},
    {id: 2, value: 'item2'},
    {id: 3, value: 'item3'},
    {id: 4, value: 'item4'},
    {id: 5, value: 'item5'}];

    this.childArray = [{id: 1, value: 'item1'},
    {id: 2, value: 'item2'},
    {id: 3, value: 'item3'},
    {id: 4, value: 'item4'},
    {id: 5, children: JSON.parse(JSON.stringify(this.childArray1))}];

    this.List = [{id: 1, value: 'item1'},
    {id: 2, value: 'item2'},
    {id: 3, value: 'item3', children: JSON.parse(JSON.stringify(this.childArray))},
    {id: 4, value: 'item4'},
    {id: 5, value: 'item5', children: JSON.parse(JSON.stringify(this.childArray))}];
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

