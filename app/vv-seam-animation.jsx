/* Full-bleed animated background sitting on the Autonomous Solutions → Core technology seam.
   Replaces the retired NeuralDivider video plate: same job (a breathing full-browser-width
   background between two transparent sections) with no 20MB asset. Six variants, all pure CSS.

   Geometry: PURE BACKGROUND — the outer wrapper is zero-height with overflow visible, and the
   band itself is absolutely positioned and pulled up half its own height, so it straddles the
   seam without ever contributing a single pixel of layout. Nothing above or below it moves when
   the size/position tweaks change. Its own top/bottom mask dissolves it into the canvas colour
   the way the video plates do. */

const SEAM_KEYFRAMES = `
@keyframes vvSeamDrift1{0%{transform:translate3d(-8%,-6%,0) scale(1)}50%{transform:translate3d(10%,6%,0) scale(1.14)}100%{transform:translate3d(-8%,-6%,0) scale(1)}}
@keyframes vvSeamDrift2{0%{transform:translate3d(12%,8%,0) scale(1.08)}50%{transform:translate3d(-10%,-8%,0) scale(0.94)}100%{transform:translate3d(12%,8%,0) scale(1.08)}}
@keyframes vvSeamDrift3{0%{transform:translate3d(0,4%,0) scale(0.96)}50%{transform:translate3d(-14%,-4%,0) scale(1.2)}100%{transform:translate3d(0,4%,0) scale(0.96)}}
@keyframes vvSeamSweep{0%{transform:translateX(-60%)}100%{transform:translateX(260%)}}
@keyframes vvSeamRing{0%{transform:scale(0.12);opacity:0}12%{opacity:0.5}100%{transform:scale(2.6);opacity:0}}
@keyframes vvSeamLattice{0%{background-position:0 0,0 0}100%{background-position:220px 220px,-220px 220px}}
@keyframes vvSeamNodes{0%{opacity:0.25}50%{opacity:0.7}100%{opacity:0.25}}
@keyframes vvSeamFlowLine{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
@keyframes vvSeamGrain{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-220px,-220px,0)}}
@keyframes vvSeamGrainCoarse{0%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(90px,-60px,0) scale(1.1)}100%{transform:translate3d(0,0,0) scale(1)}}
@keyframes vvSeamFlicker{0%,100%{opacity:0.55}50%{opacity:0.9}}
@keyframes vvSeamSpin{to{transform:rotate(360deg)}}
@keyframes vvSeamBreathe{0%{transform:scale(1)}50%{transform:scale(1.16)}100%{transform:scale(1)}}
@keyframes vvSeamSlowSpin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes vvSeamRise{0%{background-position:0 0}100%{background-position:-60px -420px}}
@keyframes vvSeamSway{0%{transform:translateX(-6%)}50%{transform:translateX(6%)}100%{transform:translateX(-6%)}}
@keyframes vvSeamShaft{0%{transform:translateX(-18%)}100%{transform:translateX(18%)}}
@keyframes vvSeamCloud{0%{transform:translate3d(-4%,-3%,0) scale(1.05)}50%{transform:translate3d(4%,3%,0) scale(1.22)}100%{transform:translate3d(-4%,-3%,0) scale(1.05)}}
@keyframes vvSeamCloudAlt{0%{transform:translate3d(3%,2%,0) scale(1.16)}50%{transform:translate3d(-5%,-2%,0) scale(1)}100%{transform:translate3d(3%,2%,0) scale(1.16)}}
@keyframes vvSeamFall{0%{transform:translate3d(0,-240px,0)}100%{transform:translate3d(-40px,240px,0)}}
@keyframes vvSeamSheen{0%{transform:translateX(-120%)}100%{transform:translateX(220%)}}
@keyframes vvSeamFibre{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-500px,0,0)}}
@keyframes vvSeamSmoke{0%{transform:translate3d(-3%,12%,0) scale(1.1)}100%{transform:translate3d(3%,-12%,0) scale(1.34)}}
@keyframes vvSeamSmokeAlt{0%{transform:translate3d(4%,-8%,0) scale(1.28)}100%{transform:translate3d(-4%,10%,0) scale(1.06)}}
@keyframes vvSeamVein{0%{transform:rotate(0) scale(1.02)}50%{transform:rotate(4deg) scale(1.14)}100%{transform:rotate(0) scale(1.02)}}
@keyframes vvSeamStatic{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-110px,-110px,0)}}
@keyframes vvSeamRoll{0%{transform:translateY(-120%)}100%{transform:translateY(320%)}}
@keyframes vvSeamRibbon{0%{transform:translateX(-30%)}50%{transform:translateX(30%)}100%{transform:translateX(-30%)}}
@keyframes vvSeamTwinkle{0%,100%{opacity:0.25}40%{opacity:0.85}70%{opacity:0.4}}
@media (prefers-reduced-motion: reduce){[data-vv-seam] *{animation:none!important}}`;

const SEAM_VARIANTS = ['drift', 'scan', 'pulse', 'lattice', 'texture', 'nebula', 'ash', 'sheen', 'weave', 'smoke', 'marble', 'static', 'ribbons', 'starfield', 'orbit', 'contours', 'motes', 'waves', 'shafts', 'off'];

/* Two feTurbulence tiles carry the grain. Inline SVG data URIs, not image files, so the texture
   costs no request and scales with the band. */
const GRAIN_FINE = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='220' height='220' filter='url(%23n)' opacity='0.55'/></svg>\")";
const GRAIN_COARSE = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='420' height='420'><filter id='m'><feTurbulence type='fractalNoise' baseFrequency='0.14' numOctaves='2' stitchTiles='stitch'/></filter><rect width='420' height='420' filter='url(%23m)' opacity='0.6'/></svg>\")";
const GRAIN_CLOUD = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='700' height='700'><filter id='c'><feTurbulence type='fractalNoise' baseFrequency='0.012 0.03' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='700' height='700' filter='url(%23c)' opacity='0.7'/></svg>\")";
const GRAIN_FIBRE = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.006 0.42' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='500' height='500' filter='url(%23f)' opacity='0.75'/></svg>\")";
const GRAIN_VEIN = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><filter id='v'><feTurbulence type='turbulence' baseFrequency='0.018 0.05' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='600' height='600' filter='url(%23v)' opacity='0.8'/></svg>\")";

/* Soft amber/blue blooms crossing each other — the quietest option, and the closest read to
   the footage that used to sit here. */
function SeamDrift({ dur }) {
  const blob = (color, size, left, top, anim, base, delay) => ({
    position: 'absolute', left, top, width: size, height: size, borderRadius: '50%',
    background: `radial-gradient(closest-side, ${color}, rgba(0,17,33,0) 72%)`,
    filter: 'blur(30px)', animation: `${anim} ${dur(base)} ease-in-out ${dur(delay)} infinite`, willChange: 'transform',
  });
  return <>
    <span style={blob('rgba(236,154,0,0.15)', 'clamp(300px, 42vw, 620px)', '4%', '-38%', 'vvSeamDrift1', 26, 0)} />
    <span style={blob('rgba(40,129,181,0.18)', 'clamp(340px, 48vw, 720px)', '46%', '-24%', 'vvSeamDrift2', 32, -6)} />
    <span style={blob('rgba(218,232,242,0.07)', 'clamp(240px, 30vw, 460px)', '74%', '-10%', 'vvSeamDrift3', 38, -14)} />
  </>;
}

/* Hairline field with an amber bar sweeping through it — the sensor read of the set. */
function SeamScan({ dur }) {
  return <>
    <span style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right, rgba(218,232,242,0.07) 0 1px, transparent 1px 72px), repeating-linear-gradient(to bottom, rgba(218,232,242,0.05) 0 1px, transparent 1px 72px)' }} />
    <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '34%', background: 'linear-gradient(90deg, rgba(236,154,0,0) 0%, rgba(236,154,0,0.08) 42%, rgba(236,154,0,0.20) 50%, rgba(236,154,0,0.08) 58%, rgba(236,154,0,0) 100%)', filter: 'blur(14px)', animation: `vvSeamSweep ${dur(9)} linear infinite`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'linear-gradient(90deg, rgba(218,232,242,0) 0%, rgba(218,232,242,0.22) 50%, rgba(218,232,242,0) 100%)' }} />
  </>;
}

/* Concentric rings propagating out of the band's centre — signal, not scenery. */
function SeamPulse({ dur, size }) {
  const RINGS = [0, 2.2, 4.4, 6.6];
  const r = Math.round(size * 0.95);
  return <>
    {RINGS.map((d, i) => (
      <span key={i} style={{ position: 'absolute', left: '50%', top: '50%', width: r, height: r, translate: '-50% -50%', borderRadius: '50%', border: `1px solid ${i % 2 ? 'rgba(236,154,0,0.55)' : 'rgba(218,232,242,0.45)'}`, opacity: 0, animation: `vvSeamRing ${dur(8.8)} ${dur(d)} ease-out infinite`, willChange: 'transform, opacity' }} />
    ))}
    <span style={{ position: 'absolute', left: '50%', top: '50%', width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5, borderRadius: '50%', background: 'var(--vv-amber)', boxShadow: '0 0 22px 6px rgba(236,154,0,0.35)' }} />
  </>;
}

/* Diagonal mesh drifting under a pulsing node grid — the topology read. */
function SeamLattice({ dur }) {
  return <>
    <span style={{ position: 'absolute', inset: '-20%', backgroundImage: 'repeating-linear-gradient(45deg, rgba(218,232,242,0.08) 0 1px, transparent 1px 110px), repeating-linear-gradient(-45deg, rgba(40,129,181,0.14) 0 1px, transparent 1px 110px)', animation: `vvSeamLattice ${dur(30)} linear infinite`, willChange: 'background-position' }} />
    <span style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(236,154,0,0.5) 0 1.6px, transparent 1.7px)', backgroundSize: '110px 110px', animation: `vvSeamNodes ${dur(6)} ease-in-out infinite` }} />
    <span style={{ position: 'absolute', left: 0, right: 0, top: '38%', height: 1, overflow: 'hidden' }}>
      <span style={{ display: 'block', width: '55%', height: '100%', background: 'linear-gradient(90deg, rgba(236,154,0,0) 0%, rgba(236,154,0,0.6) 50%, rgba(236,154,0,0) 100%)', animation: `vvSeamFlowLine ${dur(11)} linear infinite` }} />
    </span>
  </>;
}

/* Film-grain texture: fine noise crawling over a slow coarse cloud, warmed by an amber wash.
   Reads as material rather than graphic — the analogue option in the set. */
function SeamTexture({ dur }) {
  return <>
    <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(236,154,0,0.07) 0%, rgba(40,129,181,0.08) 55%, rgba(218,232,242,0.035) 100%)' }} />
    <span style={{ position: 'absolute', inset: '-220px', backgroundImage: GRAIN_COARSE, backgroundSize: '420px 420px', mixBlendMode: 'overlay', opacity: 0.32, animation: `vvSeamGrainCoarse ${dur(34)} ease-in-out infinite`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: '-260px', backgroundImage: GRAIN_FINE, backgroundSize: '220px 220px', mixBlendMode: 'soft-light', opacity: 0.35, animation: `vvSeamGrain ${dur(2.6)} steps(6) infinite, vvSeamFlicker ${dur(5)} ease-in-out infinite`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to bottom, rgba(0,17,33,0.22) 0 1px, transparent 1px 4px)', opacity: 0.4 }} />
  </>;
}

/* Dots tracking elliptical orbits around a shared amber core. */
function SeamOrbit({ dur, size }) {
  const PATHS = [[0.95, 22, 'rgba(236,154,0,0.9)'], [0.66, 15, 'rgba(218,232,242,0.75)'], [1.28, 34, 'rgba(40,129,181,0.95)']];
  return <>
    {PATHS.map(([f, base, color], i) => {
      const w = Math.round(size * f);
      return (
        <span key={i} style={{ position: 'absolute', left: '50%', top: '50%', width: w, height: w, translate: '-50% -50%', scale: '1 0.42' }}>
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(218,232,242,0.10)' }} />
          <span style={{ position: 'absolute', inset: 0, animation: `vvSeamSpin ${dur(base)} linear infinite`, animationDirection: i === 1 ? 'reverse' : 'normal', willChange: 'transform' }}>
            <span style={{ position: 'absolute', left: -3, top: '50%', width: 6, height: 6, marginTop: -3, borderRadius: '50%', background: color, boxShadow: `0 0 8px 2px ${color}`, scale: '1 2.38' }} />
          </span>
        </span>
      );
    })}
    <span style={{ position: 'absolute', left: '50%', top: '50%', width: 'clamp(120px, 16vw, 220px)', aspectRatio: '1', translate: '-50% -50%', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(236,154,0,0.18), rgba(0,17,33,0) 70%)', filter: 'blur(14px)' }} />
  </>;
}

/* Topographic contour rings breathing against a slowly turning counter-set — terrain, read as
   pure line. */
function SeamContours({ dur }) {
  return <>
    <span style={{ position: 'absolute', inset: '-40%', backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, rgba(218,232,242,0.10) 0 1px, transparent 1px 26px)', animation: `vvSeamBreathe ${dur(18)} ease-in-out infinite`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: '-60%', backgroundImage: 'repeating-radial-gradient(circle at 32% 50%, rgba(40,129,181,0.14) 0 1px, transparent 1px 34px)', animation: `vvSeamSlowSpin ${dur(160)} linear infinite`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: 0, background: 'radial-gradient(closest-side at 50% 50%, rgba(236,154,0,0.10), rgba(0,17,33,0) 70%)' }} />
  </>;
}

/* Fine motes rising through the band at three depths — the softest, most atmospheric option. */
function SeamMotes({ dur }) {
  const layer = (color, dot, gap, base, op) => ({
    position: 'absolute', inset: 0,
    backgroundImage: `radial-gradient(circle, ${color} 0 ${dot}px, transparent ${dot + 0.6}px)`,
    backgroundSize: `${gap}px ${gap}px`, opacity: op,
    animation: `vvSeamRise ${dur(base)} linear infinite`, willChange: 'background-position',
  });
  return <>
    <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(40,129,181,0.10) 0%, rgba(0,17,33,0) 60%)' }} />
    <span style={layer('rgba(218,232,242,0.75)', 1, 54, 26, 0.6)} />
    <span style={layer('rgba(236,154,0,0.8)', 1.4, 92, 18, 0.6)} />
    <span style={layer('rgba(218,232,242,0.5)', 2.2, 150, 12, 0.45)} />
  </>;
}

/* Four crests swaying past each other — the band as a slow tide line. */
function SeamWaves({ dur }) {
  const CRESTS = [[0, 'rgba(218,232,242,0.20)', 22], [18, 'rgba(236,154,0,0.26)', 28], [38, 'rgba(40,129,181,0.34)', 34], [58, 'rgba(218,232,242,0.12)', 42]];
  return <>
    {CRESTS.map(([top, color, base], i) => (
      <span key={i} style={{ position: 'absolute', left: '-30%', width: '160%', top: `${top}%`, height: '150%', borderRadius: '50%', borderTop: `1px solid ${color}`, animation: `vvSeamSway ${dur(base)} ease-in-out ${dur(-i * 3)} infinite`, willChange: 'transform' }} />
    ))}
    <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(40,129,181,0.10), rgba(0,17,33,0) 70%)' }} />
  </>;
}

/* Angled light shafts drifting across each other — the most directional option in the set. */
function SeamShafts({ dur }) {
  return <>
    <span style={{ position: 'absolute', inset: '-50%', backgroundImage: 'repeating-linear-gradient(102deg, rgba(236,154,0,0.10) 0 2px, rgba(0,17,33,0) 2px 78px)', filter: 'blur(3px)', animation: `vvSeamShaft ${dur(24)} ease-in-out infinite alternate`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: '-50%', backgroundImage: 'repeating-linear-gradient(96deg, rgba(218,232,242,0.07) 0 3px, rgba(0,17,33,0) 3px 124px)', filter: 'blur(6px)', animation: `vvSeamShaft ${dur(38)} ease-in-out infinite alternate-reverse`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 20% 0%, rgba(40,129,181,0.16), rgba(0,17,33,0) 70%)' }} />
  </>;
}

/* ── Texture family ─────────────────────────────────────────────────────────────────────────
   All four build on the same device as Texture: tinted wash + blended feTurbulence tiles in
   motion. They differ in the noise's frequency, blend mode and direction of travel, which is
   what separates cloud from grit from satin from fibre. */

/* Low-frequency turbulence clouds crossing each other — the softest of the family. */
function SeamNebula({ dur }) {
  return <>
    <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(112deg, rgba(40,129,181,0.16) 0%, rgba(236,154,0,0.10) 62%, rgba(0,17,33,0) 100%)' }} />
    <span style={{ position: 'absolute', inset: '-45%', backgroundImage: GRAIN_CLOUD, backgroundSize: '700px 700px', mixBlendMode: 'overlay', opacity: 0.34, animation: `vvSeamCloud ${dur(46)} ease-in-out infinite`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: '-45%', backgroundImage: GRAIN_CLOUD, backgroundSize: '1100px 1100px', mixBlendMode: 'soft-light', opacity: 0.45, animation: `vvSeamCloudAlt ${dur(64)} ease-in-out infinite`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: 0, background: 'radial-gradient(90% 120% at 74% 30%, rgba(236,154,0,0.09), rgba(0,17,33,0) 68%)' }} />
  </>;
}

/* Dense grain falling through a cold vignette — the grittiest read of the set. */
function SeamAsh({ dur }) {
  return <>
    <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(218,232,242,0.05) 0%, rgba(40,129,181,0.10) 100%)' }} />
    <span style={{ position: 'absolute', inset: '-280px', backgroundImage: GRAIN_FINE, backgroundSize: '160px 160px', mixBlendMode: 'overlay', opacity: 0.36, animation: `vvSeamFall ${dur(9)} linear infinite`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: '-280px', backgroundImage: GRAIN_COARSE, backgroundSize: '520px 520px', mixBlendMode: 'soft-light', opacity: 0.4, animation: `vvSeamFall ${dur(26)} linear infinite`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 120% at 50% 50%, rgba(0,17,33,0) 40%, rgba(0,17,33,0.55) 100%)' }} />
  </>;
}

/* Satin sheen: a still noise ground with a brighter grain band sweeping across it. */
function SeamSheen({ dur }) {
  return <>
    <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(218,232,242,0.045) 0%, rgba(40,129,181,0.09) 100%)' }} />
    <span style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN_COARSE, backgroundSize: '360px 360px', mixBlendMode: 'soft-light', opacity: 0.35 }} />
    <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '46%', backgroundImage: GRAIN_FINE, backgroundSize: '200px 200px', mixBlendMode: 'overlay', opacity: 0.85, maskImage: 'linear-gradient(100deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 50%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(100deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 50%, rgba(0,0,0,0) 100%)', animation: `vvSeamSheen ${dur(14)} ease-in-out infinite`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '30%', background: 'linear-gradient(90deg, rgba(236,154,0,0) 0%, rgba(236,154,0,0.10) 50%, rgba(236,154,0,0) 100%)', filter: 'blur(18px)', animation: `vvSeamSheen ${dur(14)} ease-in-out infinite`, willChange: 'transform' }} />
  </>;
}

/* Stretched turbulence combed into horizontal fibres, tracking sideways — woven material. */
function SeamWeave({ dur }) {
  return <>
    <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(96deg, rgba(236,154,0,0.09) 0%, rgba(40,129,181,0.11) 70%, rgba(0,17,33,0) 100%)' }} />
    <span style={{ position: 'absolute', inset: '-30px -520px', backgroundImage: GRAIN_FIBRE, backgroundSize: '500px 500px', mixBlendMode: 'overlay', opacity: 0.5, animation: `vvSeamFibre ${dur(22)} linear infinite`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: '-30px -520px', backgroundImage: GRAIN_FIBRE, backgroundSize: '500px 260px', mixBlendMode: 'soft-light', opacity: 0.4, animation: `vvSeamFibre ${dur(38)} linear infinite reverse`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to right, rgba(0,17,33,0.20) 0 1px, transparent 1px 5px)', opacity: 0.45 }} />
  </>;
}

/* Blurred turbulence plumes climbing through each other — the loosest of the family. */
function SeamSmoke({ dur }) {
  return <>
    <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(40,129,181,0.14) 0%, rgba(0,17,33,0) 80%)' }} />
    <span style={{ position: 'absolute', inset: '-55%', backgroundImage: GRAIN_CLOUD, backgroundSize: '820px 820px', filter: 'blur(16px)', mixBlendMode: 'screen', opacity: 0.42, animation: `vvSeamSmoke ${dur(30)} ease-in-out infinite alternate`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: '-55%', backgroundImage: GRAIN_CLOUD, backgroundSize: '1300px 1300px', filter: 'blur(28px)', mixBlendMode: 'overlay', opacity: 0.55, animation: `vvSeamSmokeAlt ${dur(52)} ease-in-out infinite alternate`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 100% at 30% 100%, rgba(236,154,0,0.10), rgba(0,17,33,0) 70%)' }} />
  </>;
}

/* Turbulence veining, breathing and turning under itself — stone rather than film. */
function SeamMarble({ dur }) {
  return <>
    <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(104deg, rgba(218,232,242,0.05) 0%, rgba(40,129,181,0.10) 100%)' }} />
    <span style={{ position: 'absolute', inset: '-45%', backgroundImage: GRAIN_VEIN, backgroundSize: '600px 600px', filter: 'contrast(1.7)', mixBlendMode: 'overlay', opacity: 0.42, animation: `vvSeamVein ${dur(44)} ease-in-out infinite`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: '-45%', backgroundImage: GRAIN_VEIN, backgroundSize: '1250px 1250px', mixBlendMode: 'soft-light', opacity: 0.5, animation: `vvSeamVein ${dur(70)} ease-in-out infinite reverse`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 110% at 78% 40%, rgba(236,154,0,0.08), rgba(0,17,33,0) 70%)' }} />
  </>;
}

/* Hard fine noise stepping frame to frame under a slow roll bar — signal loss, CRT read. */
function SeamStatic({ dur }) {
  return <>
    <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(40,129,181,0.10), rgba(0,17,33,0) 100%)' }} />
    <span style={{ position: 'absolute', inset: '-140px', backgroundImage: GRAIN_FINE, backgroundSize: '110px 110px', mixBlendMode: 'overlay', opacity: 0.5, animation: `vvSeamStatic ${dur(0.5)} steps(4) infinite`, willChange: 'transform' }} />
    <span style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to bottom, rgba(0,17,33,0.30) 0 1px, transparent 1px 3px)', opacity: 0.6 }} />
    <span style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '22%', background: 'linear-gradient(to bottom, rgba(218,232,242,0) 0%, rgba(218,232,242,0.10) 50%, rgba(218,232,242,0) 100%)', filter: 'blur(6px)', animation: `vvSeamRoll ${dur(7)} linear infinite`, willChange: 'transform' }} />
  </>;
}

/* Wide soft gradient ribbons sliding past each other at a shallow angle. */
function SeamRibbons({ dur }) {
  const BANDS = [['rgba(236,154,0,0.16)', -7, '46%', '6%', 26], ['rgba(40,129,181,0.22)', -4, '52%', '34%', 34], ['rgba(218,232,242,0.09)', -10, '30%', '62%', 44]];
  return <>
    {BANDS.map(([color, rot, h, top, base], i) => (
      <span key={i} style={{ position: 'absolute', left: '-25%', width: '150%', top, height: h, background: `linear-gradient(90deg, rgba(0,17,33,0) 0%, ${color} 45%, ${color} 55%, rgba(0,17,33,0) 100%)`, rotate: `${rot}deg`, filter: 'blur(26px)', animation: `vvSeamRibbon ${dur(base)} ease-in-out infinite`, willChange: 'transform' }} />
    ))}
  </>;
}

/* Three depths of stars twinkling out of phase and drifting sideways as parallax. Each layer
   stacks four dot tilings at coprime sizes, so the scatter never resolves into the visible
   grid a single tiling gives. */
function SeamStarfield({ dur }) {
  const TILES = [89, 137, 191, 233];
  const layer = (color, dot, scale, driftBase, twinkleBase, op, dir) => {
    const dots = TILES.map((tile, i) => ({
      image: `radial-gradient(circle at ${18 + i * 21}% ${26 + i * 17}%, ${color} 0 ${dot}px, transparent ${dot + 0.8}px)`,
      size: `${Math.round(tile * scale)}px ${Math.round(tile * scale * 0.78)}px`,
    }));
    return {
      position: 'absolute', inset: '-12%',
      backgroundImage: dots.map((d) => d.image).join(', '),
      backgroundSize: dots.map((d) => d.size).join(', '),
      opacity: op,
      animation: `vvSeamRibbon ${dur(driftBase)} ease-in-out ${dir} infinite, vvSeamTwinkle ${dur(twinkleBase)} ease-in-out infinite`,
      willChange: 'transform, opacity',
    };
  };
  return <>
    <span style={{ position: 'absolute', inset: 0, background: 'radial-gradient(100% 130% at 50% 120%, rgba(40,129,181,0.16), rgba(0,17,33,0) 70%)' }} />
    <span style={layer('rgba(218,232,242,0.9)', 1, 1, 90, 4.5, 0.6, 'normal')} />
    <span style={layer('rgba(236,154,0,0.95)', 1.5, 1.9, 130, 6.5, 0.6, 'reverse')} />
    <span style={layer('rgba(218,232,242,0.7)', 2.2, 3.1, 170, 9, 0.5, 'normal')} />
  </>;
}

const SEAM_RENDERERS = { drift: SeamDrift, scan: SeamScan, pulse: SeamPulse, lattice: SeamLattice, texture: SeamTexture, nebula: SeamNebula, ash: SeamAsh, sheen: SeamSheen, weave: SeamWeave, smoke: SeamSmoke, marble: SeamMarble, static: SeamStatic, ribbons: SeamRibbons, starfield: SeamStarfield, orbit: SeamOrbit, contours: SeamContours, motes: SeamMotes, waves: SeamWaves, shafts: SeamShafts };

function SeamAnimation({ variant = 'drift', size = 240, speed = 1, x = 0, y = 0, opacity = 1 }) {
  const Body = SEAM_RENDERERS[variant];
  if (!Body) return null;
  const s = Math.max(0.1, Number(speed) || 1);
  const dur = (base) => `${(base / s).toFixed(2)}s`;
  return (
    /* Zero-height host: the band hangs off it, so the sections around it never shift. */
    <div style={{ position: 'relative', height: 0, overflow: 'visible', pointerEvents: 'none' }} aria-hidden="true">
      <div data-vv-seam={variant} style={{
        position: 'absolute', left: 0, right: 0, top: 0, height: size,
        transform: `translate(${x}%, calc(-50% + ${y}%))`, opacity, overflow: 'hidden',
        /* Dissolves into the canvas at both edges so neither section gets a visible seam line. */
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgb(0,0,0) 26%, rgb(0,0,0) 74%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgb(0,0,0) 26%, rgb(0,0,0) 74%, rgba(0,0,0,0) 100%)',
      }}>
        <style>{SEAM_KEYFRAMES}</style>
        <Body dur={dur} size={size} />
      </div>
    </div>
  );
}

Object.assign(window, { SeamAnimation, SEAM_VARIANTS });
