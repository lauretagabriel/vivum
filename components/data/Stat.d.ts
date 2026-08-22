/**
 * A single figure with an uppercase label. The system's way of showing a number.
 */
export interface StatProps {
  /** The figure itself, pre-formatted. */
  value: React.ReactNode;
  /** Uppercase graphite caption under the figure. */
  label?: React.ReactNode;
  /** Small unit set beside the figure, e.g. "ms", "W". */
  unit?: React.ReactNode;
  /** Change string, e.g. "+18% vs. last run". Direction picks the Lucide arrow. */
  delta?: string;
  deltaTone?: 'blue' | 'amber' | 'graphite';
  /** md for product UI, lg for hero figures, slide for 1920×1080 decks. */
  size?: 'sm' | 'md' | 'lg' | 'slide';
  /** Set the figure in IBM Plex Mono — for hashes, coordinates, and live telemetry. */
  mono?: boolean;
  style?: React.CSSProperties;
}
export function Stat(props: StatProps): JSX.Element;
