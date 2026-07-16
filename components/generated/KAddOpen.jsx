import React from 'react';
import { sx } from '../../lib/sx';

export default function KAddOpen({ b }) {
  return (
    <>
    <div onClick={b.closeKAdd} style={sx(`position:fixed;inset:0;z-index:85;background:rgba(23,23,21,.4);display:flex;align-items:center;justify-content:center;padding:5vh 24px;animation:msgIn .18s ease`)}>
      <div onClick={b.stop} style={sx(`width:min(540px,95vw);max-height:90vh;overflow-y:auto;background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 24px 64px rgba(16,15,13,.18)`)}>
        <div style={sx(`padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:11px`)}>
          <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--surface2);color:var(--text2);display:flex;align-items:center;justify-content:center;flex:none`)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15.5H6.5A2.5 2.5 0 0 0 4 21Z" />
              <path d="M4 18.5V21" />
            </svg>
          </div>
          <div style={sx(`flex:1;min-width:0`)}>
            <div style={sx(`font-size:14.5px;font-weight:600`)}>
              {b.kAddTitle}
            </div>
            <div style={sx(`font-size:12px;color:var(--text3)`)}>
              {b.kAddSub}
            </div>
          </div>
          <button onClick={b.closeKAdd} style={sx(`width:32px;height:32px;border-radius:8px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--surface2)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* body: documents & links */}
        <div style={sx(`padding:16px 20px 20px`)}>
          {/* source picker */}
          <div style={sx(`display:flex;gap:2px;background:var(--surface2);border-radius:8px;padding:2px;margin-bottom:14px`)}>
            <button onClick={b.kSrcFile} style={sx(`${b.kSrcFileStyle}`)}>
              {"Upload file"}
            </button>
            <button onClick={b.kSrcLink} style={sx(`${b.kSrcLinkStyle}`)}>
              {"Add link"}
            </button>
            <button onClick={b.kSrcDrive} style={sx(`${b.kSrcDriveStyle}`)}>
              {"Google Drive"}
            </button>
          </div>
          {/* file */}
          {b.kIsFile ? (
            <>
              <div onClick={b.kBrowseDocs} style={sx(`border:1.5px dashed var(--border2);border-radius:12px;padding:26px 20px;display:flex;flex-direction:column;align-items:center;gap:7px;cursor:pointer;text-align:center;transition:border-color .12s`)} data-hover="border-color:var(--accent)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 16V4m0 0 4 4m-4-4L8 8" />
                  <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                </svg>
                <div style={sx(`font-size:13.5px;font-weight:600`)}>
                  {"Drop files here, or click to browse"}
                </div>
                <div style={sx(`font-size:12.5px;color:var(--text3)`)}>
                  {"SOPs, policies, playbooks — live for your agents the moment they land."}
                </div>
                <div style={sx(`font:500 10.5px var(--mono);color:var(--text3);margin-top:2px`)}>
                  {"PDF · DOCX · XLSX · TXT"}
                </div>
              </div>
              <input type="file" ref={b.kDocsRef} multiple={b.true} accept=".pdf,.doc,.docx,.xlsx,.csv,.txt,.md" onChange={b.kOnDocs} style={sx(`display:none`)} />
            </>
          ) : null}
          {/* link */}
          {b.kIsLink ? (
            <>
              <div style={sx(`display:flex;gap:8px`)}>
                <input value={b.kLinkInput} onInput={b.setKLink} onKeyDown={b.kLinkKey} placeholder="https://…" style={sx(`flex:1;min-width:0;border:1px solid var(--border2);background:var(--surface);border-radius:9px;padding:9px 12px;font-size:13.5px;color:var(--text);outline:none`)} data-focus="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg)" />
                <button onClick={b.kAddLink} style={sx(`flex:none;border:none;background:var(--accent);color:#fff;border-radius:9px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer`)} data-hover="background:var(--accent2)">
                  {"Add link"}
                </button>
              </div>
              <div style={sx(`font-size:12px;color:var(--text3);margin-top:9px;line-height:1.5`)}>
                {"Paste a link to a web page, Notion doc, or shared file. Agents fetch and cite it as a source."}
              </div>
            </>
          ) : null}
          {/* drive */}
          {b.kIsDrive ? (
            <>
              <div onClick={b.kBrowseDrive} style={sx(`border:1.5px dashed var(--border2);border-radius:12px;padding:16px 18px;display:flex;align-items:center;gap:12px;cursor:pointer;text-align:left;transition:border-color .12s;margin-bottom:10px`)} data-hover="border-color:var(--accent)">
                <svg width="22" height="22" viewBox="0 0 87.3 78" style={sx(`flex:none`)}>
                  <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
                  <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
                  <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
                  <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
                  <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
                  <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
                </svg>
                <div style={sx(`flex:1;min-width:0`)}>
                  <div style={sx(`font-size:13px;font-weight:600`)}>
                    {"Browse Google Drive"}
                  </div>
                  <div style={sx(`font-size:11.5px;color:var(--text3)`)}>
                    {"Connected · vega.capital · Marcus Vega"}
                  </div>
                </div>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </div>
              <div style={sx(`display:flex;gap:8px`)}>
                <input value={b.kLinkInput} onInput={b.setKLink} onKeyDown={b.kLinkKey} placeholder="or paste a Drive share link…" style={sx(`flex:1;min-width:0;border:1px solid var(--border2);background:var(--surface);border-radius:9px;padding:9px 12px;font-size:13.5px;color:var(--text);outline:none`)} data-focus="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg)" />
                <button onClick={b.kAddLink} style={sx(`flex:none;border:none;background:var(--accent);color:#fff;border-radius:9px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer`)} data-hover="background:var(--accent2)">
                  {"Add"}
                </button>
              </div>
            </>
          ) : null}
          {/* staged */}
          {b.kHasStaged ? (
            <>
              <div style={sx(`display:flex;flex-direction:column;gap:6px;margin-top:12px`)}>
                {(b.kStaged || []).map((f, fI) => (
                  <React.Fragment key={fI}>
                    <div style={sx(`display:flex;align-items:center;gap:10px;border:1px solid var(--border);border-radius:9px;padding:8px 11px`)}>
                      {f.isLink ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                          </svg>
                        </>
                      ) : null}
                      {f.isFile ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
                            <path d="M14 3v5h5" />
                          </svg>
                        </>
                      ) : null}
                      <span style={sx(`flex:1;min-width:0;font-size:12.5px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                        {f.name}
                      </span>
                      <span style={sx(`font:500 11px var(--mono);color:var(--text3);flex:none`)}>
                        {f.size}
                      </span>
                      <button onClick={f.remove} style={sx(`width:22px;height:22px;border-radius:6px;border:none;background:transparent;color:var(--text3);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--surface2);color:var(--text)">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : null}
          {/* available to */}
          <div style={sx(`font-size:12px;font-weight:600;color:var(--text2);margin:16px 0 8px`)}>
            {"Available to"}
          </div>
          <div style={sx(`display:flex;flex-wrap:wrap;gap:6px;align-items:center`)}>
            <div title="The platform agent always uses every piece of knowledge you add — this can't be turned off." style={sx(`display:inline-flex;align-items:center;gap:6px;border:1px solid var(--accent);background:var(--accent-bg);color:var(--accent);padding:5px 11px;border-radius:999px;font-size:12px;font-weight:600;cursor:default`)}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              {"Platform agent\n          "}
            </div>
            {(b.kAgentOpts || []).map((a, aI) => (
              <React.Fragment key={aI}>
                <button onClick={a.onClick} style={sx(`${a.style}`)}>
                  {a.name}
                </button>
              </React.Fragment>
            ))}
          </div>
          <div style={sx(`font-size:11.5px;color:var(--text3);margin-top:8px;line-height:1.5`)}>
            {"The platform agent always has this knowledge. Select specialized agents to give them access too."}
          </div>
          {b.kAddError ? (
            <>
              <div style={sx(`font-size:12.5px;color:var(--bad);background:var(--bad-bg);border-radius:8px;padding:8px 11px;margin-top:12px`)}>
                {b.kAddError}
              </div>
            </>
          ) : null}
          <div style={sx(`display:flex;gap:10px;margin-top:18px`)}>
            <button onClick={b.closeKAdd} style={sx(`border:1px solid var(--border2);background:var(--surface);color:var(--text2);border-radius:9px;padding:10px 16px;font-size:13px;font-weight:500;cursor:pointer`)} data-hover="background:var(--surface2)">
              {"Cancel"}
            </button>
            <button onClick={b.kAddDocs} style={sx(`${b.kDocsBtnStyle}`)}>
              {b.kDocsBtnLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
