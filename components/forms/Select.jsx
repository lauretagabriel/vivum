import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Select({ label, hint, options = [], value, defaultValue, disabled, onChange, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-sans)', ...style }}>
      {label ? <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color: 'var(--text-label)' }}>{label}</span> : null}
      <span style={{
        position: 'relative', display: 'flex', alignItems: 'center', height: 40, boxSizing: 'border-box',
        background: 'var(--vv-ice-04)', border: `1px solid ${focus ? 'var(--vv-blue)' : 'var(--line-hairline)'}`,
        borderRadius: 'var(--radius-sm)', opacity: disabled ? 0.4 : 1,
        transition: 'border-color var(--dur-fast) var(--ease-out)',
      }}>
        <select
          value={value} defaultValue={defaultValue} disabled={disabled} onChange={onChange}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            appearance: 'none', WebkitAppearance: 'none', flex: 1, minWidth: 0, height: '100%',
            background: 'transparent', border: 0, outline: 'none', padding: '0 34px 0 12px',
            fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-heading)', cursor: 'pointer',
          }}
          {...rest}
        >
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value} style={{ background: 'var(--vv-slate)', color: 'var(--vv-ice)' }}>{opt.label}</option>;
          })}
        </select>
        <Icon name="keyboard_arrow_down" size={16} color="var(--text-caption)" style={{ position: 'absolute', right: 11, pointerEvents: 'none' }} />
      </span>
      {hint ? <span style={{ fontSize: 12, color: 'var(--text-caption)' }}>{hint}</span> : null}
    </label>
  );
}
