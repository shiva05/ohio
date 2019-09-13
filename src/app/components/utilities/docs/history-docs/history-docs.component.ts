import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentHistory } from '../../../../models/docs';

@Component({
  selector: 'app-history-docs',
  templateUrl: './history-docs.component.html',
  styleUrls: ['./history-docs.component.css']
})
export class HistoryDocsComponent implements OnInit {
  @Input() docHistory: DocumentHistory[] = [];

  
  constructor() { }

  ngOnInit() {
  }

}
