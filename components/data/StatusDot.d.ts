/** 7px dot + label. The only circular shape in the system. */
export interface StatusDotProps {
  children?: React.ReactNode;
  /** live = blue · attention = amber · idle = graphite · ok = ice. */
  tone?: 'live' | 'attention' | 'idle' | 'ok';
  /** Slow expanding ring — for genuinely live streams only. */
  pulse?: boolean;
  mono?: boolean;
  style?: React.CSSProperties;
}
export function StatusDot(props: StatusDotProps): JSX.Element;
