/**
 * The Vivum action: a square 1px rule, a 7% wash of its own colour, and a label to
 * match — no radius, no shadow, no lift on hover. Amber `primary` is the single
 * accent, one per view; hover lifts the wash to 14%.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = amber rule + amber label (one per view) · secondary = ice rule + ice label · quiet = blue text, no rule · onLight = navy rule on ice sheets. */
  variant?: 'primary' | 'secondary' | 'quiet' | 'onLight';
  size?: 'sm' | 'md' | 'lg';
  /** Lucide slug rendered before the label. */
  icon?: string;
  /** Lucide slug rendered after the label. */
  iconAfter?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  /** Renders an anchor instead of a button. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
