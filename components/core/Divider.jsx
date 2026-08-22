import React from 'react';

export function Divider({ orientation = 'horizontal', tone = 'hairline', spacing = 0, style, ...rest }) {
  const bg = tone === 'accent' ? 'var(--vv-amber)' : tone === 'fade' ? 'var(--grad-rule)' : tone === 'strong' ? 'var(--line-strong)' : 'var(--line-hairline)';
  const vertical = orientation === 'vertical';
  return (
    <span role="separator" style={{
      display: 'block', flex: 'none',
      width: vertical ? 1 : '100%', height: vertical ? '100%' : 1,
      background: bg, margin: vertical ? `0 ${spacing}px` : `${spacing}px 0`,
      ...style,
    }} {...rest} />
  );
}
