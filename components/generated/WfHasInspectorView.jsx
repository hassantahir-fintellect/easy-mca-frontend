import React from 'react';
import { sx } from '../../lib/sx';

export default function WfHasInspectorView({ b }) {
  return (
    <>
    <div className="wf-inspector" style={sx(`width:320px;flex:none;border-left:1px solid var(--border);background:var(--surface);display:flex;flex-direction:column;min-height:0`)}>
      <div style={sx(`padding:15px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px`)}>
        <div style={sx(`flex:1;min-width:0`)}>
          <div style={sx(`font:600 10px var(--mono);color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px`)}>
            {b.wfInspector.kindLabel}
          </div>
          <div style={sx(`font-size:14.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
            {b.wfInspector.title}
          </div>
        </div>
        <button onClick={b.clearWfNode} style={sx(`width:28px;height:28px;border-radius:7px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--surface2)">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div style={sx(`flex:1;overflow-y:auto;padding:18px`)}>
        <div style={sx(`font-size:12.5px;color:var(--text2);line-height:1.55;margin-bottom:18px`)}>
          {b.wfInspector.desc}
        </div>
        {b.wfInspector.isTrigger ? (
          <>
            <div style={sx(`font-size:11.5px;font-weight:600;color:var(--text2);margin-bottom:7px`)}>
              {"Source"}
            </div>
            <div style={sx(`display:flex;align-items:center;gap:9px;border:1px solid var(--border);border-radius:10px;padding:11px 13px;font-size:13px;font-weight:500`)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
              </svg>
              {b.wfInspector.source}
            </div>
          </>
        ) : null}
        {b.wfInspector.hasAuto ? (
          <>
            <div style={sx(`font-size:11.5px;font-weight:600;color:var(--text2);margin-bottom:7px`)}>
              {"Autonomy"}
            </div>
            <div style={sx(`display:flex;gap:2px;background:var(--surface2);border-radius:9px;padding:3px;margin-bottom:8px`)}>
              {(b.wfInspector.autoOpts || []).map((o, oI) => (
                <React.Fragment key={oI}>
                  <button onClick={o.onClick} style={sx(`${o.style}`)}>
                    {o.name}
                  </button>
                </React.Fragment>
              ))}
            </div>
            <div style={sx(`font-size:11px;color:var(--text3);line-height:1.5;margin-bottom:20px`)}>
              {"Automate runs hands-free · Confirm waits for your approval · Suggest only recommends."}
              {b.wfInspector.autoSynced ? (
                <>
                  <span style={sx(`display:block;margin-top:6px;color:var(--accent);font-weight:500`)}>
                    {"Synced with this agent’s configuration — changing it here updates the agent everywhere."}
                  </span>
                </>
              ) : null}
            </div>
          </>
        ) : null}
        {b.wfInspector.hasCond ? (
          <>
            <div style={sx(`font-size:11.5px;font-weight:600;color:var(--text2);margin-bottom:7px`)}>
              {"Advance when"}
            </div>
            <input value={b.wfInspector.cond} onInput={b.wfInspector.setCond} style={sx(`width:100%;border:1px solid var(--border2);background:var(--surface);border-radius:9px;padding:9px 12px;font-size:12.5px;color:var(--text);outline:none;margin-bottom:20px`)} data-focus="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg)" />
          </>
        ) : null}
        {b.wfInspector.hasModel ? (
          <>
            <div style={sx(`font-size:11.5px;font-weight:600;color:var(--text2);margin-bottom:7px`)}>
              {"Model"}
            </div>
            <div style={sx(`display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:500;border:1px solid var(--border);border-radius:9px;padding:9px 12px;margin-bottom:18px`)}>
              <span style={sx(`width:6px;height:6px;border-radius:50%;background:var(--accent)`)} />
              {b.wfInspector.model}
            </div>
          </>
        ) : null}
        {b.wfInspector.isBranch ? (
          <>
            <div style={sx(`display:flex;align-items:center;gap:8px;font-size:11.5px;color:var(--warn);background:var(--warn-bg);border-radius:9px;padding:10px 12px;line-height:1.45`)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                <path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0Z" />
                <path d="M12 9v4m0 4h.01" />
              </svg>
              {"Conditional path — runs only "}{b.wfInspector.when}{"."}
            </div>
          </>
        ) : null}
        {b.wfInspector.isAgent ? (
          <>
            <button onClick={b.wfInspector.openAgentCfg} style={sx(`width:100%;display:flex;align-items:center;justify-content:center;gap:7px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);border-radius:9px;padding:10px;font-size:12.5px;font-weight:600;cursor:pointer;margin-top:4px`)} data-hover="background:var(--surface2);color:var(--text)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9 2 2 0 1 1-2.8 2.8 1.7 1.7 0 0 0-2.9 1.2 2 2 0 0 1-4 0 1.7 1.7 0 0 0-2.9-1.2 2 2 0 1 1-2.8-2.8 1.7 1.7 0 0 0-1.2-2.9 2 2 0 0 1 0-4 1.7 1.7 0 0 0 1.2-2.9 2 2 0 1 1 2.8-2.8 1.7 1.7 0 0 0 2.9-1.2 2 2 0 0 1 4 0 1.7 1.7 0 0 0 2.9 1.2 2 2 0 1 1 2.8 2.8 1.7 1.7 0 0 0 .9 2.9Z" />
              </svg>
              {"Open agent configuration"}
            </button>
          </>
        ) : null}
        {b.wfInspector.canRemove ? (
          <>
            <button onClick={b.wfInspector.remove} style={sx(`width:100%;display:flex;align-items:center;justify-content:center;gap:7px;border:1px solid var(--border2);background:var(--surface);color:var(--bad);border-radius:9px;padding:10px;font-size:12.5px;font-weight:600;cursor:pointer;margin-top:10px`)} data-hover="background:var(--bad-bg);border-color:var(--bad)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              </svg>
              {"Remove step"}
            </button>
          </>
        ) : null}
      </div>
    </div>
    </>
  );
}
