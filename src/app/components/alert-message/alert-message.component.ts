import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AlertTypes } from '../../models/alerts';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit, OnChanges {

  @Input() type: AlertTypes;
  @Input() message: string;

  currentStyle = '';
  toShow = false;
  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    const styleMap = {
      success: 'alert-success',
      warning: 'alert-warning',
      info: 'alert-info',
      error: 'alert-danger'
    };

    this.currentStyle = styleMap[this.type];
    this.toShow = (this.message.length > 0);
  }

  toggle() {
    this.toShow = !this.toShow;
  }
}
