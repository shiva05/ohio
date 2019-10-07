import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent implements OnInit {
  @Output() nameForParent = new EventEmitter<any>();
  @Output() closeModalBool = new EventEmitter<any>();
  PDFName: string = '';

  constructor() { }

  ngOnInit() {
  }

  sendToParent() {
    this.nameForParent.emit(this.PDFName);
  }

  closeModal() {
    this.closeModalBool.emit();
  }
}
