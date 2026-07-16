import React from 'react';
import { sx } from '../../lib/sx';

export default function FundabilityView({ b }) {
  return (
    <>
    <div style={sx(`flex:1;display:flex;min-height:0`)}>
      {/* inbound queue */}
      <div className="uw-queue" style={sx(`width:288px;flex:none;border-right:1px solid var(--border);background:var(--surface);display:flex;flex-direction:column;min-height:0`)}>
        <div style={sx(`padding:18px 18px 12px;border-bottom:1px solid var(--border)`)}>
          <div style={sx(`display:flex;align-items:center;justify-content:space-between;margin-bottom:3px`)}>
            <h2 style={sx(`font-size:14.5px;font-weight:600;margin:0`)}>
              {"Inbound deals"}
            </h2>
            <span style={sx(`font:600 11px var(--mono);color:var(--text3)`)}>
              {"5"}
            </span>
          </div>
          <div style={sx(`font-size:12px;color:var(--text3)`)}>
            {"From brokers via WhatsApp · auto-underwritten"}
          </div>
        </div>
        <div style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;padding:8px`)}>
          {(b.inboundQueue || []).map((d, dI) => (
            <React.Fragment key={dI}>
              <div onClick={d.onClick} style={sx(`${d.rowStyle}`)}>
                <div style={sx(`display:flex;align-items:center;gap:8px;margin-bottom:5px`)}>
                  <div style={sx(`font-size:13px;font-weight:600;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                    {d.name}
                  </div>
                  <div style={sx(`display:flex;align-items:baseline;gap:2px`)}>
                    <span style={sx(`font-family:var(--serif);font-size:16px;font-weight:600;color:${d.scoreColor}`)}>
                      {d.score}
                    </span>
                  </div>
                </div>
                <div style={sx(`display:flex;align-items:center;gap:7px`)}>
                  <span style={sx(`${d.bandStyle}`)}>
                    {d.band}
                  </span>
                  <span style={sx(`font:500 11px var(--mono);color:var(--text2)`)}>
                    {d.amountFmt}
                  </span>
                  <span style={sx(`font-size:11px;color:var(--text3);margin-left:auto`)}>
                    {d.received}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* fundability detail */}
      <div style={sx(`flex:1;min-width:0;overflow-y:auto;overflow-x:hidden;background:var(--bg)`)}>
        <div className="view-wrap" style={sx(`max-width:720px;margin:0 auto;padding:28px 30px 56px`)}>
          <div style={sx(`display:flex;align-items:center;gap:9px;margin-bottom:18px;font-size:12.5px;color:var(--text2)`)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#25a052" strokeWidth="1.8">
              <path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6.1A8.5 8.5 0 1 1 21 11.5Z" />
            </svg>
            {"Received from "}
            <span style={sx(`color:var(--text);font-weight:600`)}>
              {b.fundDetail.broker}
            </span>
            {" on WhatsApp Business · "}{b.fundDetail.received}
          </div>
          <div style={sx(`display:flex;align-items:flex-start;gap:18px;margin-bottom:22px`)}>
            <div style={sx(`flex:1`)}>
              <h1 style={sx(`font-size:22px;font-weight:600;margin:0 0 5px;letter-spacing:-.01em`)}>
                {b.fundDetail.name}
              </h1>
              <div style={sx(`display:flex;gap:12px;font-size:13px;color:var(--text2)`)}>
                <span>
                  {b.fundDetail.industry}
                </span>
                <span>
                  {"·"}
                </span>
                <span>
                  {"requesting "}
                  <span style={sx(`color:var(--text);font-weight:600`)}>
                    {b.fundDetail.amountFmt}
                  </span>
                </span>
              </div>
            </div>
            <div style={sx(`background:var(--surface);border:1px solid var(--border2);border-radius:14px;padding:14px 18px;box-shadow:var(--shadow);text-align:center;min-width:150px`)}>
              <div style={sx(`font-size:11px;color:var(--text2);font-weight:500;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px`)}>
                {"Fundability"}
              </div>
              <div style={sx(`display:flex;align-items:baseline;justify-content:center;gap:3px`)}>
                <span style={sx(`font-size:34px;font-weight:600;line-height:1;color:${b.fundDetail.scoreColor}`)}>
                  {b.fundDetail.score}
                </span>
                <span style={sx(`font-size:14px;color:var(--text3)`)}>
                  {"/100"}
                </span>
              </div>
              <div style={sx(`width:100%;height:6px;background:var(--surface2);border-radius:4px;overflow:hidden;margin-top:9px`)}>
                <div style={sx(`height:100%;width:${b.fundDetail.scoreWidth};background:${b.fundDetail.scoreColor};border-radius:4px;animation:barGrow .8s ease`)} />
              </div>
              <span style={sx(`${b.fundDetail.bandStyle};display:inline-block;margin-top:9px`)}>
                {b.fundDetail.band}
              </span>
            </div>
          </div>
          <div style={sx(`background:var(--surface);border:1px solid var(--border);border-radius:14px;box-shadow:var(--shadow);overflow:hidden;margin-bottom:16px`)}>
            <div className="stat-3" style={sx(`display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid var(--border)`)}>
              <div style={sx(`padding:14px 18px;border-right:1px solid var(--border)`)}>
                <div style={sx(`font-size:11px;color:var(--text2);margin-bottom:5px`)}>
                  {"Proposed factor"}
                </div>
                <div style={sx(`font-size:16px;font-weight:600;letter-spacing:-.01em;font-family:var(--sans)`)}>
                  {b.fundDetail.factorFmt}
                </div>
              </div>
              <div style={sx(`padding:14px 18px;border-right:1px solid var(--border)`)}>
                <div style={sx(`font-size:11px;color:var(--text2);margin-bottom:5px`)}>
                  {"Term"}
                </div>
                <div style={sx(`font-size:16px;font-weight:600;letter-spacing:-.01em;font-family:var(--sans)`)}>
                  {b.fundDetail.termFmt}
                </div>
              </div>
              <div style={sx(`padding:14px 18px`)}>
                <div style={sx(`font-size:11px;color:var(--text2);margin-bottom:5px`)}>
                  {"Total payback"}
                </div>
                <div style={sx(`font-size:16px;font-weight:600;letter-spacing:-.01em;font-family:var(--sans)`)}>
                  {b.fundDetail.paybackFmt}
                </div>
              </div>
            </div>
            <div style={sx(`padding:14px 18px;border-bottom:1px solid var(--border)`)}>
              <div style={sx(`font-size:11px;color:var(--text2);font-weight:500;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px`)}>
                {"Why this score"}
              </div>
              {(b.fundDetail.rationale || []).map((r, rI) => (
                <React.Fragment key={rI}>
                  <div style={sx(`display:flex;align-items:center;gap:10px;padding:5px 0`)}>
                    <span style={sx(`width:7px;height:7px;border-radius:50%;background:${r.dot};flex:none`)} />
                    <span style={sx(`font-size:13px;width:160px;flex:none;color:var(--text2)`)}>
                      {r.label}
                    </span>
                    <span style={sx(`font-size:13px;font-weight:500`)}>
                      {r.value}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div style={sx(`padding:14px 18px`)}>
              <div style={sx(`font-size:11px;color:var(--text2);font-weight:500;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px`)}>
                {"Risk flags"}
              </div>
              <div style={sx(`display:flex;flex-direction:column;gap:9px`)}>
                {(b.fundDetail.risk || []).map((rf, rfI) => (
                  <React.Fragment key={rfI}>
                    <div style={sx(`display:flex;gap:10px;align-items:flex-start`)}>
                      <span style={sx(`${rf.sevStyle}`)}>
                        {rf.sev}
                      </span>
                      <div style={sx(`flex:1`)}>
                        <span style={sx(`font-size:13px;font-weight:600`)}>
                          {rf.t}
                        </span>
                        <span style={sx(`font-size:13px;color:var(--text2)`)}>
                          {" — "}{rf.d}
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          {/* DECISION: choose */}
          {b.isFundChoose ? (
            <>
              <div className="wrap-sm" style={sx(`display:flex;gap:10px`)}>
                <button onClick={b.fundDeal} style={sx(`flex:1;background:var(--ok);color:#fff;border:none;border-radius:11px;padding:14px;font-size:14.5px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px`)} data-hover="filter:brightness(1.07)">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  {"Fund "}{b.fundDetail.amountFmt}
                </button>
                <button onClick={b.startDeny} style={sx(`background:var(--surface);color:var(--bad);border:1px solid var(--border2);border-radius:11px;padding:14px 26px;font-size:14.5px;font-weight:600;cursor:pointer`)} data-hover="background:var(--bad-bg);border-color:var(--bad)">
                  {"Deny"}
                </button>
              </div>
            </>
          ) : null}
          {/* DECISION: deny reason */}
          {b.isDenyReason ? (
            <>
              <div style={sx(`background:var(--surface);border:1px solid var(--border2);border-radius:14px;padding:18px;box-shadow:var(--shadow);animation:msgIn .3s ease both`)}>
                <div style={sx(`font-size:14px;font-weight:600;margin-bottom:3px`)}>
                  {"Reason for denial"}
                </div>
                <div style={sx(`font-size:12.5px;color:var(--text2);margin-bottom:14px`)}>
                  {"Logged to the audit trail and sent to the broker on WhatsApp so they can advise the merchant."}
                </div>
                <div style={sx(`display:flex;flex-direction:column;gap:8px;margin-bottom:16px`)}>
                  {(b.denyReasonRows || []).map((r, rI) => (
                    <React.Fragment key={rI}>
                      <div onClick={r.onClick} style={sx(`${r.style}`)}>
                        <span style={sx(`${r.dot}`)}>
                          {r.selected ? (
                            <>
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </>
                          ) : null}
                        </span>
                        {r.label}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div className="wrap-sm" style={sx(`display:flex;gap:10px`)}>
                  <button onClick={b.confirmDeny} style={sx(`${b.confirmDenyStyle}`)}>
                    {"Confirm denial"}
                  </button>
                  <button onClick={b.resetFund} style={sx(`background:var(--surface);color:var(--text2);border:1px solid var(--border2);border-radius:9px;padding:12px 22px;font-size:13.5px;font-weight:600;cursor:pointer`)} data-hover="background:var(--surface2);color:var(--text)">
                    {"Back"}
                  </button>
                </div>
              </div>
            </>
          ) : null}
          {/* DECISION: funded */}
          {b.isFunded ? (
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
          ) : null}
          {/* DECISION: denied */}
          {b.isDenied ? (
            <>
              <div style={sx(`background:var(--bad-bg);border:1px solid #f3c6c6;border-radius:14px;padding:18px 20px;animation:msgIn .35s ease both`)}>
                <div style={sx(`display:flex;align-items:center;gap:11px;margin-bottom:8px`)}>
                  <div style={sx(`width:30px;height:30px;border-radius:50%;background:var(--bad);display:flex;align-items:center;justify-content:center;flex:none`)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </div>
                  <span style={sx(`font-size:15px;font-weight:600;color:#7f1d1d`)}>
                    {"Denied — "}{b.denyReason}
                  </span>
                </div>
                <div style={sx(`font-size:13px;color:#9a3535;padding-left:41px;line-height:1.6`)}>
                  {"Reason logged to the audit trail. "}{b.fundDetail.broker}{" has been notified on WhatsApp with the decline reason so they can re-work or re-route the deal. No capital committed."}
                </div>
                <button onClick={b.resetFund} style={sx(`margin:14px 0 0 41px;background:var(--surface);color:var(--text);border:1px solid var(--border2);border-radius:9px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer`)} data-hover="background:var(--surface2)">
                  {"Review another deal"}
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
    </>
  );
}
