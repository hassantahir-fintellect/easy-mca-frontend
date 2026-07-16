import React from 'react';
import { sx } from '../../lib/sx';

export default function IntPickerOpen({ b }) {
  return (
    <>
    <div onClick={b.closeAddIntegration} style={sx(`position:fixed;inset:0;z-index:85;background:rgba(23,23,21,.4);display:flex;align-items:center;justify-content:center;padding:5vh 24px;animation:msgIn .16s ease both`)}>
      <div onClick={b.stop} style={sx(`width:min(480px,95vw);background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 24px 64px rgba(16,15,13,.18);overflow:hidden`)}>
        <div style={sx(`padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:11px`)}>
          <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--surface2);color:var(--text2);display:flex;align-items:center;justify-content:center;flex:none`)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 7 7 4 3 8l3 3" />
              <path d="m14 17 3 3 4-4-3-3" />
              <path d="M8 13 13 8m-2 8 5-5" />
            </svg>
          </div>
          <div style={sx(`flex:1;min-width:0`)}>
            <div style={sx(`font-size:14.5px;font-weight:600`)}>
              {"Add integration"}
            </div>
            <div style={sx(`font-size:12px;color:var(--text3)`)}>
              {"Connect a system your agents can work in"}
            </div>
          </div>
          <button onClick={b.closeAddIntegration} style={sx(`width:32px;height:32px;border-radius:8px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--surface2)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div style={sx(`padding:10px`)}>
          {(b.intOptions || []).map((o, oI) => (
            <React.Fragment key={oI}>
              <button onClick={o.onPick} style={sx(`width:100%;display:flex;align-items:center;gap:13px;border:none;background:transparent;padding:12px;border-radius:12px;cursor:pointer;text-align:left`)} data-hover="background:var(--surface2)">
                <div style={sx(`width:38px;height:38px;border-radius:10px;background:#fff;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex:none`)}>
                  {o.isGmail ? (
                    <>
                      <svg width="20" height="15" viewBox="0 0 48 36">
                        <path fill="#4285F4" d="M3.4 36h6.8V19.5L0 11.8v20.8C0 34.5 1.5 36 3.4 36z" />
                        <path fill="#34A853" d="M37.8 36h6.8c1.9 0 3.4-1.5 3.4-3.4V11.8l-10.2 7.7z" />
                        <path fill="#FBBC04" d="M37.8 5.6v13.9L48 11.8V7.3c0-4.2-4.8-6.6-8.2-4.1z" />
                        <path fill="#EA4335" d="M10.2 19.5V5.6L24 16 37.8 5.6v13.9L24 29.9z" />
                        <path fill="#C5221F" d="M0 7.3v4.5l10.2 7.7V5.6L8.2 3.2C4.8.7 0 3.1 0 7.3z" />
                      </svg>
                    </>
                  ) : null}
                  {o.isWhatsapp ? (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#25d366">
                        <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.4-3.9-4.5-4.1-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2 .2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.3 0 .5l-.4.5c-.1.2-.3.3-.1.6.1.3.7 1.1 1.4 1.8.9.8 1.7 1 2 1.2.2.1.4.1.5-.1l.6-.8c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.3.1.7-.1 1.2Z" />
                      </svg>
                    </>
                  ) : null}
                  {o.isLetter ? (
                    <>
                      <span style={sx(`font-size:14px;font-weight:600;color:var(--text2)`)}>
                        {o.letter}
                      </span>
                    </>
                  ) : null}
                </div>
                <div style={sx(`flex:1;min-width:0`)}>
                  <div style={sx(`font-size:13.5px;font-weight:600;color:var(--text)`)}>
                    {o.name}
                  </div>
                  <div style={sx(`font-size:11.5px;color:var(--text3);line-height:1.4`)}>
                    {o.desc}
                  </div>
                </div>
                <span style={sx(`${o.tagStyle}`)}>
                  {o.tag}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
