import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Test } from './../../models/test.model';
import { AppState } from './../../app.state';
import * as TestActions from './../../actions/test.actions';


@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {

  results: any = [];
  ngOnInit() {
    var result = {
      title: 'Store Mechanical systems fluids and waste products',
      strand:'2. safety tools',
      careerField: 'Trasportation',
      outcome: 'General Maintenance',
      competency: '2.4.12 Store Mechanical systems fluids and waste products',
      academicSubject: 'ELA',
      domain: 'Reading for information',
      grade: '11-12',
      standards:
        [
          { standardType: 'A', standardDesc: '1.R1.11-12.1 Cite strong and through texual evidence' },
          { standardType: 'R', standardDesc: '1.R1.11-12.1 Cite strong and through texual evidence' },
          { standardType: 'E', standardDesc: '1.R1.11-12.1 Cite strong and through texual evidence' },
          { standardType: 'E', standardDesc: '1.R1.11-12.1 Cite strong and through texual evidence' }
        ]
    };
    this.results.push(result);
    this.results.push(result);
    this.results.push(result);
    this.results.push(result);
    this.results.push(result);
  }
}
