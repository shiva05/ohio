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

}
