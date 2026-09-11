# Vivum AI — static site (GitHub Pages)

Four pages, ready to publish as-is.

    index.html            Homepage
    autonomy/index.html   Autonomy
    about/index.html      About
    contact/index.html    Contact
    images/               stills, logo, social card
    videos/               background plates
    app/                  stylesheet, design-system bundle, page scripts
    .nojekyll             publish every path verbatim

## Publishing

Commit the **contents** of this folder to the branch GitHub Pages serves (main root,
main + /docs, or gh-pages) so that index.html sits at the published root. Nothing
needs building.

Every internal URL is **relative**, so the site works both at a domain root
(vivum.ai/) and under a repository subpath (user.github.io/repo/) with no
configuration.

## Notes

- React, ReactDOM and Babel load from unpkg; the pages compile their views in the
  browser, so there is no build step and no bundler to keep in sync.
- app/site-assets.js maps the design system asset paths onto images/ and videos/.
  app/site-links.js turns each internal route into a real relative href. Both read
  window.__VV_BASE, set inline at the top of every page.
- The Tweaks panel is inert without its authoring host, so visitors never see it.
