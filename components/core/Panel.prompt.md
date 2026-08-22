One-line: Every card, table wrapper, and side panel in the system — slate fill, sharp corners, no shadow.

```jsx
<Panel title="Fleet health" meta="Updated 12s ago" actions={<IconButton icon="refresh" label="Refresh" size="sm" />}>
  …
</Panel>
```

Never add a shadow or a colored left border. On a slate page use `quiet` or `outline` so panels don't stack the same fill twice.
