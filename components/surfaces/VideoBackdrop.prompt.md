One-line: The brand's hero surface — a muted looping plate with a navy scrim over it and the headline on top.

```jsx
<VideoBackdrop src="assets/plates/terrain.mp4" scrim="bottom" minHeight={640}>
  <Eyebrow>Evolutionary AI</Eyebrow>
  <h1>Autonomy where the cloud can't reach</h1>
</VideoBackdrop>
```

Rules: the plate is always muted, looping, and treated with `--plate-filter` (`grayscale(1) contrast(1.05) opacity(0.1)` — fully desaturated and held at 10%, so the plate is texture in the navy, not footage); the scrim — never the video — carries legibility; body copy must clear 4.5:1 against the darkest region of the plate. Match the scrim to the text position: `bottom` for base-aligned copy, `left` for a left column, `vignette` for centred copy. `scrim="none"` drops the overlay: use it only with `circleMask`, where the mask alone shapes the footage and the section is otherwise flat `#001121` — pair it with `edgeFade={false}` so no gradient but the mask paints.

`circleMask` feathers the plate with a radial **alpha mask** on the media element itself — `radial-gradient(ellipse closest-side …)`, fully transparent by 82% — so the footage dissolves into the canvas on all four edges and never shows a rectangle. Because the mask is sized to the box's closest sides it fades out inside every edge at any aspect ratio. `plateShift` on a masked plate insets the plate's box (narrower, anchored right) rather than translating it — a translated plate hangs outside the section, where `overflow: hidden` clips the falloff and the footage meets the page edge in a straight cut. `plateScale` grows the plate and its mask together around their own centre (1.3 on the homepage's second plate); a feathered plate may overflow the section, since alpha still reaches zero inside it. Use it on a mid-page plate beside body copy: `plateShift="40%"` pushes the footage clear of a left-hand text column, and `plateOpacity` (default 0.1, from the token) lifts a masked plate to around 0.45 so it survives the falloff. Do not substitute a canvas-colored overlay for this — an overlay only hides edges where its own color matches the section behind it.

`edgeFade` is on by default: the top and bottom 15% dissolve into the canvas so a plate section flows into the sections around it with no seam. Only disable it for a plate that fills the entire viewport.

Plates in this system: `assets/plates/home-banner-video.mp4` and `assets/plates/biological-intelligence.mp4`.
