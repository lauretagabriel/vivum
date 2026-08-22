/**
 * The chamfered section frame — a Bezel plus the shared alignment recipe: a capped copy
 * measure that is always flush to the left padding, and slack past the cap absorbed into the
 * side paddings. The grown padding is derived from the shared page container and the copy cap
 * in viewport units — never from the frame's own width — so every framed section resolves the
 * same inset and headlines line up across sections regardless of frame width or hung art.
 *
 * Publishes `--sf-pad-x`, `--sf-pad-y`, `--sf-gap`, `--sf-copy-max` and `--sf-decor-right`
 * on the frame, for positioning hung art and corner links.
 */
export interface SectionFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The copy column. Laid out as a flex column with `gap` between children. */
  children?: React.ReactNode;
  /** Rendered inside the frame, above the copy column — a stacked mark that should lead on mobile. */
  before?: React.ReactNode;
  /** Rendered inside the frame but outside the copy column — a stacked mark, a corner link. */
  after?: React.ReactNode;
  /** Copy measure cap. Default 610. */
  copyMax?: number | string;
  /** Width of art hung inside the frame, e.g. 'clamp(300px, 34vw, 540px)'. Shortens the copy's measure without moving its left edge. */
  reserve?: string;
  /** Floor for the gap between reserved art and the frame edge, for narrow frames where the padding has stopped growing. Default 'clamp(8px, 2vw, 40px)'. */
  reserveInset?: string;
  /** Gutter in px between the copy and reserved art. Default 8. */
  gutter?: number;
  /** Row gap inside the copy column, px. Default 20. */
  gap?: number;
  /** Collapse to a single full-width column — pass the section's own narrow-breakpoint state. Affects the copy column only; the frame's padding is deliberately independent of it, so sections with different thresholds stay aligned. */
  stacked?: boolean;
  /** Min-height on the copy column, to give hung art room. Ignored when stacked. */
  columnMinHeight?: number | string;
  /** Minimum horizontal padding. Default is the shared section token; the resolved value grows past it to absorb slack once the copy hits its cap. */
  padX?: string;
  /** Vertical padding. Defaults to the resolved horizontal padding, so the frame is balanced on all four sides at every width — pass a value only for a deliberately letterboxed frame. */
  padY?: string;
  /** Ceiling on the grown horizontal padding, so narrow sibling frames sharing the value keep a usable measure. Default 'clamp(72px, 7vw, 112px)'. */
  padGrowMax?: string;
  /** The measure the shared padding is computed against — one value for the whole page, so `copyMax` can vary per section without breaking alignment. Default '610px'. Change it only page-wide. */
  padRef?: string;
  /** Corner cut in px, below the wide breakpoint. Default 44. */
  chamfer?: number;
  /** Corner cut in px once the shared container has reached its max width (viewport ≥ 1720px), where the cut corners are otherwise pure blank space. Default 104. */
  chamferWide?: number;
  /** Line color. Default '--vv-ice-08'. */
  color?: string;
  /** Interior backdrop blur in px. Default 12. */
  blur?: number;
  /** Amber tick at the top-left. Default false — section frames open with an Eyebrow, whose own rule marks that corner. */
  accent?: boolean;
  /** Extra styles on the copy column. */
  contentStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}

export declare function SectionFrame(props: SectionFrameProps): JSX.Element;
