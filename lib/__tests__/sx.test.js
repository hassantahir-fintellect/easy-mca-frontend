import { cssToObj, sx } from '@/lib/sx';

describe('cssToObj', () => {
  it('converts a CSS declaration string into a style object', () => {
    expect(cssToObj('display:flex;gap:8px')).toEqual({ display: 'flex', gap: '8px' });
  });

  it('camel-cases hyphenated properties', () => {
    expect(cssToObj('background-color:red')).toEqual({ backgroundColor: 'red' });
  });

  it('preserves CSS custom properties as-is', () => {
    expect(cssToObj('--accent:#fff')).toEqual({ '--accent': '#fff' });
  });

  it('strips !important', () => {
    expect(cssToObj('color:blue !important')).toEqual({ color: 'blue' });
  });

  it('returns an empty object for falsy input', () => {
    expect(cssToObj('')).toEqual({});
    expect(cssToObj(undefined)).toEqual({});
  });
});

describe('sx', () => {
  it('returns the same object reference for the same input (cached)', () => {
    expect(sx('display:flex')).toBe(sx('display:flex'));
  });
});
