One-line: The system's action primitive — use amber `primary` for the single most important action on a view and `secondary` for everything else.

```jsx
<Button variant="primary" icon="arrow_forward">Request access</Button>
<Button variant="secondary" size="sm">Read the paper</Button>
<Button variant="quiet" iconAfter="north_east">Documentation</Button>
```

Rules: never two amber buttons in one view; buttons do not move on hover (background shifts only); press compresses 0.5%. On ice sheets use `onLight`.

## The edge

One shape for every button: a **square rectangle** — no corner radius — outlined with a 1px rule, filled with a 7% wash of that same colour, and labelled in it. `primary` is amber (`#EC9A00`) throughout, `secondary` ice (`#DAE8F2`), so the two read as a matched pair and neither becomes a slab. Hover lifts the wash to 14% and nothing else changes.

The wash is what keeps amber legible as an accent at hero scale: a solid amber button next to the outlined chrome of the rest of the system reads as a foreign control. Do not add a radius, a shadow, or a gradient — the square outline is the brand's action, and `quiet` (blue label, no rule) is the only variant without one.
