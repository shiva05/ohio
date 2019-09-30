import { Component, OnInit, Input } from '@angular/core';
import { Flags, FlagSource } from '../../../models/flags';

@Component({
  selector: 'app-flags-overview',
  templateUrl: './flags-overview.component.html',
  styleUrls: ['./flags-overview.component.css']
})
export class FlagsOverviewComponent implements OnInit {
  @Input() flags: Flags;
  flagSources: FlagSource[] = [];
  hideSource = [];
  
  toggleIconClass="close close-overview-flags";
  constructor() { }

  ngOnInit() {
    if(this.flags != null)
    {
      this.flagSources = this.flags.sources;
      console.log(this.flags);
    }
  }


  toggleFlags(sourceKey: number){ 
    if(this.toggleIconClass==="close close-overview-flags" || this.toggleIconClass.match("back")) {
      this.toggleIconClass="close close-overview-flags rotate-icon";
    } else {
      this.toggleIconClass="close close-overview-flags rotate-icon-back";
    }

    if (this.hideSource[sourceKey] === true) {
      this.hideSource[sourceKey] = false;
    } else {
      this.hideSource[sourceKey] = true;
    }

  }

  hideFlagSource(sourceKey: number) {
    return this.hideSource[sourceKey];
  }

}
