export interface NavItem {
  MenuKey?: number;
  tabKey?: number;
  Label: string;
  Url: string;
  Submenu?: NavItem[];
  selected?: boolean;
}
