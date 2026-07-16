import React from 'react';
import { sx } from '../../lib/sx';

export default function ChatActiveView({ b }) {
  return (
    <>
    <div ref={b.chatRef} className="thread-scroll" style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;padding:40px 24px 16px`)}>
      <div style={sx(`max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:30px`)}>
        {(b.chatBlocks || []).map((b, bI) => (
          <React.Fragment key={bI}>
            {b.isUser ? (
              <>
                <div style={sx(`align-self:flex-end;max-width:80%;display:flex;flex-direction:column;align-items:flex-end;gap:6px;animation:msgIn .3s ease both`)}>
                  {b.hasFiles ? (
                    <>
                      <div style={sx(`display:flex;flex-direction:column;gap:6px;align-items:flex-end`)}>
                        {(b.files || []).map((f, fI) => (
                          <React.Fragment key={fI}>
                            <div style={sx(`display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border2);border-radius:8px;padding:7px 11px`)}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text2)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 3v5h5" />
                                <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                              </svg>
                              <span style={sx(`font-size:12.5px;font-weight:500;color:var(--text)`)}>
                                {f.name}
                              </span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </>
                  ) : null}
                  <div style={sx(`background:var(--surface2);color:var(--text);padding:11px 15px;border-radius:14px;font-size:14.5px;line-height:1.55`)}>
                    {b.text}
                  </div>
                </div>
              </>
            ) : null}
            {b.isAgentText ? (
              <>
                <div style={sx(`display:flex;gap:13px;animation:msgIn .3s ease both`)}>
                  <div style={sx(`width:28px;height:28px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#8fb3f6 0%,#3f78ec 44%,#245ad4 82%);flex:none;box-shadow:inset -2px -3px 6px rgba(20,50,120,.5),inset 2px 2px 5px rgba(255,255,255,.5)`)} />
                  <div style={sx(`flex:1;min-width:0;padding-top:2px`)}>
                    <div style={sx(`font-size:12.5px;font-weight:600;color:var(--text);margin-bottom:6px`)}>
                      {b.agent}
                    </div>
                    <div style={sx(`font-size:14.5px;line-height:1.7;color:var(--text)`)}>
                      {b.text}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {b.isDataTable ? (
              <>
                <div style={sx(`display:flex;gap:13px;animation:msgIn .35s ease both`)}>
                  <div style={sx(`width:28px;height:28px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#8fb3f6 0%,#3f78ec 44%,#245ad4 82%);flex:none;box-shadow:inset -2px -3px 6px rgba(20,50,120,.5),inset 2px 2px 5px rgba(255,255,255,.5)`)} />
                  <div style={sx(`flex:1;min-width:0;padding-top:2px`)}>
                    <div style={sx(`font-size:12.5px;font-weight:600;color:var(--text);margin-bottom:8px`)}>
                      {"Data Intelligence Agent"}
                    </div>
                    <div style={sx(`background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden`)}>
                      <div style={sx(`padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:baseline;justify-content:space-between`)}>
                        <span style={sx(`font-size:13px;font-weight:600;color:var(--text)`)}>
                          {"Funded volume — May 2026"}
                        </span>
                        <span style={sx(`font-size:17px;font-weight:600;letter-spacing:-.01em;color:var(--text)`)}>
                          {"$6.57M"}
                        </span>
                      </div>
                      <div style={sx(`display:flex;padding:9px 20px;font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.07em;font-weight:600;border-bottom:1px solid var(--border);background:#fafaf9`)}>
                        <span style={sx(`flex:1`)}>
                          {"Funder"}
                        </span>
                        <span style={sx(`width:90px;text-align:right`)}>
                          {"Volume"}
                        </span>
                        <span style={sx(`width:70px;text-align:right`)}>
                          {"MoM"}
                        </span>
                      </div>
                      {(b.volumeRows || []).map((v, vI) => (
                        <React.Fragment key={vI}>
                          <div style={sx(`display:flex;align-items:center;padding:12px 20px;border-bottom:1px solid var(--border)`)}>
                            <span style={sx(`flex:1;font-size:13px;font-weight:500;color:var(--text)`)}>
                              {v.funder}
                            </span>
                            <span style={sx(`width:90px;text-align:right;font:500 12.5px var(--mono);color:var(--text)`)}>
                              {v.vol}
                            </span>
                            <span style={sx(`width:70px;text-align:right;font:500 12px var(--mono);color:${v.momColor}`)}>
                              {v.mom}
                            </span>
                          </div>
                        </React.Fragment>
                      ))}
                      <div style={sx(`padding:13px 16px;font-size:13.5px;line-height:1.65;color:var(--text2)`)}>
                        {"Pinnacle led at "}
                        <span style={sx(`color:var(--text);font-weight:500`)}>
                          {"$2.41M (+12%)"}
                        </span>
                        {". Bedrock grew fastest at +21% off a smaller base. Capital Stack slipped 7% — driven by two declined renewals."}
                      </div>
                      <div style={sx(`padding:0 16px 14px;display:flex;gap:8px`)}>
                        <button style={sx(`border:1px solid var(--border2);background:var(--surface);padding:6px 12px;border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;color:var(--text2)`)} data-hover="background:var(--surface2);color:var(--text)">
                          {"Export CSV"}
                        </button>
                        <button style={sx(`border:1px solid var(--border2);background:var(--surface);padding:6px 12px;border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;color:var(--text2)`)} data-hover="background:var(--surface2);color:var(--text)">
                          {"Push to HubSpot"}
                        </button>
                        <button style={sx(`border:1px solid var(--border2);background:var(--surface);padding:6px 12px;border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;color:var(--text2)`)} data-hover="background:var(--surface2);color:var(--text)">
                          {"Email me"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </React.Fragment>
        ))}
        {b.chatTyping ? (
          <>
            <div style={sx(`display:flex;gap:13px;animation:msgIn .25s ease both`)}>
              <div style={sx(`width:28px;height:28px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#8fb3f6 0%,#3f78ec 44%,#245ad4 82%);flex:none;animation:orbFloat 3s ease-in-out infinite;box-shadow:inset -2px -3px 6px rgba(20,50,120,.5),inset 2px 2px 5px rgba(255,255,255,.5)`)} />
              <div style={sx(`display:flex;align-items:center;gap:10px;padding-top:6px`)}>
                <div style={sx(`display:flex;gap:4px`)}>
                  <span style={sx(`width:5px;height:5px;border-radius:50%;background:var(--text3);animation:blink 1.3s infinite`)} />
                  <span style={sx(`width:5px;height:5px;border-radius:50%;background:var(--text3);animation:blink 1.3s .2s infinite`)} />
                  <span style={sx(`width:5px;height:5px;border-radius:50%;background:var(--text3);animation:blink 1.3s .4s infinite`)} />
                </div>
                <span style={sx(`font-size:12.5px;color:var(--text3)`)}>
                  {b.chatTypingLabel}
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
    <div className="composer-wrap" style={sx(`padding:14px 24px 22px;background:var(--surface)`)}>
      {b.hasChatFiles ? (
        <>
          <div style={sx(`max-width:720px;margin:0 auto 10px;display:flex;gap:8px;flex-wrap:wrap`)}>
            {(b.chatFiles || []).map((f, fI) => (
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
      <div style={sx(`max-width:720px;margin:0 auto;border:1px solid var(--border2);border-radius:14px;background:var(--surface);box-shadow:0 1px 2px rgba(16,15,13,.04),0 6px 18px rgba(16,15,13,.04);transition:border-color .15s,box-shadow .15s`)} data-focus-within="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg),0 6px 18px rgba(16,15,13,.04)">
        <div style={sx(`display:flex;align-items:flex-start;gap:10px;padding:14px 16px 2px`)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none;margin-top:2px`)}>
            <path d="M5 3v4M3 5h4M6 17v4M4 19h4" />
            <path d="M13 3l2.4 6.6L22 12l-6.6 2.4L13 21l-2.4-6.6L4 12l6.6-2.4L13 3Z" />
          </svg>
          <input value={b.chatInput} onInput={b.setChatInput} onKeyDown={b.chatKey} placeholder="Reply to your agents…" style={sx(`flex:1;border:none;background:transparent;padding:0;font-size:14.5px;outline:none;color:var(--text)`)} />
        </div>
        <input type="file" multiple ref={b.chatFileRef} onChange={b.onChatFiles} style={sx(`display:none`)} />
        <div style={sx(`display:flex;align-items:center;gap:8px;padding:8px 10px 10px 14px`)}>
          <button onClick={b.attachChat} style={sx(`display:flex;align-items:center;gap:7px;border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:5px 11px;border-radius:999px;font-size:12px;font-weight:500;cursor:pointer`)} data-hover="background:var(--surface2);color:var(--text)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.4 11.1-9.2 9.2a5 5 0 0 1-7.1-7.1l9.2-9.2a3.3 3.3 0 0 1 4.7 4.7l-9.2 9.2a1.7 1.7 0 0 1-2.4-2.4l8.5-8.5" />
            </svg>
            {"Attach"}
          </button>
          <span style={sx(`position:relative;display:inline-flex`)}>
            <button onClick={b.toggleAgentMenu} style={sx(`display:flex;align-items:center;gap:7px;border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:5px 11px;border-radius:999px;font-size:12px;font-weight:500;cursor:pointer`)} data-hover="background:var(--surface2);color:var(--text)">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="3.4" />
                <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
              </svg>
              {b.composerAgentLabel}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {b.agentMenuOpen ? (
              <>
                <div onClick={b.closeAgentMenu} style={sx(`position:fixed;inset:0;z-index:39`)} />
                <div style={sx(`position:absolute;bottom:calc(100% + 7px);left:0;z-index:40;width:224px;max-height:288px;overflow-y:auto;background:var(--surface);border:1px solid var(--border);border-radius:11px;box-shadow:0 16px 44px rgba(16,15,13,.2);padding:5px`)}>
                  {(b.composerAgentOpts || []).map((a, aI) => (
                    <React.Fragment key={aI}>
                      <button onClick={a.onClick} style={sx(`${a.style}`)} data-hover="background:var(--surface2)">
                        <span style={sx(`${a.monoStyle}`)}>
                          {a.mono}
                        </span>
                        <span style={sx(`flex:1;min-width:0;font-size:12.5px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left`)}>
                          {a.name}
                        </span>
                        {a.selected ? (
                          <>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          </>
                        ) : null}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </>
            ) : null}
          </span>
          <button onClick={b.sendChat} title="Send" style={sx(`margin-left:auto;background:var(--accent);color:#fff;border:none;width:32px;height:32px;border-radius:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--accent2)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div style={sx(`max-width:720px;margin:8px auto 0;text-align:center;font-size:11px;color:var(--text3)`)}>
        {"Agents can make mistakes. Verify important decisions before acting."}
      </div>
    </div>
    </>
  );
}
