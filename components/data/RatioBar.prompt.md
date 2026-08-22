One-line: Proportion in one bar — used for the brand color-ratio graphic, compute budgets, and fleet mix.

```jsx
<RatioBar segments={[
  { label: 'On-device', value: 62, color: 'var(--vv-blue)' },
  { label: 'Edge relay', value: 26, color: 'var(--vv-slate)' },
  { label: 'Cloud', value: 12, color: 'var(--vv-amber)' },
]} />
```

Segments are hard-edged and flush — never rounded, never gapped.
