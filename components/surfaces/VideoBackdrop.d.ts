/**
 * The signature Vivum surface: looping video plate + navy gradient scrim + type on top.
 */
export interface VideoBackdropProps {
  children?: React.ReactNode;
  /** Video URL. Muted, looping, autoplaying, inline. */
  src?: string;
  /** Poster frame; used alone when no video is supplied. */
  poster?: string;
  /** bottom (text at the base) · left (text at the left) · vignette · flood · cinema (letterbox fades). */
  scrim?: 'bottom' | 'left' | 'vignette' | 'flood' | 'cinema' | 'none';
  minHeight?: string | number;
  /** Where the content block sits vertically. */
  align?: 'start' | 'center' | 'end';
  pad?: string | number;
  /** Adds a 4% ice overlay-blend haze — use sparingly on very clean plates. */
  grain?: boolean;
  /** Fades the top and bottom edges into the canvas so the plate never hard-cuts against the section above or below. On by default; turn off only for a plate that fills the whole viewport. */
  edgeFade?: boolean;
  /** A bottom-anchored gradient that reaches the canvas colour at full opacity — lands a full-height plate on the page and backs bottom-aligned type. `true` for 58% of the section height, or any CSS length. Use instead of `edgeFade` when the plate fills the viewport. */
  foot?: boolean | string;
  /** Feathers the plate with a radial alpha mask so it dissolves into the canvas on all four edges — no rectangle, no hard cut. */
  circleMask?: boolean;
  /** Overrides the plate's 10% default hold, e.g. 0.45 for a more present plate. */
  plateOpacity?: number;
  /** Moves the plate right, e.g. '40%' to push footage off the text column. With circleMask the plate's box is inset instead of translated, so its feathered edges stay inside the section. */
  plateShift?: string;
  /** Which side `plateShift` moves the plate toward. Default 'right'; 'left' mirrors it for a text-on-the-right layout; 'center' makes `plateShift` a symmetric inset (circleMask only). */
  plateSide?: 'left' | 'right' | 'center';
  /** Scales the plate and its mask around their own centre, e.g. 1.3. Default 1. */
  plateScale?: number;
  /** Pushes the plate down its section by any CSS length, e.g. '96px' — keeps a feathered plate clear of the section above without clipping its falloff. */
  plateDrop?: string | number;
  /** Lets a feathered plate finish past the section's edges instead of being clipped into a hard cut — it overflows into the section below, pointer-transparent. Only for circleMask plates. */
  bleed?: boolean;
  style?: React.CSSProperties;
}
export function VideoBackdrop(props: VideoBackdropProps): JSX.Element;
