import React from 'react';
import { sx } from '../../lib/sx';

export default function IntakeView({ b }) {
  return (
    <>
    <div style={sx(`flex:1;display:flex;min-height:0`)}>
      {/* WhatsApp transcript */}
      <div className="intake-pane" style={sx(`width:360px;flex:none;border-right:1px solid var(--border);background:var(--surface);display:flex;flex-direction:column;min-height:0`)}>
        <div style={sx(`padding:15px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px`)}>
          <div style={sx(`width:32px;height:32px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;flex:none`)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
              <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.4-3.9-4.5-4.1-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2 .2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.3 0 .5l-.4.5c-.1.2-.3.3-.1.6.1.3.7 1.1 1.4 1.8.9.8 1.7 1 2 1.2.2.1.4.1.5-.1l.6-.8c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.3.1.7-.1 1.2Z" />
            </svg>
          </div>
          <div style={sx(`line-height:1.2;flex:1`)}>
            <div style={sx(`font-size:13.5px;font-weight:600`)}>
              {"Pat · Cinnamon Trail"}
            </div>
            <div style={sx(`font-size:11px;color:#25a052;font-weight:500`)}>
              {"WhatsApp Business · monitored"}
            </div>
          </div>
          <span style={sx(`font:500 9.5px var(--mono);background:var(--surface2);color:var(--text2);padding:3px 7px;border-radius:5px`)}>
            {"Ci"}
          </span>
        </div>
        <div style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;padding:18px 16px;display:flex;flex-direction:column;gap:10px;background:#f3efe7`)}>
          {(b.whatsappMsgs || []).map((m, mI) => (
            <React.Fragment key={mI}>
              <div style={sx(`${m.bubbleStyle}`)}>
                {m.doc ? (
                  <>
                    <div style={sx(`display:flex;align-items:center;gap:8px;margin-bottom:5px;padding-bottom:6px;border-bottom:1px solid rgba(0,0,0,.08)`)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <path d="M14 3v5h5" />
                        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                      </svg>
                      <span style={sx(`font-size:11px;font-weight:600;opacity:.7`)}>
                        {"Attachment"}
                      </span>
                    </div>
                  </>
                ) : null}
                <div style={sx(`font-size:13px;line-height:1.45`)}>
                  {m.text}
                </div>
                <div style={sx(`display:flex;align-items:center;gap:5px;justify-content:flex-end;margin-top:3px`)}>
                  {m.auto ? (
                    <>
                      <span style={sx(`font:500 9px var(--mono);background:rgba(79,70,229,.12);color:var(--accent);padding:1px 5px;border-radius:4px`)}>
                        {"auto"}
                      </span>
                    </>
                  ) : null}
                  <span style={sx(`font-size:10px;opacity:.5`)}>
                    {m.time}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* pipeline */}
      <div style={sx(`flex:1;min-width:0;overflow-y:auto;overflow-x:hidden;background:var(--surface)`)}>
        <div className="view-wrap" style={sx(`max-width:680px;margin:0 auto;padding:48px 36px 72px`)}>
          <div style={sx(`font:600 11px var(--sans);color:var(--text3);text-transform:uppercase;letter-spacing:.07em;margin-bottom:9px`)}>
            {"Conversation Intake → Funder routing"}
          </div>
          <h1 style={sx(`font-size:22px;font-weight:600;margin:0 0 6px;letter-spacing:-.01em`)}>
            {"WhatsApp deal, fully handled."}
          </h1>
          <p style={sx(`font-size:14px;color:var(--text2);margin:0 0 22px;max-width:560px`)}>
            {"Your agents picked up Pat's documents straight from WhatsApp Business, parsed and scrubbed them, underwrote a first pass, and routed the package to recognized funders — all without you touching it."}
          </p>
          <div style={sx(`display:flex;align-items:center;gap:12px;margin-bottom:26px`)}>
            <button onClick={b.startIntake} style={sx(`background:var(--accent);color:#fff;border:none;border-radius:10px;padding:11px 18px;font-size:13.5px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px`)} data-hover="background:var(--accent2)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              {b.intakeBtnLabel}
            </button>
            <span style={sx(`font:500 11.5px var(--mono);color:var(--text3)`)}>
              {"Pipeline · "}{b.intakeProgress}
            </span>
          </div>
          <div style={sx(`display:flex;flex-direction:column`)}>
            {(b.intakeStages || []).map((st, stI) => (
              <React.Fragment key={stI}>
                <div style={sx(`display:flex;gap:14px`)}>
                  <div style={sx(`display:flex;flex-direction:column;align-items:center;flex:none`)}>
                    <div style={sx(`${st.nodeStyle}`)}>
                      {st.isDone ? (
                        <>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </>
                      ) : null}
                      {st.showMono ? (
                        <>
                          {st.mono}
                        </>
                      ) : null}
                    </div>
                    {st.notLast ? (
                      <>
                        <div style={sx(`${st.lineStyle}`)} />
                      </>
                    ) : null}
                  </div>
                  <div style={sx(`${st.cardStyle};margin-bottom:10px`)}>
                    <div style={sx(`display:flex;align-items:center;gap:9px;margin-bottom:4px`)}>
                      <span style={sx(`font-size:11px;color:var(--text2);font-weight:500`)}>
                        {st.agent}
                      </span>
                      <span style={sx(`${st.resultStyle};margin-left:auto`)}>
                        {st.result}
                      </span>
                    </div>
                    <div style={sx(`font-size:14px;font-weight:600;margin-bottom:3px;letter-spacing:-.005em`)}>
                      {st.title}
                    </div>
                    <div style={sx(`font-size:12.5px;color:var(--text2);line-height:1.5`)}>
                      {st.detail}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          {b.intakeDone ? (
            <>
              <div style={sx(`margin-top:6px;background:var(--ok-bg);border:1px solid #bfe6cb;border-radius:13px;padding:16px 18px;animation:msgIn .35s ease both`)}>
                <div style={sx(`display:flex;align-items:center;gap:10px;margin-bottom:7px`)}>
                  <div style={sx(`width:26px;height:26px;border-radius:50%;background:var(--ok);display:flex;align-items:center;justify-content:center;flex:none`)}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span style={sx(`font-size:14px;font-weight:600;color:#14532d`)}>
                    {"Underwritten package sent to 3 recognized funders on WhatsApp"}
                  </span>
                </div>
                <div style={sx(`font-size:12.5px;color:#2f6b46;padding-left:36px;line-height:1.6`)}>
                  {"Pinnacle Advance, Forward Line & Bedrock each received the parsed file, scrubcard, and first-pass underwrite. You'll see their Fund / Deny decisions land back here. Total hands-on time: 0 minutes."}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
    </>
  );
}
