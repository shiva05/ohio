export interface NavItem {
  menuKey?: number;
  label: string;
  url: string;
  children?: NavItem[];
  selected?: boolean;
}
