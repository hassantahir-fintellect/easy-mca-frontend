import React from 'react';
import { sx } from '../../lib/sx';

export default function SrcPanelOpen({ b }) {
  return (
    <>
    <div onClick={b.closeSrcPanel} style={sx(`position:fixed;inset:0;z-index:84;background:rgba(40,30,70,.18);animation:msgIn .14s ease both`)}>
      <div onClick={b.stop} style={sx(`position:absolute;top:0;right:0;height:100%;width:min(920px,94vw);background:var(--surface);border-left:1px solid var(--border);box-shadow:-24px 0 60px rgba(40,30,90,.22);display:flex;flex-direction:column;animation:srcSlide .22s cubic-bezier(.2,.8,.2,1) both`)}>
        <div style={sx(`padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:11px;flex:none`)}>
          <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--accent-bg);color:var(--accent);display:flex;align-items:center;justify-content:center;flex:none`)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 3v5h5" />
              <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            </svg>
          </div>
          <div style={sx(`flex:1;min-width:0`)}>
            <div style={sx(`font-size:14px;font-weight:600`)}>
              {b.srcPanelTitle}
            </div>
            <div style={sx(`font-size:11.5px;color:var(--text3)`)}>
              {b.srcPanelSub}
            </div>
          </div>
          <button onClick={b.closeSrcPanel} style={sx(`width:30px;height:30px;border-radius:8px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--surface2)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div id="srcPanelBody" style={sx(`flex:1;min-height:0;display:flex`)}>
          {/* LEFT: source evidence for the selected field */}
          <div style={sx(`${b.srcLeftStyle}`)}>
            <div style={sx(`padding:13px 18px 10px;position:sticky;top:0;background:var(--surface2);border-bottom:1px solid var(--border);z-index:1`)}>
              <div style={sx(`font:600 10px var(--mono);text-transform:uppercase;letter-spacing:.06em;color:var(--text3)`)}>
                {"Source evidence"}
              </div>
              <div style={sx(`font-size:13.5px;font-weight:600;color:var(--text);margin-top:3px`)}>
                {b.srcSelLabel}
              </div>
              <div style={sx(`font-size:11.5px;color:var(--text2);line-height:1.5;margin-top:3px`)}>
                {b.srcPanelView.intro}
              </div>
            </div>
            <div style={sx(`padding:14px 18px;display:flex;flex-direction:column;gap:11px`)}>
              {(b.srcPanelView.docs || []).map((d, dI) => (
                <React.Fragment key={dI}>
                  <div style={sx(`${d.cardStyle}`)}>
                    <div style={sx(`display:flex;align-items:center;gap:8px;margin-bottom:9px`)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                        <path d="M14 3v5h5" />
                        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                      </svg>
                      <span style={sx(`font:600 11.5px var(--mono);color:var(--text);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>
                        {d.file}
                      </span>
                      <span style={sx(`${d.confStyle}`)}>
                        {d.conf}
                      </span>
                    </div>
                    {d.img ? (
                      <>
                        <div style={sx(`position:relative;border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-bottom:9px;background:#fff`)}>
                          <img src="assets/bank-statement-sample.png" alt="Source statement page" style={sx(`display:block;width:100%;height:auto`)} />
                          <div style={sx(`position:absolute;top:6px;left:8px;font:600 8.5px var(--mono);letter-spacing:.04em;background:rgba(23,23,21,.72);color:#fff;padding:2px 7px;border-radius:5px`)}>
                            {"SOURCE PAGE"}
                          </div>
                        </div>
                      </>
                    ) : null}
                    <div style={sx(`background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:10px 12px;font-family:var(--mono);font-size:11px;line-height:1.85;color:var(--text2)`)}>
                      {(d.lines || []).map((ln, lnI) => (
                        <React.Fragment key={lnI}>
                          <div>
                            <span>
                              {ln.label}
                            </span>
                            {' '}
                            {ln.hl ? (
                              <>
                                <span style={sx(`${ln.valStyle}`)}>
                                  {ln.val}
                                </span>
                              </>
                            ) : null}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}
              <div style={sx(`display:flex;gap:9px;align-items:flex-start;margin-top:3px;padding-top:13px;border-top:1px solid var(--border)`)}>
                <div style={sx(`width:19px;height:19px;border-radius:6px;flex:none;display:flex;align-items:center;justify-content:center;background:${b.srcPanelView.verified.iconBg};color:${b.srcPanelView.verified.iconColor};margin-top:1px`)}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div style={sx(`flex:1;min-width:0;font-size:11.5px;color:var(--text2);line-height:1.55`)}>
                  <strong style={sx(`color:${b.srcPanelView.verified.titleColor};font-weight:700`)}>
                    {b.srcPanelView.verified.title}
                  </strong>
                  {" — "}{b.srcPanelView.verified.text}
                </div>
              </div>
            </div>
          </div>
          {/* DIVIDER (drag to resize) */}
          <div onMouseDown={b.startSrcResize} onTouchStart={b.startSrcResize} style={sx(`flex:none;width:6px;cursor:col-resize;background:var(--border);display:flex;align-items:center;justify-content:center`)} data-hover="background:var(--accent)">
            <div style={sx(`width:2px;height:30px;border-radius:2px;background:var(--text3);opacity:.4`)} />
          </div>
          {/* RIGHT: editable fields (whole row selects -> loads evidence on left) */}
          <div style={sx(`${b.srcRightStyle}`)}>
            <div style={sx(`padding:11px 16px;font-size:11px;color:var(--text3);line-height:1.5;border-bottom:1px solid var(--border);position:sticky;top:0;background:var(--surface);z-index:1`)}>
              {"Select a field to inspect its source on the left. Edit a value inline — edits are independent of the evidence."}
            </div>
            {(b.srcGroups || []).map((g, gI) => (
              <React.Fragment key={gI}>
                <div style={sx(`padding:9px 16px 6px;font:600 10px var(--mono);text-transform:uppercase;letter-spacing:.06em;color:var(--text3);background:var(--surface2);border-bottom:1px solid var(--border)`)}>
                  {g.name}
                </div>
                {(g.fields || []).map((f, fI) => (
                  <React.Fragment key={fI}>
                    <div onClick={f.onSelect} style={sx(`${f.rowStyle}`)} data-hover="background:var(--surface2)">
                      <div style={sx(`flex:1;min-width:0`)}>
                        <div style={sx(`${f.labelStyle}`)}>
                          {f.label}
                        </div>
                        <div style={sx(`font-size:10px;color:var(--text3);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>
                          {f.note}
                        </div>
                      </div>
                      <input value={f.value} onInput={f.onInput} onClick={b.stop} style={sx(`${f.inputStyle}`)} data-focus="border-color:var(--accent)" />
                    </div>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
            <div style={sx(`padding:13px 16px;font-size:11px;color:var(--text3);line-height:1.5`)}>
              {b.srcFoot}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
