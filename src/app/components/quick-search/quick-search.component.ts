import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.css']
})
export class QuickSearchComponent implements OnInit {
  keyword: any = '';

  constructor(private sharedData: SharedService, private router: Router) {
    console.log(this.sharedData);
  }

  ngOnInit() {
  }

  sendSearch() {
    this.sharedData.data = this.keyword;
    localStorage.setItem('sharedData', this.sharedData.data);
    (window as any).open('http://localhost:4200/Search', '_blank');
    // this.router.navigate(['/Search']);
  }

}
