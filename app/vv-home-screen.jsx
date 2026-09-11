const DS = () => window.VivumAIDesignSystem_b2be15;
const CMP_TINT_HEX_TO_KEY = { '#2881B5': 'blue', '#EC9A00': 'amber', '#DAE8F2': 'ice', '#22A66E': 'green' };

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

// Section geometry now lives in SectionFrame: it owns the padding tokens, the copy cap, and
// the slack math that pulls the hung mark inward. The copy is flush to the frame's left
// padding in every section, so this headline and the Autonomous Solutions headline below it
// start at the same x. What is left here is only what this section contributes: how wide the
// mark is, and where its two dependants read that from.
const BIO_MARK_W = 'clamp(300px, 34vw, 590px)';
const BIO_COPY_CAP = 610;
// Published by the frame, in frame coordinates — the decor layer is inset:0 on the host.
const BIO_MARK_RIGHT = 'var(--sf-decor-right)';
// The corner CTA sits between the frame padding and the mark's right margin — pulled off the
// frame's corner at wide sizes, but not all the way in to the tree's edge.
const BIO_CTA_RIGHT = `max(var(--sf-pad-x), calc(${BIO_MARK_RIGHT} - 40px))`;

/* One tweak store for the whole home screen: useTweaks publishes its key set to the host, so a
   second store on the same screen would fight the first over the panel. */
const HOME_TWEAKS = /*EDITMODE-BEGIN*/{
  "mobileMenuStyle": "fullscreen",
  "bioFill": "stats",
  "bioCaption": false,
  "chamferFill": "transparent",
  "bioCtaPlace": "corner",
  "bioCtaStyle": "arrow",
  "evoCols": "2",
  "evoLede": "beside",
  "evoBody": "trimmed",
  "evoIcons": true,
  "cmpLayout": "ledger",
  "cmpEmphasis": "tint",
  "cmpTintColor": "#DAE8F2",
  "cmpTintOpacity": 0.02,
  "cmpMarker": "stick",
  "cmpSticky": false,
  "ctaFrame": "banner",
  "ctaPlate": true,
  "ctaSecond": false,
  "nmTraits": "side",
  "nmIconTone": "ice",
  "iconWeight": "thin",
  "nmTransition": "fade",
  "seamAnim": "ribbons",
  "seamSize": 480,
  "seamSpeed": 2,
  "seamX": 0,
  "seamY": 0,
  "seamOpacity": 0.2,
  "mFrame": "rise",
  "mSpeed": 1.2,
  "mDelay": 0,
  "mReplay": false,
}/*EDITMODE-END*/;

const BIO_TRAITS = [
  ['Adaptive', 'Topologies that rewire themselves as conditions change.'],
  ['Efficient', 'Inference budgets measured in watts, not racks.'],
  ['Resilient', 'Degrades gracefully instead of failing closed.'],
];

function QuietLink({ href, label, onClick, style }) {
  const [hot, setHot] = React.useState(false);
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 'clamp(15px, 1.2vw, 17px)', fontWeight: 400, lineHeight: 1, textDecoration: 'none', whiteSpace: 'nowrap', color: hot ? 'var(--vv-amber)' : 'var(--vv-graphite)', transition: 'color 160ms ease', ...style }}>
      {label}
      <span aria-hidden="true" style={{ fontSize: '1.05em', lineHeight: 1, transform: hot ? 'translateX(3px)' : 'none', transition: 'transform 160ms ease' }}>&rarr;</span>
    </a>
  );
}

/* The About link, in three treatments. Graphite keeps it subordinate to the amber stats;
   hover is the only place amber returns, so the corner stays quiet until it's aimed at. */
function BioCta({ variant, corner, placed, onNavigate }) {
  const [hot, setHot] = React.useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 'clamp(15px, 1.2vw, 17px)', fontWeight: 400,
    letterSpacing: '0.01em', lineHeight: 1, textDecoration: 'none', whiteSpace: 'nowrap',
    color: hot ? 'var(--vv-amber)' : 'var(--vv-graphite)', transition: 'color 160ms ease, border-color 160ms ease',
    /* `placed` = an ancestor owns the position (the corner reveal wrapper below): no absolute
       offsets of its own, and no inline margin either. */
    ...(corner
      ? { position: 'absolute', right: BIO_CTA_RIGHT, bottom: 'clamp(56px, 6.4vw, 94px)' }
      : placed ? null
      : { alignSelf: 'flex-start', marginTop: 'clamp(18px, 2vw, 28px)' }),
    ...(variant === 'rule' ? { paddingBottom: 6, borderBottom: `1px solid ${hot ? 'var(--vv-amber)' : 'var(--vv-ice-08)'}` } : null),
    ...(variant === 'boxed' ? { padding: '11px 18px', border: `1px solid ${hot ? 'var(--vv-amber)' : 'var(--vv-ice-08)'}` } : null),
  };
  return (
    <a href="#/about" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/about'); }}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)} style={base}>
      Read about us
      <span aria-hidden="true" style={{ fontSize: '1.05em', lineHeight: 1, transform: hot ? 'translateX(3px)' : 'none', transition: 'transform 160ms ease' }}>&rarr;</span>
    </a>
  );
}

const BIO_STATS = [
  ['6,000\u00d7', 'less energy'],
  ['40\u00d7', 'faster'],
  ['0', 'extra HW'],
];

function HomeScreen({ onNavigate }) {
  const { VideoBackdrop, GradientField, Eyebrow, Button, Bezel, SectionFrame } = DS();
  const [t, setTweak] = useTweaks(HOME_TWEAKS);
  /* Push the Motion tweaks into the shared store the Reveal components subscribe to. A layout
     effect so the new values are in place before the next paint; the store's defaults match
     HOME_TWEAKS, so the very first frame is already correct. */
  React.useLayoutEffect(() => {
    window.vvSetMotion({ frame: t.mFrame, speed: t.mSpeed, delay: t.mDelay, replay: t.mReplay });
  }, [t.mFrame, t.mSpeed, t.mDelay, t.mReplay]);
  // Icon weight is a whole-site setting living on the Icon module itself (every <Icon> across
  // every screen subscribes to it), not a prop threaded through each section — this just keeps
  // it in sync with the persisted tweak, including on first load.
  React.useEffect(() => { window.vvSetIconWeight && window.vvSetIconWeight(t.iconWeight); }, [t.iconWeight]);
  React.useEffect(() => { window.vvSetMobileMenuStyle && window.vvSetMobileMenuStyle(t.mobileMenuStyle); }, [t.mobileMenuStyle]);
  // The mark and the copy are one pair, so they share a grid track set rather than being
  // pushed to opposite edges — on an ultrawide the slack falls outside the pair, not between.
  // 1024, not 900: between 900 and 1100 the frame is too narrow to carry both a readable
  // measure and the mark — the decoration ends up wider than the copy it decorates.
  const stacked = useMaxWidth(1024);
  const mobile = useMaxWidth(640);
  const tablet = stacked && !mobile;
  // NavBar's own mobile-chrome breakpoint — the hero copy should sit off the bottom edge the
  // way the bar sits off the top. Gating on 640 would leave a 641-760 band where the bar is
  // mobile but the hero still carries its 150px desktop foot.
  const navMobile = useMaxWidth(760);
  const bioMaskImage = `radial-gradient(closest-side, ${navMobile
    ? 'rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.88) 50%, rgba(0, 0, 0, 0.42) 70%, rgba(0, 0, 0, 0.12) 94%, rgba(0, 0, 0, 0) 100%'
    : 'rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.88) 40%, rgba(0, 0, 0, 0.42) 64%, rgba(0, 0, 0, 0.12) 80%, rgba(0, 0, 0, 0) 100%'})`;
  // Below the stacked breakpoint the mark rides in the flow above the copy instead of being
  // hung past the frame's bottom edge — a crop that reads as intent on a wide frame just
  // reads as a broken image on a phone. Above it the mark holds one size: 36vw until it hits
  // its 540px cap around 1500px, so it never rescales across real desktop widths.
  const bioMark = <span style={stacked
    ? { display: 'block', width: (mobile || tablet) ? '100%' : 'clamp(150px, 42vw, 260px)', aspectRatio: '1', margin: '0 auto' }
    : { position: 'absolute', right: BIO_MARK_RIGHT, top: '50%', transform: 'translateY(-50%)', width: BIO_MARK_W, aspectRatio: '1' }}>
    {/* Own radial mask, not --plate-feather — that token is reserved for the video plates. */}
    <img src="../../assets/plates/biological-intelligence-leaf.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.44, filter: 'grayscale(1)', maskImage: bioMaskImage, WebkitMaskImage: bioMaskImage }} />
  </span>;
  /* Mobile only: the mark stops being a figure stacked above the copy and becomes the field the
     copy sits on — oversized past both edges of its container (the section clips horizontally,
     so nothing widens the page) with the copy laid over it. Anchored to the TOP of the box, not
     centred in it: the box's height is driven by the copy, so a centred mark would drift with
     every line of text and the copy's percentage offset would have no fixed image to measure
     against. Pinned to the top, the image occupies a known 0 … min(150vw, 620px) band and the
     copy's 80% padding lands where it says it does. Its own radial mask is what makes an
     overflowing photo read as light rather than a crop. */
  const bioMarkMobile = <span aria-hidden="true" style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: 'min(150vw, 620px)', aspectRatio: '1', pointerEvents: 'none', zIndex: 0 }}>
    <img src="../../assets/plates/biological-intelligence-leaf.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.44, filter: 'grayscale(1)', maskImage: bioMaskImage, WebkitMaskImage: bioMaskImage }} />
  </span>;
  return (
    <div style={{ isolation: 'isolate' }}>
      {/* Hero fills the viewport, so the copy block lands in the bottom-left corner of
         whatever screen it opens on. edgeFade off: a full-height plate has no section
         above or below to fade into. minHeight guards very short windows. */}
      <VideoBackdrop src="../../assets/plates/home-banner-video.mp4" scrim="bottom" minHeight="max(620px, 100svh)" align="end" edgeFade={false} foot="12%" pad={mobile ? '180px var(--gutter-site) clamp(104px, 26vw, 148px)' : navMobile ? '180px var(--gutter-site) 40px' : '180px var(--gutter-site) 150px'} plateOpacity={0.4}>
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto', width: '100%' }}>
        {/* No hard break: the measure is capped in `em` so it tracks the fluid font size, and
           `balance` evens the two lines — the wrap holds its shape at every width instead of
           snapping at one. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 1.1vw, 18px)' }}>
          <Reveal as="h1" variant="text" dur={880} delay={220} style={{ margin: 0, fontSize: 'clamp(30px, 3.2vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, color: 'var(--vv-ice)', maxWidth: '17.5em', textWrap: 'balance' }}>
            <span style={{ color: 'var(--vv-amber)' }}>Legitimate Autonomy</span> for Robotics, Unmanned Vehicles &amp; Edge Systems
          </Reveal>
          <Reveal as="p" variant="up" delay={620} style={{ margin: 0, fontSize: 'clamp(17px, 1.35vw, 20px)', lineHeight: 1.5, color: 'var(--vv-ice-82)', maxWidth: 620 }}>
            Using Evolutionary AI to power a new generation of intelligent, self-optimizing autonomous systems across all domains.
          </Reveal>
          <div style={{ display: 'flex', gap: 12, marginTop: 'clamp(14px, 1.4vw, 24px)' }}>
            <Reveal variant="rise" delay={840} dur={520}><Button variant="primary" size="lg" onClick={() => onNavigate('/autonomy')}>Explore autonomy</Button></Reveal>
            <Reveal variant="rise" delay={940} dur={520}><Button variant="secondary" size="lg" onClick={() => onNavigate('/contact')}>Contact us</Button></Reveal>
          </div>
        </div>
        </div>
      </VideoBackdrop>

      {/* ── Section 1 · Biological Intelligence, over the second plate ── */}
      {/* overflow-x clip (not hidden) stops the bled plate from widening the page while
         still letting it finish downward into the next section. */}
      <section style={{ padding: 'clamp(32px, 3.6vw, 52px) var(--gutter-site)', overflowX: 'clip', overflowY: 'visible' }}>
        <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
        {/* No frame here: the plate is feathered by its own radial mask, so the footage
           dissolves into the canvas at full size and needs no outline to contain it. It sits
           left and scaled past the column so it reads as a lit field beside the text rather
           than a picture behind it — both fluid, since a fixed 40% shift throws the whole
           subject off a phone screen. */}
        {mobile ? (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', padding: 'calc(min(150vw, 620px) * 0.8) 0 clamp(24px, 3vw, 48px)', boxSizing: 'border-box', background: 'var(--surface-canvas)' }}>
        {bioMarkMobile}
        <RevealGroup on={mobile}>
        <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionFrame copyMax={BIO_COPY_CAP} reserve={stacked ? undefined : BIO_MARK_W} gap={18}
          stacked={stacked} columnMinHeight="clamp(300px, 23vw, 380px)" decor={stacked ? null : bioMark}
          fill="transparent" chamfer={0} color="transparent" blur={0} accent={false} padX="0px" padY="0px"
          before={null}
          after={<>
            {/* The reveal wrapper carries the corner position rather than the link: absolutely
               positioned, it stays out of the frame's flex flow (a static wrapper would add a
               gap row) and its transform moves the link instead of re-anchoring it. Delay puts
               it after the copy ramp and the stats it sits under. */}
            {t.bioCtaPlace === 'corner' && !stacked ? <Reveal variant="side" delay={820} dur={480} style={{ position: 'absolute', right: BIO_CTA_RIGHT, bottom: 'clamp(56px, 6.4vw, 94px)' }}><BioCta variant={t.bioCtaStyle} placed onNavigate={onNavigate} /></Reveal> : null}
          </>}>
          <Eyebrow><HudText text="Vivum AI" speed={34} /></Eyebrow>
          <Reveal as="h2" variant="text" dur={760} delay={90} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)' }}>
            <span style={{ color: 'var(--vv-amber)' }}>Biological Intelligence</span> Inspired by Nature and Built for Tomorrow
          </Reveal>
          <Reveal as="p" variant="up" delay={300} style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)' }}>
            We create AI that mirrors the adaptability, efficiency, and resilience of Biological Systems. Our purpose is to propagate a computing paradigm that benefits all life on Earth.
          </Reveal>
          {t.bioFill === 'traits' ? (
            <div style={{ display: 'grid', gap: 'clamp(8px, 0.9vw, 12px)', marginTop: 'clamp(16px, 1.9vw, 28px)', paddingTop: 'clamp(16px, 1.8vw, 24px)', borderTop: '1px solid var(--vv-ice-08)' }}>
              {BIO_TRAITS.map(([k, v]) => (
                <Reveal key={k} variant="side" delay={120 * BIO_TRAITS.findIndex((r) => r[0] === k)} dur={480} style={{ display: 'flex', gap: 'clamp(12px, 1.2vw, 18px)', alignItems: 'baseline' }}>
                  <HudText text={k} speed={22} delay={120 * BIO_TRAITS.findIndex((r) => r[0] === k)} style={{ flex: '0 0 auto', minWidth: 84, fontSize: 12.5, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--vv-amber)' }} />
                  <span style={{ fontSize: 'clamp(14px, 1.05vw, 15px)', lineHeight: 1.5, color: 'var(--vv-ice-82)' }}>{v}</span>
                </Reveal>
              ))}
            </div>
          ) : null}
          {t.bioFill === 'stats' ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(22px, 2.8vw, 44px)', marginTop: 'clamp(16px, 1.9vw, 28px)', paddingTop: 'clamp(16px, 1.8vw, 24px)', borderTop: '1px solid var(--vv-ice-08)', alignItems: 'flex-end' }}>
              {BIO_STATS.map(([n, l]) => (
                <Reveal key={n} variant="up" delay={140 * BIO_STATS.findIndex((r) => r[0] === n)} dur={520} style={{ display: 'grid', gap: 4 }}>
                  <HudNumber value={n} delay={200 + 140 * BIO_STATS.findIndex((r) => r[0] === n)} style={{ fontSize: 'clamp(22px, 1.9vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--vv-ice)' }} />
                  <span style={{ fontSize: 12, letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1.4, color: 'var(--vv-ice-82)', maxWidth: 132 }}>{l}</span>
                </Reveal>
              ))}
            </div>
          ) : null}
          {t.bioCtaPlace === 'inline' || stacked ? (
            mobile
              ? <RevealSeq ms={950}><Reveal variant="side" dur={480}><BioCta variant={t.bioCtaStyle} corner={false} onNavigate={onNavigate} /></Reveal></RevealSeq>
              : <Reveal variant="side" delay={820} dur={480}><BioCta variant={t.bioCtaStyle} corner={false} onNavigate={onNavigate} /></Reveal>
          ) : null}
          {t.bioCaption ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 'clamp(14px, 1.6vw, 22px)' }}>
              <span style={{ width: 5, height: 5, borderRadius: 99, background: 'var(--vv-amber)', flex: '0 0 auto' }} />
              <HudText text="Fig. 01 — Evolved topology, generation 4,096" speed={16} delay={260} style={{ fontSize: 11.5, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--vv-ice-82)' }} />
            </div>
          ) : null}
        </SectionFrame>
        </div>
        </RevealGroup>
        </div>
        ) : (
        <VideoBackdrop src="../../assets/plates/biological-intelligence.mp4" scrim="none" circleMask
          minHeight="clamp(440px, 44vw, 620px)" align="center" edgeFade={false} pad="clamp(24px, 3vw, 48px) 0"
          plateOpacity={0.1} plateShift="clamp(24px, 12vw, 200px)" plateSide="center" plateScale={1.5} plateDrop="clamp(116px, 15vw, 260px)" bleed style={{ background: 'transparent' }}>
        <Reveal variant="frame" dur={660}>
        <SectionFrame copyMax={BIO_COPY_CAP} reserve={stacked ? undefined : BIO_MARK_W} gap={18}
          stacked={stacked} columnMinHeight="clamp(300px, 23vw, 380px)" decor={stacked ? null : bioMark}
          fill={t.chamferFill}
          padX={tablet ? 'clamp(48px, 6vw, 96px)' : undefined} padY={tablet ? 'clamp(48px, 6vw, 96px)' : undefined}
          before={stacked ? <div style={{ marginBottom: 'clamp(24px, 5vw, 40px)' }}>{bioMark}</div> : null}
          after={<>
            {/* The reveal wrapper carries the corner position rather than the link: absolutely
               positioned, it stays out of the frame's flex flow (a static wrapper would add a
               gap row) and its transform moves the link instead of re-anchoring it. Delay puts
               it after the copy ramp and the stats it sits under. */}
            {t.bioCtaPlace === 'corner' && !stacked ? <Reveal variant="side" delay={820} dur={480} style={{ position: 'absolute', right: BIO_CTA_RIGHT, bottom: 'clamp(56px, 6.4vw, 94px)' }}><BioCta variant={t.bioCtaStyle} placed onNavigate={onNavigate} /></Reveal> : null}
          </>}>
          <Eyebrow><HudText text="Vivum AI" speed={34} /></Eyebrow>
          <Reveal as="h2" variant="text" dur={760} delay={90} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)' }}>
            <span style={{ color: 'var(--vv-amber)' }}>Biological Intelligence</span> Inspired by Nature and Built for Tomorrow
          </Reveal>
          <Reveal as="p" variant="up" delay={300} style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)' }}>
            We create AI that mirrors the adaptability, efficiency, and resilience of Biological Systems. Our purpose is to propagate a computing paradigm that benefits all life on Earth.
          </Reveal>
          {t.bioFill === 'traits' ? (
            <div style={{ display: 'grid', gap: 'clamp(8px, 0.9vw, 12px)', marginTop: 'clamp(16px, 1.9vw, 28px)', paddingTop: 'clamp(16px, 1.8vw, 24px)', borderTop: '1px solid var(--vv-ice-08)' }}>
              {BIO_TRAITS.map(([k, v]) => (
                <Reveal key={k} variant="side" delay={120 * BIO_TRAITS.findIndex((r) => r[0] === k)} dur={480} style={{ display: 'flex', gap: 'clamp(12px, 1.2vw, 18px)', alignItems: 'baseline' }}>
                  <HudText text={k} speed={22} delay={120 * BIO_TRAITS.findIndex((r) => r[0] === k)} style={{ flex: '0 0 auto', minWidth: 84, fontSize: 12.5, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--vv-amber)' }} />
                  <span style={{ fontSize: 'clamp(14px, 1.05vw, 15px)', lineHeight: 1.5, color: 'var(--vv-ice-82)' }}>{v}</span>
                </Reveal>
              ))}
            </div>
          ) : null}
          {t.bioFill === 'stats' ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(22px, 2.8vw, 44px)', marginTop: 'clamp(16px, 1.9vw, 28px)', paddingTop: 'clamp(16px, 1.8vw, 24px)', borderTop: '1px solid var(--vv-ice-08)', alignItems: 'flex-end' }}>
              {BIO_STATS.map(([n, l]) => (
                <Reveal key={n} variant="up" delay={140 * BIO_STATS.findIndex((r) => r[0] === n)} dur={520} style={{ display: 'grid', gap: 4 }}>
                  <HudNumber value={n} delay={200 + 140 * BIO_STATS.findIndex((r) => r[0] === n)} style={{ fontSize: 'clamp(22px, 1.9vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--vv-ice)' }} />
                  <span style={{ fontSize: 12, letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1.4, color: 'var(--vv-ice-82)', maxWidth: 132 }}>{l}</span>
                </Reveal>
              ))}
            </div>
          ) : null}
          {t.bioCtaPlace === 'inline' || stacked ? (
            mobile
              ? <RevealSeq ms={950}><Reveal variant="side" dur={480}><BioCta variant={t.bioCtaStyle} corner={false} onNavigate={onNavigate} /></Reveal></RevealSeq>
              : <Reveal variant="side" delay={820} dur={480}><BioCta variant={t.bioCtaStyle} corner={false} onNavigate={onNavigate} /></Reveal>
          ) : null}
          {t.bioCaption ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 'clamp(14px, 1.6vw, 22px)' }}>
              <span style={{ width: 5, height: 5, borderRadius: 99, background: 'var(--vv-amber)', flex: '0 0 auto' }} />
              <HudText text="Fig. 01 — Evolved topology, generation 4,096" speed={16} delay={260} style={{ fontSize: 11.5, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--vv-ice-82)' }} />
            </div>
          ) : null}
        </SectionFrame>
        </Reveal>
        </VideoBackdrop>
        )}
        </div>
      </section>

      <CapabilitiesSection onNavigate={onNavigate} chamferFill={t.chamferFill} extraTweaks={<>
        <TweakSection label="Motion" />
        <TweakSelect label="Chamfered frames" value={t.mFrame}
          options={window.VV_FRAME_OPTIONS}
          onChange={(v) => setTweak('mFrame', v)} />
        <TweakSlider label="Speed" value={t.mSpeed} min={0.25} max={2.5} step={0.05} unit="×" onChange={(v) => setTweak('mSpeed', v)} />
        <TweakSlider label="Delay" value={t.mDelay} min={0} max={800} step={20} unit="ms" onChange={(v) => setTweak('mDelay', v)} />
        <TweakToggle label="Replay on re-entry" value={t.mReplay} onChange={(v) => setTweak('mReplay', v)} />
        <TweakSection label="Seam background" />
        <TweakSelect label="Animation" value={t.seamAnim}
          options={[{ value: 'texture', label: 'Texture — film grain' }, { value: 'nebula', label: 'Nebula — turbulence cloud' }, { value: 'ash', label: 'Ash — falling grit' }, { value: 'sheen', label: 'Sheen — satin sweep' }, { value: 'weave', label: 'Weave — combed fibre' }, { value: 'smoke', label: 'Smoke — climbing plumes' }, { value: 'marble', label: 'Marble — breathing veins' }, { value: 'static', label: 'Static — signal loss' }, { value: 'ribbons', label: 'Ribbons — sliding bands' }, { value: 'starfield', label: 'Starfield — twinkling depths' }, { value: 'drift', label: 'Drift — crossing blooms' }, { value: 'scan', label: 'Scan — sweeping hairlines' }, { value: 'pulse', label: 'Pulse — propagating rings' }, { value: 'lattice', label: 'Lattice — drifting mesh' }, { value: 'orbit', label: 'Orbit — tracking dots' }, { value: 'contours', label: 'Contours — breathing terrain' }, { value: 'motes', label: 'Motes — rising particles' }, { value: 'waves', label: 'Waves — swaying crests' }, { value: 'shafts', label: 'Shafts — angled light' }, { value: 'off', label: 'Off' }]}
          onChange={(v) => setTweak('seamAnim', v)} />
        {t.seamAnim !== 'off' && <>
          <TweakSlider label="Size" value={t.seamSize} min={120} max={640} step={10} unit="px" onChange={(v) => setTweak('seamSize', v)} />
          <TweakSlider label="Speed" value={t.seamSpeed} min={0.25} max={3} step={0.05} unit="×" onChange={(v) => setTweak('seamSpeed', v)} />
          <TweakSlider label="X position" value={t.seamX} min={-50} max={50} step={1} unit="%" onChange={(v) => setTweak('seamX', v)} />
          <TweakSlider label="Y position" value={t.seamY} min={-100} max={100} step={2} unit="%" onChange={(v) => setTweak('seamY', v)} />
          <TweakSlider label="Opacity" value={t.seamOpacity} min={0.02} max={1} step={0.01} onChange={(v) => setTweak('seamOpacity', v)} />
        </>}
      </>} />

      {/* Full-bleed animated background on the Autonomous Solutions → Core technology seam.
         Zero-height host inside SeamAnimation — it never displaces either section. */}
      <SeamAnimation variant={t.seamAnim} size={t.seamSize} speed={t.seamSpeed} x={t.seamX} y={t.seamY} opacity={t.seamOpacity} />

      {/* ── Sections 3, 4, 5 ── */}
      <NeuralSection traits={t.nmTraits} tone={t.nmIconTone === 'amber' ? 'var(--vv-amber)' : 'var(--vv-ice)'} transition={t.nmTransition} chamferFill={t.chamferFill} />
      <EvolutionarySection onNavigate={onNavigate} chamferFill={t.chamferFill} />
      <EvoComparisonDivider />
      <ComparisonSection layout={t.cmpLayout} emphasis={t.cmpEmphasis} tintColor={CMP_TINT_HEX_TO_KEY[t.cmpTintColor] || 'blue'} tintOpacity={t.cmpTintOpacity} marker={t.cmpMarker} sticky={t.cmpSticky === true} chamferFill={t.chamferFill} />

      {/* ── Closing band ── */}
      {/* A chamfered frame turns the closing row into a banner: the cut corner and hairline are
         the same devices the sections above use, so the page ends inside its own vocabulary
         rather than on a bare full-width row. The amber tick at the top-left is the Bezel's
         own accent, and "Legitimate Autonomy" comes back in amber to bookend the hero. */}
      {/* field="none": was "signal" — the bloom is off, the field kept for future use. */}
      <GradientField field="none" pad={mobile ? 'clamp(64px, 15vw, 96px) var(--gutter-site) clamp(96px, 22vw, 140px)' : 'clamp(40px, 4.2vw, 72px) var(--gutter-site) clamp(48px, 5vw, 88px)'} as="section">
        <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
          {t.ctaFrame === 'bare' ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 64, flexWrap: 'wrap' }}>
              <Reveal as="h2" variant="text" dur={800} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', maxWidth: 780, textWrap: tablet ? 'wrap' : 'balance' }}>
                <span style={{ color: 'var(--vv-amber)' }}>Legitimate Autonomy</span> On The Hardware You Already Field
              </Reveal>
              <Reveal variant="rise" delay={280} dur={520}><Button variant="primary" size="lg" onClick={() => onNavigate('/contact')}>Contact us</Button></Reveal>
            </div>
          ) : (
            /* Same frame as the two copy sections — it shares their 44px chamfer, so it has to
               share their padding and left edge too. `contentStyle` lifts the copy cap because
               this frame's content is a full-width grid (copy left, button right); the inner
               copy column keeps its own measure. */
            <Reveal variant="frame" dur={760}>
            <SectionFrame accent chamfer={44} weight={1} color="var(--vv-ice-14)" stacked={stacked}
              contentStyle={{ maxWidth: '100%' }}
              padX="clamp(64px, 7vw, 120px)"
              plateSrc={t.ctaPlate ? '../../assets/plates/home-banner-video.mp4' : undefined}
              plateOpacity={0.2} plateShift="clamp(30px, 20vw, 300px)" plateScale={1.7}
              fill="rgba(218,232,242,0.02)">
              <div style={{ display: 'flex', flexDirection: stacked ? 'column' : 'row', justifyContent: 'center', columnGap: 'clamp(40px, 6vw, 96px)', rowGap: 'clamp(28px, 3.4vw, 40px)', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, maxWidth: tablet ? '100%' : 680, flex: '0 1 auto' }}>
                  <Reveal as="h2" variant="text" dur={800} delay={280} style={{ margin: 0, fontSize: mobile ? 'clamp(26px, 2.5vw, 36px)' : 'clamp(30px, 3.2vw, 46px)', fontWeight: 700, letterSpacing: mobile ? '-0.02em' : '-0.03em', lineHeight: mobile ? 1.15 : 1.08, color: 'var(--vv-ice)', maxWidth: tablet ? '100%' : 680, textWrap: tablet ? 'wrap' : 'balance' }}>
                    <span style={{ color: 'var(--vv-amber)' }}>Legitimate Autonomy</span> On Hardware You Already Field
                  </Reveal>
                  <Reveal as="p" variant="up" delay={460} style={{ margin: 0, fontSize: 'clamp(17px, 1.35vw, 20px)', lineHeight: 1.5, color: 'var(--vv-ice-82)', maxWidth: tablet ? '100%' : 560, textWrap: tablet ? 'wrap' : 'balance' }}>
                    Tell us your platform and your hardest constraint. We&rsquo;ll show you what an evolved model does with it.
                  </Reveal>
                  {/* Past the button's own 740 — the text link is the last thing to arrive in
                     the band, stacked or side by side. */}
                  {t.ctaSecond !== false ? <Reveal variant="side" delay={900} dur={480}><QuietLink href="#evolutionary" label="Read the technical overview" /></Reveal> : null}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flex: (mobile || tablet) ? '1 1 100%' : '0 0 auto', width: (mobile || tablet) ? '100%' : undefined, maxWidth: mobile && !tablet ? 680 : undefined }}>
                  <Reveal variant="rise" delay={740} dur={520} style={{ width: (mobile || tablet) ? '100%' : undefined }}><Button variant="primary" size="lg" onClick={() => onNavigate('/contact')} style={{ height: 58, padding: '0 38px', fontSize: 17, ...((mobile || tablet) ? { width: '100%' } : null) }}>Contact us</Button></Reveal>
                </div>
              </div>
            </SectionFrame>
            </Reveal>
          )}
        </div>
      </GradientField>
    </div>
  );
}

Object.assign(window, { HomeScreen, QuietLink });
