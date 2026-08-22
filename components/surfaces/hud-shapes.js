import React from 'react';

/* The chamfered silhouette behind Bezel: top-right and bottom-left corners cut.

   Why SVG rather than CSS: an outline made of rotated 1px divs cannot close cleanly — a
   rotated div's ends land half a pixel off the straight edge it meets, so the diagonals
   show as gaps or overhangs — and a plain `border` is sliced off wherever `clip-path` cuts
   a corner. One continuous path with miter joins is exact at any size, and insetting it by
   half the stroke width keeps the line fully inside the element box. */

const n = (v) => Math.round(v * 100) / 100;

/* Corner points, clockwise from the top-left, with two corners cut. */
function corners(w, h, c) {
  return [[0, 0], [w - c, 0], [w, c], [w, h], [c, h], [0, h - c]];
}

const toPath = (pts, o) => 'M' + pts.map(([x, y]) => `${n(x + o)} ${n(y + o)}`).join(' L') + ' Z';

/* `fill` and `clip` cover the element exactly; `stroke` is inset half a line so the
   1px outline lands inside the box rather than straddling its edge. */
export function hudGeometry(w, h, cut) {
  const cap = (bw, bh) => Math.max(0, Math.min(cut, Math.min(bw, bh) / 2 - 1));
  const outer = corners(w, h, cap(w, h));
  return {
    fill: toPath(outer, 0),
    stroke: toPath(corners(w - 1, h - 1, cap(w - 1, h - 1)), 0.5),
    clip: 'polygon(' + outer.map(([x, y]) => `${n(x)}px ${n(y)}px`).join(', ') + ')',
  };
}

/* The geometry is in real pixels, so it needs the rendered box. Returns null until the
   first measurement, which callers use to skip drawing for one frame. */
export function useElementSize(ref) {
  const [size, setSize] = React.useState(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const w = el.offsetWidth, h = el.offsetHeight;
      setSize((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

/* The frame overlay: an optional translucent plate, then the outline on top. */
export function HudOutline({ w, h, cut, fill, line, weight = 1 }) {
  const g = hudGeometry(w, h, cut);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true"
         style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
      {fill ? <path d={g.fill} style={{ fill }} /> : null}
      <path d={g.stroke} fill="none" stroke={line} strokeWidth={weight}
            strokeLinejoin="miter" strokeLinecap="butt" shapeRendering="geometricPrecision" />
    </svg>
  );
}
