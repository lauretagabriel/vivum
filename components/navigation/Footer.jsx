import React from 'react';

/* Mobile breakpoint for footer layout */
function useNarrow(q) {
  const [hit, setHit] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${q}px)`);
    const on = () => setHit(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return hit;
}

export function Footer({ markSrc, columns = [], legal = '© 2026 Vivum Computing, Inc. All rights reserved.', tagline, style, ...rest }) {
  const mobile = useNarrow(640);
  return (
    <footer style={{
      background: 'var(--bloom-base)', backgroundColor: 'transparent',
      padding: mobile ? '48px var(--gutter-site) 32px' : '64px var(--gutter-site) 40px',
      boxSizing: 'border-box', ...style,
    }} {...rest}>
      <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: mobile ? 40 : 80, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: mobile ? 0 : 220, width: mobile ? '100%' : undefined }}>
          {/* Belt and braces against the stretch: `align-self` keeps the box at its intrinsic
             width, and `maxWidth` holds the line even where a stale copy of this component is
             in play. Without them a column stretch pulls the box to full width and the SVG's
             xMidYMid centers the wordmark inside it, which reads as indented. */}
          {markSrc ? <img src={markSrc} alt="Vivum" style={{ height: 40, width: 'auto', maxWidth: 'max-content', alignSelf: 'flex-start', display: 'block' }} /> : <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--vv-ice)' }}>VIVUM</span>}
          {tagline ? <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--text-caption)', maxWidth: 260 }}>{tagline}</p> : null}
        </div>
        <div style={{ display: 'flex', gap: mobile ? 32 : 72, flexWrap: 'wrap', flex: mobile ? undefined : 1, justifyContent: mobile ? 'flex-start' : 'flex-end', width: mobile ? '100%' : undefined }}>
          {columns.map((c) => (
            <div key={c.label} style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: mobile ? 0 : 130 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color: 'var(--text-label)' }}>{c.label}</span>
              {(c.links || []).map((l) => (
                <a key={l.label} href={l.href || '#'} style={{ fontSize: 13.5, color: 'var(--text-secondary)', textDecoration: 'none' }}>{l.label}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: mobile ? 8 : 16, marginTop: mobile ? 40 : 72, paddingTop: 0 }}>
        <span style={{ fontSize: 12, color: 'var(--text-caption)' }}>{legal}</span>
        <span style={{ fontSize: 12, color: 'var(--text-caption)', letterSpacing: '0.04em' }}>TECHNOLOGY EVOLVED</span>
      </div>
    </footer>
  );
}
