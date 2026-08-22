/** Quiet placeholder for an empty list, filtered view, or unconfigured panel. */
export interface EmptyStateProps {
  /** Lucide slug, graphite. */
  icon?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Usually a single secondary Button. */
  action?: React.ReactNode;
  style?: React.CSSProperties;
}
export function EmptyState(props: EmptyStateProps): JSX.Element;
