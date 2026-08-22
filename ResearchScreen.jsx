const DS = () => window.VivumDS || window.VivumAIDesignSystem_b2be15;

const NOTES = [
  { id: 1, date: '2026-07-28', kind: 'Paper', title: 'Bounded On-Device Evolution Under Fixed Power Envelopes', tag: 'Edge', read: '18 min' },
  { id: 2, date: '2026-06-11', kind: 'Field note', title: 'Mojave Trial: 118 Units, 90-Second Adaptation Windows', tag: 'Land', read: '7 min' },
  { id: 3, date: '2026-05-02', kind: 'Paper', title: 'Provenance for Models That Change After Deployment', tag: 'Governance', read: '22 min' },
  { id: 4, date: '2026-03-19', kind: 'Field note', title: 'Sea State 5: Perception Without a Horizon Reference', tag: 'Sea', read: '9 min' },
  { id: 5, date: '2026-02-04', kind: 'Paper', title: 'Why Trained Control Fails Outside Its Distribution', tag: 'Theory', read: '26 min' },
];

function ResearchScreen({ onToast }) {
  const { GradientField, Eyebrow, Badge, Divider, Button, Select, Input, EmptyState, Icon, Sheet } = DS();
  const [kind, setKind] = React.useState('All');
  const [q, setQ] = React.useState('');
  const rows = NOTES.filter((n) => (kind === 'All' || n.kind === kind) && n.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <GradientField field="data" pad="150px var(--gutter-site) 100px" as="section">
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Eyebrow>Research</Eyebrow>
          <h1 style={{ margin: 0, fontSize: 'clamp(30px, 3.2vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, color: 'var(--vv-ice)', maxWidth: 860 }}>
            Papers and Field Notes
          </h1>
          <p style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', maxWidth: 640 }}>
            What we learned, in the order we learned it. Field notes are written the week the trial ends.
          </p>
        </div>
      </GradientField>

      <section style={{ padding: '72px var(--gutter-site) 96px' }}>
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <Input label="Search" icon="search" placeholder="Adaptation, provenance…" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 300 }} />
              <Select label="Type" options={['All', 'Paper', 'Field note']} value={kind} onChange={(e) => setKind(e.target.value)} style={{ width: 190 }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-caption)' }}>{rows.length} of {NOTES.length} entries</span>
          </div>

          <div style={{ marginTop: 40 }}>
            {rows.length === 0 ? (
              <EmptyState icon="search_off" title="Nothing matches that filter"
                action={<Button variant="secondary" size="sm" onClick={() => { setQ(''); setKind('All'); }}>Clear filters</Button>}>
                Try a broader term, or clear the filters to see all entries.
              </EmptyState>
            ) : rows.map((n) => (
              <div key={n.id}>
                <a href="#" onClick={(e) => { e.preventDefault(); onToast({ title: 'Opening entry', body: n.title, tone: 'live' }); }}
                  style={{ display: 'grid', gridTemplateColumns: '132px 1fr 130px 92px 28px', gap: 28, alignItems: 'center', padding: '22px 0', color: 'inherit' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-caption)' }}>{n.date}</span>
                  <span style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--vv-ice)' }}>{n.title}</span>
                  <Badge tone={n.kind === 'Paper' ? 'blue' : 'graphite'}>{n.kind}</Badge>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-caption)' }}>{n.read}</span>
                  <Icon name="north_east" size={17} color="var(--vv-graphite)" />
                </a>
                <Divider />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 var(--gutter-site) 104px' }}>
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto' }}>
          <Sheet pad={56} maxWidth="100%">
            <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 'var(--track-label)', textTransform: 'uppercase', color: 'var(--text-caption-on-light)' }}>White paper</span>
                <h3 style={{ margin: 0, fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-heading-on-light)' }}>
                  Bounded On-Device Evolution Under Fixed Power Envelopes
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--text-body-on-light)', maxWidth: 640 }}>
                  How an adaptation loop can improve a deployed model without exceeding the power, thermal, and latency budget it shipped with — and how each change stays reversible.
                </p>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <Button variant="onLight" size="md" iconAfter="north_east">Read the paper</Button>
                  <Button variant="quiet" size="md" style={{ color: 'var(--vv-blue)' }}>Cite</Button>
                </div>
              </div>
              <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[['Published', '28 Jul 2026'], ['Authors', 'Vivum Research'], ['Pages', '18'], ['DOI', '10.0000/vivum.2026.07']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingBottom: 10, borderBottom: '1px solid var(--line-on-light)' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-caption-on-light)' }}>{k}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-body-on-light)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </Sheet>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { ResearchScreen });
