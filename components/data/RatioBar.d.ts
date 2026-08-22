/** Single stacked bar showing proportion — the brand's color-ratio and utilization graphic. */
export interface RatioSegment {
  label: React.ReactNode;
  /** Relative weight; percentages are computed from the sum. */
  value: number;
  /** Any palette color, e.g. var(--vv-blue). */
  color: string;
  /** Add a hairline outline — needed when the segment is Deep Navy on Deep Navy. */
  outline?: boolean;
}
export interface RatioBarProps {
  segments?: RatioSegment[];
  /** Bar height in px. 12 in UI, 180 on slides. */
  height?: number;
  legend?: boolean;
  style?: React.CSSProperties;
}
export function RatioBar(props: RatioBarProps): JSX.Element;
