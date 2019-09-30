import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Flags, FlagItem } from '../../../models/flags';
import { UtilsContext } from '../../../models/utils-context';
import { FlagService } from '../../../services/flag.service';

@Component({
  selector: 'utils-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.css']
})
export class FlagsComponent implements OnInit, OnChanges {

  @Input() flags: Flags;
  @Output() doLoadFlags = new EventEmitter<any>();
  @Output() doAddFlags = new EventEmitter<any>();
  @Output() doRemoveFlags = new EventEmitter<any>();
  selectedFlags: number[] = [];


  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
 
  }

  ngOnChanges() {
    this.selectedFlags = this.flags.editable.filter((flag) => {
      return flag.selected;
    }).map((flag) => {
      return flag.flagKey;
    });
  }

  loadFlags() {
    this.doLoadFlags.emit({});
  }

  addFlag(evt) {
    console.log('add flags', evt.flagKey);
    this.doAddFlags.emit(evt.flagKey);
  }

  removeFlag(evt) {
    console.log('remove flags', evt.value.flagKey);
    this.doRemoveFlags.emit(evt.value.flagKey);

  }

}
