const DS = () => window.VivumAIDesignSystem_b2be15;

const NEURAL_TRAITS = [
  { image: '../../assets/plates/core-tech-adaptive-learning.png', title: 'Adaptive Learning', body: 'Continuously update knowledge based on new experiences.' },
  { image: '../../assets/plates/core-tech-temporal-awareness.png', title: 'Temporal Awareness', body: 'Seamlessly integrate and process information over time.' },
  { image: '../../assets/plates/core-tech-contextual-understanding.png', title: 'Contextual Understanding', body: 'Interpret data within the context of the environment.' },
  { image: '../../assets/plates/core-tech-efficient-computation.png', title: 'Efficient Computation', body: 'Perform complex tasks with minimal memory consumption.' },
];

/* Radial-fade mask on the trait thumbnails — same closest-side stops as the Biological
   Intelligence hung mark and the Dynamic Neural Models brain image, so a square photo reads
   as a soft glow instead of a hard-edged tile. */
const TRAIT_MASK = 'radial-gradient(circle closest-side, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.88) 55%, rgba(0, 0, 0, 0.35) 78%, rgba(0, 0, 0, 0) 100%)';
function TraitImg({ item, size }) {
  return <img src={item.image} alt="" style={{ width: size, height: size, aspectRatio: '1', objectFit: 'cover', display: 'block', flex: 'none', maskImage: TRAIT_MASK, WebkitMaskImage: TRAIT_MASK }} />;
}

const EVO_PILLARS = [
  { icon: 'dna', title: 'Natural Selection Optimization', body: 'Our IP Core utilizes Genetic Algorithms and other Evolutionary Algorithms to simulate natural selection as a singular force for generating diverse solutions across processors and models, evolving AI systems that meet specific goals or behaviors. We don\u2019t explicitly program AI agents; instead, our approach creates evolutionary pressures that favor high-performing solutions, resulting in more efficient and adaptable AI systems.' },
  { icon: 'gauge-high', title: 'Accelerated Artificial Evolution', body: 'We leverage reconfigurable hardware like FPGAs to dramatically speed up neural circuit evaluations to evolve Dynamic Neural Networks, achieving results orders of magnitude faster than traditional methods. Our proprietary high-throughput system significantly reduces the cost and development time typically associated with training complex neural networks, making advanced tailored AI solutions more accessible and efficient.' },
  { icon: 'brain-circuit', title: 'Dynamic Neural Networks', body: 'Our Dynamic Neural Models generate explainable, contextual responses to new stimuli, adapting in real-time to unfamiliar scenarios. This approach enables our solutions to efficiently tackle complex, time-dependent tasks with greater decision transparency than conventional deep and reinforcement learning methods. Crucially, this enhanced explainability ensures safety in mission-critical applications by enabling verification of AI decisions in high-stakes environments.' },
  { icon: 'microchip', title: 'Delivering Legitimate Autonomous Capabilities', body: 'We integrate our evolved models directly into target hardware, whether it\u2019s a CPU, microcontroller, FPGA, or custom ASICs, allowing them to fine-tune to each device\u2019s specific characteristics. This results in highly efficient autonomous systems that require significantly less energy and fewer computational resources, enabling true on-device learning even in size, weight, and power (SWaP) constrained environments.' },
];

/* Thin corner-chevron, not an icon glyph — two 1.5px strokes mitred to a point, matching the
   hairline vocabulary (Bezel outline, Divider) instead of a bolder icon-font arrow. */
function SliderArrow({ dir, onClick }) {
  const { Icon } = DS();
  const [hot, setHot] = React.useState(false);
  const mobile = useMaxWidth(640);
  return (
    <button type="button" onClick={onClick} aria-label={dir === 'left' ? 'Previous' : 'Next'}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ position: 'absolute', top: '50%', [dir]: mobile ? 'calc(var(--gutter-site) - 16px)' : 26, transform: 'translateY(-50%)', zIndex: 3, appearance: 'none', background: 'none', border: 0, padding: 16, margin: 0, cursor: 'pointer', color: hot ? 'var(--vv-ice)' : 'var(--vv-ice-56)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 160ms ease' }}>
      <Icon name={dir === 'left' ? 'angle-left' : 'angle-right'} size={48} color="currentColor" />
    </button>
  );
}

/* One trait per slide instead of a stacked list: the chamfered frame becomes the slide itself
   (image as `decor`, filling the frame edge-to-edge since decor is already inset:0/cover), with
   title+body scrimmed over the bottom third. Same Bezel device as the rest of the section, so a
   slider reads as one more instrument rather than a bolted-on carousel widget. */
const SLIDER_IMG_STYLE = { width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.4, filter: 'grayscale(1)', maskImage: TRAIT_MASK, WebkitMaskImage: TRAIT_MASK };
const AUTO_MS = 5000;
const RESUME_MS = 6000;
/* One trait per slide, everything (title, body, dots) overlaid on the image itself instead of
   stacked below it, so the slider's footprint is just the image — not image-plus-caption-rows.
   Auto-advance runs on an interval that any interaction (arrow or dot) clears; a resume timer
   restarts it after a quiet period, so a browsing user never fights the clock. */
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

/* Same 1560px threshold SectionFrame opens its corner cut on — the point the shared page
   container (--container-site-narrow, 1400px) actually hits its cap, so "max width reached"
   means this, not an arbitrary breakpoint. */
const WIDE_MQ = 1560;

/* Transition style is a tweak (`transition` prop): "slide" pushes the incoming frame in from
   the direction of travel while the outgoing frame exits the opposite way (dual-layer, own
   easing below); "fade" is sequential, not a crossfade — the current image dissolves fully to
   0 first, THEN the swap happens (invisible, so there's no hard cut), THEN it fades back in,
   and only once it's back at full opacity does the caption follow with its own quick fade. That
   staggering is what keeps a fade from reading as "lag": two independently-timed opacities
   resolving in sequence looks intentional, whereas a dissolve where the new image and new
   caption both half-appear at once while the old ones are still half-there reads as stutter.
   The image keeps its radial vignette mask (SLIDER_IMG_STYLE/TRAIT_MASK) applied at every
   step — same element, same mask, only its opacity animates — so the edge treatment never
   flashes bare mid-transition. "none" cuts immediately. */
const SLIDE_CFG = { duration: 450, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }; // ease-out-quint: fast off the mark, soft settle — standard for push/slide motion
const FADE_STAGE_MS = 240; // image: out, then (swap while invisible), then in
const FADE_EASING = 'ease-in-out';
const CAPTION_SEP = ' — ';
const TYPE_TICK_MS = 14;
const TYPE_CHARS_PER_TICK = 2; // fast typewriter, not a slow character-by-character crawl
function TraitSlider({ wide, mobile, transition = 'fade' }) {
  const n = NEURAL_TRAITS.length;
  const indexRef = React.useRef(0);
  const timerRef = React.useRef(null);
  const resumeRef = React.useRef(null);
  const timeoutsRef = React.useRef([]);
  const rafRef = React.useRef([null, null]);
  const dirRef = React.useRef(1);
  const typeTimerRef = React.useRef(null);
  const cursorTimerRef = React.useRef(null);
  const clearTimers = () => { timeoutsRef.current.forEach(clearTimeout); timeoutsRef.current = []; };
  const clearAuto = () => { if (timerRef.current) clearInterval(timerRef.current); timerRef.current = null; };

  /* Mirrors the target index for the position dots. A ref would not re-render and the derived
     item lags a fade by a stage, so the dots would answer late to their own tap. */
  const [uiIdx, setUiIdx] = React.useState(0);
  const [slideActive, setSlideActive] = React.useState(0);
  const [slideIncoming, setSlideIncoming] = React.useState(null);
  const [slidePhase, setSlidePhase] = React.useState('idle');

  const [fadeItem, setFadeItem] = React.useState(NEURAL_TRAITS[0]);
  const [imgOpacity, setImgOpacity] = React.useState(1);
  const [typedLen, setTypedLen] = React.useState(NEURAL_TRAITS[0].title.length + CAPTION_SEP.length + NEURAL_TRAITS[0].body.length);
  const [showCursor, setShowCursor] = React.useState(false);

  // Preload every trait image up front. Without this, swapping the <img> src mid-fade races
  // the network/decode: browsers keep the OLD bitmap on screen until the new one finishes
  // loading, so the "invisible" swap actually fades the old image back in and only pops to the
  // new one once it lands — the flicker. Preloading means the src swap always resolves from
  // cache, so the opacity transition is the only thing the eye ever sees.
  React.useEffect(() => {
    NEURAL_TRAITS.forEach((t) => { const im = new Image(); im.src = t.image; });
  }, []);

  // Types the caption in fast (2 chars/tick) rather than fading it — a typewriter reveal
  // reads as the instrument actively reporting a new reading, and finishes quickly enough
  // (~14ms/char pair) that it never feels like a delay tacked onto the image's own fade.
  const startTyping = React.useCallback((item) => {
    clearInterval(typeTimerRef.current);
    clearInterval(cursorTimerRef.current);
    const full = item.title.length + CAPTION_SEP.length + item.body.length;
    let len = 0;
    setTypedLen(0);
    setShowCursor(true);
    typeTimerRef.current = setInterval(() => {
      len += TYPE_CHARS_PER_TICK;
      if (len >= full) {
        len = full;
        clearInterval(typeTimerRef.current);
        cursorTimerRef.current = setTimeout(() => setShowCursor(false), 300);
      }
      setTypedLen(len);
    }, TYPE_TICK_MS);
  }, []);

  // Switching the tweak mid-session (or mounting) resyncs both modes' local state to whatever
  // index is actually current, so flipping the radio never leaves a stale half-transition.
  React.useEffect(() => {
    clearTimers();
    clearInterval(typeTimerRef.current);
    clearInterval(cursorTimerRef.current);
    cancelAnimationFrame(rafRef.current[0]);
    cancelAnimationFrame(rafRef.current[1]);
    setSlideIncoming(null); setSlidePhase('idle'); setSlideActive(indexRef.current); setUiIdx(indexRef.current);
    const item = NEURAL_TRAITS[indexRef.current];
    setFadeItem(item); setImgOpacity(1);
    setTypedLen(item.title.length + CAPTION_SEP.length + item.body.length);
    setShowCursor(false);
  }, [transition]);

  const goTo = React.useCallback((idx, dir = 1) => {
    idx = ((idx % n) + n) % n;
    setUiIdx(idx);
    if (idx === indexRef.current) return;
    indexRef.current = idx;
    if (transition === 'none') {
      clearTimers();
      clearInterval(typeTimerRef.current);
      clearInterval(cursorTimerRef.current);
      const item = NEURAL_TRAITS[idx];
      setSlideActive(idx); setSlideIncoming(null);
      setFadeItem(item); setImgOpacity(1);
      setTypedLen(item.title.length + CAPTION_SEP.length + item.body.length);
      setShowCursor(false);
      return;
    }
    if (transition === 'fade') {
      clearTimers();
      clearInterval(typeTimerRef.current);
      clearInterval(cursorTimerRef.current);
      setImgOpacity(0);
      setTypedLen(0);
      setShowCursor(false);
      timeoutsRef.current.push(setTimeout(() => {
        const item = NEURAL_TRAITS[idx];
        setFadeItem(item);
        setImgOpacity(1);
        timeoutsRef.current.push(setTimeout(() => startTyping(item), FADE_STAGE_MS));
      }, FADE_STAGE_MS));
      return;
    }
    dirRef.current = dir;
    clearTimers();
    cancelAnimationFrame(rafRef.current[0]);
    cancelAnimationFrame(rafRef.current[1]);
    setSlidePhase('idle');
    setSlideIncoming(idx);
    rafRef.current[0] = requestAnimationFrame(() => {
      rafRef.current[1] = requestAnimationFrame(() => setSlidePhase('enter'));
    });
    timeoutsRef.current.push(setTimeout(() => { setSlideActive(idx); setSlideIncoming(null); setSlidePhase('idle'); }, SLIDE_CFG.duration));
  }, [n, transition, startTyping]);

  const startAuto = React.useCallback(() => {
    clearAuto();
    timerRef.current = setInterval(() => goTo(indexRef.current + 1, 1), AUTO_MS);
  }, [goTo]);
  React.useEffect(() => { startAuto(); return clearAuto; }, [startAuto]);
  React.useEffect(() => () => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    clearTimers();
    clearInterval(typeTimerRef.current);
    clearInterval(cursorTimerRef.current);
    cancelAnimationFrame(rafRef.current[0]);
    cancelAnimationFrame(rafRef.current[1]);
  }, []);
  const onInteract = () => {
    clearAuto();
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(startAuto, RESUME_MS);
  };
  const go = (d) => { goTo(indexRef.current + d, d); onInteract(); };

  /* Touch nav replaces the arrows on a phone: the arrows sat on top of the image at thumb
     height and were the only way to move, so the image carried two chevrons over it at all
     times. `pan-y` keeps vertical page scrolling native — only a decisively horizontal drag
     counts, hence comparing dx against dy rather than a bare threshold. */
  const touchRef = React.useRef(null);
  const swipe = mobile ? {
    onTouchStart: (e) => { const p = e.touches[0]; touchRef.current = { x: p.clientX, y: p.clientY }; },
    onTouchEnd: (e) => {
      const s = touchRef.current;
      if (!s) return;
      touchRef.current = null;
      const p = e.changedTouches[0];
      const dx = p.clientX - s.x;
      const dy = p.clientY - s.y;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) go(dx < 0 ? 1 : -1);
    },
  } : null;

  /* On mobile the image box bleeds to the screen edges, so the text insets itself back to the
     section container's gutter instead of to the image. */
  const capPad = mobile ? '0 var(--gutter-site)' : '0 clamp(20px, 2.4vw, 30px)';
  /* Caption sits higher on mobile to clear the dot row underneath it. */
  const captionBottom = mobile ? 'clamp(40px, 10vw, 52px)' : 'clamp(72px, 8.8vw, 100px)';
  /* Position readout, mobile only: circles in ice, no amber — amber is reserved for section
     accents, and a slider position is not an accent. Aligned to the caption's own left inset so
     it reads as the last line of the caption block. */
  const dots = mobile ? (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'clamp(6px, 2vw, 12px)', padding: capPad, display: 'flex', alignItems: 'center', gap: 2, zIndex: 2 }}>
      {NEURAL_TRAITS.map((it, i) => (
        <button key={it.title} type="button" aria-label={`Go to slide ${i + 1} of ${n}`} aria-current={i === uiIdx ? 'true' : undefined}
          onClick={() => { goTo(i, i > uiIdx ? 1 : -1); onInteract(); }}
          style={{ appearance: 'none', background: 'none', border: 0, padding: '12px 7px', margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ display: 'block', width: 7, height: 7, borderRadius: 99, border: `1px solid ${i === uiIdx ? 'var(--vv-ice)' : 'var(--vv-ice-56)'}`, background: i === uiIdx ? 'var(--vv-ice)' : 'transparent', transition: 'background 220ms ease, border-color 220ms ease' }} />
        </button>
      ))}
    </div>
  ) : null;
  const caption = (item, opacity, ms) => (
    /* Text is pinned by a fixed `bottom` offset, not stacked in a bottom-anchored flex group —
       a fixed anchor means the heading starts at the same y every slide no matter how long its
       paragraph runs, instead of the whole block sliding down when the copy is short. */
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: captionBottom, padding: capPad, textAlign: 'left', pointerEvents: 'none', opacity, transition: ms != null ? `opacity ${ms}ms ${FADE_EASING}` : undefined }}>
      <div style={{ display: 'flex', alignItems: 'baseline', maxWidth: 360 }}>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.55 }}>
          <span style={{ fontWeight: 600, textTransform: 'capitalize', color: 'var(--vv-ice-82)' }}>{item.title}</span>
          <span style={{ color: 'var(--vv-ice-56)' }}> — {item.body}</span>
        </p>
      </div>
    </div>
  );

  // Same layout as `caption` above, but the title/separator/body strings are sliced down to
  // `typedLen` characters and a blinking caret trails the cut — the typewriter version used
  // only while a fade transition is actively revealing new text.
  const typedCaption = (item, len, cursorOn) => {
    const titleShown = item.title.slice(0, Math.max(0, Math.min(len, item.title.length)));
    const sepRemaining = len - item.title.length;
    const sepShown = CAPTION_SEP.slice(0, Math.max(0, Math.min(sepRemaining, CAPTION_SEP.length)));
    const bodyRemaining = sepRemaining - CAPTION_SEP.length;
    const bodyShown = item.body.slice(0, Math.max(0, Math.min(bodyRemaining, item.body.length)));
    return (
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: captionBottom, padding: capPad, textAlign: 'left', pointerEvents: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', maxWidth: 360 }}>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.55 }}>
            <span style={{ fontWeight: 600, textTransform: 'capitalize', color: 'var(--vv-ice-82)' }}>{titleShown}</span>
            <span style={{ color: 'var(--vv-ice-56)' }}>{sepShown}{bodyShown}</span>
            {cursorOn ? <span style={{ display: 'inline-block', width: 1.5, height: 10, marginLeft: 1, background: 'var(--vv-amber)', verticalAlign: '-1px', opacity: Math.floor(Date.now() / 350) % 2 ? 1 : 0.15 }} /> : null}
          </p>
        </div>
      </div>
    );
  };

  if (transition === 'fade' || transition === 'none') {
    const full = fadeItem.title.length + CAPTION_SEP.length + fadeItem.body.length;
    const typing = transition === 'fade' && typedLen < full;
    return (
      <div {...swipe} style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden', touchAction: mobile ? 'pan-y' : undefined }}>
        <img src={fadeItem.image} alt="" style={{ ...SLIDER_IMG_STYLE, opacity: SLIDER_IMG_STYLE.opacity * imgOpacity, transition: transition === 'fade' ? `opacity ${FADE_STAGE_MS}ms ${FADE_EASING}` : undefined }} />
        {typing || (transition === 'fade' && showCursor) ? typedCaption(fadeItem, typedLen, showCursor) : caption(fadeItem, 1, null)}
        <SliderArrow dir="left" onClick={() => go(-1)} />
        <SliderArrow dir="right" onClick={() => go(1)} />
        {dots}
      </div>
    );
  }

  const renderContent = (item) => (<><img src={item.image} alt="" style={SLIDER_IMG_STYLE} />{caption(item, 1)}</>);
  const entering = slidePhase === 'enter';
  let baseStyle = { position: 'absolute', inset: 0 };
  let incomingStyle = { position: 'absolute', inset: 0 };
  if (slideIncoming !== null) {
    const dir = dirRef.current >= 0 ? 1 : -1;
    baseStyle = { ...baseStyle, transform: `translateX(${entering ? -dir * 100 : 0}%)`, transition: `transform ${SLIDE_CFG.duration}ms ${SLIDE_CFG.easing}` };
    incomingStyle = { ...incomingStyle, transform: `translateX(${entering ? 0 : dir * 100}%)`, transition: `transform ${SLIDE_CFG.duration}ms ${SLIDE_CFG.easing}` };
  }
  return (
    <div {...swipe} style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden', touchAction: mobile ? 'pan-y' : undefined }}>
      <div style={baseStyle}>{renderContent(NEURAL_TRAITS[slideActive])}</div>
      {slideIncoming !== null && <div style={incomingStyle}>{renderContent(NEURAL_TRAITS[slideIncoming])}</div>}
      <SliderArrow dir="left" onClick={() => go(-1)} />
      <SliderArrow dir="right" onClick={() => go(1)} />
      {dots}
    </div>
  );
}

function useMaxWidth(q) {
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

/* The traits were four cells divided by vertical hairlines — legible, but a different device
   from every other group of small items on the page. Chamfered frames match Autonomous
   Solutions and the pillars below, and the ice icon keeps the amber for section accents. */
function TraitCard({ item, tone, chamferFill = 'rgba(218,232,242,0.02)' }) {
  const { Bezel } = DS();
  const [hot, setHot] = React.useState(false);
  return (
    <Bezel accent={false} chamfer={16} weight={1} pad="clamp(22px, 2.2vw, 28px)"
      color={hot ? 'var(--vv-ice-14)' : 'var(--line-hairline)'}
      fill={hot ? 'rgba(218,232,242,0.05)' : chamferFill}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ transition: 'none', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
        <TraitImg item={item} size={48} />
        <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3, color: 'var(--vv-ice)', textWrap: 'balance' }}>{item.title}</h3>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)', textWrap: 'pretty' }}>{item.body}</p>
      </div>
    </Bezel>
  );
}

/* Section 3 — Dynamic Neural Models */
/* Same SectionFrame the Biological Intelligence section uses for its hung mark: a fixed copy
   cap, `reserve` to keep the copy clear of the art, and `decor` so the image is absolutely
   positioned and clipped by the frame's own chamfer — it can never spill past the container.
   contentStyle keeps the FRAME's content box full width (so the traits grid below still
   spans it); the copy div reads its measure off `--sf-copy-max` instead. */
const MODEL_IMG_W = 'clamp(520px, 52vw, 760px)';
// Image disabled for now (kept for later use) — flip to `true` to bring it back as the
// section's right-side decor.
const SHOW_MODEL_IMG = false;
function NeuralSection({ traits = 'cards', tone = 'var(--vv-ice)', transition = 'fade', chamferFill = 'rgba(218,232,242,0.02)' }) {
  const { GradientField, Eyebrow, SectionFrame } = DS();
  const stacked = useMaxWidth(900);
  const tight = useMaxWidth(560);
  const mobile = useMaxWidth(640);
  const tablet = useMaxWidth(1024) && !mobile;
  const wide = useMinWidth(WIDE_MQ);
  const cols = stacked ? (tight ? 1 : 2) : 4;
  const modelImgStyle = (w) => ({ width: w, aspectRatio: '1', objectFit: 'cover', display: 'block', opacity: 0.4, filter: 'grayscale(1)', maskImage: 'radial-gradient(closest-side, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.88) 40%, rgba(0, 0, 0, 0.42) 64%, rgba(0, 0, 0, 0.12) 80%, rgba(0, 0, 0, 0) 100%)', WebkitMaskImage: 'radial-gradient(closest-side, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.88) 40%, rgba(0, 0, 0, 0.42) 64%, rgba(0, 0, 0, 0.12) 80%, rgba(0, 0, 0, 0) 100%)' });
  const modelImg = stacked
    ? <img src="../../assets/plates/dynamic-neural-brain.jpg" alt="" style={{ ...modelImgStyle('clamp(220px, 60vw, 340px)'), margin: '0 auto' }} />
    : <img src="../../assets/plates/dynamic-neural-brain.jpg" alt="" style={{ ...modelImgStyle(MODEL_IMG_W), position: 'absolute', right: 'var(--sf-decor-right)', top: 'var(--sf-pad-y)' }} />;
  return (
    /* field="none": was "data" — the bloom is off, the field kept for future use. */
    <GradientField field="none" pad={mobile ? 'clamp(64px, 15vw, 96px) var(--gutter-site)' : 'clamp(40px, 4.2vw, 72px) var(--gutter-site)'} as="section" id="models">
      <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
        <Reveal variant={mobile ? 'up' : 'frame'} dur={660} group={stacked}>
        <SectionFrame copyMax="100%" stacked={stacked} gap={0}
          contentStyle={{ maxWidth: '100%' }} decor={stacked || !SHOW_MODEL_IMG ? null : modelImg}
          fill={mobile ? 'transparent' : chamferFill}
          {...(mobile ? { chamfer: 0, color: 'transparent', blur: 0, accent: false, padX: '0px', padY: '0px' } : tablet ? { padX: 'clamp(48px, 6vw, 96px)', padY: 'clamp(48px, 6vw, 96px)' } : null)}
          before={stacked && SHOW_MODEL_IMG ? <div style={{ marginBottom: 'clamp(24px, 5vw, 40px)' }}>{modelImg}</div> : null}>
          {traits === 'side' ? (
            <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) 1px minmax(0, 0.92fr)', columnGap: 'clamp(16px, 1.8vw, 28px)', rowGap: 'clamp(32px, 4vw, 56px)', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <Eyebrow><HudText text="Core technology" speed={30} delay={280} /></Eyebrow>
                <Reveal as="h2" variant="text" dur={780} delay={320} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', textWrap: 'balance' }}>
                  Dynamic Neural Models That <span style={{ color: 'var(--vv-amber)' }}>Mimic Real Intelligence</span>
                </Reveal>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 4 }}>
                  <Reveal as="p" variant="up" delay={500} style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-body)' }}>
                    Vivum AI pioneers Dynamic Neural Models inspired by the fluidity and adaptability of Biological Intelligence. Using Liquid Time-Constant Networks, Continuous-Time Recurrent Neural Networks, Reservoir Models, and Ordinary Differential Equations, we build AI that enables human-like perception and decision-making on machines and autonomous platforms.
                  </Reveal>
                  <Reveal as="p" variant="up" delay={620} style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                    Inspired by the brain, our models efficiently process temporal and sequential data, enabling real-time adaptation and context-aware decision-making.
                  </Reveal>
                </div>
              </div>
              {stacked ? null : <Reveal variant="fade" dur={860} delay={700} style={{ alignSelf: 'stretch', width: 1, background: 'var(--line-hairline)' }} />}
              {/* Same items as the cards/columns variants, but a single slider instead of a
                 stacked list. Negative margin equal to the frame's own padding lets the image
                 bleed flush to the frame's inner edge vertically — same trick as the Biological
                 Intelligence photo escaping its column — without exceeding the frame's outline,
                 since the margin exactly cancels the padding it's using. A little padding is
                 kept back on the right so the image doesn't touch the outline there. */}
              <div style={{ marginTop: 'calc(-1 * var(--sf-pad-y))', marginLeft: mobile ? 'calc(-1 * var(--gutter-site))' : undefined, marginRight: mobile ? 'calc(-1 * var(--gutter-site))' : 'calc(-1 * var(--sf-pad-x) + 44px)', marginBottom: 'calc(-1 * var(--sf-pad-y))' }}>
                <RevealSeq ms={stacked ? 300 : 0}><Reveal variant="wipe" dur={820} delay={780}><TraitSlider wide={wide} mobile={mobile} transition={transition} /></Reveal></RevealSeq>
              </div>
            </div>
          ) : (
          <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 'var(--sf-copy-max)' }}>
            <Eyebrow><HudText text="Core technology" speed={30} delay={280} /></Eyebrow>
            <Reveal as="h2" variant="text" dur={780} delay={320} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', textWrap: 'balance' }}>
              Dynamic Neural Models That <span style={{ color: 'var(--vv-amber)' }}>Mimic Real Intelligence</span>
            </Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 4 }}>
              <Reveal as="p" variant="up" delay={500} style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-body)' }}>
                Vivum AI pioneers the evolution of Dynamic Neural Models that mimic the fluidity and adaptability of Biological Intelligence. By leveraging techniques such as Liquid Time-Constant Networks, Continuous Time Recurrent Neural Networks, Reservoir Models, and Ordinary Differential Equations, we create AI systems that map human-like perception and decision-making onto machines and autonomous platforms.
              </Reveal>
              <Reveal as="p" variant="up" delay={620} style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                Inspired by the brain’s intricate workings, our dynamic neural models offer a natural and efficient approach to AI. They excel at processing temporal and sequential data, enabling real-time adaptation and context-aware decision-making.
              </Reveal>
            </div>
          </div>

          {traits === 'columns' ? (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 'clamp(16px, 1.8vw, 24px)', marginTop: 'clamp(56px, 6vw, 80px)' }}>
              {NEURAL_TRAITS.map((t) => (
                <Reveal key={t.title} variant="frame" delay={NEURAL_TRAITS.indexOf(t) * 150} dur={600} style={{ padding: 'clamp(22px, 2.2vw, 28px)', border: '1px solid var(--line-hairline)', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 200 }}>
                  <TraitImg item={t} size={48} />
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--vv-ice)' }}>{t.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)' }}>{t.body}</p>
                </Reveal>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 'clamp(16px, 1.8vw, 24px)', marginTop: 'clamp(56px, 6vw, 80px)', alignItems: 'stretch' }}>
              {NEURAL_TRAITS.map((t, i) => <Reveal key={t.title} variant="frame" delay={i * 150} dur={600} style={{ height: '100%' }}><TraitCard item={t} tone={tone} chamferFill={chamferFill} /></Reveal>)}
            </div>
          )}
          </>
          )}
        </SectionFrame>
        </Reveal>
      </div>
    </GradientField>
  );
}

/* Standalone divider · same full-bleed VideoBackdrop device Section 1 (Biological
   Intelligence) uses, but pure background: the wrapper is zero-height and the plate is
   absolutely positioned straddling the seam, so it never pushes Autonomous Solutions and
   Core technology apart — it just shows through their transparent (`field="none"`)
   sections. `edgeFade` dissolves the footage into the canvas colour at its own top/bottom.
   The plate's box is forced SQUARE (width == minHeight, via plateShift) so the shared
   `--plate-feather` ellipse — which follows the box's own aspect ratio — resolves to an
   actual circle instead of stretching into an oval across the wide section. */
function EvoComparisonDivider() {
  const { VideoBackdrop } = DS();
  const PLATE_H = 'clamp(420px, 42vw, 620px)';
  const mobile = useMaxWidth(640);
  if (mobile) return null;
  return (
    <div style={{ position: 'relative', height: 0, overflow: 'visible', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, transform: 'translateY(-50%)', zIndex: -1 }}>
        <VideoBackdrop src="../../assets/plates/evolutionary-intelligence.mp4" scrim="none" circleMask pingPong
          minHeight={PLATE_H} align="center" edgeFade={false}
          plateAlpha={0.07} plateShift={`clamp(340px, calc(96% - ${PLATE_H}), 860px)`} plateSide="right" plateScale={3} plateFit={null} plateDrop="220px" bleed
          style={{ background: 'transparent' }} />
      </div>
    </div>
  );
}


/* Section 4 — Evolutionary Artificial Intelligence */
/* Same two-column device as Autonomous Solutions: a chamfered SectionFrame carries the copy on
   the left: the four pillars, rows of a single accordion on the right, so only one is open at
   a time instead of four long panels competing for attention. */
function EvoAccordionRow({ item, first, last, open, onToggle, index = 0 }) {
  const { Icon } = DS();
  const [hot, setHot] = React.useState(false);
  return (
    <Reveal variant="side" delay={index * 120} dur={540} style={{ borderTop: first ? 'none' : '1px solid var(--line-hairline)', borderBottom: last ? '1px solid var(--line-hairline)' : 'none' }}>
      <button type="button" onClick={onToggle} onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: 'clamp(18px, 2vw, 24px) 2px', background: 'none', border: 0, cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>
        <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3, color: open || hot ? 'var(--vv-ice)' : 'var(--vv-ice-56)', textWrap: 'balance', transition: 'color 160ms ease' }}>{item.title}</span>
        <Icon name={open ? 'angle-down' : 'angle-right'} size={26} color={hot ? 'var(--vv-amber)' : 'var(--text-secondary)'} style={{ flex: 'none', transition: 'color 160ms ease' }} />
      </button>
      <div aria-hidden={!open} style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: `grid-template-rows 420ms ${VV_EASE}, opacity 300ms ${VV_EASE}`, opacity: open ? 1 : 0 }}>
        {/* The padding must live INSIDE the overflow-hidden grid item, never on it: a grid
            item's own padding box still contributes min-content, so a padded item keeps the
            0fr track from ever reaching 0 and every closed row ends up ~18px taller than the
            design. This inner clip box is what collapses; the paragraph keeps its padding. */}
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <p style={{ margin: 0, padding: '0 2px clamp(18px, 2vw, 24px)', fontSize: 14.5, lineHeight: 1.65, color: 'var(--text-secondary)', textWrap: 'pretty' }}>{item.body}</p>
        </div>
      </div>
    </Reveal>
  );
}
function EvoAccordion() {
  const [open, setOpen] = React.useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {EVO_PILLARS.map((p, i) => (
        <EvoAccordionRow key={p.title} index={i} item={p} first={i === 0} last={i === EVO_PILLARS.length - 1}
          open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
      ))}
    </div>
  );
}

function EvolutionarySection({ onNavigate, chamferFill = 'rgba(218,232,242,0.02)' }) {
  const { GradientField, Eyebrow, SectionFrame } = DS();
  const QuietLink = window.QuietLink;
  const stacked = useMaxWidth(900);
  const mobile = useMaxWidth(640);
  const tablet = useMaxWidth(1024) && !mobile;
  const wide = useMinWidth(WIDE_MQ);
  const copy = (
    <>
      <Eyebrow><HudText text="Technical Overview" speed={28} delay={260} /></Eyebrow>
      <Reveal as="h2" variant="text" dur={760} delay={300} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', textWrap: 'balance' }}>
        <span style={{ color: 'var(--vv-amber)' }}>Evolutionary</span> Artificial Intelligence
      </Reveal>
      <Reveal as="p" variant="up" delay={480} style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', textWrap: 'pretty' }}>
        Our approach utilizes evolutionary algorithms, accelerated via reconfigurable hardware like FPGAs, to develop tailored Dynamic Neural Models for specific hardware platforms. Embedding the models into anything from basic microcontrollers to advanced control systems, Evolutionary AI ensures optimal performance for each unique task and domain.
      </Reveal>
      {/* Reveals last on desktop too — the delay clears the accordion's own ramp in the right
         column (four rows, 120ms apart), so the link is the section's closing beat either way. */}
      {!mobile ? <Reveal variant="side" delay={900} dur={480} style={{ paddingTop: 10 }}>
        <QuietLink href="#/contact" label="Send us your questions"
          onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/contact'); }} />
      </Reveal> : null}
    </>
  );
  return (
    /* field="none": was "right" — the bloom is off, the field kept for future use. */
    <GradientField field="none" pad={mobile ? 'clamp(64px, 15vw, 96px) var(--gutter-site)' : 'clamp(40px, 4.2vw, 72px) var(--gutter-site)'} as="section" id="evolutionary">
      <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
        <RevealGroup on={stacked}>
        <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : (wide ? '3fr 2fr' : '1fr 1fr'), columnGap: 'clamp(28px, 2.6vw, 48px)', rowGap: 'clamp(36px, 5vw, 56px)', alignItems: 'stretch' }}>
          <div style={{ alignSelf: 'center' }}>
            <Reveal variant={mobile ? 'up' : 'frame'} dur={660}>
            <SectionFrame copyMax="100%" stacked={stacked} contentStyle={{ maxWidth: '100%' }} fill={mobile ? 'transparent' : chamferFill}
              {...(mobile ? { chamfer: 0, color: 'transparent', blur: 0, accent: false, padX: '0px', padY: '0px' } : tablet ? { padX: 'clamp(48px, 6vw, 96px)', padY: 'clamp(48px, 6vw, 96px)' } : null)}>{copy}</SectionFrame>
            </Reveal>
          </div>
          <div style={{ width: '100%', alignSelf: 'center' }}>
            <RevealSeq ms={stacked ? 700 : 0}><EvoAccordion /></RevealSeq>
          </div>
        </div>
        {/* Mobile lifts this link out of the copy column and drops it at the very bottom of the
             section, so it must also reveal last: RevealSeq pushes it past every column ramp
             above it (copy, then the stacked right column) rather than firing on its own
             near-zero delay the moment it scrolls in. */}
        {mobile ? <div style={{ marginTop: 'clamp(24px, 5vw, 36px)' }}>
          <RevealSeq ms={1450}><Reveal variant="side" dur={480}>
            <QuietLink href="#/contact" label="Send us your questions"
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/contact'); }} />
          </Reveal></RevealSeq>
        </div> : null}
        </RevealGroup>
      </div>
    </GradientField>
  );
}
Object.assign(window, { NeuralSection, EvolutionarySection, EvoComparisonDivider });
