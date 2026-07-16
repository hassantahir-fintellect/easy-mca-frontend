import React from 'react';
import { sx } from '../../lib/sx';

export default function ScrubbingView({ b }) {
  return (
    <>
    <div style={sx(`flex:1;display:flex;min-height:0`)}>
      {/* thread */}
      <div style={sx(`flex:1;min-width:0;display:flex;flex-direction:column;background:var(--bg)`)}>
        <div className="deal-hdr" style={sx(`padding:18px 32px;border-bottom:1px solid var(--border);background:var(--surface);display:flex;align-items:center;gap:14px`)}>
          <div style={sx(`flex:1;min-width:0`)}>
            <div style={sx(`display:flex;align-items:center;gap:10px`)}>
              <h1 style={sx(`font-size:18px;font-weight:600;margin:0;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                {b.scrubDeal.name}
              </h1>
              <span style={sx(`font:500 12px var(--sans);background:var(--surface2);color:var(--text2);padding:2px 10px;border-radius:999px;white-space:nowrap`)}>
                {b.scrubDeal.amountFmt}
              </span>
            </div>
            <div style={sx(`font-size:12.5px;color:var(--text2);margin-top:3px`)}>
              {b.scrubDeal.meta}
            </div>
          </div>
          <div style={sx(`flex:none;display:flex;align-items:center;gap:14px`)}>
            <div style={sx(`display:flex;gap:2px;background:var(--surface2);border-radius:8px;padding:2px`)}>
              <button onClick={b.pickScrubClean} style={sx(`${b.svCleanStyle}`)}>
                {"Clean deal"}
              </button>
              <button onClick={b.pickScrubFlagged} style={sx(`${b.svFlaggedStyle}`)}>
                {"Edge cases"}
              </button>
            </div>
            <div style={sx(`display:flex;align-items:center;gap:8px`)}>
              <span style={sx(`font-size:12px;color:var(--text3);white-space:nowrap`)}>
                {"Going to"}
              </span>
              <span style={sx(`font:500 12px var(--sans);background:var(--accent-bg);color:var(--accent2);padding:2px 10px;border-radius:999px;white-space:nowrap`)}>
                {b.scrubDeal.funder}
              </span>
            </div>
          </div>
        </div>
        <div ref={b.scrubRef} className="thread-scroll" style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;padding:48px 32px 24px`)}>
          <div style={sx(`max-width:740px;margin:0 auto;display:flex;flex-direction:column;gap:34px`)}>
            {(b.scrubBlocks || []).map((b, bI) => (
              <React.Fragment key={bI}>
                {/* SUBMISSION HEALTH (Marcus) */}
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
                              {"Agent triage · before you waste a funder slot on this"}
                            </div>
                          </div>
                          <div style={sx(`flex:none;text-align:right`)}>
                            <div style={sx(`display:flex;align-items:baseline;gap:5px;justify-content:flex-end`)}>
                              <span style={sx(`font-size:28px;font-weight:600;line-height:1;letter-spacing:-.01em;color:${b.healthColor}`)}>
                                {b.healthPct}
                              </span>
                              <span style={sx(`font-size:11.5px;color:var(--text3)`)}>
                                {"fundability"}
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
                        <div style={sx(`border-top:1px solid var(--border);padding:16px 20px;background:#fafaf9`)}>
                          <div style={sx(`display:flex;align-items:center;gap:8px;margin-bottom:10px`)}>
                            <span style={sx(`font:600 10.5px var(--sans);text-transform:uppercase;letter-spacing:.07em;color:var(--text3)`)}>
                              {b.summaryHeading}
                            </span>
                            <button onClick={b.shareSummary} style={sx(`margin-left:auto;display:flex;align-items:center;gap:6px;border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:5px 11px;border-radius:999px;font:500 11.5px var(--sans);cursor:pointer`)} data-hover="color:var(--accent);border-color:#b9cdf5;background:var(--accent-bg)">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                <path d="m16 6-4-4-4 4" />
                                <path d="M12 2v13" />
                              </svg>
                              {b.summaryShareLabel}
                            </button>
                          </div>
                          {(b.summaryPoints || []).map((pt, ptI) => (
                            <React.Fragment key={ptI}>
                              <div style={sx(`display:flex;gap:9px;align-items:flex-start;margin-bottom:7px`)}>
                                <span style={sx(`width:5px;height:5px;border-radius:50%;background:var(--text3);flex:none;margin-top:7px`)} />
                                <span style={sx(`font-size:12.5px;color:var(--text2);line-height:1.55`)}>
                                  {pt}
                                </span>
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                        <div style={sx(`border-top:1px solid var(--border);padding:13px 20px;display:flex;align-items:center;gap:9px;flex-wrap:wrap;background:var(--surface)`)}>
                          <span style={sx(`flex:1`)} />
                          <span style={sx(`position:relative;display:inline-flex`)}>
                            <button onClick={b.toggleExport} style={sx(`display:flex;align-items:center;gap:7px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);padding:8px 13px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer`)} data-hover="background:var(--surface2);color:var(--text)">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                <path d="m16 6-4-4-4 4" />
                                <path d="M12 2v13" />
                              </svg>
                              {"Export scrubbed file"}
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </button>
                            {b.exportOpen ? (
                              <>
                                <div onClick={b.closeExport} style={sx(`position:fixed;inset:0;z-index:39`)} />
                                <div style={sx(`position:absolute;bottom:calc(100% + 7px);right:0;z-index:40;width:214px;background:var(--surface);border:1px solid var(--border);border-radius:11px;box-shadow:0 16px 44px rgba(16,15,13,.2);padding:5px`)}>
                                  <div style={sx(`font:600 9.5px var(--sans);text-transform:uppercase;letter-spacing:.06em;color:var(--text3);padding:6px 9px 4px`)}>
                                    {"Export scrubbed file to"}
                                  </div>
                                  {(b.exportOpts || []).map((x, xI) => (
                                    <React.Fragment key={xI}>
                                      <button onClick={x.onClick} style={sx(`width:100%;display:flex;align-items:center;gap:9px;border:none;background:transparent;border-radius:7px;padding:8px 9px;cursor:pointer;text-align:left;font-size:12.5px;font-weight:500;color:var(--text)`)} data-hover="background:var(--surface2)">
                                        <span style={sx(`width:20px;height:20px;border-radius:6px;flex:none;display:flex;align-items:center;justify-content:center;background:var(--surface2);color:var(--text2);font:600 8.5px var(--mono)`)}>
                                          {x.badge}
                                        </span>
                                        {x.name}
                                      </button>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </>
                            ) : null}
                          </span>
                          {b.uwActive ? (
                            <>
                              <button onClick={b.sendToUw} title={b.uwHint} style={sx(`display:flex;align-items:center;gap:7px;border:none;background:var(--accent);color:#fff;padding:8px 15px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer`)} data-hover="background:var(--accent2)">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                                {"Send to Underwriting agent"}
                              </button>
                            </>
                          ) : null}
                          {b.uwInactive ? (
                            <>
                              <button onClick={b.manualUw} title={b.uwHint} style={sx(`display:flex;align-items:center;gap:7px;border:1px solid var(--accent);background:var(--accent-bg);color:var(--accent);padding:8px 15px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer`)} data-hover="filter:brightness(.98)">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                  <circle cx="9" cy="7" r="4" />
                                  <path d="M19 8v6M22 11h-6" />
                                </svg>
                                {"Underwrite manually"}
                              </button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {b.isUser ? (
                  <>
                    <div style={sx(`align-self:flex-end;max-width:78%;background:var(--surface2);color:var(--text);padding:10px 14px;border-radius:12px;font-size:14px;line-height:1.55;animation:msgIn .3s ease both`)}>
                      {b.text}
                    </div>
                  </>
                ) : null}
                {b.isAgentText ? (
                  <>
                    <div style={sx(`display:flex;gap:14px;animation:msgIn .3s ease both`)}>
                      <div style={sx(`width:30px;height:30px;border-radius:8px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                        {b.mono}
                      </div>
                      <div style={sx(`flex:1;min-width:0;padding-top:3px`)}>
                        <div style={sx(`font-size:12.5px;font-weight:600;margin-bottom:5px`)}>
                          {b.agent}
                        </div>
                        <div style={sx(`font-size:14px;line-height:1.65;color:var(--text2)`)}>
                          {b.text}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {b.isDocParseM ? (
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
                          <span style={sx(`${b.parseChipStyle}`)}>
                            {b.parsePct}
                          </span>
                          {b.parseNeedsReview ? (
                            <>
                              <button onClick={b.openOcr} style={sx(`display:flex;align-items:center;gap:6px;border:1px solid #e2b577;background:var(--warn-bg);color:var(--warn);padding:5px 10px;border-radius:8px;font:600 11.5px var(--sans);cursor:pointer`)} data-hover="filter:brightness(.97)">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="11" cy="11" r="7" />
                                  <path d="m21 21-4.3-4.3" />
                                </svg>
                                {"Manual review"}
                              </button>
                            </>
                          ) : null}
                          <span style={sx(`font-size:11.5px;color:var(--text3);margin-left:auto`)}>
                            {"4 statements · Feb–May 2026"}
                          </span>
                        </div>
                        <div className="stat-3" style={sx(`display:grid;grid-template-columns:repeat(3,1fr)`)}>
                          {(b.parseFields || []).map((f, fI) => (
                            <React.Fragment key={fI}>
                              <div style={sx(`padding:15px 20px;border-right:1px solid var(--border);border-bottom:1px solid var(--border)`)}>
                                <div style={sx(`font-size:11px;color:var(--text3);margin-bottom:6px`)}>
                                  {f.k}
                                </div>
                                <div style={sx(`font-size:15.5px;font-weight:600;letter-spacing:-.01em;color:${f.vColor};display:flex;align-items:center`)}>
                                  {f.v}
                                  <span style={sx(`${f.confStyle}`)}>
                                    {f.conf}
                                  </span>
                                </div>
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {b.isInfoCollectM ? (
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
                          <span style={sx(`${b.openChipStyle};margin-left:auto`)}>
                            {b.openChipLabel}
                          </span>
                        </div>
                        {(b.items || []).map((it, itI) => (
                          <React.Fragment key={itI}>
                            <div className="field-row" style={sx(`display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border)`)}>
                              <span style={sx(`${it.markStyle}`)}>
                                {it.mark}
                              </span>
                              <span style={sx(`font-size:12.5px;font-weight:500;width:160px;flex:none`)}>
                                {it.label}
                              </span>
                              <span style={sx(`font-size:12.5px;color:var(--text2);flex:1`)}>
                                {it.d}
                              </span>
                            </div>
                          </React.Fragment>
                        ))}
                        <div style={sx(`${b.fbBar}`)}>
                          <span style={sx(`font-size:11.5px;color:var(--text3);flex:1;min-width:0`)}>
                            {"Intake validation · was this right?"}
                          </span>
                          <button onClick={b.fbUp} style={sx(`${b.fbUpStyle}`)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button onClick={b.fbDown} style={sx(`${b.fbDownStyle}`)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                          {b.fbNote ? (
                            <>
                              <span style={sx(`font-size:11.5px;font-weight:500;color:var(--text2)`)}>
                                {b.fbNote}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {/* STEP 1: APPLICATION VALIDATION */}
                {b.isAppCheck ? (
                  <>
                    <div style={sx(`display:flex;gap:14px;animation:msgIn .3s ease both`)}>
                      <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--surface2);color:var(--text2);display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                        {"Sc"}
                      </div>
                      <div style={sx(`flex:1;min-width:0;background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden`)}>
                        <div style={sx(`padding:15px 20px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)`)}>
                          <span style={sx(`font:600 10px var(--sans);color:var(--text2);background:var(--surface2);padding:3px 9px;border-radius:999px;letter-spacing:.08em`)}>
                            {"STEP 1"}
                          </span>
                          <span style={sx(`font-size:12.5px;font-weight:600`)}>
                            {"Application validation"}
                          </span>
                          <button onClick={b.openSrc} style={sx(`margin-left:auto;display:inline-flex;align-items:center;gap:5px;border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:4px 10px;border-radius:999px;font:500 11.5px var(--sans);cursor:pointer`)} data-hover="color:var(--accent);border-color:#b9cdf5;background:var(--accent-bg)">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 3v5h5" />
                              <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                            </svg>
                            {"Sources"}
                          </button>
                          <span style={sx(`${b.statusStyle}`)}>
                            {b.statusLabel}
                          </span>
                        </div>
                        {(b.fields || []).map((f, fI) => (
                          <React.Fragment key={fI}>
                            <div className="field-row" style={sx(`display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border)`)}>
                              <span style={sx(`${f.markStyle}`)}>
                                {f.mark}
                              </span>
                              <span style={sx(`font-size:12.5px;color:var(--text2);width:170px;flex:none`)}>
                                {f.k}
                              </span>
                              <span style={sx(`font-size:13px;font-weight:500;flex:1;color:${f.vColor}`)}>
                                {f.v}
                              </span>
                              <span style={sx(`font-size:11px;color:var(--text3);text-align:right`)}>
                                {f.rule}
                              </span>
                            </div>
                          </React.Fragment>
                        ))}
                        {b.hasFloorFail ? (
                          <>
                            <div style={sx(`padding:14px 20px;border-bottom:1px solid var(--border)`)}>
                              <div style={sx(`padding:12px 13px;background:var(--warn-bg);border:1px solid #f0e2c0;border-radius:10px`)}>
                                <div style={sx(`display:flex;align-items:center;gap:7px;margin-bottom:5px`)}>
                                  <span style={sx(`font:600 9.5px var(--sans);color:var(--warn);background:#fff;padding:1.5px 8px;border-radius:999px;text-transform:uppercase;letter-spacing:.05em`)}>
                                    {"Below revenue floor"}
                                  </span>
                                  <span style={sx(`font-size:11px;color:var(--warn);font-weight:600`)}>
                                    {"$142k vs $200k"}
                                  </span>
                                </div>
                                <div style={sx(`font-size:11.5px;color:var(--text2);line-height:1.5`)}>
                                  {"Trucking/construction needs &ge;$200k in the most recent month for A-paper. This merchant is short by $58k — re-target a funder whose floor it clears."}
                                </div>
                                <button onClick={b.retargetFunder} style={sx(`margin-top:8px;display:flex;align-items:center;gap:6px;border:1px solid #e6c17a;background:var(--surface);color:var(--warn);padding:6px 11px;border-radius:7px;font:600 11px var(--sans);cursor:pointer`)} data-hover="background:var(--warn-bg);border-color:var(--warn)">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 3v4h4" />
                                    <path d="M21 7a9 9 0 1 0 .5 6" />
                                  </svg>
                                  {"Re-target funder"}
                                </button>
                              </div>
                            </div>
                          </>
                        ) : null}
                        <div style={sx(`${b.fbBar}`)}>
                          <span style={sx(`font-size:11.5px;color:var(--text3);flex:1;min-width:0`)}>
                            {"Step 1 · was this right?"}
                          </span>
                          <button onClick={b.fbUp} style={sx(`${b.fbUpStyle}`)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button onClick={b.fbDown} style={sx(`${b.fbDownStyle}`)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                          {b.fbNote ? (
                            <>
                              <span style={sx(`font-size:11.5px;font-weight:500;color:var(--text2)`)}>
                                {b.fbNote}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {/* STEP 2: DEFAULT CHECK */}
                {b.isDefaultCheck ? (
                  <>
                    <div style={sx(`display:flex;gap:14px;animation:msgIn .3s ease both`)}>
                      <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--surface2);color:var(--text2);display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                        {"Sc"}
                      </div>
                      <div style={sx(`flex:1;min-width:0;background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden`)}>
                        <div style={sx(`padding:15px 20px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)`)}>
                          <span style={sx(`font:600 10px var(--sans);color:var(--text2);background:var(--surface2);padding:3px 9px;border-radius:999px;letter-spacing:.08em`)}>
                            {"STEP 2"}
                          </span>
                          <span style={sx(`font-size:12.5px;font-weight:600`)}>
                            {"Default & fraud check"}
                          </span>
                          <button onClick={b.openSrc} style={sx(`margin-left:auto;display:inline-flex;align-items:center;gap:5px;border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:4px 10px;border-radius:999px;font:500 11.5px var(--sans);cursor:pointer`)} data-hover="color:var(--accent);border-color:#b9cdf5;background:var(--accent-bg)">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 3v5h5" />
                              <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                            </svg>
                            {"Sources"}
                          </button>
                          <span style={sx(`${b.dcStatusStyle}`)}>
                            {b.dcStatusLabel}
                          </span>
                        </div>
                        <div className="stat-2" style={sx(`display:grid;grid-template-columns:1fr 1fr`)}>
                          <div style={sx(`padding:16px 20px;border-right:1px solid var(--border);border-bottom:1px solid var(--border)`)}>
                            <div style={sx(`display:flex;align-items:center;gap:8px;margin-bottom:12px`)}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 21h18" />
                                <path d="M5 21V7l7-4 7 4v14" />
                                <path d="M9 21v-7h6v7" />
                              </svg>
                              <span style={sx(`font-size:12.5px;font-weight:600`)}>
                                {"Courts"}
                              </span>
                              <span style={sx(`${b.courtChip};margin-left:auto`)}>
                                {b.courtChipLabel}
                              </span>
                            </div>
                            <div style={sx(`font-size:11.5px;color:var(--text2);line-height:1.7`)}>
                              <div style={sx(`display:flex;justify-content:space-between`)}>
                                <span>
                                  {"Business search"}
                                </span>
                                <span style={sx(`font-size:11.5px;font-weight:500;color:var(--text)`)}>
                                  {b.bizName}
                                </span>
                              </div>
                              <div style={sx(`display:flex;justify-content:space-between`)}>
                                <span>
                                  {"Owner search"}
                                </span>
                                <span style={sx(`font-size:11.5px;font-weight:500;color:var(--text)`)}>
                                  {b.ownerName}
                                </span>
                              </div>
                              <div style={sx(`display:flex;justify-content:space-between`)}>
                                <span>
                                  {"Window"}
                                </span>
                                <span style={sx(`font-size:11.5px;font-weight:500;color:var(--text)`)}>
                                  {"Last 7 yrs"}
                                </span>
                              </div>
                            </div>
                            {b.hasDefault ? (
                              <>
                                <div style={sx(`margin-top:12px;padding:12px 13px;background:var(--warn-bg);border:1px solid #f0e2c0;border-radius:10px`)}>
                                  <div style={sx(`display:flex;align-items:center;gap:7px;margin-bottom:5px`)}>
                                    <span style={sx(`font:600 9.5px var(--sans);color:var(--warn);background:#fff;padding:1.5px 8px;border-radius:999px;text-transform:uppercase;letter-spacing:.05em`)}>
                                      {"Prior default"}
                                    </span>
                                    <span style={sx(`font-size:11px;color:var(--warn);font-weight:600`)}>
                                      {"14 months ago"}
                                    </span>
                                  </div>
                                  <div style={sx(`font-size:11.5px;color:var(--text2);line-height:1.5`)}>
                                    {"Confessed judgment, Velocity Capital · $38k · satisfied Apr 2025."}
                                  </div>
                                  <button onClick={b.viewResolution} style={sx(`margin-top:8px;display:flex;align-items:center;gap:6px;border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:6px 11px;border-radius:999px;font:500 11.5px var(--sans);cursor:pointer`)} data-hover="color:var(--accent);border-color:#b9cdf5;background:var(--accent-bg)">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M14 3v5h5" />
                                      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                                    </svg>
                                    {"View resolution letter"}
                                  </button>
                                </div>
                              </>
                            ) : null}
                          </div>
                          <div style={sx(`padding:16px 20px;border-bottom:1px solid var(--border)`)}>
                            <div style={sx(`display:flex;align-items:center;gap:8px;margin-bottom:12px`)}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <path d="M3 10h18" />
                                <path d="M8 15h2" />
                              </svg>
                              <span style={sx(`font-size:12.5px;font-weight:600`)}>
                                {"DataMerch"}
                              </span>
                              <span style={sx(`${b.dmChip};margin-left:auto`)}>
                                {b.dmChipLabel}
                              </span>
                            </div>
                            <div style={sx(`font-size:11.5px;color:var(--text2);line-height:1.7`)}>
                              <div style={sx(`display:flex;justify-content:space-between`)}>
                                <span>
                                  {"EIN lookup"}
                                </span>
                                <span style={sx(`font-size:11.5px;font-weight:500;color:var(--text)`)}>
                                  {b.ein}
                                </span>
                              </div>
                              <div style={sx(`display:flex;justify-content:space-between`)}>
                                <span>
                                  {"Owner lookup"}
                                </span>
                                <span style={sx(`font-size:11.5px;font-weight:500;color:var(--text)`)}>
                                  {b.ownerName}
                                </span>
                              </div>
                              <div style={sx(`display:flex;justify-content:space-between`)}>
                                <span>
                                  {"Last checked"}
                                </span>
                                <span style={sx(`font-size:11.5px;font-weight:500;color:var(--text)`)}>
                                  {"9:42 AM today"}
                                </span>
                              </div>
                            </div>
                            {b.hasForged ? (
                              <>
                                <div style={sx(`margin-top:12px;padding:12px 13px;background:var(--bad-bg);border:1px solid #f3d3d0;border-radius:10px`)}>
                                  <div style={sx(`display:flex;align-items:center;gap:7px;margin-bottom:5px`)}>
                                    <span style={sx(`font:600 9.5px var(--sans);color:var(--bad);background:#fff;padding:1.5px 8px;border-radius:999px;text-transform:uppercase;letter-spacing:.05em`)}>
                                      {"Forged docs"}
                                    </span>
                                    <span style={sx(`font-size:11px;color:var(--bad);font-weight:600`)}>
                                      {"reported by 1 funder"}
                                    </span>
                                  </div>
                                  <div style={sx(`font-size:11.5px;color:var(--text2);line-height:1.5`)}>
                                    {"Altered bank statements submitted to Apex MCA, Jan 2026. Report on the merchant’s DataMerch profile."}
                                  </div>
                                  <button onClick={b.reviewForged} style={sx(`margin-top:8px;display:flex;align-items:center;gap:6px;border:1px solid #e6a8a8;background:var(--surface);color:var(--bad);padding:6px 10px;border-radius:7px;font:600 11px var(--sans);cursor:pointer`)} data-hover="background:var(--bad-bg);border-color:var(--bad)">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="11" cy="11" r="7" />
                                      <path d="m21 21-4.3-4.3" />
                                    </svg>
                                    {"Review flagged statements"}
                                  </button>
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                        <div style={sx(`${b.dcBanner}`)}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                            {b.dcBannerIcon}
                          </svg>
                          {b.dcBannerText}
                        </div>
                        <div style={sx(`${b.fbBar}`)}>
                          <span style={sx(`font-size:11.5px;color:var(--text3);flex:1;min-width:0`)}>
                            {"Step 2 · was this right?"}
                          </span>
                          <button onClick={b.fbUp} style={sx(`${b.fbUpStyle}`)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button onClick={b.fbDown} style={sx(`${b.fbDownStyle}`)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                          {b.fbNote ? (
                            <>
                              <span style={sx(`font-size:11.5px;font-weight:500;color:var(--text2)`)}>
                                {b.fbNote}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {/* STEP 3: TRUE DEPOSITS RECONCILIATION */}
                {b.isTrueDeposits ? (
                  <>
                    <div style={sx(`display:flex;gap:14px;animation:msgIn .3s ease both`)}>
                      <div style={sx(`width:30px;height:30px;border-radius:8px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                        {"Sc"}
                      </div>
                      <div style={sx(`flex:1;min-width:0;background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden`)}>
                        <div style={sx(`padding:17px 20px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:16px`)}>
                          <div style={sx(`flex:1`)}>
                            <div style={sx(`display:flex;align-items:center;gap:8px;margin-bottom:4px`)}>
                              <span style={sx(`font:600 10px var(--sans);color:var(--text2);background:var(--surface2);padding:3px 9px;border-radius:999px;letter-spacing:.08em`)}>
                                {"STEP 3"}
                              </span>
                              <span style={sx(`font-size:12.5px;font-weight:600`)}>
                                {"True deposit reconciliation"}
                              </span>
                            </div>
                            <div style={sx(`font-size:11.5px;color:var(--text3)`)}>
                              {b.tdSub}
                            </div>
                            <button onClick={b.openSrc} style={sx(`margin-top:9px;display:inline-flex;align-items:center;gap:5px;border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:4px 10px;border-radius:999px;font:500 11.5px var(--sans);cursor:pointer`)} data-hover="color:var(--accent);border-color:#b9cdf5;background:var(--accent-bg)">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 3v5h5" />
                                <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                              </svg>
                              {"Sources"}
                            </button>
                          </div>
                          <div style={sx(`text-align:right;flex:none`)}>
                            <div style={sx(`font-size:26px;font-weight:600;letter-spacing:-.02em;line-height:1`)}>
                              {b.tdTotal}
                            </div>
                            <div style={sx(`font-size:11px;color:var(--text3);margin-top:4px`)}>
                              {"true monthly revenue"}
                            </div>
                          </div>
                        </div>
                        {(b.lines || []).map((ln, lnI) => (
                          <React.Fragment key={lnI}>
                            <div onClick={ln.onClick} style={sx(`${ln.rowStyle}`)}>
                              <span style={sx(`width:20px;color:var(--text3);font:500 13px var(--mono);flex:none`)}>
                                {ln.sign}
                              </span>
                              <div style={sx(`flex:1;min-width:0`)}>
                                <div style={sx(`display:flex;align-items:center;gap:7px`)}>
                                  <span style={sx(`font-size:12.5px;color:${ln.labelColor};font-weight:${ln.labelWeight}`)}>
                                    {ln.label}
                                  </span>
                                  {ln.clickable ? (
                                    <>
                                      <span style={sx(`display:inline-flex;align-items:center;gap:3px;font:600 9.5px var(--sans);color:var(--accent2);background:var(--accent-bg);padding:1.5px 7px;border-radius:999px;letter-spacing:.04em`)}>
                                        {"SOURCE"}
                                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M7 17 17 7M9 7h8v8" />
                                        </svg>
                                      </span>
                                    </>
                                  ) : null}
                                </div>
                                {ln.note ? (
                                  <>
                                    <div style={sx(`font-size:11px;color:var(--text3);margin-top:1px`)}>
                                      {ln.note}
                                    </div>
                                  </>
                                ) : null}
                              </div>
                              <span style={sx(`font:600 13.5px var(--mono);color:${ln.amountColor};width:120px;text-align:right;flex:none`)}>
                                {ln.amount}
                              </span>
                            </div>
                          </React.Fragment>
                        ))}
                        <div style={sx(`padding:13px 20px;background:#fafaf9;font-size:12px;color:var(--text2);display:flex;align-items:center;gap:20px;flex-wrap:wrap;border-top:1px solid var(--border)`)}>
                          <span title="Number of qualifying deposits in the focus month — card settlements and customer ACH / checks. Personal transfers, P2P, refunds and factoring are excluded. SOP minimum is 3/mo." style={sx(`cursor:help`)}>
                            {"Deposit count "}
                            <strong style={sx(`font:600 12.5px var(--mono);color:var(--text)`)}>
                              {b.tdCount}
                            </strong>
                            {' '}
                            <span style={sx(`color:var(--text3);font-size:11px`)}>
                              {"ⓘ"}
                            </span>
                          </span>
                          <span title="Average of true monthly revenue (after Step 3 deductions) across the 3 most recent statements." style={sx(`cursor:help`)}>
                            {"3-mo avg "}
                            <strong style={sx(`font:600 12.5px var(--mono);color:var(--text)`)}>
                              {b.td3mo}
                            </strong>
                            {' '}
                            <span style={sx(`color:var(--text3);font-size:11px`)}>
                              {"ⓘ"}
                            </span>
                          </span>
                          <span title="Biggest single qualifying deposit in the focus month. A deposit above 30% of monthly revenue is flagged for concentration risk." style={sx(`cursor:help`)}>
                            {"Largest single deposit "}
                            <strong style={sx(`font:600 12.5px var(--mono);color:var(--text)`)}>
                              {b.tdLargest}
                            </strong>
                            {' '}
                            <span style={sx(`color:var(--text3);font-size:11px`)}>
                              {"ⓘ"}
                            </span>
                          </span>
                          <span title="Month-over-month change in true monthly revenue vs. the prior 2 months. Flags declining revenue trends." style={sx(`cursor:help`)}>
                            {"MoM trend "}
                            <strong style={sx(`font:600 12.5px var(--mono);color:${b.tdTrendColor}`)}>
                              {b.tdTrend}
                            </strong>
                            {' '}
                            <span style={sx(`color:var(--text3);font-size:11px`)}>
                              {"ⓘ"}
                            </span>
                          </span>
                        </div>
                        <div style={sx(`${b.fbBar}`)}>
                          <span style={sx(`font-size:11.5px;color:var(--text3);flex:1;min-width:0`)}>
                            {"Step 3 · open Sources for every figure & its origin · was this right?"}
                          </span>
                          <button onClick={b.fbUp} style={sx(`${b.fbUpStyle}`)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button onClick={b.fbDown} style={sx(`${b.fbDownStyle}`)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                          {b.fbNote ? (
                            <>
                              <span style={sx(`font-size:11.5px;font-weight:500;color:var(--text2)`)}>
                                {b.fbNote}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {/* STEP 4: RECURRING DEBITS / POSITIONS */}
                {b.isRecurringDebits ? (
                  <>
                    <div style={sx(`display:flex;gap:14px;animation:msgIn .3s ease both`)}>
                      <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--surface2);color:var(--text2);display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                        {"Sc"}
                      </div>
                      <div style={sx(`flex:1;min-width:0;background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden`)}>
                        <div style={sx(`padding:15px 20px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)`)}>
                          <span style={sx(`font:600 10px var(--sans);color:var(--text2);background:var(--surface2);padding:3px 9px;border-radius:999px;letter-spacing:.08em`)}>
                            {"STEP 4"}
                          </span>
                          <span style={sx(`font-size:12.5px;font-weight:600`)}>
                            {"Recurring debits & active positions"}
                          </span>
                          <button onClick={b.openSrc} style={sx(`margin-left:auto;display:inline-flex;align-items:center;gap:5px;border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:4px 10px;border-radius:999px;font:500 11.5px var(--sans);cursor:pointer`)} data-hover="color:var(--accent);border-color:#b9cdf5;background:var(--accent-bg)">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 3v5h5" />
                              <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                            </svg>
                            {"Sources"}
                          </button>
                          <span style={sx(`${b.posChipStyle}`)}>
                            {b.posChipLabel}
                          </span>
                        </div>
                        <div style={sx(`display:flex;padding:9px 20px;font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.07em;font-weight:600;border-bottom:1px solid var(--border);background:#fafaf9`)}>
                          <span style={sx(`flex:1`)}>
                            {"Funder"}
                          </span>
                          <span style={sx(`width:78px;text-align:right`)}>
                            {"Frequency"}
                          </span>
                          <span style={sx(`width:78px;text-align:right`)}>
                            {"Per debit"}
                          </span>
                          <span style={sx(`width:64px;text-align:right`)}>
                            {"6-mo hits"}
                          </span>
                          <span style={sx(`width:74px;text-align:right`)}>
                            {"From date"}
                          </span>
                        </div>
                        {(b.positions || []).map((p, pI) => (
                          <React.Fragment key={pI}>
                            <div style={sx(`display:flex;align-items:center;padding:12px 20px;border-bottom:1px solid var(--border)`)}>
                              <span style={sx(`flex:1;font-size:13px;font-weight:500`)}>
                                {p.funder}
                              </span>
                              <span style={sx(`width:78px;text-align:right;font:500 12px var(--mono);color:var(--text2)`)}>
                                {p.freq}
                              </span>
                              <span style={sx(`width:78px;text-align:right;font:500 12.5px var(--mono)`)}>
                                {p.amount}
                              </span>
                              <span style={sx(`width:64px;text-align:right;font:500 12.5px var(--mono);color:var(--text)`)}>
                                {p.hits}
                              </span>
                              <span style={sx(`width:74px;text-align:right;font:500 11.5px var(--mono);color:var(--text2)`)}>
                                {p.from}
                              </span>
                            </div>
                          </React.Fragment>
                        ))}
                        <div style={sx(`padding:13px 20px;background:#fafaf9;font-size:12px;color:var(--text2);display:flex;align-items:center;gap:20px;flex-wrap:wrap;border-top:1px solid var(--border)`)}>
                          <span title="Sum of all recurring daily loan / advance debits across the merchant's active positions." style={sx(`cursor:help`)}>
                            {"Combined daily debit "}
                            <strong style={sx(`font:600 12.5px var(--mono);color:var(--text)`)}>
                              {b.dailyDebit}
                            </strong>
                            {' '}
                            <span style={sx(`color:var(--text3);font-size:11px`)}>
                              {"ⓘ"}
                            </span>
                          </span>
                          <span title="Count of recurring debit transactions over the last 6 months — shows how established each active position is." style={sx(`cursor:help`)}>
                            {"Total debit hits / 6 mo "}
                            <strong style={sx(`font:600 12.5px var(--mono);color:var(--text)`)}>
                              {b.totalHits}
                            </strong>
                            {' '}
                            <span style={sx(`color:var(--text3);font-size:11px`)}>
                              {"ⓘ"}
                            </span>
                          </span>
                          <span title="Days the ledger balance went below zero. SOP allows up to 5/month." style={sx(`cursor:help;color:${b.negColor}`)}>
                            {"Negative days "}
                            <strong style={sx(`font:600 12.5px var(--mono)`)}>
                              {b.negDays}
                            </strong>
                            {' '}
                            <span style={sx(`color:var(--text3);font-size:11px`)}>
                              {"ⓘ"}
                            </span>
                          </span>
                          <span title="Share of daily deposits diverted to existing advances. Funders cap total withhold (often &le;30%) before adding a new position." style={sx(`cursor:help;color:${b.holdbackColor}`)}>
                            {"Withhold "}
                            <strong style={sx(`font:600 12.5px var(--mono)`)}>
                              {b.holdback}
                            </strong>
                            {' '}
                            <span style={sx(`color:var(--text3);font-size:11px`)}>
                              {"ⓘ"}
                            </span>
                          </span>
                        </div>
                        <div style={sx(`${b.fbBar}`)}>
                          <span style={sx(`font-size:11.5px;color:var(--text3);flex:1;min-width:0`)}>
                            {"Step 4 · open Sources for every figure & its origin · was this right?"}
                          </span>
                          <button onClick={b.fbUp} style={sx(`${b.fbUpStyle}`)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button onClick={b.fbDown} style={sx(`${b.fbDownStyle}`)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                          {b.fbNote ? (
                            <>
                              <span style={sx(`font-size:11.5px;font-weight:500;color:var(--text2)`)}>
                                {b.fbNote}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {/* DECLINE RULES (cross-cutting SOP gates) */}
                {b.isDeclineRules ? (
                  <>
                    <div style={sx(`display:flex;gap:14px;animation:msgIn .3s ease both`)}>
                      <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--surface2);color:var(--text2);display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                        {"Sc"}
                      </div>
                      <div style={sx(`flex:1;min-width:0;background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden`)}>
                        <div style={sx(`padding:15px 20px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)`)}>
                          <span style={sx(`font-size:12.5px;font-weight:600`)}>
                            {"SOP decline-rule gates"}
                          </span>
                          <span style={sx(`font-size:11.5px;color:var(--text3)`)}>
                            {"9 hard rules · any failure auto-declines"}
                          </span>
                          <span style={sx(`${b.drStatusStyle};margin-left:auto`)}>
                            {b.drStatusLabel}
                          </span>
                        </div>
                        <div className="stat-2" style={sx(`display:grid;grid-template-columns:1fr 1fr`)}>
                          {(b.rules || []).map((r, rI) => (
                            <React.Fragment key={rI}>
                              <div style={sx(`${r.rowStyle}`)}>
                                <span style={sx(`${r.markStyle}`)}>
                                  {r.mark}
                                </span>
                                <span style={sx(`font-size:12.5px;flex:1;color:var(--text)`)}>
                                  {r.c}
                                </span>
                                <span style={sx(`font:500 11.5px var(--mono);color:${r.valColor}`)}>
                                  {r.n}
                                </span>
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                        <div style={sx(`${b.drBanner}`)}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                            {b.drBannerIcon}
                          </svg>
                          {b.drBannerText}
                        </div>
                        <div style={sx(`${b.fbBar}`)}>
                          <span style={sx(`font-size:11.5px;color:var(--text3);flex:1;min-width:0`)}>
                            {"Decline gates · was this right?"}
                          </span>
                          <button onClick={b.fbUp} style={sx(`${b.fbUpStyle}`)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button onClick={b.fbDown} style={sx(`${b.fbDownStyle}`)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                          {b.fbNote ? (
                            <>
                              <span style={sx(`font-size:11.5px;font-weight:500;color:var(--text2)`)}>
                                {b.fbNote}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {b.isScrubcardM ? (
                  <>
                    <div style={sx(`display:flex;gap:14px;animation:msgIn .35s ease both`)}>
                      <div style={sx(`width:30px;height:30px;border-radius:8px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                        {"Sc"}
                      </div>
                      <div style={sx(`flex:1;min-width:0;background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden`)}>
                        <div style={sx(`padding:14px 18px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--border)`)}>
                          <div style={sx(`flex:1`)}>
                            <div style={sx(`font-size:11px;color:var(--text2);font-weight:500;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px`)}>
                              {"Scrubcard · Forward Line"}
                            </div>
                            <div style={sx(`font-family:var(--serif);font-size:22px;font-weight:600;letter-spacing:-.01em`)}>
                              {"Ready to submit — with one fix"}
                            </div>
                          </div>
                          <div style={sx(`text-align:right`)}>
                            <div style={sx(`font-size:11px;color:var(--text2);margin-bottom:4px`)}>
                              {"Overall"}
                            </div>
                            <div style={sx(`display:flex;align-items:baseline;gap:3px`)}>
                              <span style={sx(`font-family:var(--serif);font-size:26px;font-weight:600;color:var(--ok)`)}>
                                {"88"}
                              </span>
                              <span style={sx(`font-size:12px;color:var(--text3)`)}>
                                {"/100"}
                              </span>
                            </div>
                          </div>
                        </div>
                        {(b.criteria || []).map((c, cI) => (
                          <React.Fragment key={cI}>
                            <div style={sx(`display:flex;align-items:center;gap:10px;padding:9px 18px;border-bottom:1px solid var(--border)`)}>
                              <span style={sx(`${c.markStyle}`)}>
                                {c.mark}
                              </span>
                              <span style={sx(`font-size:13px;flex:1`)}>
                                {c.c}
                              </span>
                              <span style={sx(`font:500 12px var(--mono);color:var(--text2)`)}>
                                {c.n}
                              </span>
                            </div>
                          </React.Fragment>
                        ))}
                        <div style={sx(`padding:13px 18px;background:var(--warn-bg);border-bottom:1px solid var(--border);display:flex;gap:10px;align-items:flex-start`)}>
                          <span style={sx(`font:600 9.5px var(--sans);color:var(--warn);background:#fff;padding:2px 8px;border-radius:999px;flex:none;margin-top:1px;text-transform:uppercase;letter-spacing:.05em`)}>
                            {"Fix"}
                          </span>
                          <div>
                            <span style={sx(`font-size:13px;font-weight:600`)}>
                              {"Most-recent month statement"}
                            </span>
                            <span style={sx(`font-size:13px;color:var(--text2)`)}>
                              {" — Forward Line wants the latest month. June 2026 isn’t in yet. I can ping the merchant on WhatsApp and have it back in under an hour."}
                            </span>
                          </div>
                        </div>
                        <div style={sx(`padding:9px 18px;display:flex;align-items:center;gap:8px;font:500 10.5px var(--mono);color:var(--text3)`)}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="M3 10h18" />
                          </svg>
                          <span>
                            {"Funder criteria v2.4 · scrubcard will write to HubSpot deal HS-9417 with your override status"}
                          </span>
                        </div>
                        {b.isLiveCard ? (
                          <>
                            <div className="wrap-sm" style={sx(`padding:15px 18px;background:var(--surface2);border-top:1px solid var(--border);display:flex;gap:9px`)}>
                              <button onClick={b.requestDocs} style={sx(`flex:1;background:var(--accent);color:#fff;border:none;border-radius:9px;padding:11px;font-size:13.5px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px`)} data-hover="background:var(--accent2)">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6.1A8.5 8.5 0 1 1 21 11.5Z" />
                                </svg>
                                {"Request June stmt via WhatsApp"}
                              </button>
                              <button onClick={b.overrideFlag} style={sx(`background:var(--surface);color:var(--text2);border:1px solid var(--border2);border-radius:9px;padding:11px 16px;font-size:13.5px;font-weight:600;cursor:pointer`)} data-hover="background:var(--surface2);color:var(--text)">
                                {"Override"}
                              </button>
                              <button onClick={b.markScrubbed} style={sx(`background:var(--surface);color:var(--ok);border:1px solid var(--border2);border-radius:9px;padding:11px 16px;font-size:13.5px;font-weight:600;cursor:pointer`)} data-hover="background:var(--ok-bg);border-color:var(--ok)">
                                {"Mark scrubbed"}
                              </button>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : null}
                {b.isScrubDecision ? (
                  <>
                    <div style={sx(`align-self:stretch;background:var(--ok-bg);border:1px solid #bfe6cb;border-radius:13px;padding:16px 18px;animation:msgIn .35s ease both`)}>
                      <div style={sx(`display:flex;align-items:center;gap:10px;margin-bottom:8px`)}>
                        <div style={sx(`width:26px;height:26px;border-radius:50%;background:var(--ok);display:flex;align-items:center;justify-content:center;flex:none`)}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <span style={sx(`font-size:14px;font-weight:600;color:#14532d`)}>
                          {"Scrubbed against "}{b.funder}{" \\u00b7 "}{b.score}{"/100 \\u00b7 written to HubSpot "}{b.ref}
                        </span>
                      </div>
                      <div style={sx(`font-size:12.5px;color:#2f6b46;padding-left:36px;line-height:1.6`)}>
                        {"Scrubcard + your override is on the HubSpot deal. Ready to send to Forward Line whenever you are."}
                      </div>
                    </div>
                  </>
                ) : null}
              </React.Fragment>
            ))}
            {b.scrubTyping ? (
              <>
                <div style={sx(`display:flex;gap:14px;animation:msgIn .25s ease both`)}>
                  <div style={sx(`width:30px;height:30px;border-radius:8px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);flex:none`)}>
                    {"Sc"}
                  </div>
                  <div style={sx(`background:var(--surface);border:1px solid var(--border);padding:13px 16px;border-radius:12px;box-shadow:var(--shadow);display:flex;align-items:center;gap:10px`)}>
                    <div style={sx(`display:flex;gap:4px`)}>
                      <span style={sx(`width:6px;height:6px;border-radius:50%;background:var(--accent);animation:blink 1.3s infinite`)} />
                      <span style={sx(`width:6px;height:6px;border-radius:50%;background:var(--accent);animation:blink 1.3s .2s infinite`)} />
                      <span style={sx(`width:6px;height:6px;border-radius:50%;background:var(--accent);animation:blink 1.3s .4s infinite`)} />
                    </div>
                    <span style={sx(`font-size:12.5px;color:var(--text2)`)}>
                      {b.scrubTypingLabel}
                    </span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div className="composer-wrap" style={sx(`padding:14px 32px 22px;border-top:1px solid var(--border);background:var(--surface)`)}>
          <div style={sx(`max-width:760px;margin:0 auto`)}>
            <div style={sx(`display:flex;gap:7px;margin-bottom:10px;flex-wrap:wrap`)}>
              {(b.scrubSuggestions || []).map((sug, sugI) => (
                <React.Fragment key={sugI}>
                  <button onClick={sug.onClick} style={sx(`border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:6px 12px;border-radius:999px;font-size:12px;font-weight:500;cursor:pointer`)} data-hover="border-color:var(--border2);color:var(--text);background:var(--surface2)">
                    {sug.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
            <div style={sx(`border:1px solid var(--border2);border-radius:13px;background:var(--surface);box-shadow:var(--shadow)`)} data-focus-within="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg)">
              <input value={b.scrubInput} onInput={b.setScrubInput} onKeyDown={b.scrubKey} placeholder="Message the Scrubbing Agent…" style={sx(`width:100%;border:none;background:transparent;padding:14px 16px 6px;font-size:14px;outline:none;color:var(--text)`)} />
              <input type="file" multiple ref={b.scrubFileRef} onChange={b.onScrubFiles} style={sx(`display:none`)} />
              <div style={sx(`display:flex;align-items:center;gap:8px;padding:6px 10px 10px 14px`)}>
                <button onClick={b.attachScrub} style={sx(`display:flex;align-items:center;gap:7px;border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:6px 12px;border-radius:999px;font-size:12.5px;font-weight:500;cursor:pointer`)} data-hover="background:var(--surface2);color:var(--text)">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.4 11.1-9.2 9.2a5 5 0 0 1-7.1-7.1l9.2-9.2a3.3 3.3 0 0 1 4.7 4.7l-9.2 9.2a1.7 1.7 0 0 1-2.4-2.4l8.5-8.5" />
                  </svg>
                  {"Attach"}
                </button>
                <button onClick={b.sendScrub} title="Send" style={sx(`margin-left:auto;background:var(--accent);color:#fff;border:none;width:34px;height:34px;border-radius:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--accent2)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
            {b.hasScrubFiles ? (
              <>
                <div style={sx(`display:flex;gap:8px;flex-wrap:wrap;margin-top:10px`)}>
                  {(b.scrubFiles || []).map((f, fI) => (
                    <React.Fragment key={fI}>
                      <div style={sx(`display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border2);border-radius:8px;padding:6px 8px 6px 10px;box-shadow:var(--shadow)`)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text2)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 3v5h5" />
                          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                        </svg>
                        <span style={sx(`font-size:12.5px;font-weight:500;max-width:170px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                          {f.name}
                        </span>
                        <button onClick={f.remove} style={sx(`border:none;background:transparent;color:var(--text3);cursor:pointer;display:flex;padding:0`)} data-hover="color:var(--bad)">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </>
            ) : null}
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
              {"Food & Bev"}
            </span>
          </div>
          <div style={sx(`display:flex;justify-content:space-between;font-size:12.5px`)}>
            <span style={sx(`color:var(--text2)`)}>
              {"Time in business"}
            </span>
            <span style={sx(`font-weight:500`)}>
              {"3.8 yrs"}
            </span>
          </div>
          <div style={sx(`display:flex;justify-content:space-between;font-size:12.5px`)}>
            <span style={sx(`color:var(--text2)`)}>
              {"Location"}
            </span>
            <span style={sx(`font-weight:500`)}>
              {"Austin, TX"}
            </span>
          </div>
          <div style={sx(`display:flex;justify-content:space-between;font-size:12.5px`)}>
            <span style={sx(`color:var(--text2)`)}>
              {"Channel"}
            </span>
            <span style={sx(`font-weight:500`)}>
              {"WhatsApp intake"}
            </span>
          </div>
          <div style={sx(`display:flex;justify-content:space-between;font-size:12.5px`)}>
            <span style={sx(`color:var(--text2)`)}>
              {"HubSpot deal"}
            </span>
            <span style={sx(`font:500 12px var(--mono)`)}>
              {"HS-9417"}
            </span>
          </div>
        </div>
        <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:11px`)}>
          {"Documents"}
        </div>
        <div style={sx(`display:flex;flex-direction:column;gap:7px;margin-bottom:24px`)}>
          {(b.scrubDocs || []).map((doc, docI) => (
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
          <div style={sx(`display:flex;align-items:center;gap:9px;padding:8px 10px;background:var(--warn-bg);border-radius:8px;border:1px dashed var(--warn)`)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--warn)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 9v4m0 4h.01" />
              <circle cx="12" cy="12" r="9" />
            </svg>
            <span style={sx(`font-size:12px;flex:1;color:var(--warn);font-weight:500`)}>
              {"BankStmt_Jun2026 — missing"}
            </span>
          </div>
        </div>
        <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:13px`)}>
          {"Timeline"}
        </div>
        <div style={sx(`display:flex;flex-direction:column`)}>
          {(b.scrubTimeline || []).map((t, tI) => (
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
