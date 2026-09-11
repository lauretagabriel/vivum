/* Website › About — the three middle sections: Principles, Leadership, Horizon.
   Split out of AboutScreen.jsx to keep both files readable. Every headline, claim and name
   here comes from the supplied About copy; no figures appear anywhere on this page because
   none were supplied. */

const DS_AB = () => window.VivumAIDesignSystem_b2be15;

function useAbsMax(q) {
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

function useAbsMin(q) {
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

/* The page's one micro-label style — mono, tracked, graphite. Shared with AboutScreen through
   window, since each babel script owns its own scope. */
const AB_LBL = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vv-graphite)' };

/* Titles held to three or four words and bodies to a single balanced line each, so the three
   read as one set rather than one long entry and two short ones. Meaning is unchanged. */
const AB_PRINCIPLES = [
  { n: '01', icon: 'rectangle-history', title: 'Decoupled from any platform', body: 'Our intelligence layer sits on top of physical systems, never locked to a single one.' },
  { n: '02', icon: 'radar', title: 'Built for contested environments', body: 'No cloud dependence. Built to degrade gracefully under pressure rather than fail outright.' },
  { n: '03', icon: 'shield-check', title: 'Explainable by design', body: 'Autonomy you can trust, because every decision the model makes can be read and understood.' },
];

/* The founder's name is the section's headline, so it is deliberately NOT repeated here — the
   ledger complements the prose rather than restating it. */
const AB_LEDGER = [
  ['Team', 'Operators, engineers, researchers'],
  ['Advisors', 'National security and intelligence communities'],
  ['Backing', "Leading institutional investors"],
];

const AB_HORIZON = [
  { k: 'Now', title: 'Foundational autonomy', note: 'Systems that sense, decide, and act on the device.' },
  { k: 'Next', title: 'Distributed, coordinated intelligence', note: 'Across fleets and domains, compounding with every deployment.' },
];

/* ── Principles ───────────────────────────────────────────────────────────────────────────
   A ghost numeral in the gutter is this page's own device: Autonomy numbers its advantages at
   label scale, so About numbers its principles at display scale instead — the same cue, a
   different voice, and the numerals carry the section's rhythm without a second heading. */
function AbPrincipleRow({ item, i, mobile }) {
  const [hot, setHot] = React.useState(false);
  return (
    <Reveal variant="up" delay={i * 130} dur={560}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'auto minmax(0, 1fr)', columnGap: 'clamp(22px, 2.8vw, 48px)', rowGap: 10, alignItems: 'start', padding: mobile ? '22px 0 24px' : 'clamp(24px, 2.6vw, 36px) 0', borderTop: i ? '1px solid var(--line-hairline)' : 'none', transition: 'background var(--dur-fast) var(--ease-out)', background: hot ? 'rgba(218,232,242,0.03)' : 'transparent' }}>
      <HudText text={item.n} speed={22} delay={140 + i * 130}
        style={{ fontFamily: 'var(--font-mono)', fontSize: mobile ? 20 : 'clamp(26px, 2.5vw, 38px)', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', color: hot ? 'var(--vv-amber)' : 'var(--vv-ice-24)', transition: 'color var(--dur-fast) var(--ease-out)' }} />
      <span style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', alignItems: mobile ? 'flex-start' : 'baseline', gap: mobile ? 8 : 'clamp(22px, 2.6vw, 44px)' }}>
        <h3 style={{ margin: 0, flex: mobile ? undefined : '0 0 clamp(210px, 22vw, 320px)', fontSize: mobile ? 18 : 'clamp(19px, 1.7vw, 23px)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25, color: 'var(--vv-ice)', textWrap: 'balance' }}>{item.title}</h3>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)', textWrap: 'pretty', maxWidth: '58ch' }}>{item.body}</p>
      </span>
    </Reveal>
  );
}

function AbPrincipleCell({ item, i, mobile }) {
  const { Icon } = DS_AB();
  const [hot, setHot] = React.useState(false);
  return (
    <Reveal variant="up" delay={i * 130} dur={560}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ background: hot ? 'rgba(218,232,242,0.04)' : 'var(--surface-canvas)', padding: mobile ? '26px 22px 30px' : 'clamp(26px, 2.8vw, 38px)', display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 1.6vw, 22px)', transition: 'background var(--dur-fast) var(--ease-out)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <Icon name={item.icon} size={mobile ? 28 : 34} color="var(--vv-ice)" />
        <HudText text={item.n} speed={22} delay={200 + i * 130}
          style={{ fontFamily: 'var(--font-mono)', fontSize: mobile ? 20 : 28, fontWeight: 400, lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: hot ? 'var(--vv-amber)' : 'var(--vv-ice-24)', transition: 'color var(--dur-fast) var(--ease-out)' }} />
      </div>
      <h3 style={{ margin: 0, fontSize: mobile ? 18 : 'clamp(19px, 1.6vw, 22px)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25, color: 'var(--vv-ice)', textWrap: 'balance' }}>{item.title}</h3>
      <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)', textWrap: 'pretty' }}>{item.body}</p>
    </Reveal>
  );
}

/* Right column of Principles — the same device as Autonomy's Advantages spine: one hairline
   rail with icon boxes sitting on it, OUTSIDE the chamfered frame that holds the copy, so the
   two read as peer objects rather than one frame containing everything. */
function AbPrinciplesSpine({ mobile }) {
  const { Icon } = DS_AB();
  const wide = useAbsMin(1560);
  const box = wide ? 96 : 64, rail = wide ? 132 : 92;
  if (mobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {AB_PRINCIPLES.map((m, i) => (
          <Reveal key={m.title} variant="side" delay={i * 120} dur={520} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 16, alignItems: 'start' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, flex: 'none', border: '1px solid var(--line-hairline)', background: 'var(--surface-canvas)' }}>
              <Icon name={m.icon} size={26} color="var(--vv-ice)" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
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
      <Reveal variant="fade" dur={900} style={{ position: 'absolute', left: box / 2, top: 22, bottom: 26, width: 1, background: 'var(--line-hairline)' }} />
      {AB_PRINCIPLES.map((m, i) => (
        <Reveal key={m.title} variant="side" delay={i * 130} dur={560} style={{ position: 'relative', marginBottom: i === AB_PRINCIPLES.length - 1 ? 0 : 40 }}>
          <span style={{ position: 'absolute', left: -rail, top: wide ? '50%' : 0, transform: wide ? 'translateY(-50%)' : undefined, width: box, height: box, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line-hairline)', background: 'var(--surface-canvas)' }}>
            <Icon name={m.icon} size={wide ? 46 : 30} color="var(--vv-ice)" />
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: wide ? 8 : 0, minHeight: box }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3, color: 'var(--vv-ice)' }}>{m.title}</h3>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)', textWrap: 'pretty', maxWidth: 360 }}>{m.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* Section shell copied from Autonomy's Advantages: copy in a chamfered frame on the left, the
   three principles on a hairline spine to its right. `cells` and `ledger` keep the older
   full-width treatments inside a single frame. */
function AbPrinciples({ variant }) {
  const { Eyebrow, SectionFrame } = DS_AB();
  const stacked = useAbsMax(900);
  const mobile = useAbsMax(640);
  const tablet = useAbsMax(1024) && !mobile;
  const cols = mobile ? 1 : stacked ? 2 : 3;
  const spine = variant !== 'cells' && variant !== 'ledger';

  const items = variant === 'cells'
    ? (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 1, background: 'var(--line-hairline)', border: '1px solid var(--line-hairline)' }}>
        {AB_PRINCIPLES.map((p, i) => <AbPrincipleCell key={p.n} item={p} i={i} mobile={mobile} />)}
      </div>
    )
    : <div>{AB_PRINCIPLES.map((p, i) => <AbPrincipleRow key={p.n} item={p} i={i} mobile={mobile} />)}</div>;

  const copy = (
    <>
      <Eyebrow><HudText text="Principles" speed={30} delay={200} /></Eyebrow>
      <Reveal as="h2" variant="text" dur={760} delay={260} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', textTransform: 'capitalize' }}>
        The <span style={{ color: 'var(--vv-amber)' }}>Fundamental</span> and Core Values We Live By Every Day
      </Reveal>
      <Reveal as="p" variant="up" delay={440} style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)' }}>
        Three commitments decide what we build and what we refuse to build. They are the
        reason our models run on your hardware, hold up when the link drops, and can be
        read by the people who have to answer for them.
      </Reveal>
    </>
  );

  const frameProps = mobile
    ? { chamfer: 0, color: 'transparent', blur: 0, accent: false, padX: '0px', padY: '0px' }
    : tablet ? { padX: 'clamp(48px, 6vw, 96px)', padY: 'clamp(48px, 6vw, 96px)' } : null;

  return (
    <GradientFieldAb pad={mobile ? 'clamp(64px, 15vw, 96px) var(--gutter-site)' : 'clamp(40px, 4.2vw, 72px) var(--gutter-site)'} id="principles">
      <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
        {spine ? (
          <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'minmax(0, 0.72fr) minmax(0, 0.68fr)', columnGap: 0, rowGap: 'clamp(36px, 5vw, 56px)', alignItems: 'stretch' }}>
            <div style={{ alignSelf: 'center' }}>
              <Reveal variant={mobile ? 'up' : 'frame'} dur={640}>
                <SectionFrame copyMax="100%" stacked={stacked} contentStyle={{ maxWidth: '100%' }} fill="transparent" {...frameProps}>
                  {copy}
                </SectionFrame>
              </Reveal>
            </div>
            <div style={{ maxWidth: stacked ? '100%' : 580, width: '100%', boxSizing: 'border-box', justifySelf: 'start', alignSelf: 'center', paddingLeft: stacked ? 0 : 'clamp(2.5rem, 5.2vw, 7.5rem)', paddingRight: 0 }}>
              <AbPrinciplesSpine mobile={mobile} />
            </div>
          </div>
        ) : (
          <Reveal variant={mobile ? 'up' : 'frame'} dur={640}>
            <SectionFrame stacked={stacked} fill="transparent"
              after={(
                <div style={{ marginTop: 'clamp(24px, 2.8vw, 40px)', paddingTop: 'clamp(20px, 2.4vw, 32px)', borderTop: '1px solid var(--line-hairline)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, paddingBottom: 'clamp(8px, 1.4vw, 18px)' }}>
                    <span style={AB_LBL}>Three principles</span>
                    <span aria-hidden="true" style={{ flex: 1, height: 1, background: 'var(--line-hairline)' }} />
                    <span style={{ ...AB_LBL, letterSpacing: '0.1em' }}>01–03</span>
                  </div>
                  {items}
                </div>
              )}
              {...frameProps}>
              {copy}
            </SectionFrame>
          </Reveal>
        )}
      </div>
    </GradientFieldAb>
  );
}

/* ── Leadership ───────────────────────────────────────────────────────────────────────────
   Prose on the left for the reader, a hairline ledger on the right for the scanner — the same
   two-audience split the Contact page uses for the form and its direct lines. No portraits:
   none were supplied, and the brand ships no placeholder photography. */
function AbLedgerRows({ rows, mobile }) {
  return (
    <div style={{ borderTop: '1px solid var(--line-hairline)' }}>
      {rows.map(([k, v], i) => (
        <Reveal key={k} variant="up" delay={i * 110} dur={520}
          style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'minmax(0, 0.72fr) minmax(0, 1fr)', columnGap: 'clamp(16px, 2vw, 32px)', rowGap: 6, alignItems: 'baseline', padding: '16px 0', borderBottom: '1px solid var(--line-hairline)' }}>
          <span style={AB_LBL}>{k}</span>
          <span style={{ fontSize: 'clamp(15px, 1.15vw, 16.5px)', lineHeight: 1.45, color: 'var(--vv-ice-82)', textWrap: 'pretty' }}>{v}</span>
        </Reveal>
      ))}
    </div>
  );
}

function AbLeadership({ variant }) {
  const { Eyebrow, SectionFrame } = DS_AB();
  const stacked = useAbsMax(940) || variant === 'stacked';
  const mobile = useAbsMax(640);
  const tablet = useAbsMax(1024) && !mobile;

  const heading = (
    <Reveal as="h2" variant="text" dur={800} delay={240} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', textTransform: 'capitalize', textWrap: 'balance' }}>
      Led by founder and CEO <span style={{ color: 'var(--vv-amber)' }}>Aldo Carrascoso</span>
    </Reveal>
  );
  const team = (
    <Reveal as="p" variant="up" delay={420} style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', maxWidth: '55ch', textWrap: 'pretty' }}>
      Alongside him is a team of operators, engineers, and researchers building at the frontier
      of edge autonomy. Our work is guided by senior advisors from the national security and
      intelligence communities, and backed by some of the world&rsquo;s leading institutional
      investors.
    </Reveal>
  );
  const pull = (compact) => (
    <Reveal as="p" variant="up" delay={560} style={{ margin: 0, paddingTop: compact ? 0 : 'clamp(14px, 1.6vw, 20px)', borderTop: compact ? 'none' : '1px solid var(--line-hairline)', fontSize: compact ? 'clamp(18px, 1.6vw, 23px)' : 'clamp(17px, 1.45vw, 21px)', fontWeight: 500, lineHeight: 1.45, letterSpacing: '-0.01em', color: 'var(--vv-ice-92)', maxWidth: '46ch', textWrap: 'balance' }}>
      The people behind Vivum have built, scaled, and defended at the highest levels &mdash; and
      we are just getting started.
    </Reveal>
  );

  const prose = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 1.6vw, 22px)' }}>
      <Eyebrow><HudText text="Leadership" speed={30} delay={180} /></Eyebrow>
      {heading}
      {team}
      {pull()}
    </div>
  );
  const ledger = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 1.6vw, 20px)', minWidth: 0 }}>
      <span style={AB_LBL}>In brief</span>
      <AbLedgerRows rows={AB_LEDGER} mobile={mobile} />
    </div>
  );

  const grid = (
    <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, clamp(280px, 30vw, 400px))', columnGap: 'clamp(36px, 5vw, 88px)', rowGap: 'clamp(34px, 8vw, 52px)', alignItems: 'start' }}>
      {prose}
      <div style={stacked ? null : { paddingLeft: 'clamp(24px, 3vw, 48px)', borderLeft: '1px solid var(--line-hairline)' }}>{ledger}</div>
    </div>
  );

  /* masthead — the section reads top-down instead of left-right: label rule, the founder line
     at full measure, then prose beside the pull-quote, and the ledger as a three-across footer
     strip on the frame's baseline. Same words, a masthead instead of a split. */
  const masthead = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 2.6vw, 38px)' }}>
      <Reveal delay={140}>
        <Eyebrow><HudText text="Leadership" speed={30} delay={180} /></Eyebrow>
      </Reveal>
      {heading}
      <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'minmax(0, 0.95fr) minmax(0, 1.05fr)', columnGap: 'clamp(36px, 5vw, 80px)', rowGap: 'clamp(22px, 5vw, 32px)', alignItems: 'start', paddingTop: 'clamp(4px, 1vw, 12px)' }}>
        {team}
        <div style={stacked ? null : { paddingLeft: 'clamp(24px, 3vw, 48px)', borderLeft: '1px solid var(--line-hairline)' }}>{pull(true)}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : `repeat(${AB_LEDGER.length}, minmax(0, 1fr))`, gap: mobile ? 0 : 'clamp(24px, 3vw, 56px)', marginTop: 'clamp(6px, 1vw, 14px)', paddingTop: 'clamp(20px, 2.4vw, 30px)', borderTop: '1px solid var(--line-hairline)' }}>
        {AB_LEDGER.map(([k, v], i) => (
          <Reveal key={k} variant="up" delay={620 + i * 110} dur={520}
            style={{ display: 'flex', flexDirection: 'column', gap: 9, paddingTop: mobile && i ? 16 : 0, paddingBottom: mobile && i !== AB_LEDGER.length - 1 ? 16 : 0, borderTop: mobile && i ? '1px solid var(--line-hairline)' : 'none', paddingLeft: !mobile && i ? 'clamp(24px, 3vw, 56px)' : 0, borderLeft: !mobile && i ? '1px solid var(--line-hairline)' : 'none' }}>
            <span style={AB_LBL}>{k}</span>
            <span style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.45, color: 'var(--vv-ice-82)', textWrap: 'pretty' }}>{v}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );

  const framed = variant === 'masthead' ? masthead : grid;
  return (
    <GradientFieldAb pad={mobile ? 'clamp(64px, 15vw, 96px) var(--gutter-site)' : 'clamp(40px, 4.2vw, 72px) var(--gutter-site)'} id="leadership">
      <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
        {variant === 'plain' ? grid : (
          <Reveal variant={mobile ? 'up' : 'frame'} dur={680}>
            <SectionFrame stacked stretch copyMax="100%" contentStyle={{ maxWidth: '100%' }} gap={0}
              chamfer={mobile ? 28 : 44} chamferWide={72} weight={1} color="var(--vv-ice-14)" accent={false}
              fill="transparent"
              {...(mobile ? { chamfer: 0, color: 'transparent', blur: 0, padX: '0px', padY: '0px' } : tablet ? { padX: 'clamp(48px, 6vw, 96px)', padY: 'clamp(48px, 6vw, 96px)' } : null)}>
              {framed}
            </SectionFrame>
          </Reveal>
        )}
      </div>
    </GradientFieldAb>
  );
}

/* ── Horizon ──────────────────────────────────────────────────────────────────────────────
   Same two-column shell as Principles: copy in the chamfered frame on the left, the two states
   the sentence names stacked on a hairline spine to its right — ice at Now, amber at Next. */
const AB_PULSE_KEYFRAMES = '@keyframes vvHorizonPulse{0%{transform:scale(1);box-shadow:0 0 0 0 rgba(217,142,55,0.55)}70%{transform:scale(1.15);box-shadow:0 0 0 10px rgba(217,142,55,0)}100%{transform:scale(1);box-shadow:0 0 0 0 rgba(217,142,55,0)}}';
function AbHorizonSpine({ mobile }) {
  return (
    <div style={{ position: 'relative', paddingLeft: mobile ? 26 : 'clamp(30px, 3.2vw, 54px)' }}>
      <style>{AB_PULSE_KEYFRAMES}</style>
      <Reveal variant="fade" dur={900} aria-hidden="true" style={{ position: 'absolute', left: 0, top: 6, bottom: 6, width: 1, background: 'linear-gradient(180deg, var(--vv-ice-24) 0%, var(--vv-ice-14) 55%, transparent 100%)' }} />
      {AB_HORIZON.map((h, i) => (
        <Reveal key={h.k} variant="side" delay={i * 150} dur={560}
          style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: i === AB_HORIZON.length - 1 ? 0 : 'clamp(28px, 3.2vw, 44px)' }}>
          <span aria-hidden="true" style={{ position: 'absolute', left: mobile ? -30 : 'calc(-1 * clamp(30px, 3.2vw, 54px) - 4px)', top: 6, width: 9, height: 9, borderRadius: '50%', background: i ? 'var(--vv-amber)' : 'var(--vv-graphite)', animation: i === 1 ? 'vvHorizonPulse 2.2s ease-out infinite' : 'none' }} />
          <span style={{ ...AB_LBL, color: i ? 'var(--vv-amber)' : 'var(--vv-graphite)' }}>{h.k}</span>
          <h3 style={{ margin: 0, fontSize: mobile ? 19 : 'clamp(20px, 1.8vw, 25px)', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.25, color: 'var(--vv-ice)', textTransform: 'capitalize' }}>{h.title}</h3>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '44ch', textWrap: 'pretty' }}>{h.note}</p>
        </Reveal>
      ))}
    </div>
  );
}

function AbHorizon({ variant }) {
  const { Eyebrow, SectionFrame } = DS_AB();
  const mobile = useAbsMax(640);
  const stacked = useAbsMax(900);
  const tablet = useAbsMax(1024) && !mobile;
  const copy = (
    <>
      <Eyebrow><HudText text="Where we are going" speed={26} delay={160} /></Eyebrow>
      <Reveal as="h2" variant="text" dur={800} delay={220} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', textTransform: 'capitalize' }}>
        From foundational autonomy to <span style={{ color: 'var(--vv-amber)' }}>coordinated intelligence</span>
      </Reveal>
      <Reveal as="p" variant="up" delay={360} style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', textWrap: 'pretty' }}>
        We are moving from foundational autonomy toward distributed, coordinated intelligence
        across fleets and domains. Every deployment sharpens the platform, and every system
        in the field compounds its value. What we have built so far is the foundation &mdash;
        what comes next is bigger.
      </Reveal>
      {variant === 'quote' ? (
        <Reveal as="p" variant="text" dur={780} delay={520} style={{ margin: 0, paddingTop: 'clamp(16px, 1.8vw, 24px)', borderTop: '1px solid var(--line-hairline)', fontSize: 'clamp(19px, 1.8vw, 25px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.3, color: 'var(--vv-ice)', maxWidth: '30ch' }}>
          &ldquo;What we have built so far is the foundation. What comes next is bigger.&rdquo;
        </Reveal>
      ) : null}
    </>
  );
  return (
    <GradientFieldAb pad={mobile ? 'clamp(64px, 15vw, 96px) var(--gutter-site)' : 'clamp(40px, 4.2vw, 72px) var(--gutter-site)'} id="horizon">
      <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'minmax(0, 0.62fr) minmax(0, 0.28fr)', columnGap: stacked ? 0 : 'clamp(56px, 7vw, 110px)', rowGap: 'clamp(36px, 5vw, 56px)', alignItems: 'stretch' }}>
          <div style={{ alignSelf: 'center' }}>
            <Reveal variant={mobile ? 'up' : 'frame'} dur={680}>
              <SectionFrame copyMax={900} stacked={stacked} fill="transparent"
                {...(mobile ? { chamfer: 0, color: 'transparent', blur: 0, accent: false, padX: '0px', padY: '0px' } : null)}>
                {copy}
              </SectionFrame>
            </Reveal>
          </div>
          <div style={{ maxWidth: stacked ? '100%' : 420, width: '100%', boxSizing: 'border-box', justifySelf: 'start', alignSelf: 'center', paddingLeft: stacked ? 0 : 'clamp(0.5rem, 1vw, 1rem)' }}>
            <AbHorizonSpine mobile={mobile} />
          </div>
        </div>
      </div>
    </GradientFieldAb>
  );
}

/* Every About section paints on the shared canvas with no band of its own — the design system's
   no-hard-cuts rule. One wrapper so the three sections cannot drift apart. */
function GradientFieldAb({ pad, id, children }) {
  const { GradientField } = DS_AB();
  return <GradientField field="none" pad={pad} as="section" id={id}>{children}</GradientField>;
}

Object.assign(window, { AbPrinciples, AbLeadership, AbHorizon, AB_LBL, AB_PRINCIPLES, AB_LEDGER, AB_HORIZON });
