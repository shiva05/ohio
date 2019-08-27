import { Component, EventEmitter, Output, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  showReport = false;
  data: any = [];

  constructor(private translate: TranslateService, private sharedData: SharedService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.data = this.sharedData;
  }

  onPageSelect(org) {
    this.showReport = false;
    if (org === 'Report') {
      this.showReport = true;
    }
  }
}
