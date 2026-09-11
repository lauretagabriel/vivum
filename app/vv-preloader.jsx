/* Boot gate, stage two. The cover itself is static markup in index.html so it is on screen
   from the first frame, before React, Babel or the design-system bundle have loaded; this file
   takes that cover over as soon as it exists and reports REAL asset progress into it.

   The homepage is built on three video plates and eight stills; served cold they
   arrive over several seconds and the page assembles in public — plates popping in behind copy
   that has already revealed, the hero rising against an empty rectangle. This holds a single
   acquire screen until every one of them is decoded, then hands over to a site that paints
   complete on its first frame.

   Progress is REAL: each asset settles its own weight, so the rail tracks the network rather
   than a scripted animation. Videos carry the most weight because they are the bytes that
   actually matter — a fake even ramp would sit at 90% for the whole hero download. */

/* Everything the page paints above the fold or scrolls into. `w` is relative byte weight,
   not a guess at time: it decides how much of the rail each asset is worth.

   A page with a different plate set declares its own list on `window.__vvBootAssets` before
   this file runs (see autonomy.html) — one preloader, one rail, per-page manifest. */
const VV_BOOT_ASSETS = (typeof window !== 'undefined' && Array.isArray(window.__vvBootAssets) && window.__vvBootAssets.length ? window.__vvBootAssets : [
  { kind: 'image', src: '../../assets/vivum-logo-gray.svg', w: 1 },
  { kind: 'image', src: '../../assets/plates/biological-intelligence-leaf.jpg', w: 3 },
  { kind: 'image', src: '../../assets/plates/dynamic-neural-brain.jpg', w: 3 },
  { kind: 'image', src: '../../assets/plates/core-tech-adaptive-learning.png', w: 2 },
  { kind: 'image', src: '../../assets/plates/core-tech-temporal-awareness.png', w: 2 },
  { kind: 'image', src: '../../assets/plates/core-tech-contextual-understanding.png', w: 2 },
  { kind: 'image', src: '../../assets/plates/core-tech-efficient-computation.png', w: 2 },
  { kind: 'video', src: '../../assets/plates/home-banner-video.mp4', w: 10 },
  { kind: 'video', src: '../../assets/plates/biological-intelligence.mp4', w: 7 },
  { kind: 'video', src: '../../assets/plates/evolutionary-intelligence.mp4', w: 7 },
]);
const VV_BOOT_FONT_W = 3;
/* A cold cache on a bad connection must not trap anyone on a loading screen: past this the
   gate opens regardless and the remaining plates finish arriving behind the live page — the
   same behaviour the site had before, but only as a failure mode instead of the default. */
const VV_BOOT_CAP_MS = 10000;
const VV_BOOT_ITEM_MS = 6000;
/* Enough to read as a deliberate hand-off rather than a flash of dark. Warm caches settle in
   ~80ms, and a 90ms overlay looks like a rendering fault. */
const VV_BOOT_MIN_MS = 900;

const vvBootUrl = (p) => (typeof window.__vvResolveAsset === 'function' ? window.__vvResolveAsset(p) : p);

function vvBootLoadImage(url) {
  return new Promise((done) => {
    const img = new Image();
    const settle = () => done();
    img.onload = () => { if (img.decode) img.decode().then(settle, settle); else settle(); };
    img.onerror = settle;
    img.src = url;
  });
}

/* `canplaythrough` is the honest signal — the browser believes it can play the whole thing
   without stalling — but it is also the one a browser may simply never fire (autoplay policy,
   metered connection, a codec it deprioritises). `loadeddata` is accepted as the fallback so a
   plate that is merely buffering does not hold the whole site hostage. */
function vvBootLoadVideo(url) {
  return new Promise((done) => {
    const v = document.createElement('video');
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      clearTimeout(soft);
      clearTimeout(hard);
      v.removeAttribute('src');
      done();
    };
    const soft = setTimeout(() => { if (v.readyState >= 2) settle(); }, 2500);
    const hard = setTimeout(settle, VV_BOOT_ITEM_MS);
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.preload = 'auto';
    v.addEventListener('canplaythrough', settle);
    v.addEventListener('error', settle);
    v.src = url;
    v.load();
  });
}

/* Drives the whole gate: total weight in, settled weight out, plus a `done` flag that only
   flips once the minimum display time has also elapsed. */
function useVvBootProgress(t0In) {
  const total = VV_BOOT_ASSETS.reduce((s, a) => s + a.w, 0) + VV_BOOT_FONT_W;
  const [loaded, setLoaded] = React.useState(0);
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    let live = true;
    /* Minimum display time is measured from when the COVER appeared, not from when this
       component mounted — by then it has already been up for the whole script boot. */
    const t0 = t0In || Date.now();
    let settled = 0;
    const credit = (w) => { if (!live) return; settled += w; setLoaded(settled); };
    const finish = () => {
      if (!live) return;
      const wait = Math.max(0, VV_BOOT_MIN_MS - (Date.now() - t0));
      setTimeout(() => { if (live) { setLoaded(total); setDone(true); } }, wait);
    };
    /* A tab that is not visible has its media loading deprioritised to the point where
       canplaythrough may never fire, so blocking on footage there buys nothing and costs the
       full cap. The fetch is still started — it warms the cache for when the tab is looked
       at — but the gate does not wait on it. */
    const hidden = typeof document !== 'undefined' && document.visibilityState === 'hidden';
    const jobs = VV_BOOT_ASSETS.map((a) => {
      const url = vvBootUrl(a.src);
      /* The self-contained build swaps footage for a still, so trust the resolved URL's own
         extension rather than the manifest's declared kind. */
      const isVideo = a.kind === 'video' && /\.mp4($|\?)/i.test(String(url));
      if (isVideo && hidden) { vvBootLoadVideo(url); return Promise.resolve().then(() => credit(a.w)); }
      return (isVideo ? vvBootLoadVideo(url) : vvBootLoadImage(url)).then(() => credit(a.w));
    });
    const fonts = (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve())
      .then(() => credit(VV_BOOT_FONT_W), () => credit(VV_BOOT_FONT_W));
    Promise.all(jobs.concat([fonts])).then(finish);
    const cap = setTimeout(finish, VV_BOOT_CAP_MS);
    return () => { live = false; clearTimeout(cap); };
  }, [total, t0In]);
  return [total ? loaded / total : 1, done];
}

/* The rail must never sit still while bytes are moving: a big plate settles in one step, so raw
   progress jumps 0 → 34% → 71%. This eases the DISPLAYED value toward the real one, which reads
   as continuous acquisition without inventing progress that hasn't happened — it can only ever
   approach the true figure, never overtake it.

   The current value lives in a ref, not a local: the effect re-runs on every progress tick, and
   a local would reset to 0 there — the counter would fall back to zero each time an asset
   landed. An interval rather than rAF because rAF is not serviced in a hidden tab, and a frozen
   00% is the one state a loading screen must never show. */
function useVvBootEased(target, done, active = true) {
  const [shown, setShown] = React.useState(0);
  const cur = React.useRef(0);
  React.useEffect(() => {
    /* Inactive when the static cover is driving the rail: it runs this same easing itself, and
       two eased stages in series would make the counter lag the network by half a second. */
    if (!active) return undefined;
    if (vvReduced()) { cur.current = target; setShown(target); return undefined; }
    const id = setInterval(() => {
      cur.current += (target - cur.current) * (done ? 0.3 : 0.12);
      if (target - cur.current < 0.004) cur.current = target;
      setShown(cur.current);
      if (cur.current === target) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [target, done, active]);
  return active ? shown : target;
}

const VV_BOOT_CSS = `
@keyframes vvBootScan{0%{transform:translateX(-120%)}100%{transform:translateX(420%)}}
@keyframes vvBootPulse{0%,100%{opacity:.34}50%{opacity:1}}
@media (prefers-reduced-motion:reduce){[data-vv-preload] *{animation:none!important}}
`;

/* Renders over everything until `onReady` has fired and its own fade has finished. Owns the
   scroll lock: the site is not mounted yet, so nothing else can. */
function Preloader({ onReady }) {
  /* index.html paints a cover on the first frame — before this file, or React itself, has
     arrived. Where that exists it stays ON SCREEN and this component only feeds it: one cover
     for the whole boot, so the rail never restarts at the hand-off and there is no second
     overlay to cross-fade. The React overlay below is the fallback for any page that mounts
     the site without one. */
  const bridge = React.useMemo(() => (typeof window !== 'undefined' ? window.__vvBoot : null) || null, []);
  const [raw, loaded] = useVvBootProgress(bridge ? bridge.t0 : 0);
  const pct = useVvBootEased(raw, loaded, !bridge);
  React.useEffect(() => {
    if (!bridge) return;
    bridge.set(bridge.base + (1 - bridge.base) * raw, loaded ? 'Ready' : 'Loading data');
  }, [bridge, raw, loaded]);
  const [phase, setPhase] = React.useState('load');
  const fired = React.useRef(false);

  React.useEffect(() => {
    if (!loaded || fired.current) return undefined;
    fired.current = true;
    /* One frame between "the site may mount" and "the cover starts lifting", so the hero's own
       entrance begins under the overlay rather than after it — the two motions overlap the same
       way a chamfered frame overlaps its content. */
    if (onReady) onReady();
    const t = setTimeout(() => { setPhase('exit'); if (bridge) bridge.exit(); }, 90);
    const g = setTimeout(() => setPhase('gone'), 90 + 760);
    return () => { clearTimeout(t); clearTimeout(g); };
  }, [loaded, onReady, bridge]);

  React.useEffect(() => {
    /* The static cover owns the lock itself (html:has(#vv-boot) in index.html), so taking a
       second one here would restore `hidden` as this effect's "previous" value. */
    if (bridge || phase === 'gone') return undefined;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { html.style.overflow = prev; };
  }, [phase, bridge]);

  if (bridge || phase === 'gone') return null;
  const out = phase === 'exit';
  const shown = Math.round(pct * 100);
  const reduced = vvReduced();

  return (
    <div data-vv-preload="" role="status" aria-live="polite" aria-label={`Loading, ${shown} percent`}
      style={{
        position: 'fixed', inset: 0, zIndex: 200, display: 'grid', placeItems: 'center',
        background: 'var(--surface-canvas, #001121)', padding: '24px',
        opacity: out ? 0 : 1,
        /* The cover scales up a hair as it goes, so it reads as lifting off the page rather
           than dissolving in place. */
        transform: out && !reduced ? 'scale(1.03)' : 'none',
        transition: `opacity 700ms ${VV_EASE}, transform 700ms ${VV_EASE}`,
        pointerEvents: out ? 'none' : 'auto',
      }}>
      <style>{VV_BOOT_CSS}</style>
      <div style={{ position: 'relative', width: 'min(340px, 78vw)', display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 6vw, 40px)' }}>
        {/* Corner brackets: the same acquire furniture the sections use when their frames draw,
            so the boot screen is recognisably the same system and not a generic spinner. */}
        {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h]) => (
          <span key={`${v}${h}`} aria-hidden="true" style={{
            position: 'absolute', [v]: -18, [h]: -18, width: 13, height: 13,
            [`border${v === 'top' ? 'Top' : 'Bottom'}`]: '1px solid var(--vv-amber)',
            [`border${h === 'left' ? 'Left' : 'Right'}`]: '1px solid var(--vv-amber)',
            opacity: 0.5,
          }} />
        ))}
        <img src={vvBootUrl('../../assets/vivum-logo-gray.svg')} alt="Vivum AI"
          style={{ height: 34, width: 'auto', display: 'block', margin: '0 auto', opacity: 0.92 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ position: 'relative', height: 2, background: 'var(--vv-ice-14)', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', inset: '0 auto 0 0', width: `${Math.max(2, shown)}%`, background: 'var(--vv-amber)', transition: 'width 180ms linear' }} />
            {/* Travelling highlight — the only motion that is not tied to real progress, and it
                deliberately carries no position information: it sweeps the empty track so a
                stalled download still looks like a live connection rather than a hung page. */}
            {!reduced && !out ? (
              <span aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '26%', background: 'linear-gradient(90deg, rgba(236,154,0,0) 0%, rgba(236,154,0,0.55) 55%, rgba(236,154,0,0) 100%)', animation: `vvBootScan 2200ms ${VV_EASE} infinite` }} />
            ) : null}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            <span style={{ color: 'var(--vv-ice-56)', animation: reduced || out ? undefined : 'vvBootPulse 1800ms ease-in-out infinite' }}>
              {loaded ? 'Ready' : 'Loading data'}
            </span>
            {/* Tabular figures: a proportional 1 makes the counter jitter its own width as it
                climbs, which is exactly the kind of small wrongness a boot screen amplifies. */}
            <span style={{ color: 'var(--vv-amber)', fontVariantNumeric: 'tabular-nums' }}>{String(shown).padStart(2, '0')}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Preloader });
