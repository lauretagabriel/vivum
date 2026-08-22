import React from 'react';

const TONES = {
  live: 'var(--status-live)', attention: 'var(--status-attention)',
  idle: 'var(--status-idle)', ok: 'var(--status-ok)',
};

export function StatusDot({ children, tone = 'live', pulse, mono, style, ...rest }) {
  const c = TONES[tone] || TONES.live;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)', ...style }} {...rest}>
      <span style={{ position: 'relative', display: 'inline-flex', width: 7, height: 7, flex: 'none' }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius-full)', background: c }} />
        {pulse ? <span style={{ position: 'absolute', inset: -3, borderRadius: 'var(--radius-full)', border: `1px solid ${c}`, opacity: 0.5, animation: 'vv-pulse 2s var(--ease-field) infinite' }} /> : null}
      </span>
      {children}
      <style>{'@keyframes vv-pulse{0%{transform:scale(0.7);opacity:0.7}70%{transform:scale(1.25);opacity:0}100%{opacity:0}}'}</style>
    </span>
  );
}
