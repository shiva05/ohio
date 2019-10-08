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
    if (this.PDFName.length > 499) {
      this.PDFName = this.PDFName.substring(0, 499);
    }
    this.nameForParent.emit(this.PDFName);
    this.closeModalBool.emit();
  }

  closeModal() {
    this.closeModalBool.emit();
  }
}
