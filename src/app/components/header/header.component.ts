import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isPublic = false;

  @Output() onPageSelect = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }
}
