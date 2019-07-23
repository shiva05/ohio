import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor() { }

  @Output() onPageSelect = new EventEmitter<any>();

  ngOnInit() {
  }

  goToPage(org) {
    this.onPageSelect.emit(org);
  }
}
