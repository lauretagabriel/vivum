import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Input({ label, hint, error, icon, value, defaultValue, placeholder, type = 'text', disabled, onChange, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const line = error ? 'var(--vv-amber)' : focus ? 'var(--vv-blue)' : 'var(--line-hairline)';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-sans)', ...style }}>
      {label ? <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color: 'var(--text-label)' }}>{label}</span> : null}
      <span style={{
        display: 'flex', alignItems: 'center', gap: 10, height: 40, padding: '0 12px', boxSizing: 'border-box',
        background: 'var(--vv-ice-04)', border: `1px solid ${line}`, borderRadius: 'var(--radius-sm)',
        boxShadow: focus ? 'inset 0 0 0 1px var(--vv-blue-24)' : 'none', opacity: disabled ? 0.4 : 1,
        transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      }}>
        {icon ? <Icon name={icon} size={16} color="var(--text-caption)" /> : null}
        <input
          type={type} value={value} defaultValue={defaultValue} placeholder={placeholder} disabled={disabled} onChange={onChange}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, background: 'transparent', border: 0, outline: 'none', padding: 0,
            fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-heading)', letterSpacing: '0.01em',
          }}
          {...rest}
        />
      </span>
      {(error || hint) ? (
        <span style={{ fontSize: 12, color: error ? 'var(--vv-amber)' : 'var(--text-caption)', lineHeight: 1.4 }}>{error || hint}</span>
      ) : null}
    </label>
  );
}
