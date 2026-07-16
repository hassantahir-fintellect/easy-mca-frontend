import React from 'react';
import { sx } from '../../lib/sx';

export default function KnowledgeView({ b }) {
  return (
    <>
    <div data-screen-label="Knowledge" style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;background:var(--surface)`)}>
      <div className="view-wrap" style={sx(`max-width:1040px;margin:0 auto;padding:64px 40px 88px`)}>
        <div style={sx(`display:flex;align-items:flex-start;gap:16px;margin-bottom:30px`)}>
          <div style={sx(`flex:1;min-width:0`)}>
            <h1 style={sx(`font-size:22px;font-weight:600;margin:0 0 5px;letter-spacing:-.015em`)}>
              {"Knowledge"}
            </h1>
            <p style={sx(`font-size:13.5px;color:var(--text3);margin:0`)}>
              {"What your agents reason against — funder programs, SOPs, and guidelines."}
            </p>
          </div>
          <button onClick={b.openKAdd} style={sx(`flex:none;display:inline-flex;align-items:center;gap:7px;border:none;background:var(--accent);color:#fff;padding:8px 14px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;margin-top:2px;box-shadow:var(--shadow)`)} data-hover="background:var(--accent2)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {"Add knowledge"}
          </button>
        </div>
        <div style={sx(`display:flex;align-items:baseline;gap:9px;margin:0 0 12px`)}>
          <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--text3)`)}>
            {"Funder programs"}
          </div>
          <span style={sx(`font:500 11px var(--mono);color:var(--text3)`)}>
            {b.kFunderCount}
          </span>
          <span style={sx(`margin-left:auto;font-size:12px;color:var(--text3)`)}>
            {"Matched by Scrubbing & Funder Intelligence"}
          </span>
        </div>
        <div className="rg-2" style={sx(`display:grid;grid-template-columns:repeat(2,1fr);gap:14px`)}>
          {(b.kFunders || []).map((f, fI) => (
            <React.Fragment key={fI}>
              <div style={sx(`background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:var(--shadow),inset 0 1px 0 rgba(255,255,255,.6);overflow:hidden`)}>
                <div style={sx(`padding:16px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px`)}>
                  <div style={sx(`width:34px;height:34px;border-radius:9px;background:var(--surface2);display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:16px;font-weight:600;color:var(--text2)`)}>
                    {f.initial}
                  </div>
                  <div>
                    <div style={sx(`font-size:14px;font-weight:600`)}>
                      {f.name}
                    </div>
                    <div style={sx(`font-size:11.5px;color:var(--text3)`)}>
                      {f.tier}
                    </div>
                  </div>
                  <span style={sx(`${f.statusStyle}`)}>
                    {f.statusLabel}
                  </span>
                </div>
                {f.source ? (
                  <>
                    <div style={sx(`display:flex;align-items:center;gap:7px;padding:8px 18px;border-bottom:1px solid var(--border);background:var(--accent-bg);font-size:11.5px;font-weight:500;color:var(--accent)`)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                        <path d="m21.4 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                      {"Extracted from "}{f.source}
                    </div>
                  </>
                ) : null}
                <div>
                  {(f.criteria || []).map((cr, crI) => (
                    <React.Fragment key={crI}>
                      <div style={sx(`display:flex;justify-content:space-between;padding:10px 18px;border-bottom:1px solid var(--border);font-size:12.5px`)}>
                        <span style={sx(`color:var(--text2)`)}>
                          {cr.k}
                        </span>
                        <span style={sx(`font-weight:500;font-family:var(--mono);font-size:12px`)}>
                          {cr.v}
                        </span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={sx(`display:flex;align-items:baseline;gap:9px;margin:38px 0 8px`)}>
          <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--text3)`)}>
            {"Documents & guidelines"}
          </div>
          <span style={sx(`font:500 11px var(--mono);color:var(--text3)`)}>
            {b.kDocCount}
          </span>
          <span style={sx(`margin-left:auto;font-size:12px;color:var(--text3)`)}>
            {"Agents follow and cite these in their work"}
          </span>
        </div>
        <div style={sx(`display:flex;flex-direction:column`)}>
          {(b.kDocs || []).map((d, dI) => (
            <React.Fragment key={dI}>
              <div style={sx(`display:flex;align-items:center;gap:13px;padding:13px 14px;border-top:1px solid var(--border);border-radius:10px`)} data-hover="background:#fafaf9">
                <div style={sx(`width:36px;height:36px;border-radius:9px;background:var(--surface2);display:flex;align-items:center;justify-content:center;font:600 9.5px var(--mono);color:var(--text2);flex:none`)}>
                  {d.ext}
                </div>
                <div style={sx(`flex:1;min-width:0`)}>
                  <div style={sx(`font-size:13.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                    {d.name}
                  </div>
                  <div style={sx(`font-size:12px;color:var(--text3)`)}>
                    {d.size}{" · "}{d.meta}
                  </div>
                </div>
                <div style={sx(`display:flex;gap:5px;flex:none`)}>
                  {(d.agents || []).map((a, aI) => (
                    <React.Fragment key={aI}>
                      <span style={sx(`font-size:10.5px;font-weight:500;color:var(--text2);background:var(--surface2);padding:2px 8px;border-radius:999px`)}>
                        {a}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
                <span style={sx(`${d.statusStyle}`)}>
                  {d.statusLabel}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
