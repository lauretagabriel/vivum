One-line: The system's table — no zebra striping, no vertical rules, hairline row separators only.

```jsx
<DataTable
  columns={[{key:'unit',label:'Unit'},{key:'lat',label:'Latency',mono:true,align:'right',tone:'data'}]}
  rows={[{unit:'vv-edge-041', lat:'4.2 ms'}]}
/>
```

Wrap in `<Panel pad={0}>` so the header's hairline meets the panel edge. Put `StatusDot` or `Badge` nodes directly in cells.
