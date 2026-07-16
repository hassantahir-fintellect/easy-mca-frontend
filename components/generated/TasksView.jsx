import React from 'react';
import { sx } from '../../lib/sx';

export default function TasksView({ b }) {
  return (
    <>
    <div style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;background:var(--surface)`)}>
      <div className="view-wrap" style={sx(`max-width:860px;margin:0 auto;padding:64px 40px 88px`)}>
        <h1 style={sx(`font-size:22px;font-weight:600;margin:0 0 5px;letter-spacing:-.015em`)}>
          {"Tasks"}
        </h1>
        <p style={sx(`font-size:13.5px;color:var(--text3);margin:0 0 28px`)}>
          {"Everything an agent has handed back to you for a decision."}
        </p>
        <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:12px`)}>
          {"Needs your approval"}
        </div>
        <div style={sx(`display:flex;flex-direction:column;gap:10px;margin-bottom:32px`)}>
          {(b.approvals || []).map((a, aI) => (
            <React.Fragment key={aI}>
              <div onClick={a.onClick} style={sx(`background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:17px 18px;box-shadow:var(--shadow),inset 0 1px 0 rgba(255,255,255,.6);cursor:pointer;display:flex;align-items:center;gap:14px`)} data-hover="border-color:var(--accent);box-shadow:0 12px 32px rgba(80,70,160,.16)">
                <div style={sx(`width:38px;height:38px;border-radius:10px;background:var(--accent-bg);color:var(--accent);display:flex;align-items:center;justify-content:center;font:600 12px var(--mono);flex:none`)}>
                  {a.mono}
                </div>
                <div style={sx(`flex:1;min-width:0`)}>
                  <div style={sx(`font-size:14px;font-weight:600;margin-bottom:2px`)}>
                    {a.title}
                  </div>
                  <div style={sx(`font-size:12.5px;color:var(--text2)`)}>
                    {a.sub}
                  </div>
                </div>
                <span style={sx(`${a.tagStyle}`)}>
                  {a.tag}
                </span>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:12px`)}>
          {"Completed today · "}{b.decidedToday}
        </div>
        <div style={sx(`background:var(--surface);border:1px solid var(--border);border-radius:14px;box-shadow:var(--shadow),inset 0 1px 0 rgba(255,255,255,.6);overflow:hidden`)}>
          {(b.completed || []).map((c, cI) => (
            <React.Fragment key={cI}>
              <div style={sx(`display:flex;align-items:center;gap:12px;padding:13px 18px;border-bottom:1px solid var(--border)`)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span style={sx(`font-size:13.5px;font-weight:500;flex:1`)}>
                  {c.title}
                </span>
                <span style={sx(`font-size:12.5px;color:var(--text2)`)}>
                  {c.detail}
                </span>
                <span style={sx(`font:500 11px var(--mono);color:var(--text3);width:64px;text-align:right`)}>
                  {c.time}
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
