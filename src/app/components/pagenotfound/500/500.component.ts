import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: '500',
  templateUrl: './500.component.html',
  styleUrls: ['./500.component.css']
})
export class 500Component implements OnInit {

  constructor() { }

  @Output() onPageSelect = new EventEmitter<any>();

  goToPage(org) {
    this.onPageSelect.emit(org);
  }

  ngOnInit() {
  }

}
