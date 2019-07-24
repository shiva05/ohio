import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'StandardsByDesignWeb';

  someParam: any;
  someParamKid: any;
  loopNumber: any;
  showAdvancedSearch = false; showSearchResults = false;
  showReport = false; showHomePage = true;
  showAlignmentSearch = false; showCourseSearch = false; showExport = false;
  iFrameSummonsSrc: SafeResourceUrl;

  constructor(private translate: TranslateService, private sanitizer: DomSanitizer) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    // this.iFrameSummonsSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com');
    this.showAdvancedSearch = false;
    this.showHomePage = true;
    this.loopNumber = 1;
  }

  onItemSelect(item: any) {
    console.log('on item slplselect', item);
  }

  onSelectAll(item: any) {
    console.log('on select all', item);
  }

  onPageSelect(org) {
    this.showAdvancedSearch = false;
    this.showSearchResults = false;
    this.showReport = false;
    this.showHomePage = false;
    this.showAlignmentSearch = false;
    this.showCourseSearch = false;
    this.showExport = false;

    if (org === 'Search') {
      this.showAdvancedSearch = true;
    } else if (org === 'SearchResults') {
      this.showSearchResults = true;
    } else if (org === 'Report') {
      this.showReport = true;
    } else if (org === 'Home') {
      this.showHomePage = true;
    } else if (org === 'SearchAlignment') {
      this.showAlignmentSearch = true;
    } else if (org === 'SearchCourse') {
      this.showCourseSearch = true;
    } else if (org === 'Export') {
      this.showExport = true;
    }
  }
}

