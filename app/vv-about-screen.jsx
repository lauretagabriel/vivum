/* Website › About. Same vocabulary as the homepage and Autonomy — navy canvas, chamfered
   frames, one amber phrase per view, HUD reveals — but arranged as a manifesto rather than a
   front door:

   · the hero is CENTRED on a vignette scrim, the one hero shape no other page uses, because
     About opens on a statement rather than on a route to somewhere else;
   · the thesis is two columns of prose under a single mono label — no second headline
     competing with the hero's;
   · the principles carry display-scale ghost numerals (Autonomy numbers at label scale);
   · Where we're going closes on the page's one graphic: a hairline axis, ice at Now and amber
     at Next, drawn from the sentence above it.

   Every claim, principle and name comes from the supplied About copy. No figures appear on
   this page — none were supplied, and the brand ships no placeholder numbers on a real page. */

const DS_A2 = () => window.VivumAIDesignSystem_b2be15;

const AB_TWEAKS = /*EDITMODE-BEGIN*/{
  "mobileMenuStyle": "fullscreen",
  "heroAlign": "base",
  "heroSub": "mission",
  "heroRail": true,
  "heroHold": 0.15,
  "thesis": "statement",
  "principles": "spine",
  "leadership": "masthead",
  "horizon": "plain",
  "cta": "plate",
  "ctaCase": "sentence",
  "seamAnim": "ribbons",
  "seamSize": 480,
  "seamSpeed": 2,
  "seamX": 0,
  "seamY": 0,
  "seamOpacity": 0.2,
  "mFrame": "rise",
  "mSpeed": 1.2,
  "mDelay": 0,
  "mReplay": false
}/*EDITMODE-END*/;

const AB_PLATE = '../../assets/plates/biological-intelligence.mp4';

/* Three subtitles, all built the way Autonomy's and Contact's are: a short declarative that
   says what the page contains, no adjectives doing the selling. */
const AB_SUBS = {
  plain: 'Who we are, what we hold to, and where edge autonomy goes next.',
  mission: 'Adaptive, explainable models built for the field \u2014 and the people building them.',
  field: "Autonomy for the places the cloud can't reach and conditions never stop changing.",
};

const AB_CHAPTERS = [
  ['Vivum AI', 'company'],
  ['Principles', 'principles'],
  ['Leadership', 'leadership'],
  ['Where we are going', 'horizon'],
];

function useAbMax(q) {
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

/* Walks the page on an interval eased off the wall clock rather than asking for
   `behavior: 'smooth'` — native smooth scrolling is silently a no-op in embedded contexts
   (previews, webviews), and the failure mode there is the worst one available: a jump-link
   that appears not to respond at all. Instant when the user asked for less motion, and it
   yields the moment they scroll for themselves. */
function abScrollTo(y, dur = 620) {
  const from = window.pageYOffset || document.documentElement.scrollTop || 0;
  const to = Math.max(0, y);
  if (Math.abs(to - from) < 2) return;
  if (vvReduced()) { window.scrollTo(0, to); return; }
  const t0 = Date.now();
  let id = 0;
  const stop = () => {
    clearInterval(id);
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    window.removeEventListener('keydown', stop);
  };
  window.addEventListener('wheel', stop, { passive: true, once: true });
  window.addEventListener('touchstart', stop, { passive: true, once: true });
  window.addEventListener('keydown', stop, { once: true });
  id = setInterval(() => {
    const p = Math.min(1, (Date.now() - t0) / dur);
    window.scrollTo(0, Math.round(from + (to - from) * (1 - Math.pow(1 - p, 4))));
    if (p >= 1) { window.scrollTo(0, to); stop(); }
  }, 16);
}

/* The hero's chapter index. A long page states its own shape in the first screen, and mono
   numerals plus the brand's middle dot need no pill or frosted plate to stay legible over
   video — the scrim carries that. */
function AbChapterRail({ mobile, center }) {
  const [hot, setHot] = React.useState(null);
  const jump = (e, id) => {
    e.preventDefault();
    const host = document.getElementById(id);
    if (!host) return;
    if (window.history && window.history.replaceState) window.history.replaceState(null, '', `#${id}`);
    abScrollTo(host.getBoundingClientRect().top + (window.pageYOffset || 0) - 88);
  };
  return (
    <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', alignItems: mobile ? (center ? 'center' : 'flex-start') : 'baseline', justifyContent: center ? 'center' : 'flex-start', gap: mobile ? 12 : 'clamp(12px, 1.4vw, 20px)', paddingTop: 'clamp(20px, 2.2vw, 30px)', marginTop: 'clamp(6px, 1vw, 12px)', borderTop: '1px solid var(--vv-ice-14)', width: '100%' }}>
      <span style={{ ...window.AB_LBL, flex: 'none' }}>On this page</span>
      <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: center ? 'center' : 'flex-start', gap: 'clamp(8px, 1vw, 14px)', flexWrap: 'wrap' }}>
        {AB_CHAPTERS.map(([label, id], i) => (
          <React.Fragment key={id}>
            {i ? <span aria-hidden="true" style={{ color: 'var(--vv-ice-56)', fontSize: 13 }}>&middot;</span> : null}
            <a href={`#${id}`} onClick={(e) => jump(e, id)}
              onMouseEnter={() => setHot(id)} onMouseLeave={() => setHot(null)}
              style={{ display: 'inline-flex', alignItems: 'baseline', gap: 7, fontFamily: 'var(--font-mono)', fontSize: mobile ? 12.5 : 13.5, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', color: hot === id ? 'var(--vv-amber)' : 'var(--vv-ice-82)', transition: 'color 160ms ease' }}>
              {label}
            </a>
          </React.Fragment>
        ))}
      </span>
    </div>
  );
}

function AboutScreen({ onNavigate }) {
  const { VideoBackdrop, GradientField, Eyebrow, Button, SectionFrame } = DS_A2();
  const [t, setTweak] = useTweaks(AB_TWEAKS);
  React.useEffect(() => { window.vvSetMobileMenuStyle && window.vvSetMobileMenuStyle(t.mobileMenuStyle); }, [t.mobileMenuStyle]);
  React.useLayoutEffect(() => {
    window.vvSetMotion({ frame: t.mFrame, speed: t.mSpeed, delay: t.mDelay, replay: t.mReplay });
  }, [t.mFrame, t.mSpeed, t.mDelay, t.mReplay]);
  const stacked = useAbMax(940);
  const mobile = useAbMax(640);
  const tablet = useAbMax(1024) && !mobile;
  const navMobile = useAbMax(760);
  const center = t.heroAlign === 'center' && !mobile;
  const split = t.heroAlign === 'split' && !stacked;

  const heroCopy = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: center ? 'center' : 'flex-start', textAlign: center ? 'center' : 'left', gap: 'clamp(14px, 1.1vw, 18px)', maxWidth: center ? 980 : undefined, margin: center ? '0 auto' : undefined, width: '100%' }}>
      <Reveal delay={140}><Eyebrow><HudText text="About" speed={34} /></Eyebrow></Reveal>
      <Reveal as="h1" variant="text" dur={880} delay={260} style={{ margin: 0, fontSize: 'clamp(30px, 3.2vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, color: 'var(--vv-ice)', maxWidth: '22em', textTransform: 'capitalize', textWrap: 'balance' }}>
        We pioneer <span style={{ color: 'var(--vv-amber)' }}>Evolutionary AI</span>, inspired by the resilience of biological intelligence.
      </Reveal>
      <Reveal as="p" variant="up" delay={620} style={{ margin: 0, fontSize: 'clamp(17px, 1.35vw, 20px)', lineHeight: 1.5, color: 'var(--vv-ice-82)', maxWidth: center ? 640 : '100%', textWrap: 'pretty' }}>
        {AB_SUBS[t.heroSub] || AB_SUBS.plain}
      </Reveal>
      {t.heroRail !== false && !split ? (
        <Reveal variant="up" delay={880} dur={520} style={{ width: '100%', marginTop: 'clamp(10px, 1vw, 18px)' }}>
          <AbChapterRail mobile={mobile} center={center} />
        </Reveal>
      ) : null}
    </div>
  );

  /* `split` puts the statement left and the subtitle plus the index right, on one baseline —
     the shape for a wide screen where a centred block leaves the two halves unbalanced. */
  const heroSplit = (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)', columnGap: 'clamp(40px, 5vw, 96px)', alignItems: 'end' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 1.1vw, 18px)' }}>
        <Reveal delay={140}><Eyebrow><HudText text="About" speed={34} /></Eyebrow></Reveal>
        <Reveal as="h1" variant="text" dur={880} delay={260} style={{ margin: 0, fontSize: 'clamp(30px, 3.2vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, color: 'var(--vv-ice)', textTransform: 'capitalize', textWrap: 'balance' }}>
          We pioneer <span style={{ color: 'var(--vv-amber)' }}>Evolutionary AI</span>, inspired by the resilience of biological intelligence.
        </Reveal>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 1.6vw, 22px)' }}>
        <Reveal as="p" variant="up" delay={620} style={{ margin: 0, fontSize: 'clamp(17px, 1.35vw, 20px)', lineHeight: 1.5, color: 'var(--vv-ice-82)', textWrap: 'pretty' }}>
          {AB_SUBS[t.heroSub] || AB_SUBS.plain}
        </Reveal>
        {t.heroRail !== false ? <Reveal variant="up" delay={880} dur={520}><AbChapterRail mobile={mobile} /></Reveal> : null}
      </div>
    </div>
  );

  /* ── Thesis ──────────────────────────────────────────────────────────────────────────────
     Two columns of prose, no headline: the hero already made the statement, and a second H2
     four lines under it would argue with it. The lede holds ice-92 at lead scale and the
     detail steps down to secondary, so the eye reads thesis → detail rather than left → right. */
  const lede = (
    <Reveal as="p" variant="up" delay={200} style={{ margin: 0, fontSize: 'clamp(1.4rem, 2vw, 2.8rem)', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.015em', color: 'var(--vv-ice-92)', textWrap: 'pretty' }}>
      Vivum pioneers <span style={{ color: 'var(--vv-amber)' }}>Evolutionary AI</span>, harnessing biological intelligence to give autonomous
      vehicles, advanced robotics, and edge devices the ability to{' '}
      <span style={{ color: 'var(--vv-amber)' }}>sense</span>, <span style={{ color: 'var(--vv-amber)' }}>decide</span>, and <span style={{ color: 'var(--vv-amber)' }}>act</span> in the real world
      &mdash; where the cloud cannot reach and conditions never stop changing.
    </Reveal>
  );
  const detail = (
    <Reveal as="p" variant="up" delay={380} style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.62, color: 'var(--text-secondary)', textWrap: 'pretty' }}>
      Our adaptive, explainable Dynamic Neural Models deliver legitimate autonomy while
      drastically cutting energy use and compute demands. They run natively on edge devices,
      degrade gracefully in contested and comms-degraded environments, and stay decoupled from
      any single hardware platform &mdash; autonomy you can trust, because you can understand it.
    </Reveal>
  );
  const thesisBody = t.thesis === 'lede' ? (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 2.2vw, 30px)', maxWidth: 820 }}>{lede}{detail}</div>
  ) : t.thesis === 'columns' ? (
    <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1fr)', columnGap: 'clamp(36px, 4.6vw, 80px)', rowGap: 'clamp(22px, 5vw, 32px)', alignItems: 'start' }}>
      {lede}
      <div style={stacked ? null : { paddingLeft: 'clamp(24px, 3vw, 48px)', borderLeft: '1px solid var(--line-hairline)' }}>{detail}</div>
    </div>
  ) : t.thesis === 'ledger' ? (
    /* ledger — a mono index column holds the section's name and its two beats, the prose runs
       in one measure beside it. The label stops being a hat on the copy and becomes a spine. */
    <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'minmax(0, 0.26fr) minmax(0, 1fr)', columnGap: 'clamp(32px, 4vw, 72px)', rowGap: 'clamp(22px, 5vw, 30px)', alignItems: 'start' }}>
      <Reveal delay={120} style={{ display: 'flex', flexDirection: stacked ? 'row' : 'column', alignItems: stacked ? 'center' : 'flex-start', gap: stacked ? 12 : 10 }}>
        <span style={{ ...window.AB_LBL, color: 'var(--vv-amber)' }}>Thesis</span>
        <span aria-hidden="true" style={{ flex: stacked ? 1 : 'none', width: stacked ? undefined : 44, height: 1, background: 'var(--vv-ice-24)' }} />
        <span style={window.AB_LBL}>01 &mdash; 02</span>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 2.2vw, 30px)', maxWidth: 860 }}>
        {lede}
        <div style={{ paddingTop: 'clamp(18px, 2vw, 28px)', borderTop: '1px solid var(--line-hairline)' }}>{detail}</div>
      </div>
    </div>
  ) : (
    /* statement — the recommended one. The claim runs the full measure at lead scale, then a
       hairline drops and the qualifying detail steps in from the right at body scale, so the
       block reads as one sentence and its footnote rather than as two equal columns. */
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px, 2.4vw, 34px)' }}>
      {lede}
      <div style={{ paddingTop: 'clamp(20px, 2.2vw, 30px)', borderTop: '1px solid var(--line-hairline)' }}>
        {detail}
      </div>
    </div>
  );
  const thesis = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 2.4vw, 34px)' }}>
      <Reveal delay={80}><Eyebrow>VIVUM AI</Eyebrow></Reveal>
      {thesisBody}
    </div>
  );

  const ctaHead = t.ctaCase === 'caps'
    ? <span style={{ display: 'block', fontSize: mobile ? 'clamp(19px, 5vw, 24px)' : 'clamp(22px, 2.2vw, 32px)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.25, color: 'var(--vv-ice)' }}>
        We are paving the way for a <span style={{ color: 'var(--vv-amber)' }}>better tomorrow</span>
      </span>
    : <>We are paving the way for a <span style={{ color: 'var(--vv-amber)' }}>better tomorrow</span></>;

  return (
    <div id="about" style={{ isolation: 'isolate' }}>
      {/* ── Hero ─────────────────────────────────────────────────────────────────────────
         `biological-intelligence.mp4` is the plate the hero title names. It appears on the
         homepage as a 10% feathered circle wash inside a frame; here it is the full-bleed
         field at the tweakable hold below, which is a different treatment of the same
         footage rather than a repeat of it. */}
      <VideoBackdrop src={AB_PLATE} scrim={center ? 'vignette' : 'bottom'} seamless
        minHeight={mobile ? 'max(560px, 78svh)' : 'max(560px, 74svh)'}
        align={center ? 'center' : 'end'} edgeFade={false} foot={center ? false : '14%'}
        pad={mobile ? '170px var(--gutter-site) clamp(76px, 18vw, 108px)' : navMobile ? '176px var(--gutter-site) 48px' : center ? '180px var(--gutter-site) clamp(96px, 10vw, 148px)' : '180px var(--gutter-site) clamp(72px, 7vw, 112px)'}
        plateOpacity={typeof t.heroHold === 'number' ? t.heroHold : 0.4}>
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto', width: '100%' }}>
          {split ? heroSplit : heroCopy}
        </div>
      </VideoBackdrop>

      {/* ── Thesis ───────────────────────────────────────────────────────────────────────── */}
      <GradientField field="none" as="section" id="company"
        pad={mobile ? 'clamp(56px, 13vw, 88px) var(--gutter-site)' : 'clamp(52px, 5.4vw, 92px) var(--gutter-site) clamp(40px, 4.2vw, 72px)'}>
        <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
          <Reveal variant={mobile ? 'up' : 'frame'} dur={680}>
            <SectionFrame stacked stretch copyMax="100%" contentStyle={{ maxWidth: '100%' }} gap={0}
              chamfer={mobile ? 28 : 44} chamferWide={72} weight={1} color="var(--vv-ice-14)" accent={false}
              fill="transparent"
              {...(mobile ? { chamfer: 0, color: 'transparent', blur: 0, padX: '0px', padY: '0px' } : tablet ? { padX: 'clamp(40px, 6vw, 80px)' } : null)}>
              {thesis}
            </SectionFrame>
          </Reveal>
        </div>
      </GradientField>

      <AbPrinciples variant={t.principles} />
      {/* Full-bleed animated background on the Principles → Leadership seam, the same device and
         defaults as the homepage's Autonomous Solutions → Core technology seam. */}
      <SeamAnimation variant={t.seamAnim} size={t.seamSize} speed={t.seamSpeed} x={t.seamX} y={t.seamY} opacity={t.seamOpacity} />
      <AbLeadership variant={t.leadership} />
      <AbHorizon variant={t.horizon} />

      {/* ── Closing band ─────────────────────────────────────────────────────────────────
         One prompt, one button: About has a single next step, so unlike Autonomy's split
         band this closes on a banner. The amber phrase bookends the hero's. */}
      <GradientField field="none" as="section" id="join"
        pad={mobile ? 'clamp(64px, 15vw, 96px) var(--gutter-site) clamp(96px, 22vw, 140px)' : 'clamp(40px, 4.2vw, 72px) var(--gutter-site) clamp(48px, 5vw, 88px)'}>
        <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
          {t.cta === 'bare' ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(28px, 4vw, 64px)', flexWrap: 'wrap' }}>
              <Reveal as="h2" variant="text" dur={800} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', maxWidth: 780, textWrap: 'balance' }}>{ctaHead}</Reveal>
              <Reveal variant="rise" delay={280} dur={520} style={mobile ? { width: '100%' } : undefined}>
                <Button variant="primary" size="lg" onClick={() => onNavigate('/contact')} style={mobile ? { width: '100%' } : undefined}>Contact us</Button>
              </Reveal>
            </div>
          ) : (
            <Reveal variant="frame" dur={760}>
              <SectionFrame accent chamfer={44} chamferWide={104} weight={1} color="var(--vv-ice-14)" stacked={stacked}
                contentStyle={{ maxWidth: '100%' }} padX="clamp(64px, 7vw, 120px)"
                plateSrc={t.cta === 'plate' ? '../../assets/plates/home-banner-video.mp4' : undefined}
                plateOpacity={0.2} plateShift="clamp(30px, 20vw, 300px)" plateScale={1.7}
                fill="transparent">
                <div style={{ display: 'flex', flexDirection: stacked ? 'column' : 'row', justifyContent: 'center', columnGap: 'clamp(40px, 6vw, 96px)', rowGap: 'clamp(28px, 3.4vw, 40px)', alignItems: stacked ? 'flex-start' : 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, maxWidth: tablet ? '100%' : 680, flex: '0 1 auto' }}>
                    <Reveal as="h2" variant="text" dur={800} delay={280} style={{ margin: 0, fontSize: mobile ? 'clamp(26px, 2.5vw, 36px)' : 'clamp(30px, 3.2vw, 46px)', fontWeight: 700, letterSpacing: mobile ? '-0.02em' : '-0.03em', lineHeight: mobile ? 1.15 : 1.08, color: 'var(--vv-ice)', textTransform: 'capitalize', textWrap: tablet ? 'wrap' : 'balance' }}>{ctaHead}</Reveal>
                    <Reveal as="p" variant="up" delay={460} style={{ margin: 0, fontSize: 'clamp(17px, 1.35vw, 20px)', lineHeight: 1.5, color: 'var(--vv-ice-82)', maxWidth: tablet ? '100%' : 600, textWrap: 'pretty' }}>
                      Tell us the platform you field and the constraint that hurts most &mdash;
                      we&rsquo;ll show you what Evolutionary AI does with it.
                    </Reveal>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', flex: (mobile || tablet) ? '1 1 100%' : '0 0 auto', width: (mobile || tablet) ? '100%' : undefined }}>
                    <Reveal variant="rise" delay={740} dur={520} style={{ width: (mobile || tablet) ? '100%' : undefined }}>
                      <Button variant="primary" size="lg" onClick={() => onNavigate('/contact')} style={{ height: 58, padding: '0 38px', fontSize: 17, ...((mobile || tablet) ? { width: '100%' } : null) }}>Contact us</Button>
                    </Reveal>
                  </div>
                </div>
              </SectionFrame>
            </Reveal>
          )}
        </div>
      </GradientField>

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakRadio label="Layout" value={t.heroAlign} options={['center', 'base', 'split']} onChange={(v) => setTweak('heroAlign', v)} />
        <TweakRadio label="Subtitle" value={t.heroSub} options={['plain', 'mission', 'field']} onChange={(v) => setTweak('heroSub', v)} />
        <TweakToggle label="Chapter index" value={t.heroRail !== false} onChange={(v) => setTweak('heroRail', v)} />
        <TweakSlider label="Plate hold" value={typeof t.heroHold === 'number' ? t.heroHold : 0.4} min={0.15} max={0.7} step={0.05} onChange={(v) => setTweak('heroHold', v)} />
        <TweakSection label="Sections" />
        <TweakRadio label="Thesis" value={t.thesis} options={['statement', 'ledger', 'columns', 'lede']} onChange={(v) => setTweak('thesis', v)} />
        <TweakRadio label="Principles" value={t.principles} options={['spine', 'cells', 'ledger']} onChange={(v) => setTweak('principles', v)} />
        <TweakRadio label="Leadership" value={t.leadership} options={['masthead', 'frame', 'stacked', 'plain']} onChange={(v) => setTweak('leadership', v)} />
        <TweakRadio label="Horizon" value={t.horizon} options={['plain', 'quote']} onChange={(v) => setTweak('horizon', v)} />
        <TweakSection label="Closing band" />
        <TweakRadio label="Frame" value={t.cta} options={['banner', 'plate', 'bare']} onChange={(v) => setTweak('cta', v)} />
        <TweakRadio label="Headline case" value={t.ctaCase} options={['sentence', 'caps']} onChange={(v) => setTweak('ctaCase', v)} />
        <TweakSection label="Motion" />
        <TweakSelect label="Chamfered frames" value={t.mFrame} options={window.VV_FRAME_OPTIONS} onChange={(v) => setTweak('mFrame', v)} />
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
      </TweaksPanel>
    </div>
  );
}

Object.assign(window, { AboutScreen });
