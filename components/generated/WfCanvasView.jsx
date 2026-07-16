import React from 'react';
import { sx } from '../../lib/sx';
import WfHasInspectorView2 from './WfHasInspectorView2';

export default function WfCanvasView({ b }) {
  return (
    <>
    <div data-screen-label="Workflow canvas" style={sx(`flex:1;display:flex;flex-direction:column;min-height:0;background:var(--bg)`)}>
      {/* toolbar */}
      <div className="wrap-sm" style={sx(`flex:none;display:flex;align-items:center;gap:12px;padding:11px 18px;border-bottom:1px solid var(--border);background:var(--surface)`)}>
        <button onClick={b.backToWorkflows} style={sx(`display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);padding:6px 11px;border-radius:8px;font-size:12.5px;font-weight:500;cursor:pointer;flex:none`)} data-hover="background:var(--surface2);color:var(--text)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 6-6 6 6 6" />
          </svg>
          {"Workflows"}
        </button>
        <div style={sx(`min-width:0;line-height:1.3`)}>
          <div style={sx(`font-size:14px;font-weight:600;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
            {b.wfName}
          </div>
          <div style={sx(`font-size:11px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
            {"Trigger · "}{b.wfTrigger}
          </div>
        </div>
        <span style={sx(`${b.wfStatusStyle};flex:none`)}>
          <span style={sx(`width:5px;height:5px;border-radius:50%;background:currentColor`)} />
          {b.wfStatus}
        </span>
        <div style={sx(`margin-left:auto;display:flex;align-items:center;gap:8px;flex:none`)}>
          <div style={sx(`display:flex;align-items:center;gap:1px;background:var(--surface2);border-radius:8px;padding:2px`)}>
            <button onClick={b.wfZoomOut} style={sx(`width:28px;height:26px;border:none;background:transparent;color:var(--text2);border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center`)} data-hover="background:var(--surface);color:var(--text)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14" />
              </svg>
            </button>
            <button onClick={b.wfZoomReset} style={sx(`min-width:44px;border:none;background:transparent;color:var(--text2);font:500 11.5px var(--mono);cursor:pointer;padding:0 4px`)} data-hover="color:var(--text)">
              {b.wfZoomLabel}
            </button>
            <button onClick={b.wfZoomIn} style={sx(`width:28px;height:26px;border:none;background:transparent;color:var(--text2);border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center`)} data-hover="background:var(--surface);color:var(--text)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
          <button onClick={b.toggleWfStatus} style={sx(`border:1px solid var(--border2);background:var(--surface);color:var(--text2);padding:7px 12px;border-radius:8px;font-size:12.5px;font-weight:500;cursor:pointer`)} data-hover="background:var(--surface2);color:var(--text)">
            {b.wfStatusToggleLabel}
          </button>
          <button onClick={b.runWorkflow} style={sx(`display:inline-flex;align-items:center;gap:7px;border:none;background:var(--accent);color:#fff;padding:7px 14px;border-radius:8px;font-size:12.5px;font-weight:600;cursor:pointer;box-shadow:var(--shadow)`)} data-hover="background:var(--accent2)">
            {b.wfRunning ? (
              <>
                <span style={sx(`width:12px;height:12px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;flex:none`)} />
              </>
            ) : null}
            {b.wfNotRunning ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M7 5v14l11-7z" />
                </svg>
              </>
            ) : null}
            {b.wfRunLabel}
          </button>
        </div>
      </div>
      <div style={sx(`flex:1;display:flex;min-height:0`)}>
        {/* palette */}
        {b.wfPaletteOpen ? (
          <>
            <div className="wf-palette" style={sx(`width:210px;flex:none;border-right:1px solid var(--border);background:var(--surface);display:flex;flex-direction:column;min-height:0`)}>
              <div style={sx(`padding:15px 15px 9px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text3)`)}>
                {"Add a step"}
              </div>
              <div style={sx(`flex:1;overflow-y:auto;padding:0 10px 12px;display:flex;flex-direction:column;gap:7px`)}>
                {(b.wfPaletteItems || []).map((p, pI) => (
                  <React.Fragment key={pI}>
                    <button onClick={p.onClick} style={sx(`display:flex;align-items:center;gap:11px;border:1px solid var(--border);background:var(--surface);border-radius:10px;padding:10px 11px;cursor:pointer;text-align:left`)} data-hover="border-color:#b9cdf5;background:var(--accent-bg)">
                      <div style={sx(`width:28px;height:28px;border-radius:8px;background:var(--surface2);color:var(--text2);display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                        {p.glyph}
                      </div>
                      <div style={sx(`min-width:0;line-height:1.3`)}>
                        <div style={sx(`font-size:12.5px;font-weight:600`)}>
                          {p.name}
                        </div>
                        <div style={sx(`font-size:10.5px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                          {p.desc}
                        </div>
                      </div>
                    </button>
                  </React.Fragment>
                ))}
                <div style={sx(`margin-top:6px;padding:11px;border:1px dashed var(--border2);border-radius:10px;font-size:11px;color:var(--text3);line-height:1.5`)}>
                  {"New steps append to the flow before the final action — select one to configure it."}
                </div>
              </div>
            </div>
          </>
        ) : null}
        {/* canvas */}
        <div style={sx(`flex:1;min-width:0;overflow:auto;position:relative;background:var(--bg);background-image:radial-gradient(circle,#dcdcd8 1px,transparent 1px);background-size:22px 22px`)}>
          <button onClick={b.wfTogglePalette} style={sx(`position:absolute;top:12px;left:12px;z-index:5;width:30px;height:30px;border:1px solid var(--border);background:var(--surface);color:var(--text2);border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow)`)} data-hover="color:var(--text)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M9 4v16" />
            </svg>
          </button>
          <div style={sx(`padding:34px 30px 60px;min-width:min-content`)}>
            <div style={sx(`${b.wfInnerStyle}`)}>
              <svg style={sx(`${b.wfSvgStyle}`)} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="wfarrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
                    <path d="M1 1 L7 4.5 L1 8" fill="none" stroke="#b7bfd0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </marker>
                </defs>
                {(b.wfEdges || []).map((e, eI) => (
                  <React.Fragment key={eI}>
                    <path d={e.d} fill="none" stroke={e.col} strokeWidth={e.w} strokeLinecap="round" markerEnd="url(#wfarrow)" />
                  </React.Fragment>
                ))}
              </svg>
              {(b.wfBranchLabels || []).map((l, lI) => (
                <React.Fragment key={lI}>
                  <div style={sx(`${l.style}`)}>
                    {l.text}
                  </div>
                </React.Fragment>
              ))}
              {(b.wfBranches || []).map((n, nI) => (
                <React.Fragment key={nI}>
                  <div style={sx(`${n.style}`)} onClick={n.onClick}>
                    <div style={sx(`display:flex;align-items:center;gap:9px`)}>
                      <div style={sx(`${n.badgeStyle}`)}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 3v6a3 3 0 0 0 3 3h6" />
                          <circle cx="6" cy="4" r="1.6" />
                          <circle cx="18" cy="12" r="1.6" />
                          <path d="M18 14v3a3 3 0 0 1-3 3H9" />
                          <circle cx="6" cy="20" r="1.6" />
                        </svg>
                      </div>
                      <div style={sx(`min-width:0;line-height:1.25`)}>
                        <div style={sx(`font:600 9.5px var(--mono);color:var(--text3);text-transform:uppercase;letter-spacing:.05em`)}>
                          {n.topTag}
                        </div>
                        <div style={sx(`font-size:12.5px;font-weight:600`)}>
                          {n.titleText}
                        </div>
                      </div>
                    </div>
                    <div style={sx(`font-size:11px;color:var(--text2);line-height:1.45;margin-top:7px`)}>
                      {n.bodyText}
                    </div>
                  </div>
                </React.Fragment>
              ))}
              {(b.wfNodes || []).map((n, nI) => (
                <React.Fragment key={nI}>
                  <div style={sx(`${n.style}`)} onClick={n.onClick}>
                    <div style={sx(`display:flex;align-items:center;gap:10px;margin-bottom:8px`)}>
                      <div style={sx(`${n.badgeStyle}`)}>
                        {n.isAgent ? (
                          <>
                            {n.mono}
                          </>
                        ) : null}
                        {n.isTrigger ? (
                          <>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                              <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
                            </svg>
                          </>
                        ) : null}
                        {n.isAction ? (
                          <>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m22 2-7 20-4-9-9-4Z" />
                              <path d="M22 2 11 13" />
                            </svg>
                          </>
                        ) : null}
                        {n.needsMonoGlyph ? (
                          <>
                            {n.mono}
                          </>
                        ) : null}
                      </div>
                      <div style={sx(`flex:1;min-width:0;line-height:1.25`)}>
                        <div style={sx(`font:600 9.5px var(--mono);color:var(--text3);text-transform:uppercase;letter-spacing:.05em`)}>
                          {n.topTag}
                        </div>
                        <div style={sx(`font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                          {n.titleText}
                        </div>
                      </div>
                      {n.showDone ? (
                        <>
                          <span style={sx(`width:18px;height:18px;border-radius:50%;background:var(--ok);display:flex;align-items:center;justify-content:center;flex:none`)}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          </span>
                        </>
                      ) : null}
                      {n.hasAuto ? (
                        <>
                          <span style={sx(`${n.autoStyle}`)}>
                            {n.auto}
                          </span>
                        </>
                      ) : null}
                    </div>
                    <div style={sx(`font-size:12px;color:var(--text2);line-height:1.45;flex:1`)}>
                      {n.bodyText}
                    </div>
                    {n.hasCond ? (
                      <>
                        <div style={sx(`display:flex;align-items:center;gap:6px;font-size:10.5px;color:var(--text2);background:var(--surface2);border-radius:7px;padding:5px 8px;margin-top:9px;width:fit-content;max-width:100%`)}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m0 8v3a2 2 0 0 0 2 2h3m8-18h3a2 2 0 0 1 2 2v3m0 8v3a2 2 0 0 1-2 2h-3" />
                          </svg>
                          <span style={sx(`white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                            {n.cond}
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        {/* inspector */}
        {b.wfHasInspector ? <WfHasInspectorView2 b={b} /> : null}
      </div>
    </div>
    </>
  );
}
