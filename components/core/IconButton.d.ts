/** Square hairline button carrying a single Lucide glyph. Always give it a `label`. */
export interface IconButtonProps {
  /** Lucide slug. */
  icon: string;
  /** Accessible label + tooltip. Required. */
  label: string;
  size?: 'sm' | 'md' | 'lg';
  /** outline = hairline chrome · ghost = no chrome until hover. */
  variant?: 'outline' | 'ghost';
  /** Amber glyph for a toggled-on state. */
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export function IconButton(props: IconButtonProps): JSX.Element;
