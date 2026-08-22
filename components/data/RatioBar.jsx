import React from 'react';

export function RatioBar({ segments = [], height = 12, legend = true, style, ...rest }) {
  const total = segments.reduce((s, x) => s + (x.value || 0), 0) || 1;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'var(--font-sans)', ...style }} {...rest}>
      <div style={{ display: 'flex', height, width: '100%' }}>
        {segments.map((s, i) => (
          <span key={i} title={s.label} style={{
            flex: s.value, background: s.color,
            border: s.outline ? '1px solid var(--line-strong)' : 'none', boxSizing: 'border-box',
          }} />
        ))}
      </div>
      {legend ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {segments.map((s, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-caption)' }}>
              <span style={{ width: 8, height: 8, background: s.color, flex: 'none', border: s.outline ? '1px solid var(--line-strong)' : 'none', boxSizing: 'border-box' }} />
              {s.label}
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{Math.round((s.value / total) * 100)}%</span>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
