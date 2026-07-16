import React from 'react';
import { sx } from '../../lib/sx';

export default function AgentsView({ b }) {
  return (
    <>
    <div data-screen-label="Agents" style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;background:var(--surface)`)}>
      <div className="view-wrap" style={sx(`max-width:1040px;margin:0 auto;padding:64px 40px 88px`)}>
        <h1 style={sx(`font-size:22px;font-weight:600;margin:0 0 5px;letter-spacing:-.015em`)}>
          {"Your agents"}
        </h1>
        <p style={sx(`font-size:13.5px;color:var(--text3);margin:0 0 26px`)}>
          {"Twelve specialists grouped by the work they do, each operating within the guardrails you set."}
        </p>
        <div className="rg-4" style={sx(`display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:26px`)}>
          {(b.agStats || []).map((st, stI) => (
            <React.Fragment key={stI}>
              <div onClick={st.onClick} style={sx(`${st.style}`)}>
                <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text3)`)}>
                  {st.label}
                </div>
                <div style={sx(`font-size:23px;font-weight:600;letter-spacing:-.02em;margin:3px 0 1px`)}>
                  {st.value}
                </div>
                <div style={sx(`font-size:11.5px;color:var(--text3)`)}>
                  {st.sub}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="toolbar-resp" style={sx(`display:flex;align-items:center;gap:10px;margin-bottom:8px`)}>
          <div style={sx(`flex:1;display:flex;align-items:center;gap:9px;border:1px solid var(--border2);background:var(--surface);border-radius:9px;padding:8px 12px`)} data-focus-within="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.8" strokeLinecap="round" style={sx(`flex:none`)}>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" />
            </svg>
            <input value={b.agQuery} onInput={b.setAgQuery} placeholder="Search agents…" style={sx(`flex:1;border:none;background:transparent;font-size:13px;color:var(--text);outline:none`)} />
          </div>
          <div style={sx(`display:flex;gap:2px;background:var(--surface2);border-radius:8px;padding:2px`)}>
            {(b.agFilters || []).map((f, fI) => (
              <React.Fragment key={fI}>
                <button onClick={f.onClick} style={sx(`${f.style}`)}>
                  {f.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
        {(b.agGroups || []).map((g, gI) => (
          <React.Fragment key={gI}>
            {g.has ? (
              <>
                <div style={sx(`display:flex;align-items:baseline;gap:9px;margin:26px 0 12px`)}>
                  <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--text3)`)}>
                    {g.label}
                  </div>
                  <span style={sx(`font:500 11px var(--mono);color:var(--text3)`)}>
                    {g.count}
                  </span>
                  <span style={sx(`margin-left:auto;font-size:12px;color:var(--text3)`)}>
                    {g.hint}
                  </span>
                </div>
                <div className="rg-3" style={sx(`display:grid;grid-template-columns:repeat(3,1fr);gap:14px`)}>
                  {(g.list || []).map((ag, agI) => (
                    <React.Fragment key={agI}>
                      <div onClick={ag.onClick} style={sx(`background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:22px;box-shadow:var(--shadow),inset 0 1px 0 rgba(255,255,255,.6);cursor:pointer;display:flex;flex-direction:column`)} data-hover="border-color:var(--border2);box-shadow:var(--shadow-lg)">
                        <div style={sx(`display:flex;align-items:center;gap:12px;margin-bottom:16px`)}>
                          <div style={sx(`width:40px;height:40px;border-radius:11px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;font:600 13px var(--mono);flex:none`)}>
                            {ag.mono}
                          </div>
                          <div style={sx(`flex:1;min-width:0;line-height:1.3`)}>
                            <div style={sx(`font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                              {ag.name}
                            </div>
                            <div style={sx(`font:500 10.5px var(--mono);color:var(--text3);margin-top:3px`)}>
                              {ag.model}
                            </div>
                          </div>
                          <span style={sx(`display:inline-flex;align-items:center;gap:5px;font:500 10.5px var(--sans);color:var(--ok);background:var(--ok-bg);padding:3px 9px;border-radius:999px;flex:none`)}>
                            <span style={sx(`width:5px;height:5px;border-radius:50%;background:var(--ok)`)} />
                            {"Active"}
                          </span>
                        </div>
                        <p style={sx(`font-size:12.5px;color:var(--text2);line-height:1.6;margin:0 0 20px;flex:1`)}>
                          {ag.desc}
                        </p>
                        <div style={sx(`display:flex;align-items:flex-end;gap:12px;margin-bottom:18px`)}>
                          <div style={sx(`display:flex;align-items:flex-end;gap:3px;height:24px;flex:none`)}>
                            {(ag.barEls || []).map((b, bI) => (
                              <React.Fragment key={bI}>
                                <span style={sx(`${b.style}`)} />
                              </React.Fragment>
                            ))}
                          </div>
                          <div style={sx(`line-height:1.4;min-width:0`)}>
                            <div style={sx(`font-size:11.5px;font-weight:600;color:var(--text2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                              {ag.todayLabel}
                            </div>
                            <div style={sx(`font-size:10.5px;color:var(--text3)`)}>
                              {ag.stat}
                            </div>
                          </div>
                          <div style={sx(`margin-left:auto;text-align:right;line-height:1.4;flex:none`)}>
                            <div style={sx(`font:500 10px var(--mono);color:var(--text3);text-transform:uppercase;letter-spacing:.05em`)}>
                              {"last run"}
                            </div>
                            <div style={sx(`font-size:11.5px;font-weight:500;color:var(--text2)`)}>
                              {ag.last}
                            </div>
                          </div>
                        </div>
                        <div style={sx(`display:flex;align-items:center;gap:8px;border-top:1px solid var(--border);padding-top:16px`)}>
                          <span style={sx(`${ag.autoStyle}`)}>
                            {ag.autonomy}
                          </span>
                          <button onClick={ag.configure} style={sx(`margin-left:auto;display:flex;align-items:center;gap:5px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);padding:4px 9px;border-radius:7px;font-size:11.5px;font-weight:500;cursor:pointer`)} data-hover="background:var(--surface2);color:var(--text)">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="3" />
                              <path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9 2 2 0 1 1-2.8 2.8 1.7 1.7 0 0 0-2.9 1.2 2 2 0 0 1-4 0 1.7 1.7 0 0 0-2.9-1.2 2 2 0 1 1-2.8-2.8 1.7 1.7 0 0 0-1.2-2.9 2 2 0 0 1 0-4 1.7 1.7 0 0 0 1.2-2.9 2 2 0 1 1 2.8-2.8 1.7 1.7 0 0 0 2.9-1.2 2 2 0 0 1 4 0 1.7 1.7 0 0 0 2.9 1.2 2 2 0 1 1 2.8 2.8 1.7 1.7 0 0 0 .9 2.9Z" />
                            </svg>
                            {"Configure"}
                          </button>
                          <span style={sx(`display:inline-flex;align-items:center;gap:4px;color:var(--accent);font-size:11.5px;font-weight:600`)}>
                            {"Open"}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m9 6 6 6-6 6" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </>
            ) : null}
          </React.Fragment>
        ))}
        {b.agEmpty ? (
          <>
            <div style={sx(`text-align:center;padding:56px 20px;color:var(--text3)`)}>
              <div style={sx(`font-size:14px;font-weight:600;color:var(--text2);margin-bottom:4px`)}>
                {"No agents match"}
              </div>
              <div style={sx(`font-size:12.5px`)}>
                {"Try a different search, or clear the autonomy filter."}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
    </>
  );
}
