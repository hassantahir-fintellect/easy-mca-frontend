import React from 'react';
import { sx } from '../../lib/sx';
import ShowSourcePromptView2 from './ShowSourcePromptView2';

export default function ChatEmptyView({ b }) {
  return (
    <>
    <div style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;justify-content:center`)}>
      <div className="view-wrap" style={sx(`max-width:720px;width:100%;margin:0 auto;padding:40px 32px 64px`)}>
        <div style={sx(`text-align:center;margin-bottom:32px`)}>
          <div style={sx(`width:56px;height:56px;margin:0 auto 22px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#8fb3f6 0%,#3f78ec 42%,#245ad4 78%,#1e46a8 100%);box-shadow:0 10px 26px rgba(46,107,230,.32),inset -4px -6px 12px rgba(20,50,120,.5),inset 3px 4px 10px rgba(255,255,255,.55);animation:orbFloat 5s ease-in-out infinite`)} />
          <h2 style={sx(`font-size:26px;font-weight:600;letter-spacing:-.022em;line-height:1.2;margin:0;color:var(--text)`)}>
            {"Start a conversation."}
            <br />
            {"What do you want to "}
            <span style={sx(`color:var(--accent)`)}>
              {"get done?"}
            </span>
          </h2>
        </div>
        {b.showSourcePrompt ? <ShowSourcePromptView2 b={b} /> : null}
        <div style={sx(`border:1px solid var(--border2);background:var(--surface);border-radius:16px;box-shadow:0 1px 2px rgba(16,15,13,.04),0 10px 30px rgba(16,15,13,.06);transition:border-color .15s,box-shadow .15s`)} data-focus-within="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg),0 10px 30px rgba(16,15,13,.05)">
          <div style={sx(`display:flex;align-items:flex-start;gap:11px;padding:18px 20px 4px`)}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none;margin-top:2px`)}>
              <path d="M5 3v4M3 5h4M6 17v4M4 19h4" />
              <path d="M13 3l2.4 6.6L22 12l-6.6 2.4L13 21l-2.4-6.6L4 12l6.6-2.4L13 3Z" />
            </svg>
            <input value={b.chatInput} onInput={b.setChatInput} onKeyDown={b.chatKey} placeholder="Ask AI a question or make a request…" style={sx(`flex:1;border:none;background:transparent;padding:0;font-size:15px;color:var(--text);outline:none`)} />
          </div>
          <input type="file" multiple ref={b.chatFileRef} onChange={b.onChatFiles} style={sx(`display:none`)} />
          <div style={sx(`display:flex;align-items:center;gap:8px;padding:10px 12px 12px 16px`)}>
            <button onClick={b.attachChat} style={sx(`display:flex;align-items:center;gap:7px;border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:6px 12px;border-radius:999px;font-size:12.5px;font-weight:500;cursor:pointer`)} data-hover="background:var(--surface2);color:var(--text)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.4 11.1-9.2 9.2a5 5 0 0 1-7.1-7.1l9.2-9.2a3.3 3.3 0 0 1 4.7 4.7l-9.2 9.2a1.7 1.7 0 0 1-2.4-2.4l8.5-8.5" />
              </svg>
              {"Attach"}
            </button>
            <span style={sx(`position:relative;display:inline-flex`)}>
              <button onClick={b.toggleAgentMenu} style={sx(`display:flex;align-items:center;gap:7px;border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:6px 12px;border-radius:999px;font-size:12.5px;font-weight:500;cursor:pointer`)} data-hover="background:var(--surface2);color:var(--text)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="3.4" />
                  <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
                </svg>
                {b.composerAgentLabel}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        {b.hasChatFiles ? (
          <>
            <div style={sx(`display:flex;gap:8px;flex-wrap:wrap;margin-top:12px`)}>
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
        <div style={sx(`display:flex;align-items:center;gap:12px;margin:34px 0 12px`)}>
          <div style={sx(`font-size:11px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--text3)`)}>
            {"Try asking"}
          </div>
          <div style={sx(`flex:1;height:1px;background:var(--border)`)} />
          <button onClick={b.toggleCite} style={sx(`display:flex;align-items:center;gap:8px;border:none;background:transparent;cursor:pointer;padding:0`)}>
            <span style={sx(`${b.citeTrackStyle}`)}>
              <span style={sx(`${b.citeKnobStyle}`)} />
            </span>
            <span style={sx(`font-size:12px;font-weight:500;color:var(--text2)`)}>
              {"Cite sources"}
            </span>
          </button>
        </div>
        <div className="rg-2" style={sx(`display:grid;grid-template-columns:repeat(2,1fr);gap:12px`)}>
          {(b.chatStarters || []).map((ex, exI) => (
            <React.Fragment key={exI}>
              <button onClick={ex.onClick} style={sx(`display:flex;align-items:center;gap:12px;text-align:left;border:1px solid var(--border);background:var(--surface2);border-radius:12px;padding:14px 15px;cursor:pointer;transition:background .13s,border-color .13s,box-shadow .13s`)} data-hover="background:var(--surface);border-color:var(--border2);box-shadow:var(--shadow)">
                <span style={sx(`width:30px;height:30px;border-radius:8px;background:var(--surface);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--text2);flex:none`)}>
                  {ex.icon}
                </span>
                <span style={sx(`font-size:13px;font-weight:500;line-height:1.4;color:var(--text2);text-wrap:pretty`)}>
                  {ex.label}
                </span>
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
