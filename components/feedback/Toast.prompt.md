One-line: Corner notice for an event that just happened — one line of detail, no icons beyond the status dot.

```jsx
<Toast title="Model deployed" tone="live" onClose={dismiss}>Wave 1 · 42 units · 0 rollbacks</Toast>
```

Stack bottom-right with 10px gaps, three maximum. Never use a toast for an error the user must act on — use `Modal`.
