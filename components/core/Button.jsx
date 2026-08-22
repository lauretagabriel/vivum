import React from 'react';
import { Icon } from './Icon.jsx';

const SIZES = {
  sm: { height: 32, padX: 14, font: 13, icon: 16, gap: 7 },
  md: { height: 40, padX: 20, font: 14, icon: 18, gap: 9 },
  lg: { height: 48, padX: 26, font: 16, icon: 20, gap: 10 },
};

/* One button, four colourways. Every variant is the same object — a square 1px rule, a 7%
   wash of its own colour behind it, and a label in that same colour — so primary and
   secondary always read as a matched pair, and amber stays a lit edge rather than a slab.
   Hover lifts the wash to 14%; nothing else moves. */
const VARIANTS = {
  primary: { line: 'var(--vv-amber)', wash: 'var(--vv-amber-07)', washHover: 'var(--vv-amber-14)', fg: 'var(--vv-amber)' },
  secondary: { line: 'var(--vv-ice)', wash: 'var(--vv-ice-07)', washHover: 'var(--vv-ice-14)', fg: 'var(--vv-ice)' },
  /* Text only — no rule, no wash at rest. For tertiary actions in a row. */
  quiet: { line: 'transparent', wash: 'transparent', washHover: 'var(--vv-ice-04)', fg: 'var(--action-quiet-fg)' },
  onLight: { line: 'var(--vv-deep-navy)', wash: 'var(--vv-navy-07)', washHover: 'var(--vv-navy-24)', fg: 'var(--vv-deep-navy)' },
};

export function Button({ children, variant = 'primary', size = 'md', icon, iconAfter, fullWidth, disabled, href, onClick, style, ...rest }) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href} onClick={disabled ? undefined : onClick} disabled={href ? undefined : disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex', width: fullWidth ? '100%' : undefined,
        alignItems: 'center', justifyContent: 'center', gap: s.gap, boxSizing: 'border-box',
        height: s.height, padding: `0 ${s.padX}px`, borderRadius: 0,
        fontFamily: 'var(--font-sans)', fontSize: s.font, fontWeight: 400, lineHeight: 1,
        letterSpacing: '0.01em', textDecoration: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        border: `1px solid ${v.line}`, color: v.fg,
        background: hover && !disabled ? v.washHover : v.wash,
        opacity: disabled ? 0.38 : 1,
        transform: press && !disabled ? 'scale(var(--press-scale))' : 'none',
        transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-instant) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      {icon ? <Icon name={icon} size={s.icon} /> : null}
      {children}
      {iconAfter ? <Icon name={iconAfter} size={s.icon} /> : null}
    </Tag>
  );
}
