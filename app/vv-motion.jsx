/* ── Vivum HUD motion kit ────────────────────────────────────────────────────────────────
   One shared vocabulary for every entrance on the site, built to read like a targeting
   system acquiring a contact rather than a web page fading in.

   Non-negotiable rule this file is designed around: THE RESTING STATE IS THE CURRENT DESIGN.
   Every reveal ends at opacity 1 / transform none / filter none / clip-path none, and the
   transient HUD furniture (corner brackets, scan sweep) UNMOUNTS when the animation finishes,
   so nothing is added to the design permanently — it is only visible while arriving.

   Vocabulary
   · acquire   — the signature: 4 corner brackets snap in, a scan line sweeps the box, the
                 whole plate flickers like a CRT settling, then content resolves. For chamfered
                 Bezel containers.
   · wipe      — clip-path unfurl from the top edge. For panels and images.
   · up        — 14px rise + 6px defocus. For copy blocks and list rows.
   · line      — 1px rules draw out from their origin. For hairlines and dividers.
   · text      — per-element mask wipe with a faint chromatic offset.
   Shared easing is expo-out: machines settle, they do not bounce. */

const VV_EASE = 'cubic-bezier(.16,1,.3,1)';
const VV_HUD_CSS = `
@keyframes vvFlicker{0%{opacity:0}8%{opacity:.55}12%{opacity:.08}20%{opacity:.82}26%{opacity:.34}34%{opacity:.95}40%{opacity:.6}52%{opacity:1}58%{opacity:.86}100%{opacity:1}}
@keyframes vvScanSweep{0%{transform:translateY(-102%);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(102%);opacity:0}}
@keyframes vvBracket{0%{opacity:0;transform:scale(1.5)}30%{opacity:1}70%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1)}}
@keyframes vvTick{0%{opacity:0}50%{opacity:1}100%{opacity:0}}
@keyframes vvCaret{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes vvHudPulse{0%{opacity:.25}50%{opacity:.7}100%{opacity:.25}}
@keyframes vvGlitchIn{0%{clip-path:inset(0 0 64% 0);transform:translate3d(-8px,0,0)}14%{clip-path:inset(46% 0 20% 0);transform:translate3d(7px,0,0)}26%{clip-path:inset(12% 0 57% 0);transform:translate3d(-5px,0,0)}38%{clip-path:inset(68% 0 6% 0);transform:translate3d(4px,0,0)}50%{clip-path:inset(24% 0 34% 0);transform:translate3d(-2px,0,0)}62%{clip-path:inset(0 0 0 0);transform:none}100%{clip-path:inset(0 0 0 0);transform:none}}
@keyframes vvScanLine{0%{transform:translateY(-4%);opacity:0}12%{opacity:1}88%{opacity:1}100%{transform:translateY(104%);opacity:0}}
/* The chamfered outline draws ITSELF. Bezel renders that silhouette as one continuous SVG
   path, which now carries pathLength="1", so a normalised dash can walk the real shape — cut
   corners and all — rather than a rectangle faked over the top of it. The fill mode holds the
   end state (offset 0 = the complete stroke) and the wrapper drops the hook at rest, so the
   outline returns to precisely the path the design draws.
   NB: nothing inside this literal may contain a backtick or a dollar-brace. */
@keyframes vvStrokeDraw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
[data-vv-stroke] svg path[stroke]{stroke-dasharray:1;animation:vvStrokeDraw var(--vv-stroke-dur,760ms) cubic-bezier(.16,1,.3,1) both}
html:not(.vv-motion-live) [data-vv-stroke] svg path[stroke]{stroke-dasharray:none!important;stroke-dashoffset:0!important;animation:none!important}
@media (prefers-reduced-motion: reduce){[data-vv-stroke] svg path[stroke]{stroke-dasharray:none!important;stroke-dashoffset:0!important;animation:none!important}}
/* MASTER SAFETY GATE. The pre-reveal offsets are only ever allowed to apply once the frame
   loop has proven itself alive (see vvProveMotion below, which adds .vv-motion-live from
   inside a requestAnimationFrame that actually ran). Anywhere rAF/IntersectionObserver are
   throttled or never serviced — background tab, print and PDF export, html-to-image capture,
   headless screenshots, embedded webviews — the class is never added and every animated node
   renders at its resting design values. Hidden is additive; visible is the default. */
html:not(.vv-motion-live) [data-vv-reveal]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important;animation:none!important;transition:none!important}
html:not(.vv-motion-live) [data-vv-hud-fx]{display:none!important}
@media (prefers-reduced-motion: reduce){[data-vv-reveal]{animation:none!important;transition:none!important;opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}[data-vv-hud-fx]{display:none!important}}`;

function vvInjectCss() {
  if (typeof document === 'undefined' || document.getElementById('vv-hud-motion')) return;
  const el = document.createElement('style');
  el.id = 'vv-hud-motion';
  el.textContent = VV_HUD_CSS;
  document.head.appendChild(el);
}
vvInjectCss();

/* Proof of life for the animation pipeline, and the one thing that must never latch shut.
   A single rAF at module load is not enough: any load that begins while the document is not
   painting (background tab, an iframe that starts hidden, session restore, a preview pane)
   never services that frame, and the CSS gate would then keep every animation disabled for
   the rest of the session. So the probe RE-ARMS — on visibilitychange, and on the first real
   user input — until a frame is actually served. `vvMotionLive` also gates the JS-side
   scramble/count-up effects, which cannot be expressed in CSS. */
let _vvLive = false;
const vvMotionLive = () => _vvLive;
const _vvLiveSubs = new Set();
(function vvProveMotion() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (typeof requestAnimationFrame !== 'function') return;
  let pending = false;
  const settle = () => {
    if (_vvLive) return;
    _vvLive = true;
    document.documentElement.classList.add('vv-motion-live');
    /* The gate lifting is a visibility change for anything still in phase 'idle', so make
       every position test re-run in the same tick: a synthetic scroll event wakes the
       listeners, and the subscribers re-render the components whose effects read the flag.
       Without this, an element that is already past the trigger line would blink out until
       the user's next scroll. */
    window.dispatchEvent(new Event('scroll'));
    _vvLiveSubs.forEach((fn) => fn());
    detach();
  };
  const arm = () => {
    if (_vvLive || pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; settle(); });
  };
  const onVis = () => { if (!document.hidden) arm(); };
  function detach() {
    document.removeEventListener('visibilitychange', onVis);
    window.removeEventListener('scroll', arm, true);
    window.removeEventListener('pointerdown', arm, true);
    window.removeEventListener('pointermove', arm, true);
    window.removeEventListener('keydown', arm, true);
    window.removeEventListener('focus', arm);
  }
  document.addEventListener('visibilitychange', onVis);
  window.addEventListener('scroll', arm, { passive: true, capture: true });
  window.addEventListener('pointerdown', arm, { passive: true, capture: true });
  window.addEventListener('pointermove', arm, { passive: true, capture: true });
  window.addEventListener('keydown', arm, { capture: true });
  window.addEventListener('focus', arm);
  arm();
}());

/* Subscribe to the live flag. Used by the readout components, whose effects must re-run if
   the pipeline only wakes up after they mounted. */
function useVvLive() {
  const [live, setLive] = React.useState(_vvLive);
  React.useEffect(() => {
    if (_vvLive) { setLive(true); return undefined; }
    const fn = () => setLive(true);
    _vvLiveSubs.add(fn);
    return () => { _vvLiveSubs.delete(fn); };
  }, []);
  return live;
}

const vvReduced = () => typeof window !== 'undefined'
  && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Global motion settings ───────────────────────────────────────────────────────────────
   Site-wide, not per-call-site: the chamfered-frame treatment, the global speed and delay,
   and whether a reveal re-arms when it leaves the viewport are one editorial decision each,
   so they live in a small subscribable store the Tweaks panel writes to — the same device
   NavBar uses for its mobile-menu style. Reveal call sites keep saying WHAT they are (a frame,
   a paragraph, a row); the store says HOW frames behave. */
const VV_MOTION_DEFAULTS = { frame: 'rise', speed: 1.2, delay: 0, replay: false };
let _vvOpts = { ...VV_MOTION_DEFAULTS, ...((typeof window !== 'undefined' && window.__vvMotion) || {}) };
const _vvSubs = new Set();
function vvSetMotion(patch) {
  _vvOpts = { ..._vvOpts, ...patch };
  if (typeof window !== 'undefined') window.__vvMotion = _vvOpts;
  _vvSubs.forEach((fn) => fn());
}
function useVvMotion() {
  const [, force] = React.useState(0);
  React.useEffect(() => {
    const fn = () => force((x) => x + 1);
    _vvSubs.add(fn);
    return () => { _vvSubs.delete(fn); };
  }, []);
  return _vvOpts;
}

/* Reveal trigger, in order of reliability: a SYNCHRONOUS rect test first (so anything already
   on screen never waits on a callback at all), then IntersectionObserver, then a plain scroll
   listener as an independent second path. All three are position-correct — there is
   deliberately NO unconditional timer here: a timer would fire sections that are still far
   below the fold, which collapses the whole page's choreography into the first second after
   load. The "nothing ever fires" case is handled entirely by the CSS gate above, which shows
   the resting design instead of guessing at a reveal time.

   The rootMargin fires slightly before the box is fully in view — a reveal that starts exactly
   at the viewport edge always reads as late. */
function vvWhenVisible(node, cb) {
  if (!node || typeof window === 'undefined') { cb(); return () => {}; }
  let fired = false;
  let io = null;
  const inView = () => {
    const r = node.getBoundingClientRect();
    const h = window.innerHeight || document.documentElement.clientHeight || 0;
    /* One-directional on purpose: true while the box is in view AND once it has been scrolled
       PAST. A two-sided test (`r.bottom > 0 && …`) strands anything a single scroll jump
       clears — fling, scrollbar drag, an in-page anchor like #models, or reload scroll
       restoration — because it is never in view on any sampled frame. Nothing fires early:
       below-fold elements still have r.top > h at load. */
    return r.top < h * 0.9;
  };
  const cleanup = () => {
    if (io) { io.disconnect(); io = null; }
    window.removeEventListener('scroll', onScroll, true);
    window.removeEventListener('resize', onScroll);
  };
  const fire = () => { if (fired) return; fired = true; cleanup(); cb(); };
  function onScroll() { if (inView()) fire(); }
  if (inView()) { fire(); return cleanup; }
  if (typeof IntersectionObserver !== 'undefined') {
    io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) fire(); },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    io.observe(node);
  }
  window.addEventListener('scroll', onScroll, { passive: true, capture: true });
  window.addEventListener('resize', onScroll);
  return cleanup;
}

/* What a chamfered frame tells the content inside it. The frame animation is the section's
   opening gesture and the content OVERLAPS it: children add `offset` — the frame's own delay
   plus a fraction of its duration (already speed-scaled) — so the first content is moving
   while the shape is still settling. Waiting for the shape to finish reads as two separate
   animations and pushes everything downstream by a full frame duration, which is expensive on
   a long section where the content itself is a long stagger.

   `group` is for sections too tall to reveal by position — the comparison table above all.
   Its rows are spread over several screens, so triggering each on its own position means the
   user scrolls a long way to see the section assemble. A grouped frame instead hands its own
   trigger down: every descendant starts when the FRAME was reached, staggered by delay alone. */
const VV_FRAME_OVERLAP = 0.28;
const VvFrameCtx = React.createContext(null);

/* Three-state machine, not a boolean: 'idle' (pre-reveal offsets applied) → 'run'
   (transition to rest + HUD furniture mounted) → 'done' (all motion styles dropped so the
   node's computed style is byte-identical to the un-animated design, and hover transitions
   the element owns are no longer competing with an entrance transition).

   With `replay` on the machine is cyclic: leaving the viewport re-arms it back to 'idle', so
   the reveal plays again on re-entry. That needs a TWO-sided test — the opposite of the
   one-directional default — and a live observer that is never torn down, which is why the two
   modes take different paths here rather than sharing vvWhenVisible. */
function useVvReveal(delayIn = 0, durIn = 560, inherit = null, eager = false) {
  const ref = React.useRef(null);
  const opts = useVvMotion();
  const sp = opts.speed > 0 ? opts.speed : 1;
  const dur = Math.max(60, Math.round(durIn / sp));
  /* An inherited offset is already speed-scaled and already carries the panel's global delay,
     so it replaces that term rather than stacking a second copy of it. */
  const offset = inherit ? Math.round(inherit.offset || 0) : 0;
  const delay = Math.max(0, Math.round(delayIn / sp) + (offset ? 0 : Math.round(opts.delay || 0)) + offset);
  const [phase, setPhase] = React.useState(() => (vvReduced() ? 'done' : 'idle'));
  const replay = !!opts.replay;
  /* null = trigger on my own position. true/false = follow the grouped ancestor frame. */
  const follow = inherit && inherit.group ? !!inherit.started : null;
  React.useEffect(() => {
    if (vvReduced()) { setPhase('done'); return undefined; }
    const node = ref.current;
    if (!node || typeof window === 'undefined') { setPhase('done'); return undefined; }
    let t1 = 0, t2 = 0, io = null, running = false, torn = false;
    const vh = () => window.innerHeight || document.documentElement.clientHeight || 0;
    const rect = () => node.getBoundingClientRect();
    /* A grouped frame fires the whole section on a timer, so it must not wait for the box to
       be comfortably in view the way a single element does: its content can be several screens
       tall, and the stagger needs to be already running by the time the user has scrolled to
       the far end of it. Its trigger line therefore sits at the very bottom edge of the
       viewport — the moment the top of the section appears, the section starts. */
    const line = () => vh() * (eager ? 1 : 0.9);
    const past = () => rect().top < line();
    const within = () => { const r = rect(); return r.bottom > 0 && r.top < line(); };
    const clearTimers = () => { clearTimeout(t1); clearTimeout(t2); };
    const teardown = () => {
      if (torn) return;
      torn = true;
      if (io) { io.disconnect(); io = null; }
      window.removeEventListener('scroll', evaluate, true);
      window.removeEventListener('resize', evaluate);
    };
    const start = () => {
      if (running) return;
      running = true;
      clearTimers();
      t1 = setTimeout(() => {
        setPhase('run');
        t2 = setTimeout(() => setPhase('done'), dur + 420);
      }, delay);
    };
    const rearm = () => {
      if (!running) return;
      running = false;
      clearTimers();
      setPhase('idle');
    };
    function evaluate() {
      if (follow !== null) { if (follow) start(); else rearm(); return; }
      if (replay) { if (within()) start(); else rearm(); return; }
      if (past()) { start(); teardown(); }
    }
    /* A grouped child needs no observer of its own — the frame is its trigger. */
    if (follow !== null) { evaluate(); return () => { teardown(); clearTimers(); }; }
    if (typeof IntersectionObserver !== 'undefined') {
      /* threshold is a fraction of the OBSERVED box, so the default 5% is a whole screenful on
         a section three screens tall — eager sections take any intersection at all. */
      io = new IntersectionObserver(evaluate, eager ? { threshold: 0 } : { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
      io.observe(node);
    }
    window.addEventListener('scroll', evaluate, { passive: true, capture: true });
    window.addEventListener('resize', evaluate);
    evaluate();
    return () => { teardown(); clearTimers(); };
  }, [delay, dur, replay, follow, eager]);
  return [ref, phase, dur, delay];
}

const VV_FROM = {
  acquire: { opacity: 0, transform: 'scale(0.985)' },
  wipe: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  up: { opacity: 0, transform: 'translate3d(0,16px,0)', filter: 'blur(6px)' },
  side: { opacity: 0, transform: 'translate3d(-18px,0,0)', filter: 'blur(4px)' },
  text: { opacity: 0, transform: 'translate3d(0,10px,0)', clipPath: 'inset(0 0 100% 0)' },
  line: { opacity: 0, transform: 'scaleX(0)' },
  rise: { opacity: 0, transform: 'translate3d(0,28px,0) scale(0.97)' },
  fade: { opacity: 0 },
  /* Chamfered-frame treatments, all selectable from the Tweaks panel. */
  corners: { opacity: 0 },
  scanwipe: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  crt: { opacity: 0, transform: 'scaleY(0.05)' },
  glitch: { opacity: 0 },
  expand: { opacity: 0, transform: 'scale(0.94)', filter: 'blur(8px)' },
  stroke: { opacity: 0 },
  strokecrt: { opacity: 0, transform: 'scaleY(0.05)' },
};
/* Which transient HUD furniture each frame treatment mounts while it runs. Anything not
   listed animates on transforms alone. */
const VV_FRAME_FX = {
  acquire: { brackets: true, scan: true, flicker: true },
  corners: { brackets: true },
  scanwipe: { scan: true },
  crt: { flicker: true },
  strokecrt: { flicker: true },
};
/* The chamfered-container options offered in the Tweaks panel, in menu order. */
const VV_FRAME_OPTIONS = [
  { value: 'acquire', label: 'Acquire — brackets + scan + flicker' },
  { value: 'corners', label: 'Corner brackets — snap in, no flicker' },
  { value: 'scanwipe', label: 'Scan wipe — line reveals as it travels' },
  { value: 'crt', label: 'CRT boot — unfolds from a line' },
  { value: 'stroke', label: 'Stroke draw — the outline draws itself' },
  { value: 'strokecrt', label: 'Stroke + CRT — unfolds as the outline draws' },
  { value: 'glitch', label: 'Glitch — sliced displacement, then settles' },
  { value: 'expand', label: 'Expand — defocused scale-up' },
  { value: 'wipe', label: 'Wipe — unfurl from the top edge' },
  { value: 'rise', label: 'Rise — quiet lift + fade' },
  { value: 'fade', label: 'Fade — opacity only' },
  { value: 'off', label: 'Off — no frame animation' },
];
/* clip-path cannot interpolate from inset() to `none`, so the wiping variants land on an
   OVERSIZED inset (clips nothing) during the transition; the `done` phase then drops the
   property entirely, leaving the element's computed style identical to the design. */
const VV_TO_CLIP = 'inset(-24% -8% -24% -8%)';
const VV_TO = { opacity: 1, transform: 'none', filter: 'none', clipPath: 'none' };
const VV_PROPS = 'opacity,transform,filter,clip-path';

/* Transient HUD furniture. Mounted only for the duration of `run`, then gone — so the
   design at rest never carries brackets or a scan line it did not have before. */
function VvAcquireFx({ dur, tone, brackets, scan }) {
  const b = { position: 'absolute', width: 13, height: 13, borderColor: tone, borderStyle: 'solid', borderWidth: 0, animation: `vvBracket ${dur + 260}ms ${VV_EASE} both` };
  return (
    <span data-vv-hud-fx="" aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
      {brackets ? <>
        <span style={{ ...b, top: -1, left: -1, borderTopWidth: 1, borderLeftWidth: 1 }} />
        <span style={{ ...b, top: -1, right: -1, borderTopWidth: 1, borderRightWidth: 1 }} />
        <span style={{ ...b, bottom: -1, left: -1, borderBottomWidth: 1, borderLeftWidth: 1 }} />
        <span style={{ ...b, bottom: -1, right: -1, borderBottomWidth: 1, borderRightWidth: 1 }} />
      </> : null}
      {scan ? <span style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '42%', background: `linear-gradient(180deg, rgba(236,154,0,0) 0%, ${tone === 'var(--vv-amber)' ? 'rgba(236,154,0,0.10)' : 'rgba(218,232,242,0.09)'} 82%, ${tone} 100%)`, opacity: 0.9, animation: `vvScanSweep ${dur + 200}ms ${VV_EASE} both` }} /> : null}
    </span>
  );
}

/* One wrapper element, one transition. `as` keeps the wrapper semantic where it matters
   (section/li/h2) so nothing extra lands in the accessibility tree.

   variant="frame" is indirect on purpose: every chamfered container asks for "the frame
   treatment" and the Tweaks panel decides which one that is, so one control restyles the
   whole page instead of nine call sites. */
function Reveal({ variant = 'up', delay = 0, dur = 560, as = 'div', tone = 'var(--vv-amber)', group = false, style, children, ...rest }) {
  const opts = useVvMotion();
  const inherit = React.useContext(VvFrameCtx);
  const named = variant === 'frame' ? (opts.frame || 'acquire') : variant;
  const off = named === 'off';
  const [ref, rawPhase, runDur, runDelay] = useVvReveal(off ? 0 : delay, dur, inherit, group && !inherit);
  const phase = off ? 'done' : rawPhase;
  /* A frame hands the content inside it a start time PART WAY into its own animation, so the
     two overlap. With `off` there is nothing to wait for, so the offset collapses to whatever
     an outer frame already imposed. */
  const isFrame = variant === 'frame' || group;
  const frameCtx = React.useMemo(() => (isFrame ? {
    offset: off ? (inherit ? inherit.offset : 0) : runDelay + Math.round(runDur * VV_FRAME_OVERLAP),
    group: group || !!(inherit && inherit.group),
    started: off ? true : rawPhase !== 'idle',
  } : null), [isFrame, off, runDelay, runDur, group, rawPhase, inherit]);
  const Tag = as;
  const from = VV_FROM[named] || VV_FROM.up;
  const fx = VV_FRAME_FX[named] || {};
  const anim = named === 'glitch' ? `vvGlitchIn ${Math.min(runDur, 640)}ms steps(1,end) both`
    : fx.flicker ? `vvFlicker ${Math.min(runDur, 520)}ms steps(1,end) both` : undefined;
  const motion = phase === 'done' ? null
    : phase === 'idle' ? { ...from, willChange: VV_PROPS }
      : { ...VV_TO, ...(from.clipPath ? { clipPath: VV_TO_CLIP } : null), transition: VV_PROPS.split(',').map((p) => `${p} ${runDur}ms ${VV_EASE}`).join(', '), willChange: VV_PROPS, animation: anim };
  const needsHost = (fx.brackets || fx.scan) && phase === 'run';
  /* The two stroke treatments reach DOWN into the chamfered outline rather than mounting
     anything: this hook is what the [data-vv-stroke] rule keys off, and the drawing duration
     rides the same speed control as everything else. */
  const drawsStroke = (named === 'stroke' || named === 'strokecrt') && phase === 'run';
  return (
    <Tag ref={ref} data-vv-reveal={named} {...(drawsStroke ? { 'data-vv-stroke': '' } : null)} style={{ ...style, ...motion, ...(drawsStroke ? { '--vv-stroke-dur': `${runDur + 220}ms` } : null), ...(needsHost && !(style && style.position) ? { position: 'relative' } : null), ...(named === 'line' && phase !== 'done' ? { transformOrigin: 'left center' } : null) }} {...rest}>
      {frameCtx ? <VvFrameCtx.Provider value={frameCtx}>{children}</VvFrameCtx.Provider> : children}
      {needsHost ? <VvAcquireFx dur={runDur} tone={tone} brackets={fx.brackets} scan={fx.scan} /> : null}
    </Tag>
  );
}

/* The trigger half of stacked sequencing. RevealSeq shifts a subtree's CLOCK, but on its own
   that is not sequencing: its children still trigger on their own position, so an element a
   screen further down starts its offset only once the user has already scrolled to it — the
   offset becomes a wait in front of content that is on screen and blank, which is exactly the
   failure this pass was meant to remove.

   RevealGroup supplies the missing half. It animates nothing itself: it watches its own box
   with the eager trigger (the moment its top edge appears) and hands every descendant a
   grouped context, so the whole section runs off ONE start time and the RevealSeq offsets
   become real ordering. Grouped and shifted together, a stacked section assembles top to
   bottom from the instant its top edge is visible, which is why the offsets below are sized to
   the ramp above them rather than to how far the user has scrolled.

   `on` is the layout switch: side by side there is nothing to sequence, so it passes straight
   through and the section keeps per-element position triggers. */
function RevealGroup({ on = true, style, children }) {
  const opts = useVvMotion();
  const inherit = React.useContext(VvFrameCtx);
  const [ref, phase] = useVvReveal(0, 60, null, true);
  const value = React.useMemo(() => ({
    offset: inherit ? (inherit.offset || 0) : Math.round(opts.delay || 0),
    group: true,
    started: phase !== 'idle',
  }), [inherit, opts.delay, phase]);
  return <div ref={ref} style={style}>{on ? <VvFrameCtx.Provider value={value}>{children}</VvFrameCtx.Provider> : children}</div>;
}

/* Column ordering once a two-column section stacks. Side by side, the two columns run their
   delay ramps in PARALLEL on purpose — the eye takes both in at once, and making the right
   column wait for the left would leave half the section visibly dead. Stacked on a phone the
   same two ramps are one vertical sequence, and parallel ramps read as out of order: the right
   column's ramp starts near 0 while the left column's copy is still waiting behind its eyebrow
   and headline, so any scroll that brings both columns into view on one frame reveals the
   lower column first. RevealSeq pushes a subtree's whole ramp past a given point without
   touching the individual delays, so the same markup sequences correctly in either layout.

   It only shifts the clock — the children still trigger on their own position (or on a grouped
   ancestor, which is passed straight through), so a long stacked column still reveals as the
   user reaches it rather than all at once. */
function RevealSeq({ ms = 0, children }) {
  const inherit = React.useContext(VvFrameCtx);
  const opts = useVvMotion();
  const sp = opts.speed > 0 ? opts.speed : 1;
  /* An inherited offset already carries the global delay; standing alone we add it ourselves,
     because a non-zero offset makes useVvReveal drop its own copy of that term. */
  const value = React.useMemo(() => ({
    offset: Math.round((inherit ? (inherit.offset || 0) : Math.round(opts.delay || 0)) + ms / sp),
    group: !!(inherit && inherit.group),
    started: inherit ? inherit.started : true,
  }), [inherit, ms, sp, opts.delay]);
  if (!ms) return children;
  return <VvFrameCtx.Provider value={value}>{children}</VvFrameCtx.Provider>;
}

/* Character-decode readout — the same idiom as the Core-technology slider's typewriter
   caption, generalised. Glyphs land left to right; unresolved ones churn through a mono
   scramble set, so a headline arrives the way a callsign resolves on a radar display.
   Ends on the exact source string, and the DOM node is plain text at rest.

   The resting string is the INITIAL state, not the end state: if the frame loop is dead the
   label simply reads correctly and never scrambles. The scramble is entered from a layout
   effect (before paint) so a live browser never flashes the resolved text first. */
const VV_GLYPHS = '▚▞░▓█/\\|<>_=+*#0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const vvLayout = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
function HudText({ text, delay: delayIn = 0, speed = 26, as = 'span', caret = false, style, ...rest }) {
  const str = String(text == null ? '' : text);
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(str);
  const [live, setLive] = React.useState(false);
  const pipeLive = useVvLive();
  const inherit = React.useContext(VvFrameCtx);
  const delay = delayIn + (inherit ? Math.round(inherit.offset || 0) : 0);
  vvLayout(() => {
    if (vvReduced() || !pipeLive || typeof requestAnimationFrame !== 'function') return undefined;
    let raf = 0, t0 = 0, start = 0;
    const blank = () => {
      let s = '';
      for (let i = 0; i < str.length; i += 1) s += (str[i] === ' ' || str[i] === '\n') ? str[i] : ' ';
      return s;
    };
    const stop = vvWhenVisible(ref.current, () => {
      setShown(blank());
      t0 = setTimeout(() => {
        setLive(true);
        start = performance.now();
        const step = (now) => {
          const solved = Math.floor((now - start) / speed);
          if (solved >= str.length) { setShown(str); setLive(false); return; }
          let out = '';
          for (let i = 0; i < str.length; i += 1) {
            const c = str[i];
            if (i < solved || c === ' ' || c === '\n') out += c;
            else if (i < solved + 6) out += VV_GLYPHS[(Math.random() * VV_GLYPHS.length) | 0];
            else out += ' ';
          }
          setShown(out);
          raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      }, delay);
    });
    /* Hard floor — the label is correct past this point whatever happened. Bounded by the
       readout's own run length, so it can only ever rescue a scramble that has ALREADY
       started; it never reveals a section the user has not reached. */
    const floor = setTimeout(() => { setShown(str); setLive(false); }, 1200 + delay + str.length * speed);
    return () => { stop(); clearTimeout(t0); clearTimeout(floor); cancelAnimationFrame(raf); };
  }, [str, delay, speed, pipeLive]);
  const Tag = as;
  return (
    <Tag ref={ref} style={style} {...rest}>{shown}{caret && live ? <span aria-hidden="true" style={{ display: 'inline-block', width: '0.5em', height: '1em', marginLeft: '0.06em', background: 'var(--vv-amber)', verticalAlign: '-0.12em', animation: 'vvCaret 480ms steps(1,end) infinite' }} /> : null}</Tag>
  );
}

/* Instrument count-up. Parses the numeric core out of a display string ("99.2%", "3×",
   "< 5 ms") and rolls only that, so units, symbols and spacing are preserved verbatim and
   the resting label is character-identical to the design. */
function HudNumber({ value, delay: delayIn = 0, dur = 1100, as = 'span', style, ...rest }) {
  const str = String(value == null ? '' : value);
  const m = str.match(/-?\d+(?:[.,]\d+)?/);
  const ref = React.useRef(null);
  const [out, setOut] = React.useState(str);
  const pipeLive = useVvLive();
  const inherit = React.useContext(VvFrameCtx);
  const delay = delayIn + (inherit ? Math.round(inherit.offset || 0) : 0);
  vvLayout(() => {
    if (!m || vvReduced() || !pipeLive || typeof requestAnimationFrame !== 'function') return undefined;
    const target = parseFloat(m[0].replace(',', '.'));
    const decimals = (m[0].split(/[.,]/)[1] || '').length;
    let raf = 0, t0 = 0, start = 0;
    const stop = vvWhenVisible(ref.current, () => {
      setOut(str.replace(m[0], m[0].replace(/\d/g, '0')));
      t0 = setTimeout(() => {
        start = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const n = (target * eased).toFixed(decimals);
          setOut(str.replace(m[0], m[0].includes(',') ? n.replace('.', ',') : n));
          if (p < 1) raf = requestAnimationFrame(step); else setOut(str);
        };
        raf = requestAnimationFrame(step);
      }, delay);
    });
    /* Hard floor — the figure reads its real value past this point whatever happened. It only
       ever rescues a roll that has already started: the initial state IS the real value. */
    const floor = setTimeout(() => setOut(str), 1200 + delay + dur);
    return () => { stop(); clearTimeout(t0); clearTimeout(floor); cancelAnimationFrame(raf); };
  }, [str, delay, dur, pipeLive]);
  const Tag = as;
  return <Tag ref={ref} style={{ fontVariantNumeric: 'tabular-nums', ...style }} {...rest}>{out}</Tag>;
}

Object.assign(window, { vvReduced, vvWhenVisible, Reveal, RevealSeq, RevealGroup, HudText, HudNumber, useVvReveal, useVvMotion, useVvLive, vvSetMotion, vvMotionLive, VV_FRAME_OPTIONS, VV_EASE, VV_HUD_CSS });
