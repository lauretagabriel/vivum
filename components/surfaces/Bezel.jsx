import React from 'react';
import { hudGeometry, useElementSize, HudOutline } from './hud-shapes.js';

/* A chamfered outline frame — the instrument-bezel silhouette with nothing inside it:
   top-right and bottom-left cut, and whatever sits behind, a video plate or a gradient
   field, shows straight through.

   The outline is a single SVG path rather than a border or a stack of divs: `clip-path`
   slices a real border off at the cuts, and rotated 1px divs cannot close cleanly against
   the straight edges they meet. One path with miter joins is exact at any size.

   `plateSrc` puts a video inside the frame: the frame's own polygon clips it, and it still
   carries the `--plate-feather` alpha mask, so the footage fades out before it reaches the
   outline rather than stopping against it. The plate keeps its own size —
   `plateScale`/`plateShift` place it, and anything past the cut edge is clipped.

   `decor` is the same idea for arbitrary art: whatever you pass is absolutely positioned
   against the frame and clipped by the polygon, so a mark can be deliberately hung past an
   edge and the chamfer crops it — no overflow, no separate wrapper at the call site. */
export function Bezel({
  children, chamfer = 36, pad = '52px 56px', weight = 1, color = 'var(--line-strong)', accent = true,
  minHeight, plateSrc, plateOpacity = 0.45, plateShift, plateScale, fill, blur, decor, style, ...rest
}) {
  const hostRef = React.useRef(null);
  const box = useElementSize(hostRef);
  const clip = box ? hudGeometry(box.w, box.h, chamfer).clip : undefined;
  const transforms = [
    plateShift ? `translateX(${plateShift})` : null,
    plateScale && plateScale !== 1 ? `scale(${plateScale})` : null,
  ].filter(Boolean).join(' ');
  return (
    <div ref={hostRef} style={{ position: 'relative', minHeight, boxSizing: 'border-box', ...style }} {...rest}>
      {/* Fill and blur belong to the chamfered silhouette, not the host box — both ride the
         same polygon as the outline so the corners stay cut. */}
      {clip && (fill || blur) ? (
        <span aria-hidden="true" style={{
          position: 'absolute', inset: 0, clipPath: clip, pointerEvents: 'none',
          ...(fill ? { background: fill } : null),
          ...(blur ? { backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` } : null),
        }} />
      ) : null}
      {plateSrc && clip ? (
        <span style={{ position: 'absolute', inset: 0, clipPath: clip, overflow: 'hidden', pointerEvents: 'none' }}>
          <video src={plateSrc} autoPlay muted loop playsInline style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            filter: `var(--plate-filter-base) opacity(${plateOpacity})`,
            maskImage: 'var(--plate-feather)', WebkitMaskImage: 'var(--plate-feather)',
            ...(transforms ? { transform: transforms } : null),
          }} />
        </span>
      ) : null}
      {decor && clip ? (
        <span aria-hidden="true" style={{ position: 'absolute', inset: 0, clipPath: clip, overflow: 'hidden', pointerEvents: 'none' }}>{decor}</span>
      ) : null}
      {box ? <HudOutline w={box.w} h={box.h} cut={chamfer} line={color} weight={weight} /> : null}
      {accent ? <span style={{ position: 'absolute', left: 0, top: 0, width: 56, height: 3, background: 'var(--vv-amber)', pointerEvents: 'none' }} /> : null}
      <div style={{ position: 'relative', padding: pad, boxSizing: 'border-box' }}>{children}</div>
    </div>
  );
}
