import React from 'react';
import { Icon } from '../core/Icon.jsx';

const SIZES = { sm: 24, md: 40, lg: 56, slide: 44 };

export function Stat({ value, label, unit, delta, deltaTone = 'blue', size = 'md', mono, style, ...rest }) {
  const fs = SIZES[size] || SIZES.md;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-sans)', ...style }} {...rest}>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{
          fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)', fontSize: fs, fontWeight: 700,
          letterSpacing: 'var(--track-title)', lineHeight: 1, color: 'var(--text-heading)',
        }}>{value}</span>
        {unit ? <span style={{ fontSize: Math.round(fs * 0.36), fontWeight: 500, color: 'var(--text-caption)' }}>{unit}</span> : null}
      </span>
      {label ? (
        <span style={{ fontSize: size === 'slide' ? 24 : 11, fontWeight: 600, letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color: 'var(--text-label)' }}>{label}</span>
      ) : null}
      {delta ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: deltaTone === 'amber' ? 'var(--vv-amber)' : deltaTone === 'graphite' ? 'var(--vv-graphite)' : 'var(--vv-blue)' }}>
          <Icon name={String(delta).trim().startsWith('-') ? 'trending_down' : 'trending_up'} size={13} />
          {delta}
        </span>
      ) : null}
    </div>
  );
}
