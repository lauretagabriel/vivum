import React from 'react';

export function Footer({ markSrc, columns = [], legal = '© 2026 Vivum Computing, Inc. All rights reserved.', tagline, style, ...rest }) {
  return (
    <footer style={{
      background: 'var(--bloom-base)', backgroundColor: 'transparent',
      padding: '64px var(--gutter-site) 40px', boxSizing: 'border-box', ...style,
    }} {...rest}>
      <div style={{ display: 'flex', gap: 80, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 220 }}>
          {/* Belt and braces against the stretch: `align-self` keeps the box at its intrinsic
             width, and `maxWidth` holds the line even where a stale copy of this component is
             in play. Without them a column stretch pulls the box to full width and the SVG's
             xMidYMid centers the wordmark inside it, which reads as indented. */}
          {markSrc ? <img src={markSrc} alt="Vivum" style={{ height: 40, width: 'auto', maxWidth: 'max-content', alignSelf: 'flex-start', display: 'block' }} /> : <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--vv-ice)' }}>VIVUM</span>}
          {tagline ? <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--text-caption)', maxWidth: 260 }}>{tagline}</p> : null}
        </div>
        <div style={{ display: 'flex', gap: 72, flexWrap: 'wrap', flex: 1, justifyContent: 'flex-end' }}>
          {columns.map((c) => (
            <div key={c.label} style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 130 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color: 'var(--text-label)' }}>{c.label}</span>
              {(c.links || []).map((l) => (
                <a key={l.label} href={l.href || '#'} style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>{l.label}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginTop: 72, paddingTop: 0 }}>
        <span style={{ fontSize: 12, color: 'var(--text-caption)' }}>{legal}</span>
        <span style={{ fontSize: 12, color: 'var(--text-caption)', letterSpacing: '0.04em' }}>TECHNOLOGY EVOLVED</span>
      </div>
    </footer>
  );
}
