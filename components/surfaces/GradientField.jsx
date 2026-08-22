import React from 'react';

const FIELDS = {
  /* `none` is the off switch: call sites keep their `field` name in a comment so a bloom can be
     put back by deleting one word. Every entry below is still live and still supported. */
  none: 'none',
  signature: 'var(--grad-signature)', horizon: 'var(--grad-horizon)', sweep: 'var(--grad-sweep)',
  well: 'var(--grad-well)', aperture: 'var(--grad-aperture)', ember: 'var(--grad-ember)',
  twin: 'var(--grad-twin)', strata: 'var(--grad-strata)', abyss: 'var(--grad-abyss)',
  /* Blooms end at transparent: they compose over the canvas so sections never hard-cut. */
  crest: 'var(--bloom-crest)', base: 'var(--bloom-base)', left: 'var(--bloom-left)',
  right: 'var(--bloom-right)', core: 'var(--bloom-core)', data: 'var(--bloom-data)', signal: 'var(--bloom-signal)',
};
const BLOOMS = ['crest', 'base', 'left', 'right', 'core', 'data', 'signal'];

export function GradientField({ children, field = 'signature', pad, minHeight, as = 'section', style, ...rest }) {
  const Tag = as;
  return (
    <Tag style={{
      position: 'relative', background: FIELDS[field] || FIELDS.signature,
      backgroundColor: BLOOMS.includes(field) || field === 'none' ? 'transparent' : undefined,
      color: 'var(--text-body)', padding: pad, minHeight, boxSizing: 'border-box', ...style,
    }} {...rest}>{children}</Tag>
  );
}
