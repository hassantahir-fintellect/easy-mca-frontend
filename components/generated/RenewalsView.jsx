import React from 'react';
import { sx } from '../../lib/sx';

export default function RenewalsView({ b }) {
  return (
    <>
    <div style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;background:var(--surface)`)}>
      <div className="view-wrap" style={sx(`max-width:920px;margin:0 auto;padding:64px 40px 88px`)}>
        <div style={sx(`display:flex;align-items:baseline;justify-content:space-between;margin-bottom:6px`)}>
          <div>
            <div style={sx(`font:600 11px var(--sans);color:var(--text3);text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px`)}>
              {"Renewal Agent · portfolio scan"}
            </div>
            <h1 style={sx(`font-size:20px;font-weight:600;margin:0;letter-spacing:-.015em`)}>
              {"3 merchants cross their renewal window this month."}
            </h1>
          </div>
        </div>
        <p style={sx(`font-size:14.5px;color:var(--text2);margin:8px 0 26px;max-width:620px`)}>
          {"I\\u2019ve drafted personalised outreach for each. Review, edit if you want, then approve the ones you\\u2019d like me to send today."}
        </p>
        <div style={sx(`display:flex;flex-direction:column;gap:14px;margin-bottom:24px`)}>
          {(b.renewals || []).map((r, rI) => (
            <React.Fragment key={rI}>
              <div style={sx(`background:var(--surface);border:1px solid var(--border);border-radius:14px;box-shadow:var(--shadow);overflow:hidden`)}>
                <div style={sx(`padding:16px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid var(--border)`)}>
                  <div style={sx(`width:38px;height:38px;border-radius:10px;background:var(--surface2);display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:17px;font-weight:600;color:var(--text2);flex:none`)}>
                    {r.name}
                  </div>
                  <div style={sx(`flex:1;min-width:0`)}>
                    <div style={sx(`font-size:15px;font-weight:600;letter-spacing:-.005em`)}>
                      {r.name}
                    </div>
                    <div style={sx(`display:flex;gap:14px;font-size:12px;color:var(--text2);margin-top:4px`)}>
                      <span>
                        <span style={sx(`color:var(--text);font-weight:500;font-family:var(--mono);font-size:12px`)}>
                          {r.repaid}{"%"}
                        </span>
                        {" repaid"}
                      </span>
                      <span>
                        {"health "}
                        <span style={sx(`color:var(--text);font-weight:500;font-family:var(--mono);font-size:12px`)}>
                          {r.health}
                        </span>
                      </span>
                      <span>
                        <span style={sx(`font-family:var(--mono);color:var(--text);font-weight:500`)}>
                          {r.days}
                        </span>
                        {" days to maturity"}
                      </span>
                      <span style={sx(`display:flex;align-items:center;gap:5px`)}>
                        <span style={sx(`width:6px;height:6px;border-radius:50%;background:${r.channelDot}`)} />
                        {r.channel}
                      </span>
                    </div>
                  </div>
                  <span style={sx(`${r.statusStyle}`)}>
                    {r.statusLabel}
                  </span>
                </div>
                <div className="rg-170" style={sx(`padding:14px 20px;display:grid;grid-template-columns:170px 1fr;gap:18px;align-items:flex-start`)}>
                  <div>
                    <div style={sx(`font-size:11px;color:var(--text2);font-weight:500;text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px`)}>
                      {"Suggested offer"}
                    </div>
                    <div style={sx(`font-family:var(--serif);font-size:16px;font-weight:600;line-height:1.3`)}>
                      {r.offer}
                    </div>
                    <div style={sx(`font-size:11.5px;color:var(--text3);margin-top:4px`)}>
                      {"based on current health"}
                    </div>
                  </div>
                  <div>
                    <div style={sx(`font-size:11px;color:var(--text2);font-weight:500;text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px`)}>
                      {"Drafted message"}
                    </div>
                    <textarea value={r.draft} onInput={r.onEdit} style={sx(`width:100%;min-height:78px;border:1px solid var(--border);background:var(--surface);border-radius:9px;padding:10px 12px;font-family:var(--sans);font-size:13px;line-height:1.55;color:var(--text);resize:vertical;outline:none`)} data-focus="border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-bg)" />
                  </div>
                </div>
                <div style={sx(`padding:12px 20px 14px;display:flex;align-items:center;gap:9px;border-top:1px solid var(--border);background:var(--surface)`)}>
                  <span style={sx(`font-size:11.5px;color:var(--text3);font-family:var(--mono)`)}>
                    {"Sends via "}{r.channel}{" on approval"}
                  </span>
                  <button onClick={r.skip} style={sx(`${r.skipStyle};margin-left:auto`)} data-hover="background:var(--surface2)">
                    {"Skip"}
                  </button>
                  <button onClick={r.toggle} style={sx(`${r.approveStyle}`)} data-hover="filter:brightness(1.05)">
                    <span style={sx(`display:inline-flex;align-items:center;gap:6px`)}>
                      {r.approved ? (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </>
                      ) : null}
                      {r.approveLabel}
                    </span>
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={sx(`display:flex;align-items:center;gap:14px;padding:14px 18px;background:var(--surface);border:1px solid var(--border);border-radius:13px;box-shadow:var(--shadow);position:sticky;bottom:18px`)}>
          <div style={sx(`font-size:13.5px;color:var(--text2)`)}>
            <span style={sx(`font-weight:600;color:var(--text);font-family:var(--serif);font-size:16px`)}>
              {b.renewalsApprovedCount}
            </span>
            {" approved for sending \\u00b7 outreach will be logged on each HubSpot deal"}
          </div>
          <button onClick={b.sendRenewals} style={sx(`${b.sendRenewalsStyle};margin-left:auto`)} data-hover="filter:brightness(1.07)">
            {"Send approved →"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
