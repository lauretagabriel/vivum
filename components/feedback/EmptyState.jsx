import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function EmptyState({ icon = 'radar', title, children, action, style, ...rest }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
      padding: '56px 32px', textAlign: 'center', background: 'var(--surface-panel-quiet)',
      border: '1px solid var(--line-hairline)', borderRadius: 'var(--radius-sm)', boxSizing: 'border-box', ...style,
    }} {...rest}>
      <Icon name={icon} size={26} color="var(--vv-graphite)" />
      {title ? <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-heading)' }}>{title}</span> : null}
      {children ? <p style={{ margin: 0, maxWidth: 380, fontSize: 13, lineHeight: 1.5, color: 'var(--text-caption)' }}>{children}</p> : null}
      {action ? <div style={{ marginTop: 6 }}>{action}</div> : null}
    </div>
  );
}
