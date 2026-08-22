One-line: Blocking dialog for confirmations and short forms.

```jsx
<Modal title="Deploy model v2.14" meta="118 edge units" onClose={close}
  actions={<><Button variant="secondary" size="sm">Cancel</Button><Button variant="primary" size="sm">Deploy</Button></>}>
  Rollout is staged in three waves.
</Modal>
```

The parent must be `position: relative` — the scrim is absolutely positioned so it works inside prototype frames.
