export enum Utilities {
  Documents = 'Documents',
  Flags = 'Flags',
  contacts = 'contacts',
  history = 'history',
  Comments = 'Comments',
  none = 'none',
  Utility = 'Utility'
}

export interface UtilNavItem {
  name: Utilities;
  count: number;
  selected: boolean;
}

export class UtilNavItemClass implements UtilNavItem {
  name;
  count;
  selected;
  constructor(name, count, selected = false) {
      this.name = name;
      this.count = count;
      this.selected = selected;
  }
}
