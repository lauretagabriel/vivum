const DS = () => window.VivumAIDesignSystem_b2be15;

/* The site is not mounted until every plate and still is decoded, so its first frame is the
   finished page — and, just as importantly, so the hero's reveal ramp starts when the user can
   actually see it. Rendering behind the cover instead would burn the entrance during loading.

   __vvBooted is a one-shot: an editor hot-reload remounts Site, and replaying the boot screen
   on every code change would make the page unworkable to author. A real page load clears it. */
/* The screens that exist as real files. Anything not in here stays inert: the link is
   still visible (a marketing page with half its nav removed is not the design), it just does
   not go anywhere yet. */
/* Static-hosting routes. Each page is a folder with its own index.html, so a route is a
   directory URL — and because GitHub Pages may serve the site from a repository subpath,
   every URL is built relative to the page rather than from the domain root. __VV_BASE is
   set inline by each page ('' at the root, '../' one level down). */
const VV_B = (typeof window !== 'undefined' && window.__VV_BASE) || '';
const SITE_PAGES = { '/': VV_B || './', '/autonomy': VV_B + 'autonomy/', '/about': VV_B + 'about/', '/contact': VV_B + 'contact/' };
const VV_ROUTE_BY_URL = Object.keys(SITE_PAGES).reduce(function (a, k) { a[SITE_PAGES[k]] = k; return a; }, {});
const SITE_SCREENS = { '/': 'HomeScreen', '/autonomy': 'AutonomyScreen', '/about': 'AboutScreen', '/contact': 'ContactScreen' };
/* Routes whose first element is a full-bleed video plate — the bar floats over it. */
const SITE_HERO_ROUTES = ['/', '/autonomy', '/about', '/contact'];

function Site({ route = '/' }) {
  const [booted, setBooted] = React.useState(() => window.__vvBooted === true);
  const onReady = React.useCallback(() => { window.__vvBooted = true; setBooted(true); }, []);
  const { NavBar, Footer, Toast } = DS();
  /* index.html paints a static boot cover before any of this code exists; Preloader lifts it
     on the normal path. This is the other path: an editor hot-reload that remounts Site with
     __vvBooted already set never mounts a Preloader, so the cover would have nothing to
     dismiss it. */
  React.useEffect(() => { if (booted && window.__vvBoot) window.__vvBoot.exit(); }, [booted]);
  const [toast, setToast] = React.useState(null);
  /* Navigation is a real page load between the two built pages — the kit is click-through, not
     a single-file router. Unbuilt routes resolve to nothing rather than to a blank screen. */
  const go = React.useCallback((href) => {
    let path = String(href || '').replace(/^#/, '');
    /* Anchors are rewritten to real relative URLs so the links work as ordinary links
       (new tab, middle click, crawlers) — see site-links.js. A click therefore arrives as
       either the logical route ('/about') or its built URL ('../about/'); map the second
       form back before looking it up. */
    if (!SITE_PAGES[path] && VV_ROUTE_BY_URL[path]) path = VV_ROUTE_BY_URL[path];
    const file = SITE_PAGES[path];
    if (file) {
      if (path !== route) {
        window.location.href = file;
      } else if (path === '/') {
        // Refresh page when clicking logo while already on home page
        window.location.reload();
      }
    }
  }, [route]);
  React.useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 4200); return () => clearTimeout(t); }, [toast]);
  // Nav links, footer nav, legal links and CTAs stay visible but inert: their own handlers
  // already call preventDefault() before onNavigate, so a no-op onNavigate is enough for
  // anything the screens own. This guard catches links the screens don't own (footer nav,
  // Terms, Privacy) — mailto:, tel:, in-page #anchors, absolute URLs and anything aimed at a
  // new tab are deliberately left alone.
  React.useEffect(() => {
    const swallow = (e) => {
      const a = e.target && e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (/^(#|mailto:|tel:|https?:\/\/)/.test(href)) return;
      if (a.target === '_blank') return;
      e.preventDefault();
      go(href);
    };
    document.addEventListener('click', swallow, true);
    return () => document.removeEventListener('click', swallow, true);
  }, [go]);

  const links = [
    { href: '/autonomy', label: 'Autonomy' },
    { href: '/about', label: 'About' },
  ];
  /* Resolved off `window` rather than by identifier: each page loads only the screen files it
     needs, so naming the others directly would be a ReferenceError at render. */
  const Screen = window[SITE_SCREENS[route]] || window.HomeScreen || window.AutonomyScreen;
  const heroRoute = SITE_HERO_ROUTES.indexOf(route) > -1;

  return (
    <div style={{ position: 'relative', minHeight: '100%', background: 'var(--surface-canvas)' }}>
      {booted ? null : <Preloader onReady={onReady} />}
      {booted ? <>
      {/* On the home route the bar floats over the hero video: a zero-height sticky wrapper
         lets the header overflow it, so the plate below starts at y=0 no matter how tall the
         bar gets. The old fixed negative margin had to be retuned on every padding change. */}
      <div style={{ position: 'sticky', top: 0, zIndex: 20, height: heroRoute ? 0 : undefined }}>
        <NavBar logoSrc="../../assets/vivum-logo-gray.svg" logoHref={VV_B || './'} links={links} activeHref={route}
          transparent={heroRoute} onNavigate={go}
          cta={{ label: 'Contact us', onClick: () => go('/contact') }} />
      </div>
      <Screen onNavigate={go} onToast={setToast} />
      <Footer markSrc="../../assets/vivum-logo-gray.svg" tagline="Evolutionary AI for air, land, sea, space, and the edge."
        nav={[{ label: 'Autonomy', href: '/autonomy' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]}
        location={['South San Francisco, CA', '611 Gateway Blvd (Suite 200)', 'San Francisco, CA 94080']}
        emails={[{ label: 'Commercial partnerships', email: 'partnerships@vivum.ai' }, { label: 'Defense applications', email: 'teaming@vivum.ai' }]}
        social={[{ name: 'x', href: '#' }, { name: 'linkedin', href: '#' }, { name: 'facebook', href: '#' }]}
        legalLinks={[{ label: 'Terms of use', href: '/terms' }, { label: 'Privacy policy', href: '/privacy' }]} />
      {toast ? (
        <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 60 }}>
          <Toast title={toast.title} tone={toast.tone || 'live'} onClose={() => setToast(null)}>{toast.body}</Toast>
        </div>
      ) : null}
      </> : null}
    </div>
  );
}

Object.assign(window, { Site });
