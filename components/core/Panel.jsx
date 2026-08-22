import React from 'react';

const VARIANTS = {
  panel: { background: 'var(--surface-panel)', border: '1px solid transparent', color: 'var(--text-body)' },
  quiet: { background: 'var(--surface-panel-quiet)', border: '1px solid var(--line-hairline)', color: 'var(--text-body)' },
  outline: { background: 'transparent', border: '1px solid var(--line-hairline)', color: 'var(--text-body)' },
  raised: { background: 'var(--surface-raised)', border: '1px solid var(--line-hairline)', color: 'var(--text-body)' },
  sheet: { background: 'var(--surface-sheet)', border: '1px solid transparent', color: 'var(--text-body-on-light)' },
};

export function Panel({ children, variant = 'panel', pad = 24, title, meta, actions, style, ...rest }) {
  const v = VARIANTS[variant] || VARIANTS.panel;
  return (
    <section style={{ borderRadius: 'var(--radius-sm)', boxSizing: 'border-box', ...v, ...style }} {...rest}>
      {(title || actions) ? (
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          padding: `${Math.max(14, pad - 6)}px ${pad}px`,
          borderBottom: `1px solid ${variant === 'sheet' ? 'var(--line-on-light)' : 'var(--line-hairline)'}`,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
            {title ? <h4 style={{ margin: 0, fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', color: variant === 'sheet' ? 'var(--text-heading-on-light)' : 'var(--text-heading)' }}>{title}</h4> : null}
            {meta ? <span style={{ fontSize: 12, color: 'var(--text-caption)', letterSpacing: '0.02em' }}>{meta}</span> : null}
          </div>
          {actions ? <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 'none' }}>{actions}</div> : null}
        </header>
      ) : null}
      <div style={{ padding: pad }}>{children}</div>
    </section>
  );
}
