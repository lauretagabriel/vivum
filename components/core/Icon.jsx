import React from 'react';
import { iconGlyphs } from './icon-paths.js';

/* FontAwesome Light — the system's icon face. The hairline stroke matches the 1px borders and
   the thin type used across the brand far better than a font-based icon set, and rendering the
   glyphs as inline SVG (rather than an icon font) means they scale and take `color` without a
   webfont load.

   Names are semantic. ICON_ALIAS keeps the Material-era names that the kits were written
   against pointing at their chosen FA replacement, so both spellings work:
       <Icon name="dna" />  ===  <Icon name="biotech" />
   `weight` is accepted and ignored — the light set has one weight. */
const ICON_ALIAS = {
  autorenew: 'arrows-rotate', schedule: 'clock', hub: 'circle-nodes', biotech: 'dna',
  speed: 'gauge-high', developer_board: 'microchip', flight: 'drone',
  arrow_forward: 'arrow-right', arrow_back: 'arrow-left', north_east: 'arrow-up-right',
  download: 'arrow-down-to-line', upload: 'arrow-up-from-line', fullscreen: 'expand',
  warning: 'triangle-exclamation', undo: 'arrow-rotate-left', account_tree: 'sitemap',
  monitoring: 'chart-line', notifications: 'bell', settings: 'gear',
  logout: 'arrow-right-from-bracket', person: 'user', search: 'magnifying-glass',
  search_off: 'magnifying-glass', close: 'xmark', visibility: 'eye', memory_alt: 'memory',
};

export function Icon({ name, size = 20, color = 'currentColor', filled, weight, style, ...rest }) {
  const key = iconGlyphs[name] ? name : ICON_ALIAS[name];
  const glyph = key ? iconGlyphs[key] : null;
  if (!glyph) return null;
  const [viewBox, d] = glyph;
  return (
    <svg aria-hidden="true" viewBox={viewBox} width={size} height={size} focusable="false"
      style={{ display: 'inline-block', flex: 'none', color, verticalAlign: 'middle', ...style }}
      {...rest}
    ><path d={d} fill="currentColor" /></svg>
  );
}
