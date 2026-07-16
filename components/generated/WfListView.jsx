import React from 'react';
import { sx } from '../../lib/sx';

export default function WfListView({ b }) {
  return (
    <>
    <div data-screen-label="Workflows" style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;background:var(--surface)`)}>
      <div className="view-wrap" style={sx(`max-width:1040px;margin:0 auto;padding:64px 40px 88px`)}>
        <div style={sx(`display:flex;align-items:flex-start;gap:16px;margin-bottom:30px`)}>
          <div style={sx(`flex:1;min-width:0`)}>
            <h1 style={sx(`font-size:22px;font-weight:600;margin:0 0 5px;letter-spacing:-.015em`)}>
              {"Workflows"}
            </h1>
            <p style={sx(`font-size:13.5px;color:var(--text3);margin:0`)}>
              {"Multi-agent automations, chained end-to-end. Open one to edit the flow, its gates, and each step’s autonomy."}
            </p>
          </div>
          <button onClick={b.newWorkflow} style={sx(`flex:none;display:inline-flex;align-items:center;gap:7px;border:none;background:var(--accent);color:#fff;padding:8px 14px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;margin-top:2px;box-shadow:var(--shadow)`)} data-hover="background:var(--accent2)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {"New workflow"}
          </button>
        </div>
        <div className="rg-2" style={sx(`display:grid;grid-template-columns:repeat(2,1fr);gap:14px`)}>
          {(b.workflowList || []).map((w, wI) => (
            <React.Fragment key={wI}>
              <div onClick={w.onOpen} style={sx(`background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:20px;box-shadow:var(--shadow),inset 0 1px 0 rgba(255,255,255,.6);cursor:pointer;display:flex;flex-direction:column`)} data-hover="border-color:var(--border2);box-shadow:var(--shadow-lg)">
                <div style={sx(`display:flex;align-items:flex-start;gap:12px;margin-bottom:12px`)}>
                  <div style={sx(`flex:1;min-width:0;font-size:15px;font-weight:600;line-height:1.35;letter-spacing:-.01em`)}>
                    {w.name}
                  </div>
                  <span style={sx(`${w.statusStyle}`)}>
                    <span style={sx(`${w.dotStyle}`)} />
                    {w.status}
                  </span>
                </div>
                <div style={sx(`display:flex;align-items:center;gap:8px;font-size:11.5px;color:var(--text3);margin-bottom:12px`)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                    <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" />
                  </svg>
                  <span style={sx(`white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                    {w.trigger}
                  </span>
                </div>
                <p style={sx(`font-size:12.5px;color:var(--text2);line-height:1.55;margin:0 0 18px;flex:1`)}>
                  {w.desc}
                </p>
                <div style={sx(`display:flex;align-items:center;gap:12px;border-top:1px solid var(--border);padding-top:14px`)}>
                  <div style={sx(`display:flex;align-items:center`)}>
                    {(w.chainEls || []).map((c, cI) => (
                      <React.Fragment key={cI}>
                        <div style={sx(`${c.style}`)}>
                          {c.mono}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  <div style={sx(`line-height:1.3;min-width:0`)}>
                    <div style={sx(`font-size:11.5px;font-weight:600;color:var(--text2)`)}>
                      {w.stepsLabel}
                    </div>
                    <div style={sx(`font-size:10.5px;color:var(--text3)`)}>
                      {w.gatesLabel}
                    </div>
                  </div>
                  <span style={sx(`margin-left:auto;display:inline-flex;align-items:center;gap:5px;color:var(--accent);font-size:12px;font-weight:600`)}>
                    {"Open workspace"}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
