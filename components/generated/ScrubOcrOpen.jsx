import React from 'react';
import { sx } from '../../lib/sx';

export default function ScrubOcrOpen({ b }) {
  return (
    <>
    <div onClick={b.closeScrubOcr} style={sx(`position:fixed;inset:0;z-index:85;background:rgba(23,23,21,.4);display:flex;align-items:center;justify-content:center;padding:5vh 24px;animation:msgIn .16s ease both`)}>
      <div onClick={b.stop} style={sx(`width:min(840px,95vw);max-height:90vh;background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 24px 64px rgba(16,15,13,.18);overflow:hidden;display:flex;flex-direction:column`)}>
        <div style={sx(`padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:11px`)}>
          <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--warn-bg);color:var(--warn);display:flex;align-items:center;justify-content:center;flex:none`)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <div>
            <div style={sx(`font-size:14.5px;font-weight:600`)}>
              {"Manual review — low-confidence read"}
            </div>
            <div style={sx(`font-size:12px;color:var(--text3)`)}>
              {"Document Parsing Agent · Cinnamon Trail Coffee · avg daily balance"}
            </div>
          </div>
          <button onClick={b.closeScrubOcr} style={sx(`margin-left:auto;width:32px;height:32px;border-radius:8px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--surface2)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="rg-split" style={sx(`display:grid;grid-template-columns:1.2fr 1fr;min-height:0;flex:1`)}>
          <div style={sx(`padding:22px;background:#eceaf2;overflow-y:auto;overflow-x:hidden;border-right:1px solid var(--border)`)}>
            <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--text3);margin-bottom:10px`)}>
              {"Source statement"}
            </div>
            <div style={sx(`background:#fff;border-radius:6px;box-shadow:var(--shadow);padding:22px 24px;font-family:var(--mono);max-width:440px;margin:0 auto`)}>
              <div style={sx(`display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #1d1f26;padding-bottom:10px;margin-bottom:12px`)}>
                <div>
                  <div style={sx(`font-size:13px;font-weight:600;color:#1d1f26`)}>
                    {"FRONTIER NATIONAL BANK"}
                  </div>
                  <div style={sx(`font-size:9px;color:#888`)}>
                    {"Business Checking · Statement"}
                  </div>
                </div>
                <div style={sx(`font-size:9px;color:#888;text-align:right`)}>
                  {"Apr 1 – Apr 30, 2026"}
                  <br />
                  {"Acct ••1190"}
                </div>
              </div>
              <div style={sx(`font-size:10px;color:#555;line-height:2.1`)}>
                <div style={sx(`display:flex;justify-content:space-between`)}>
                  <span>
                    {"Beginning balance"}
                  </span>
                  <span>
                    {"$14,820.10"}
                  </span>
                </div>
                <div style={sx(`display:flex;justify-content:space-between`)}>
                  <span>
                    {"Total deposits"}
                  </span>
                  <span>
                    {"$162,300.00"}
                  </span>
                </div>
                <div style={sx(`display:flex;justify-content:space-between`)}>
                  <span>
                    {"Total withdrawals"}
                  </span>
                  <span>
                    {"$151,090.40"}
                  </span>
                </div>
                <div style={sx(`display:flex;justify-content:space-between`)}>
                  <span>
                    {"Ending balance"}
                  </span>
                  <span>
                    {"$9,940.55"}
                  </span>
                </div>
                <div style={sx(`display:flex;justify-content:space-between;align-items:center;background:repeating-linear-gradient(45deg,#fdf5e7,#fdf5e7 6px,#f6e6c8 6px,#f6e6c8 12px);border:1.5px dashed var(--warn);border-radius:4px;padding:6px 7px;margin:6px -7px`)}>
                  <span style={sx(`color:#1d1f26;font-weight:600`)}>
                    {"Average daily balance"}
                  </span>
                  <span style={sx(`position:relative;color:#1d1f26;font-weight:600;filter:blur(2.1px);opacity:.78;letter-spacing:1px`)}>
                    {"$1?,?00.??"}
                    <span style={sx(`position:absolute;top:-15px;right:0;font:600 8px var(--mono);background:var(--warn);color:#fff;padding:1px 5px;border-radius:4px;white-space:nowrap;filter:none`)}>
                      {"smudged scan"}
                    </span>
                  </span>
                </div>
              </div>
              <div style={sx(`margin-top:14px;padding-top:10px;border-top:1px solid #eee;font-size:8.5px;color:#bbb;line-height:1.7`)}>
                {"Page 4 scanned at low DPI — the average-daily-balance line is partially obscured. The agent flagged it for human verification against the merchant's original PDF."}
              </div>
            </div>
          </div>
          <div style={sx(`padding:22px;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column`)}>
            <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--text3);margin-bottom:9px`)}>
              {"OCR candidates"}
            </div>
            <div style={sx(`display:flex;flex-direction:column;gap:8px;margin-bottom:18px`)}>
              {(b.scrubOcrCandidates || []).map((c, cI) => (
                <React.Fragment key={cI}>
                  <button onClick={c.onClick} style={sx(`${c.rowStyle}`)}>
                    <span style={sx(`${c.dot}`)} />
                    <div style={sx(`flex:1;min-width:0`)}>
                      <div style={sx(`display:flex;align-items:center;gap:8px;margin-bottom:5px`)}>
                        <span style={sx(`font:600 15px var(--mono);color:var(--text)`)}>
                          {c.amount}
                        </span>
                        <span style={sx(`${c.tagStyle}`)}>
                          {c.tag}
                        </span>
                        <span style={sx(`margin-left:auto;font:600 11px var(--mono);color:var(--text2)`)}>
                          {c.confLabel}
                        </span>
                      </div>
                      <div style={sx(`height:5px;background:var(--surface2);border-radius:3px;overflow:hidden`)}>
                        <div style={sx(`height:100%;width:${c.barWidth};background:${c.barColor};border-radius:3px`)} />
                      </div>
                    </div>
                  </button>
                </React.Fragment>
              ))}
            </div>
            <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--text3);margin-bottom:7px`)}>
              {"Verified value"}
            </div>
            <div style={sx(`display:flex;align-items:center;gap:9px;border:1px solid var(--accent);border-radius:11px;padding:11px 13px;background:var(--accent-bg)`)}>
              <input value={b.scrubOcrValue} onInput={b.setScrubOcrValue} style={sx(`flex:1;border:none;background:none;font:600 18px var(--mono);color:var(--text);outline:none`)} />
              <span style={sx(`font:500 10.5px var(--mono);color:var(--text3)`)}>
                {"editable"}
              </span>
            </div>
            <div style={sx(`margin-top:14px;display:flex;gap:8px;align-items:flex-start;background:var(--surface2);border-radius:10px;padding:11px 12px;font-size:11.5px;color:var(--text2);line-height:1.5`)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none;margin-top:1px`)}>
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              {"Avg daily balance only — correcting it upgrades extraction confidence but doesn't change true revenue or any decline-rule gate."}
            </div>
            <div style={sx(`margin-top:auto;padding-top:18px;display:flex;flex-direction:column;gap:9px`)}>
              <button onClick={b.confirmScrubOcr} style={sx(`background:var(--accent);color:#fff;border:none;border-radius:10px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px`)} data-hover="filter:brightness(1.06)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {"Confirm verified value"}
              </button>
              <button onClick={b.closeScrubOcr} style={sx(`background:var(--surface);color:var(--text2);border:1px solid var(--border2);border-radius:10px;padding:11px;font-size:13px;font-weight:600;cursor:pointer`)} data-hover="background:var(--surface2)">
                {"Cancel"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
