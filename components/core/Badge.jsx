import React from 'react';

const TONES = {
  blue: 'var(--vv-blue)', amber: 'var(--vv-amber)', graphite: 'var(--vv-graphite)', ice: 'var(--vv-ice)',
};

export function Badge({ children, tone = 'blue', variant = 'outline', mono, style, ...rest }) {
  const c = TONES[tone] || TONES.blue;
  const fills = {
    outline: { background: 'transparent', border: `1px solid ${c}`, color: c },
    solid: { background: c, border: `1px solid ${c}`, color: 'var(--vv-deep-navy)' },
    quiet: { background: 'var(--vv-ice-08)', border: '1px solid transparent', color: c },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 8px',
      borderRadius: 'var(--radius-sm)', fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap',
      ...(fills[variant] || fills.outline), ...style,
    }} {...rest}>{children}</span>
  );
}
