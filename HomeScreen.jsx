const DS = () => window.VivumDS || window.VivumAIDesignSystem_b2be15;

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
const BIO_MARK_W = 'clamp(300px, 34vw, 540px)';
const BIO_COPY_CAP = 610;
// Published by the frame, in frame coordinates — the decor layer is inset:0 on the host.
const BIO_MARK_RIGHT = 'var(--sf-decor-right)';
// The corner CTA sits between the frame padding and the mark's right margin — pulled off the
// frame's corner at wide sizes, but not all the way in to the tree's edge.
const BIO_CTA_RIGHT = `max(var(--sf-pad-x), calc(${BIO_MARK_RIGHT} - 40px))`;

/* One tweak store for the whole home screen: useTweaks publishes its key set to the host, so a
   second store on the same screen would fight the first over the panel. */
const HOME_TWEAKS = /*EDITMODE-BEGIN*/{
  "bioFill": "stats",
  "bioCaption": false,
  "bioCtaPlace": "corner",
  "bioCtaStyle": "arrow",
  "evoCols": "2",
  "evoLede": "beside",
  "evoBody": "trimmed",
  "evoIcons": false,
  "cmpLayout": "ledger",
  "cmpEmphasis": "tint",
  "cmpSticky": false,
  "ctaFrame": "banner",
  "ctaPlate": true,
  "ctaSecond": false,
  "nmTraits": "cards",
  "nmIconTone": "ice"
}/*EDITMODE-END*/;

const BIO_TRAITS = [
  ['Adaptive', 'Topologies that rewire themselves as conditions change.'],
  ['Efficient', 'Inference budgets measured in watts, not racks.'],
  ['Resilient', 'Degrades gracefully instead of failing closed.'],
];

function QuietLink({ href, label, onClick }) {
  const [hot, setHot] = React.useState(false);
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 'clamp(15px, 1.2vw, 17px)', fontWeight: 400, lineHeight: 1, textDecoration: 'none', whiteSpace: 'nowrap', color: hot ? 'var(--vv-amber)' : 'var(--vv-graphite)', transition: 'color 160ms ease' }}>
      {label}
      <span aria-hidden="true" style={{ fontSize: '1.05em', lineHeight: 1, transform: hot ? 'translateX(3px)' : 'none', transition: 'transform 160ms ease' }}>&rarr;</span>
    </a>
  );
}

/* The About link, in three treatments. Graphite keeps it subordinate to the amber stats;
   hover is the only place amber returns, so the corner stays quiet until it's aimed at. */
function BioCta({ variant, corner, onNavigate }) {
  const [hot, setHot] = React.useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 'clamp(15px, 1.2vw, 17px)', fontWeight: 400,
    letterSpacing: '0.01em', lineHeight: 1, textDecoration: 'none', whiteSpace: 'nowrap',
    color: hot ? 'var(--vv-amber)' : 'var(--vv-graphite)', transition: 'color 160ms ease, border-color 160ms ease',
    ...(corner
      ? { position: 'absolute', right: BIO_CTA_RIGHT, bottom: 'clamp(26px, 3.4vw, 54px)' }
      : { alignSelf: 'flex-start', marginTop: 'clamp(18px, 2vw, 28px)' }),
    ...(variant === 'rule' ? { paddingBottom: 6, borderBottom: `1px solid ${hot ? 'var(--vv-amber)' : 'var(--vv-ice-08)'}` } : null),
    ...(variant === 'boxed' ? { padding: '11px 18px', border: `1px solid ${hot ? 'var(--vv-amber)' : 'var(--vv-ice-08)'}` } : null),
  };
  return (
    <a href="#about" onClick={(e) => e.preventDefault()}
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
  // The mark and the copy are one pair, so they share a grid track set rather than being
  // pushed to opposite edges — on an ultrawide the slack falls outside the pair, not between.
  // 1024, not 900: between 900 and 1100 the frame is too narrow to carry both a readable
  // measure and the mark — the decoration ends up wider than the copy it decorates.
  const stacked = useMaxWidth(1024);
  // Below the stacked breakpoint the mark rides in the flow above the copy instead of being
  // hung past the frame's bottom edge — a crop that reads as intent on a wide frame just
  // reads as a broken image on a phone. Above it the mark holds one size: 36vw until it hits
  // its 540px cap around 1500px, so it never rescales across real desktop widths.
  const bioMark = <img src="./assets/marks/bio-tree-v3-light.svg" alt="" style={stacked
    ? { width: 'clamp(150px, 42vw, 260px)', height: 'auto', display: 'block', margin: '0 auto', opacity: 0.7 }
    : { position: 'absolute', right: BIO_MARK_RIGHT, bottom: 'calc(-1 * clamp(28px, 5vw, 88px))', width: BIO_MARK_W, height: 'auto', display: 'block', opacity: 0.7 }} />;
  return (
    <div>
      {/* ── Hero ── */}
      {/* Hero fills the viewport, so the copy block lands in the bottom-left corner of
         whatever screen it opens on. edgeFade off: a full-height plate has no section
         above or below to fade into. minHeight guards very short windows. */}
      <VideoBackdrop src="./assets/plates/home-banner-video.mp4" scrim="bottom" minHeight="max(620px, 100svh)" align="end" edgeFade={false} foot="12%" pad="180px var(--gutter-site) 150px" plateOpacity={0.4}>
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto', width: '100%' }}>
        {/* No hard break: the measure is capped in `em` so it tracks the fluid font size, and
           `balance` evens the two lines — the wrap holds its shape at every width instead of
           snapping at one. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 1.1vw, 18px)' }}>
          <h1 style={{ margin: 0, fontSize: 'clamp(30px, 3.2vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, color: 'var(--vv-ice)', maxWidth: '17.5em', textWrap: 'balance' }}>
            <span style={{ color: 'var(--vv-amber)' }}>Legitimate Autonomy</span> for Robotics, Unmanned Vehicles &amp; Edge Systems
          </h1>
          <p style={{ margin: 0, fontSize: 'clamp(17px, 1.35vw, 20px)', lineHeight: 1.5, color: 'var(--vv-ice-82)', maxWidth: 620 }}>
            Using Evolutionary AI to power a new generation of intelligent, self-optimizing autonomous systems across all domains.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 'clamp(14px, 1.4vw, 24px)' }}>
            {/* Explore autonomy smooth-scrolls to the #models section; no page navigation */}
            <Button variant="primary" size="lg" icon="arrow_forward" onClick={() => { const el = document.getElementById('models'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>Explore autonomy</Button>
            <Button variant="secondary" size="lg">Contact us</Button>
          </div>
        </div>
        </div>
      </VideoBackdrop>

      {/* ── Section 1 · Biological Intelligence, over the second plate ── */}
      {/* overflow-x clip (not hidden) stops the bled plate from widening the page while
         still letting it finish downward into the next section. */}
      <section style={{ padding: 'clamp(40px, 4.4vw, 64px) var(--gutter-site)', overflowX: 'clip', overflowY: 'visible' }}>
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto' }}>
        {/* No frame here: the plate is feathered by its own radial mask, so the footage
           dissolves into the canvas at full size and needs no outline to contain it. It sits
           left and scaled past the column so it reads as a lit field beside the text rather
           than a picture behind it — both fluid, since a fixed 40% shift throws the whole
           subject off a phone screen. */}
        <VideoBackdrop src="./assets/plates/biological-intelligence.mp4" scrim="none" circleMask
          minHeight="clamp(440px, 44vw, 620px)" align="center" edgeFade={false} pad="clamp(24px, 3vw, 48px) 0"
          plateOpacity={0.1} plateShift="clamp(24px, 12vw, 200px)" plateSide="center" plateScale={1.5} plateDrop="clamp(96px, 13vw, 230px)" bleed style={{ background: 'transparent' }}>
        {/* One column of copy on a frame tall enough to give the hung mark room; the mark
           itself lives in the frame's clipped decor layer, so its roots are cut by the
           chamfer rather than spilling out of it. `reserve` is how the frame knows to stop
           the measure short of the mark — a max-width only bites when the mark is actually in
           the way, so on a large screen the measure keeps growing and the h2 holds two lines.
           The column's floor is the frame's height on a big screen, so it is set as the old
           total MINUS the frame's now-larger balanced padding: the frame keeps the height it
           always had instead of growing by the padding it gained. */}
        <SectionFrame copyMax={BIO_COPY_CAP} reserve={stacked ? undefined : BIO_MARK_W} gap={18}
          chamfer={stacked ? 0 : 44} color={stacked ? 'transparent' : undefined}
          stacked={stacked} columnMinHeight="clamp(300px, 23vw, 380px)" decor={stacked ? null : bioMark}
          before={stacked ? <div style={{ marginBottom: 'clamp(24px, 5vw, 40px)' }}>{bioMark}</div> : null}
          after={<>
            {/* Corner placement: absolute against the frame's own content box, in the one square
               corner the chamfer leaves (top-right and bottom-left are the cut ones). */}
            {t.bioCtaPlace === 'corner' && !stacked ? <BioCta variant={t.bioCtaStyle} corner onNavigate={onNavigate} /> : null}
          </>}>
          <Eyebrow>Vivum AI</Eyebrow>
          <h2 style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)' }}>
            <span style={{ color: 'var(--vv-amber)' }}>Biological Intelligence</span> Inspired by Nature and Built for Tomorrow
          </h2>
          <p style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)' }}>
            We create AI that mirrors the adaptability, efficiency, and resilience of Biological Systems. Our purpose is to propagate a computing paradigm that benefits all life on Earth.
          </p>
          {/* Optional filler for the frame's lower-left void — a hairline-ruled ledger of the
             three properties the copy names, or a metric row. Both hang off the same rule so
             the frame gains a second register instead of just more paragraph. */}
          {t.bioFill === 'traits' ? (
            <div style={{ display: 'grid', gap: 'clamp(8px, 0.9vw, 12px)', marginTop: 'clamp(16px, 1.9vw, 28px)', paddingTop: 'clamp(16px, 1.8vw, 24px)', borderTop: '1px solid var(--vv-ice-08)' }}>
              {BIO_TRAITS.map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: 'clamp(12px, 1.2vw, 18px)', alignItems: 'baseline' }}>
                  <span style={{ flex: '0 0 auto', minWidth: 84, fontSize: 12.5, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--vv-amber)' }}>{k}</span>
                  <span style={{ fontSize: 'clamp(14px, 1.05vw, 15px)', lineHeight: 1.5, color: 'var(--vv-ice-82)' }}>{v}</span>
                </div>
              ))}
            </div>
          ) : null}
          {t.bioFill === 'stats' ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(22px, 2.8vw, 44px)', marginTop: 'clamp(16px, 1.9vw, 28px)', paddingTop: 'clamp(16px, 1.8vw, 24px)', borderTop: '1px solid var(--vv-ice-08)', alignItems: 'flex-end' }}>
              {BIO_STATS.map(([n, l]) => (
                <div key={n} style={{ display: 'grid', gap: 4 }}>
                  <span style={{ fontSize: 'clamp(22px, 1.9vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--vv-ice)' }}>{n}</span>
                  <span style={{ fontSize: 12, letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1.4, color: 'var(--vv-ice-82)', maxWidth: 132 }}>{l}</span>
                </div>
              ))}
            </div>
          ) : null}
          {t.bioCtaPlace === 'inline' || stacked ? (
            <BioCta variant={t.bioCtaStyle} corner={false} onNavigate={onNavigate} />
          ) : null}
          {t.bioCaption ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 'clamp(14px, 1.6vw, 22px)' }}>
              <span style={{ width: 5, height: 5, borderRadius: 99, background: 'var(--vv-amber)', flex: '0 0 auto' }} />
              <span style={{ fontSize: 11.5, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--vv-ice-82)' }}>Fig. 01 — Evolved topology, generation 4,096</span>
            </div>
          ) : null}
        </SectionFrame>
        </VideoBackdrop>
        </div>
      </section>

      <CapabilitiesSection onNavigate={onNavigate} extraTweaks={<>
        <TweakSection label="Biological Intelligence" />
        <TweakRadio label="Frame fill" value={t.bioFill} options={['none', 'traits', 'stats']} onChange={(v) => setTweak('bioFill', v)} />
        <TweakRadio label="About link" value={t.bioCtaPlace} options={['corner', 'inline']} onChange={(v) => setTweak('bioCtaPlace', v)} />
        <TweakRadio label="Link treatment" value={t.bioCtaStyle} options={['arrow', 'rule', 'boxed']} onChange={(v) => setTweak('bioCtaStyle', v)} />
        <TweakToggle label="Figure caption" value={!!t.bioCaption} onChange={(v) => setTweak('bioCaption', v)} />
        <TweakSection label="Dynamic Neural Models" />
        <TweakRadio label="Traits" value={t.nmTraits} options={['cards', 'columns']} onChange={(v) => setTweak('nmTraits', v)} />
        <TweakRadio label="Icon tone" value={t.nmIconTone} options={['ice', 'amber']} onChange={(v) => setTweak('nmIconTone', v)} />
        <TweakSection label="Evolutionary AI" />
        <TweakRadio label="Pillar columns" value={t.evoCols} options={['1', '2', '4']} onChange={(v) => setTweak('evoCols', v)} />
        <TweakRadio label="Pillar body" value={t.evoBody} options={['trimmed', 'full']} onChange={(v) => setTweak('evoBody', v)} />
        <TweakRadio label="Lede" value={t.evoLede} options={['beside', 'below']} onChange={(v) => setTweak('evoLede', v)} />
        <TweakToggle label="Pillar icons" value={t.evoIcons === true} onChange={(v) => setTweak('evoIcons', v)} />
        <TweakSection label="Comparison" />
        <TweakRadio label="Layout" value={t.cmpLayout} options={['ledger', 'cards', 'spine']} onChange={(v) => setTweak('cmpLayout', v)} />
        <TweakRadio label="Emphasis" value={t.cmpEmphasis} options={['none', 'tint']} onChange={(v) => setTweak('cmpEmphasis', v)} />
        <TweakToggle label="Sticky header" value={t.cmpSticky === true} onChange={(v) => setTweak('cmpSticky', v)} />
        <TweakSection label="Closing banner" />
        <TweakRadio label="Treatment" value={t.ctaFrame} options={['banner', 'bare']} onChange={(v) => setTweak('ctaFrame', v)} />
        <TweakToggle label="Video inside frame" value={t.ctaPlate === true} onChange={(v) => setTweak('ctaPlate', v)} />
        <TweakToggle label="Secondary link" value={t.ctaSecond !== false} onChange={(v) => setTweak('ctaSecond', v)} />
      </>} />

      {/* ── Sections 3, 4, 5 ── */}
      <NeuralSection traits={t.nmTraits} tone={t.nmIconTone === 'amber' ? 'var(--vv-amber)' : 'var(--vv-ice)'} />
      <EvolutionarySection cols={Number(t.evoCols) || 2} lede={t.evoLede} body={t.evoBody} icons={t.evoIcons === true} />
      <ComparisonSection layout={t.cmpLayout} emphasis={t.cmpEmphasis} sticky={t.cmpSticky === true} />

      {/* ── Closing band ── */}
      {/* A chamfered frame turns the closing row into a banner: the cut corner and hairline are
         the same devices the sections above use, so the page ends inside its own vocabulary
         rather than on a bare full-width row. The amber tick at the top-left is the Bezel's
         own accent, and "Legitimate Autonomy" comes back in amber to bookend the hero. */}
      {/* field="none": was "signal" — the bloom is off, the field kept for future use. */}
      <GradientField field="none" pad="clamp(48px, 5vw, 88px) var(--gutter-site) clamp(56px, 6vw, 104px)" as="section">
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto' }}>
          {t.ctaFrame === 'bare' ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 64, flexWrap: 'wrap' }}>
              <h2 style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', maxWidth: 780, textWrap: 'balance' }}>
                <span style={{ color: 'var(--vv-amber)' }}>Legitimate Autonomy</span>, on the Hardware You Already Field
              </h2>
              <Button variant="primary" size="lg" icon="arrow_forward">Contact us</Button>
            </div>
          ) : (
            /* Same frame as the two copy sections — it shares their 44px chamfer, so it has to
               share their padding and left edge too. `contentStyle` lifts the copy cap because
               this frame's content is a full-width grid (copy left, button right); the inner
               copy column keeps its own measure. */
            <SectionFrame accent={!stacked} chamfer={stacked ? 0 : 44} weight={1}
              color={stacked ? 'transparent' : 'var(--vv-ice-14)'} stacked={stacked}
              contentStyle={{ maxWidth: '100%' }}
              plateSrc={t.ctaPlate ? './assets/plates/biological-intelligence.mp4' : undefined}
              plateOpacity={0.12} plateShift="clamp(40px, 26vw, 380px)" plateScale={1.3}
              fill={stacked ? 'transparent' : 'rgba(218,232,242,0.02)'}>
              <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) auto', columnGap: 'clamp(36px, 5vw, 88px)', rowGap: 'clamp(28px, 3.4vw, 40px)', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, maxWidth: 720 }}>
                  <h2 style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', textWrap: 'balance' }}>
                    <span style={{ color: 'var(--vv-amber)' }}>Legitimate Autonomy</span>, on the Hardware You Already Field
                  </h2>
                  <p style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', textWrap: 'pretty' }}>
                    Bring us a platform and a constraint &mdash; power, latency, or SWaP &mdash; and we&rsquo;ll show you what an evolved model does on it.
                  </p>
                  {t.ctaSecond !== false ? <QuietLink href="#evolutionary" label="Read the technical overview" /> : null}
                </div>
                <div style={{ display: 'flex', justifyContent: stacked ? 'flex-start' : 'flex-end' }}>
                  <Button variant="primary" size="lg" icon="arrow_forward">Contact us</Button>
                </div>
              </div>
            </SectionFrame>
          )}
        </div>
      </GradientField>
    </div>
  );
}

Object.assign(window, { HomeScreen });
