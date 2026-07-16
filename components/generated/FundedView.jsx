import React from 'react';
import { sx } from '../../lib/sx';

export default function FundedView({ b }) {
  return (
    <>
    <div style={sx(`background:var(--ok-bg);border:1px solid #bfe6cb;border-radius:14px;padding:18px 20px;animation:msgIn .35s ease both`)}>
      <div style={sx(`display:flex;align-items:center;gap:11px;margin-bottom:10px`)}>
        <div style={sx(`width:30px;height:30px;border-radius:50%;background:var(--ok);display:flex;align-items:center;justify-content:center;flex:none`)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <span style={sx(`font-size:15px;font-weight:600;color:#14532d`)}>
          {"Funded "}{b.fundDetail.amountFmt}{" at "}{b.fundDetail.factorFmt}{" · "}{b.fundDetail.termFmt}
        </span>
      </div>
      <div style={sx(`padding-left:41px;display:flex;flex-direction:column;gap:7px`)}>
        <div style={sx(`display:flex;align-items:center;gap:8px;font-size:13px;color:#2f6b46`)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {"Funding contract generated & sent for signature"}
        </div>
        <div style={sx(`display:flex;align-items:center;gap:8px;font-size:13px;color:#2f6b46`)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {"Capital disbursement scheduled in LendSaaS"}
        </div>
        <div style={sx(`display:flex;align-items:center;gap:8px;font-size:13px;color:#2f6b46`)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {"Broker "}{b.fundDetail.broker}{" notified on WhatsApp"}
        </div>
      </div>
      <button onClick={b.resetFund} style={sx(`margin:14px 0 0 41px;background:var(--surface);color:var(--text);border:1px solid var(--border2);border-radius:9px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer`)} data-hover="background:var(--surface2)">
        {"Review another deal"}
      </button>
    </div>
    </>
  );
}
