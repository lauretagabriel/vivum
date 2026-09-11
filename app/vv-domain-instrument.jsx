/* The domain instrument: a SWARM that takes the shape of the platform the domain flies, drives,
   dives or orbits. One particle set, sampled from four silhouettes (fighter jet from above, tank
   in profile, submarine in profile, satellite head-on), morphed between them — nothing is
   created or destroyed on a domain change, the same swarm re-forms. That is the section's whole
   argument made literal: one architecture, retuned for the medium.

   three.js draws it; the morph and the per-domain parameter easing run on the render loop's own
   clock rather than an animation library — one dependency instead of two, and the tween cannot
   desync from the frame that consumes it. three.js is loaded lazily and is optional: no WebGL, a
   blocked CDN, or a reduced-motion preference falls back to the same silhouettes drawn on a 2D
   canvas (also offered on its own as the lighter `radar` scene), and that in turn falls back to
   the domain plate. The instrument is never a requirement for reading the page. */

const DI_LIBS = [
  ['THREE', 'https://unpkg.com/three@0.149.0/build/three.min.js'],
];
let _diLoad = null;
function diLoadLibs() {
  if (_diLoad) return _diLoad;
  _diLoad = Promise.all(DI_LIBS.map(([g, src]) => new Promise((res) => {
    if (window[g]) return res(true);
    const prev = document.querySelector(`script[data-di="${g}"]`);
    if (prev) {
      prev.addEventListener('load', () => res(!!window[g]));
      prev.addEventListener('error', () => res(false));
      return;
    }
    const s = document.createElement('script');
    s.src = src; s.async = true; s.dataset.di = g;
    s.onload = () => res(!!window[g]);
    s.onerror = () => res(false);
    document.head.appendChild(s);
  }))).then(() => ({ three: !!window.THREE }));
  return _diLoad;
}

const DI_ICE = 0xdae8f2, DI_AMBER = 0xec9a00;

/* ── Silhouettes ─────────────────────────────────────────────────────────────────────────────
   Normalised roughly to x ∈ [-1, 1]. Polygons and ellipses only: enough to read as the platform
   in a few hundred points, cheap enough to sample on the main thread, and symmetric halves are
   declared once and mirrored. `t` is the swarm's depth (thickness) for that part. */
const mir = (pts) => pts.map(([x, y]) => [-x, y]);
const poly = (pts, t) => ({ pts, t: t == null ? 0.16 : t });
const ell = (cx, cy, rx, ry, t) => ({ cx, cy, rx, ry, t: t == null ? 0.16 : t, kind: 'ellipse' });

const DI_SHAPES = {
  /* Fighter jet, plan view, nose up: slim fuselage, swept delta wings, tailplanes. */
  air: (() => {
    const wing = [[0.07, 0.28], [0.92, -0.30], [0.92, -0.46], [0.10, -0.12]];
    const tail = [[0.05, -0.54], [0.40, -0.80], [0.40, -0.92], [0.05, -0.70]];
    return [
      poly([[0, 1.02], [0.075, 0.52], [0.10, -0.34], [0.07, -0.80], [-0.07, -0.80], [-0.10, -0.34], [-0.075, 0.52]], 0.13),
      poly(wing, 0.05), poly(mir(wing), 0.05),
      poly(tail, 0.05), poly(mir(tail), 0.05),
      poly([[-0.035, -0.62], [0.035, -0.62], [0.05, -0.95], [-0.05, -0.95]], 0.16),
    ];
  })(),
  /* Main battle tank, profile: track run, hull, turret, gun. */
  land: [
    poly([[-0.97, -0.46], [0.97, -0.46], [0.92, -0.14], [-0.92, -0.14]], 0.34),
    ell(-0.62, -0.32, 0.11, 0.11, 0.30), ell(-0.21, -0.32, 0.11, 0.11, 0.30),
    ell(0.21, -0.32, 0.11, 0.11, 0.30), ell(0.62, -0.32, 0.11, 0.11, 0.30),
    poly([[-0.90, -0.14], [0.90, -0.14], [0.80, 0.18], [-0.82, 0.18]], 0.34),
    poly([[-0.34, 0.18], [0.34, 0.18], [0.24, 0.48], [-0.26, 0.48]], 0.28),
    poly([[0.22, 0.28], [1.00, 0.24], [1.00, 0.37], [0.22, 0.41]], 0.09),
  ],
  /* Submarine, profile: pressure hull, sail, stern planes, screw. */
  sea: [
    ell(0.02, 0, 0.94, 0.21, 0.34),
    poly([[-0.16, 0.16], [0.16, 0.16], [0.11, 0.46], [-0.12, 0.46]], 0.14),
    poly([[-0.86, 0.08], [-0.70, 0.08], [-0.78, 0.62], [-0.90, 0.58]], 0.07),
    poly([[-0.84, -0.06], [-0.62, -0.34], [-0.80, -0.42], [-0.94, -0.12]], 0.07),
    poly([[0.62, -0.14], [0.80, -0.34], [0.66, -0.40], [0.54, -0.18]], 0.07),
    poly([[-0.99, -0.05], [-0.90, -0.05], [-0.90, 0.05], [-0.99, 0.05]], 0.20),
  ],
  /* Satellite, head-on: bus, two solar wings, dish on a short mast. */
  space: (() => {
    const panel = [[0.24, -0.24], [0.98, -0.24], [0.98, 0.24], [0.24, 0.24]];
    return [
      poly([[-0.20, -0.32], [0.20, -0.32], [0.20, 0.30], [-0.20, 0.30]], 0.30),
      poly(panel, 0.04), poly(mir(panel), 0.04),
      poly([[-0.025, 0.30], [0.025, 0.30], [0.025, 0.46], [-0.025, 0.46]], 0.05),
      ell(0, 0.60, 0.26, 0.19, 0.12),
      poly([[-0.06, -0.32], [0.06, -0.32], [0.10, -0.52], [-0.10, -0.52]], 0.10),
    ];
  })(),
};

const diRnd = (s) => () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const diArea = (p) => { let a = 0; for (let i = 0, j = p.length - 1; i < p.length; j = i++) a += p[j][0] * p[i][1] - p[i][0] * p[j][1]; return Math.abs(a) / 2; };
const diIn = (x, y, p) => { let c = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) { const [xi, yi] = p[i], [xj, yj] = p[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };

/* Sample a silhouette into a flat [x,y,z,…] buffer, points distributed by part area so the
   swarm's density reads as the platform's mass rather than its outline. Deterministic: the same
   domain always samples the same cloud, so a morph back looks like the same swarm returning. */
const _diCache = {};
function diShape(id, n) {
  const key = id + ':' + n;
  if (_diCache[key]) return _diCache[key];
  const parts = DI_SHAPES[id] || DI_SHAPES.air;
  const rnd = diRnd(1337 + id.length * 977);
  const w = parts.map((p) => (p.kind === 'ellipse' ? Math.PI * p.rx * p.ry : diArea(p.pts)));
  const total = w.reduce((a, b) => a + b, 0);
  const out = new Float32Array(n * 3);
  let k = 0;
  parts.forEach((p, i) => {
    const cnt = i === parts.length - 1 ? n - k : Math.max(1, Math.round((n * w[i]) / total));
    let bb = null;
    if (!p.kind) {
      bb = [Infinity, Infinity, -Infinity, -Infinity];
      p.pts.forEach(([x, y]) => { bb[0] = Math.min(bb[0], x); bb[1] = Math.min(bb[1], y); bb[2] = Math.max(bb[2], x); bb[3] = Math.max(bb[3], y); });
    }
    for (let j = 0; j < cnt && k < n; j++, k++) {
      let x = 0, y = 0;
      if (p.kind === 'ellipse') {
        const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd());
        x = p.cx + Math.cos(a) * p.rx * r; y = p.cy + Math.sin(a) * p.ry * r;
      } else {
        let tries = 0;
        do { x = bb[0] + rnd() * (bb[2] - bb[0]); y = bb[1] + rnd() * (bb[3] - bb[1]); tries++; } while (!diIn(x, y, p.pts) && tries < 48);
      }
      out[k * 3] = x; out[k * 3 + 1] = y; out[k * 3 + 2] = (rnd() - 0.5) * p.t;
    }
  });
  _diCache[key] = out;
  return out;
}

/* Per-domain HUD context around the swarm. The swarm is the subject now, so the grids, rings and
   sweep are quieter than the platform — they place it in a medium, they do not compete with it. */
const DI_PRESETS = {
  air:   { gridO: 0.20, gridY: -1.55, ridge: 0.00, ringR: 3.10, ringTilt: 0.06, ringO: 0.16, sweepO: 0.40, starO: 0.00, ping: 0, camY: 0.55, camZ: 6.5, roll: 0.00, orbit: 0.18, yBase: 0.35, ySpread: 1.45, ground: 0 },
  land:  { gridO: 0.34, gridY: -1.05, ridge: 1.00, ringR: 2.70, ringTilt: 0.04, ringO: 0.12, sweepO: 0.34, starO: 0.00, ping: 0, camY: 0.60, camZ: 6.2, roll: 0.00, orbit: 0.06, yBase: -1.05, ySpread: 0.00, ground: 1 },
  sea:   { gridO: 0.26, gridY: 1.35, ridge: 0.30, ringR: 2.30, ringTilt: 0.04, ringO: 0.30, sweepO: 0.18, starO: 0.00, ping: 1, camY: 0.30, camZ: 6.3, roll: 0.00, orbit: 0.10, yBase: -0.55, ySpread: 1.05, ground: 0 },
  space: { gridO: 0.00, gridY: -1.05, ridge: 0.00, ringR: 3.00, ringTilt: 0.80, ringO: 0.22, sweepO: 0.12, starO: 1.00, ping: 0, camY: 0.35, camZ: 6.6, roll: 0.10, orbit: 1.00, yBase: 0.00, ySpread: 1.95, ground: 0 },
};

const DI_HOT = 7, DI_GRID = 12, DI_HALF = 4.2, DI_SCALE = 2.45;

/* Sprite glyphs for the particle. `box` is the GPU's own default point (no texture at all — the
   cheapest of the three); dot and chevron are tiny canvas textures, drawn once and shared. */
const _diTex = {};
function diTexture(THREE, kind) {
  if (kind === 'box') return null;
  if (_diTex[kind]) return _diTex[kind];
  const S = 64, cv = document.createElement('canvas');
  cv.width = S; cv.height = S;
  const c = cv.getContext('2d');
  c.fillStyle = '#fff';
  if (kind === 'chevron') {
    c.strokeStyle = '#fff';
    c.lineWidth = S * 0.16;
    c.lineJoin = 'miter';
    c.beginPath();
    c.moveTo(S * 0.14, S * 0.70);
    c.lineTo(S * 0.5, S * 0.24);
    c.lineTo(S * 0.86, S * 0.70);
    c.stroke();
  } else {
    c.beginPath();
    c.arc(S / 2, S / 2, S * 0.42, 0, Math.PI * 2);
    c.fill();
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  _diTex[kind] = tex;
  return tex;
}

function diGridGeo(THREE) {
  const step = (DI_HALF * 2) / DI_GRID, pos = [];
  for (let i = 0; i <= DI_GRID; i++) {
    const p = -DI_HALF + i * step;
    pos.push(-DI_HALF, 0, p, DI_HALF, 0, p, p, 0, -DI_HALF, p, 0, DI_HALF);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  return g;
}
const diRidge = (x, z) => Math.sin(x * 0.8) * 0.20 + Math.cos(z * 0.62) * 0.24 + Math.sin((x + z) * 0.34) * 0.14;

function MorphScene({ domainId, mode = 'swarm', live, onFail, count = 900, glyph = 'dot', pSize = 1, extent = 1, hotRef }) {
  const host = React.useRef(null);
  const api = React.useRef(null);
  const disposer = React.useRef(null);
  const listeners = React.useRef(null);
  const opts = React.useRef({ pSize, extent });
  opts.current.pSize = pSize;
  opts.current.extent = extent;
  const [ready, setReady] = React.useState(false);
  const DI_N = Math.max(120, Math.min(2600, Math.round(count)));

  React.useEffect(() => {
    let dead = false, raf = 0, io = null, ro = null;
    diLoadLibs().then(({ three }) => {
      if (dead || !host.current) return;
      if (!three || !window.THREE) return onFail && onFail();
      const THREE = window.THREE;
      let renderer;
      try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
      catch (e) { return onFail && onFail(); }
      if (!renderer || !renderer.getContext()) return onFail && onFail();

      const el = host.current;
      renderer.setClearAlpha(0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      el.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      const p = Object.assign({}, DI_PRESETS[domainId] || DI_PRESETS.air);
      const target = Object.assign({}, p);
      const morph = { m: 1, dur: 1.5 };

      const gridGeo = diGridGeo(THREE);
      const grid = new THREE.LineSegments(gridGeo, new THREE.LineBasicMaterial({ color: DI_ICE, transparent: true, opacity: 0 }));
      scene.add(grid);
      const gridBase = Float32Array.from(gridGeo.attributes.position.array);

      const rnd = diRnd(7331);
      const jitter = new Float32Array(DI_N * 4);
      for (let i = 0; i < DI_N; i++) {
        jitter[i * 4] = rnd() * Math.PI * 2;
        jitter[i * 4 + 1] = 0.4 + rnd() * 1.2;
        jitter[i * 4 + 2] = rnd();
        jitter[i * 4 + 3] = rnd() * Math.PI * 2;
      }
      let from = diShape(domainId, DI_N), to = from;
      let shaped = mode !== 'field';

      const tex = diTexture(THREE, glyph);
      const mk = (n, color, size, op) => {
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(n * 3), 3));
        const o = new THREE.Points(g, new THREE.PointsMaterial({ color, size, transparent: true, opacity: op, sizeAttenuation: true, map: tex, alphaTest: tex ? 0.18 : 0, depthWrite: false }));
        scene.add(o);
        return o;
      };
      const coldSize = glyph === 'box' ? 0.036 : 0.052, hotSize = glyph === 'box' ? 0.062 : 0.086;
      const cold = mk(DI_N - DI_HOT, DI_ICE, coldSize, 0.72);
      const hot = mk(DI_HOT, DI_AMBER, hotSize, 0.95);


      const ringGeo = (() => {
        const pts = [];
        for (let i = 0; i <= 96; i++) { const a = (i / 96) * Math.PI * 2; pts.push(Math.cos(a), 0, Math.sin(a)); }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        return g;
      })();
      const rings = [0, 1, 2].map(() => {
        const o = new THREE.Line(ringGeo, new THREE.LineBasicMaterial({ color: DI_ICE, transparent: true, opacity: 0 }));
        scene.add(o);
        return o;
      });

      const sweep = new THREE.Group();
      const sweepLines = [0, 1, 2, 3, 4].map((i) => {
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3));
        const o = new THREE.Line(g, new THREE.LineBasicMaterial({ color: DI_AMBER, transparent: true, opacity: 0 }));
        o.rotation.y = i * 0.075;
        sweep.add(o);
        return o;
      });
      scene.add(sweep);

      const stars = (() => {
        const n = 260, a = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) {
          const th = rnd() * Math.PI * 2, ph = Math.acos(2 * rnd() - 1), r = 11 + rnd() * 7;
          a[i * 3] = Math.sin(ph) * Math.cos(th) * r;
          a[i * 3 + 1] = Math.cos(ph) * r * 0.6;
          a[i * 3 + 2] = Math.sin(ph) * Math.sin(th) * r;
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(a, 3));
        const o = new THREE.Points(g, new THREE.PointsMaterial({ color: DI_ICE, size: 0.07, transparent: true, opacity: 0, sizeAttenuation: true }));
        scene.add(o);
        return o;
      })();

      const size = () => {
        const w = el.clientWidth || 640, h = el.clientHeight || 380;
        renderer.setSize(w, h, false);
        camera.aspect = w / Math.max(1, h);
        camera.updateProjectionMatrix();
      };
      size();
      if (window.ResizeObserver) { ro = new ResizeObserver(size); ro.observe(el); }

      const lean = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        lean.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        lean.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        play();
      };
      const onLeave = () => { lean.tx = 0; lean.ty = 0; };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);

      const ease = (x) => 1 - Math.pow(1 - x, 3);

      let last = 0, frames = 0;
      const draw = (t) => {
        frames++;
        /* The clock the frame already has, driving both tweens. dt is clamped so a backgrounded
           tab resuming does not teleport the swarm through its whole morph in one frame. */
        const dt = Math.min(0.05, Math.max(0, t - last));
        last = t;
        if (morph.m < 1) morph.m = Math.min(1, morph.m + dt / morph.dur);
        const k = 1 - Math.pow(0.0015, dt);
        for (const key in target) p[key] += (target[key] - p[key]) * k;

        cold.material.size = coldSize * opts.current.pSize;
        hot.material.size = hotSize * opts.current.pSize;
        const ext = opts.current.extent;

        grid.material.opacity = p.gridO;
        grid.position.y = p.gridY;
        if (p.ridge > 0.001) {
          const arr = gridGeo.attributes.position.array;
          for (let i = 0; i < arr.length; i += 3) arr[i + 1] = p.ridge * diRidge(gridBase[i], gridBase[i + 2]);
          gridGeo.attributes.position.needsUpdate = true;
        } else if (gridGeo.attributes.position.array[1] !== 0) {
          gridGeo.attributes.position.array.set(gridBase);
          gridGeo.attributes.position.needsUpdate = true;
        }

        /* The swarm. Each particle re-forms on its own slightly staggered schedule, so a domain
           change reads as a formation regrouping rather than a crossfade. */
        const ca = cold.geometry.attributes.position.array, ha = hot.geometry.attributes.position.array;
        const yaw = shaped ? Math.sin(t * 0.16) * 0.42 + p.roll * t * 0.1 : 0;
        const cy = Math.cos(yaw), sy = Math.sin(yaw);
        if (!shaped) {
          /* Free field: every contact keeps its own radius, bearing and rate, and `orbit` decides
             whether the medium reads as drift (air, land, sea) or as a closed orbit (space). */
          for (let i = 0; i < DI_N; i++) {
            const ph = jitter[i * 4], sp = jitter[i * 4 + 1], rr = jitter[i * 4 + 2], yy = jitter[i * 4 + 3] / (Math.PI * 2) * 2 - 1;
            const ang = ph + t * 0.1 * sp * (0.3 + 0.7 * p.orbit);
            const rad = (0.35 + rr * 0.95) * (0.62 + 0.38 * p.orbit) * (p.ringR / 3) * 3 * ext;
            const wob = (1 - p.orbit) * Math.sin(t * 0.5 + ph) * 0.5;
            const x = Math.cos(ang) * rad + wob;
            const z = Math.sin(ang) * rad;
            /* Ground domains do not fly. LAND locks every contact onto the terrain surface — its
               height comes from the same ridge function the grid is displaced by, so a vehicle
               rides the hill rather than hovering over it — and trades vertical wander for a
               slow track along the plane. */
            const y = p.ground > 0.5
              ? p.gridY + p.ridge * diRidge(x, z) + 0.045
              : p.yBase + yy * p.ySpread * ext + Math.sin(t * 0.7 + ph) * 0.05 + p.orbit * Math.sin(ang) * p.ringTilt * 1.6;
            const tgt = i < DI_HOT ? ha : ca, o = (i < DI_HOT ? i : i - DI_HOT) * 3;
            tgt[o] = x; tgt[o + 1] = y; tgt[o + 2] = z;
          }
          cold.geometry.attributes.position.needsUpdate = true;
          hot.geometry.attributes.position.needsUpdate = true;
        } else
        for (let i = 0; i < DI_N; i++) {
          const d = jitter[i * 4 + 2] * 0.34;
          const mi = Math.max(0, Math.min(1, (morph.m - d) / (1 - 0.34)));
          const e = ease(mi);
          const k3 = i * 3;
          const bx = from[k3] + (to[k3] - from[k3]) * e;
          const by = from[k3 + 1] + (to[k3 + 1] - from[k3 + 1]) * e;
          const bz = from[k3 + 2] + (to[k3 + 2] - from[k3 + 2]) * e;
          /* Mid-morph the particle bows outward: the formation opens up, then closes on target. */
          const open = Math.sin(mi * Math.PI) * 0.55;
          const ph = jitter[i * 4], sp = jitter[i * 4 + 1];
          const jx = Math.sin(t * 0.55 * sp + ph) * 0.020 + Math.cos(ph) * open;
          const jy = Math.cos(t * 0.62 * sp + ph) * 0.020 + Math.sin(ph * 1.7) * open * 0.6;
          const jz = Math.sin(t * 0.48 * sp + jitter[i * 4 + 3]) * 0.020;
          const x = (bx + jx) * DI_SCALE * ext, y = (by + jy) * DI_SCALE * ext + (p.ground > 0.5 ? p.gridY + 0.9 : 0), z = (bz + jz) * DI_SCALE * ext;
          const tgt = i < DI_HOT ? ha : ca, o = (i < DI_HOT ? i : i - DI_HOT) * 3;
          tgt[o] = x * cy + z * sy;
          tgt[o + 1] = y;
          tgt[o + 2] = -x * sy + z * cy;
          if (i === DI_N - 1) {
            cold.geometry.attributes.position.needsUpdate = true;
            hot.geometry.attributes.position.needsUpdate = true;
          }
        }

        rings.forEach((o, i) => {
          const grow = p.ping > 0.01 ? ((t * 0.26 + i * 0.34) % 1) : 1;
          const r = p.ringR * (p.ping > 0.01 ? grow : 1 + i * 0.3);
          o.scale.set(r, 1, r);
          o.rotation.x = p.ringTilt * (0.6 + i * 0.4);
          o.rotation.z = p.ringTilt * (i - 1) * 0.5;
          o.position.y = p.gridY + 0.05;
          o.material.opacity = p.ringO * (p.ping > 0.01 ? Math.max(0, 1 - grow) : 1 - i * 0.24);
        });

        sweep.rotation.y = -t * 0.38;
        sweep.position.y = p.gridY + 0.05;
        sweep.rotation.x = p.ringTilt * 0.4;
        sweepLines.forEach((o, i) => {
          o.scale.x = p.ringR * 1.6;
          o.material.opacity = p.sweepO * (1 - i * 0.19);
        });

        stars.material.opacity = p.starO * 0.65;
        stars.rotation.y = t * 0.01;

        lean.x += (lean.tx - lean.x) * (1 - Math.pow(0.002, dt));
        lean.y += (lean.ty - lean.y) * (1 - Math.pow(0.002, dt));
        camera.position.set(Math.sin(t * 0.05) * 0.8 + lean.x * 0.85, p.camY - lean.y * 0.5, p.camZ - Math.abs(lean.x) * 0.18);
        camera.lookAt(lean.x * -0.22, lean.y * 0.16, 0);
        renderer.render(scene, camera);

        /* Publish the amber contacts in normalised screen space: the HUD callout above the canvas
           draws its connector to a real particle, so the annotation is attached to the scene
           rather than floating over it. */
        if (hotRef) {
          const out = [];
          const v = new THREE.Vector3();
          for (let i = 0; i < DI_HOT; i++) {
            v.set(ha[i * 3], ha[i * 3 + 1], ha[i * 3 + 2]).project(camera);
            if (v.z > 1) continue;
            out.push({ x: (v.x * 0.5 + 0.5) * 100, y: (-v.y * 0.5 + 0.5) * 100 });
          }
          hotRef.current = out;
        }
      };

      let t0 = performance.now() / 1000, playing = false;
      const loop = () => { if (dead) return; draw(performance.now() / 1000 - t0); raf = requestAnimationFrame(loop); };
      const play = () => { if (!playing && live && !dead) { playing = true; loop(); } };
      const stop = () => { playing = false; cancelAnimationFrame(raf); };
      draw(0);
      setReady(true);
      play();
      if (window.IntersectionObserver) {
        io = new IntersectionObserver((es) => { if (!es[0]) return; es[0].isIntersecting ? play() : stop(); }, { threshold: 0.01 });
        io.observe(el);
      }

      listeners.current = () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };

      disposer.current = () => {
        [gridGeo, ringGeo, cold.geometry, hot.geometry, stars.geometry].forEach((g) => g && g.dispose && g.dispose());
        [grid.material, cold.material, hot.material, stars.material].concat(rings.map((r) => r.material), sweepLines.map((l) => l.material))
          .forEach((m) => m && m.dispose && m.dispose());
        sweepLines.forEach((l) => l.geometry && l.geometry.dispose());
        renderer.dispose();
        if (renderer.forceContextLoss) renderer.forceContextLoss();
      };

      api.current = {
        live,
        draw,
        shapeId: domainId,
        goto(id) {
          if (api.current) api.current.shapeId = id;
          const next = diShape(id, DI_N);
          /* Freeze the current interpolated cloud as the new origin, so a mid-flight change
             starts from where the swarm actually is rather than snapping back. */
          const snap = new Float32Array(DI_N * 3);
          for (let i = 0; i < DI_N * 3; i++) {
            const d = jitter[Math.floor(i / 3) * 4 + 2] * 0.34;
            const e = ease(Math.max(0, Math.min(1, (morph.m - d) / (1 - 0.34))));
            snap[i] = from[i] + (to[i] - from[i]) * e;
          }
          from = snap; to = next;
          Object.assign(target, DI_PRESETS[id] || DI_PRESETS.air);
          if (!live) { morph.m = 1; Object.assign(p, target); draw(last); return; }
          morph.m = 0;
          play();
          const seen = frames;
          setTimeout(() => {
            if (dead || frames !== seen) return;
            morph.m = 1;
            Object.assign(p, target);
            draw(last);
          }, 420);
        },
      };
    });

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      if (listeners.current) { listeners.current(); listeners.current = null; }
      if (disposer.current) { try { disposer.current(); } catch (e) {} disposer.current = null; }
      const el = host.current;
      if (el) while (el.firstChild) el.removeChild(el.firstChild);
      api.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (api.current && api.current.shapeId !== domainId) api.current.goto(domainId);
  }, [domainId, ready]);

  return <div ref={host} aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />;
}

/* The light instrument, and the fallback for every reason the 3D one cannot run: the SAME
   silhouettes, drawn as a drifting 2D swarm under a scanning beam. Canvas, no dependencies. */
function SwarmCanvas({ domainId, live, dense = false }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    let raf = 0, dead = false, io = null, ro = null, playing = false;
    const n = dense ? 320 : 620;
    const pts = diShape(domainId, n);
    const rnd = diRnd(99);
    const ph = new Float32Array(n * 2);
    for (let i = 0; i < n; i++) { ph[i * 2] = rnd() * Math.PI * 2; ph[i * 2 + 1] = 0.4 + rnd() * 1.1; }
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.max(1, cv.clientWidth * dpr);
      cv.height = Math.max(1, cv.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    if (window.ResizeObserver) { ro = new ResizeObserver(size); ro.observe(cv); }
    const t0 = performance.now();
    const draw = () => {
      const w = cv.clientWidth, h = cv.clientHeight, cx = w / 2, cy = h / 2;
      const R = Math.min(w * 0.44, h * 0.62), t = (performance.now() - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(218,232,242,0.10)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 2; i++) { ctx.beginPath(); ctx.ellipse(cx, cy, R * (0.72 + i * 0.24), R * (0.72 + i * 0.24) * 0.34, 0, 0, Math.PI * 2); ctx.stroke(); }
      const beamX = cx + Math.sin(t * 0.5) * R * 1.05;
      const g = ctx.createLinearGradient(beamX - 26, 0, beamX + 26, 0);
      g.addColorStop(0, 'rgba(236,154,0,0)');
      g.addColorStop(0.5, 'rgba(236,154,0,0.20)');
      g.addColorStop(1, 'rgba(236,154,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(beamX - 26, 0, 52, h);
      const yaw = Math.sin(t * 0.16) * 0.34;
      for (let i = 0; i < n; i++) {
        const k = i * 3;
        const jx = Math.sin(t * 0.5 * ph[i * 2 + 1] + ph[i * 2]) * 0.016;
        const jy = Math.cos(t * 0.58 * ph[i * 2 + 1] + ph[i * 2]) * 0.016;
        const x = (pts[k] + jx) * Math.cos(yaw) + pts[k + 2] * Math.sin(yaw);
        const y = pts[k + 1] + jy;
        const px = cx + x * R, py = cy - y * R;
        const lit = Math.max(0, 1 - Math.abs(px - beamX) / 30);
        const hotP = i < (dense ? 3 : 6);
        ctx.beginPath();
        ctx.arc(px, py, hotP ? 1.9 : 1.15, 0, Math.PI * 2);
        ctx.fillStyle = hotP ? `rgba(236,154,0,${0.6 + lit * 0.4})` : `rgba(218,232,242,${0.34 + lit * 0.55})`;
        ctx.fill();
      }
    };
    const loop = () => { if (dead) return; draw(); raf = requestAnimationFrame(loop); };
    draw();
    const play = () => { if (!playing && live) { playing = true; loop(); } };
    const stop = () => { playing = false; cancelAnimationFrame(raf); };
    if (window.IntersectionObserver) {
      io = new IntersectionObserver((es) => { es[0] && es[0].isIntersecting ? play() : stop(); }, { threshold: 0.05 });
      io.observe(cv);
    } else play();
    return () => { dead = true; cancelAnimationFrame(raf); if (io) io.disconnect(); if (ro) ro.disconnect(); };
  }, [domainId, live, dense]);
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />;
}

/* Corner brackets + a slow scanline: the page's own HUD vocabulary, reused so the instrument
   reads as one more chamfered frame rather than an embedded widget. */
function DomainInstrument({ domainId, scene = 'field', plate, live = true, dense = false, count = 900, glyph = 'dot', pSize = 1, extent = 1, corners = true, hotRef, children, style }) {
  const reduced = window.vvReduced ? window.vvReduced() : false;
  const on = live && !reduced;
  const [failed, setFailed] = React.useState(false);
  const three = (scene === 'swarm' || scene === 'field') && !failed;
  const mode = scene === 'off' ? 'off' : three ? 'three' : 'radar';
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(120% 90% at 50% 34%, rgba(40,129,181,0.10) 0%, rgba(0,17,33,0) 62%)', ...style }}>
      {plate && mode === 'off' ? <img src={plate} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.34, filter: 'grayscale(1)', maskImage: 'radial-gradient(circle closest-side, #000 0%, rgba(0,0,0,0.5) 42%, rgba(0,0,0,0) 72%)', WebkitMaskImage: 'radial-gradient(circle closest-side, #000 0%, rgba(0,0,0,0.5) 42%, rgba(0,0,0,0) 72%)' }} /> : null}
      {mode === 'three' ? <MorphScene key={scene + ':' + count + ':' + glyph} domainId={domainId} mode={scene} live={on} count={count} glyph={glyph} pSize={pSize} extent={extent} hotRef={hotRef} onFail={() => setFailed(true)} /> : null}
      {mode === 'radar' ? <SwarmCanvas domainId={domainId} live={on} dense={dense} /> : null}
      <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(to bottom, rgba(218,232,242,0.035) 0 1px, rgba(0,0,0,0) 1px 3px)', opacity: 0.6, pointerEvents: 'none' }} />
      {children}
      {/* Brackets paint LAST, above the readability scrim and the copy — they are the frame's own
         registration marks, so nothing in the canvas may cover them. */}
      {corners ? [['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h]) => (
        <span key={v + h} aria-hidden="true" style={{ position: 'absolute', [v]: 12, [h]: 12, width: 12, height: 12, [`border${v === 'top' ? 'Top' : 'Bottom'}`]: '1px solid var(--vv-amber)', [`border${h === 'left' ? 'Left' : 'Right'}`]: '1px solid var(--vv-amber)', opacity: 0.62, pointerEvents: 'none', zIndex: 4 }} />
      )) : null}
    </div>
  );
}

Object.assign(window, { DomainInstrument, SwarmCanvas, DI_PRESETS, diShape });
