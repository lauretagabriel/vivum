One-line: Console navigation rail — the active row gets a 2px amber left indicator and a 4% ice wash.

```jsx
<SideNav logoSrc="assets/vivum-logo-gray.svg" activeId="fleet" onSelect={setView}
  sections={[{ label: 'Operate', items: [{ id: 'fleet', label: 'Fleet', icon: 'radar' }] }]} />
```

Section labels are uppercase graphite at 10px. Keep icons to one per row and always from the FontAwesome Light set.
