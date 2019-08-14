import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { DownloadPDFService } from '../../services/download-pdf.service';
import {ReportService} from '../../services/report.service';
import { Store } from '@ngrx/store';

import { AppState } from './../../app.state';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent {

  @Output() onPageSelect = new EventEmitter<any>();

  constructor(private downloadPDFService: DownloadPDFService,private store: Store<AppState>){}

  goToPage(org) {
    this.onPageSelect.emit(org);
  }

  public downloadPDF(): void {
    this.store.select('advancedSearch').subscribe(data => {
      if (data.alignmentSearchSelectedFilters) {

        var careerfeilds = [];
        data.alignmentSearchSelectedFilters.selectedCareers.forEach(element => {
          careerfeilds.push(element.CareerFieldId);
        });

        var strands = [];
        data.alignmentSearchSelectedFilters.selectedStrands.forEach(element => {
          strands.push(element.StrandPk);
        });

        var outcomes = [];
        data.alignmentSearchSelectedFilters.selectedOutcomes.forEach(element => {
          outcomes.push(element.OutcomePk);
        });

        var CompetencyIds = [];
        data.alignmentSearchSelectedFilters.selectedCompetencies.forEach(element => {
          //CompetencyIds.push(element.CareerFieldId);
        });


        var subjects = [];
        data.alignmentSearchSelectedFilters.selectedAcadamicSubjects.forEach(element => {
          var level1= [];
          if(element.Level[0] && element.Level[0].SelectedItems){
            element.Level[0].SelectedItems.forEach(element => {
              level1.push(element.LevelValue1);
          });
          }

          var level2= [];
          if(element.Level[1] && element.Level[1].SelectedItems){
            element.Level[1].SelectedItems.forEach(element => {
                level2.push(element.LevelValue1);
            });
          }



          var level3= [];
          if (element.Level[3] && element.Level[3].SelectedItems) {
            element.Level[3].SelectedItems.forEach(element => {
              level3.push(element.LevelValue1);
            });
          }


          var subject = {
            "SubjectId": element.SubjectId,
            "Level1Ids": level1,
            "Level2Ids": level2,
            "Level3Ids": level3
          };
          subjects.push(subject);
        });

        console.log();
        var obj = {
          "Keywords": "",
          "CareerFiledIds":careerfeilds,
          "StrandIds": strands,
          "OutcomeIds": outcomes,
          "CompetencyIds": CompetencyIds,
          "Subjects":subjects,
          "CteToAcademic": true
        };

    this.downloadPDFService.getPDF(obj)
    .subscribe(x => {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      const newBlob = new Blob([x], { type: 'application/pdf' });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob, 'Report');
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);

      const link = document.createElement('a');
      link.href = data;
      link.download = 'Report.pdf'; // There isn't that much of a reason to even think about what I'm doing and instead just do it because there isn't a
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout( () => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
      }
    });

  }
}
