/* Website › Autonomy. Same vocabulary as the homepage — navy canvas, chamfered frames, one
   amber accent per view, HUD reveals — composed differently so the page reads as a chapter
   rather than a second front door:

   · the hero is 74svh, not full-viewport, and carries a mono domain rail instead of a second
     button row, so the page's shape is legible in the first screen;
   · the three advantages are a hairline-gapped triptych (the design system's documented grid
     device, unused on the homepage) under a full-width header, rather than copy-beside-cards;
   · the four domains are ONE tabbed instrument (AutonomyDomains.jsx);
   · the page closes on a split two-prompt band, because the brief has two next steps, not one.

   Nothing above the fold is invented: every headline, claim and capability comes from the
   supplied copy. No figures appear anywhere on this page — none were supplied. */

const DS_A = () => window.VivumAIDesignSystem_b2be15;

const AUT_TWEAKS = /*EDITMODE-BEGIN*/{
  "mobileMenuStyle": "fullscreen",
  "domainLayout": "console",
  "domainScene": "field",
  "domainNav": "rail",
  "domainCaps": "hud",
  "domainFont": "mono",
  "domainCapLink": "auto",
  "domainCorners": false,
  "domainTitleSize": 15,
  "pGlyph": "dot",
  "pCount": 200,
  "pSize": 2.6,
  "pExtent": 1.6,
  "heroRail": true,
  "heroOpacity": 0.2,
  "ctaLayout": "banner",
  "ctaPlate": true,
  "seamAnim": "ribbons",
  "seamSize": 480,
  "seamSpeed": 2,
  "seamX": 0,
  "seamY": 0,
  "seamOpacity": 0.2,
  "mFrame": "rise",
  "mSpeed": 1.2,
  "mDelay": 0,
  "mReplay": false
}/*EDITMODE-END*/;

const AUT_PILLARS = [
  { n: '01', icon: 'brain-circuit', title: 'Legitimate Autonomy', body: 'Dynamic neural models deliver genuinely autonomous capability — not scripted automation.' },
  { n: '02', icon: 'microchip', title: 'On-device Intelligence', body: 'On-device learning puts fast intelligence exactly where the decision has to be made.' },
  { n: '03', icon: 'bolt', title: 'Ultra-efficient', body: 'Dramatically less power and far fewer resources. AI that holds up in the most demanding environments.' },
];

function useAutMax(q) {
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

function useAutMin(q) {
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

/* The hero's domain rail. Uppercase mono labels separated by the brand's middle dot — the one
   sanctioned separator — so a jump-nav over video needs no pill, chip or frosted plate to stay
   legible. Each label sets the hash (the tab strip below listens for it) and walks the page
   down to the instrument, so one tap answers "is my domain here?" and lands on it. */
/* Walks the page to `y` on a timer rather than asking for `behavior: 'smooth'`.
   Two things this has to survive, both real here: native smooth scrolling is silently a no-op
   in embedded contexts (previews, webviews, automation), and requestAnimationFrame is not
   serviced whenever the document is not considered visible. The failure mode of either is the
   worst one available — the tab changes a thousand pixels below the fold and the page appears
   not to respond at all — so this uses the same device Preloader.jsx uses for its rail: an
   interval, eased off the wall clock. Instant when the user asked for less motion, and it
   yields the moment the user scrolls for themselves. */
function vvScrollTo(y, dur = 620) {
  const at = () => window.pageYOffset || document.documentElement.scrollTop || 0;
  const from = at();
  const to = Math.max(0, y);
  if (Math.abs(to - from) < 2) return;
  if (vvReduced()) { window.scrollTo(0, to); return; }
  const t0 = Date.now();
  let id = 0;
  const stop = () => {
    clearInterval(id);
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    window.removeEventListener('keydown', stop);
  };
  window.addEventListener('wheel', stop, { passive: true, once: true });
  window.addEventListener('touchstart', stop, { passive: true, once: true });
  window.addEventListener('keydown', stop, { once: true });
  id = setInterval(() => {
    const p = Math.min(1, (Date.now() - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 4);
    window.scrollTo(0, Math.round(from + (to - from) * eased));
    if (p >= 1) { window.scrollTo(0, to); stop(); }
  }, 16);
}

function DomainRail({ mobile }) {
  const [hot, setHot] = React.useState(null);
  const jump = (e, id) => {
    e.preventDefault();
    if (window.history && window.history.replaceState) window.history.replaceState(null, '', `#${id}`);
    /* replaceState fires no hashchange, so the strip is told directly. Constructed events are
       not universally available, so fall back to a plain Event of the same name. */
    let ev;
    try { ev = new HashChangeEvent('hashchange'); } catch (err) { ev = new Event('hashchange'); }
    window.dispatchEvent(ev);
    /* Land on the instrument, not on the section's headline: the visitor asked for a specific
       domain, so the strip and the panel it controls are what should be under the nav when the
       page settles. In the expanded view each domain has its own anchor instead. */
    const host = document.getElementById(id) || document.querySelector('#domains [role="tablist"]') || document.getElementById('domains');
    if (!host) return;
    vvScrollTo(host.getBoundingClientRect().top + (window.pageYOffset || 0) - 104);
  };
  return (
    <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', alignItems: mobile ? 'flex-start' : 'baseline', gap: mobile ? 12 : 'clamp(16px, 1.8vw, 26px)', paddingTop: 'clamp(20px, 2.2vw, 30px)', marginTop: 'clamp(6px, 1vw, 12px)', borderTop: '1px solid var(--vv-ice-14)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vv-graphite)', flex: 'none' }}>Domains</span>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(8px, 1vw, 14px)', flexWrap: 'wrap' }}>
        {window.AUT_DOMAINS.map((d, i) => (
          <React.Fragment key={d.id}>
            {i ? <span aria-hidden="true" style={{ color: 'var(--vv-ice-56)', fontSize: 13 }}>&middot;</span> : null}
            <a href={`#${d.id}`} onClick={(e) => jump(e, d.id)}
              onMouseEnter={() => setHot(d.id)} onMouseLeave={() => setHot(null)}
              style={{ fontFamily: 'var(--font-mono)', fontSize: mobile ? 12.5 : 13.5, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', color: hot === d.id ? 'var(--vv-amber)' : 'var(--vv-ice-82)', transition: 'color 160ms ease' }}>{d.label}</a>
          </React.Fragment>
        ))}
      </span>
    </div>
  );
}

/* Triptych cell. The grid's 1px gaps sit over a hairline-coloured parent and each cell paints
   the canvas colour, so three cells read as one divided object with no card, fill or shadow —
   the elevation rule holds (hairlines only) and the section still has structure. */
/* Right column of Advantages, copied from the homepage's Autonomous Solutions · spine layout:
   a single hairline rail with icons sitting on it, sitting OUTSIDE the chamfered frame that
   holds the copy — two peer objects, not one frame containing everything. */
function AdvantagesSpine({ mobile }) {
  const { Icon } = DS_A();
  const wide = useAutMin(1560);
  const box = wide ? 96 : 64, rail = wide ? 132 : 92;
  if (mobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {AUT_PILLARS.map((m, i) => (
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
      {AUT_PILLARS.map((m, i) => (
        <Reveal key={m.title} variant="side" delay={i * 130} dur={560} style={{ position: 'relative', marginBottom: i === AUT_PILLARS.length - 1 ? 0 : 40 }}>
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

const AUT_CTAS = [
  { label: 'About', title: 'Meet the Vivum team and discover our mission', action: 'About us', href: '/about' },
  { label: 'Contact', title: 'Get a tailored technical consultation', action: 'Contact us', href: '/contact' },
];

/* Closing band, banner variant — the homepage's own closing device (one chamfered frame,
   amber phrase, paragraph, primary button, quiet second link) rather than two competing
   cards. Recommended default: it reads as one coherent closing statement, and it is the
   vocabulary every other page on the site already ends on. */
function ClosingBanner({ onNavigate, mobile, tablet, stacked, plate }) {
  const { SectionFrame, Button } = DS_A();
  const QuietLink = window.QuietLink;
  return (
    <Reveal variant="frame" dur={760}>
      <SectionFrame accent chamfer={44} weight={1} color="var(--vv-ice-14)" stacked={stacked}
        contentStyle={{ maxWidth: '100%' }}
        padX="clamp(64px, 7vw, 120px)"
        plateSrc={plate ? '../../assets/plates/home-banner-video.mp4' : undefined}
        plateOpacity={0.2} plateShift="clamp(30px, 20vw, 300px)" plateScale={1.7}
        fill="rgba(218,232,242,0.02)">
        <div style={{ display: 'flex', flexDirection: stacked ? 'column' : 'row', justifyContent: 'center', columnGap: 'clamp(40px, 6vw, 96px)', rowGap: 'clamp(28px, 3.4vw, 40px)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, maxWidth: tablet ? '100%' : 680, flex: '0 1 auto' }}>
            <Reveal as="h2" variant="text" dur={800} delay={280} style={{ margin: 0, fontSize: mobile ? 'clamp(26px, 2.5vw, 36px)' : 'clamp(30px, 3.2vw, 46px)', fontWeight: 700, letterSpacing: mobile ? '-0.02em' : '-0.03em', lineHeight: mobile ? 1.15 : 1.08, color: 'var(--vv-ice)', maxWidth: tablet ? '100%' : 680, textWrap: tablet ? 'wrap' : 'balance' }}>
              <span style={{ color: 'var(--vv-amber)' }}>Legitimate Autonomy</span> for Every Fleet, Every Domain
            </Reveal>
            <Reveal as="p" variant="up" delay={460} style={{ margin: 0, fontSize: 'clamp(17px, 1.35vw, 20px)', lineHeight: 1.5, color: 'var(--vv-ice-82)', maxWidth: tablet ? '100%' : 560, textWrap: tablet ? 'wrap' : 'balance' }}>
              Tell us your platform and the domain you operate in — we&rsquo;ll show you what an evolved model does with it.
            </Reveal>
            {QuietLink ? <Reveal variant="side" delay={900} dur={480}>
              <QuietLink href="#/about" label="Learn more about us" onClick={(e) => { e.preventDefault(); onNavigate('/about'); }} />
            </Reveal> : null}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flex: (mobile || tablet) ? '1 1 100%' : '0 0 auto', width: (mobile || tablet) ? '100%' : undefined }}>
            <Reveal variant="rise" delay={740} dur={520} style={{ width: (mobile || tablet) ? '100%' : undefined }}>
              <Button variant="primary" size="lg" onClick={() => onNavigate('/contact')} style={{ height: 58, padding: '0 38px', fontSize: 17, ...((mobile || tablet) ? { width: '100%' } : null) }}>Contact us</Button>
            </Reveal>
          </div>
        </div>
      </SectionFrame>
    </Reveal>
  );
}

function AutonomyScreen({ onNavigate }) {
  const { VideoBackdrop, GradientField, Eyebrow, Button, SectionFrame } = DS_A();
  const [t, setTweak] = useTweaks(AUT_TWEAKS);
  React.useEffect(() => { window.vvSetMobileMenuStyle && window.vvSetMobileMenuStyle(t.mobileMenuStyle); }, [t.mobileMenuStyle]);
  React.useLayoutEffect(() => {
    window.vvSetMotion({ frame: t.mFrame, speed: t.mSpeed, delay: t.mDelay, replay: t.mReplay });
  }, [t.mFrame, t.mSpeed, t.mDelay, t.mReplay]);
  const stacked = useAutMax(900);
  const mobile = useAutMax(640);
  const tablet = useAutMax(1024) && !mobile;
  const navMobile = useAutMax(760);

  return (
    <div style={{ isolation: 'isolate' }}>
      {/* ── Hero ──────────────────────────────────────────────────────────────────────────
         74svh, not 100: a sub-page hero that fills the viewport competes with the homepage's
         and hides the fact that the page's real content is a four-domain instrument. Short
         enough that the first advantage cell is already peeking in under it. */}
      <VideoBackdrop src="../../assets/plates/dynamic-neural-models-v4.mp4" scrim="bottom" pingPong
        minHeight={mobile ? 'max(560px, 78svh)' : 'max(560px, 74svh)'} align="end" edgeFade={false} foot="14%"
        pad={mobile ? '170px var(--gutter-site) clamp(76px, 18vw, 108px)' : navMobile ? '176px var(--gutter-site) 48px' : '180px var(--gutter-site) clamp(72px, 7vw, 112px)'}
        plateOpacity={t.heroOpacity}>
        <div style={{ maxWidth: 'var(--container-site)', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 1.1vw, 18px)' }}>
            <Reveal delay={140}><Eyebrow><HudText text="Autonomy" speed={34} /></Eyebrow></Reveal>
            <Reveal as="h1" variant="text" dur={880} delay={260} style={{ margin: 0, fontSize: 'clamp(30px, 3.2vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, color: 'var(--vv-ice)', maxWidth: '17.5em', textWrap: 'balance' }}>
              Autonomous Solutions for <span style={{ color: 'var(--vv-amber)' }}>Unmanned Vehicles</span>
            </Reveal>
            <Reveal as="p" variant="up" delay={620} style={{ margin: 0, fontSize: 'clamp(17px, 1.35vw, 20px)', lineHeight: 1.5, color: 'var(--vv-ice-82)', maxWidth: 640 }}>
              Legitimate autonomy across air, land, sea, and space — evolved onto the hardware you already field.
            </Reveal>
            {t.heroRail !== false ? <Reveal variant="up" delay={860} dur={520} style={{ marginTop: 'clamp(10px, 1vw, 18px)' }}><DomainRail mobile={mobile} /></Reveal> : null}
          </div>
        </div>
      </VideoBackdrop>

      {/* ── Advantages ─────────────────────────────────────────────────────────────────────
         Two columns inside one chamfered frame: title and paragraph on the left, the three
         advantages stacked on the right — no separate label, no boxed cells. */}
      <GradientField field="none" pad={mobile ? 'clamp(64px, 15vw, 96px) var(--gutter-site)' : 'clamp(40px, 4.2vw, 72px) var(--gutter-site)'} as="section" id="advantages">
        <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
          {/* Track split loosened from 0.78/0.62 so the spine column can actually reach its new
             500px cap once the indent is subtracted; the copy column still leads. */}
          <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'minmax(0, 0.72fr) minmax(0, 0.68fr)', columnGap: 0, rowGap: 'clamp(36px, 5vw, 56px)', alignItems: 'stretch' }}>
            <div style={{ alignSelf: 'center' }}>
              <Reveal variant={mobile ? 'up' : 'frame'} dur={640}>
                <SectionFrame copyMax="100%" stacked={stacked} contentStyle={{ maxWidth: '100%' }} fill="transparent"
                  {...(mobile ? { chamfer: 0, color: 'transparent', blur: 0, accent: false, padX: '0px', padY: '0px' } : tablet ? { padX: 'clamp(48px, 6vw, 96px)', padY: 'clamp(48px, 6vw, 96px)' } : null)}>
                  <Eyebrow><HudText text="Advantages" speed={30} delay={240} /></Eyebrow>
                  <Reveal as="h2" variant="text" dur={760} delay={290} style={{ margin: 0, fontSize: 'clamp(26px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)', textWrap: 'balance' }}>
                    <span style={{ color: 'var(--vv-amber)' }}>Evolutionary AI</span> Unlocks the Potential of Your Systems
                  </Reveal>
                  <Reveal as="p" variant="up" delay={470} style={{ margin: 0, fontSize: 'clamp(16px, 1.3vw, 18px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', textWrap: 'pretty' }}>
                    Three properties carry the whole system: models that learn rather than follow a
                    script, intelligence that runs where the decision is made, and an efficiency
                    envelope that survives the field — which is what turns hardware you already
                    field into an autonomous platform.
                  </Reveal>
                </SectionFrame>
              </Reveal>
            </div>
            {/* Left-aligned in its track with a fixed 5rem indent: the spine sits a measured
               distance from the copy instead of being flung to the far edge by justify-self:end,
               which opened a gap that grew with the viewport. */}
            <div style={{ maxWidth: stacked ? '100%' : 520, width: '100%', boxSizing: 'border-box', justifySelf: 'start', alignSelf: 'center', paddingLeft: stacked ? 0 : 'clamp(2.5rem, 5.2vw, 7.5rem)', paddingRight: 0 }}>
              <AdvantagesSpine mobile={mobile} />
            </div>
          </div>
        </div>
      </GradientField>

      {/* Full-bleed animated background on the Advantages → Domains seam, same device as the
         homepage's Autonomous Solutions → Core technology seam. */}
      <SeamAnimation variant={t.seamAnim} size={t.seamSize} speed={t.seamSpeed} x={t.seamX} y={t.seamY} opacity={t.seamOpacity} />

      {/* ── The four domains ─────────────────────────────────────────────────────────────── */}
      <DomainSection layout={t.domainLayout} scene={t.domainScene} nav={t.domainNav} capStyle={t.domainCaps} capFont={t.domainFont} capLink={t.domainCapLink} corners={t.domainCorners} titleSize={t.domainTitleSize}
        particles={{ glyph: t.pGlyph, count: t.pCount, size: t.pSize, extent: t.pExtent }} />

      {/* ── Closing band ─────────────────────────────────────────────────────────────────
         Default is `banner`: one chamfered frame, same vocabulary every other page on the site
         ends on. `split` keeps the two-card treatment for comparison. */}
      <GradientField field="none" pad={mobile ? 'clamp(64px, 15vw, 96px) var(--gutter-site) clamp(96px, 22vw, 140px)' : 'clamp(40px, 4.2vw, 72px) var(--gutter-site) clamp(48px, 5vw, 88px)'} as="section" id="next">
        <div style={{ maxWidth: 'var(--container-site-narrow)', margin: '0 auto' }}>
          {t.ctaLayout === 'split' ? (
          <div style={{ display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: stacked ? 'clamp(26px, 6vw, 44px)' : 'clamp(16px, 1.8vw, 28px)', alignItems: 'stretch' }}>
            {AUT_CTAS.map((c, i) => (
              <Reveal key={c.label} variant="frame" dur={760} delay={i * 160} style={{ height: '100%' }}>
                <SectionFrame accent chamfer={36} chamferWide={64} weight={1}
                  color="var(--vv-ice-14)" stacked stretch
                  copyMax="100%" contentStyle={{ maxWidth: '100%', alignItems: 'flex-start', flex: '1 1 auto' }} gap={18}
                  padX={mobile ? 'clamp(24px, 7vw, 34px)' : 'clamp(30px, 3.4vw, 54px)'}
                  padY={mobile ? 'clamp(28px, 8vw, 40px)' : 'clamp(34px, 3.6vw, 56px)'}
                  fill="rgba(218,232,242,0.02)" style={{ height: '100%' }}>
                  <HudText text={c.label} speed={30} delay={240 + i * 120}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vv-graphite)' }} />
                  <Reveal as="h2" variant="text" dur={780} delay={300 + i * 140} style={{ margin: 0, fontSize: mobile ? 'clamp(21px, 2vw, 26px)' : 'clamp(22px, 2.1vw, 30px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--vv-ice)', maxWidth: '17em', textWrap: 'balance' }}>{c.title}</Reveal>
                  {/* The frames are equal height and their content boxes fill them, so the
                     button sits on the frame's floor in both — aligned whether a title
                     wraps to two lines or three. */}
                  <Reveal variant="rise" delay={700 + i * 140} dur={520} style={{ marginTop: 'auto', paddingTop: 'clamp(10px, 1.4vw, 18px)', width: mobile ? '100%' : undefined }}>
                    <Button variant="primary" size="lg" onClick={() => onNavigate(c.href)} style={mobile ? { width: '100%' } : undefined}>{c.action}</Button>
                  </Reveal>
                </SectionFrame>
              </Reveal>
            ))}
          </div>
          ) : <ClosingBanner onNavigate={onNavigate} mobile={mobile} tablet={tablet} stacked={stacked} plate={t.ctaPlate} />}
        </div>
      </GradientField>

      <TweaksPanel>
        <TweakSection label="Domains" />
        <TweakRadio label="Layout" value={t.domainLayout} options={['console', 'matrix', 'ledger']} onChange={(v) => setTweak('domainLayout', v)} />
        <TweakSelect label="Instrument" value={t.domainScene} options={['swarm', 'field', 'radar', 'off']} onChange={(v) => setTweak('domainScene', v)} />
        <TweakSelect label="Domain nav" value={t.domainNav} options={['rail', 'bracket', 'seam', 'carousel', 'dial', 'stack']} onChange={(v) => setTweak('domainNav', v)} />
        <TweakSelect label="Capabilities" value={t.domainCaps} options={['hud', 'cards', 'rows', 'numbered']} onChange={(v) => setTweak('domainCaps', v)} />
        <TweakRadio label="Canvas type" value={t.domainFont} options={['sans', 'mono']} onChange={(v) => setTweak('domainFont', v)} />
        <TweakSelect label="Callout link edge" value={t.domainCapLink} options={['auto', 'left', 'right', 'top', 'bottom']} onChange={(v) => setTweak('domainCapLink', v)} />
        <TweakToggle label="Canvas corner marks" value={t.domainCorners} onChange={(v) => setTweak('domainCorners', v)} />
        <TweakSlider label="Canvas title size" value={t.domainTitleSize} min={13} max={34} step={1} onChange={(v) => setTweak('domainTitleSize', v)} />
        <TweakRadio label="Particle shape" value={t.pGlyph} options={['dot', 'chevron', 'box']} onChange={(v) => setTweak('pGlyph', v)} />
        <TweakSlider label="Particle size" value={t.pSize} min={0.4} max={2.6} step={0.1} onChange={(v) => setTweak('pSize', v)} />
        <TweakSlider label="Particle count" value={t.pCount} min={200} max={2400} step={100} onChange={(v) => setTweak('pCount', v)} />
        <TweakSlider label="Particle field size" value={t.pExtent} min={0.5} max={1.6} step={0.05} onChange={(v) => setTweak('pExtent', v)} />
        <TweakSection label="Closing" />
        <TweakRadio label="CTA layout" value={t.ctaLayout} options={['banner', 'split']} onChange={(v) => setTweak('ctaLayout', v)} />
        <TweakToggle label="Background video" value={t.ctaPlate} onChange={(v) => setTweak('ctaPlate', v)} />
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
        <TweakSection label="Page" />
        <TweakToggle label="Hero domain rail" value={t.heroRail !== false} onChange={(v) => setTweak('heroRail', v)} />
        <TweakSlider label="Hero video opacity" value={t.heroOpacity} min={0.05} max={1} step={0.05} onChange={(v) => setTweak('heroOpacity', v)} />
        <TweakSection label="Motion" />
        <TweakSelect label="Chamfered frames" value={t.mFrame} options={window.VV_FRAME_OPTIONS} onChange={(v) => setTweak('mFrame', v)} />
        <TweakSlider label="Speed" value={t.mSpeed} min={0.25} max={2.5} step={0.05} unit="×" onChange={(v) => setTweak('mSpeed', v)} />
        <TweakSlider label="Delay" value={t.mDelay} min={0} max={800} step={20} unit="ms" onChange={(v) => setTweak('mDelay', v)} />
        <TweakToggle label="Replay on re-entry" value={t.mReplay} onChange={(v) => setTweak('mReplay', v)} />
      </TweaksPanel>
    </div>
  );
}

Object.assign(window, { AutonomyScreen });
