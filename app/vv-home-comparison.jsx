const DS = () => window.VivumAIDesignSystem_b2be15;

const ROWS = [
  {
    dim: 'Learning Paradigm',
    ours: { title: 'Dynamic Learning', body: 'Dynamic Learning, sometimes referred to as Liquid Learning, enables AI models to continuously learn and adapt in real-time, without the need for offline retraining or simulations. Leverages techniques like Liquid Time-Constant Networks (LTCs), Continuous Time Recurrent Neural Networks (CTRNNs), and reservoir models to create highly adaptive, efficient systems.' },
    theirs: { title: 'Deep and Reinforcement Learning', body: 'Deep learning and reinforcement learning, the most widely-used approaches in modern AI, train large neural networks on vast datasets. They often require extensive offline training (and simulation) and lack real-time adaptability, making them less suitable for dynamic environments. Updating the models with new data typically involves time-consuming and resource-intensive retraining.' },
  },
  {
    dim: 'Computational Basis',
    ours: { title: 'Actual Neural Circuitry', body: 'Bio-inspired algorithms that mimic the principles of natural evolution and the brain’s plasticity.' },
    theirs: { title: 'Synthetic Neural Networks', body: 'Artificial networks composed of interconnected nodes, organized into hierarchical layers, that learn from data.' },
  },
  {
    dim: 'Data Processing',
    ours: { title: 'Continuous and Dynamic', body: 'Online learning from high-velocity, high-volume data streams in real-time. Evolutionary AI is designed to process data continuously, updating its models without the need for batch processing or offline training.' },
    theirs: { title: 'Discrete and Static', body: 'Offline training on large, static datasets that have been carefully curated and annotated. Deep learning models are extremely data-hungry, often requiring millions of labeled examples to achieve state-of-the-art performance. Once trained, these models can be deployed for efficient inference on new data but struggle to adapt to changing environments.' },
  },
  {
    dim: 'Explainability',
    ours: { title: 'Transparent and Interpretable', body: 'Evolutionary AI offers greater transparency and interpretability through techniques like rule extraction, decision trees, and attention-gated routing. These mechanisms provide human-readable explanations for the model’s predictions, making it easier to debug, audit, and trust. Crucial for high-stakes applications in autonomous systems and robotics.' },
    theirs: { title: 'Black Box Models', body: 'Conventional deep learning models are notoriously opaque and difficult to interpret, often described as “black boxes.” Due to their complex, nonlinear structure, it can be challenging to trace how specific inputs lead to particular outputs. This lack of explainability hinders adoption in mission-critical applications where accountability and transparency are paramount.' },
  },
  {
    dim: 'Key Advantages',
    ours: { title: 'Adaptability, Efficiency, Real-Time Learning', body: 'Evolutionary AI excels in dynamic environments, continuously learning and adapting to new data patterns without the need for retraining. Its brain-inspired computational basis enables highly efficient processing, making it suitable for edge devices and energy-constrained applications. Ideal for autonomous systems, robotics, and sensor fusion.' },
    theirs: { title: 'High Performance on Specific Tasks', body: 'Deep learning has achieved state-of-the-art results on a wide range of tasks, particularly in areas like computer vision, natural language processing, and pattern recognition. Well-established frameworks, tools, and large pre-trained models are readily available, making it easier to develop and deploy deep learning solutions for specific applications.' },
  },
  {
    dim: 'Use Cases',
    ours: { list: ['Autonomous Vehicles', 'Advanced Robotics', 'Edge Computing', 'Sensor Fusion', 'Anomaly Detection', 'Predictive Maintenance', 'Real-Time Decision Making', 'High Frequency / Volume Networks'] },
    theirs: { list: ['Image and Speech Recognition', 'Natural Language Processing', 'Recommendation Systems', 'Fraud Detection', 'Medical Diagnosis', 'Predictive Analytics'] },
  },
];

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

const LABEL = { fontSize: 12.5, fontWeight: 600, letterSpacing: 'var(--track-label)', textTransform: 'uppercase' };
const MICRO = { fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1 };

/* How the Evolutionary AI column is set apart from Conventional AI — every option stays inside
   the page's existing amber/hairline vocabulary, nothing invented. `none`/`tint` were already
   here; `rule`/`glow`/`corner` are the new subtle alternatives, all still just a border color,
   a low-alpha wash, or a tiny label chip — never a solid fill. */
const OURS_EMPHASIS = {
  none: { edge: 'var(--line-hairline)', fill: 'transparent' },
  rule: { edge: 'var(--vv-amber-24)', fill: 'transparent' },
  glow: { edge: 'var(--line-hairline)', fill: 'radial-gradient(130% 160% at 0% 0%, var(--vv-amber-08), transparent 62%)' },
  corner: { edge: 'var(--line-hairline)', fill: 'transparent', chip: true },
};
/* Tint is the one emphasis with user-adjustable color/opacity (Tweaks), so its fill is built
   from raw rgb + a live alpha instead of a fixed token like the other variants. */
const TINT_RGB = { blue: '40,129,181', amber: '236,154,0', ice: '218,232,242', green: '34,166,110' };
function oursStyle(emphasis, tintColor = 'blue', tintOpacity = 0.08) {
  if (emphasis === 'tint') {
    const rgb = TINT_RGB[tintColor] || TINT_RGB.blue;
    return { edge: '1px solid var(--line-hairline)', fill: `rgba(${rgb}, ${tintOpacity})`, chip: false };
  }
  const e = OURS_EMPHASIS[emphasis] || OURS_EMPHASIS.none;
  return { edge: `1px solid ${e.edge}`, fill: e.fill, chip: !!e.chip };
}

/* Which side you are reading is carried by an amber tick and text color, not by a filled cell —
   the same way the rest of the page marks emphasis. `marker` swaps the tick for a small amber
   icon (checkmark family) instead — same role, same color, different glyph. */
function Marker({ marker, size = 14 }) {
  if (!marker || marker === 'stick') {
    return <span style={{ width: 18, height: 2, background: 'var(--vv-amber)', display: 'block', flex: '0 0 auto' }} />;
  }
  const { Icon } = DS();
  return <Icon name={marker} size={size} color="var(--vv-amber)" style={{ flex: '0 0 auto' }} />;
}
function SideLabel({ ours, chip, marker, mobile }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, ...(ours && chip ? { padding: '5px 12px 5px 8px', margin: '-5px 0 -5px -8px', borderRadius: 999, background: 'var(--vv-amber-08)' } : null) }}>
      {ours ? <Marker marker={marker} size={14} /> : (mobile ? <span style={{ width: 18, height: 2, background: 'var(--text-label)', display: 'block', flex: '0 0 auto' }} /> : null)}
      <span style={{ ...MICRO, color: ours ? 'var(--vv-ice)' : 'var(--text-label)' }}>{ours ? 'Evolutionary AI' : 'Conventional AI'}</span>
    </div>
  );
}

function Chips({ items, ours }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {items.map((t) => (
        <span key={t} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 26, padding: '5px 10px', lineHeight: 1.3, borderRadius: 'var(--radius-sm)', border: '1px solid var(--line-hairline)', fontSize: 12.5, color: ours ? 'var(--vv-ice-82)' : 'var(--text-secondary)' }}>{t}</span>
      ))}
    </div>
  );
}

/* One cell's content. Every border in the table is the same hairline — which side you are
   reading is carried by the header label and the text color, nothing structural. */
function Side({ data, ours, marker, hideMarker, mobile }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 10 : 12 }}>
      {data.title ? (
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10, fontSize: mobile ? 14.5 : 18, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3, color: ours ? 'var(--vv-ice)' : 'var(--text-secondary)', textWrap: 'pretty' }}>
          {ours && !hideMarker ? <Marker marker={marker} size={13} /> : null}
          <span>{data.title}</span>
        </h3>
      ) : null}
      {data.body ? (
        <p style={{ margin: 0, fontSize: mobile ? 14.5 : 14, lineHeight: 1.6, color: 'var(--text-secondary)', textWrap: 'pretty' }}>{data.body}</p>
      ) : null}
      {data.list ? <Chips items={data.list} ours={ours} /> : null}
    </div>
  );
}

/* ── Ledger: the table as a spec sheet. No fills anywhere; hairlines do the structure and one
   continuous amber rule marks the column that matters. ─────────────────────────────────────── */
function Ledger({ emphasis, tintColor, tintOpacity, marker, sticky, stacked, mobile }) {
  const { edge: oursEdge, chip } = oursStyle(emphasis, tintColor, tintOpacity);
  const edgeStyle = mobile ? { borderLeft: 'none', paddingLeft: 0 } : {};
  const head = { ...LABEL, padding: '22px 0 20px', borderBottom: '1px solid var(--line-hairline)', display: 'flex', alignItems: 'center', gap: 12, ...(sticky ? { position: 'sticky', top: 0, zIndex: 2, background: 'var(--vv-navy-72)', backdropFilter: 'blur(10px)' } : null) };
  const pad = 'clamp(20px, 2.2vw, 32px)';
  const cell = { padding: `28px 0`, borderBottom: '1px solid var(--line-hairline)' };
  if (stacked) {
    const dimStyle = mobile
      ? { fontSize: 15.5, fontWeight: 700, letterSpacing: '-0.005em', textTransform: 'none', color: 'var(--vv-ice)' }
      : { ...LABEL, color: 'var(--text-label)' };
    return (
      <div style={{ borderTop: '1px solid var(--line-hairline)' }}>
        {ROWS.map((r, i) => (
          <Reveal key={r.dim} variant="up" delay={i * 90} dur={560} style={{ padding: mobile ? '36px 0' : '28px 0', borderBottom: '1px solid var(--line-hairline)', display: 'flex', flexDirection: 'column', gap: mobile ? 22 : 20 }}>
            <span style={dimStyle}>{r.dim}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 10 : 12, paddingLeft: 16, borderLeft: oursEdge, ...edgeStyle }}>
              <SideLabel ours chip={chip} marker={marker} />
              <Side data={r.ours} ours marker={marker} hideMarker={mobile} mobile={mobile} />
            </div>            <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 10 : 12, paddingLeft: 16, borderLeft: '1px solid var(--line-hairline)', marginTop: mobile ? 14 : 0, ...edgeStyle }}>
              <SideLabel mobile={mobile} />
              <Side data={r.theirs} mobile={mobile} />
            </div>
          </Reveal>
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 232px) 1fr 1fr', borderTop: '1px solid var(--line-hairline)' }}>
      {/* Each cell reveals on its own, not the row as a block: a wrapper element per row would
         have to be a grid item and would collapse the three tracks. Delay is row-major with a
         per-column step, so every row animates and inside each row the left column always
         leads the right. */}
      <Reveal variant="up" dur={460} delay={0} style={{ ...head, paddingRight: pad }} />
      <Reveal variant="up" dur={460} delay={65} style={{ ...head, paddingLeft: pad, paddingRight: pad, borderLeft: oursEdge, ...edgeStyle }}>
        <SideLabel ours chip={chip} marker={marker} />
      </Reveal>
      <Reveal variant="up" dur={460} delay={130} style={{ ...head, paddingLeft: pad, borderLeft: '1px solid var(--line-hairline)', ...edgeStyle }}>
        <SideLabel />
      </Reveal>
      {ROWS.map((r, i) => [
        <Reveal key={`${r.dim}-d`} variant="up" dur={480} delay={100 + i * 95} style={{ ...cell, paddingRight: pad, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <span style={{ ...LABEL, color: 'var(--text-label)' }}>{r.dim}</span>
        </Reveal>,
        <Reveal key={`${r.dim}-o`} variant="up" dur={480} delay={165 + i * 95} style={{ ...cell, paddingLeft: pad, paddingRight: pad, borderLeft: oursEdge, ...edgeStyle }}>
          <Side data={r.ours} ours marker={marker} hideMarker={mobile} mobile={mobile} />
        </Reveal>,
        <Reveal key={`${r.dim}-t`} variant="up" dur={480} delay={230 + i * 95} style={{ ...cell, paddingLeft: pad, borderLeft: '1px solid var(--line-hairline)', ...edgeStyle }}>
          <Side data={r.theirs} mobile={mobile} />
        </Reveal>,
      ])}
    </div>
  );
}

/* ── Cards: the same content in the chamfered frames used by Evolutionary AI, one per
   dimension, so the comparison reads as part of that family rather than as a table. ───────── */
function CmpCard({ row, stacked, emphasis, tintColor, tintOpacity, marker, chamferFill = 'rgba(218,232,242,0.02)', mobile }) {
  const { Bezel, Divider } = DS();
  const [hot, setHot] = React.useState(false);
  const { edge: oursEdge, fill: oursFill, chip } = oursStyle(emphasis, tintColor, tintOpacity);
  return (
    <Bezel accent={false} chamfer={16} weight={1} pad="clamp(24px, 2.4vw, 30px)"
      color={hot ? 'var(--vv-ice-14)' : 'var(--line-hairline)'}
      fill={hot ? 'rgba(218,232,242,0.05)' : chamferFill}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ transition: 'none', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, height: '100%' }}>
        <span style={{ ...LABEL, color: 'var(--text-label)' }}>{row.dim}</span>
        <Divider />
        <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 16, borderLeft: oursEdge, background: oursFill }}>
            <SideLabel ours chip={chip} marker={marker} />
            <Side data={row.ours} ours marker={marker} hideMarker={mobile} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 16, borderLeft: '1px solid var(--line-hairline)' }}>
            <SideLabel />
            <Side data={row.theirs} />
          </div>
        </div>
      </div>
    </Bezel>
  );
}

/* ── Spine: no frames and no label column. The dimension names become ruled bands running down
   the section, which keeps the full container width for the two descriptions. ─────────────── */
function Spine({ stacked, emphasis, tintColor, tintOpacity, marker, mobile }) {
  const { edge: oursEdge, fill: oursFill, chip } = oursStyle(emphasis, tintColor, tintOpacity);
  const pad = 'clamp(20px, 2.4vw, 36px)';
  return (
    <div>
      {ROWS.map((r, i) => (
        <Reveal key={r.dim} variant="up" delay={i * 90} dur={560} style={{ borderTop: '1px solid var(--line-hairline)', padding: '32px 0 36px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24 }}>
            <span style={{ ...LABEL, color: 'var(--text-label)' }}>{r.dim}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: 'clamp(24px, 3vw, 56px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: pad, borderLeft: oursEdge, background: oursFill }}>
              <SideLabel ours chip={chip} marker={marker} />
              <Side data={r.ours} ours marker={marker} hideMarker={mobile} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: pad, borderLeft: '1px solid var(--line-hairline)' }}>
              <SideLabel />
              <Side data={r.theirs} />
            </div>
          </div>
        </Reveal>
      ))}
      <div style={{ borderTop: '1px solid var(--line-hairline)' }} />
    </div>
  );
}

function ComparisonSection({ layout = 'ledger', emphasis = 'none', tintColor = 'blue', tintOpacity = 0.08, marker = 'stick', sticky = false, chamferFill = 'rgba(218,232,242,0.02)' }) {
  const { GradientField, Eyebrow, SectionFrame } = DS();
  const stacked = useMaxWidth(1024);
  const mobile = useMaxWidth(1024);
  const trueMobile = useMaxWidth(640);
  const tablet = mobile && !trueMobile;
  const gutter = 'clamp(24px, 2.6vw, 40px)';
  return (
    /* field="none": was "crest" — the bloom is off, the field kept for future use. */
    <GradientField field="none" pad={trueMobile ? 'clamp(64px, 15vw, 96px) var(--gutter-site)' : 'clamp(40px, 4.2vw, 72px) var(--gutter-site)'} as="section" id="comparison">
      <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
        {/* Same chamfered SectionFrame as the sections above: copyMax="100%" + contentStyle keep
           the frame's own balanced padding, so the heading and the comparison layout below it
           share one container instead of sitting bare on the page. */}
        {/* group: the comparison table runs several screens tall, so its rows follow the
           frame's trigger instead of their own position — the whole section assembles from
           the moment its top edge is in view rather than unrolling as the user scrolls. */}
        <Reveal variant={mobile ? 'up' : 'frame'} dur={660} group>
        <SectionFrame copyMax="100%" stacked={stacked} gap={0} contentStyle={{ maxWidth: '100%' }} fill={mobile ? 'transparent' : chamferFill}
          {...(mobile ? { chamfer: 0, color: 'transparent', blur: 0, accent: false, pad: '0px' } : null)}>
          {/* No measure cap on this heading: it is short enough to hold one line at the full
             frame width, and only wraps once the screen is narrower than the line. */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Eyebrow><HudText text="Comparative Analysis" speed={26} delay={220} /></Eyebrow>
            <Reveal as="h2" variant="text" dur={760} delay={260} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', textWrap: mobile ? 'wrap' : 'balance' }}>
              Our <span style={{ color: 'var(--vv-amber)' }}>Evolutionary AI</span> vs. Conventional AI
            </Reveal>
          </div>

          <div style={{ marginTop: 'clamp(36px, 3.6vw, 56px)' }}>
            {layout === 'cards' ? (
              <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: gutter, alignItems: 'stretch' }}>
                {ROWS.map((r, i) => <Reveal key={r.dim} variant="frame" delay={i * 100} dur={620} style={{ height: '100%' }}><CmpCard row={r} stacked={stacked} emphasis={emphasis} tintColor={tintColor} tintOpacity={tintOpacity} marker={marker} chamferFill={chamferFill} mobile={mobile} /></Reveal>)}
              </div>
            ) : layout === 'spine' ? (
              <Spine stacked={stacked} emphasis={emphasis} tintColor={tintColor} tintOpacity={tintOpacity} marker={marker} mobile={mobile} />
            ) : (
              <Ledger emphasis={emphasis} tintColor={tintColor} tintOpacity={tintOpacity} marker={marker} sticky={sticky} stacked={stacked} mobile={mobile} />
            )}
          </div>
        </SectionFrame>
        </Reveal>
      </div>
    </GradientField>
  );
}

Object.assign(window, { ComparisonSection });
