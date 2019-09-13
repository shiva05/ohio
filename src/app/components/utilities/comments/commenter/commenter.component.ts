import { Component, OnInit, Input } from '@angular/core';
import { Commenter } from 'src/app/models/commenter';

@Component({
  selector: 'app-commenter',
  templateUrl: './commenter.component.html',
  styleUrls: ['./commenter.component.css']
})
export class CommenterComponent implements OnInit {
  commenterVar: Commenter;

  @Input('changedLabel') changedLabel: string;
  @Input('changedDate') changedDate: string;
  showDetails: boolean = false;

  content = {
    alsoLabel: 'Also:',
    organizationLabel: 'Organization:',
    roleLabel: 'Role',
    notApplicable: 'N/A'
  }

  constructor() { }

  ngOnInit() {

  }

  @Input('commenter')
  set commenter(value: Commenter) {
    this.commenterVar = value;
  }

  get commenter() {
    if (!this.commenterVar.roles.length) {
      this.commenterVar.roles.push({
        name: this.content.notApplicable,
        organizationName: this.content.notApplicable
      })
    }

    return this.commenterVar;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  normalizeName(name: string): string {
    return name ? name : this.content.notApplicable;
  }
}
