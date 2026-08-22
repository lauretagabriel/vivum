const DS = () => window.VivumDS || window.VivumAIDesignSystem_b2be15;

const NEURAL_TRAITS = [
  { icon: 'arrows-rotate', title: 'Adaptive Learning', body: 'Continuously update knowledge based on new experiences.' },
  { icon: 'clock', title: 'Temporal Awareness', body: 'Seamlessly integrate and process information over time.' },
  { icon: 'circle-nodes', title: 'Contextual Understanding', body: 'Interpret data within the context of the environment.' },
  { icon: 'memory', title: 'Efficient Computation', body: 'Perform complex tasks with minimal memory consumption.' },
];

const EVO_PILLARS = [
  { icon: 'dna', title: 'Natural Selection Optimization', body: 'Our IP Core utilizes Genetic Algorithms and other Evolutionary Algorithms to simulate natural selection as a singular force for generating diverse solutions across processors and models, evolving AI systems that meet specific goals or behaviors. We don\u2019t explicitly program AI agents; instead, our approach creates evolutionary pressures that favor high-performing solutions, resulting in more efficient and adaptable AI systems.' },
  { icon: 'gauge-high', title: 'Accelerated Artificial Evolution', body: 'We leverage reconfigurable hardware like FPGAs to dramatically speed up neural circuit evaluations to evolve Dynamic Neural Networks, achieving results orders of magnitude faster than traditional methods. Our proprietary high-throughput system significantly reduces the cost and development time typically associated with training complex neural networks, making advanced tailored AI solutions more accessible and efficient.' },
  { icon: 'brain-circuit', title: 'Dynamic Neural Networks', body: 'Our Dynamic Neural Models generate explainable, contextual responses to new stimuli, adapting in real-time to unfamiliar scenarios. This approach enables our solutions to efficiently tackle complex, time-dependent tasks with greater decision transparency than conventional deep and reinforcement learning methods. Crucially, this enhanced explainability ensures safety in mission-critical applications by enabling verification of AI decisions in high-stakes environments.' },
  { icon: 'microchip', title: 'Delivering Legitimate Autonomous Capabilities', body: 'We integrate our evolved models directly into target hardware, whether it\u2019s a CPU, microcontroller, FPGA, or custom ASICs, allowing them to fine-tune to each device\u2019s specific characteristics. This results in highly efficient autonomous systems that require significantly less energy and fewer computational resources, enabling true on-device learning even in size, weight, and power (SWaP) constrained environments.' },
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

/* The traits were four cells divided by vertical hairlines — legible, but a different device
   from every other group of small items on the page. Chamfered frames match Autonomous
   Solutions and the pillars below, and the ice icon keeps the amber for section accents. */
function TraitCard({ item, tone }) {
  const { Bezel, Icon } = DS();
  const [hot, setHot] = React.useState(false);
  return (
    <Bezel accent={false} chamfer={16} weight={1} pad="clamp(22px, 2.2vw, 28px)"
      color={hot ? 'var(--vv-ice-14)' : 'var(--line-hairline)'}
      fill={hot ? 'rgba(218,232,242,0.05)' : 'rgba(218,232,242,0.02)'}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ transition: 'none', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
        <Icon name={item.icon} size={24} color={tone} />
        <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3, color: 'var(--vv-ice)', textWrap: 'balance' }}>{item.title}</h3>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)', textWrap: 'pretty' }}>{item.body}</p>
      </div>
    </Bezel>
  );
}

/* Section 3 — Dynamic Neural Models */
function NeuralSection({ traits = 'cards', tone = 'var(--vv-ice)' }) {
  const { GradientField, Eyebrow, Icon, Badge } = DS();
  const stacked = useMaxWidth(900);
  const tight = useMaxWidth(560);
  const cols = stacked ? (tight ? 1 : 2) : 4;
  return (
    /* field="none": was "data" — the bloom is off, the field kept for future use. */
    <GradientField field="none" pad="clamp(48px, 5vw, 88px) var(--gutter-site)" as="section" id="models">
      <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Eyebrow>Dynamic neural models</Eyebrow>
            <h2 style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)' }}>
              Dynamic Neural Models: <span style={{ color: 'var(--vv-amber)' }}>Mimic Real Intelligence</span>
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {['LTCs', 'CTRNNs', 'Reservoir models', 'ODEs'].map((t) => <Badge key={t} tone="blue" mono>{t}</Badge>)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-body)' }}>
              Vivum AI pioneers the evolution of Dynamic Neural Models that mimic the fluidity and adaptability of Biological Intelligence. By leveraging techniques such as Liquid Time-Constant Networks (LTCs), Continuous Time Recurrent Neural Networks (CTRNNs), Reservoir Models, and Ordinary Differential Equations (ODEs), we create AI systems that can map human-like perception and decision-making to machines and autonomous systems.
            </p>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
              Inspired by the brain’s intricate workings, our dynamic neural models offer a natural and efficient approach to AI. They excel at processing temporal and sequential data, enabling real-time adaptation and context-aware decision-making.
            </p>
          </div>
        </div>

        {traits === 'columns' ? (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, marginTop: 'clamp(56px, 6vw, 80px)', borderTop: '1px solid var(--line-hairline)' }}>
            {NEURAL_TRAITS.map((t, i) => (
              <div key={t.title} style={{ padding: '30px 26px 30px 0', paddingLeft: i % cols === 0 ? 0 : 26, borderLeft: i % cols === 0 ? 'none' : '1px solid var(--line-hairline)', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 200 }}>
                <Icon name={t.icon} size={24} color={tone} />
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--vv-ice)' }}>{t.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)' }}>{t.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 'clamp(16px, 1.8vw, 24px)', marginTop: 'clamp(56px, 6vw, 80px)', alignItems: 'stretch' }}>
            {NEURAL_TRAITS.map((t) => <TraitCard key={t.title} item={t} tone={tone} />)}
          </div>
        )}
      </div>
    </GradientField>
  );
}

/* Section 4 — Evolutionary Artificial Intelligence */
/* The pillars were four numbered panels of ~60 words each: a wall of text where the enumeration
   was the only thing giving the eye a foothold. Chamfered frames borrowed from Autonomous
   Solutions replace both — the cut corner does the work the number was doing, and clamping the
   body to three lines makes every card the same shape, so the grid reads as a set. The full text
   is one click away rather than rewritten, since this is the client's own copy. */
function EvoCard({ item, cols, showIcon, alwaysFull }) {
  const { Bezel, Divider, Icon } = DS();
  const [hot, setHot] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const full = alwaysFull || open;
  return (
    <Bezel accent={false} chamfer={16} weight={1} pad="clamp(24px, 2.4vw, 32px)"
      color={hot ? 'var(--vv-ice-14)' : 'var(--line-hairline)'}
      fill={hot ? 'rgba(218,232,242,0.05)' : 'rgba(218,232,242,0.02)'}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
      style={{ transition: 'none', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
        {showIcon ? <Icon name={item.icon} size={22} color="var(--vv-amber)" /> : null}
        <h3 style={{ margin: 0, fontSize: cols === 4 ? 19 : 22, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.25, color: 'var(--vv-ice)', textWrap: 'balance' }}>{item.title}</h3>
        <Divider />
        {/* Clamped rather than truncated in the data, so the copy stays editable in place. */}
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: 'var(--text-secondary)', textWrap: 'pretty', ...(full ? null : { display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: cols === 4 ? 4 : 3, overflow: 'hidden' }) }}>{item.body}</p>
        {alwaysFull ? null : (
          <button type="button" onClick={() => setOpen((v) => !v)}
            style={{ appearance: 'none', background: 'none', border: 0, padding: 0, marginTop: 'auto', font: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start', cursor: 'pointer', fontSize: 15, fontWeight: 400, lineHeight: 1, color: hot ? 'var(--vv-amber)' : 'var(--vv-graphite)', transition: 'color 160ms ease' }}>
            {open ? 'Show less' : 'Read more'}
            <span aria-hidden="true" style={{ fontSize: '1.05em', lineHeight: 1, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 160ms ease' }}>&#8595;</span>
          </button>
        )}
      </div>
    </Bezel>
  );
}

function EvolutionarySection({ cols = 2, lede = 'beside', icons = false, body = 'trimmed' }) {
  const { GradientField, Eyebrow } = DS();
  const stacked = useMaxWidth(900);
  const n = stacked ? 1 : cols;
  // One gutter for the header and the grid below it, so the two rows share column edges and the
  // section reads as a single structure instead of a heading floating over unrelated cards.
  const gutter = 'clamp(24px, 2.6vw, 40px)';
  const twoUp = stacked || lede === 'below' ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))';
  return (
    /* field="none": was "right" — the bloom is off, the field kept for future use. */
    <GradientField field="none" pad="clamp(48px, 5vw, 88px) var(--gutter-site)" as="section" id="evolutionary">
      <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: twoUp, columnGap: gutter, rowGap: 'clamp(20px, 2.4vw, 32px)', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Eyebrow>Technical Overview</Eyebrow>
            <h2 style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', textWrap: 'balance' }}>
              <span style={{ color: 'var(--vv-amber)' }}>Evolutionary</span> Artificial Intelligence
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', textWrap: 'pretty', maxWidth: 610, paddingTop: stacked || lede === 'below' ? 0 : 6 }}>
            Our approach utilizes evolutionary algorithms, accelerated via reconfigurable hardware like FPGAs, to develop tailored Dynamic Neural Models for specific hardware platforms. Embedding the models into anything from basic microcontrollers to advanced control systems, Evolutionary AI ensures optimal performance for each unique task and domain.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, gap: gutter, marginTop: 'clamp(48px, 5vw, 72px)', alignItems: 'stretch' }}>
          {EVO_PILLARS.map((p) => (
            <EvoCard key={p.title} item={p} cols={n} showIcon={icons} alwaysFull={body === 'full'} />
          ))}
        </div>
      </div>
    </GradientField>
  );
}

Object.assign(window, { NeuralSection, EvolutionarySection });
