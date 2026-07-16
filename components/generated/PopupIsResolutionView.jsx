import React from 'react';
import { sx } from '../../lib/sx';

export default function PopupIsResolutionView({ b }) {
  return (
    <>
    <div style={sx(`padding:22px`)}>
      <div style={sx(`background:#fbfbfd;border:1px solid var(--border);border-radius:10px;padding:22px 24px;font-size:12.5px;line-height:1.85;color:var(--text2)`)}>
        <div style={sx(`font-weight:600;color:var(--text);font-size:13.5px;margin-bottom:3px`)}>
          {"VELOCITY CAPITAL PARTNERS, LLC"}
        </div>
        <div style={sx(`font-size:11px;color:var(--text3);margin-bottom:16px`)}>
          {"Satisfaction of Judgment & Release · April 18, 2025"}
        </div>
        <p style={sx(`margin:0 0 12px`)}>
          {"Re: Confessed Judgment, Lone Star Freight LLC (EIN 82-5530147) — Case 25-CV-0418."}
        </p>
        <p style={sx(`margin:0 0 12px`)}>
          {"This confirms that the above-referenced obligation in the amount of "}
          <strong style={sx(`color:var(--text);font-family:var(--mono)`)}>
            {"$38,000.00"}
          </strong>
          {" has been satisfied in full as of the date above. Velocity Capital Partners releases all liens and claims against the merchant and its principal, Raymond Cole."}
        </p>
        <p style={sx(`margin:0 0 16px`)}>
          {"No further amounts are due. This release may be relied upon by third-party funders in evaluating subsequent applications."}
        </p>
        <div style={sx(`display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid var(--border);padding-top:12px`)}>
          <div>
            <div style={sx(`font-family:var(--serif);font-size:18px;color:var(--text);font-style:italic`)}>
              {"M. Sandoval"}
            </div>
            <div style={sx(`font-size:10.5px;color:var(--text3)`)}>
              {"Authorized Officer, Velocity Capital"}
            </div>
          </div>
          <div style={sx(`width:54px;height:54px;border:1.5px dashed var(--border2);border-radius:50%;display:flex;align-items:center;justify-content:center;font:600 8px var(--mono);color:var(--text3);text-align:center;transform:rotate(-8deg)`)}>
            {"NOTARY SEAL"}
          </div>
        </div>
      </div>
      <div style={sx(`margin-top:14px;padding:11px 13px;background:var(--ok-bg);border-radius:9px;font-size:12px;color:#14532d;display:flex;gap:8px;align-items:flex-start`)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none;margin-top:1px`)}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
        {"Verified authentic by the Document Parsing Agent · notary record matched. Clears the prior-default gate for B/C-paper funders that accept a resolution letter."}
      </div>
    </div>
    </>
  );
}
