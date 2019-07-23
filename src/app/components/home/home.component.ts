import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  @Output() onPageSelect = new EventEmitter<any>();

  goToPage(org) {
    this.onPageSelect.emit(org);
  }

  ngOnInit() {
  }

}
