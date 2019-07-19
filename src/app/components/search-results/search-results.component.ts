import { Component, EventEmitter, Output, Input, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {


  constructor() {}
  @Output() onPageSelect = new EventEmitter<any>();

  ngOnInit() {

  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }

}
