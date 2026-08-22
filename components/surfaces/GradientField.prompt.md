One-line: Gradient background surface — the brand's default backdrop when there is no video.

```jsx
<GradientField field="signature" pad="96px 80px" minHeight={520}>…</GradientField>
<GradientField field="ember" pad="64px 80px">…</GradientField>
```

**Opaque fields** own their whole area — use them where the surface is the whole view: `signature` for covers and section openers, `horizon` for long pages, `well` for footers and closings, `aperture`/`twin` for hero art, `ember` for CTA bands only. Never rotate the signature field to a corner.

**Blooms** end at transparent and composite over the canvas, so a page of stacked sections reads as one continuous field with no seam between bands. Use these for any multi-section page:

```jsx
<GradientField field="data" pad="120px 80px">…</GradientField>
<GradientField field="base" pad="120px 80px">…</GradientField>
```

`crest` glows from the top edge · `base` from the bottom · `left`/`right` from a side · `core` from the centre · `data` is a blue bloom for technical sections · `signal` an amber bloom for closing/CTA sections. Never stack two blooms of the same kind back to back — alternate the light source so the eye reads a rhythm rather than a repeat.
