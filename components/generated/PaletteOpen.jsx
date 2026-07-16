import React from 'react';
import { sx } from '../../lib/sx';

export default function PaletteOpen({ b }) {
  return (
    <>
    <div onClick={b.closePalette} style={sx(`position:fixed;inset:0;z-index:80;background:rgba(23,23,21,.4);display:flex;align-items:flex-start;justify-content:center;padding-top:13vh;animation:msgIn .16s ease both`)}>
      <div onClick={b.stop} style={sx(`width:min(640px,92vw);background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 24px 64px rgba(16,15,13,.18),inset 0 1px 0 rgba(255,255,255,.7);overflow:hidden`)}>
        <div style={sx(`display:flex;align-items:center;gap:11px;padding:14px 16px;border-bottom:1px solid var(--border)`)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.8" strokeLinecap="round" style={sx(`flex:none`)}>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
          <input ref={b.paletteRef} value={b.paletteQuery} onInput={b.setPaletteQuery} onKeyDown={b.paletteKey} placeholder="Ask your agents, or jump to a deal, agent, or screen…" style={sx(`flex:1;border:none;background:transparent;font-size:14.5px;color:var(--text);outline:none`)} />
          <span style={sx(`font:500 11px var(--mono);color:var(--text3);background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:2px 7px;flex:none`)}>
            {"esc"}
          </span>
        </div>
        <div style={sx(`max-height:48vh;overflow-y:auto;overflow-x:hidden;padding:8px`)}>
          {b.paletteHasQuery ? (
            <>
              <div style={sx(`font-size:10.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text3);padding:8px 12px 6px`)}>
                {"Ask agents"}
              </div>
              <button onClick={b.runAsk} style={sx(`${b.askRowStyle}`)}>
                <span style={sx(`width:30px;height:30px;border-radius:8px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;flex:none`)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 3l2.5 6.5L22 12l-6.5 2.5L13 21l-2.5-6.5L4 12l6.5-2.5L13 3Z" />
                  </svg>
                </span>
                <span style={sx(`flex:1;min-width:0`)}>
                  <span style={sx(`font-size:14px;font-weight:500;color:var(--text)`)}>
                    {b.paletteQuery}
                  </span>
                  <span style={sx(`display:block;font-size:11.5px;color:var(--text3);margin-top:1px`)}>
                    {"Send to your agents"}
                  </span>
                </span>
                <span style={sx(`font:500 10.5px var(--mono);color:var(--text3);flex:none`)}>
                  {"↵"}
                </span>
              </button>
            </>
          ) : null}
          {b.paletteHasNav ? (
            <>
              <div style={sx(`font-size:10.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text3);padding:12px 12px 6px`)}>
                {"Jump to"}
              </div>
              {(b.paletteResults || []).map((r, rI) => (
                <React.Fragment key={rI}>
                  <button onClick={r.onClick} style={sx(`${r.style}`)}>
                    <span style={sx(`${r.iconStyle}`)}>
                      {r.mono}
                    </span>
                    <span style={sx(`flex:1;min-width:0`)}>
                      <span style={sx(`font-size:14px;font-weight:500;color:var(--text)`)}>
                        {r.label}
                      </span>
                      <span style={sx(`display:block;font-size:11.5px;color:var(--text3);margin-top:1px`)}>
                        {r.kind}
                      </span>
                    </span>
                    <span style={sx(`font:500 10px var(--mono);color:var(--text3);flex:none;text-transform:uppercase`)}>
                      {r.tag}
                    </span>
                  </button>
                </React.Fragment>
              ))}
            </>
          ) : null}
          {b.paletteEmpty ? (
            <>
              <div style={sx(`padding:22px 14px;text-align:center;font-size:13px;color:var(--text3)`)}>
                {"No matches. Press ↵ to ask your agents instead."}
              </div>
            </>
          ) : null}
        </div>
        <div style={sx(`display:flex;align-items:center;gap:14px;padding:10px 16px;border-top:1px solid var(--border);font:500 11px var(--mono);color:var(--text3)`)}>
          <span>
            {"↑↓ navigate"}
          </span>
          <span>
            {"↵ select"}
          </span>
          <span>
            {"esc close"}
          </span>
        </div>
      </div>
    </div>
    </>
  );
}
