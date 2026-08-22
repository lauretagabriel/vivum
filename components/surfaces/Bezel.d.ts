/**
 * A chamfered hairline frame with a transparent interior — for marking out a block of
 * copy on a video plate or gradient field without covering the artwork behind it.
 */
export interface BezelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Corner cut in px, top-right and bottom-left. Default 36. */
  chamfer?: number;
  /** Inner padding. Default '52px 56px'. */
  pad?: string | number;
  /** Line thickness in px. Default 1; 2 for large display frames. */
  weight?: number;
  /** Line color. Default '--line-strong'. */
  color?: string;
  /** Amber tick at the top-left corner. Default true — pass false when the first child is an Eyebrow, whose own rule already marks that corner. */
  accent?: boolean;
  /** Minimum frame height in px. */
  minHeight?: number | string;
  /** Video to run inside the frame, clipped to the chamfered shape and feathered with --plate-feather. */
  plateSrc?: string;
  /** Plate hold. Default 0.45. */
  plateOpacity?: number;
  /** Slides the plate horizontally — any CSS length. Prefer a fluid value, e.g. 'clamp(40px, 32vw, 470px)': a fixed percentage shift throws the subject off a narrow screen. */
  plateShift?: string;
  /** Scales the plate around its own centre. Overflow is clipped by the frame. */
  plateScale?: number;
  style?: React.CSSProperties;
}

export declare function Bezel(props: BezelProps): JSX.Element;
