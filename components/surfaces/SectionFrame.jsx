import React from 'react';
import { Bezel } from './Bezel.jsx';

/* The chamfered frame every marketing section sits in — Bezel plus the one alignment recipe
   they all have to agree on.

   Each section used to hand-roll its own padding, copy cap and inset math, and the two that
   sit above each other on the home page drifted apart: one derived a left inset from its own
   slack space, the other kept balanced padding, so the headlines started at different x. The
   rule here is the settled one: THE COPY IS ALWAYS FLUSH TO THE FRAME'S LEFT PADDING. Slack
   is never spent on a left inset — a left-only margin inside a frame just reads as lopsided
   padding — it is spent pulling `reserve`d decoration inward instead.

   `reserve` is the width of art hung inside the frame (the bio tree). It shortens the copy's
   measure without moving its left edge.

   Once the copy hits its cap the frame has width to spare, and that slack goes into the SIDE
   PADDINGS — not into a wider gutter or dead space behind the art. Two rules make that safe
   across sibling sections:

   1. The grown padding is derived from the SHARED page container and the copy cap alone —
      never from the frame's own width, and never from `reserve`. Sections are different
      widths (this one is full-bleed, the mission copy sits in a 2-col grid) and carry
      different art, so anything self-referential gives each frame a different inset and the
      headlines drift apart again — the exact bug this component exists to kill.
   2. The expression is percentage-free. `var()` substitution is textual, so a `%` inside a
      custom property resolves against whatever element finally uses it; only vw/px units
      resolve to the same number in every frame.

   So the copy stays flush to the left padding, hung art stays flush to the right padding, and
   every framed section grows by the same amount at the same moment — which also means the
   padding must not be gated on `stacked`, or any other per-section state (see below). Below
   the crossover the clamp floor wins and nothing moves. Growth is capped (`padGrowMax`)
   because the narrower grid-column frames share the value and still need a usable measure.

   Published as custom properties so callers position decoration and corner links off the
   frame instead of re-deriving it:
     --sf-pad-x / --sf-pad-y   the frame's resolved padding
     --sf-gap                  the copy column's row gap
     --sf-copy-max             the resolved copy measure
     --sf-decor-right          where reserved art should sit, in FRAME coordinates */
// The one padding token. It used to have a shorter vertical partner, which read as lopsided
// once the horizontal side grew past it on a wide screen — so vertical padding now defaults to
// whatever the horizontal side resolves to, and the frame stays square on all four sides at
// every width.
const PAD_X = 'clamp(28px, 5vw, 72px)';
// The shared content column, in viewport units — mirrors `maxWidth: var(--container-site)`
// inside `padding: var(--gutter-site)`. `100vw` counts a classic scrollbar that the container
// does not, so this can read a shade wide; it reads wide by the SAME amount in every frame,
// which is what matters here.
const CONTENT_W = 'min(var(--container-site, 1560px), 100vw - 2 * var(--gutter-site, 80px))';
// The measure the shared padding is computed against. Deliberately NOT each caller's
// `copyMax`: a section with a wider cap would resolve a different inset and drift out of line
// with its siblings. One reference for the whole page, `copyMax` free to vary per section.
const PAD_REF = '610px';
// The container hits its 1560px cap once the site gutter has stopped growing: gutter tops out
// at 80px, so 1560 + 2*80 = 1720px of viewport. Past that the frame stops widening and the
// two cut corners are pure blank space — so that is exactly where the cut opens up.
const WIDE_MQ = 1720;

function useMinWidth(q) {
  const [hit, setHit] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${q}px)`);
    const on = () => setHit(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return hit;
}

export function SectionFrame({
  children, before, after, copyMax = 610, reserve, reserveInset = 'clamp(8px, 2vw, 40px)', gutter = 8,
  gap = 20, stacked = false, columnMinHeight, padX = PAD_X, padY, padRef = PAD_REF,
  padGrowMax = 'clamp(72px, 7vw, 112px)',
  chamfer = 44, chamferWide = 104, color = 'var(--vv-ice-08)', blur = 12, accent = false,
  contentStyle, style, ...rest
}) {
  const cap = typeof copyMax === 'number' ? `${copyMax}px` : copyMax;
  // The cut is geometry, not CSS — it feeds the outline's path math, so it steps on a media
  // query rather than interpolating. One switch here covers every big frame on the page; the
  // small chamfer-16 cards keep their own tight corner.
  const wide = useMinWidth(WIDE_MQ);
  const cut = wide ? chamferWide : chamfer;
  // Half the slack the SHARED column has past the copy cap, floored at the clamp token and
  // ceilinged so narrow sibling frames keep a usable measure. Same number in EVERY frame —
  // note there is deliberately no `stacked` branch here. `stacked` is a per-section decision
  // (each section picks the threshold its own content needs), so gating the padding on it
  // makes sections disagree in the band where one has stacked and the other has not. A
  // stacked single-column section is not harmed by the wider inset: it is already floored and
  // ceilinged. If a section ever genuinely needs a tighter floor, pass `padX` — explicitly, and
  // identically to its siblings — rather than deriving it from a breakpoint.
  // When stacked on mobile, the chamfered border is removed and the frame padding resets to 0
  // so the content aligns flush with the shared page gutter (--gutter-site).
  const padXFit = stacked ? '0px' : `max(${padX}, min(${padGrowMax}, calc((${CONTENT_W} - ${padRef}) / 2)))`;
  // Balanced by default: the grown horizontal value on all four sides.
  const padYFit = stacked ? '0px' : (padY ?? padXFit);
  // Art hangs flush to the right padding, mirroring the copy on the left; `reserveInset` is
  // just the floor for narrow frames, where padding has stopped growing.
  const decorRight = `max(${reserveInset}, ${padXFit})`;
  // Here `100%` is this frame's own padded content box — correct, and the reason the measure
  // is a `min()` against the cap: a narrower frame simply gets a shorter line, not a shifted
  // one. `reserve` is charged here only, never against the padding.
  //
  // At max width the cap is dropped and the copy fills to the right padding. The cap is a
  // readability device for a growing frame, but once the frame has stopped growing it just
  // parks dead space inside the right padding — the copy's right edge ended up ~275px off the
  // frame while its left edge sat on the 112px padding, which reads as lopsided padding even
  // though the padding itself is symmetric.
  const copyWidth = stacked || (wide && !reserve)
    ? '100%'
    : reserve
      ? `min(${cap}, calc(100% - ${reserve} - ${gutter}px))`
      : `min(${cap}, 100%)`;
  return (
    <Bezel accent={accent} chamfer={cut} color={color} blur={blur} pad={`${padYFit} ${padXFit}`}
      style={{ '--sf-pad-x': padXFit, '--sf-pad-y': padYFit, '--sf-gap': `${gap}px`, '--sf-copy-max': copyWidth, '--sf-decor-right': decorRight, ...style }}
      {...rest}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: stacked ? 0 : columnMinHeight }}>
        {before}
        <div style={{ display: 'flex', flexDirection: 'column', gap, maxWidth: copyWidth, ...contentStyle }}>{children}</div>
        {after}
      </div>
    </Bezel>
  );
}
