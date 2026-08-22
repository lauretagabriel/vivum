# Bezel

```jsx
<Bezel accent={false}>
  <Eyebrow>Biological intelligence</Eyebrow>
  <h2>…</h2>
</Bezel>
```

A chamfered hairline frame with **nothing inside it** — the top-right and bottom-left corners are cut, so it reads as an instrument bezel rather than a card. Use it to mark out a block of copy sitting on a video plate: it gives the text a container without a fill, so the plate stays visible edge to edge. Runs the full width of its container by default; that is the intended proportion — a narrow bezel reads as a card and defeats the point.

`plateSrc` runs a video **inside** the frame: the chamfered polygon clips it and it keeps the `--plate-feather` alpha mask, so the footage fades to nothing before it reaches the outline instead of stopping against it. `plateShift` and `plateScale` place the plate at whatever size it should be — the frame crops the overflow, so scaling it up costs nothing. Cap the copy's measure well short of the frame (`maxWidth` ~520–560 on a full-width bezel) so the plate has clear space on the right.

Drawn as one continuous SVG path, not a border or a mask: `clip-path` slices a real border off at the chamfers, and a `mask-composite` ring leaves the diagonals blank because the punched hole is rectangular. `weight={2}` for display-scale frames; `color` accepts any line token.

Rules: no fill and no blur — if the copy needs help separating from the plate, hold the plate down with `plateOpacity` rather than adding a background here. `accent={false}` when the first child is an `Eyebrow`, whose 56×3 rule already marks the top-left corner. Cap the text measure inside it (~640–720px) even though the frame is full width; a 1200px line length is unreadable. One per view.
