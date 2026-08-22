import React from 'react';

export function Sheet({ children, pad = 64, maxWidth = 'var(--container-prose)', gradient, style, ...rest }) {
  return (
    <section style={{
      background: gradient ? 'var(--grad-sheet)' : 'var(--surface-sheet)', color: 'var(--text-body-on-light)',
      padding: pad, boxSizing: 'border-box', ...style,
    }} {...rest}>
      <div style={{ maxWidth, margin: '0 auto' }}>{children}</div>
    </section>
  );
}
