// Runtime support for data-hover / data-focus / data-focus-within attributes
// (ported from the original build's style-hover / style-focus behavior).
// Applies the declared inline styles on hover/focus and restores originals after.

function parseDecls(css) {
  const out = [];
  for (const decl of String(css).split(';')) {
    const i = decl.indexOf(':');
    if (i === -1) continue;
    const prop = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (prop && value) out.push([prop, value]);
  }
  return out;
}

function apply(el, attr) {
  if (el.__dcSaved && el.__dcSaved[attr]) return;
  const css = el.getAttribute(attr);
  if (!css) return;
  const decls = parseDecls(css);
  const saved = [];
  for (const [prop, value] of decls) {
    saved.push([prop, el.style.getPropertyValue(prop), el.style.getPropertyPriority(prop)]);
    el.style.setProperty(prop, value);
  }
  el.__dcSaved = el.__dcSaved || {};
  el.__dcSaved[attr] = saved;
}

function restore(el, attr) {
  const saved = el.__dcSaved && el.__dcSaved[attr];
  if (!saved) return;
  for (const [prop, value, priority] of saved) {
    if (value) el.style.setProperty(prop, value, priority);
    else el.style.removeProperty(prop);
  }
  delete el.__dcSaved[attr];
}

export function installDcEffects(root = document) {
  const onOver = (e) => {
    let el = e.target instanceof Element ? e.target.closest('[data-hover]') : null;
    while (el) {
      if (!el.contains(e.relatedTarget)) apply(el, 'data-hover');
      el = el.parentElement ? el.parentElement.closest('[data-hover]') : null;
    }
  };
  const onOut = (e) => {
    let el = e.target instanceof Element ? e.target.closest('[data-hover]') : null;
    while (el) {
      if (!el.contains(e.relatedTarget)) restore(el, 'data-hover');
      el = el.parentElement ? el.parentElement.closest('[data-hover]') : null;
    }
  };
  const onFocusIn = (e) => {
    const t = e.target;
    if (t instanceof Element && t.hasAttribute('data-focus')) apply(t, 'data-focus');
    let el = t instanceof Element ? t.closest('[data-focus-within]') : null;
    while (el) {
      apply(el, 'data-focus-within');
      el = el.parentElement ? el.parentElement.closest('[data-focus-within]') : null;
    }
  };
  const onFocusOut = (e) => {
    const t = e.target;
    if (t instanceof Element && t.hasAttribute('data-focus')) restore(t, 'data-focus');
    let el = t instanceof Element ? t.closest('[data-focus-within]') : null;
    while (el) {
      if (!el.contains(e.relatedTarget)) restore(el, 'data-focus-within');
      el = el.parentElement ? el.parentElement.closest('[data-focus-within]') : null;
    }
  };
  root.addEventListener('mouseover', onOver, true);
  root.addEventListener('mouseout', onOut, true);
  root.addEventListener('focusin', onFocusIn, true);
  root.addEventListener('focusout', onFocusOut, true);
  return () => {
    root.removeEventListener('mouseover', onOver, true);
    root.removeEventListener('mouseout', onOut, true);
    root.removeEventListener('focusin', onFocusIn, true);
    root.removeEventListener('focusout', onFocusOut, true);
  };
}
