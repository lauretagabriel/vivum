const DS = () => window.VivumDS || window.VivumAIDesignSystem_b2be15;

function BriefingScreen({ onToast }) {
  const { GradientField, Eyebrow, Panel, Input, Select, Checkbox, Button, Modal, Divider, Icon, StatusDot } = DS();
  const [sent, setSent] = React.useState(false);
  const [org, setOrg] = React.useState('');
  return (
    <div style={{ position: 'relative' }}>
      <GradientField field="left" pad="150px var(--gutter-site) 130px" as="section" style={{ minHeight: 860 }}>
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 560px', gap: 96, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Eyebrow>Briefing</Eyebrow>
            <h1 style={{ margin: 0, fontSize: 'clamp(30px, 3.2vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, color: 'var(--vv-ice)' }}>
              Forty-Five Minutes, No Slideware
            </h1>
            <p style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', maxWidth: 520 }}>
              We walk the runtime, the adaptation loop, and what integration looks like on your hardware. Bring an engineer.
            </p>
            <Divider spacing={12} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                ['schedule', 'Scheduling', 'Within ten business days, remote or on site.'],
                ['groups', 'Who attends', 'Two from Vivum: one systems, one research.'],
                ['lock', 'Handling', 'Under NDA on request. No recordings.'],
              ].map(([icon, k, v]) => (
                <div key={k} style={{ display: 'flex', gap: 16 }}>
                  <Icon name={icon} size={20} color="var(--vv-blue)" style={{ marginTop: 2 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--vv-ice)' }}>{k}</span>
                    <span style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--text-secondary)' }}>{v}</span>
                  </div>
                </div>
              ))}
            </div>
            <StatusDot tone="live" mono style={{ marginTop: 8 }}>Next available · 3 Sep 2026</StatusDot>
          </div>

          <Panel title="Request a briefing" meta="All fields required unless marked optional" pad={28}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Input label="Name" placeholder="Full name" />
                <Input label="Work email" placeholder="name@organization.gov" type="email" />
              </div>
              <Input label="Organization" placeholder="Program office, prime, or operator" value={org} onChange={(e) => setOrg(e.target.value)} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Select label="Domain" options={['Air', 'Land', 'Sea', 'Space', 'Edge devices']} defaultValue="Land" />
                <Select label="Stage" options={['Evaluating', 'Prototyping', 'Program of record']} defaultValue="Prototyping" />
              </div>
              <Input label="Platform (optional)" placeholder="Airframe, hull, or compute module" hint="Helps us bring the right engineer." />
              <Divider spacing={2} />
              <Checkbox label="Under NDA" hint="We will send our mutual NDA before the call." />
              <Checkbox label="Send the capability overview first" defaultChecked />
              <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                <Button variant="primary" fullWidth icon="arrow_forward" onClick={() => setSent(true)}>Submit request</Button>
              </div>
              <span style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-caption)' }}>
                Export-controlled discussions are handled separately — write to <a href="#">brand@vivum.ai</a>.
              </span>
            </div>
          </Panel>
        </div>
      </GradientField>

      <Modal open={sent} width={460} title="Request received" meta={org ? `Organization · ${org}` : 'We reply within two business days'}
        onClose={() => setSent(false)}
        actions={<><Button variant="secondary" size="sm" onClick={() => setSent(false)}>Close</Button>
          <Button variant="primary" size="sm" onClick={() => { setSent(false); onToast({ title: 'Overview sent', body: 'Capability overview · PDF · 2.4 MB', tone: 'live' }); }}>Send overview now</Button></>}>
        A systems engineer will confirm a slot within two business days. Nothing else is needed from you.
      </Modal>
    </div>
  );
}

Object.assign(window, { BriefingScreen });
