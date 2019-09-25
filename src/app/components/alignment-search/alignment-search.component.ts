import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alignment-search',
  templateUrl: './alignment-search.component.html',
  styleUrls: ['./alignment-search.component.css']
})

export class AlignmentSearchComponent implements OnInit {
  showAsFilter = true;
  showAsResults = false;
  showAsReport = false;

  constructor() { }

  ngOnInit() {
  }

  onPageSelect(org) {
    this.showAsFilter = false;
    this.showAsResults = false;
    this.showAsReport = false;
    if (org === 'Search') {
      this.showAsFilter = true;
    } else if (org === 'SearchResults') {
      this.showAsResults = true;
    } else if (org === 'Report') {
      this.showAsReport = true;
    }
  }
}
