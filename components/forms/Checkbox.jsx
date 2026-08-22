import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Checkbox({ label, hint, checked, defaultChecked, disabled, onChange, style, ...rest }) {
  const [on, setOn] = React.useState(defaultChecked || false);
  const isOn = checked === undefined ? on : checked;
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, fontFamily: 'var(--font-sans)', ...style }}>
      <input
        type="checkbox" checked={isOn} disabled={disabled}
        onChange={(e) => { if (checked === undefined) setOn(e.target.checked); onChange && onChange(e); }}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        {...rest}
      />
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
        width: 16, height: 16, marginTop: 2, borderRadius: 'var(--radius-sm)',
        background: isOn ? 'var(--vv-amber)' : 'var(--vv-ice-04)',
        border: `1px solid ${isOn ? 'var(--vv-amber)' : 'var(--line-strong)'}`,
        transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
      }}>
        {isOn ? <Icon name="check" size={12} color="var(--vv-deep-navy)" /> : null}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {label ? <span style={{ fontSize: 14, color: 'var(--text-heading)', lineHeight: 1.35 }}>{label}</span> : null}
        {hint ? <span style={{ fontSize: 12, color: 'var(--text-caption)', lineHeight: 1.4 }}>{hint}</span> : null}
      </span>
    </label>
  );
}
