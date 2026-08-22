const DS = () => window.VivumDS || window.VivumAIDesignSystem_b2be15;

function Site() {
  const { NavBar, Footer, Toast } = DS();
  const [route, setRoute] = React.useState('/');
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 4200); return () => clearTimeout(t); }, [toast]);
  React.useEffect(() => { window.scrollTo(0, 0); }, [route]);

  const links = [
    { href: '/autonomy', label: 'Autonomy' },
    { href: '/about', label: 'About' },
  ];
  const Screen = { '/': HomeScreen, '/autonomy': PlatformScreen, '/about': ResearchScreen, '/contact': BriefingScreen }[route] || HomeScreen;

  return (
    <div style={{ position: 'relative', minHeight: '100%', background: 'var(--surface-canvas)' }}>
      {/* On the home route the bar floats over the hero video: a zero-height sticky wrapper
         lets the header overflow it, so the plate below starts at y=0 no matter how tall the
         bar gets. The old fixed negative margin had to be retuned on every padding change. */}
      <div style={{ position: 'sticky', top: 0, zIndex: 20, height: route === '/' ? 0 : undefined }}>
        <NavBar logoSrc="./assets/vivum-logo-gray.svg" links={links} activeHref={route}
          transparent={route === '/'} onNavigate={(href) => setRoute(href || '/')}
          cta={{ label: 'Contact us', onClick: () => setRoute('/contact') }} />
      </div>
      <Screen onNavigate={setRoute} onToast={setToast} />
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

