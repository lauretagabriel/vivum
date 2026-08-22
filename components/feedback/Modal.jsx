import React from 'react';
import { IconButton } from '../core/IconButton.jsx';

export function Modal({ open = true, title, meta, children, actions, onClose, width = 520, style, ...rest }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--vv-navy-72)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', padding: 24, zIndex: 40,
    }} onClick={onClose}>
      <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
        style={{
          width, maxWidth: '100%', background: 'var(--surface-panel)', border: '1px solid var(--line-strong)',
          borderRadius: 'var(--radius-sm)', boxSizing: 'border-box',
          animation: 'vv-modal-in var(--dur-base) var(--ease-out) both', ...style,
        }} {...rest}>
        <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '20px 24px', borderBottom: '1px solid var(--line-hairline)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {title ? <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-heading)' }}>{title}</h3> : null}
            {meta ? <span style={{ fontSize: 12, color: 'var(--text-caption)' }}>{meta}</span> : null}
          </div>
          {onClose ? <IconButton icon="close" label="Close" size="sm" variant="ghost" onClick={onClose} /> : null}
        </header>
        <div style={{ padding: 24, fontSize: 14, lineHeight: 1.55, color: 'var(--text-body)' }}>{children}</div>
        {actions ? (
          <footer style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '16px 24px', borderTop: '1px solid var(--line-hairline)' }}>{actions}</footer>
        ) : null}
        <style>{'@keyframes vv-modal-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}'}</style>
      </div>
    </div>
  );
}
