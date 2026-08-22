/**
 * Product sidebar: grouped items, 2px amber left indicator on the active row.
 */
export interface SideNavItem { id: string; label: React.ReactNode; icon?: string; trailing?: React.ReactNode }
export interface SideNavSection { label?: React.ReactNode; items?: SideNavItem[] }
export interface SideNavProps {
  logoSrc?: string;
  sections?: SideNavSection[];
  /** id of the active item. */
  activeId?: string;
  onSelect?: (id: string) => void;
  /** Pinned block at the bottom — account row, build badge. */
  footer?: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}
export function SideNav(props: SideNavProps): JSX.Element;
