/** Small uppercase label for state, version, or classification. */
export interface BadgeProps {
  children?: React.ReactNode;
  tone?: 'blue' | 'amber' | 'graphite' | 'ice';
  /** outline is the default; solid amber is reserved for one-per-view emphasis. */
  variant?: 'outline' | 'solid' | 'quiet';
  /** Set for build numbers, hashes, and coordinates. */
  mono?: boolean;
  style?: React.CSSProperties;
}
export function Badge(props: BadgeProps): JSX.Element;
