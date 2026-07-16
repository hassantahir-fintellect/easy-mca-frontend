import React from 'react';
import { sx } from '../../lib/sx';

export default function ShowSourcePromptView({ b }) {
  return (
    <>
    <div style={sx(`border:1px solid var(--border2);background:var(--surface);border-radius:14px;padding:14px 16px;margin-bottom:16px;box-shadow:0 1px 2px rgba(16,15,13,.04)`)}>
      <div style={sx(`display:flex;align-items:center;gap:10px;margin-bottom:11px`)}>
        <span style={sx(`width:28px;height:28px;border-radius:8px;flex:none;background:var(--accent-bg);display:flex;align-items:center;justify-content:center;color:var(--accent)`)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 2v6M15 2v6M8 8h8v3a4 4 0 0 1-8 0Z" />
            <path d="M12 15v4a3 3 0 0 0 3 3" />
          </svg>
        </span>
        <span style={sx(`flex:1;min-width:0`)}>
          <span style={sx(`display:block;font-size:13px;font-weight:600;color:var(--text)`)}>
            {"Connect a source to get real answers"}
          </span>
          <span style={sx(`display:block;font-size:11.5px;color:var(--text3)`)}>
            {"Your agents pull live deals, statements and messages from the tools you already use."}
          </span>
        </span>
        <button onClick={b.dismissSourcePrompt} title="Dismiss" style={sx(`flex:none;width:26px;height:26px;border:none;background:transparent;color:var(--text3);cursor:pointer;border-radius:7px;display:flex;align-items:center;justify-content:center`)} data-hover="background:var(--surface2)">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="rg-3" style={sx(`display:grid;grid-template-columns:repeat(3,1fr);gap:9px`)}>
        {(b.onboardSources || []).map((o, oI) => (
          <React.Fragment key={oI}>
            <button onClick={o.onClick} style={sx(`display:flex;align-items:center;gap:10px;border:1px solid var(--border);background:var(--surface);border-radius:10px;padding:10px 12px;cursor:pointer;text-align:left;transition:border-color .12s,background .12s`)} data-hover="border-color:#b9cdf5;background:var(--accent-bg)">
              <span style={sx(`${o.iconStyle}`)}>
                {o.letter}
              </span>
              <span style={sx(`flex:1;min-width:0`)}>
                <span style={sx(`display:block;font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                  {o.name}
                </span>
                <span style={sx(`display:block;font-size:10.5px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                  {o.shortDesc}
                </span>
              </span>
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
    </>
  );
}
