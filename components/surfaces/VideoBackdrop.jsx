import React from 'react';

/* The feather lives in tokens/gradients.css as --plate-feather; Bezel masks its own
   plate with the same token, so the two treatments cannot drift apart. */
const FEATHER = 'var(--plate-feather)';

const SCRIMS = {
  bottom: 'var(--scrim-bottom)', left: 'var(--scrim-left)', vignette: 'var(--scrim-vignette)',
  flood: 'var(--scrim-flood)', cinema: 'var(--scrim-cinema)',
};

/* The signature Vivum surface: a muted looping plate under a navy scrim, type on top.
   Pass `src` for video, or `poster` alone for a still plate.
   scrim="none" drops the overlay entirely — only for a plate already feathered by
   circleMask, where the mask alone shapes the footage against the flat canvas. */
export function VideoBackdrop({ children, src, poster, scrim = 'bottom', minHeight = 560, align = 'end', pad = '80px', grain, edgeFade = true, foot, circleMask, plateOpacity, plateShift, plateSide = 'right', plateScale, plateDrop, bleed, style, ...rest }) {
  /* A feathered plate must keep every falloff inside the section: a transform would
     push the right-hand falloff past the edge, where overflow clips it into a straight
     cut. So a masked plate is inset instead — its box starts at `plateShift` and stops
     short of the right edge, leaving the ellipse room to reach zero on all four sides.
     Width is explicit: `auto` on an absolutely positioned video resolves to the file's
     intrinsic width and ignores `right`. */
  /* plateScale grows the plate around its own centre. A feathered plate can overflow
     the section safely: the ellipse reaches zero alpha at 68% of each radius, so the
     visible footage still ends inside the section even when the box does not. */
  const RIGHT_GAP = '4%';
  const box = plateShift
    ? (circleMask
        ? (plateSide === 'center'
            ? { left: plateShift, right: plateShift, width: `calc(100% - ${plateShift} - ${plateShift})` }
            : plateSide === 'left'
            ? { left: RIGHT_GAP, right: plateShift, width: `calc(100% - ${plateShift} - ${RIGHT_GAP})` }
            : { left: plateShift, right: RIGHT_GAP, width: `calc(100% - ${plateShift} - ${RIGHT_GAP})` })
        : { transform: `translateX(${plateSide === 'left' ? '-' : ''}${plateShift})` })
    : null;
  const transforms = [
    box && box.transform,
    plateScale && plateScale !== 1 ? `scale(${plateScale})` : null,
  ].filter(Boolean).join(' ');
  const shift = transforms ? { ...box, transform: transforms } : box;
  /* plateDrop pushes a feathered plate down its section without clipping: the box keeps
     its full height and starts lower, so the top falloff clears whatever sits above. */
  const drop = plateDrop ? { top: plateDrop, bottom: 'auto' } : null;
  const plate = {
    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
    filter: plateOpacity != null ? `var(--plate-filter-base) opacity(${plateOpacity})` : 'var(--plate-filter)',
    ...(circleMask ? { maskImage: FEATHER, WebkitMaskImage: FEATHER } : null),
    ...shift,
    ...drop,
    ...(bleed ? { pointerEvents: 'none' } : null),
  };
  return (
    <section style={{
      position: 'relative', minHeight, display: 'flex', flexDirection: 'column',
      justifyContent: align === 'center' ? 'center' : align === 'start' ? 'flex-start' : 'flex-end',
      overflow: bleed ? 'visible' : 'hidden', background: 'var(--surface-canvas)', boxSizing: 'border-box',
      /* bleed lets a feathered plate finish past the section edge instead of meeting a
         hard cut. The raised z-index keeps it painting over the next section's canvas;
         it is pointer-transparent, and its falloff is near zero by the time it gets there. */
      ...(bleed ? { zIndex: 1 } : null), ...style,
    }} {...rest}>
      {src ? (
        <video
          src={src} poster={poster} autoPlay muted loop playsInline
          style={plate}
        />
      ) : poster ? (
        <img src={poster} alt="" style={plate} />
      ) : (
        <span style={{ position: 'absolute', inset: 0, background: 'var(--grad-aperture)' }} />
      )}
      {scrim === 'none' ? null : (
        <span style={{ position: 'absolute', inset: 0, background: SCRIMS[scrim] || SCRIMS.bottom, pointerEvents: 'none' }} />
      )}
      {edgeFade ? (
        <span style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, var(--surface-canvas) 0%, rgba(0, 17, 33, 0) 15%, rgba(0, 17, 33, 0) 85%, var(--surface-canvas) 100%)' }} />
      ) : null}
      {/* The foot reaches the canvas colour at full opacity, so the plate lands on the page
         instead of cutting against it — and it backs whatever type sits at the bottom. */}
      {foot ? (
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: foot === true ? '58%' : foot, pointerEvents: 'none', background: 'var(--scrim-foot)' }} />
      ) : null}
      {grain ? <span style={{ position: 'absolute', inset: 0, background: 'var(--vv-ice-04)', mixBlendMode: 'overlay', pointerEvents: 'none' }} /> : null}
      <div style={{ position: 'relative', zIndex: 1, padding: pad, width: '100%', boxSizing: 'border-box' }}>{children}</div>
    </section>
  );
}
