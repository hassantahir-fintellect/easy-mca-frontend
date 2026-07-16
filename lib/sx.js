// Converts a CSS declaration string ("display:flex;gap:8px") into a React
// style object. Cached — inline styles in this app are string-based by design
// (ported 1:1 from the original single-file build).
const cache = new Map();

export function cssToObj(css) {
  const out = {};
  if (!css) return out;
  for (const decl of String(css).split(';')) {
    const idx = decl.indexOf(':');
    if (idx === -1) continue;
    const rawProp = decl.slice(0, idx).trim();
    let value = decl.slice(idx + 1).trim();
    if (!rawProp || !value) continue;
    value = value.replace(/\s*!important\s*$/i, '');
    let prop;
    if (rawProp.startsWith('--')) prop = rawProp; // CSS custom property
    else {
      prop = rawProp.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      if (rawProp.startsWith('-webkit-')) prop = 'Webkit' + prop.slice(6).replace(/^w/, 'W').slice(0);
      if (/^-webkit-/.test(rawProp)) prop = 'Webkit' + rawProp.slice(8).replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^[a-z]/, (c) => c.toUpperCase());
      else if (/^-moz-/.test(rawProp)) prop = 'Moz' + rawProp.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^[a-z]/, (c) => c.toUpperCase());
      else if (/^-ms-/.test(rawProp)) prop = 'ms' + rawProp.slice(4).replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^[a-z]/, (c) => c.toUpperCase());
    }
    out[prop] = value;
  }
  return out;
}

export function sx(css) {
  let obj = cache.get(css);
  if (!obj) {
    obj = cssToObj(css);
    cache.set(css, obj);
  }
  return obj;
}
