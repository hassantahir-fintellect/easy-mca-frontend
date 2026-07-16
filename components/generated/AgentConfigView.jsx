import React from 'react';
import { sx } from '../../lib/sx';

export default function AgentConfigView({ b }) {
  return (
    <>
    <div style={sx(`flex:1;display:flex;min-height:0`)}>
      <div className="uw-queue" style={sx(`width:248px;flex:none;border-right:1px solid var(--border);background:var(--surface);display:flex;flex-direction:column;min-height:0`)}>
        <div style={sx(`padding:18px 16px 10px;border-bottom:1px solid var(--border)`)}>
          <h2 style={sx(`font-size:14.5px;font-weight:600;margin:0 0 2px`)}>
            {"Agents"}
          </h2>
          <div style={sx(`font-size:12px;color:var(--text3)`)}>
            {"Pick one to configure"}
          </div>
        </div>
        <div style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;padding:8px`)}>
          {(b.cfgAgentList || []).map((a, aI) => (
            <React.Fragment key={aI}>
              <div onClick={a.onClick} style={sx(`${a.rowStyle}`)}>
                <span style={sx(`${a.monoStyle}`)}>
                  {a.mono}
                </span>
                <span style={sx(`font-size:13px;font-weight:500;flex:1`)}>
                  {a.name}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={sx(`flex:1;min-width:0;overflow-y:auto;overflow-x:hidden`)}>
        <div className="view-wrap" style={sx(`max-width:720px;margin:0 auto;padding:34px 36px 56px`)}>
          <div style={sx(`display:flex;align-items:center;gap:13px;margin-bottom:6px`)}>
            <div style={sx(`width:40px;height:40px;border-radius:11px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;font:600 13px var(--mono);flex:none`)}>
              {b.cfgAgent.mono}
            </div>
            <div style={sx(`flex:1`)}>
              <h1 style={sx(`font-size:21px;font-weight:600;margin:0;letter-spacing:-.01em`)}>
                {b.cfgAgent.name}{" Agent"}
              </h1>
              <div style={sx(`font-size:13px;color:var(--text2)`)}>
                {b.cfgAgent.desc}
              </div>
            </div>
          </div>
          <div style={sx(`height:1px;background:var(--border);margin:22px 0`)} />
          <div style={sx(`font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--text3);margin-bottom:5px`)}>
            {"Autonomy"}
          </div>
          <div style={sx(`font-size:13px;color:var(--text2);margin-bottom:13px`)}>
            {"How much this agent can do before a human steps in."}
          </div>
          <div style={sx(`display:flex;gap:9px;margin-bottom:28px`)}>
            {(b.autonomyOpts || []).map((o, oI) => (
              <React.Fragment key={oI}>
                <button onClick={o.onClick} style={sx(`${o.style}`)}>
                  <div style={sx(`font-size:13.5px;font-weight:600;margin-bottom:3px`)}>
                    {o.label}
                  </div>
                  <div style={sx(`font-size:11.5px;color:var(--text2);line-height:1.4`)}>
                    {o.desc}
                  </div>
                </button>
              </React.Fragment>
            ))}
          </div>
          <div style={sx(`display:flex;align-items:center;gap:10px;margin-bottom:9px`)}>
            <div style={sx(`font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--text3)`)}>
              {"System prompt"}
            </div>
            <span style={sx(`font:500 10.5px var(--mono);background:var(--surface2);color:var(--text2);padding:2px 8px;border-radius:5px;margin-left:auto`)}>
              {b.cfgModel}
            </span>
          </div>
          <textarea value={b.cfgPrompt} onInput={b.setCfgPrompt} style={sx(`width:100%;min-height:170px;border:1px solid var(--border2);background:var(--surface);border-radius:11px;padding:14px 16px;font-family:var(--mono);font-size:12.5px;line-height:1.65;color:var(--text);resize:vertical;outline:none;box-shadow:var(--shadow)`)} data-focus="border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-bg)" />
          <div className="rg-2" style={sx(`display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:24px`)}>
            <div>
              <div style={sx(`font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--text3);margin-bottom:11px`)}>
                {"Tools & access"}
              </div>
              <div style={sx(`display:flex;flex-direction:column;gap:7px`)}>
                {(b.cfgTools || []).map((t, tI) => (
                  <React.Fragment key={tI}>
                    <div style={sx(`display:flex;align-items:center;gap:9px;padding:9px 12px;background:var(--surface);border:1px solid var(--border);border-radius:9px;box-shadow:var(--shadow)`)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m10 7-3-3-4 4 3 3" />
                        <path d="m14 17 3 3 4-4-3-3" />
                        <path d="M8 13 13 8m-2 8 5-5" />
                      </svg>
                      <span style={sx(`font-size:12.5px;font-weight:500;flex:1`)}>
                        {t.name}
                      </span>
                      <span style={sx(`width:7px;height:7px;border-radius:50%;background:var(--ok)`)} />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div>
              <div style={sx(`font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--text3);margin-bottom:11px`)}>
                {"Guardrails"}
              </div>
              <div style={sx(`display:flex;flex-direction:column;gap:7px`)}>
                {(b.cfgGuards || []).map((g, gI) => (
                  <React.Fragment key={gI}>
                    <div style={sx(`display:flex;align-items:center;gap:9px;padding:9px 12px;background:var(--surface);border:1px solid var(--border);border-radius:9px;box-shadow:var(--shadow)`)}>
                      <span style={sx(`font-size:12.5px;flex:1;color:var(--text2)`)}>
                        {g.k}
                      </span>
                      <span style={sx(`font:500 12px var(--mono);color:var(--text)`)}>
                        {g.v}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div style={sx(`display:flex;align-items:center;gap:12px;margin-top:26px;padding-top:18px;border-top:1px solid var(--border)`)}>
            <span style={sx(`font:500 11.5px var(--mono);color:var(--text3)`)}>
              {"Changes apply to all future runs · versioned in the audit trail"}
            </span>
            {b.cfgSaved ? (
              <>
                <span style={sx(`font:500 11.5px var(--mono);color:var(--ok);display:flex;align-items:center;gap:5px;margin-left:auto`)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {"Saved"}
                </span>
              </>
            ) : null}
            <button onClick={b.saveCfg} style={sx(`background:var(--accent);color:#fff;border:none;border-radius:9px;padding:10px 20px;font-size:13.5px;font-weight:600;cursor:pointer;margin-left:auto`)} data-hover="background:var(--accent2)">
              {"Save configuration"}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
