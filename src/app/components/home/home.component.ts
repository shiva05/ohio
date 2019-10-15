import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  isPublic: boolean;

  constructor() { }

  @Output() onPageSelect = new EventEmitter<any>();

  ngOnInit() {
    this.isPublic = true;
  }
}
