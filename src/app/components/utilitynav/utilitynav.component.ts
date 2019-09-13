import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Utilities } from '../../models/util-nav-item';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { UtilsContext } from '../../models/utils-context';

@Component({
  selector: 'app-utilitynav',
  templateUrl: './utilitynav.component.html',
  styleUrls: ['./utilitynav.component.css']
})
export class UtilitynavComponent implements OnInit {

  @Output() doUtilNav = new EventEmitter<any>();

  utilities: string[];
  utilityOptions: string[];
  flagCount = 0;
  docsCount = 0;
  commentsCount = 0;
  workHistoryCount = 0;
  currentWidth = 0;
  //hideUtil = false;
  //context: UtilsContext;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    
    const flagCountObserver = this.store.select(state => state.utilsState.flagCount);
    flagCountObserver.subscribe((count) => {
      // console.log('UtilitynavComponent ngOnInit() flagCount', count);
      this.flagCount = count;
    });

    const docsCountObserver = this.store.select(state => state.utilsState.docCount);
    docsCountObserver.subscribe((count) => {
      // console.log('UtilitynavComponent ngOnInit() docsCount', count);
      this.docsCount = count;
    });

    const commentsObserver = this.store.select(state => state.utilsState.commentsCount);
    commentsObserver.subscribe((count) => {
      // console.log('UtilitynavComponent ngOnInit() commentsCount', count);
      this.commentsCount = count;
    });

    const tabObserver = this.store.select(state => state.utilsState.tabs);
    // console.log('UtilitynavComponent ngOnInit() state.utilsState.tabs', tabObserver);
    tabObserver.subscribe((tabs) => {
      
      if(tabs == null)
      {
        this.utilities = tabs;
      }
      else if(tabs.length > 0)
      {
        this.utilities = tabs;
      }
      
    });

    
    
  }

  utilNav(util: string) {
    this.doUtilNav.emit(util);
  }

  hasUtils() {
    // console.log('UtilitynavComponent hasUtils() this.utilities', this.utilities);
    if (this.utilities !== null) {
      return (this.utilities && this.utilities.length >= 0);
    }

    return false;
  }

  isUtil(util: string) {
    // console.log('UtilitynavComponent isUtil() this.utilities', this.utilities);
    // console.log('UtilitynavComponent isUtil() this.utilities.indexOf(util)', this.utilities.indexOf(util));
    // console.log('Utilitynav.isUtil() util = ', util);
    // console.log('Utilitynav.isUtil() utilities = ', this.utilities);
    if (this.utilities !== null && this.utilities.indexOf) {
      return (this.utilities && this.utilities.indexOf(util) >= 0);
    }
  
    return false;
  }
 
}