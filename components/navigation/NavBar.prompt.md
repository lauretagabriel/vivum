One-line: The marketing header — 72px tall, translucent navy with blur, amber underline on the active link.

```jsx
<NavBar logoSrc="assets/vivum-logo-gray.svg" links={[{href:'/platform',label:'Platform'}]}
  activeHref="/platform" cta={{ label: 'Request a briefing' }} />
```

Use `transparent` only when the bar sits over a video hero, and keep the blur variant everywhere else. Never more than five links or one CTA.
