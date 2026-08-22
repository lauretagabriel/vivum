/**
 * FontAwesome Light glyph, rendered as inline SVG. The only icon primitive in the system —
 * never hand-roll an SVG.
 */
export interface IconProps {
  /**
   * Glyph name, kebab-case FontAwesome: "microchip", "circle-nodes", "arrow-right".
   * The Material-era names the kits were first written against ("developer_board", "hub",
   * "arrow_forward") still resolve to their chosen replacement.
   */
  name: string;
  /** Square size in px. 16 inline, 20 default, 24 nav. */
  size?: number;
  /** Any CSS color; defaults to currentColor. */
  color?: string;
  /** Accepted for API compatibility; the light set has no filled variant. */
  filled?: boolean;
  /** Accepted for API compatibility; the light set has one weight. */
  weight?: number;
  style?: React.CSSProperties;
}
export function Icon(props: IconProps): JSX.Element;
