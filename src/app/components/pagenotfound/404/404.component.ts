import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: '404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css']
})
export class 404Component implements OnInit {

  constructor() { }

  @Output() onPageSelect = new EventEmitter<any>();

  goToPage(org) {
    this.onPageSelect.emit(org);
  }

  ngOnInit() {
  }

}
