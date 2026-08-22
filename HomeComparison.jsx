const DS = () => window.VivumDS || window.VivumAIDesignSystem_b2be15;

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

/* Which side you are reading is carried by an amber tick and text color, not by a filled cell —
   the same way the rest of the page marks emphasis. */
function SideLabel({ ours }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      {ours ? <span style={{ width: 18, height: 2, background: 'var(--vv-amber)', display: 'block', flex: '0 0 auto' }} /> : null}
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
function Side({ data, ours }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {data.title ? (
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3, color: ours ? 'var(--vv-ice)' : 'var(--text-secondary)', textWrap: 'pretty' }}>{data.title}</h3>
      ) : null}
      {data.body ? (
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)', textWrap: 'pretty' }}>{data.body}</p>
      ) : null}
      {data.list ? <Chips items={data.list} ours={ours} /> : null}
    </div>
  );
}

/* ── Ledger: the table as a spec sheet. No fills anywhere; hairlines do the structure and one
   continuous amber rule marks the column that matters. ─────────────────────────────────────── */
function Ledger({ emphasis, sticky, stacked }) {
  const oursEdge = '1px solid var(--line-hairline)';
  const oursFill = emphasis === 'tint' ? 'var(--vv-blue-08)' : 'transparent';
  const head = { ...LABEL, padding: '22px 0 20px', borderBottom: '1px solid var(--vv-ice-24)', display: 'flex', alignItems: 'center', gap: 12, ...(sticky ? { position: 'sticky', top: 0, zIndex: 2, background: 'var(--vv-navy-72)', backdropFilter: 'blur(10px)' } : null) };
  const pad = 'clamp(20px, 2.2vw, 32px)';
  const cell = { padding: `28px 0`, borderBottom: '1px solid var(--line-hairline)' };
  if (stacked) {
    return (
      <div style={{ borderTop: '1px solid var(--line-hairline)' }}>
        {ROWS.map((r) => (
          <div key={r.dim} style={{ padding: '28px 0', borderBottom: '1px solid var(--line-hairline)', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ ...LABEL, color: 'var(--text-label)' }}>{r.dim}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 16, borderLeft: oursEdge, background: oursFill }}>
              <SideLabel ours />
              <Side data={r.ours} ours />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 16, borderLeft: '1px solid var(--line-hairline)' }}>
              <SideLabel />
              <Side data={r.theirs} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 232px) 1fr 1fr', borderTop: '1px solid var(--line-hairline)' }}>
      <div style={{ ...head, paddingRight: pad }} />
      <div style={{ ...head, paddingLeft: pad, paddingRight: pad, borderLeft: oursEdge }}>
        <SideLabel ours />
      </div>
      <div style={{ ...head, paddingLeft: pad, borderLeft: '1px solid var(--line-hairline)' }}>
        <SideLabel />
      </div>
      {ROWS.map((r) => [
        <div key={`${r.dim}-d`} style={{ ...cell, paddingRight: pad, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <span style={{ ...LABEL, color: 'var(--text-label)' }}>{r.dim}</span>
        </div>,
        <div key={`${r.dim}-o`} style={{ ...cell, paddingLeft: pad, paddingRight: pad, borderLeft: oursEdge, background: oursFill }}>
          <Side data={r.ours} ours />
        </div>,
        <div key={`${r.dim}-t`} style={{ ...cell, paddingLeft: pad, borderLeft: '1px solid var(--line-hairline)' }}>
          <Side data={r.theirs} />
        </div>,
      ])}
    </div>
  );
}

/* ── Cards: the same content in the chamfered frames used by Evolutionary AI, one per
   dimension, so the comparison reads as part of that family rather than as a table. ───────── */
function CmpCard({ row, stacked }) {
  const { Bezel, Divider } = DS();
  const [hot, setHot] = React.useState(false);
  const oursEdge = '1px solid var(--line-hairline)';
  return (
    <Bezel accent={false} chamfer={16} weight={1} pad="clamp(24px, 2.4vw, 30px)"
      color={hot ? 'var(--vv-ice-14)' : 'var(--line-hairline)'}
      fill={hot ? 'rgba(218,232,242,0.05)' : 'rgba(218,232,242,0.02)'}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ transition: 'none', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, height: '100%' }}>
        <span style={{ ...LABEL, color: 'var(--text-label)' }}>{row.dim}</span>
        <Divider />
        <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 16, borderLeft: oursEdge }}>
            <SideLabel ours />
            <Side data={row.ours} ours />
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
function Spine({ stacked }) {
  const oursEdge = '1px solid var(--line-hairline)';
  const pad = 'clamp(20px, 2.4vw, 36px)';
  return (
    <div>
      {ROWS.map((r) => (
        <div key={r.dim} style={{ borderTop: '1px solid var(--line-hairline)', padding: '32px 0 36px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24 }}>
            <span style={{ ...LABEL, color: 'var(--text-label)' }}>{r.dim}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: 'clamp(24px, 3vw, 56px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: pad, borderLeft: oursEdge }}>
              <SideLabel ours />
              <Side data={r.ours} ours />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: pad, borderLeft: '1px solid var(--line-hairline)' }}>
              <SideLabel />
              <Side data={r.theirs} />
            </div>
          </div>
        </div>
      ))}
      <div style={{ borderTop: '1px solid var(--line-hairline)' }} />
    </div>
  );
}

function ComparisonSection({ layout = 'ledger', emphasis = 'none', sticky = false }) {
  const { GradientField, Eyebrow } = DS();
  const stacked = useMaxWidth(900);
  const gutter = 'clamp(24px, 2.6vw, 40px)';
  return (
    /* field="none": was "crest" — the bloom is off, the field kept for future use. */
    <GradientField field="none" pad="clamp(48px, 5vw, 88px) var(--gutter-site)" as="section" id="comparison">
      <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto' }}>
        {/* No measure cap on this heading: it is short enough to hold one line at the full
           container width, and only wraps once the screen is narrower than the line. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Eyebrow>Comparative Analysis</Eyebrow>
          <h2 style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', textWrap: 'balance' }}>
            Our <span style={{ color: 'var(--vv-amber)' }}>Evolutionary AI</span> vs. Conventional AI
          </h2>
        </div>

        <div style={{ marginTop: 'clamp(48px, 5vw, 72px)' }}>
          {layout === 'cards' ? (
            <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: gutter, alignItems: 'stretch' }}>
              {ROWS.map((r) => <CmpCard key={r.dim} row={r} stacked={stacked} />)}
            </div>
          ) : layout === 'spine' ? (
            <Spine stacked={stacked} />
          ) : (
            <Ledger emphasis={emphasis} sticky={sticky} stacked={stacked} />
          )}
        </div>
      </div>
    </GradientField>
  );
}

Object.assign(window, { ComparisonSection });
