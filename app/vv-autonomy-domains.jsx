/* The Autonomy page's centrepiece, rebuilt as an INSTRUMENT rather than a content grid.

   The four domains are the same five capabilities restated per medium. Read as four blocks of
   prose that repetition looks like padding. Read as one console whose scene, telemetry and
   capability rail retune when you select a domain, the repetition IS the argument: one
   architecture, any medium. So the section is a single chamfered console — domain rail, live
   scene with the domain's identity and telemetry overlaid, and a five-cell capability
   selector under it.

   Three layouts ship, switchable in Tweaks:
     · console (default) — one large instrument, one domain at a time. The recommendation.
     · matrix  — all four domains as live tiles at once, for comparison at a glance.
     · ledger  — no scene at all: dense typographic HUD, everything visible, print-friendly.

   Deep-linkable (#air/#land/#sea/#space) and keyboard-navigable in every layout. */

const DS_AD = () => window.VivumAIDesignSystem_b2be15;

/* One keyframe pair the instrument needs and CSS-in-style cannot express. Injected once. */
if (typeof document !== 'undefined') {
  const s = document.getElementById('ad-kf') || document.createElement('style');
  s.id = 'ad-kf';
  s.textContent = [
    '@keyframes adCapIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
    '@keyframes adHudIn{0%{opacity:0;transform:translateY(8px) scale(.97)}12%{opacity:1}86%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-6px)}}',
    '@keyframes adHudRise{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:none}}',
    '@keyframes adHudFall{from{opacity:1;transform:none}to{opacity:0;transform:translateY(-7px)}}',
    '@keyframes adHudWipeL{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}',
    '@keyframes adHudWipeR{from{clip-path:inset(0 0 0 100%)}to{clip-path:inset(0 0 0 0)}}',
    '@keyframes adHudWipeD{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}',
    '@keyframes adHudWipeU{from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(0 0 0 0)}}',
    '@keyframes adHudDot{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:none}}',
    '@keyframes adScrimIn{from{opacity:0}to{opacity:1}}',
    '@keyframes adTickIn{from{transform:scaleX(0)}to{transform:scaleX(1)}}',
    '@keyframes adSlipIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}',
    '@keyframes adSlipR{from{opacity:0;transform:translateX(9px)}to{opacity:1;transform:none}}',
    '@keyframes adHudRule{0%{transform:scaleX(0)}18%{transform:scaleX(1)}88%{transform:scaleX(1)}100%{transform:scaleX(0)}}',
    '@keyframes adHudPing{0%{transform:scale(.4);opacity:.9}70%{transform:scale(2.4);opacity:0}100%{opacity:0}}',
    '@media (prefers-reduced-motion:reduce){[style*="adCapIn"],[style*="adHud"]{animation:none!important}}',
  ].join('');
  if (!s.parentNode) document.head.appendChild(s);
}

const AUT_DOMAINS = [
  {
    id: 'air', label: 'Air', vehicle: 'Unmanned Aerial Vehicles', code: 'UAVs', image: '../../assets/plates/core-tech-adaptive-learning.png',
    intro: 'Autonomous takeoff, landing, loitering, and emergency response — no GPS required, and it outperforms standard flight controllers.',
    tel: [['Mode', 'Autonomous'], ['Power consumption', 'Ultra-low'], ['Compute', 'On-device']],
    caps: [
      ['Start & Stop', 'Autonomous takeoff, landing, and mission initiation from a single command input, with navigation that does not depend on external communications.', 'bolt'],
      ['Adaptive Loitering', 'Precision hovering for fixed-position monitoring and mobile surveying in dynamic environments, for stable data acquisition and environmental analysis.', 'radar'],
      ['Graceful Termination', 'Emergency landing, automated docking, and fail-safe shutdown subroutines, activatable under critical conditions or system anomalies.', 'triangle-exclamation'],
      ['GPS-Denied Navigation', 'Adaptive navigation that processes whatever inputs remain, holding operational capability when GPS or primary sensors are compromised.', 'circle-nodes'],
      ['Extensible Solutions', 'Customizable autonomy frameworks supporting mission-specific requirements — sensor fusion, payload delivery, and more.', 'diagram-project'],
    ],
  },
  {
    id: 'land', label: 'Land', vehicle: 'Unmanned Terrestrial Vehicles', code: 'UTVs', image: '../../assets/plates/core-tech-temporal-awareness.png',
    intro: 'Fully autonomous navigation, monitoring, and emergency response at ultra-low power — outperforming standard controllers even in SWaP-constrained builds.',
    tel: [['Mode', 'Autonomous'], ['Power consumption', 'Ultra-low'], ['Compute', 'On-device']],
    caps: [
      ['One-Touch Autonomy', 'Initiate or terminate navigation with a single button press or mode switch, independent of external communications.', 'bolt'],
      ['Environment Monitoring', 'Stationary monitoring and mobile surveying in changing environments — observation, image and video capture, and more.', 'radar'],
      ['Graceful Termination', 'Emergency stop, automated docking, and fail-safe shutdown subroutines, activatable under critical conditions or system anomalies.', 'triangle-exclamation'],
      ['GPS-Denied Navigation', 'Optical and landmark-based navigation systems for operation in GPS- or sensor-denied environments.', 'circle-nodes'],
      ['Extensible Solutions', 'Customizable autonomy frameworks supporting mission-specific requirements — sensor fusion, payload delivery, and more.', 'diagram-project'],
    ],
  },
  {
    id: 'sea', label: 'Sea', vehicle: 'Unmanned Maritime Vehicles', code: 'UMVs', image: '../../assets/plates/core-tech-contextual-understanding.png',
    intro: 'Fully autonomous navigation, undersea monitoring, and adaptive surveying — no human intervention, and it outperforms traditional controllers in GPS-denied water.',
    tel: [['Mode', 'Autonomous'], ['Power consumption', 'Ultra-low'], ['Compute', 'On-device']],
    caps: [
      ['One-Touch Autonomy', 'Initiate or terminate navigation with a single button press or mode switch, independent of external communications.', 'bolt'],
      ['Undersea Monitoring', 'Stationary and mobile surveying in changing marine environments — observation, image and video capture, and data collection.', 'radar'],
      ['Emergency Protocols', 'Robust subroutines for emergency surfacing and recovery, activatable under critical conditions or system anomalies.', 'triangle-exclamation'],
      ['GPS-Denied Navigation', 'Optical, inertial, and landmark-based navigation systems for operation in GPS- or sensor-denied environments.', 'circle-nodes'],
      ['Extensible Solutions', 'Customizable autonomy frameworks supporting mission-specific requirements — sensor fusion, payload delivery, and more.', 'diagram-project'],
    ],
  },
  {
    id: 'space', label: 'Space', vehicle: 'Unmanned Extra-Terrestrial Vehicles', code: 'UEVs', image: '../../assets/plates/core-tech-efficient-computation.png',
    intro: 'Autonomous navigation and monitoring that adapts to novel space environments, runs independent of ground control, and keeps working when positioning systems fail.',
    tel: [['Mode', 'Autonomous'], ['Power consumption', 'Ultra-low'], ['Compute', 'On-device']],
    caps: [
      ['Start & Stop', 'Navigation at the push of a button or the switch of a mode, independent of external communications.', 'bolt'],
      ['Monitor & Survey', 'Fixed-position monitoring and mobile surveying in dynamic environments — observation, image and video capture, and more.', 'radar'],
      ['Emergency Start & Stop', 'A range of emergency starting and stopping subroutines, engaged the moment conditions turn critical.', 'triangle-exclamation'],
      ['GPS-Denied Navigation', 'Optical and landmark-based navigation for the environments where satellite positioning simply is not available.', 'circle-nodes'],
      ['Extensible Solutions', 'Customizable autonomy frameworks built around what a programme needs — including what it has not asked for yet.', 'diagram-project'],
    ],
  },
];
const AD_IDS = AUT_DOMAINS.map((d) => d.id);

function useAdMax(q) {
  const [hit, setHit] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${q}px)`);
    const on = () => setHit(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return hit;
}

/* Domain rail cell. The active mark is a 3px amber bar on the top edge — the brand's label
   rule, not a pill. Amber appears once in the rail, so the accent still points at one thing. */
function AdTab({ d, active, mobile, onSelect, onKeyDown, tabRef }) {
  const [hot, setHot] = React.useState(false);
  return (
    <button type="button" role="tab" id={`aut-tab-${d.id}`} aria-selected={active ? 'true' : 'false'}
      aria-controls={`aut-panel-${d.id}`} tabIndex={active ? 0 : -1} ref={tabRef}
      onClick={() => onSelect(d.id)} onKeyDown={onKeyDown}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ position: 'relative', appearance: 'none', border: 0, margin: 0, cursor: 'pointer', font: 'inherit', textAlign: 'left', minHeight: 62, padding: mobile ? '18px 16px' : '20px 22px', display: 'flex', flexDirection: 'column', gap: 7, background: active ? 'rgba(218,232,242,0.05)' : hot ? 'rgba(218,232,242,0.03)' : 'var(--surface-canvas)', transition: 'background 160ms ease' }}>
      <span aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 3, background: active ? 'var(--vv-amber)' : 'transparent', transition: 'background 220ms cubic-bezier(.22,.61,.36,1)' }} />
      <span style={{ fontSize: mobile ? 15 : 17, fontWeight: 600, textTransform: 'uppercase', lineHeight: 1, color: active ? 'var(--vv-ice)' : hot ? 'var(--vv-ice-82)' : 'var(--vv-ice-56)', transition: 'color 160ms ease' }}>{d.label}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.09em', textTransform: 'uppercase', lineHeight: 1, color: active ? 'var(--vv-amber)' : 'var(--vv-graphite)', transition: 'color 160ms ease' }}>{d.code}</span>
    </button>
  );
}

const AdHeading = ({ d, mobile }) => (
  <React.Fragment>
    Unmanned <span style={{ color: 'var(--vv-amber)' }}>{d.vehicle.replace('Unmanned ', '')}</span> <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, letterSpacing: '0.06em', color: 'var(--vv-graphite)', whiteSpace: 'nowrap' }}>({d.code})</span>
  </React.Fragment>
);

/* Telemetry strip. Every readout is a claim the copy already makes — no invented numbers, so
   the HUD stays honest instead of decorating itself with fake data. Readouts arrive one after
   another from the right, like a strip settling after a channel change. */
function AdTelemetry({ d, compact }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? '6px 14px' : '8px 22px', alignItems: 'baseline' }}>
      {d.tel.map(([k, v], i) => (
        <span key={k} style={{ display: 'flex', alignItems: 'baseline', gap: 7, fontFamily: 'var(--font-mono)', fontSize: compact ? 10 : 11, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1 }}>
          <span style={{ color: 'var(--vv-graphite)' }}>{k}</span>
          <span style={{ color: 'var(--vv-amber)' }}>{v}</span>
        </span>
      ))}
    </div>
  );
}

/* The five capabilities, all visible, re-keyed on every domain change so they re-reveal as
   the swarm re-forms. Three treatments, switchable in Tweaks — the trade is density against
   scannability, and which one wins depends on how much of the page this section should own.

   · cards    — five columns in a hairline grid. Most scannable, widest.
   · rows     — five full-width rows, icon | title | body. Densest prose, easiest to read.
   · numbered — five columns led by a large mono index, no icons. Quietest, most typographic. */
function AdCaps({ d, style = 'cards', mobile }) {
  const { Icon } = DS_AD();
  const wrap = { display: 'flex', flexDirection: 'column' };

  if (style === 'rows') {
    return (
      <div key={d.id} style={wrap}>
        {d.caps.map((c, i) => (
          <Reveal key={c[0]} variant="up" delay={i * 80} dur={460}
            style={{ display: 'grid', gridTemplateColumns: mobile ? 'auto minmax(0, 1fr)' : 'auto minmax(0, 0.9fr) minmax(0, 1.5fr)', columnGap: mobile ? 14 : 'clamp(20px, 2.2vw, 40px)', rowGap: 8, alignItems: mobile ? 'start' : 'baseline', padding: mobile ? '18px 0' : 'clamp(18px, 1.9vw, 24px) 0', borderTop: i ? '1px solid var(--line-hairline)' : 'none' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, gridRow: mobile ? 'span 2' : undefined }}>
              <Icon name={c[2]} size={mobile ? 22 : 26} color="var(--vv-ice)" />
            </span>
            <h4 style={{ margin: 0, fontSize: mobile ? 15.5 : 17, fontWeight: 600, letterSpacing: '-0.008em', lineHeight: 1.3, color: 'var(--vv-ice)', textWrap: 'balance' }}>{c[0]}</h4>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.62, color: 'var(--text-secondary)', textWrap: 'pretty' }}>{c[1]}</p>
          </Reveal>
        ))}
      </div>
    );
  }

  if (style === 'numbered') {
    return (
      <div key={d.id} style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'repeat(auto-fit, minmax(190px, 1fr))', gap: 'clamp(24px, 2.6vw, 40px)' }}>
        {d.caps.map((c, i) => (
          <Reveal key={c[0]} variant="up" delay={i * 80} dur={460} style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16, borderTop: '1px solid var(--line-hairline)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1, color: 'var(--vv-amber)' }}>{`0${i + 1}`}</span>
            <h4 style={{ margin: 0, fontSize: 15.5, fontWeight: 600, letterSpacing: '-0.005em', lineHeight: 1.3, color: 'var(--vv-ice)', textWrap: 'balance' }}>{c[0]}</h4>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)', textWrap: 'pretty' }}>{c[1]}</p>
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <div key={d.id} style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, background: 'var(--line-hairline)', border: '1px solid var(--line-hairline)' }}>
      {d.caps.map((c, i) => (
        <Reveal key={c[0]} variant="up" delay={i * 80} dur={460}
          style={{ background: 'var(--surface-canvas)', padding: mobile ? '20px 18px' : 'clamp(20px, 2vw, 26px)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <Icon name={c[2]} size={mobile ? 22 : 26} color="var(--vv-ice)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', color: 'var(--vv-graphite)' }}>{`0${i + 1}`}</span>
          </span>
          <h4 style={{ margin: 0, fontSize: mobile ? 15 : 15.5, fontWeight: 600, letterSpacing: '-0.005em', lineHeight: 1.3, color: 'var(--vv-ice)', textWrap: 'balance' }}>{c[0]}</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)', textWrap: 'pretty' }}>{c[1]}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* Capabilities, read out INSIDE the instrument: one at a time, each landing on a free anchor in
   the canvas's middle band — never the top strip (label + telemetry) or the bottom block (heading
   + intro), so nothing ever collides. A reticle pings at the anchor and a leader line runs from it
   to one of the amber contacts in the scene, so the readout is annotating a real particle rather
   than floating over the picture. Title scrambles in, description follows, then it clears and the
   next capability acquires somewhere else.

   Purely presentational: the same five capabilities are always in the DOM as a real list for
   assistive tech and for anyone who would rather just read them. */
/* Two anchor bands. Side-linked anchors sit INBOARD, not at the frame edges: the plate is ~40%
   of the canvas wide and extends away from the link edge, so an anchor at x=8 put the plate
   squarely over the field and left an 8%-wide sliver for the leader — every candidate contact's
   run then had to cross the plate and strike through its own body text. Anchored near the
   centre, the plate covers one half and the leader has the other half of the field to itself. */
const AD_ANCHORS = [
  { x: 44, y: 24 },
  { x: 57, y: 29 },
  { x: 42, y: 34 },
  { x: 59, y: 37 },
  { x: 46, y: 30 },
  { x: 55, y: 40 },
];
const AD_ANCHORS_M = [
  { x: 40, y: 22 },
  { x: 61, y: 28 },
  { x: 38, y: 33 },
  { x: 63, y: 38 },
  { x: 42, y: 26 },
  { x: 59, y: 36 },
];
const AD_ANCHORS_C = [
  { x: 32, y: 22 },
  { x: 68, y: 25 },
  { x: 50, y: 20 },
  { x: 38, y: 34 },
  { x: 64, y: 32 },
  { x: 52, y: 37 },
];
const AD_ANCHORS_CM = [
  { x: 48, y: 21 },
  { x: 54, y: 27 },
  { x: 46, y: 33 },
  { x: 52, y: 37 },
  { x: 50, y: 24 },
  { x: 48, y: 35 },
];

/* The leader line, as its own component with its own clock. Two reasons: it must track a moving
   particle continuously (the parent used to re-render the whole HUD at 10fps to do this, which is
   both jerkier and far more expensive), and it owns the draw/retract animation that gates the
   callout. Progress runs particle → anchor, so the line grows OUT of the contact. */
function AdLeader({ ax, ay, hotRef, ix, fallback, phase, draw = 620, pull = 420 }) {
  const [, force] = React.useState(0);
  const p = React.useRef(0);
  const idle = phase === 'wait';
  React.useEffect(() => {
    if (idle) { p.current = 0; return; }
    if (window.vvReduced && window.vvReduced()) {
      p.current = phase === 'pull' ? 0 : 1;
      const id = setInterval(() => force((v) => v + 1), 250);
      return () => clearInterval(id);
    }
    const from = p.current;
    const to = phase === 'pull' ? 0 : 1;
    const dur = phase === 'draw' ? draw : phase === 'pull' ? pull : 0;
    const t0 = performance.now();
    /* An interval, deliberately, not requestAnimationFrame: rAF is starved in this environment
       (it delivers one frame and then stops), which pinned progress at zero and left the leader
       a dot sitting on the contact. The clock is also read inside the tick rather than taken
       from a frame timestamp, whose time origin does not always match performance.now() here. */
    const anim = phase === 'draw' || phase === 'pull';
    const id = setInterval(() => {
      const k = dur ? Math.min(1, Math.max(0, (performance.now() - t0) / dur)) : 1;
      p.current = from + (to - from) * (1 - Math.pow(1 - k, 3));
      force((v) => v + 1);
      /* Keep ticking through the static phases: the contact itself is still moving. */
      if (k >= 1 && phase !== 'show' && phase !== 'hide') clearInterval(id);
    }, anim ? 16 : 60);
    return () => clearInterval(id);
  }, [phase, draw, pull, idle]);

  if (idle) return null;
  const pts = (hotRef && hotRef.current) || [];
  const t = (ix >= 0 && pts[ix]) || fallback;
  const k = p.current;
  const x = t.x + (ax - t.x) * k, y = t.y + (ay - t.y) * k;
  return (
    /* z-index 3 keeps the leader above the plate (2) and the readability scrim: the line is the
       thing that proves the callout is attached to something, so nothing may cover it. */
    <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <line x1={t.x} y1={t.y} x2={x} y2={y} stroke="var(--vv-amber)" strokeWidth="1" strokeDasharray="3 3" opacity={0.45 + 0.35 * k} vectorEffect="non-scaling-stroke" />
      </svg>
      {/* A DOM span, not an SVG circle: under a non-uniform viewBox a circle paints as an ellipse. */}
      <span style={{ position: 'absolute', left: `${t.x}%`, top: `${t.y}%`, width: 8, height: 8, marginLeft: -4, marginTop: -4, border: '1px solid var(--vv-amber)', borderRadius: '50%', opacity: 0.4 + 0.5 * k }} />
    </div>
  );
}

/* Phase machine per capability: the line draws out of the particle, THEN the plate opens; on the
   way out the plate closes first and only then does the line withdraw. So a visible callout is
   never without its leader, and the two never animate against each other. */
/* Phase machine per capability: the line draws out of the particle, THEN the plate opens; on the
   way out the plate closes first and only then does the line withdraw. So a visible callout is
   never without its leader, and the two never animate against each other. A manual step routes
   through the SAME retirement — hide, pull, then a full redraw — so nothing is ever skipped.
   'wait' is the armed-but-empty phase: it holds the canvas clear after a tab change. */
const AD_DRAW = 620, AD_HIDE = 380, AD_PULL = 420, AD_ARM = 2000;
const adMod = (v, n) => ((v % n) + n) % n;

/* Manual transport. Sits on the canvas floor, right-hand side — hairline squares in the page's
   own button idiom, 44px on touch. Stepping restarts the phase machine, so a click always plays
   the full draw → open sequence rather than snapping. */
function AdStepBtn({ dir, onClick, mobile }) {
  const { Icon } = DS_AD();
  const [hot, setHot] = React.useState(false);
  const s = mobile ? 44 : 32;
  return (
    <button type="button" onClick={onClick} aria-label={dir < 0 ? 'Previous capability' : 'Next capability'}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)} onFocus={() => setHot(true)} onBlur={() => setHot(false)}
      style={{ appearance: 'none', width: s, height: s, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer', background: hot ? 'rgba(0,17,33,0.86)' : 'rgba(0,17,33,0.62)', border: '1px solid ' + (hot ? 'var(--vv-amber)' : 'var(--vv-ice-24)'), backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', transition: 'background 200ms ease, border-color 200ms ease' }}>
      <Icon name={dir < 0 ? 'angle-left' : 'angle-right'} size={mobile ? 20 : 16} color={hot ? 'var(--vv-amber)' : 'var(--vv-ice-82)'} />
    </button>
  );
}

function AdCapHud({ d, mobile, hotRef, link = 'auto', dwell = 9200 }) {
  /* Mobile: force the pinned 'top' side rather than letting the aim math pick left/right — a
     side-hung plate has nowhere to go on a narrow canvas and ends up clipped. 'top' keeps the
     plate directly below its anchor (so the amber dot always reads as sitting on top of the
     plate) and switches to the AD_ANCHORS_CM set, whose x values are already centred and clear
     of the canvas edges. */
  link = mobile ? 'top' : link;
  const [step, setStep] = React.useState(0);
  const [gen, setGen] = React.useState(0);
  const [phase, setPhase] = React.useState('wait');
  const [shift, setShift] = React.useState(0);
  const pending = React.useRef(0);
  const armed = React.useRef(false);
  const root = React.useRef(null);
  const box = React.useRef(null);
  const aimIx = React.useRef(-1);
  const aimStep = React.useRef(-1);
  const aimFix = React.useRef(0);
  const plateH = React.useRef(0);
  React.useEffect(() => {
    if (window.vvReduced && window.vvReduced()) { setPhase('show'); return; }
    const t = [];
    const dir = pending.current;
    if (dir) {
      /* Manual step: retire the visible callout properly before drawing the next one. */
      pending.current = 0;
      setPhase('hide');
      t.push(setTimeout(() => setPhase('pull'), AD_HIDE));
      t.push(setTimeout(() => setStep((v) => v + dir), AD_HIDE + AD_PULL));
    } else {
      /* First readout after a tab change waits, so the new scene is read before it is annotated. */
      const hold = armed.current ? 0 : AD_ARM;
      armed.current = true;
      setPhase('wait');
      t.push(setTimeout(() => setPhase('draw'), hold));
      t.push(setTimeout(() => setPhase('show'), hold + AD_DRAW));
      t.push(setTimeout(() => setPhase('hide'), hold + AD_DRAW + dwell));
      t.push(setTimeout(() => setPhase('pull'), hold + AD_DRAW + dwell + AD_HIDE));
      t.push(setTimeout(() => setStep((v) => v + 1), hold + AD_DRAW + dwell + AD_HIDE + AD_PULL));
    }
    return () => t.forEach(clearTimeout);
  }, [step, gen, dwell]);
  const jump = (dir) => {
    /* Nothing on screen yet — no retirement to play, so re-arm straight onto the new index. */
    if (phase === 'wait' || phase === 'pull') { setStep((v) => v + dir); return; }
    pending.current = dir;
    setGen((g) => g + 1);
  };

  const n = d.caps.length;
  const i = adMod(step, n);
  const c = d.caps[i];
  const centred = link === 'top' || link === 'bottom';
  const set = centred ? (mobile ? AD_ANCHORS_CM : AD_ANCHORS_C) : (mobile ? AD_ANCHORS_M : AD_ANCHORS);
  /* Anchor is a pure function of step — no ref written during render. Stride 5 is coprime with
     the 6 anchors, so consecutive steps can never land on the same slot, and a re-render inside
     a step always recomputes the SAME anchor instead of jumping. */
  const a = set[adMod(step * 5 + 2, set.length)];
  const open = phase === 'show' || phase === 'hide';
  const out = phase === 'hide';
  const gap = 14;

  /* THE CONTACT IS CHOSEN FIRST, AND THE PLATE IS THEN PUT ON THE OTHER SIDE OF THE ANCHOR.
     Previously the side came from the anchor's x before the contact was known, so the plate could
     land on the same side as the only reachable contact and the leader had to cross it — a
     crossing penalty cannot help when every candidate is penalised. Deriving the side from the
     contact makes crossing geometrically impossible instead of merely discouraged: the plate
     starts a gap BEYOND the anchor on the named side, so a contact on the opposite side lies
     entirely outside the plate's x-range and no part of the run can enter it.

     The pinned Tweaks values (left/right/top/bottom) keep the scored guard, since the user has
     fixed the side and a clear-side contact may genuinely not exist. */
  const contacts = (hotRef && hotRef.current) || [];
  const pinned = link !== 'auto';

  /* The plate's REAL footprint, in canvas percent — width from the plate's own fixed width
     against the measured canvas, height from the last measurement (the aim latches during 'draw',
     when the plate is not mounted). Hardcoded percentages had assumed a ~1500px canvas. */
  const rootW = (root.current && root.current.offsetWidth) || 660;
  const rootH = (root.current && root.current.offsetHeight) || 360;
  const pxW = Math.min(mobile ? 200 : 268, rootW * 0.58);
  const pxH = plateH.current || (mobile ? 152 : 136);
  const pw = (pxW / rootW) * 100, ph = (pxH / rootH) * 100;
  const gx = (gap / rootW) * 100, gy = (gap / rootH) * 100, sy = (shift / rootH) * 100;
  const rectFor = (s) => s === 'left' ? { x0: a.x + gx, x1: a.x + gx + pw, y0: a.y + sy - ph / 2, y1: a.y + sy + ph / 2 }
    : s === 'right' ? { x0: a.x - gx - pw, x1: a.x - gx, y0: a.y + sy - ph / 2, y1: a.y + sy + ph / 2 }
      : s === 'top' ? { x0: a.x - pw / 2, x1: a.x + pw / 2, y0: a.y + gy + sy, y1: a.y + gy + sy + ph }
        : { x0: a.x - pw / 2, x1: a.x + pw / 2, y0: a.y + sy - gy - ph, y1: a.y + sy - gy };

  /* Liang–Barsky clip of the anchor→contact segment against the plate rect: catches a run that
     passes THROUGH the plate, not only one that ends inside it. The margin stays under the
     anchor's own gap so the anchor never counts as inside, which would fail every candidate. */
  const crossesRect = (pt, rect) => {
    const dx = pt.x - a.x, dy = pt.y - a.y, m = 0.8;
    const p = [-dx, dx, -dy, dy];
    const q = [a.x - (rect.x0 - m), (rect.x1 + m) - a.x, a.y - (rect.y0 - m), (rect.y1 + m) - a.y];
    let t0 = 0, t1 = 1;
    for (let j = 0; j < 4; j++) {
      if (p[j] === 0) { if (q[j] < 0) return false; continue; }
      const r = q[j] / p[j];
      if (p[j] < 0) { if (r > t1) return false; if (r > t0) t0 = r; }
      else { if (r < t0) return false; if (r < t1) t1 = r; }
    }
    return true;
  };
  const pinnedRect = pinned ? rectFor(link) : null;
  const away = pinned ? (link === 'right' ? 1 : link === 'left' ? -1 : 0) : 0;

  /* Re-aim on a new step, on a stale index, and whenever the latch holds NO contact but the scene
     now has some — the first render of a step precedes three.js's first frame, so the pool is
     empty then. In pinned mode also re-aim once the measured plate reveals the latched contact
     would be crossed; capped per step so it cannot re-aim every tick and read as a flicker. */
  const stale = pinned && aimIx.current >= 0 && contacts[aimIx.current]
    && crossesRect(contacts[aimIx.current], pinnedRect) && aimFix.current < 3;
  if (aimStep.current !== step || aimIx.current >= contacts.length || (aimIx.current < 0 && contacts.length) || stale) {
    if (aimStep.current !== step) aimFix.current = 0; else aimFix.current += 1;
    aimStep.current = step;
    let pick = -1, best = -Infinity, near = -1, nearD = 1e9;
    contacts.forEach((pt, k) => {
      const dx = pt.x - a.x, dy = pt.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      /* Deliberately loose: the amber pool is only a handful of particles, so a tight gate
         empties it and forces the fallback — the very failure this is here to prevent. */
      if (dist < 6 || pt.y < 6 || pt.y > 86) return;
      if (dist < nearD) { nearD = dist; near = k; }
      /* Distance band: long enough to read as a leader, short enough to stay in frame. */
      let score = 40 - Math.abs(dist - 26);
      score += Math.min(0, 24 - Math.abs(dy)) * 0.3;
      /* A clearly sideways run reads better than a near-vertical one, and it also gives the
         derived side an unambiguous direction to place the plate. */
      score += Math.min(12, Math.abs(dx)) * 0.4;
      if (pinned) {
        if (crossesRect(pt, pinnedRect)) score -= 1e6;
        if (away) score += (dx * away) * 0.5;
        if (link === 'top') score += dy * 0.5; else if (link === 'bottom') score -= dy * 0.5;
      }
      if (score > best) { best = score; pick = k; }
    });
    aimIx.current = pick >= 0 ? pick : near;
  }

  const aimPt = aimIx.current >= 0 ? contacts[aimIx.current] : null;
  /* Plate goes opposite the contact. 'left' means the leader meets the plate's left edge, i.e.
     the plate extends rightward — so a contact to the LEFT of the anchor gets side 'left'. */
  const side = pinned ? link : (aimPt ? (aimPt.x < a.x ? 'left' : 'right') : (a.x < 50 ? 'left' : 'right'));
  /* Last resort ONLY when the scene publishes no contacts at all (radar, plate, or a starved
     instrument): a virtual point on the clear side. With a live field this never runs. */
  const fallback = { x: Math.max(4, Math.min(96, a.x + (side === 'left' ? -11 : 11))), y: Math.min(70, a.y + 24) };

  /* Clearance is computed from transform-free numbers (offsetHeight + the un-animated heading
     block's offset) inside a layout effect, so it resolves before paint: lift the plate off the
     heading block, then push it back down if that drove it into the telemetry strip. */
  React.useLayoutEffect(() => {
    const b = box.current, r = root.current;
    if (!b || !r) { setShift(0); return; }
    const h3 = r.parentElement && r.parentElement.querySelector('h3');
    const block = h3 && h3.parentElement;
    if (!block) { setShift(0); return; }
    const rootH = r.offsetHeight, bh = b.offsetHeight;
    plateH.current = bh;
    const blockTop = block.getBoundingClientRect().top - r.getBoundingClientRect().top;
    const base = (a.y / 100) * rootH + (side === 'top' ? gap : side === 'bottom' ? -gap - bh : -bh / 2);
    let s = 0;
    const over = (base + bh) - (blockTop - 10);
    if (over > 0) s -= over;
    const guard = 0.17 * rootH;
    if (base + s < guard) s += guard - (base + s);
    setShift(Math.round(s));
  }, [d.id, step, mobile, a.y, side, open]);


  /* Description waits for the title to finish scrambling, then rises — the plate opens, the
     title types itself, the body follows. It reserves its space from the start, so the plate
     never resizes mid-sequence. */
  const titleMs = Math.max(420, Math.min(820, c[0].length * 16 + 140));
  const pos = side === 'left' ? { left: `calc(${a.x}% + ${gap}px)`, top: `calc(${a.y}% + ${shift}px)`, transform: 'translateY(-50%)' }
    : side === 'right' ? { right: `calc(${100 - a.x}% + ${gap}px)`, top: `calc(${a.y}% + ${shift}px)`, transform: 'translateY(-50%)' }
      : side === 'top' ? { left: `${a.x}%`, top: `calc(${a.y}% + ${gap + shift}px)`, transform: 'translateX(-50%)' }
        : { left: `${a.x}%`, top: `calc(${a.y}% + ${shift - gap}px)`, transform: 'translate(-50%, -100%)' };
  const wipe = side === 'left' ? 'adHudWipeL' : side === 'right' ? 'adHudWipeR' : side === 'top' ? 'adHudWipeD' : 'adHudWipeU';
  /* Mobile: the canvas is short enough that an anchor-relative plate can land partly or wholly
     off the visible instrument. Forcing `link` to 'top' above keeps every plate pinned directly
     under its anchor and inside the canvas, so no separate positioning override is needed here. */

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <AdLeader key={'L' + step} ax={a.x} ay={a.y} hotRef={hotRef} ix={aimIx.current} fallback={fallback} phase={phase} draw={AD_DRAW} pull={AD_PULL} />
      {open ? (
        <span aria-hidden="true" key={d.id + step + 'r'} style={{ position: 'absolute', left: `${a.x}%`, top: `${a.y}%`, width: 9, height: 9, marginLeft: -4.5, marginTop: -4.5, animation: out ? 'adHudFall ' + AD_HIDE + 'ms ease both' : 'adHudDot 260ms cubic-bezier(.16,1,.3,1) both' }}>
          <span style={{ position: 'absolute', inset: 0, background: 'var(--vv-amber)', border: '1px solid var(--vv-amber)', borderRadius: '50%' }} />
          <span style={{ position: 'absolute', inset: 0, border: '1px solid var(--vv-amber)', borderRadius: '50%', animation: 'adHudPing 1800ms cubic-bezier(.16,1,.3,1) infinite' }} />
        </span>
      ) : null}
      {open ? (
        /* Positioner carries the link-side offset; the child carries the entrance transform, so
           the two never fight over the same property. */
        <div ref={box} aria-hidden="true" key={d.id + step} style={{ position: 'absolute', zIndex: 6, width: mobile ? 200 : 268, maxWidth: '58%', ...pos }}>
          <div style={{ animation: out ? 'adHudFall ' + AD_HIDE + 'ms ease both' : 'adHudRise 420ms cubic-bezier(.16,1,.3,1) both' }}>
            {/* Translucent ink plate so mono type stays legible over moving particles: a hairline
               box, no shadow (the system's elevation rule), wiping open from the leader's side. */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, padding: mobile ? '12px 14px' : '14px 17px', background: 'rgba(0,17,33,0.74)', backdropFilter: 'blur(8px) saturate(1.15)', WebkitBackdropFilter: 'blur(8px) saturate(1.15)', border: '1px solid var(--vv-ice-14)', textAlign: 'left', animation: out ? 'none' : wipe + ' 520ms cubic-bezier(.16,1,.3,1) both' }}>
              <HudText text={c[0]} speed={16} style={{ fontFamily: 'var(--font-mono)', fontSize: mobile ? 11 : 12, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.25, color: 'var(--vv-amber)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: mobile ? 10 : 10.5, letterSpacing: '0.015em', lineHeight: 1.55, color: 'var(--vv-ice-82)', textWrap: 'pretty', animation: out ? 'none' : 'adHudRise 460ms cubic-bezier(.16,1,.3,1) both', animationDelay: out ? undefined : titleMs + 'ms' }}>{c[1]}</span>
            </div>
          </div>
        </div>
      ) : null}
      {/* Mobile: buttons stay pinned to the bottom-right corner of the canvas, same as desktop.
         The copy block above reserves bottom padding equal to the button cluster's footprint so
         the heading/intro text never runs underneath it. */}
      <div style={{ position: 'absolute', right: mobile ? 14 : 26, bottom: mobile ? 16 : 26, display: 'flex', flexDirection: 'row', gap: mobile ? 8 : 6, pointerEvents: 'auto' }}>
        <AdStepBtn dir={-1} mobile={mobile} onClick={() => jump(-1)} />
        <AdStepBtn dir={1} mobile={mobile} onClick={() => jump(1)} />
      </div>
    </div>
  );
}

const AdCapsSR = ({ d }) => (
  <ul style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', margin: 0, padding: 0 }}>
    {d.caps.map((c) => <li key={c[0]}>{c[0]}. {c[1]}</li>)}
  </ul>
);

/* ── Domain navigation ───────────────────────────────────────────────────────────────────────
   Four ways to choose a domain. They differ in what they make cheap: the rail makes comparison
   cheap (all four legible at once), the carousel makes the active domain unmissable, the dial
   makes the set feel like one instrument, and the stack trades width for a quiet vertical index.

   · rail     — four cells in a hairline grid, amber bar on the active one.
   · carousel — three visible, active centred and full-strength, neighbours fading out, arrows.
   · dial     — an arc of ticks with a pointer that swings to the selection.
   · stack    — a vertical index, one row per domain, amber rule on the active row. */
function AdNavRail({ active, mobile, onSelect, onKeyDown, refs, kind = 'notch' }) {
  const [hot, setHot] = React.useState(null);
  const bracket = kind === 'bracket', seam = kind === 'seam';
  return (
    <div role="tablist" aria-label="Operating domain" onKeyDown={onKeyDown}
      style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', borderBottom: '1px solid var(--line-hairline)' }}>
      {AUT_DOMAINS.map((x, k) => {
        const on = x.id === active, lit = hot === x.id;
        return (
          <button key={x.id} type="button" role="tab" id={`aut-tab-${x.id}`} aria-selected={on ? 'true' : 'false'}
            aria-controls={`aut-panel-${x.id}`} tabIndex={on ? 0 : -1} ref={(el) => { refs.current[x.id] = el; }}
            onClick={() => onSelect(x.id)}
            onMouseEnter={() => setHot(x.id)} onMouseLeave={() => setHot(null)}
            style={{ position: 'relative', appearance: 'none', border: 0, borderLeft: k && !(mobile && k === 2) ? '1px solid var(--line-hairline)' : 'none', borderTop: mobile && k >= 2 ? '1px solid var(--line-hairline)' : 'none', margin: 0, cursor: 'pointer', font: 'inherit', textAlign: 'left', minHeight: mobile ? 58 : 66, padding: mobile ? '16px 14px' : '18px 20px', display: 'flex', flexDirection: 'column', gap: 5, background: on && !bracket ? 'rgba(218,232,242,0.05)' : lit && !on ? 'rgba(218,232,242,0.035)' : 'transparent', transition: 'background 200ms ease' }}>
            {seam ? null : <span aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 3, background: on ? 'var(--vv-amber)' : lit ? 'var(--vv-ice-24)' : 'transparent', transition: 'background 220ms cubic-bezier(.22,.61,.36,1)' }} />}
            {/* The connector: the active tab paints over the rule it shares with the canvas, so
                the two stop being separate boxes. */}
            <span aria-hidden="true" style={{ position: 'absolute', left: bracket ? '50%' : 0, right: bracket ? 'auto' : 0, width: bracket ? 2 : 'auto', marginLeft: bracket ? -1 : 0, bottom: -1, height: bracket ? 12 : 1, background: on ? (bracket ? 'var(--vv-amber)' : 'var(--surface-canvas)') : 'transparent', transition: 'background 200ms ease', zIndex: 1 }} />
            {seam && on ? <span aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 3, background: 'var(--vv-amber)', zIndex: 2 }} /> : null}
            <span style={{ fontSize: mobile ? 15 : 17, fontWeight: 600, textTransform: 'uppercase', lineHeight: 1, color: on || lit ? 'var(--vv-ice)' : 'var(--vv-ice-82)', transition: 'color 180ms ease' }}>{x.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.09em', textTransform: 'uppercase', lineHeight: 1, color: on ? 'var(--vv-amber)' : lit ? 'var(--vv-ice-82)' : 'var(--vv-graphite)', transition: 'color 180ms ease' }}>{x.code}</span>
          </button>
        );
      })}
    </div>
  );
}
const AdNavNotch = (p) => <AdNavRail {...p} kind="notch" />;
const AdNavBracket = (p) => <AdNavRail {...p} kind="bracket" />;
const AdNavSeam = (p) => <AdNavRail {...p} kind="seam" />;

function AdNavCarousel({ active, mobile, onSelect, onKeyDown, refs }) {
  const { Icon } = DS_AD();
  const i = AD_IDS.indexOf(active);
  const n = AUT_DOMAINS.length;
  const at = (k) => AUT_DOMAINS[(k + n * 2) % n];
  const step = (dir) => onSelect(AD_IDS[(i + dir + n) % n]);
  const cells = [at(i - 1), at(i), at(i + 1)];
  const Arrow = ({ dir, name }) => (
    <button type="button" onClick={() => step(dir)} aria-label={dir < 0 ? 'Previous domain' : 'Next domain'}
      style={{ appearance: 'none', border: '1px solid var(--line-hairline)', background: 'var(--surface-canvas)', cursor: 'pointer', width: mobile ? 40 : 40, height: mobile ? 40 : 40, display: 'grid', placeItems: 'center', flex: 'none' }}>
      <Icon name={name} size={18} color="var(--vv-ice-82)" />
    </button>
  );
  return (
    <div role="tablist" aria-label="Operating domain" onKeyDown={onKeyDown}
      style={{ display: 'flex', alignItems: 'center', gap: mobile ? 10 : 16 }}>
      <Arrow dir={-1} name="angle-left" />
      <div style={{ position: 'relative', flex: 1, minWidth: 0, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', alignItems: 'center', maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, #000 24%, #000 76%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, #000 24%, #000 76%, rgba(0,0,0,0) 100%)' }}>
        {cells.map((x, k) => {
          const on = k === 1;
          return (
            <button key={x.id + k} type="button" role="tab" aria-selected={on ? 'true' : 'false'} tabIndex={on ? 0 : -1}
              ref={on ? (el) => { refs.current[x.id] = el; } : undefined}
              onClick={() => (on ? null : step(k === 0 ? -1 : 1))}
              style={{ appearance: 'none', border: 0, background: 'none', cursor: on ? 'default' : 'pointer', font: 'inherit', padding: mobile ? '14px 6px' : '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: on ? 1 : 0.34, transition: 'opacity 320ms cubic-bezier(.16,1,.3,1)' }}>
              <span aria-hidden="true" style={{ width: on ? 34 : 18, height: 3, background: on ? 'var(--vv-amber)' : 'var(--vv-graphite)', transition: 'width 320ms cubic-bezier(.16,1,.3,1), background 240ms ease' }} />
              <span style={{ fontSize: on ? (mobile ? 19 : 24) : (mobile ? 14 : 16), fontWeight: 600, textTransform: 'uppercase', lineHeight: 1, color: on ? 'var(--vv-ice)' : 'var(--vv-ice-56)', transition: 'font-size 320ms cubic-bezier(.16,1,.3,1), color 240ms ease', whiteSpace: 'nowrap' }}>{x.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: on ? 11.5 : 10.5, letterSpacing: '0.1em', lineHeight: 1, color: on ? 'var(--vv-amber)' : 'var(--vv-graphite)', transition: 'color 240ms ease' }}>{x.code}</span>
            </button>
          );
        })}
      </div>
      <Arrow dir={1} name="angle-right" />
    </div>
  );
}

function AdNavDial({ active, mobile, onSelect, onKeyDown, refs }) {
  const i = AD_IDS.indexOf(active);
  const n = AUT_DOMAINS.length;
  const W = 520, H = 132, cx = W / 2, cy = H + 22, R = 132;
  const a0 = -46, a1 = 46;
  const ang = (k) => a0 + ((a1 - a0) * k) / (n - 1);
  const pt = (deg, r) => [cx + Math.sin((deg * Math.PI) / 180) * r, cy - Math.cos((deg * Math.PI) / 180) * r];
  return (
    <div role="tablist" aria-label="Operating domain" onKeyDown={onKeyDown} style={{ display: 'flex', justifyContent: 'center' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: mobile ? 340 : 520, height: 'auto', overflow: 'visible' }}>
        <path d={`M ${pt(a0, R)[0]} ${pt(a0, R)[1]} A ${R} ${R} 0 0 1 ${pt(a1, R)[0]} ${pt(a1, R)[1]}`} fill="none" stroke="var(--vv-ice-14)" strokeWidth="1" />
        {AUT_DOMAINS.map((x, k) => {
          const on = k === i;
          const [ix, iy] = pt(ang(k), R - (on ? 15 : 9));
          const [ox, oy] = pt(ang(k), R);
          const [lx, ly] = pt(ang(k), R - 34);
          return (
            <g key={x.id} onClick={() => onSelect(x.id)} style={{ cursor: 'pointer' }}>
              <line x1={ix} y1={iy} x2={ox} y2={oy} stroke={on ? 'var(--vv-amber)' : 'var(--vv-graphite)'} strokeWidth={on ? 3 : 1} style={{ transition: 'stroke 240ms ease' }} />
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                style={{ fontSize: on ? 17 : 13, fontWeight: 600, textTransform: 'uppercase', fill: on ? 'var(--vv-ice)' : 'var(--vv-ice-56)', transition: 'fill 240ms ease, font-size 260ms cubic-bezier(.16,1,.3,1)' }}>{x.label}</text>
              <text x={lx} y={ly + 17} textAnchor="middle" dominantBaseline="middle"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', fill: on ? 'var(--vv-amber)' : 'var(--vv-graphite)', transition: 'fill 240ms ease' }}>{x.code}</text>
              <rect x={lx - 42} y={ly - 20} width="84" height="46" fill="transparent">
                <title>{x.label}</title>
              </rect>
            </g>
          );
        })}
        <g style={{ transform: `rotate(${ang(i)}deg)`, transformOrigin: `${cx}px ${cy}px`, transition: 'transform 620ms cubic-bezier(.16,1,.3,1)' }}>
          <line x1={cx} y1={cy - R + 46} x2={cx} y2={cy - R + 6} stroke="var(--vv-amber)" strokeWidth="1.5" />
        </g>
        <circle cx={cx} cy={cy} r="3" fill="var(--vv-amber)" />
        {AUT_DOMAINS.map((x, k) => (
          <rect key={'h' + x.id} x={pt(ang(k), R - 34)[0] - 44} y={pt(ang(k), R - 34)[1] - 22} width="88" height="52"
            fill="transparent" style={{ cursor: 'pointer' }} onClick={() => onSelect(x.id)}
            ref={k === i ? (el) => { refs.current[x.id] = el; } : undefined} />
        ))}
      </svg>
    </div>
  );
}

function AdNavStack({ active, mobile, onSelect, onKeyDown, refs }) {
  return (
    <div role="tablist" aria-label="Operating domain" onKeyDown={onKeyDown} style={{ display: 'flex', flexDirection: 'column' }}>
      {AUT_DOMAINS.map((x, k) => {
        const on = x.id === active;
        return (
          <button key={x.id} type="button" role="tab" aria-selected={on ? 'true' : 'false'} tabIndex={on ? 0 : -1}
            ref={(el) => { refs.current[x.id] = el; }} onClick={() => onSelect(x.id)}
            style={{ position: 'relative', appearance: 'none', border: 0, borderTop: k ? '1px solid var(--line-hairline)' : 'none', background: 'none', cursor: 'pointer', font: 'inherit', textAlign: 'left', padding: '16px 2px 16px 18px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
            <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: 10, bottom: 10, width: 3, background: on ? 'var(--vv-amber)' : 'transparent', transition: 'background 240ms ease' }} />
            <span style={{ fontSize: mobile ? 15 : 17, fontWeight: 600, textTransform: 'uppercase', lineHeight: 1, color: on ? 'var(--vv-ice)' : 'var(--vv-ice-56)', transition: 'color 200ms ease' }}>{x.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: on ? 'var(--vv-amber)' : 'var(--vv-graphite)', transition: 'color 200ms ease' }}>{x.code}</span>
          </button>
        );
      })}
    </div>
  );
}

const AD_NAVS = { rail: AdNavNotch, bracket: AdNavBracket, seam: AdNavSeam, carousel: AdNavCarousel, dial: AdNavDial, stack: AdNavStack };
/* Which navs sit flush ON the instrument (one border box, no gap) and which are free-standing. */
const AD_ATTACHED = { rail: 1, bracket: 1, seam: 1 };

/* Mobile: a native dropdown replaces whichever nav treatment is chosen for desktop. A four-way
   tab strip (or worse, a carousel/dial) is either cramped or unreadable at phone width, while a
   select is a pattern every touch user already knows, and it collapses the choice to one row. */
function AdNavSelect({ active, onSelect }) {
  const { Icon } = DS_AD();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label htmlFor="aut-domain-select" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--vv-graphite)' }}>Select a domain</label>
      <div style={{ position: 'relative' }}>
        <select id="aut-domain-select" value={active} onChange={(e) => onSelect(e.target.value)}
          style={{ appearance: 'none', WebkitAppearance: 'none', width: '100%', borderTop: '1px solid var(--line-hairline)', borderLeft: '1px solid var(--line-hairline)', borderRight: '1px solid var(--line-hairline)', borderBottom: 'none', background: 'var(--surface-canvas)', color: 'var(--vv-ice)', fontSize: 15, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em', fontFamily: 'inherit', padding: '16px 44px 16px 16px', cursor: 'pointer' }}>
          {AUT_DOMAINS.map((x) => <option key={x.id} value={x.id}>{x.label} — {x.code}</option>)}
        </select>
        <span aria-hidden="true" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex' }}>
          <Icon name="angle-down" size={14} color="var(--vv-ice-82)" />
        </span>
      </div>
    </div>
  );
}

/* console — the recommendation. Header, domain nav, the live swarm carrying the domain's
   identity and telemetry, then all five capabilities. One domain at a time, one chamfered
   console — heading included, so the whole argument lives inside one frame. */
function AdConsole({ d, scene, capStyle, capFont, capLink, corners, titleSize, particles, stacked, mobile, tablet, header, nav, navKind }) {
  const effCorners = corners && !mobile;
  const { SectionFrame } = DS_AD();
  const hotRef = React.useRef([]);
  const side = navKind === 'stack' && !stacked;
  const attached = !!AD_ATTACHED[navKind] && !mobile;
  const mono = capFont === 'mono';
  const inCanvas = capStyle === 'hud';
  const tSize = titleSize || (mobile ? 18 : 22);
  const pSize = Math.max(12.5, tSize * 0.62);
  return (
    <Reveal variant={mobile ? 'up' : 'frame'} dur={720} delay={120}>
      <SectionFrame stacked={stacked} copyMax="100%" contentStyle={{ maxWidth: '100%' }} gap={0} fill="transparent"
        {...(mobile ? { chamfer: 0, color: 'transparent', blur: 0, accent: false, padX: '0px', padY: '0px' } : tablet ? { padX: 'clamp(40px, 5vw, 80px)', padY: 'clamp(40px, 5vw, 80px)' } : null)}>
        {header}
        <div style={{ paddingTop: 'clamp(26px, 3vw, 40px)', display: 'grid', gridTemplateColumns: side ? 'minmax(180px, 0.22fr) minmax(0, 1fr)' : 'minmax(0, 1fr)', columnGap: 'clamp(28px, 3vw, 52px)', rowGap: 0, alignItems: 'start', minHeight: '30rem' }}>
          {attached ? null : nav}
          <div role="tabpanel" id={`aut-panel-${d.id}`} aria-labelledby={`aut-tab-${d.id}`}
            style={{ display: 'flex', flexDirection: 'column', gap: inCanvas ? 0 : 'clamp(24px, 2.8vw, 36px)', minWidth: 0, minHeight: '30rem', border: attached ? '1px solid var(--line-hairline)' : 'none' }}>
            {attached ? nav : null}
            <DomainInstrument domainId={d.id} scene={scene} plate={d.image} key={scene} hotRef={hotRef} corners={effCorners}
              count={particles.count} glyph={particles.glyph} pSize={particles.size} extent={particles.extent}
              style={{ height: mobile ? 'clamp(480px, 72svh, 620px)' : 'clamp(360px, 34vw, 500px)', minHeight: mobile ? undefined : '30rem', border: attached ? 'none' : '1px solid var(--line-hairline)' }}>
              {/* Readability scrim: ink rising from the bottom edge, masked away to the right so it
                 only sits under the heading block and never reads as a band across the canvas.
                 Keyed to the domain so it re-fades on every tab change, in step with the copy. */}
              <span key={d.id + 'scrim'} aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '68%', pointerEvents: 'none', background: 'linear-gradient(to top, rgba(0,17,33,0.94) 0%, rgba(0,17,33,0.86) 18%, rgba(0,17,33,0.52) 48%, rgba(0,17,33,0) 100%)', maskImage: 'linear-gradient(to right, #000 0%, #000 54%, rgba(0,0,0,0) 92%)', WebkitMaskImage: 'linear-gradient(to right, #000 0%, #000 54%, rgba(0,0,0,0) 92%)', animation: 'adScrimIn 900ms ease both' }} />
              <div style={{ position: 'absolute', inset: 0, padding: mobile ? '22px 18px' : 'clamp(28px, 3vw, 40px)', paddingTop: mobile ? 22 : 'clamp(18px, 2vw, 26px)', paddingBottom: mobile ? 84 : 'clamp(24px, 2.8vw, 32px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20, pointerEvents: 'none' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span key={d.id + 'tick'} aria-hidden="true" style={{ width: 30, height: 3, background: 'var(--vv-amber)', flex: 'none', transformOrigin: 'left', animation: 'adTickIn 520ms cubic-bezier(.16,1,.3,1) both' }} />
                    <HudText key={d.id} text={d.label} speed={40} style={{ fontSize: mobile ? 14 : 15, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1, color: 'var(--vv-ice)' }} />
                  </div>
                  <AdTelemetry key={d.id + 'tel'} d={d} compact={mobile} animate />
                </div>
                {/* Heading and intro re-settle on every domain change — the copy is what actually
                   changed, so it should read as newly acquired rather than swapped in place. */}
                <div key={d.id + 'copy'} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: mobile ? '100%' : '60ch' }}>
                  <h3 style={{ margin: 0, fontFamily: mono ? 'var(--font-mono)' : undefined, fontSize: tSize, fontWeight: mono ? 500 : 700, letterSpacing: mono ? '0.01em' : '-0.018em', lineHeight: 1.22, color: 'var(--vv-ice)', textWrap: 'balance', animation: 'adSlipIn 560ms cubic-bezier(.16,1,.3,1) both', animationDelay: '120ms' }}><AdHeading d={d} /></h3>
                  <p style={{ margin: 0, fontFamily: mono ? 'var(--font-mono)' : undefined, fontSize: pSize, lineHeight: 1.6, color: 'var(--vv-ice-82)', textWrap: 'pretty', animation: 'adSlipIn 560ms cubic-bezier(.16,1,.3,1) both', animationDelay: '260ms' }}>{d.intro}</p>
                </div>
              </div>
              {inCanvas ? <AdCapHud key={d.id} d={d} mobile={mobile} hotRef={hotRef} link={capLink} /> : null}
            </DomainInstrument>
            {inCanvas ? <AdCapsSR d={d} /> : null}
            {inCanvas ? null : <div style={{ paddingTop: attached ? 'clamp(24px, 2.8vw, 36px)' : 0 }}><AdCaps d={d} style={capStyle} mobile={mobile || stacked} /></div>}
          </div>
        </div>
      </SectionFrame>
    </Reveal>
  );
}

/* matrix — all four at once. Each tile runs the light 2D swarm (one WebGL context is a budget,
   four is a tax), and selecting a tile retunes the capabilities underneath. */
function AdMatrix({ d, active, select, capStyle, stacked, mobile, tablet, header }) {
  const { SectionFrame } = DS_AD();
  return (
    <Reveal variant={mobile ? 'up' : 'frame'} dur={720} delay={120}>
      <SectionFrame stacked={stacked} copyMax="100%" contentStyle={{ maxWidth: '100%' }} gap={0} fill="transparent"
        {...(mobile ? { chamfer: 0, color: 'transparent', blur: 0, accent: false, padX: '0px', padY: '0px' } : tablet ? { padX: 'clamp(40px, 5vw, 80px)', padY: 'clamp(40px, 5vw, 80px)' } : null)}>
        {header}
        <div style={{ paddingTop: 'clamp(26px, 3vw, 40px)', display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: 1, background: 'var(--line-hairline)', border: '1px solid var(--line-hairline)', borderTopWidth: 1 }}>
          {AUT_DOMAINS.map((x) => {
            const on = x.id === active;
            return (
              <button key={x.id} type="button" onClick={() => select(x.id)} aria-pressed={on ? 'true' : 'false'}
                style={{ position: 'relative', appearance: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', textAlign: 'left', background: 'var(--surface-canvas)', overflow: 'hidden' }}>
                <DomainInstrument domainId={x.id} scene="radar" plate={x.image} dense live={on} corners={!mobile}
                  style={{ height: mobile ? 250 : 'clamp(240px, 23vw, 320px)' }}>
                  <span aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 3, background: on ? 'var(--vv-amber)' : 'transparent', transition: 'background 220ms cubic-bezier(.22,.61,.36,1)' }} />
                  <div style={{ position: 'absolute', inset: 0, padding: mobile ? '20px 18px' : 'clamp(20px, 2vw, 28px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <span aria-hidden="true" style={{ width: 22, height: 3, background: on ? 'var(--vv-amber)' : 'var(--vv-graphite)', flex: 'none', transition: 'background 200ms ease' }} />
                        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1, color: on ? 'var(--vv-ice)' : 'var(--vv-ice-56)', transition: 'color 200ms ease' }}>{x.label}</span>
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', color: on ? 'var(--vv-amber)' : 'var(--vv-graphite)', transition: 'color 200ms ease' }}>{x.code}</span>
                    </div>
                    <h3 style={{ margin: 0, fontSize: mobile ? 18 : 'clamp(18px, 1.5vw, 22px)', fontWeight: 700, letterSpacing: '-0.018em', lineHeight: 1.18, color: on ? 'var(--vv-ice)' : 'var(--vv-ice-82)', textWrap: 'balance', transition: 'color 200ms ease' }}><AdHeading d={x} /></h3>
                  </div>
                </DomainInstrument>
              </button>
            );
          })}
        </div>
        <div style={{ paddingTop: 'clamp(26px, 3vw, 38px)', display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 1.8vw, 22px)' }}>
          <p style={{ margin: 0, fontSize: mobile ? 15 : 'clamp(15.5px, 1.25vw, 17px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', textWrap: 'pretty', maxWidth: '78ch' }}>{d.intro}</p>
          <AdCaps d={d} style={capStyle} mobile={mobile || stacked} />
        </div>
      </SectionFrame>
    </Reveal>
  );
}

/* ledger — the quiet option: no scene, no interaction, everything on the page at once. This is
   the layout that survives a print, a screen reader, and a hostile network. */
function AdLedger({ capStyle, mobile }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 5vw, 72px)' }}>
      {AUT_DOMAINS.map((d, di) => (
        <Reveal key={d.id} variant="up" dur={620} delay={di * 90} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px, 2vw, 26px)' }}>
          <div id={d.id} style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 'clamp(14px, 1.6vw, 20px)', borderBottom: '1px solid var(--line-hairline)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span aria-hidden="true" style={{ width: 30, height: 3, background: 'var(--vv-amber)', flex: 'none' }} />
                <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1, color: 'var(--vv-ice)' }}>{d.label}</span>
              </span>
              <AdTelemetry d={d} compact />
            </div>
            <h3 style={{ margin: 0, fontSize: mobile ? 21 : 'clamp(22px, 1.9vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.18, color: 'var(--vv-ice)', textWrap: 'balance' }}><AdHeading d={d} /></h3>
            <p style={{ margin: 0, fontSize: mobile ? 15 : 16.5, lineHeight: 1.62, color: 'var(--vv-ice-82)', textWrap: 'pretty', maxWidth: '76ch' }}>{d.intro}</p>
          </div>
          <AdCaps d={d} style={capStyle} mobile={mobile} />
        </Reveal>
      ))}
    </div>
  );
}

function DomainSection({ layout = 'console', scene = 'field', nav = 'rail', capStyle = 'hud', capFont = 'mono', capLink = 'auto', corners = true, titleSize = 15, particles }) {
  const parts = Object.assign({ count: 900, glyph: 'dot', size: 1, extent: 1 }, particles);
  const { GradientField, Eyebrow } = DS_AD();
  const stacked = useAdMax(900);
  const mobile = useAdMax(640);
  const tablet = useAdMax(1024) && !mobile;
  /* The hash is the entry point, not just a bookmark: a visitor arriving from a maritime
     programme should land on SEA. Read once on mount, then kept in sync with replaceState so
     the back button is not filled with tab presses. */
  const [active, setActive] = React.useState(() => {
    const h = (typeof window !== 'undefined' ? window.location.hash : '').replace(/^#/, '');
    return AD_IDS.indexOf(h) > -1 ? h : 'air';
  });
  const refs = React.useRef({});
  React.useEffect(() => {
    const on = () => {
      const h = window.location.hash.replace(/^#/, '');
      if (AD_IDS.indexOf(h) > -1) setActive(h);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const select = React.useCallback((id) => {
    setActive(id);
    if (window.history && window.history.replaceState) window.history.replaceState(null, '', `#${id}`);
  }, []);
  const onKeyDown = React.useCallback((e) => {
    const i = AD_IDS.indexOf(active);
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % AD_IDS.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + AD_IDS.length) % AD_IDS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = AD_IDS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    const id = AD_IDS[next];
    select(id);
    const node = refs.current[id];
    if (node && node.focus) node.focus({ preventScroll: true });
  }, [active, select]);

  const d = AUT_DOMAINS.find((x) => x.id === active) || AUT_DOMAINS[0];
  const Nav = AD_NAVS[nav] || AdNavNotch;
  const navEl = mobile ? <AdNavSelect active={active} onSelect={select} /> : <Nav active={active} mobile={mobile} onSelect={select} onKeyDown={onKeyDown} refs={refs} />;

  const header = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 'var(--sf-copy-max, 760px)' }}>
      <Eyebrow><HudText text="Domains" speed={30} delay={240} /></Eyebrow>
      <Reveal as="h2" variant="text" dur={760} delay={290} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', textWrap: 'balance' }}>
        <span style={{ color: 'var(--vv-amber)' }}>Legitimate Autonomy</span> Across All Domains
      </Reveal>
      <Reveal as="p" variant="up" delay={470} style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', textWrap: 'pretty' }}>
        One evolutionary architecture, retuned for the physics of every operating environment.
      </Reveal>
    </div>
  );

  return (
    <GradientField field="none" pad={mobile ? 'clamp(64px, 15vw, 96px) var(--gutter-site)' : 'clamp(40px, 4.2vw, 72px) var(--gutter-site)'} as="section" id="domains">
      <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
        {layout === 'ledger' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 3.2vw, 48px)' }}>
            <Reveal variant="up" dur={640}>{header}</Reveal>
            <AdLedger capStyle={capStyle === 'hud' ? 'cards' : capStyle} mobile={mobile} />
          </div>
        ) : layout === 'matrix' ? (
          <AdMatrix d={d} active={active} select={select} capStyle={capStyle === 'hud' ? 'cards' : capStyle} stacked={stacked} mobile={mobile} tablet={tablet} header={header} />
        ) : (
          <AdConsole d={d} scene={scene} capStyle={capStyle} capFont={capFont} capLink={capLink} corners={corners} titleSize={titleSize || 15} particles={parts} stacked={stacked} mobile={mobile} tablet={tablet} header={header} nav={navEl} navKind={nav} />
        )}
      </div>
    </GradientField>
  );
}

Object.assign(window, { DomainSection, AUT_DOMAINS });
