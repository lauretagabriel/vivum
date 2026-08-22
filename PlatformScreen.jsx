const DS = () => window.VivumDS || window.VivumAIDesignSystem_b2be15;

function PlatformScreen({ onNavigate }) {
  const { GradientField, Eyebrow, Panel, DataTable, Stat, Divider, Icon, Button, Badge, Switch } = DS();
  const [compare, setCompare] = React.useState(false);
  return (
    <div>
      <GradientField field="crest" pad="150px var(--gutter-site) 110px" as="section">
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Eyebrow>Platform</Eyebrow>
          <h1 style={{ margin: 0, fontSize: 'clamp(30px, 3.2vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, color: 'var(--vv-ice)', maxWidth: 900 }}>
            Adaptive Systems That Surpass Trained Control
          </h1>
          <p style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', maxWidth: 720 }}>
            Three parts: a runtime that fits the hardware you already fly, an adaptation loop that keeps improving in the field, and a ground view that stays out of the control path.
          </p>
        </div>
      </GradientField>

      <section style={{ padding: '96px var(--gutter-site)' }}>
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line-hairline)' }}>
            {[
              { icon: 'memory', title: 'Edge Runtime', body: 'INT8 inference on existing compute. No accelerator dependency, no cloud round-trip, deterministic scheduling.', tag: 'v2.14.0' },
              { icon: 'account_tree', title: 'Adaptation Loop', body: 'On-device evolution inside a bounded envelope. Every change is versioned, reversible, and auditable.', tag: 'bounded' },
              { icon: 'monitoring', title: 'Ground View', body: 'Read-only telemetry, model provenance, and fleet health. Operators observe; the vehicle decides.', tag: 'read-only' },
            ].map((c) => (
              <div key={c.title} style={{ background: 'var(--surface-canvas)', padding: '32px 30px', display: 'flex', flexDirection: 'column', gap: 18, minHeight: 260 }}>
                <Icon name={c.icon} size={26} color="var(--vv-amber)" />
                <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--vv-ice)' }}>{c.title}</span>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-secondary)', flex: 1 }}>{c.body}</p>
                <Badge tone="graphite" mono style={{ alignSelf: 'flex-start' }}>{c.tag}</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GradientField field="core" pad="130px var(--gutter-site)" as="section">
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Eyebrow>Specifications</Eyebrow>
              <h2 style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)' }}>Reference Envelope</h2>
            </div>
            <Switch label="Compare against baseline" checked={compare} onChange={setCompare} style={{ minWidth: 320 }} />
          </div>
          <Panel pad={0}>
            <DataTable columns={[
              { key: 'k', label: 'Metric' },
              { key: 'air', label: 'Air', mono: true, align: 'right', tone: 'data' },
              { key: 'land', label: 'Land', mono: true, align: 'right', tone: 'data' },
              { key: 'sea', label: 'Sea', mono: true, align: 'right', tone: 'data' },
              { key: 'edge', label: 'Edge', mono: true, align: 'right', tone: 'data' },
              ...(compare ? [{ key: 'base', label: 'Baseline', mono: true, align: 'right', tone: 'muted' }] : []),
            ]} rows={[
              { k: 'Inference latency', air: '4.2 ms', land: '4.6 ms', sea: '5.1 ms', edge: '3.8 ms', base: '11.9 ms' },
              { k: 'Power draw, peak', air: '11.4 W', land: '14.0 W', sea: '9.8 W', edge: '6.2 W', base: '28.5 W' },
              { k: 'Adaptation window', air: '90 s', land: '120 s', sea: '240 s', edge: '60 s', base: 'offline' },
              { k: 'Uplink required', air: '0 kbps', land: '0 kbps', sea: '0 kbps', edge: '0 kbps', base: '2 Mbps' },
            ]} />
          </Panel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, paddingTop: 8 }}>
            <Stat value="3×" label="Faster than trained control" />
            <Stat value="2.4×" label="Lower power envelope" />
            <Stat value="118" label="Units in field trial" />
            <Stat value="24 h" label="Rollback window" />
          </div>
        </div>
      </GradientField>

      <section style={{ padding: '88px var(--gutter-site)' }}>
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <p style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--vv-ice)', maxWidth: 700 }}>
            Integration starts with your hardware, not ours.
          </p>
          <Button variant="primary" icon="arrow_forward" onClick={() => onNavigate('/briefing')}>Request a briefing</Button>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { PlatformScreen });
