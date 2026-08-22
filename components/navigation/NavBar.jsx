import React from 'react';
import { Button } from '../core/Button.jsx';
import { Icon } from '../core/Icon.jsx';

/* Glass appears one header-height down (96px): the moment the first content actually
   passes under the bar, so the plate is a response to overlap, not a scroll counter.
   A 24px hysteresis band keeps it from flickering on trackpad micro-scrolls. */
const GLASS_AT = 96;

function useScrolledPast(threshold, enabled) {
  const [past, setPast] = React.useState(false);
  React.useEffect(() => {
    if (!enabled) { setPast(false); return undefined; }
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setPast((prev) => (prev ? y > threshold - 24 : y > threshold));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [threshold, enabled]);
  return past;
}

export function NavBar({ logoSrc, logoAlt = 'Vivum', brand = 'VIVUM', links = [], activeHref, cta, transparent, glassAt = GLASS_AT, onNavigate, style, ...rest }) {
  /* `transparent` means "start bare and earn the plate on scroll"; an opaque bar keeps its
     plate at rest, so pages that need a solid chrome are unchanged. */
  const scrolled = useScrolledPast(glassAt, !!transparent);
  const glass = transparent ? scrolled : true;
  return (
    <header style={{
      position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32,
      /* At rest the bar has extra top room to breathe against the hero, so its padding is
         deliberately top-heavy. Scrolled, the plate becomes a compact band with symmetric
         padding — lopsided padding inside a centred flex row reads as a misaligned bar. */
      padding: glass ? '14px var(--gutter-site)' : '46px var(--gutter-site) 10px',
      minHeight: glass ? 68 : 96, boxSizing: 'border-box',
      /* No plate fill in either state — the bar is pure blur over the page, so it never
         reads as a band against the flat #001121 body. */
      backdropFilter: glass ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: glass ? 'blur(20px)' : 'none',
      /* No rule under the bar in either state. */
      borderBottom: '1px solid transparent',
      transition: 'background var(--dur-base) var(--ease-out), padding var(--dur-base) var(--ease-out), min-height var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), backdrop-filter var(--dur-base) var(--ease-out)',
      ...style,
    }} {...rest}>
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(links[0] && links[0].href); }} style={{ display: 'flex', alignItems: 'center', flex: 'none' }}>
        {logoSrc
          ? <img src={logoSrc} alt={logoAlt} style={{ height: 40, display: 'block' }} />
          : <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--vv-ice)' }}>{brand}</span>}
      </a>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 32, flex: 1, justifyContent: 'flex-end' }}>
        {links.map((l) => {
          const active = l.href === activeHref;
          return (
            <a key={l.href} href={l.href}
              onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(l.href); } }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500,
                color: active ? 'var(--vv-ice)' : 'var(--text-secondary)',
                borderBottom: `2px solid ${active ? 'var(--vv-amber)' : 'transparent'}`,
                /* The 2px rule and its gap hang below the label, so the text alone would sit
                   4px high of the logo and CTA it shares the row with. Matching top padding
                   puts the label back on the row's optical centre. */
                paddingBottom: 2, paddingTop: 4, transition: 'color var(--dur-fast) var(--ease-out)',
              }}>
              {l.label}
              {l.external ? <Icon name="north_east" size={13} /> : null}
            </a>
          );
        })}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
        {cta ? <Button variant="primary" size="sm" onClick={cta.onClick} href={cta.href}>{cta.label}</Button> : null}
      </div>
    </header>
  );
}
