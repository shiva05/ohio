import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.css']
})

export class CustomAccordionComponent implements OnInit {

  @Input() options;
  @Input() loopCount;
  constructor() { }
  isOpen = false;

  ngOnInit() {
  }
  checkAll(option) {
    if (option.children) {
        this.loop(option.children, option);
    }
  }

  loop(list, option) {
    list.forEach(item => {
      item.selected = option.selected ? true : false;
      if (item.children) {
        this.loop(item.children, item);
      }
    });
  }
  toggleAccordion() {
    this.isOpen = !this.isOpen;
  }
}

