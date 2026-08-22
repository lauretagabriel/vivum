import React from 'react';
import { Icon } from './Icon.jsx';

const SIZES = { sm: { box: 28, icon: 16 }, md: { box: 36, icon: 18 }, lg: { box: 44, icon: 20 } };

export function IconButton({ icon, label, size = 'md', variant = 'outline', active, disabled, onClick, style, ...rest }) {
  const s = SIZES[size] || SIZES.md;
  const [hover, setHover] = React.useState(false);
  const base = variant === 'outline'
    ? { background: 'transparent', border: '1px solid var(--action-secondary-line)' }
    : { background: 'transparent', border: '1px solid transparent' };
  return (
    <button
      aria-label={label} title={label} onClick={disabled ? undefined : onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: s.box, height: s.box, borderRadius: 'var(--radius-sm)', cursor: disabled ? 'not-allowed' : 'pointer',
        color: active ? 'var(--vv-amber)' : 'var(--text-secondary)', opacity: disabled ? 0.38 : 1,
        transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
        ...base,
        ...(hover && !disabled ? { background: 'var(--action-secondary-bg-hover)', color: 'var(--vv-ice)' } : null),
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={s.icon} />
    </button>
  );
}
