import React from 'react';
import { sx } from '../../lib/sx';

export default function ForgedReviewOpen({ b }) {
  return (
    <>
    <div onClick={b.closeForgedReview} style={sx(`position:fixed;inset:0;z-index:85;background:rgba(23,23,21,.4);display:flex;align-items:center;justify-content:center;padding:5vh 24px;animation:msgIn .16s ease both`)}>
      <div onClick={b.stop} style={sx(`width:min(840px,95vw);max-height:90vh;background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 24px 64px rgba(16,15,13,.18);overflow:hidden;display:flex;flex-direction:column`)}>
        <div style={sx(`padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:11px`)}>
          <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--bad-bg);color:var(--bad);display:flex;align-items:center;justify-content:center;flex:none`)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 9v4m0 4h.01" />
              <path d="M10.3 4.3 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" />
            </svg>
          </div>
          <div>
            <div style={sx(`font-size:14.5px;font-weight:600`)}>
              {"Document integrity review — Lone Star Freight"}
            </div>
            <div style={sx(`font-size:12px;color:var(--text3)`)}>
              {"DataMerch forgery report · 2 statements flagged for tampering"}
            </div>
          </div>
          <button onClick={b.closeForgedReview} style={sx(`margin-left:auto;width:32px;height:32px;border-radius:8px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--surface2)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="rg-split" style={sx(`display:grid;grid-template-columns:1.25fr 1fr;min-height:0;flex:1`)}>
          <div style={sx(`padding:22px;background:#eceaf2;overflow-y:auto;overflow-x:hidden;border-right:1px solid var(--border)`)}>
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
                  {"Acct ••8830"}
                </div>
              </div>
              <div style={sx(`font-size:10px;color:#555;line-height:2.1`)}>
                <div style={sx(`display:flex;justify-content:space-between`)}>
                  <span>
                    {"Beginning balance"}
                  </span>
                  <span>
                    {"$9,210.40"}
                  </span>
                </div>
                <div style={sx(`display:flex;justify-content:space-between;align-items:center;background:repeating-linear-gradient(45deg,#fef2f2,#fef2f2 6px,#fbdcdc 6px,#fbdcdc 12px);border:1.5px dashed var(--bad);border-radius:4px;padding:5px 7px;margin:5px -7px`)}>
                  <span style={sx(`color:#1d1f26;font-weight:600`)}>
                    {"Total deposits"}
                  </span>
                  <span style={sx(`position:relative;color:#1d1f26;font-weight:600`)}>
                    {"$214,500.00"}
                    <span style={sx(`position:absolute;top:-16px;right:0;font:600 8px var(--mono);background:var(--bad);color:#fff;padding:1px 5px;border-radius:4px;white-space:nowrap`)}>
                      {"font mismatch"}
                    </span>
                  </span>
                </div>
                <div style={sx(`display:flex;justify-content:space-between`)}>
                  <span>
                    {"Total withdrawals"}
                  </span>
                  <span>
                    {"$203,880.15"}
                  </span>
                </div>
                <div style={sx(`display:flex;justify-content:space-between;align-items:center;background:repeating-linear-gradient(45deg,#fef2f2,#fef2f2 6px,#fbdcdc 6px,#fbdcdc 12px);border:1.5px dashed var(--bad);border-radius:4px;padding:5px 7px;margin:5px -7px`)}>
                  <span style={sx(`color:#1d1f26;font-weight:600`)}>
                    {"Ending balance"}
                  </span>
                  <span style={sx(`position:relative;color:#1d1f26;font-weight:600`)}>
                    {"$19,830.25"}
                    <span style={sx(`position:absolute;top:-16px;right:0;font:600 8px var(--mono);background:var(--bad);color:#fff;padding:1px 5px;border-radius:4px;white-space:nowrap`)}>
                      {"doesn't reconcile"}
                    </span>
                  </span>
                </div>
              </div>
              <div style={sx(`margin-top:14px;padding-top:10px;border-top:1px solid #eee;font-size:8.5px;color:#bbb;line-height:1.7`)}>
                {"Beginning $9,210 + deposits $214,500 − withdrawals $203,880 = $19,830 expected, but the math only holds if deposits were inflated. Original PDF metadata shows edits in Acrobat 3 days before submission."}
              </div>
            </div>
          </div>
          <div style={sx(`padding:22px;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column`)}>
            <div style={sx(`font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--text3);margin-bottom:8px`)}>
              {"Agent findings"}
            </div>
            <div style={sx(`display:flex;flex-direction:column;gap:10px;margin-bottom:18px`)}>
              <div style={sx(`display:flex;gap:9px;align-items:flex-start`)}>
                <span style={sx(`width:18px;height:18px;border-radius:5px;background:var(--bad);color:#fff;display:flex;align-items:center;justify-content:center;font:700 11px var(--mono);flex:none;margin-top:1px`)}>
                  {"!"}
                </span>
                <div style={sx(`font-size:12.5px;line-height:1.5`)}>
                  <strong>
                    {"Font mismatch"}
                  </strong>
                  {" on the deposits figure — digits rendered in a different typeface than the rest of the statement."}
                </div>
              </div>
              <div style={sx(`display:flex;gap:9px;align-items:flex-start`)}>
                <span style={sx(`width:18px;height:18px;border-radius:5px;background:var(--bad);color:#fff;display:flex;align-items:center;justify-content:center;font:700 11px var(--mono);flex:none;margin-top:1px`)}>
                  {"!"}
                </span>
                <div style={sx(`font-size:12.5px;line-height:1.5`)}>
                  <strong>
                    {"PDF metadata"}
                  </strong>
                  {" shows Acrobat edits 3 days pre-submission; original was bank-generated."}
                </div>
              </div>
              <div style={sx(`display:flex;gap:9px;align-items:flex-start`)}>
                <span style={sx(`width:18px;height:18px;border-radius:5px;background:var(--bad);color:#fff;display:flex;align-items:center;justify-content:center;font:700 11px var(--mono);flex:none;margin-top:1px`)}>
                  {"!"}
                </span>
                <div style={sx(`font-size:12.5px;line-height:1.5`)}>
                  <strong>
                    {"DataMerch match"}
                  </strong>
                  {" — same EIN reported by Apex MCA for altered statements, Jan 2026."}
                </div>
              </div>
            </div>
            <div style={sx(`margin-top:auto;display:flex;flex-direction:column;gap:9px`)}>
              <button onClick={b.confirmForgedReview} style={sx(`background:var(--bad);color:#fff;border:none;border-radius:10px;padding:13px;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px`)} data-hover="filter:brightness(1.06)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
                {"Mark statements unverified & log"}
              </button>
              <button onClick={b.closeForgedReview} style={sx(`background:var(--surface);color:var(--text2);border:1px solid var(--border2);border-radius:10px;padding:11px;font-size:13px;font-weight:600;cursor:pointer`)} data-hover="background:var(--surface2)">
                {"Close"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
