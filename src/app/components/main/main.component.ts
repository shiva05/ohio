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

  onPageSelect(org) {
    console.log(org);
    this.showAdvancedSearch = false;
    this.showSearchResults = false;
    this.showReport = false;
    this.showCourseReport = false;
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
    } else if (org === 'CourseReport') {
      this.showCourseReport = true;
    }
  }
}
