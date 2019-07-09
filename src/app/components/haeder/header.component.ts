import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  @Output() onPageSelect = new EventEmitter<any>();
  ngOnInit() {

  }
  goToPage(org){
    this.onPageSelect.emit(org);
  }

}
