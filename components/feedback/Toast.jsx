import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
import { StatusDot } from '../data/StatusDot.jsx';

export function Toast({ children, title, tone = 'live', onClose, mono, style, ...rest }) {
  return (
    <div role="status" style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, width: 360, maxWidth: '100%', boxSizing: 'border-box',
      padding: '14px 14px 14px 16px', background: 'var(--surface-panel)', border: '1px solid var(--line-strong)',
      borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-sans)',
      animation: 'vv-toast-in var(--dur-base) var(--ease-out) both', ...style,
    }} {...rest}>
      <StatusDot tone={tone} style={{ marginTop: 5 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
        {title ? <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-heading)' }}>{title}</span> : null}
        <span style={{ fontSize: 12.5, lineHeight: 1.45, color: 'var(--text-secondary)', fontFamily: mono ? 'var(--font-mono)' : 'inherit' }}>{children}</span>
      </div>
      {onClose ? <IconButton icon="close" label="Dismiss" size="sm" variant="ghost" onClick={onClose} /> : null}
      <style>{'@keyframes vv-toast-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}'}</style>
    </div>
  );
}
