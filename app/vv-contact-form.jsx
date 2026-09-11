const DS_F = () => window.VivumAIDesignSystem_b2be15;

/* ── Page-scale fields ────────────────────────────────────────────────────────────────────
   The kit's Input/Select are console scale: 40px tall, 14px text, built for a dense product
   panel. A marketing contact form is the opposite problem — it is the one thing on the page a
   visitor has to operate, on a phone, possibly one-handed. So these are built at page scale
   (54px, 16px — under 16px iOS zooms the whole viewport on focus) from the same tokens the
   kit's fields use: 4% ice wash, hairline border, blue focus, amber error. Same material,
   right size. `fieldStyle` swaps the chrome without touching the geometry. */
/* Two rules that cannot be inline: the popover's entrance keyframe, and default link colours
   for the page (an editor-added link must never fall back to browser blue). Injected once. */
if (typeof document !== 'undefined' && !document.getElementById('vv-ct-css')) {
  const _s = document.createElement('style');
  _s.id = 'vv-ct-css';
  _s.textContent = '@keyframes ctPop{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}'
    + '#contact a{color:var(--vv-ice);text-decoration:none}#contact a:hover{color:var(--vv-amber)}'
    + '@media (prefers-reduced-motion:reduce){#contact *{animation-duration:0.01ms!important}}';
  document.head.appendChild(_s);
}

const CT_H = 54;
const CT_LBL = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vv-graphite)', lineHeight: 1 };
const CT_TXT = { fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.5, color: 'var(--vv-ice)', letterSpacing: '0.005em' };
const CT_EMOJI = "'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji','Twemoji Mozilla',sans-serif";
const CT_EASE = 'cubic-bezier(.16,1,.3,1)';

function ctChrome(variant, state) {
  const line = state === 'error' ? 'var(--vv-amber)' : state === 'focus' ? 'var(--vv-blue)' : null;
  const t = { transition: `border-color 160ms ${CT_EASE}, box-shadow 160ms ${CT_EASE}, background 160ms ${CT_EASE}` };
  if (variant === 'underline') {
    return { ...t, background: 'transparent', border: 0, borderBottom: `1px solid ${line || 'var(--vv-ice-14)'}`, borderRadius: 0, boxShadow: state === 'focus' ? '0 1px 0 var(--vv-blue)' : 'none' };
  }
  if (variant === 'outline') {
    return { ...t, background: 'transparent', border: `1px solid ${line || 'var(--vv-ice-14)'}`, borderRadius: 0, boxShadow: state === 'focus' ? 'inset 0 0 0 1px var(--vv-blue-24)' : 'none' };
  }
  return { ...t, background: 'var(--vv-ice-04)', border: `1px solid ${line || 'var(--line-hairline)'}`, borderRadius: 'var(--radius-sm)', boxShadow: state === 'focus' ? 'inset 0 0 0 1px var(--vv-blue-24)' : 'none' };
}
const ctPadX = (variant) => (variant === 'underline' ? 2 : 16);

/* label · control · one caption slot. The caption is always rendered, never conditionally
   mounted: an error appearing under a field must not push the rest of the form down the page
   while the user is reading it. */
function CtRow({ label, hint, error, variant, htmlFor, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0, ...style }}>
      {label ? <label htmlFor={htmlFor} style={CT_LBL}>{label}</label> : null}
      {children}
      <span aria-live="polite" style={{ minHeight: 15, fontSize: 12.5, lineHeight: 1.2, color: error ? 'var(--vv-amber)' : 'var(--text-caption)' }}>{error || hint || ''}</span>
    </div>
  );
}

function CtField({ id, label, hint, error, value, onChange, onBlur, placeholder, type = 'text', variant, autoComplete, inputMode, inputRef }) {
  const [focus, setFocus] = React.useState(false);
  const state = error ? 'error' : focus ? 'focus' : 'rest';
  return (
    <CtRow label={label} hint={hint} error={error} variant={variant} htmlFor={id}>
      <span style={{ display: 'flex', alignItems: 'center', height: CT_H, padding: `0 ${ctPadX(variant)}px`, boxSizing: 'border-box', ...ctChrome(variant, state) }}>
        <input id={id} ref={inputRef} type={type} value={value} placeholder={placeholder} autoComplete={autoComplete} inputMode={inputMode}
          onChange={(e) => onChange(e.target.value)} onFocus={() => setFocus(true)}
          onBlur={() => { setFocus(false); onBlur && onBlur(); }}
          style={{ flex: 1, minWidth: 0, background: 'transparent', border: 0, outline: 'none', padding: 0, ...CT_TXT }} />
      </span>
    </CtRow>
  );
}

function CtArea({ id, label, hint, error, value, onChange, onBlur, placeholder, variant, rows = 6 }) {
  const [focus, setFocus] = React.useState(false);
  const state = error ? 'error' : focus ? 'focus' : 'rest';
  return (
    <CtRow label={label} hint={hint} error={error} variant={variant} htmlFor={id}>
      <span style={{ display: 'block', padding: variant === 'underline' ? '0 2px 12px' : '14px 16px', boxSizing: 'border-box', ...ctChrome(variant, state) }}>
        <textarea id={id} rows={rows} value={value} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)} onFocus={() => setFocus(true)}
          onBlur={() => { setFocus(false); onBlur && onBlur(); }}
          style={{ display: 'block', width: '100%', minHeight: 132, resize: 'vertical', background: 'transparent', border: 0, outline: 'none', padding: 0, ...CT_TXT }} />
      </span>
    </CtRow>
  );
}

/* ── One popover, two pickers ─────────────────────────────────────────────────────────────
   Native <select> can't carry a flag, a dial code and a searchable list, and on the topic
   field it can't show all five options at once — so both pickers are one listbox
   implementation instead of two half-solutions. Full keyboard contract: type-ahead search,
   arrows, Home/End, Enter, Escape, click-outside, and roving aria-activedescendant. */
function useCtDismiss(ref, open, close) {
  React.useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) close(); };
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
    document.addEventListener('pointerdown', onDown, true);
    document.addEventListener('keydown', onKey, true);
    return () => { document.removeEventListener('pointerdown', onDown, true); document.removeEventListener('keydown', onKey, true); };
  }, [open, close, ref]);
}

function CtOption({ item, active, selected, onPick, id, showDial, dataI }) {
  const { Icon } = DS_F();
  return (
    <li id={id} role="option" aria-selected={selected} data-i={dataI}
      onMouseDown={(e) => { e.preventDefault(); onPick(item); }}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px 11px 12px', cursor: 'pointer', minWidth: 0,
        borderLeft: `2px solid ${active ? 'var(--vv-amber)' : 'transparent'}`,
        background: active ? 'var(--vv-amber-08)' : 'transparent', transition: `background 120ms ${CT_EASE}`,
      }}>
      {item.flag ? <span aria-hidden="true" style={{ fontFamily: CT_EMOJI, fontSize: 15, lineHeight: 1, flex: '0 0 auto', width: 22 }}>{item.flag}</span> : null}
      <span style={{ flex: 1, minWidth: 0, fontSize: 14.5, lineHeight: 1.35, color: active || selected ? 'var(--vv-ice)' : 'var(--vv-ice-82)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
      {showDial ? <span style={{ flex: '0 0 auto', fontFamily: 'var(--font-mono)', fontSize: 12.5, letterSpacing: '0.04em', color: 'var(--vv-graphite)', fontVariantNumeric: 'tabular-nums' }}>{item.dial}</span> : null}
      {selected ? <Icon name="check" size={14} color="var(--vv-amber)" style={{ flex: '0 0 auto' }} /> : null}
    </li>
  );
}

function CtListbox({ listId, items, selectedValue, active, setActive, onPick, showDial, search, setSearch, searchPlaceholder, width, align = 'left' }) {
  const { Icon } = DS_F();
  const listRef = React.useRef(null);
  React.useEffect(() => {
    const el = listRef.current && listRef.current.querySelector(`[data-i="${active}"]`);
    if (!el) return;
    const box = listRef.current;
    if (el.offsetTop < box.scrollTop) box.scrollTop = el.offsetTop;
    else if (el.offsetTop + el.offsetHeight > box.scrollTop + box.clientHeight) box.scrollTop = el.offsetTop + el.offsetHeight - box.clientHeight;
  }, [active]);
  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 6px)', zIndex: 40, width: width || '100%',
      [align]: 0, background: 'var(--surface-raised)', border: '1px solid var(--vv-ice-14)',
      borderRadius: 'var(--radius-sm)', boxShadow: '0 24px 60px -18px rgba(0,4,10,0.86)', overflow: 'hidden',
      animation: `ctPop 200ms ${CT_EASE} both`,
    }}>
      {setSearch ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '0 12px', height: 42, borderBottom: '1px solid var(--line-hairline)' }}>
          <Icon name="magnifying-glass" size={14} color="var(--vv-graphite)" />
          <input autoFocus value={search} onChange={(e) => { setSearch(e.target.value); setActive(0); }} placeholder={searchPlaceholder}
            aria-label={searchPlaceholder} aria-controls={listId} aria-autocomplete="list"
            style={{ flex: 1, minWidth: 0, background: 'transparent', border: 0, outline: 'none', padding: 0, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--vv-ice)' }} />
        </div>
      ) : null}
      <ul ref={listRef} id={listId} role="listbox" style={{ listStyle: 'none', margin: 0, padding: '4px 0', maxHeight: 268, overflowY: 'auto', overscrollBehavior: 'contain' }}>
        {items.length ? items.map((it, i) => (
          <CtOption key={it.value} dataI={i} id={`${listId}-o${i}`} item={it} active={i === active} selected={it.value === selectedValue} onPick={onPick} showDial={showDial} />
        )) : (
          <li style={{ padding: '14px', fontSize: 13.5, color: 'var(--vv-graphite)' }}>No match</li>
        )}
      </ul>
    </div>
  );
}

/* Shared open/active/keyboard state for both pickers. */
function useCtPicker(items, selectedValue, onSelect) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const close = React.useCallback(() => { setOpen(false); }, []);
  const pick = (it) => { onSelect(it); setOpen(false); };
  const openAt = () => {
    const i = items.findIndex((x) => x.value === selectedValue);
    setActive(i < 0 ? 0 : i);
    setOpen(true);
  };
  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAt(); }
      return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(items.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(items.length - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); if (items[active]) pick(items[active]); }
    else if (e.key === 'Tab') { setOpen(false); }
  };
  return { open, setOpen, openAt, close, active, setActive, pick, onKeyDown };
}

/* Phone: one field, two controls. The dial code is a trigger inside the field's own chrome
   rather than a separate select beside it, so the number and its country read as the single
   value they are — and the number input keeps the full remaining width on a phone. */
function CtPhone({ label, hint, variant, country, setCountry, phone, setPhone, error, onBlur }) {
  const { Icon } = DS_F();
  const raw = window.VV_COUNTRIES || [];
  const all = React.useMemo(() => raw.map(([iso, name, dial, flag]) => ({ value: iso, label: name, dial, flag })), [raw]);
  const [search, setSearch] = React.useState('');
  const items = React.useMemo(() => {
    const q = search.trim().toLowerCase().replace(/^\+/, '');
    if (!q) return all;
    return all.filter((c) => c.label.toLowerCase().includes(q) || c.value.toLowerCase() === q || c.dial.replace('+', '').startsWith(q));
  }, [all, search]);
  const sel = all.find((c) => c.value === country) || all[0];
  const p = useCtPicker(items, country, (it) => { setCountry(it.value); setSearch(''); });
  const ref = React.useRef(null);
  useCtDismiss(ref, p.open, () => { p.close(); setSearch(''); });
  const [focus, setFocus] = React.useState(false);
  const state = error ? 'error' : (focus || p.open) ? 'focus' : 'rest';
  if (!sel) return null;
  return (
    <CtRow label={label} hint={hint} error={error} variant={variant} htmlFor="ct-phone">
      <span ref={ref} style={{ position: 'relative', display: 'flex', alignItems: 'stretch', height: CT_H, boxSizing: 'border-box', ...ctChrome(variant, state) }}>
        <button type="button" role="combobox" aria-expanded={p.open} aria-haspopup="listbox"
          aria-controls="ct-cc-list" aria-activedescendant={p.open && items[p.active] ? `ct-cc-list-o${p.active}` : undefined}
          aria-label={`Country code — ${sel.label} ${sel.dial}`}
          onClick={() => (p.open ? p.close() : p.openAt())} onKeyDown={p.onKeyDown}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, height: '100%', padding: `0 12px 0 ${ctPadX(variant)}px`,
            background: 'transparent', border: 0, borderRight: `1px solid ${variant === 'underline' ? 'transparent' : 'var(--line-hairline)'}`,
            cursor: 'pointer', flex: '0 0 auto', color: 'var(--vv-ice)', marginRight: variant === 'underline' ? 4 : 0,
          }}>
          <span aria-hidden="true" style={{ fontFamily: CT_EMOJI, fontSize: 15, lineHeight: 1 }}>{sel.flag}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums' }}>{sel.dial}</span>
          <Icon name="angle-down" size={12} color="var(--vv-graphite)" style={{ transform: p.open ? 'rotate(180deg)' : 'none', transition: `transform 200ms ${CT_EASE}` }} />
        </button>
        <input id="ct-phone" type="tel" inputMode="tel" autoComplete="tel-national" value={phone} placeholder="555 000 1234"
          onChange={(e) => setPhone(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => { setFocus(false); onBlur && onBlur(); }}
          style={{ flex: 1, minWidth: 0, background: 'transparent', border: 0, outline: 'none', padding: `0 ${ctPadX(variant)}px 0 12px`, ...CT_TXT }} />
        {p.open ? (
          <CtListbox listId="ct-cc-list" items={items} selectedValue={country} active={p.active} setActive={p.setActive}
            onPick={p.pick} showDial search={search} setSearch={setSearch} searchPlaceholder="Search country or code"
            width="min(340px, calc(100vw - 3rem))" />
        ) : null}
      </span>
    </CtRow>
  );
}

function CtSelect({ id, label, hint, error, variant, options, value, onChange, placeholder, onBlur }) {
  const { Icon } = DS_F();
  const items = options.map((o) => ({ value: o, label: o }));
  const p = useCtPicker(items, value, (it) => { onChange(it.value); onBlur && onBlur(it.value); });
  const ref = React.useRef(null);
  useCtDismiss(ref, p.open, p.close);
  const state = error ? 'error' : p.open ? 'focus' : 'rest';
  return (
    <CtRow label={label} hint={hint} error={error} variant={variant}>
      <span ref={ref} style={{ position: 'relative', display: 'block' }}>
        <button type="button" id={id} role="combobox" aria-expanded={p.open} aria-haspopup="listbox" aria-controls={`${id}-list`}
          aria-label={typeof label === 'string' ? label : undefined}
          aria-activedescendant={p.open && items[p.active] ? `${id}-list-o${p.active}` : undefined}
          onClick={() => (p.open ? p.close() : p.openAt())} onKeyDown={p.onKeyDown}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, width: '100%', height: CT_H,
            padding: `0 ${ctPadX(variant)}px`, boxSizing: 'border-box', cursor: 'pointer', textAlign: 'left', ...ctChrome(variant, state),
          }}>
          <span style={{ ...CT_TXT, color: value ? 'var(--vv-ice)' : 'var(--vv-graphite)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value || placeholder}</span>
          <Icon name="angle-down" size={13} color="var(--vv-graphite)" style={{ flex: '0 0 auto', transform: p.open ? 'rotate(180deg)' : 'none', transition: `transform 200ms ${CT_EASE}` }} />
        </button>
        {p.open ? (
          <CtListbox listId={`${id}-list`} items={items} selectedValue={value} active={p.active} setActive={p.setActive} onPick={p.pick} />
        ) : null}
      </span>
    </CtRow>
  );
}

/* The same five choices as visible targets. Five options is under the threshold where a
   dropdown earns its collapse — chips cost one tap instead of two and show the whole set
   without opening anything. Live on the `topicControl` tweak. */
function CtChips({ label, hint, error, options, value, onChange }) {
  return (
    <CtRow label={label} hint={hint} error={error}>
      <div role="radiogroup" aria-label={typeof label === 'string' ? label : 'Topic'} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {options.map((o) => {
          const on = value === o;
          return (
            <button key={o} type="button" role="radio" aria-checked={on} onClick={() => onChange(on ? '' : o)}
              style={{
                minHeight: 44, padding: '10px 16px', cursor: 'pointer', textAlign: 'left',
                fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.3,
                color: on ? 'var(--vv-ice)' : 'var(--vv-ice-82)',
                background: on ? 'var(--vv-amber-08)' : 'var(--vv-ice-04)',
                border: `1px solid ${on ? 'var(--vv-amber-24)' : 'var(--line-hairline)'}`,
                borderRadius: 'var(--radius-sm)', transition: `background 160ms ${CT_EASE}, border-color 160ms ${CT_EASE}, color 160ms ${CT_EASE}`,
              }}>{o}</button>
          );
        })}
      </div>
    </CtRow>
  );
}

const CT_TOPICS = ['Robotics', 'Autonomy', 'Network & Traffic Management', 'High-Performance Real-Time Applications', 'Something else'];
const CT_OTHER = 'Something else';
const CT_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function CtReceipt({ ref_, reply, onReset, mobile }) {
  const { Icon, Button } = DS_F();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px, 2vw, 26px)', minHeight: 340, justifyContent: 'center' }}>
      <Icon name="circle-check" size={30} color="var(--vv-amber)" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3 style={{ margin: 0, fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--vv-ice)' }}>Message sent</h3>
        <p style={{ margin: 0, fontSize: 'clamp(15.5px, 1.2vw, 17px)', lineHeight: 1.6, color: 'var(--vv-ice-82)', maxWidth: '46ch', textWrap: 'pretty' }}>
          It is with a systems engineer, not a queue. You will hear back from a person who can answer the technical question.
        </p>
      </div>
      <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 20, rowGap: 0, borderTop: '1px solid var(--line-hairline)' }}>
        {[['Reference', ref_], ['Reply by', reply]].map(([k, v]) => (
          <React.Fragment key={k}>
            <dt style={{ ...CT_LBL, padding: '14px 0', borderBottom: '1px solid var(--line-hairline)' }}>{k}</dt>
            <dd style={{ margin: 0, padding: '14px 0', borderBottom: '1px solid var(--line-hairline)', fontFamily: 'var(--font-mono)', fontSize: 13.5, letterSpacing: '0.06em', color: 'var(--vv-ice)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{v}</dd>
          </React.Fragment>
        ))}
      </dl>
      <Button variant="secondary" size="lg" onClick={onReset} style={mobile ? { width: '100%' } : { alignSelf: 'flex-start' }}>Send another</Button>
    </div>
  );
}

function CtForm({ variant = 'wash', topicControl = 'dropdown', pair = false, sendWidth = 'full', mobile, onToast }) {
  const { Button, Icon } = DS_F();
  const emailRef = React.useRef(null);
  /* True once the user has done anything at all — gates blur-validation so a programmatic
     focus/blur cycle (see setEmailRef below) can never surface an error the user didn't earn,
     no matter how many times layout hooks remount the field before settling. */
  const interactedRef = React.useRef(false);
  React.useEffect(() => {
    const mark = () => { interactedRef.current = true; };
    window.addEventListener('pointerdown', mark, { capture: true, once: true });
    window.addEventListener('keydown', mark, { capture: true, once: true });
    return () => {
      window.removeEventListener('pointerdown', mark, { capture: true });
      window.removeEventListener('keydown', mark, { capture: true });
    };
  }, []);
  /* A ref callback, not a one-shot mount effect: it fires again on every remount of the input
     (a layout hook flipping after first paint replaces the node), so the pending focus keeps
     finding whichever element is actually in the DOM instead of landing on one that's already
     gone. */
  const setEmailRef = React.useCallback((node) => {
    emailRef.current = node;
    /* Synchronous, not requestAnimationFrame: rAF is only serviced once the page has an
       actual painted frame, and an inactive/headless capture of this page can starve that
       indefinitely. Focusing directly off the ref attach has no such dependency. */
    if (node && !interactedRef.current && document.activeElement !== node) node.focus({ preventScroll: true });
  }, []);
  const [email, setEmail] = React.useState('');
  const [country, setCountry] = React.useState('US');
  const [phone, setPhone] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [other, setOther] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [err, setErr] = React.useState({});
  const [sent, setSent] = React.useState(null);

  const check = (k, v) => {
    if (k === 'email') return !v.trim() ? 'An email address is how we reply.' : CT_EMAIL_RE.test(v.trim()) ? '' : 'That address is missing something.';
    if (k === 'phone') return !v.trim() ? '' : v.replace(/\D/g, '').length >= 6 ? '' : 'That number looks short.';
    if (k === 'other') return topic === CT_OTHER && !v.trim() ? 'Tell us in a word or two.' : '';
    if (k === 'msg') return v.trim().length ? '' : 'A sentence is enough to start.';
    return '';
  };
  /* Validate on blur, never on keystroke — an error that appears while you are still typing
     the address is noise, and it is the single most common defect in web forms. */
  const blur = (k, v) => { if (!interactedRef.current) return; setErr((e) => ({ ...e, [k]: check(k, v) })); };
  const edit = (k, set) => (v) => { set(v); if (err[k]) setErr((e) => ({ ...e, [k]: '' })); };

  const submit = (e) => {
    e.preventDefault();
    const next = { email: check('email', email), phone: check('phone', phone), other: check('other', other), msg: check('msg', msg) };
    setErr(next);
    const bad = Object.keys(next).find((k) => next[k]);
    if (bad) {
      const el = document.getElementById(bad === 'msg' ? 'ct-msg' : bad === 'other' ? 'ct-other' : bad === 'phone' ? 'ct-phone' : 'ct-email');
      if (el) el.focus({ preventScroll: false });
      return;
    }
    const d = new Date();
    const rid = `VV-${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${Math.random().toString(16).slice(2, 6).toUpperCase()}`;
    /* Two business days, counted honestly rather than +2 calendar days. */
    const by = new Date(d);
    let left = 2;
    while (left > 0) { by.setDate(by.getDate() + 1); if (by.getDay() !== 0 && by.getDay() !== 6) left -= 1; }
    setSent({ ref: rid, reply: by.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) });
    if (onToast) onToast({ title: 'Message sent', body: `Reference ${rid}`, tone: 'live' });
  };

  if (sent) return <CtReceipt ref_={sent.ref} reply={sent.reply} mobile={mobile} onReset={() => { setSent(null); setEmail(''); setPhone(''); setTopic(''); setOther(''); setMsg(''); setErr({}); }} />;

  const emailField = <CtField id="ct-email" type="email" autoComplete="email" inputRef={setEmailRef} variant={variant} label="Your email address"
    placeholder="name@organization.com" value={email} onChange={edit('email', setEmail)} onBlur={() => blur('email', email)} error={err.email} />;
  const phoneField = <CtPhone variant={variant} label={<>Your phone <span style={{ color: 'var(--vv-ice-40, rgba(218,232,242,0.45))', letterSpacing: '0.18em' }}>(optional)</span></>}
    country={country} setCountry={setCountry} phone={phone} setPhone={edit('phone', setPhone)} error={err.phone} onBlur={() => blur('phone', phone)} />;

  return (
    <form noValidate onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 0.9vw, 14px)' }}>
      {pair && !mobile ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'clamp(14px, 1.6vw, 24px)' }}>{emailField}{phoneField}</div>
      ) : <>{emailField}{phoneField}</>}

      {topicControl === 'chips'
        ? <CtChips label="What can we help with?" options={CT_TOPICS} value={topic} onChange={(v) => { setTopic(v); setErr((e) => ({ ...e, other: '' })); }} />
        : <CtSelect id="ct-topic" variant={variant} label="What can we help with?" placeholder="Select a topic" options={CT_TOPICS} value={topic}
            onChange={(v) => { setTopic(v); setErr((e) => ({ ...e, other: '' })); }} />}

      <CtArea id="ct-msg" variant={variant} label="Your message" placeholder="Enter your message here"
        hint="The platform, the constraint, the question."
        value={msg} onChange={edit('msg', setMsg)} onBlur={() => blur('msg', msg)} error={err.msg} />

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(14px, 1.6vw, 22px)', marginTop: 'clamp(4px, 0.6vw, 10px)' }}>
        <Button type="submit" variant="primary" size="lg" iconAfter="arrow-right"
          style={(sendWidth === 'full' || mobile) ? { width: '100%', height: 58, fontSize: 17 } : { height: 58, padding: '0 34px', fontSize: 17 }}>Send message</Button>
      </div>
    </form>
  );
}

Object.assign(window, { CtForm, CtField, CtArea, CtPhone, CtSelect, CtChips, CT_LBL, CT_EMOJI, CT_EASE, CT_TOPICS });
