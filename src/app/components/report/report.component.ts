import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent {

  @Output() onPageSelect = new EventEmitter<any>();


  goToPage(org) {
    this.onPageSelect.emit(org);
  }

}
