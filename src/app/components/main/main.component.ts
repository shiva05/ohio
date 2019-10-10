import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  someParam: any;
  someParamKid: any;
  loopNumber: any;
  showAdvancedSearch = false;
  showSearchResults = false;
  showReport = false;
  showHomePage = true;
  showAlignmentSearch = false;
  showCourseSearch = false;
  showExport = false;
  showCourseReport = false;
  iFrameSummonsSrc: SafeResourceUrl;

  constructor(private translate: TranslateService, private sanitizer: DomSanitizer) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.iFrameSummonsSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.madewithangular.com/categories/education/');
    this.showAdvancedSearch = false;
    this.showHomePage = true;
    this.loopNumber = 1;
  }

  onItemSelect(item: any) {

  }

  onSelectAll(item: any) {

  }

}
