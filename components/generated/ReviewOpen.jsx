import React from 'react';
import { sx } from '../../lib/sx';

export default function ReviewOpen({ b }) {
  return (
    <>
    <div onClick={b.closeReview} style={sx(`position:fixed;inset:0;z-index:85;background:rgba(23,23,21,.4);display:flex;align-items:center;justify-content:center;padding:5vh 24px;animation:msgIn .16s ease both`)}>
      <div onClick={b.stop} style={sx(`width:min(840px,95vw);max-height:90vh;background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 24px 64px rgba(16,15,13,.18);overflow:hidden;display:flex;flex-direction:column`)}>
        <div style={sx(`padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:11px`)}>
          <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--surface2);color:var(--text2);display:flex;align-items:center;justify-content:center;flex:none`)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 3v5h5" />
              <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            </svg>
          </div>
          <div>
            <div style={sx(`font-size:14.5px;font-weight:600`)}>
              {"Manual review — BankStmt_Mar2026.pdf"}
            </div>
            <div style={sx(`font-size:12px;color:var(--text3)`)}>
              {"Page 3 of 4 · low-confidence extraction flagged by the Document Parsing Agent"}
            </div>
          </div>
          <button onClick={b.closeReview} style={sx(`margin-left:auto;width:32px;height:32px;border-radius:8px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--surface2)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="rg-split" style={sx(`display:grid;grid-template-columns:1.25fr 1fr;min-height:0;flex:1`)}>
          {/* document preview */}
          <div style={sx(`padding:22px;background:#eceaf2;overflow-y:auto;overflow-x:hidden;border-right:1px solid var(--border)`)}>
            <div style={sx(`background:#fff;border-radius:6px;box-shadow:var(--shadow);padding:22px 24px;font-family:var(--mono);max-width:440px;margin:0 auto`)}>
              <div style={sx(`display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #1d1f26;padding-bottom:10px;margin-bottom:12px`)}>
                <div>
                  <div style={sx(`font-size:13px;font-weight:600;color:#1d1f26`)}>
                    {"DESERT VALLEY BANK"}
                  </div>
                  <div style={sx(`font-size:9px;color:#888`)}>
                    {"Business Checking · Statement"}
                  </div>
                </div>
                <div style={sx(`font-size:9px;color:#888;text-align:right`)}>
                  {"Mar 1 – Mar 31, 2026"}
                  <br />
                  {"Acct ••4471"}
                </div>
              </div>
              <div style={sx(`font-size:10px;color:#555;line-height:2.1`)}>
                <div style={sx(`display:flex;justify-content:space-between`)}>
                  <span>
                    {"Beginning balance"}
                  </span>
                  <span>
                    {"$18,940.12"}
                  </span>
                </div>
                <div style={sx(`display:flex;justify-content:space-between`)}>
                  <span>
                    {"Total withdrawals"}
                  </span>
                  <span>
                    {"$132,610.55"}
                  </span>
                </div>
                <div style={sx(`display:flex;justify-content:space-between;align-items:center;background:repeating-linear-gradient(45deg,#fff7ec,#fff7ec 6px,#ffeccb 6px,#ffeccb 12px);border:1.5px dashed var(--warn);border-radius:4px;padding:5px 7px;margin:5px -7px`)}>
                  <span style={sx(`color:#1d1f26;font-weight:600`)}>
                    {"Total deposits"}
                  </span>
                  <span style={sx(`position:relative;color:#1d1f26;font-weight:600`)}>
                    {"$1S1,2OO."}
                    <span style={sx(`opacity:.5`)}>
                      {"··"}
                    </span>
                    <span style={sx(`position:absolute;top:-16px;right:0;font:600 8px var(--mono);background:var(--warn);color:#fff;padding:1px 5px;border-radius:4px;white-space:nowrap`)}>
                      {"71% OCR"}
                    </span>
                  </span>
                </div>
                <div style={sx(`display:flex;justify-content:space-between`)}>
                  <span>
                    {"Ending balance"}
                  </span>
                  <span>
                    {"$37,529.69"}
                  </span>
                </div>
                <div style={sx(`display:flex;justify-content:space-between;color:#aaa`)}>
                  <span>
                    {"NSF / returned items"}
                  </span>
                  <span>
                    {"3"}
                  </span>
                </div>
              </div>
              <div style={sx(`margin-top:14px;padding-top:10px;border-top:1px solid #eee;font-size:8.5px;color:#bbb;line-height:1.7`)}>
                {"Smudged scan on this page reduced character confidence on the deposits line. All other pages extracted cleanly."}
              </div>
            </div>
          </div>
          {/* correction panel */}
          <div style={sx(`padding:22px;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column`)}>
            <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--text3);margin-bottom:6px`)}>
              {"Flagged field"}
            </div>
            <div style={sx(`font-size:14px;font-weight:600;margin-bottom:3px`)}>
              {"Total deposits — March 2026"}
            </div>
            <div style={sx(`font-size:12.5px;color:var(--text2);line-height:1.5;margin-bottom:16px`)}>
              {"The agent read "}
              <span style={sx(`font-family:var(--mono);background:var(--warn-bg);color:var(--warn);padding:1px 5px;border-radius:4px`)}>
                {"$1S1,2OO"}
              </span>
              {" at 71% confidence. Confirm the figure or correct it — your input is logged to the audit trail and the model re-runs on the verified value."}
            </div>
            <label style={sx(`font-size:11px;font-weight:600;color:var(--text2);margin-bottom:6px`)}>
              {"Verified value"}
            </label>
            <input value={b.reviewValue} onInput={b.setReviewValue} style={sx(`border:1px solid var(--border2);border-radius:10px;padding:12px 14px;font:600 18px var(--mono);color:var(--text);outline:none;margin-bottom:7px`)} data-focus="border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-bg)" />
            <div style={sx(`font-size:11.5px;color:var(--text3);margin-bottom:18px`)}>
              {"Cross-checked against deposit-line subtotals: "}
              <span style={sx(`color:var(--ok);font-weight:600`)}>
                {"$151,200.00"}
              </span>
              {" reconciles within $0."}
            </div>
            <div style={sx(`margin-top:auto;display:flex;flex-direction:column;gap:9px`)}>
              <button onClick={b.confirmReview} style={sx(`background:var(--accent);color:#fff;border:none;border-radius:10px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px`)} data-hover="filter:brightness(1.05)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {"Confirm verified value"}
              </button>
              <button onClick={b.closeReview} style={sx(`background:var(--surface);color:var(--text2);border:1px solid var(--border2);border-radius:10px;padding:11px;font-size:13px;font-weight:600;cursor:pointer`)} data-hover="background:var(--surface2)">
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
