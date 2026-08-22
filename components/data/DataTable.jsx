import React from 'react';

export function DataTable({ columns = [], rows = [], dense, onLight, style, ...rest }) {
  const line = onLight ? 'var(--line-on-light)' : 'var(--line-hairline)';
  const padY = dense ? 9 : 13;
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)', ...style }} {...rest}>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} style={{
              textAlign: c.align || 'left', padding: `10px 16px`, background: onLight ? 'transparent' : 'var(--vv-ice-04)',
              borderBottom: `1px solid ${line}`, fontSize: 11, fontWeight: 600, letterSpacing: 'var(--track-label)',
              textTransform: 'uppercase', color: 'var(--text-label)', whiteSpace: 'nowrap',
            }}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.id || i}>
            {columns.map((c) => (
              <td key={c.key} style={{
                textAlign: c.align || 'left', padding: `${padY}px 16px`, borderBottom: `1px solid ${line}`,
                fontSize: 13, lineHeight: 1.4, whiteSpace: c.wrap ? 'normal' : 'nowrap',
                fontFamily: c.mono ? 'var(--font-mono)' : 'var(--font-sans)',
                letterSpacing: c.mono ? 'var(--track-mono)' : '0',
                color: c.tone === 'muted' ? 'var(--text-caption)' : c.tone === 'data' ? 'var(--text-data)' : onLight ? 'var(--text-body-on-light)' : 'var(--text-heading)',
              }}>{r[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
