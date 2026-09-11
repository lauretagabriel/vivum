/* Vivum AI — preview helper. Not part of the public API.
   Cards, slides and UI kits call `window.vvReady()` and render in its .then(), so a
   preview opens cleanly whether or not `_ds_bundle.js` has been compiled yet.

   Fast path: the compiled bundle has already published its namespace on `window`, and
   we hand that straight back. The namespace is found by prefix rather than by its exact
   name, so the build hash can change without touching this file.

   Fallback path (this is the capability the readme advertises): with no bundle on the
   page — a fresh design system, or sources edited since the last compile — we build the
   namespace in the browser. `_ds_manifest.json` lists every component and its
   `sourcePath`; each source is fetched, transpiled with the Babel that these pages
   already load, and evaluated behind a tiny CommonJS shim, so a card still paints
   instead of showing an empty page.

   Gap-fill: `vvReady({ extras: { Name: 'components/dir/Name.jsx' } })` compiles just
   those sources and merges any name the bundle does not already export. `overrides` takes
   the same shape but compiles from source even when the bundle already has the name —
   for a component whose source you just changed, where the bundle's copy is the stale one. That covers the
   window between adding a component and the next compile — without it, a page using a
   brand-new component renders nothing at all. Each entry becomes a no-op as soon as the
   rebuilt bundle carries the name, so they are safe to leave in place.

   This never rejects. If even the fallback cannot run, it logs why and resolves with
   whatever it managed to collect, so a dependent page degrades rather than throws. */
(function () {
  var self = document.currentScript;
  var base = (self && self.getAttribute('data-base')) || '.';

  function url(projectPath) { return base + '/' + projectPath; }

  function ensureTokens() {
    var href = url('styles.css');
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      var h = links[i].getAttribute('href') || '';
      if (h === href || /(^|\/)styles\.css$/.test(h)) return;
    }
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }

  /* The bundle publishes one object per design system: `window.VivumAIDesignSystem_<hash>`. */
  function findNamespace() {
    var keys = Object.keys(window);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (k.indexOf('VivumAIDesignSystem') !== 0) continue;
      var ns = window[k];
      if (ns && typeof ns === 'object' && Object.keys(ns).length) return ns;
    }
    return null;
  }

  function waitForBundle(limitMs) {
    return new Promise(function (resolve) {
      var found = findNamespace();
      if (found) return resolve(found);
      var waited = 0, step = 50;
      var timer = setInterval(function () {
        var ns = findNamespace();
        if (ns || (waited += step) >= limitMs) {
          clearInterval(timer);
          resolve(ns);
        }
      }, step);
    });
  }

  /* ── Fallback: compile the design system from source, in the browser ───────── */

  var EXTS = ['', '.jsx', '.tsx', '.js'];

  function dirOf(projectPath) {
    var parts = projectPath.split('/');
    parts.pop();
    return parts;
  }

  function resolvePath(fromProjectPath, spec) {
    var dir = dirOf(fromProjectPath);
    var parts = spec.split('/');
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (p === '' || p === '.') continue;
      else if (p === '..') dir.pop();
      else dir.push(p);
    }
    return dir.join('/');
  }

  async function fetchSource(projectPath) {
    for (var i = 0; i < EXTS.length; i++) {
      var candidate = projectPath + EXTS[i];
      if (EXTS[i] === '' && !/\.(jsx|tsx|js)$/.test(projectPath)) continue;
      try {
        /* No cache-busting query here: the preview file server 404s on a query string, so
           `?t=…` breaks every fetch instead of refreshing it. */
        var res = await fetch(url(candidate));
        if (res.ok) return { path: candidate, code: await res.text() };
      } catch (e) { /* try the next extension */ }
    }
    return null;
  }

  function transpile(code, filename) {
    return window.Babel.transform(code, {
      filename: filename,
      presets: [['react', { runtime: 'classic' }]],
      plugins: ['transform-modules-commonjs'],
    }).code;
  }

  /* Dependency specifiers, read off the transpiled CommonJS output. */
  function requiresIn(code) {
    var out = [], re = /require\(\s*["']([^"']+)["']\s*\)/g, m;
    while ((m = re.exec(code))) if (out.indexOf(m[1]) === -1) out.push(m[1]);
    return out;
  }

  var registry = {};   // resolved project path -> module exports
  var compiled = {};   // resolved project path -> { path, code }

  async function preload(projectPath, seen) {
    if (compiled[projectPath] || seen[projectPath]) return;
    seen[projectPath] = true;
    var src = await fetchSource(projectPath);
    if (!src) throw new Error('cannot fetch ' + projectPath);
    var code = transpile(src.code, src.path);
    compiled[projectPath] = { path: src.path, code: code };
    var specs = requiresIn(code);
    for (var i = 0; i < specs.length; i++) {
      var spec = specs[i];
      if (spec.charAt(0) !== '.') continue; // bare specifiers come from the shim
      await preload(resolvePath(projectPath, spec), seen);
    }
  }

  function evaluate(projectPath) {
    if (registry[projectPath]) return registry[projectPath];
    var entry = compiled[projectPath];
    if (!entry) throw new Error('not preloaded: ' + projectPath);
    var module = { exports: {} };
    registry[projectPath] = module.exports;
    function shimRequire(spec) {
      if (spec === 'react') return window.React;
      if (spec === 'react-dom') return window.ReactDOM;
      if (spec.charAt(0) === '.') return evaluate(resolvePath(projectPath, spec));
      console.warn('ds-ready.js: unresolved import "' + spec + '" in ' + projectPath);
      return {};
    }
    new Function('require', 'module', 'exports', 'React', entry.code)(
      shimRequire, module, module.exports, window.React
    );
    registry[projectPath] = module.exports;
    return module.exports;
  }

  async function compileFromSource() {
    if (!window.Babel) throw new Error('Babel is not on the page, so sources cannot be transpiled');
    if (!window.React) throw new Error('React is not on the page');

    var res = await fetch(url('_ds_manifest.json'));
    if (!res.ok) throw new Error('cannot fetch _ds_manifest.json (' + res.status + ')');
    var manifest = await res.json();
    var list = manifest.components || [];
    var ns = {};

    for (var i = 0; i < list.length; i++) {
      var entry = list[i];
      if (!entry || !entry.sourcePath) continue;
      try {
        await preload(entry.sourcePath, {});
        var exports = evaluate(entry.sourcePath);
        /* Mirror the compiler: expose capitalised exports, and accept a default export
           under the component's manifest name. */
        Object.keys(exports).forEach(function (k) {
          if (k === 'default') return;
          if (/^[A-Z]/.test(k)) ns[k] = exports[k];
        });
        if (exports.default && !ns[entry.name]) ns[entry.name] = exports.default;
      } catch (e) {
        console.warn('ds-ready.js: skipped ' + entry.name + ' — ' + e.message);
      }
    }

    if (!Object.keys(ns).length) throw new Error('no components compiled');
    var name = manifest.namespace || 'VivumAIDesignSystem_source';
    window[name] = ns;
    console.info(
      'ds-ready.js: _ds_bundle.js was not on the page, so ' + Object.keys(ns).length +
      ' components were compiled from source for this preview.'
    );
    return ns;
  }

  /* Compile the named sources and merge them in. Missing names only, unless `force`. */
  async function fillGaps(ns, extras, force) {
    var names = Object.keys(extras || {});
    var added = [];
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (ns[name] && !force) continue;
      try {
        var path = extras[name];
        await preload(path, {});
        var exports = evaluate(path);
        var value = exports[name] || exports.default;
        if (!value) throw new Error('no export named ' + name);
        ns[name] = value;
        added.push(name);
      } catch (e) {
        console.warn('ds-ready.js: could not gap-fill ' + name + ' — ' + e.message);
      }
    }
    if (added.length) {
      console.info(
        'ds-ready.js: compiled ' + added.join(', ') + ' from source — the bundle on this ' +
        'page predates ' + (added.length > 1 ? 'these components' : 'this component') + '.'
      );
    }
    return ns;
  }

  ensureTokens();

  var settled = null;

  window.vvReady = function (opts) {
    if (settled) return settled;
    var extras = (opts && opts.extras) || null;
    var overrides = (opts && opts.overrides) || null;
    settled = (async function () {
      /* The bundle tag sits above this one, so it has already run if present; the short
         wait only covers a slow parse. */
      var ns = await waitForBundle(1500);
      if (ns) {
        if (extras) await fillGaps(ns, extras);
        if (overrides) await fillGaps(ns, overrides, true);
        window.VivumDS = ns;
        return ns;
      }
      try {
        ns = await compileFromSource();
        if (extras) await fillGaps(ns, extras);
      } catch (e) {
        console.error(
          'ds-ready.js: no compiled bundle and the source fallback failed — ' + e.message +
          '. Pages will render without design system components.'
        );
        ns = findNamespace() || {};
      }
      window.VivumDS = ns;
      return ns;
    })();
    return settled;
  };

  var immediate = findNamespace();
  if (immediate) window.VivumDS = immediate;
})();
