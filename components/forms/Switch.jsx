import React from 'react';

export function Switch({ label, hint, checked, defaultChecked, disabled, onChange, style, ...rest }) {
  const [on, setOn] = React.useState(defaultChecked || false);
  const isOn = checked === undefined ? on : checked;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setOn(!isOn);
    onChange && onChange(!isOn);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, fontFamily: 'var(--font-sans)', opacity: disabled ? 0.4 : 1, ...style }} {...rest}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
        {label ? <span style={{ fontSize: 14, color: 'var(--text-heading)' }}>{label}</span> : null}
        {hint ? <span style={{ fontSize: 12, color: 'var(--text-caption)', lineHeight: 1.4 }}>{hint}</span> : null}
      </div>
      <button
        role="switch" aria-checked={isOn} aria-label={typeof label === 'string' ? label : 'Toggle'} onClick={toggle} disabled={disabled}
        style={{
          position: 'relative', flex: 'none', width: 40, height: 20, padding: 2, boxSizing: 'border-box',
          borderRadius: 'var(--radius-sm)', cursor: disabled ? 'not-allowed' : 'pointer',
          background: isOn ? 'var(--vv-blue)' : 'var(--vv-ice-08)',
          border: `1px solid ${isOn ? 'var(--vv-blue)' : 'var(--line-strong)'}`,
          transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
        }}
      >
        <span style={{
          display: 'block', width: 14, height: 14, borderRadius: 1,
          background: isOn ? 'var(--vv-ice)' : 'var(--vv-graphite)',
          transform: `translateX(${isOn ? 20 : 0}px)`,
          transition: 'transform var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
        }} />
      </button>
    </div>
  );
}
