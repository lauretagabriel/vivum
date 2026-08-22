import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function SideNav({ logoSrc, sections = [], activeId, onSelect, footer, width = 244, style, ...rest }) {
  return (
    <aside style={{
      width, flex: 'none', boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
      background: 'var(--surface-canvas)', borderRight: '1px solid var(--line-hairline)', ...style,
    }} {...rest}>
      <div style={{ height: 64, display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid var(--line-hairline)', flex: 'none' }}>
        {logoSrc
          ? <img src={logoSrc} alt="Vivum" style={{ height: 20, display: 'block' }} />
          : <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--vv-ice)' }}>VIVUM</span>}
      </div>
      <nav style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }}>
        {sections.map((s, si) => (
          <div key={s.label || si} style={{ marginBottom: 24 }}>
            {s.label ? (
              <div style={{ padding: '0 20px 10px', fontSize: 10, fontWeight: 600, letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color: 'var(--text-label)' }}>{s.label}</div>
            ) : null}
            {(s.items || []).map((it) => {
              const active = it.id === activeId;
              return (
                <button key={it.id} onClick={() => onSelect && onSelect(it.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 11, width: '100%', boxSizing: 'border-box',
                    padding: '0 20px', height: 38, background: active ? 'var(--vv-ice-04)' : 'transparent',
                    border: 0, borderLeft: `2px solid ${active ? 'var(--vv-amber)' : 'transparent'}`,
                    color: active ? 'var(--vv-ice)' : 'var(--text-secondary)', cursor: 'pointer',
                    fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: active ? 500 : 400, textAlign: 'left',
                    transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
                  }}>
                  {it.icon ? <Icon name={it.icon} size={16} /> : null}
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'more_horiz' }}>{it.label}</span>
                  {it.trailing}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      {footer ? <div style={{ padding: 16, borderTop: '1px solid var(--line-hairline)', flex: 'none' }}>{footer}</div> : null}
    </aside>
  );
}
