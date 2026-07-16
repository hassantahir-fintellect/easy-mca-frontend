import React from 'react';
import { sx } from '../../lib/sx';

export default function ConversationsView({ b }) {
  return (
    <>
    <div style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;background:var(--surface)`)}>
      <div className="view-wrap" style={sx(`max-width:800px;margin:0 auto;padding:64px 40px 88px`)}>
        <div style={sx(`display:flex;align-items:flex-start;gap:16px;margin-bottom:24px`)}>
          <div style={sx(`flex:1;min-width:0`)}>
            <h1 style={sx(`font-size:22px;font-weight:600;margin:0 0 5px;letter-spacing:-.015em`)}>
              {"Conversations"}
            </h1>
            <p style={sx(`font-size:13.5px;color:var(--text3);margin:0`)}>
              {"Every thread is retained per deal, per contact, and per agent session."}
            </p>
          </div>
          <button onClick={b.newChat} style={sx(`flex:none;display:inline-flex;align-items:center;gap:7px;border:none;background:var(--accent);color:#fff;padding:8px 14px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;margin-top:2px;box-shadow:var(--shadow)`)} data-hover="background:var(--accent2)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {"New conversation"}
          </button>
        </div>
        <div className="toolbar-resp" style={sx(`display:flex;align-items:center;gap:10px;margin-bottom:26px`)}>
          <div style={sx(`flex:1;display:flex;align-items:center;gap:9px;border:1px solid var(--border2);background:var(--surface);border-radius:9px;padding:8px 12px`)} data-focus-within="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.8" strokeLinecap="round" style={sx(`flex:none`)}>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" />
            </svg>
            <input value={b.convQuery} onInput={b.setConvQuery} placeholder="Search conversations…" style={sx(`flex:1;border:none;background:transparent;font-size:13px;color:var(--text);outline:none`)} />
          </div>
          <div style={sx(`display:flex;gap:2px;background:var(--surface2);border-radius:8px;padding:2px`)}>
            {(b.convFilters || []).map((f, fI) => (
              <React.Fragment key={fI}>
                <button onClick={f.onClick} style={sx(`${f.style}`)}>
                  {f.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
        {b.convHasRecent ? (
          <>
            <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--text3);margin-bottom:11px`)}>
              {"Today"}
            </div>
            <div style={sx(`display:flex;flex-direction:column;margin-bottom:32px`)}>
              {(b.convRecent || []).map((c, cI) => (
                <React.Fragment key={cI}>
                  <div onClick={c.onClick} style={sx(`display:flex;align-items:center;gap:14px;padding:15px 14px;border-top:1px solid var(--border);cursor:pointer;border-radius:10px;transition:background .12s`)} data-hover="background:#fafaf9">
                    <div style={sx(`width:34px;height:34px;border-radius:9px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;font:600 11px var(--mono);flex:none`)}>
                      {c.mono}
                    </div>
                    <div style={sx(`flex:1;min-width:0`)}>
                      <div style={sx(`display:flex;align-items:center;gap:9px;margin-bottom:3px`)}>
                        <span style={sx(`font-size:13.5px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                          {c.title}
                        </span>
                        <span style={sx(`font-size:10.5px;font-weight:500;color:var(--text2);background:var(--surface2);padding:2px 8px;border-radius:999px;flex:none`)}>
                          {c.agent}
                        </span>
                      </div>
                      <div style={sx(`font-size:12.5px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                        {c.snippet}
                      </div>
                    </div>
                    <span style={sx(`font:500 11px var(--mono);color:var(--text3);flex:none`)}>
                      {c.time}
                    </span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </>
        ) : null}
        {b.convHasEarlier ? (
          <>
            <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--text3);margin-bottom:11px`)}>
              {"Earlier"}
            </div>
            <div style={sx(`display:flex;flex-direction:column`)}>
              {(b.convEarlier || []).map((c, cI) => (
                <React.Fragment key={cI}>
                  <div onClick={c.onClick} style={sx(`display:flex;align-items:center;gap:14px;padding:15px 14px;border-top:1px solid var(--border);cursor:pointer;border-radius:10px;transition:background .12s`)} data-hover="background:#fafaf9">
                    <div style={sx(`width:34px;height:34px;border-radius:9px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;font:600 11px var(--mono);flex:none`)}>
                      {c.mono}
                    </div>
                    <div style={sx(`flex:1;min-width:0`)}>
                      <div style={sx(`display:flex;align-items:center;gap:9px;margin-bottom:3px`)}>
                        <span style={sx(`font-size:13.5px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                          {c.title}
                        </span>
                        <span style={sx(`font-size:10.5px;font-weight:500;color:var(--text2);background:var(--surface2);padding:2px 8px;border-radius:999px;flex:none`)}>
                          {c.agent}
                        </span>
                      </div>
                      <div style={sx(`font-size:12.5px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                        {c.snippet}
                      </div>
                    </div>
                    <span style={sx(`font:500 11px var(--mono);color:var(--text3);flex:none`)}>
                      {c.time}
                    </span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </>
        ) : null}
        <div style={sx(`border-top:1px solid var(--border)`)} />
      </div>
    </div>
    </>
  );
}
