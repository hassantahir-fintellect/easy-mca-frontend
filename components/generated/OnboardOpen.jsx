import React from 'react';
import { sx } from '../../lib/sx';

export default function OnboardOpen({ b }) {
  return (
    <>
    <div style={sx(`position:fixed;inset:0;z-index:150;background:rgba(23,23,21,.5);display:flex;align-items:center;justify-content:center;padding:5vh 24px;animation:msgIn .18s ease`)}>
      <div style={sx(`width:min(520px,95vw);background:var(--surface);border:1px solid var(--border);border-radius:14px;box-shadow:0 24px 64px rgba(16,15,13,.22);overflow:hidden`)}>
        <div style={sx(`padding:26px 24px 8px;text-align:center`)}>
          <div style={sx(`width:46px;height:46px;margin:0 auto 14px;border-radius:12px;background:var(--accent-bg);color:var(--accent);display:flex;align-items:center;justify-content:center`)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 2v6M15 2v6M8 8h8v3a4 4 0 0 1-8 0Z" />
              <path d="M12 15v4a3 3 0 0 0 3 3" />
            </svg>
          </div>
          <div style={sx(`font-size:18px;font-weight:600;letter-spacing:-.015em`)}>
            {"Connect your first source"}
          </div>
          <p style={sx(`font-size:13px;color:var(--text3);line-height:1.55;margin:6px auto 0;max-width:400px`)}>
            {"Your agents work from the tools you already use. Connect one now so they can pull real deals, statements, and messages."}
          </p>
        </div>
        <div style={sx(`padding:16px 20px 8px;display:flex;flex-direction:column;gap:9px`)}>
          {(b.onboardSources || []).map((o, oI) => (
            <React.Fragment key={oI}>
              <button onClick={o.onClick} style={sx(`display:flex;align-items:center;gap:13px;border:1px solid var(--border);background:var(--surface);border-radius:11px;padding:13px 15px;cursor:pointer;text-align:left;transition:border-color .12s,background .12s`)} data-hover="border-color:#b9cdf5;background:var(--accent-bg)">
                <span style={sx(`${o.iconStyle}`)}>
                  {o.letter}
                </span>
                <span style={sx(`flex:1;min-width:0`)}>
                  <span style={sx(`display:block;font-size:13.5px;font-weight:600`)}>
                    {o.name}
                  </span>
                  <span style={sx(`display:block;font-size:12px;color:var(--text3)`)}>
                    {o.desc}
                  </span>
                </span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
            </React.Fragment>
          ))}
        </div>
        <div style={sx(`padding:8px 20px 20px;display:flex;align-items:center;gap:10px`)}>
          <span style={sx(`font-size:11.5px;color:var(--text3);flex:1`)}>
            {"You can connect more anytime in Integrations."}
          </span>
          <button onClick={b.onboardSkip} style={sx(`border:1px solid var(--border2);background:var(--surface);color:var(--text2);border-radius:9px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer`)} data-hover="background:var(--surface2)">
            {"Skip for now"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
