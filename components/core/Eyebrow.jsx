import React from 'react';

const SIZES = { sm: { font: 11, rule: 32, gap: 12 }, md: { font: 13, rule: 56, gap: 16 }, slide: { font: 24, rule: 56, gap: 20 } };

export function Eyebrow({ children, size = 'md', rule = true, ruleWeight, labelTone = 'graphite', style, ...rest }) {
  const s = SIZES[size] || SIZES.md;
  /* The rule is always amber — it is the brand's marker, and one accent colour across every
     section header is what makes the eyebrow read as a system element rather than a label. */
  /* Graphite is right on the flat canvas and wrong on a lit translucent fill, where it
     falls to about 1.8:1 — labelTone="ice" is for those surfaces (GlassSlab). */
  const labelColor = labelTone === 'ice' ? 'var(--vv-ice-72)' : 'var(--text-label)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: s.gap, ...style }} {...rest}>
      {rule ? <span style={{ display: 'block', width: s.rule, height: ruleWeight != null ? ruleWeight : (size === 'slide' ? 4 : 1), background: 'var(--vv-amber)', flex: 'none' }} /> : null}
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: s.font, fontWeight: 600,
        letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color: labelColor, lineHeight: 1.2,
      }}>{children}</span>
    </div>
  );
}
