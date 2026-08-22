const DS_C = () => window.VivumDS || window.VivumAIDesignSystem_b2be15;

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

/* The section container hits its max width at 1720px of viewport (1560 cap + 2 * 80 gutter),
   the same threshold SectionFrame opens its corner cut on. Past it the icon column steps up to
   match the copy it labels instead of staying a small glyph beside a big block. */
const WIDE_MQ = 1720;

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
function LedgerRow({ item, tone, showIndex, last, fluid, wide }) {
  const { Icon } = DS_C();
  const [hot, setHot] = React.useState(false);
  return (
    <div onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: wide ? 30 : 22, alignItems: wide ? 'center' : 'start', padding: '26px 20px 28px 0', borderTop: '1px solid var(--line-hairline)', borderBottom: last ? '1px solid var(--line-hairline)' : 'none', background: hot ? 'var(--vv-ice-04, rgba(218,232,242,0.04))' : 'transparent', transition: 'background var(--dur-fast) var(--ease-out)' }}>
      {/* At max width the icon column stretches to the copy's own height and centres in it, so
         the glyph reads as the row's equal rather than a bullet hanging off its top line. */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, paddingTop: wide ? 0 : 2, width: wide ? 64 : undefined, alignSelf: wide ? 'stretch' : undefined }}>
        <Icon name={item.icon} size={wide ? 42 : 26} color={tone} />
        {showIndex ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: hot ? 'var(--vv-amber)' : 'var(--text-caption, var(--text-secondary))' }}>{item.n}</span> : null}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--vv-ice)' }}>{item.title}</h3>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: fluid ? '68ch' : (wide ? 600 : 460) }}>{item.body}</p>
      </div>
    </div>
  );
}

/* Plates: each capability on its own chamfered card, matching the Bezel corner language.
   The frame is a Bezel rather than a clip-pathed border: clip-path slices a real 1px border
   off at the diagonals, which is what left the corners looking cut open. */
function CapPlate({ item, tone, showIndex, fluid, wide }) {
  const { Icon, Bezel } = DS_C();
  const [hot, setHot] = React.useState(false);
  return (
    <Bezel accent={false} chamfer={fluid ? 0 : 16} weight={1} pad={fluid ? '16px 0' : '26px'}
      color={fluid ? 'transparent' : (hot ? 'var(--vv-ice-14)' : 'var(--line-hairline)')}
      fill={fluid ? 'transparent' : (hot ? 'rgba(218,232,242,0.05)' : 'rgba(218,232,242,0.02)')}
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
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--vv-ice)' }}>{item.title}</h3>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: fluid ? '68ch' : (wide ? 600 : 460) }}>{item.body}</p>
        </div>
      </div>
    </Bezel>
  );
}

/* Spine: a single vertical rail with the icons sitting on it — reads as one system with
   three stages rather than three unrelated cards. The rail is a flat hairline, the same
   weight as every other border on the page: an amber gradient down it made the rail itself
   the loudest thing in the section, ahead of the copy it is only there to connect. */
function SpineList({ tone, showIndex, fluid, wide }) {
  const { Icon } = DS_C();
  const box = wide ? 96 : 64, rail = wide ? 132 : 92;
  return (
    <div style={{ position: 'relative', paddingLeft: rail }}>
      {/* The rail is inset by half the icon box so it runs through their centers. */}
      <span style={{ position: 'absolute', left: box / 2, top: 22, bottom: 26, width: 1, background: 'var(--line-hairline)' }} />
      {CAP_ITEMS.map((m, i) => (
        /* Row gap is a MARGIN, not padding: the icon box is absolutely positioned against
           this row, so padding would put the gap inside its containing block and `top: 50%`
           would centre on copy-plus-gap — dropping the icon ~20px below its copy on every row
           but the last, and pushing the rail's start out above the first box. */
        <div key={m.title} style={{ position: 'relative', marginBottom: i === CAP_ITEMS.length - 1 ? 0 : 40 }}>
          <span style={{ position: 'absolute', left: -rail, top: wide ? '50%' : 0, transform: wide ? 'translateY(-50%)' : undefined, width: box, height: box, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line-hairline)', background: 'var(--surface-canvas)' }}>
            <Icon name={m.icon} size={wide ? 46 : 30} color={tone} />
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8, minHeight: box }}>
            {showIndex ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>{m.n}</span> : null}
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3, color: 'var(--vv-ice)' }}>{m.title}</h3>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)', textWrap: 'pretty', maxWidth: fluid ? '68ch' : (wide ? 520 : 360) }}>{m.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CapCta({ onNavigate }) {
  const [hot, setHot] = React.useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(''); }}
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
const BIO_COPY_CAP = 610;

function CapabilitiesSection({ extraTweaks, onNavigate }) {
  const { GradientField, Eyebrow, SectionFrame } = DS_C();
  const [t, setTweak] = useTweaks(CAP_TWEAKS);
  const stacked = useNarrow(820);
  const wide = useMinWidth(WIDE_MQ);
  const tone = t.capIconTone === 'ice' ? 'var(--vv-ice)' : 'var(--vv-amber)';
  const showIndex = t.capIndex === true;

  const right = t.capLayout === 'plates'
    ? <div style={{ display: 'grid', gridAutoRows: '1fr', gap: 16 }}>{CAP_ITEMS.map((m) => <CapPlate key={m.title} item={m} tone={tone} showIndex={showIndex} fluid={stacked} wide={wide} />)}</div>
    : t.capLayout === 'spine'
    ? <SpineList tone={tone} showIndex={showIndex} fluid={stacked} wide={wide} />
    : <div>{CAP_ITEMS.map((m, i) => <LedgerRow key={m.title} item={m} tone={tone} showIndex={showIndex} fluid={stacked} wide={wide} last={i === CAP_ITEMS.length - 1} />)}</div>;

  const copy = (
    <>
      <Eyebrow>Autonomous Solutions</Eyebrow>
      <h2 style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', textWrap: 'balance' }}>
        <span style={{ color: 'var(--vv-amber)' }}>Built for the Mission</span> and Tuned to the Hardware You Field
      </h2>
      <p style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', textWrap: 'pretty' }}>
        Autonomous capabilities evolved to integrate seamlessly with your existing systems, from off-the-shelf hardware to cutting-edge architectures.
      </p>
      {t.capCta ? <CapCta onNavigate={onNavigate} /> : null}
    </>
  );

  return (
    /* field="none": was "base" — the bloom is off, the field kept for future use. */
    <GradientField field="none" pad="clamp(48px, 5vw, 88px) var(--gutter-site)" as="section" id="mission">
      <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto' }}>
        {/* The copy sits in its own chamfered frame, so the section's two halves are both
           framed objects rather than loose text beside a card stack. Track sizing: the right
           column is a FRACTION with its own max-width, not a fixed 620px track — a fixed max
           track claims its full width before the `1fr` gets anything, which starved the copy
           column down to ~155px in the band just above the stacked breakpoint. Both tracks
           now shrink together, and the copy keeps a real floor.

           At max width the split tightens: the copy track gives ground to the cards
           (0.55fr → 0.72fr) and the gap closes, because past 1720px both columns have all the
           room they need and the wide split just pushed the two halves apart. */}
        <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : `minmax(min(100%, 380px), 1fr) minmax(0, ${wide ? '0.72fr' : '0.55fr'})`, columnGap: wide ? 'clamp(28px, 1.8vw, 34px)' : 'clamp(28px, 2.6vw, 48px)', rowGap: 'clamp(36px, 5vw, 56px)', alignItems: 'stretch' }}>
          <div style={{ alignSelf: t.capSticky && !stacked ? 'start' : 'center', ...(t.capSticky && !stacked ? { position: 'sticky', top: 'clamp(88px, 12vh, 132px)' } : null) }}>
            {/* Same frame component as the Biological Intelligence section, so the chamfer,
               hairline, padding and copy measure are one recipe rather than two that have to
               be kept in sync by hand. */}
            <SectionFrame copyMax={BIO_COPY_CAP} stacked={stacked}
              chamfer={stacked ? 0 : 44} color={stacked ? 'transparent' : undefined}>
              {copy}
            </SectionFrame>
          </div>
          {/* Narrower right track: the spine's paragraphs were running to a wide, loose
             measure next to the framed copy. Both columns center on each other.

             The 420px cap comes off at max width. Capped AND `justifySelf: end`, the cards
             sat pinned to the far edge and every px the frame gave up turned into dead space
             on the track's left — so tightening `columnGap` widened the gutter the eye reads
             instead of closing it. Filling the track makes `columnGap` the real gutter. */}
          <div style={{ maxWidth: wide ? 'none' : 420, width: '100%', justifySelf: wide ? 'stretch' : 'end', alignSelf: 'center' }}>{right}</div>
        </div>
      </div>
      <TweaksPanel>
        {extraTweaks}
        <TweakSection label="Autonomous Solutions" />
        <TweakRadio label="Layout" value={t.capLayout} options={['ledger', 'plates', 'spine']} onChange={(v) => setTweak('capLayout', v)} />
        <TweakRadio label="Icon tone" value={t.capIconTone} options={['amber', 'ice']} onChange={(v) => setTweak('capIconTone', v)} />
        <TweakToggle label="Numbering" value={showIndex} onChange={(v) => setTweak('capIndex', v)} />
        <TweakToggle label="Copy CTA link" value={t.capCta !== false} onChange={(v) => setTweak('capCta', v)} />
        <TweakToggle label="Sticky copy column" value={t.capSticky === true} onChange={(v) => setTweak('capSticky', v)} />
      </TweaksPanel>
    </GradientField>
  );
}

Object.assign(window, { CapabilitiesSection });
