/**
 * The brand's section label: a short amber rule followed by an uppercase graphite word.
 * The rule is always amber — it is the accent marker every section opens with.
 */
export interface EyebrowProps {
  children?: React.ReactNode;
  /** md for product UI, slide for 1920×1080 decks, sm for dense panels. */
  size?: 'sm' | 'md' | 'slide';
  /** Set false to drop the rule and keep only the label. */
  rule?: boolean;
  /** Rule thickness in px. Defaults to 1 (4 on slide) — raise it for a heavier marker on large type. */
  ruleWeight?: number;
  /** Label color. graphite reads on the flat canvas; ice is for lit translucent fills (GlassSlab), where graphite falls to ~1.8:1. */
  labelTone?: 'graphite' | 'ice';
  style?: React.CSSProperties;
}
export function Eyebrow(props: EyebrowProps): JSX.Element;
