const DS_C = () => window.VivumAIDesignSystem_b2be15;

const CAP_ITEMS = [
  { n: '01', icon: 'microchip', title: 'Off-the-Shelf Hardware', body: 'CPUs and microcontrollers already in the platform — no accelerator required.' },
  { n: '02', icon: 'memory', title: 'Reconfigurable Silicon', body: 'FPGAs and custom ASICs, with models fine-tuned to each device.' },
  { n: '03', icon: 'drone', title: 'Uncrewed Systems', body: 'Evolving uncrewed systems into fully autonomous entities.' },
];

const CAP_TWEAKS = /*EDITMODE-BEGIN*/{
  "capLayout": "spine",
  "capIconTone": "ice",
  "capIndex": false,
  "capCta": true,
  "capSticky": false
}/*EDITMODE-END*/;

function useNarrow(q) {
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

/* The section container hits its max width at 1560px of viewport (1400 cap + 2 * 80 gutter),
   the same threshold SectionFrame opens its corner cut on. Past it the icon column steps up to
   match the copy it labels instead of staying a small glyph beside a big block. */
const WIDE_MQ = 1560;

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

/* Ledger: hairline-ruled rows, index in mono. The rule set carries the eye down the
   column, so the rows need no fill of their own until hovered. */
function LedgerRow({ item, tone, showIndex, last, fluid, wide, mobile, index = 0 }) {
  const { Icon } = DS_C();
  const [hot, setHot] = React.useState(false);
  return (
    <Reveal variant="up" delay={index * 110} dur={560} onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: wide ? 30 : 22, alignItems: wide ? 'center' : 'start', padding: '26px 20px 28px 0', borderTop: '1px solid var(--line-hairline)', borderBottom: last ? '1px solid var(--line-hairline)' : 'none', background: hot ? 'var(--vv-ice-04, rgba(218,232,242,0.04))' : 'transparent', transition: 'background var(--dur-fast) var(--ease-out)' }}>
      {/* At max width the icon column stretches to the copy's own height and centres in it, so
         the glyph reads as the row's equal rather than a bullet hanging off its top line. */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, paddingTop: wide ? 0 : 2, width: wide ? 64 : undefined, alignSelf: wide ? 'stretch' : undefined }}>
        <Icon name={item.icon} size={wide ? 42 : 26} color={tone} />
        {showIndex ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: hot ? 'var(--vv-amber)' : 'var(--text-caption, var(--text-secondary))' }}>{item.n}</span> : null}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: mobile ? 17 : 20, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--vv-ice)' }}>{item.title}</h3>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: fluid ? '68ch' : (wide ? 600 : 460) }}>{item.body}</p>
      </div>
    </Reveal>
  );
}

/* Plates: each capability on its own chamfered card, matching the Bezel corner language.
   The frame is a Bezel rather than a clip-pathed border: clip-path slices a real 1px border
   off at the diagonals, which is what left the corners looking cut open. */
function CapPlate({ item, tone, showIndex, fluid, wide, chamferFill = 'rgba(218,232,242,0.02)', mobile, index = 0 }) {
  const { Icon, Bezel } = DS_C();
  const [hot, setHot] = React.useState(false);
  return (
    <Reveal variant="frame" delay={(fluid ? 0 : 640) + index * 170} dur={620} style={{ height: '100%' }}>
    <Bezel accent={false} chamfer={16} weight={1} pad="26px"
      color={hot ? 'var(--vv-ice-14)' : 'var(--line-hairline)'}
      fill={hot ? 'rgba(218,232,242,0.05)' : chamferFill}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ transition: 'none', height: '100%' }}>
      {/* Icon leads the row, copy sits to its right — the icon column is a fixed track so
         all three plates align on the same text edge. */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', columnGap: wide ? 28 : 20, alignItems: wide ? 'center' : 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, paddingTop: wide ? 0 : 2, width: wide ? 60 : 30, alignSelf: wide ? 'stretch' : undefined }}>
          <Icon name={item.icon} size={wide ? 40 : 26} color={tone} />
          {showIndex ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>{item.n}</span> : null}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: mobile ? 17 : 20, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--vv-ice)' }}>{item.title}</h3>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: fluid ? '68ch' : (wide ? 600 : 460) }}>{item.body}</p>
        </div>
      </div>
    </Bezel>
    </Reveal>
  );
}

/* Spine: a single vertical rail with the icons sitting on it — reads as one system with
   three stages rather than three unrelated cards. The rail is a flat hairline, the same
   weight as every other border on the page: an amber gradient down it made the rail itself
   the loudest thing in the section, ahead of the copy it is only there to connect. */
function SpineList({ tone, showIndex, fluid, wide, mobile }) {
  const { Icon } = DS_C();
  const box = wide ? 96 : 64, rail = wide ? 132 : 92;
  if (mobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {CAP_ITEMS.map((m, i) => (
          <Reveal key={m.title} variant="side" delay={i * 120} dur={520} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 16, alignItems: 'start' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, flex: 'none', border: '1px solid var(--line-hairline)', background: 'var(--surface-canvas)' }}>
              <Icon name={m.icon} size={26} color={tone} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {showIndex ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>{m.n}</span> : null}
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3, color: 'var(--vv-ice)' }}>{m.title}</h3>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)', textWrap: 'pretty' }}>{m.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    );
  }
  return (
    <div style={{ position: 'relative', paddingLeft: rail }}>
      {/* The rail is inset by half the icon box so it runs through their centers. */}
      <Reveal variant="fade" dur={900} style={{ position: 'absolute', left: box / 2, top: 22, bottom: 26, width: 1, background: 'var(--line-hairline)' }} />
      {CAP_ITEMS.map((m, i) => (
        /* Row gap is a MARGIN, not padding: the icon box is absolutely positioned against
           this row, so padding would put the gap inside its containing block and `top: 50%`
           would centre on copy-plus-gap — dropping the icon ~20px below its copy on every row
           but the last, and pushing the rail's start out above the first box. */
        <Reveal key={m.title} variant="side" delay={i * 130} dur={560} style={{ position: 'relative', marginBottom: i === CAP_ITEMS.length - 1 ? 0 : 40 }}>
          <span style={{ position: 'absolute', left: -rail, top: wide ? '50%' : 0, transform: wide ? 'translateY(-50%)' : undefined, width: box, height: box, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line-hairline)', background: 'var(--surface-canvas)' }}>
            <Icon name={m.icon} size={wide ? 46 : 30} color={tone} />
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 0 : 10, paddingTop: wide ? 8 : 0, minHeight: box }}>
            {showIndex ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>{m.n}</span> : null}
            <h3 style={{ margin: 0, fontSize: mobile ? 17 : 20, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3, color: 'var(--vv-ice)' }}>{m.title}</h3>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)', textWrap: 'pretty', maxWidth: fluid ? '68ch' : (wide ? 340 : 360) }}>{m.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function CapCta({ onNavigate }) {
  const [hot, setHot] = React.useState(false);
  return (
    <a href="#/autonomy" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/autonomy'); }}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 9, alignSelf: 'flex-start', paddingTop: 10, fontSize: 'clamp(15px, 1.2vw, 17px)', fontWeight: 400, lineHeight: 1, textDecoration: 'none', whiteSpace: 'nowrap', color: hot ? 'var(--vv-amber)' : 'var(--vv-graphite)', transition: 'color 160ms ease' }}>
      Explore autonomy
      <span aria-hidden="true" style={{ fontSize: '1.05em', lineHeight: 1, transform: hot ? 'translateX(3px)' : 'none', transition: 'transform 160ms ease' }}>&rarr;</span>
    </a>
  );
}

/* Copy geometry is SectionFrame's job now — padding tokens, the copy cap, and the rule that
   the copy sits flush to the left padding. That last one is why this headline and the
   Biological Intelligence headline above it start at the same x. */

function CapabilitiesSection({ extraTweaks, onNavigate, chamferFill = 'rgba(218,232,242,0.02)' }) {
  const { GradientField, Eyebrow, SectionFrame } = DS_C();
  const [t, setTweak] = useTweaks(CAP_TWEAKS);
  const stacked = useNarrow(820);
  const mobile = useNarrow(640);
  const tablet = useNarrow(1024) && !mobile;
  const wide = useMinWidth(WIDE_MQ);
  const tone = t.capIconTone === 'ice' ? 'var(--vv-ice)' : 'var(--vv-amber)';
  const showIndex = t.capIndex === true;

  const right = t.capLayout === 'plates'
    ? <div style={{ display: 'grid', gridAutoRows: '1fr', gap: 16 }}>{CAP_ITEMS.map((m, i) => <CapPlate key={m.title} index={i} item={m} tone={tone} showIndex={showIndex} fluid={stacked} wide={wide} chamferFill={chamferFill} mobile={mobile} />)}</div>
    : t.capLayout === 'spine'
    ? <SpineList tone={tone} showIndex={showIndex} fluid={stacked} wide={wide} mobile={mobile || tablet} />
    : <div>{CAP_ITEMS.map((m, i) => <LedgerRow key={m.title} index={i} item={m} tone={tone} showIndex={showIndex} fluid={stacked} wide={wide} last={i === CAP_ITEMS.length - 1} mobile={mobile} />)}</div>;

  const copy = (
    <>
      <Eyebrow><HudText text="Autonomous Solutions" speed={26} delay={260} /></Eyebrow>
      <Reveal as="h2" variant="text" dur={760} delay={300} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)' }}>
        <span style={{ color: 'var(--vv-amber)' }}>Built for the Mission</span> and Tuned to the Hardware You Field
      </Reveal>
      <Reveal as="p" variant="up" delay={480} style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', textWrap: 'pretty' }}>
        Autonomous capabilities evolved to integrate seamlessly with your existing systems, from off-the-shelf hardware to cutting-edge architectures.
      </Reveal>
      {/* Last in the section on desktop as on mobile: the delay clears the right column's own
         ramp (plates start at 640 and step 170 a card), so the link closes the section instead
         of landing in the middle of the card stack. */}
      {t.capCta && !mobile ? <Reveal variant="side" delay={1150} dur={480}><CapCta onNavigate={onNavigate} /></Reveal> : null}
    </>
  );

  return (
    /* field="none": was "base" — the bloom is off, the field kept for future use. */
    <GradientField field="none" pad={mobile ? 'clamp(64px, 15vw, 96px) var(--gutter-site)' : 'clamp(40px, 4.2vw, 72px) var(--gutter-site)'} as="section" id="mission">
      <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
        <RevealGroup on={stacked}>
        {/* The copy sits in its own chamfered frame, so the section's two halves are both
           framed objects rather than loose text beside a card stack. Track sizing: the right
           column is a FRACTION with its own max-width, not a fixed 620px track — a fixed max
           track claims its full width before the `1fr` gets anything, which starved the copy
           column down to ~155px in the band just above the stacked breakpoint. Both tracks
           now shrink together, and the copy keeps a real floor.

           At max width the split loosens instead: the right column gives up some of the width
           it claimed (0.72fr → 0.55fr) so the extra room reads as gap between the two frames
           rather than getting soaked up inside the cards' own track. */}
        <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : `minmax(min(100%, 380px), ${wide ? '0.76fr' : '0.95fr'}) minmax(0, 0.55fr)`, columnGap: wide ? 'clamp(20px, 1.6vw, 32px)' : 'clamp(28px, 2.6vw, 48px)', rowGap: 'clamp(36px, 5vw, 56px)', alignItems: 'stretch' }}>
          <div style={{ alignSelf: t.capSticky && !stacked ? 'start' : 'center', ...(t.capSticky && !stacked ? { position: 'sticky', top: 'clamp(88px, 12vh, 132px)' } : null) }}>
            {/* Same frame component as the Biological Intelligence section, so the chamfer,
               hairline, padding and copy measure are one recipe rather than two that have to
               be kept in sync by hand. */}
            {/* copyMax is dropped here on purpose: this frame sits in a 2-col grid track,
               not the shared page container SectionFrame derives its padding from, so a fixed
               cap can end up narrower than the frame's own content box — flush on the left,
               slack on the right. Filling the track keeps the padding visually balanced at
               every width instead of only past the wide breakpoint. */}
            {/* Mobile drops the frame entirely, so the acquire furniture would have no box to
               bracket — it reverts to a plain rise there. */}
            <Reveal variant={mobile ? 'up' : 'frame'} dur={640}>
            <SectionFrame copyMax="100%" stacked={stacked} contentStyle={{ maxWidth: '100%' }} fill={mobile ? 'transparent' : chamferFill}
              {...(mobile ? { chamfer: 0, color: 'transparent', blur: 0, accent: false, padX: '0px', padY: '0px' } : tablet ? { padX: 'clamp(48px, 6vw, 96px)', padY: 'clamp(48px, 6vw, 96px)' } : null)}>
              {copy}
            </SectionFrame>
            </Reveal>
          </div>
          {/* Narrower right track: the spine's paragraphs were running to a wide, loose
             measure next to the framed copy. Both columns center on each other.

             The 420px cap comes off at max width. Capped AND `justifySelf: end`, the cards
             sat pinned to the far edge and every px the frame gave up turned into dead space
             on the track's left — so tightening `columnGap` widened the gutter the eye reads
             instead of closing it. Filling the track makes `columnGap` the real gutter. */}
          <div style={{ maxWidth: stacked ? '100%' : (wide ? 520 : 420), width: '100%', justifySelf: stacked ? 'start' : 'end', alignSelf: 'center' }}><RevealSeq ms={stacked ? 780 : 0}>{right}</RevealSeq></div>
        </div>
        {/* Mobile lifts this link out of the copy column and drops it at the very bottom of the
             section, so it must also reveal last: RevealSeq pushes it past every column ramp
             above it (copy, then the stacked right column) rather than firing on its own
             near-zero delay the moment it scrolls in. */}
        {t.capCta && mobile ? <div style={{ marginTop: 'clamp(24px, 5vw, 36px)' }}>
          <RevealSeq ms={1450}><Reveal variant="side" dur={480}><CapCta onNavigate={onNavigate} /></Reveal></RevealSeq>
        </div> : null}
        </RevealGroup>
      </div>
      <TweaksPanel>
        {extraTweaks}
      </TweaksPanel>
    </GradientField>
  );
}

Object.assign(window, { CapabilitiesSection });
