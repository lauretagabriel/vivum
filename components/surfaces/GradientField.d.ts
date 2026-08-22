/**
 * A brand gradient surface. Nine opaque fields, all built from #082036 → #001121,
 * plus seven blooms that end at transparent so sections never hard-cut against each other.
 */
export interface GradientFieldProps {
  children?: React.ReactNode;
  /**
   * Opaque fields — for a surface that owns its whole area (covers, heroes, slides):
   * signature (radial from top centre — the default) · horizon · sweep · well · aperture · ember · twin · strata · abyss.
   * Blooms — transparent-ending glows that composite over the canvas, for stacked page
   * sections that must flow without a seam: crest · base · left · right · core · data · signal.
   * `none` paints nothing — the off switch, so a call site keeps its field name while flat.
   */
  field?: 'none'
    | 'signature' | 'horizon' | 'sweep' | 'well' | 'aperture' | 'ember' | 'twin' | 'strata' | 'abyss'
    | 'crest' | 'base' | 'left' | 'right' | 'core' | 'data' | 'signal';
  /** Padding, any CSS length. */
  pad?: string | number;
  minHeight?: string | number;
  /** Element tag; defaults to section. */
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export function GradientField(props: GradientFieldProps): JSX.Element;
