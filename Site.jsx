const DS = () => window.VivumDS || window.VivumAIDesignSystem_b2be15;

function Site() {
  const { NavBar, Footer, Toast } = DS();
  // Route is permanently fixed to '/' — no navigation to sub-pages
  const route = '/';
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 4200); return () => clearTimeout(t); }, [toast]);

  // Autonomy and About retain their text labels but do not navigate
  const links = [
    { label: 'Autonomy' },
    { label: 'About' },
  ];
  // Only HomeScreen and BriefingScreen (contact) are reachable; all other routes render HomeScreen
  const Screen = HomeScreen;

  return (
    <div style={{ position: 'relative', minHeight: '100%', background: 'var(--surface-canvas)' }}>
      {/* On the home route the bar floats over the hero video: a zero-height sticky wrapper
         lets the header overflow it, so the plate below starts at y=0 no matter how tall the
         bar gets. */}
      <div style={{ position: 'sticky', top: 0, zIndex: 20, height: 0 }}>
        {/* onNavigate is a no-op — all routing is disabled */}
        <NavBar logoSrc="./assets/vivum-logo-gray.svg" links={links} activeHref={route}
          transparent={true} onNavigate={() => {}}
          cta={{ label: 'Contact us' }} />
      </div>
      <Screen onNavigate={() => {}} onToast={setToast} />
      <Footer markSrc="./assets/vivum-logo-gray.svg" tagline="Evolutionary AI for air, land, sea, space, and the edge."
        columns={[
          { label: 'Autonomy', links: [{ label: 'Dynamic neural models', href: '#models' }, { label: 'Evolutionary AI', href: '#evolutionary' }, { label: 'Comparison', href: '#comparison' }] },
          { label: 'Company', links: [{ label: 'About' }, { label: 'Careers' }, { label: 'Press' }] },
          { label: 'Contact', links: [{ label: 'Contact us' }, { label: 'brand@vivum.ai' }] },
        ]} />
      {toast ? (
        <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 60 }}>
          <Toast title={toast.title} tone={toast.tone || 'live'} onClose={() => setToast(null)}>{toast.body}</Toast>
        </div>
      ) : null}
    </div>
  );
}

Object.assign(window, { Site });
