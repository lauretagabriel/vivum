const DS_C = () => window.VivumAIDesignSystem_b2be15;

function useCtMax(q) {
  const [hit, setHit] = React.useState(() => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${q}px)`).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${q}px)`);
    const on = () => setHit(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return hit;
}

const CT_TWEAKS = /*EDITMODE-BEGIN*/{
  "layout": "unified",
  "formFrame": "bezel",
  "fieldStyle": "wash",
  "topicControl": "dropdown",
  "pairFields": false,
  "sendWidth": "full",
  "heading": "warm",
  "lines": "ledger",
  "copyBtn": true,
  "mapLink": false,
  "headingInFrame": false,
  "backdrop": "field",
  "mFrame": "rise",
  "mSpeed": 1.2,
  "mDelay": 0,
  "mReplay": false,
  "seamAnim": "ribbons",
  "seamSize": 480,
  "seamSpeed": 2,
  "seamX": 0,
  "seamY": 0,
  "seamOpacity": 0.2,
}/*EDITMODE-END*/;
const CT_ADDRESS = ['611 Gateway Blvd (Suite 200)', 'San Francisco, CA 94080'];
const CT_MAP = 'https://www.google.com/maps/search/?api=1&query=611+Gateway+Blvd+Suite+200+South+San+Francisco+CA+94080';
const CT_LINES = [
  { label: 'Commercial partnerships', email: 'partnerships@vivum.ai' },
  { label: 'Defense applications', email: 'teaming@vivum.ai' },
];
const CT_HEADS = {
  verbatim: [<span key="a" style={{ color: 'var(--vv-amber)' }}>Reach out</span>, ' below'],
  short: [<span key="a" style={{ color: 'var(--vv-amber)' }}>Reach out</span>],
  warm: [<span key="a" style={{ color: 'var(--vv-amber)' }}>Start</span>, ' A Conversation'],
};

/* One direct line. The address is a real mailto link and the copy control is separate — a row
   that copies on click steals the click from the link people actually expect, and a row that
   only links leaves anyone composing in a desktop client to transcribe by hand. Both, then. */
function CtLine({ item, i, showCopy, last, style, mono }) {
  const [copied, setCopied] = React.useState(false);
  const [hot, setHot] = React.useState(false);
  const [copyHot, setCopyHot] = React.useState(false);
  const copy = () => {
    const done = () => { setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(item.email).then(done, done);
    else done();
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, padding: '18px 0', borderBottom: last ? 'none' : '1px solid var(--line-hairline)', minWidth: 0, ...style }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        {mono ? <span style={{ ...window.CT_LBL, color: 'var(--vv-graphite)', fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</span> : null}
        <span style={{ ...window.CT_LBL }}>{item.label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minWidth: 0 }}>
        <a href={`mailto:${item.email}`} onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
          style={{ fontSize: 'clamp(15.5px, 1.2vw, 17px)', lineHeight: 1.35, color: hot ? 'var(--vv-amber)' : 'var(--vv-ice)', textDecoration: 'none', borderBottom: '1px solid transparent', transition: `color 160ms ${window.CT_EASE}`, overflowWrap: 'anywhere' }}>{item.email}</a>
        {showCopy ? (
          <button type="button" onClick={copy} onMouseEnter={() => setCopyHot(true)} onMouseLeave={() => setCopyHot(false)} aria-label={`Copy ${item.email}`}
            style={{ flex: '0 0 auto', minHeight: 30, padding: '6px 9px', cursor: 'pointer', background: copied ? 'var(--vv-amber-08)' : (copyHot ? 'var(--vv-ice-04)' : 'transparent'), border: `1px solid ${copied ? 'var(--vv-amber-24)' : (copyHot ? 'var(--vv-ice-24)' : 'var(--line-hairline)')}`, borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: copied ? 'var(--vv-amber)' : (copyHot ? 'var(--vv-ice)' : 'var(--vv-graphite)'), transition: `all 160ms ${window.CT_EASE}` }}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function CtOffice({ mapLink }) {
  const { Icon } = DS_C();
  const [hot, setHot] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span style={window.CT_LBL}>Office</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 'clamp(15.5px, 1.2vw, 17px)', lineHeight: 1.5, color: 'var(--vv-ice-82)' }}>South San Francisco, CA</span>
        {CT_ADDRESS.map((l) => <span key={l} style={{ fontSize: 'clamp(15.5px, 1.2vw, 17px)', lineHeight: 1.5, color: 'var(--vv-ice-82)' }}>{l}</span>)}
      </div>
      {mapLink ? (
        <a href={CT_MAP} target="_blank" rel="noreferrer noopener" onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 2, fontSize: 14.5, textDecoration: 'none', color: hot ? 'var(--vv-amber)' : 'var(--vv-graphite)', transition: `color 160ms ${window.CT_EASE}` }}>
          Open in Maps
          <Icon name="arrow-up-right" size={13} style={{ transform: hot ? 'translate(2px, -2px)' : 'none', transition: `transform 160ms ${window.CT_EASE}` }} />
        </a>
      ) : null}
    </div>
  );
}

/* Right column: the escape hatch for anyone who would rather not fill in a form at all — so
   it is given equal typographic weight to the form's own heading, not tucked in as a footnote. */
function CtRail({ lines, showCopy, mapLink, mobile, spine }) {
  const { Bezel, Eyebrow } = DS_C();
  const rows = lines === 'cards' ? (
    <div style={{ display: 'grid', gap: 'clamp(10px, 1.1vw, 14px)' }}>
      {CT_LINES.map((c, i) => (
        <Bezel key={c.email} chamfer={20} weight={1} pad="18px 20px" accent={false} color="var(--vv-ice-14)" style={{ background: 'rgba(218,232,242,0.02)' }}>
          <CtLine item={c} i={i} showCopy={showCopy} last style={{ padding: 0 }} />
        </Bezel>
      ))}
    </div>
  ) : lines === 'plain' ? (
    <div style={{ display: 'grid', gap: 'clamp(18px, 2vw, 26px)' }}>
      {CT_LINES.map((c, i) => <CtLine key={c.email} item={c} i={i} showCopy={showCopy} last style={{ padding: 0 }} />)}
    </div>
  ) : (
    <div style={{ borderTop: '1px solid var(--line-hairline)' }}>
      {CT_LINES.map((c, i) => <CtLine key={c.email} item={c} i={i} showCopy={showCopy} mono last={false} />)}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px, 2.4vw, 32px)', minWidth: 0, ...(spine ? { paddingLeft: 'clamp(24px, 3vw, 48px)', borderLeft: '1px solid var(--line-hairline)' } : null) }}>
      <Reveal delay={140}><Eyebrow size="sm">Email us</Eyebrow></Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 0.8vw, 12px)' }}>
        <Reveal as="h2" variant="text" dur={720} delay={240} style={{ margin: 0, fontSize: 'clamp(21px, 1.8vw, 26px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--vv-ice)' }}>
          Prefer to <span style={{ color: 'var(--vv-amber)' }}>write directly</span>?
        </Reveal>
        <Reveal as="p" variant="up" delay={320} dur={560} style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--vv-ice-82)', maxWidth: '38ch' }}>
          Send us a note and we will get back to you as soon as we can.
        </Reveal>
      </div>
      <Reveal variant="up" delay={380} dur={560}>{rows}</Reveal>
      <Reveal variant="up" delay={520} dur={560} style={{ borderTop: lines === 'ledger' ? 'none' : '1px solid var(--line-hairline)' }}>
        <CtOffice mapLink={mapLink} />
      </Reveal>
    </div>
  );
}

function ContactScreen({ onNavigate, onToast }) {
  const { GradientField, Eyebrow, SectionFrame } = DS_C();
  const [t, setTweak] = useTweaks(CT_TWEAKS);
  React.useLayoutEffect(() => {
    window.vvSetMotion({ frame: t.mFrame, speed: t.mSpeed, delay: t.mDelay, replay: t.mReplay });
  }, [t.mFrame, t.mSpeed, t.mDelay, t.mReplay]);
  const stackTweak = t.layout === 'stacked';
  const stacked = useCtMax(940) || stackTweak;
  const mobile = useCtMax(640);
  const unified = t.layout === 'unified' && !stacked;
  /* Fluid, not fixed: at the 940 threshold a hard 400px rail leaves the form too narrow to
     hold a readable field, and the rail's content is two addresses — it can afford to shrink. */
  const railW = t.layout === 'offset' ? 'minmax(0, clamp(232px, 22vw, 320px))' : 'minmax(0, clamp(276px, 29vw, 400px))';

  const form = <CtForm variant={t.fieldStyle} topicControl={t.topicControl} pair={t.pairFields === true} sendWidth={t.sendWidth} mobile={mobile} onToast={onToast} />;
  const rail = <CtRail lines={t.lines} showCopy={t.copyBtn !== false} mapLink={t.mapLink !== false} mobile={mobile} spine={t.layout === 'offset' && !stacked} />;
  const headingInFrame = t.headingInFrame === true;

  const heading = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 1.1vw, 18px)', maxWidth: 640 }}>
      <Reveal delay={80}><Eyebrow><HudText text="Contact" speed={34} /></Eyebrow></Reveal>
      <Reveal as="h1" variant="text" dur={860} delay={180} style={{ margin: 0, fontSize: 'clamp(30px, 3.2vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, color: 'var(--vv-ice)', textWrap: 'balance' }}>
        {CT_HEADS[t.heading] || CT_HEADS.verbatim}
      </Reveal>
      <Reveal as="p" variant="up" delay={420} style={{ margin: 0, fontSize: 'clamp(17px, 1.35vw, 20px)', lineHeight: 1.5, color: 'var(--vv-ice-82)', maxWidth: 560, textWrap: 'pretty' }}>
        We are here to answer questions, explore collaborations, and everything in between.
      </Reveal>
    </div>
  );

  /* The form's own container. `bezel` is the page's default because the form is this page's
     one instrument and the chamfered frame is how every other page marks out its subject;
     `bare` sets the fields straight onto the field for a lighter page; `panel` fills the
     frame so the form reads as a surface you write on. Padding is left to `padX` alone —
     `SectionFrame` grows `padY` to match it on all four sides by default; passing an
     independent `padY` here is what broke that balance. */
  const framed = (body) => {
    if (mobile || t.formFrame === 'bare') return body;
    return (
      <Reveal variant="frame" dur={680} delay={120}>
        <SectionFrame stacked stretch copyMax="100%" contentStyle={{ maxWidth: '100%' }} gap={0}
          chamfer={44} chamferWide={72} weight={1} color="var(--vv-ice-14)" accent={false}
          padX="clamp(30px, 3.6vw, 56px)"
          fill={t.formFrame === 'panel' ? 'var(--vv-ice-04)' : 'rgba(218,232,242,0.02)'}>
          {body}
        </SectionFrame>
      </Reveal>
    );
  };
  const formPane = headingInFrame ? (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 3.4vw, 44px)' }}>{heading}{form}</div>
  ) : form;

  /* Single row now: the heading lives in its own section above, so this grid only ever lays
     out the frame and the rail side by side. */
  const cell = (col) => (stacked ? null : { gridColumn: col });
  const body = (
    <div style={{ position: 'relative', maxWidth: 'var(--container-site-narrow)', margin: '0 auto', width: '100%' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : unified ? 'minmax(0, 1fr)' : `minmax(0, 1fr) ${railW}`,
        columnGap: 'clamp(36px, 5vw, 88px)', rowGap: mobile ? 'clamp(38px, 9vw, 54px)' : 'clamp(34px, 3.6vw, 52px)',
        alignItems: 'start',
      }}>
        {unified ? (
          <div style={cell('1')}>
            {framed(
              <div style={{ display: 'grid', gridTemplateColumns: `minmax(0, 1fr) ${railW}`, columnGap: 'clamp(32px, 3.6vw, 64px)', alignItems: 'start' }}>
                <div style={{ paddingRight: 'clamp(24px, 3vw, 48px)', borderRight: '1px solid var(--line-hairline)' }}>{formPane}</div>
                <div style={{ paddingLeft: 'clamp(24px, 3vw, 48px)' }}>{rail}</div>
              </div>
            )}
          </div>
        ) : <>
          <div style={cell('1')}>{framed(formPane)}</div>
          <div style={cell('2')}>{rail}</div>
        </>}
      </div>
    </div>
  );

  const headPad = mobile
    ? 'clamp(44px, 11vw, 72px) var(--gutter-site) clamp(32px, 8vw, 44px)'
    : 'clamp(52px, 5.4vw, 92px) var(--gutter-site) clamp(34px, 3.6vw, 52px)';
  const formPad = mobile
    ? '0 var(--gutter-site) clamp(72px, 16vw, 112px)'
    : '0 var(--gutter-site) clamp(52px, 5.6vw, 100px)';

  /* `grid` and `field` are the two remaining canvas treatments — the moving-plate video is
     gone. `field="none"` on GradientField keeps the flat navy canvas: the `left` bloom's
     radial glow used to show through the frame's near-transparent fill, reading as a stray
     circular gradient behind the chamfer. */
  const gridWash = (
    <span aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'repeating-linear-gradient(to right, rgba(218,232,242,0.06) 0 1px, transparent 1px 88px), repeating-linear-gradient(to bottom, rgba(218,232,242,0.06) 0 1px, transparent 1px 88px)',
      maskImage: 'radial-gradient(115% 88% at 14% 0%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.35) 52%, rgba(0,0,0,0) 78%)',
      WebkitMaskImage: 'radial-gradient(115% 88% at 14% 0%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.35) 52%, rgba(0,0,0,0) 78%)',
    }} />
  );

  return (
    <div id="contact" style={{ isolation: 'isolate' }}>
      <section style={{ position: 'relative', padding: headPad }}>
        {!headingInFrame && <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto', width: '100%' }}>{heading}</div>}
      </section>

      {/* Full-bleed animated background sitting above the chamfered container — a sibling of
         both page sections, not nested inside their padded/maxWidth boxes, so the band runs
         edge to edge like the homepage's seam rather than being capped to the content column. */}
      <SeamAnimation variant={t.seamAnim} size={t.seamSize} speed={t.seamSpeed} x={t.seamX} y={t.seamY} opacity={t.seamOpacity} />

      {t.backdrop === 'grid' ? (
        <section style={{ position: 'relative', padding: formPad, overflow: 'hidden' }}>{gridWash}{body}</section>
      ) : (
        <GradientField field="none" pad={formPad} as="section" style={{ position: 'relative' }}>{body}</GradientField>
      )}

      <TweaksPanel>
        <TweakSection label="Layout" />
        <TweakRadio label="Columns" value={t.layout} options={['split', 'offset', 'unified', 'stacked']} onChange={(v) => setTweak('layout', v)} />
        <TweakRadio label="Form frame" value={t.formFrame} options={['bezel', 'panel', 'bare']} onChange={(v) => setTweak('formFrame', v)} />
        <TweakRadio label="Backdrop" value={t.backdrop} options={['grid', 'field']} onChange={(v) => setTweak('backdrop', v)} />
        <TweakSection label="Form" />
        <TweakRadio label="Field style" value={t.fieldStyle} options={['wash', 'outline', 'underline']} onChange={(v) => setTweak('fieldStyle', v)} />
        <TweakRadio label="Topic control" value={t.topicControl} options={['dropdown', 'chips']} onChange={(v) => setTweak('topicControl', v)} />
        <TweakToggle label="Email + phone on one row" value={t.pairFields === true} onChange={(v) => setTweak('pairFields', v)} />
        <TweakRadio label="Send button" value={t.sendWidth} options={['full', 'inline']} onChange={(v) => setTweak('sendWidth', v)} />
        <TweakSection label="Copy" />
        <TweakRadio label="Headline" value={t.heading} options={['verbatim', 'short', 'warm']} onChange={(v) => setTweak('heading', v)} />
        <TweakToggle label="Headline inside frame" value={headingInFrame} onChange={(v) => setTweak('headingInFrame', v)} />
        <TweakSection label="Direct lines" />
        <TweakRadio label="Style" value={t.lines} options={['ledger', 'cards', 'plain']} onChange={(v) => setTweak('lines', v)} />
        <TweakToggle label="Copy button" value={t.copyBtn !== false} onChange={(v) => setTweak('copyBtn', v)} />
        <TweakToggle label="Open in Maps link" value={t.mapLink !== false} onChange={(v) => setTweak('mapLink', v)} />
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

Object.assign(window, { ContactScreen });
