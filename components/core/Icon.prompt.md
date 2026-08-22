One-line: FontAwesome Light glyph, inline SVG, inherits text color — the system's only icon primitive.

```jsx
<Icon name="radar" size={20} color="var(--vv-blue)" />
<Icon name="memory" size={16} />
```

The face is **FontAwesome Light** — a hairline stroke that matches the system's 1px borders and thin type. Glyphs render as inline SVG from path data in the bundle, so there is no webfont to load and no per-page setup. Sizes: 16 inline with body copy, 20 default and in buttons, 24 in nav and empty states. Names are kebab-case FontAwesome names: `radar`, `memory`, `chart-line`, `sitemap`, `circle-nodes`, `arrow-up-right`. The Material-era names the kits were first written against (`developer_board`, `hub`, `arrow_forward`) still resolve to their chosen replacement, so old call sites keep working.
