/** The light surface: Ice Blue paper with Deep Navy type. White papers, print, light product UI. */
export interface SheetProps {
  children?: React.ReactNode;
  pad?: string | number;
  /** Measure of the inner column; defaults to the prose container (720px). */
  maxWidth?: string | number;
  /** Fade white → ice from top to bottom. */
  gradient?: boolean;
  style?: React.CSSProperties;
}
export function Sheet(props: SheetProps): JSX.Element;
