import React from 'react';
import { sx } from '../../lib/sx';

export default function UwView({ b }) {
  return (
    <>
    <div style={sx(`flex:1;display:flex;min-height:0`)}>
      {/* queue column */}
      <div className="uw-queue" style={sx(`width:264px;flex:none;border-right:1px solid var(--border);background:var(--surface);display:flex;flex-direction:column;min-height:0`)}>
        <div style={sx(`padding:18px 18px 12px;border-bottom:1px solid var(--border)`)}>
          <div style={sx(`display:flex;align-items:center;justify-content:space-between;margin-bottom:3px`)}>
            <h2 style={sx(`font-size:14.5px;font-weight:600;margin:0`)}>
              {"Submission queue"}
            </h2>
            <span style={sx(`font:600 11px var(--mono);color:var(--text3)`)}>
              {b.queueCount}
            </span>
          </div>
          <div style={sx(`font-size:12px;color:var(--text3)`)}>
            {"Sorted by agent readiness"}
          </div>
        </div>
        <div style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;padding:8px`)}>
          {(b.queue || []).map((d, dI) => (
            <React.Fragment key={dI}>
              <div onClick={d.onClick} style={sx(`${d.rowStyle}`)}>
                <div style={sx(`display:flex;align-items:center;gap:8px;margin-bottom:4px`)}>
                  <div style={sx(`font-size:13px;font-weight:600;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                    {d.name}
                  </div>
                  <div style={sx(`font:500 12px var(--mono);color:var(--text2)`)}>
                    {d.amountFmt}
                  </div>
                </div>
                <div style={sx(`display:flex;align-items:center;gap:7px`)}>
                  <span style={sx(`${d.stageStyle}`)}>
                    {d.stage}
                  </span>
                  <span style={sx(`font-size:11px;color:var(--text3);margin-left:auto`)}>
                    {d.time}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* thread column */}
      <div style={sx(`flex:1;min-width:0;display:flex;flex-direction:column;background:var(--bg)`)}>
        {/* deal header */}
        <div className="deal-hdr" style={sx(`padding:18px 32px;border-bottom:1px solid var(--border);background:var(--surface);display:flex;align-items:center;gap:14px`)}>
          <div>
            <div style={sx(`display:flex;align-items:center;gap:10px`)}>
              <h1 style={sx(`font-size:18px;font-weight:600;margin:0;letter-spacing:-.01em`)}>
                {b.deal.name}
              </h1>
              <span style={sx(`font:500 12px var(--sans);background:var(--surface2);color:var(--text2);padding:2px 10px;border-radius:999px;white-space:nowrap`)}>
                {b.deal.amountFmt}
              </span>
            </div>
            <div style={sx(`font-size:12.5px;color:var(--text2);margin-top:3px`)}>
              {b.deal.meta}
            </div>
          </div>
          <div style={sx(`margin-left:auto;display:flex;align-items:center;gap:8px`)}>
            <span style={sx(`font-size:12px;color:var(--text3)`)}>
              {"Underwriting Agent"}
            </span>
            <span style={sx(`font:500 12px var(--sans);background:var(--warn-bg);color:var(--warn);padding:2px 10px;border-radius:999px`)}>
              {"Confirm mode"}
            </span>
          </div>
        </div>
        {/* thread scroll */}
        <div ref={b.threadRef} className="thread-scroll" style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;padding:48px 32px 24px`)}>
          <div style={sx(`max-width:740px;margin:0 auto;display:flex;flex-direction:column;gap:34px`)}>
            {(b.uwBlocks || []).map((b, bI) => (
              <React.Fragment key={bI}>
                {/* USER */}
                {b.isUser ? (
                  <>
                    <div style={sx(`align-self:flex-end;max-width:78%;background:var(--surface2);color:var(--text);padding:10px 14px;border-radius:12px;font-size:14px;line-height:1.55;animation:msgIn .3s ease both`)}>
                      {b.text}
                    </div>
                  </>
                ) : null}
                {/* AGENT TEXT */}
                {b.isAgentText ? (
                  <>
                    <div style={sx(`display:flex;gap:14px;animation:msgIn .3s ease both`)}>
                      <div style={sx(`width:30px;height:30px;border-radius:8px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                        {"Uw"}
                      </div>
                      <div style={sx(`flex:1;min-width:0`)}>
                        <div style={sx(`display:flex;align-items:center;gap:8px;margin-bottom:4px`)}>
                          <span style={sx(`font-size:12.5px;font-weight:600`)}>
                            {"Underwriting Agent"}
                          </span>
                          {b.confidence ? (
                            <>
                              <span style={sx(`font:500 10.5px var(--mono);color:var(--text3)`)}>
                                {b.confidence}{"% conf."}
                              </span>
                            </>
                          ) : null}
                        </div>
                        <div style={sx(`font-size:14px;line-height:1.65;color:var(--text2)`)}>
                          {b.text}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {/* SUBMISSION HEALTH */}
                {b.isHealth ? (
                  <>
                    <div style={sx(`display:flex;gap:14px;animation:msgIn .3s ease both`)}>
                      <div style={sx(`width:30px;height:30px;border-radius:8px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;flex:none`)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 12h4l2 7 4-14 2 7h6" />
                        </svg>
                      </div>
                      <div style={sx(`flex:1;min-width:0;background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden`)}>
                        <div style={sx(`padding:17px 20px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:16px`)}>
                          <div style={sx(`flex:1;min-width:0`)}>
                            <div style={sx(`display:flex;align-items:center;gap:9px;margin-bottom:4px`)}>
                              <span style={sx(`font-size:13.5px;font-weight:700;letter-spacing:-.01em`)}>
                                {"Submission health"}
                              </span>
                              <span style={sx(`${b.statusStyle}`)}>
                                {b.statusLabel}
                              </span>
                            </div>
                            <div style={sx(`font-size:11.5px;color:var(--text3)`)}>
                              {"Agent triage · parsing, intake & scrub"}
                            </div>
                          </div>
                          <div style={sx(`flex:none;text-align:right`)}>
                            <div style={sx(`display:flex;align-items:baseline;gap:5px;justify-content:flex-end`)}>
                              <span style={sx(`font-size:28px;font-weight:600;line-height:1;letter-spacing:-.01em;color:${b.healthColor}`)}>
                                {b.healthPct}
                              </span>
                              <span style={sx(`font-size:11.5px;color:var(--text3)`)}>
                                {"confidence"}
                              </span>
                            </div>
                            <div style={sx(`width:148px;height:6px;background:var(--surface2);border-radius:4px;overflow:hidden;margin-top:8px;margin-left:auto`)}>
                              <div style={sx(`height:100%;width:${b.healthWidth};background:${b.healthColor};border-radius:4px;transition:width .55s cubic-bezier(.4,0,.2,1)`)} />
                            </div>
                          </div>
                        </div>
                        {(b.issues || []).map((iss, issI) => (
                          <React.Fragment key={issI}>
                            <div style={sx(`${iss.rowStyle}`)}>
                              <span style={sx(`${iss.iconWrap}`)}>
                                {iss.icon}
                              </span>
                              <div style={sx(`flex:1;min-width:0`)}>
                                <div style={sx(`display:flex;align-items:center;gap:8px;margin-bottom:3px`)}>
                                  <span style={sx(`font-size:13px;font-weight:600`)}>
                                    {iss.title}
                                  </span>
                                  <span style={sx(`${iss.sevStyle}`)}>
                                    {iss.sevLabel}
                                  </span>
                                </div>
                                <div style={sx(`font-size:12.5px;color:var(--text2);line-height:1.5`)}>
                                  {iss.desc}
                                </div>
                              </div>
                              {iss.resolved ? (
                                <>
                                  <span style={sx(`display:flex;align-items:center;gap:6px;font:500 11.5px var(--sans);color:var(--ok);background:var(--ok-bg);padding:5px 11px;border-radius:999px;flex:none`)}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                    {iss.resolvedLabel}
                                  </span>
                                </>
                              ) : null}
                              {iss.actionable ? (
                                <>
                                  <button onClick={iss.onClick} style={sx(`${iss.btnStyle}`)}>
                                    {iss.actionLabel}
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                                      <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                  </button>
                                </>
                              ) : null}
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
                {/* DOC PARSE */}
                {b.isDocParse ? (
                  <>
                    <div style={sx(`display:flex;gap:14px;animation:msgIn .3s ease both`)}>
                      <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--surface2);color:var(--text2);display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                        {"Dp"}
                      </div>
                      <div style={sx(`flex:1;min-width:0;background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden`)}>
                        <div className="wrap-sm" style={sx(`padding:15px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px`)}>
                          <span style={sx(`font-size:12.5px;font-weight:600`)}>
                            {"Document Parsing Agent"}
                          </span>
                          <span style={sx(`font:500 11px var(--sans);color:var(--ok);background:var(--ok-bg);padding:2px 8px;border-radius:999px`)}>
                            {"98.2% extraction"}
                          </span>
                          <span style={sx(`font-size:11.5px;color:var(--text3);margin-left:auto`)}>
                            {"4 statements · Feb–May 2026"}
                          </span>
                        </div>
                        <div className="stat-3" style={sx(`display:grid;grid-template-columns:repeat(3,1fr)`)}>
                          {(b.docFields || []).map((f, fI) => (
                            <React.Fragment key={fI}>
                              <div style={sx(`padding:15px 20px;border-right:1px solid var(--border);border-bottom:1px solid var(--border)`)}>
                                <div style={sx(`font-size:11px;color:var(--text3);margin-bottom:6px`)}>
                                  {f.k}
                                </div>
                                <div style={sx(`font-size:15.5px;font-weight:600;letter-spacing:-.01em`)}>
                                  {f.v}
                                </div>
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {/* INFORMATION COLLECTION */}
                {b.isInfoCollect ? (
                  <>
                    <div style={sx(`display:flex;gap:14px;animation:msgIn .3s ease both`)}>
                      <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--surface2);color:var(--text2);display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                        {"Ic"}
                      </div>
                      <div style={sx(`flex:1;min-width:0;background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden`)}>
                        <div style={sx(`padding:15px 20px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)`)}>
                          <span style={sx(`font-size:12.5px;font-weight:600`)}>
                            {"Information Collection Agent"}
                          </span>
                          <span style={sx(`font:500 11px var(--sans);color:var(--ok);background:var(--ok-bg);padding:2px 8px;border-radius:999px`)}>
                            {"Intake complete"}
                          </span>
                          <span style={sx(`font-size:11.5px;color:var(--text3);margin-left:auto`)}>
                            {b.note}
                          </span>
                        </div>
                        {(b.items || []).map((it, itI) => (
                          <React.Fragment key={itI}>
                            <div className="field-row" style={sx(`display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border)`)}>
                              <span style={sx(`${it.markStyle}`)}>
                                {it.mark}
                              </span>
                              <span style={sx(`font-size:12.5px;font-weight:500;width:140px;flex:none`)}>
                                {it.label}
                              </span>
                              <span style={sx(`font-size:12.5px;color:var(--text2);flex:1`)}>
                                {it.d}
                              </span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
                {/* SCORECARD */}
                {b.isScorecard ? (
                  <>
                    <div style={sx(`display:flex;gap:14px;animation:msgIn .3s ease both`)}>
                      <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--surface2);color:var(--text2);display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                        {"Sc"}
                      </div>
                      <div style={sx(`flex:1;min-width:0;background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden`)}>
                        <div style={sx(`padding:13px 16px;display:flex;align-items:center;gap:11px;border-bottom:1px solid var(--border)`)}>
                          <span style={sx(`font-size:12.5px;font-weight:600`)}>
                            {"Scrubbing Agent"}
                          </span>
                          <span style={sx(`font-size:11.5px;color:var(--text2)`)}>
                            {"scrubbed against Pinnacle Advance criteria"}
                          </span>
                          <div style={sx(`margin-left:auto;display:flex;align-items:baseline;gap:4px`)}>
                            <span style={sx(`font-family:var(--serif);font-size:22px;font-weight:600;color:var(--ok)`)}>
                              {"82"}
                            </span>
                            <span style={sx(`font-size:11px;color:var(--text3)`)}>
                              {"/100"}
                            </span>
                          </div>
                        </div>
                        <div>
                          {(b.criteria || []).map((c, cI) => (
                            <React.Fragment key={cI}>
                              <div className="field-row" style={sx(`display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border)`)}>
                                <span style={sx(`${c.markStyle}`)}>
                                  {c.mark}
                                </span>
                                <span style={sx(`font-size:12.5px;flex:1`)}>
                                  {c.c}
                                </span>
                                <span style={sx(`font:500 12px var(--mono);color:var(--text2)`)}>
                                  {c.n}
                                </span>
                              </div>
                            </React.Fragment>
                          ))}
                          <div style={sx(`padding:11px 16px;background:var(--warn-bg);font-size:12px;color:var(--warn);display:flex;gap:7px;align-items:center`)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M12 9v4m0 4h.01" />
                              <path d="M10.3 4.3 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" />
                            </svg>
                            {"2 items flagged — 3 NSFs concentrated in March, 2 stacked positions"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {/* UNDERWRITING REC */}
                {b.isUnderwriting ? (
                  <>
                    <div style={sx(`display:flex;gap:14px;animation:msgIn .35s ease both`)}>
                      <div style={sx(`width:30px;height:30px;border-radius:8px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                        {"Uw"}
                      </div>
                      <div style={sx(`flex:1;min-width:0;background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden`)}>
                        <div className="wrap-sm" style={sx(`padding:18px 20px;display:flex;align-items:flex-start;gap:16px;border-bottom:1px solid var(--border)`)}>
                          <div style={sx(`flex:1`)}>
                            <div style={sx(`font-size:11px;color:var(--text2);font-weight:500;text-transform:uppercase;letter-spacing:.05em;margin-bottom:7px`)}>
                              {"Recommendation"}
                            </div>
                            <div style={sx(`display:flex;align-items:center;gap:10px`)}>
                              <span style={sx(`font-family:var(--serif);font-size:26px;font-weight:600;letter-spacing:-.01em`)}>
                                {b.decisionLabel}
                              </span>
                              <span style={sx(`font:500 12px var(--sans);background:var(--accent-bg);color:var(--accent2);padding:2px 10px;border-radius:999px`)}>
                                {b.amountFmt}
                              </span>
                            </div>
                          </div>
                          <div style={sx(`text-align:right`)}>
                            <div style={sx(`font-size:11px;color:var(--text2);margin-bottom:6px`)}>
                              {"Confidence"}
                            </div>
                            <div style={sx(`display:flex;align-items:center;gap:8px`)}>
                              <div style={sx(`width:80px;height:6px;background:var(--surface2);border-radius:4px;overflow:hidden`)}>
                                <div style={sx(`height:100%;width:${b.confWidth};background:${b.confColor};border-radius:4px;animation:barGrow .8s ease`)} />
                              </div>
                              <span style={sx(`font-family:var(--serif);font-size:20px;font-weight:600;color:${b.confColor}`)}>
                                {b.confPct}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="stat-3" style={sx(`display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid var(--border)`)}>
                          <div style={sx(`padding:13px 18px;border-right:1px solid var(--border)`)}>
                            <div style={sx(`font-size:11px;color:var(--text2);margin-bottom:5px`)}>
                              {"Factor rate"}
                            </div>
                            <div style={sx(`display:flex;align-items:center;gap:8px`)}>
                              <span style={sx(`font-size:16px;font-weight:600;letter-spacing:-.01em;font-family:var(--sans)`)}>
                                {b.factorFmt}
                              </span>
                              {b.isLiveUw ? (
                                <>
                                  <span style={sx(`display:inline-flex;gap:2px;margin-left:auto`)}>
                                    <button onClick={b.adjDown} style={sx(`width:22px;height:22px;border:1px solid var(--border2);background:var(--surface);border-radius:6px;font:600 13px var(--mono);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1`)} data-hover="background:var(--surface2);color:var(--text)">
                                      {"−"}
                                    </button>
                                    <button onClick={b.adjUp} style={sx(`width:22px;height:22px;border:1px solid var(--border2);background:var(--surface);border-radius:6px;font:600 13px var(--mono);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1`)} data-hover="background:var(--surface2);color:var(--text)">
                                      {"+"}
                                    </button>
                                  </span>
                                </>
                              ) : null}
                            </div>
                            {b.factorAdjusted ? (
                              <>
                                <div style={sx(`font:500 10.5px var(--mono);color:var(--accent);margin-top:5px;display:flex;align-items:center;gap:5px`)}>
                                  <span style={sx(`width:5px;height:5px;border-radius:50%;background:var(--accent)`)} />
                                  {"your adjustment "}{b.factorAdjLabel}
                                </div>
                              </>
                            ) : null}
                          </div>
                          <div style={sx(`padding:13px 18px;border-right:1px solid var(--border)`)}>
                            <div style={sx(`font-size:11px;color:var(--text2);margin-bottom:5px`)}>
                              {"Term"}
                            </div>
                            <div style={sx(`font-size:16px;font-weight:600;letter-spacing:-.01em;font-family:var(--sans)`)}>
                              {b.termFmt}
                            </div>
                          </div>
                          <div style={sx(`padding:13px 18px`)}>
                            <div style={sx(`font-size:11px;color:var(--text2);margin-bottom:5px`)}>
                              {"Est. daily"}
                            </div>
                            <div style={sx(`font-size:16px;font-weight:600;letter-spacing:-.01em;font-family:var(--sans)`)}>
                              {b.dailyFmt}
                            </div>
                          </div>
                        </div>
                        <div style={sx(`padding:14px 18px;border-bottom:1px solid var(--border)`)}>
                          <div style={sx(`font-size:11px;color:var(--text2);font-weight:500;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px`)}>
                            {"Rationale"}
                          </div>
                          {(b.rationale || []).map((r, rI) => (
                            <React.Fragment key={rI}>
                              <div style={sx(`display:flex;align-items:center;gap:10px;padding:5px 0`)}>
                                <span style={sx(`width:7px;height:7px;border-radius:50%;background:${r.dot};flex:none`)} />
                                <span style={sx(`font-size:13px;width:150px;flex:none;color:var(--text2)`)}>
                                  {r.label}
                                </span>
                                <span style={sx(`font-size:13px;font-weight:500`)}>
                                  {r.value}
                                </span>
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                        <div style={sx(`padding:14px 18px`)}>
                          <div style={sx(`font-size:11px;color:var(--text2);font-weight:500;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px`)}>
                            {"Risk flags"}
                          </div>
                          <div style={sx(`display:flex;flex-direction:column;gap:9px`)}>
                            {(b.riskFlags || []).map((rf, rfI) => (
                              <React.Fragment key={rfI}>
                                <div style={sx(`display:flex;gap:10px;align-items:flex-start`)}>
                                  <span style={sx(`${rf.sevStyle}`)}>
                                    {rf.sev}
                                  </span>
                                  <div style={sx(`flex:1`)}>
                                    <span style={sx(`font-size:13px;font-weight:600`)}>
                                      {rf.t}
                                    </span>
                                    <span style={sx(`font-size:13px;color:var(--text2)`)}>
                                      {" — "}{rf.d}
                                    </span>
                                  </div>
                                </div>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        {/* AUDIT FOOTER */}
                        <div style={sx(`padding:9px 18px;display:flex;align-items:center;gap:8px;font:500 10.5px var(--mono);color:var(--text3);background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border)`)}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="M3 10h18" />
                          </svg>
                          <span>
                            {b.auditMeta}
                          </span>
                        </div>
                        {/* LIVE CONTROLS */}
                        {b.isLiveUw ? (
                          <>
                            <div style={sx(`padding:15px 18px;background:var(--surface2);border-top:1px solid var(--border)`)}>
                              <div style={sx(`display:flex;align-items:center;gap:10px;margin-bottom:13px`)}>
                                <span style={sx(`font-size:12px;color:var(--text2);font-weight:500`)}>
                                  {"Model the advance amount"}
                                </span>
                                <div style={sx(`display:flex;gap:6px;margin-left:auto`)}>
                                  {(b.scenarioButtons || []).map((s, sI) => (
                                    <React.Fragment key={sI}>
                                      <button onClick={s.onClick} style={sx(`${s.style}`)}>
                                        {s.label}
                                        {s.recommended ? (
                                          <>
                                            <span style={sx(`font-size:9px;opacity:.7`)}>
                                              {" ✦"}
                                            </span>
                                          </>
                                        ) : null}
                                      </button>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                              <div className="wrap-sm" style={sx(`display:flex;gap:9px`)}>
                                <button onClick={b.approve} style={sx(`flex:1;background:var(--ok);color:#fff;border:none;border-radius:9px;padding:11px;font-size:13.5px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px`)} data-hover="filter:brightness(1.07)">
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6 9 17l-5-5" />
                                  </svg>
                                  {"Approve "}{b.scenarioAmountFmt}
                                </button>
                                <button onClick={b.decline} style={sx(`background:var(--surface);color:var(--bad);border:1px solid var(--border2);border-radius:9px;padding:11px 18px;font-size:13.5px;font-weight:600;cursor:pointer`)} data-hover="background:var(--bad-bg);border-color:var(--bad)">
                                  {"Decline"}
                                </button>
                                <button onClick={b.escalate} style={sx(`background:var(--surface);color:var(--text2);border:1px solid var(--border2);border-radius:9px;padding:11px 18px;font-size:13.5px;font-weight:600;cursor:pointer`)} data-hover="background:var(--surface2);color:var(--text)">
                                  {"Escalate"}
                                </button>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : null}
                {/* DECISION */}
                {b.isDecision ? (
                  <>
                    <div style={sx(`align-self:stretch;background:var(--ok-bg);border:1px solid #bfe6cb;border-radius:13px;padding:16px 18px;animation:msgIn .35s ease both`)}>
                      <div style={sx(`display:flex;align-items:center;gap:10px;margin-bottom:8px`)}>
                        <div style={sx(`width:26px;height:26px;border-radius:50%;background:var(--ok);display:flex;align-items:center;justify-content:center;flex:none`)}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <span style={sx(`font-size:14px;font-weight:600;color:#14532d`)}>
                          {"Decision logged — Approved "}{b.amountFmt}{" at "}{b.factorFmt}{", "}{b.termFmt}
                        </span>
                      </div>
                      <div style={sx(`font-size:12.5px;color:#2f6b46;padding-left:36px;line-height:1.6`)}>
                        {"Full rationale and your adjustments recorded to the audit trail · synced to LendSaaS application · Marcus Vega notified via email + HubSpot. Confidence "}{b.confPct}{"."}
                      </div>
                    </div>
                  </>
                ) : null}
              </React.Fragment>
            ))}
            {/* THINKING */}
            {b.typing ? (
              <>
                <div style={sx(`display:flex;gap:14px;animation:msgIn .25s ease both`)}>
                  <div style={sx(`width:30px;height:30px;border-radius:8px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                    {"Uw"}
                  </div>
                  <div style={sx(`background:var(--surface);border:1px solid var(--border);padding:13px 16px;border-radius:12px;box-shadow:var(--shadow);display:flex;align-items:center;gap:10px`)}>
                    <div style={sx(`display:flex;gap:4px`)}>
                      <span style={sx(`width:6px;height:6px;border-radius:50%;background:var(--accent);animation:blink 1.3s infinite`)} />
                      <span style={sx(`width:6px;height:6px;border-radius:50%;background:var(--accent);animation:blink 1.3s .2s infinite`)} />
                      <span style={sx(`width:6px;height:6px;border-radius:50%;background:var(--accent);animation:blink 1.3s .4s infinite`)} />
                    </div>
                    <span style={sx(`font-size:12.5px;color:var(--text2)`)}>
                      {b.typingLabel}
                    </span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
        {/* composer */}
        <div className="composer-wrap" style={sx(`padding:14px 32px 22px;border-top:1px solid var(--border);background:var(--surface)`)}>
          <div style={sx(`max-width:760px;margin:0 auto`)}>
            <div style={sx(`display:flex;gap:7px;margin-bottom:10px;flex-wrap:wrap`)}>
              {(b.uwSuggestions || []).map((sug, sugI) => (
                <React.Fragment key={sugI}>
                  <button onClick={sug.onClick} style={sx(`border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:6px 12px;border-radius:999px;font-size:12px;font-weight:500;cursor:pointer`)} data-hover="border-color:var(--border2);color:var(--text);background:var(--surface2)">
                    {sug.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
            <div style={sx(`position:relative;border:1px solid var(--border2);border-radius:13px;background:var(--surface);box-shadow:var(--shadow);display:flex;align-items:center`)} data-focus-within="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg)">
              <input value={b.uwInput} onInput={b.setUwInput} onKeyDown={b.uwKey} placeholder="Message the Underwriting Agent…" style={sx(`flex:1;border:none;background:transparent;padding:14px 16px;font-size:14px;outline:none;color:var(--text)`)} />
              <button onClick={b.sendUw} style={sx(`margin-right:8px;background:var(--accent);color:#fff;border:none;width:34px;height:34px;border-radius:9px;cursor:pointer;display:flex;align-items:center;justify-content:center`)} data-hover="background:var(--accent2)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* context column */}
      <div className="uw-ctx" style={sx(`width:264px;flex:none;border-left:1px solid var(--border);background:var(--surface);overflow-y:auto;overflow-x:hidden;padding:26px 20px`)}>
        <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:11px`)}>
          {"Deal"}
        </div>
        <div style={sx(`display:flex;flex-direction:column;gap:11px;margin-bottom:24px`)}>
          <div style={sx(`display:flex;justify-content:space-between;font-size:12.5px`)}>
            <span style={sx(`color:var(--text2)`)}>
              {"Industry"}
            </span>
            <span style={sx(`font-weight:500;text-align:right`)}>
              {"Auto services"}
            </span>
          </div>
          <div style={sx(`display:flex;justify-content:space-between;font-size:12.5px`)}>
            <span style={sx(`color:var(--text2)`)}>
              {"Time in business"}
            </span>
            <span style={sx(`font-weight:500`)}>
              {"6.3 yrs"}
            </span>
          </div>
          <div style={sx(`display:flex;justify-content:space-between;font-size:12.5px`)}>
            <span style={sx(`color:var(--text2)`)}>
              {"Location"}
            </span>
            <span style={sx(`font-weight:500`)}>
              {"Phoenix, AZ"}
            </span>
          </div>
          <div style={sx(`display:flex;justify-content:space-between;font-size:12.5px`)}>
            <span style={sx(`color:var(--text2)`)}>
              {"Broker"}
            </span>
            <span style={sx(`font-weight:500;text-align:right`)}>
              {"Marcus Vega"}
            </span>
          </div>
          <div style={sx(`display:flex;justify-content:space-between;font-size:12.5px`)}>
            <span style={sx(`color:var(--text2)`)}>
              {"Target funder"}
            </span>
            <span style={sx(`font-weight:500`)}>
              {"Pinnacle Advance"}
            </span>
          </div>
        </div>
        <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:11px`)}>
          {"Documents"}
        </div>
        <div style={sx(`display:flex;flex-direction:column;gap:7px;margin-bottom:24px`)}>
          {(b.documents || []).map((doc, docI) => (
            <React.Fragment key={docI}>
              <div style={sx(`display:flex;align-items:center;gap:9px;padding:8px 10px;background:var(--surface2);border-radius:8px`)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text2)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3v5h5" />
                  <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                </svg>
                <span style={sx(`font-size:12px;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                  {doc.name}
                </span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:13px`)}>
          {"Decision timeline"}
        </div>
        <div style={sx(`display:flex;flex-direction:column`)}>
          {(b.timeline || []).map((t, tI) => (
            <React.Fragment key={tI}>
              <div style={sx(`display:flex;gap:11px`)}>
                <div style={sx(`display:flex;flex-direction:column;align-items:center;flex:none`)}>
                  <span style={sx(`${t.dotStyle}`)} />
                  <span style={sx(`width:1.5px;flex:1;background:var(--border)`)} />
                </div>
                <div style={sx(`padding-bottom:15px`)}>
                  <div style={sx(`font-size:12px;font-weight:500;line-height:1.4`)}>
                    {t.text}
                  </div>
                  <div style={sx(`font:500 10.5px var(--mono);color:var(--text3);margin-top:2px`)}>
                    {t.time}
                  </div>
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
