One-line: Connection / health state as a dot plus a short label, for table cells and nav headers.

```jsx
<StatusDot tone="live" pulse>Streaming · 240 Hz</StatusDot>
<StatusDot tone="idle">Dormant</StatusDot>
```

Only one pulsing dot per view. Amber `attention` counts against the accent budget.
