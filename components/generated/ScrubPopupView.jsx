import React from 'react';
import { sx } from '../../lib/sx';
import PopupIsResolutionView2 from './PopupIsResolutionView2';

export default function ScrubPopupView({ b }) {
  return (
    <>
    <div onClick={b.closeScrubPopup} style={sx(`position:fixed;inset:0;z-index:84;background:rgba(23,23,21,.4);display:flex;align-items:center;justify-content:center;padding:5vh 24px;animation:msgIn .16s ease both`)}>
      <div onClick={b.stop} style={sx(`width:min(${b.popupWidth}px,95vw);max-height:86vh;background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 24px 64px rgba(16,15,13,.18);overflow:hidden;display:flex;flex-direction:column`)}>
        <div style={sx(`padding:15px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:11px`)}>
          <div style={sx(`width:30px;height:30px;border-radius:8px;background:var(--surface2);color:var(--text2);display:flex;align-items:center;justify-content:center;flex:none`)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 3v5h5" />
              <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            </svg>
          </div>
          <div>
            <div style={sx(`font-size:14px;font-weight:600`)}>
              {b.popupTitle}
            </div>
            <div style={sx(`font-size:11.5px;color:var(--text3)`)}>
              {b.popupSub}
            </div>
          </div>
          <button onClick={b.closeScrubPopup} style={sx(`margin-left:auto;width:30px;height:30px;border-radius:8px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--surface2)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div style={sx(`overflow-y:auto;overflow-x:hidden`)}>
          {b.popupIsResolution ? <PopupIsResolutionView2 b={b} /> : null}
          {b.popupIsDeposit ? (
            <>
              <div>
                <div style={sx(`padding:12px 20px;background:var(--surface2);font-size:12px;color:var(--text2);display:flex;justify-content:space-between`)}>
                  <span>
                    {b.popupCount}{" transactions excluded from true revenue"}
                  </span>
                  <span style={sx(`font:600 12.5px var(--mono);color:var(--bad)`)}>
                    {b.popupTotal}
                  </span>
                </div>
                {(b.popupRows || []).map((r, rI) => (
                  <React.Fragment key={rI}>
                    <div style={sx(`display:flex;align-items:center;gap:12px;padding:11px 20px;border-bottom:1px solid var(--border)`)}>
                      <span style={sx(`font:500 11px var(--mono);color:var(--text3);width:54px;flex:none`)}>
                        {r.date}
                      </span>
                      <div style={sx(`flex:1;min-width:0`)}>
                        <div style={sx(`font-size:12.5px;font-weight:500`)}>
                          {r.desc}
                        </div>
                        <div style={sx(`font-size:11px;color:var(--text3)`)}>
                          {r.channel}
                        </div>
                      </div>
                      <span style={sx(`font:600 12.5px var(--mono);color:var(--text2)`)}>
                        {r.amount}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
                <div style={sx(`padding:12px 20px;font-size:11.5px;color:var(--text3);line-height:1.5`)}>
                  {"Identified by matching counterparty names and memo strings against the SOP exclusion list (personal transfers, peer-payment apps, refunds, factoring). Editable if you disagree with a classification."}
                </div>
              </div>
            </>
          ) : null}
          {b.popupIsNegDays ? (
            <>
              <div>
                <div style={sx(`padding:12px 20px;background:var(--surface2);font-size:12px;color:var(--text2);display:flex;justify-content:space-between`)}>
                  <span>
                    {b.popupCount}{" negative-balance days across 6 months"}
                  </span>
                  <span style={sx(`font:600 12.5px var(--mono);color:${b.popupNegColor}`)}>
                    {"SOP limit: \\u2264 5"}
                  </span>
                </div>
                {(b.popupRows || []).map((r, rI) => (
                  <React.Fragment key={rI}>
                    <div style={sx(`display:flex;align-items:center;gap:12px;padding:11px 20px;border-bottom:1px solid var(--border)`)}>
                      <span style={sx(`font:500 11px var(--mono);color:var(--text3);width:54px;flex:none`)}>
                        {r.date}
                      </span>
                      <div style={sx(`flex:1;min-width:0`)}>
                        <div style={sx(`font-size:12.5px;font-weight:500;color:var(--bad)`)}>
                          {r.amount}
                        </div>
                        <div style={sx(`font-size:11px;color:var(--text3)`)}>
                          {r.desc}
                        </div>
                      </div>
                      <span style={sx(`font:500 11px var(--mono);color:var(--text3)`)}>
                        {r.balance}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
                <div style={sx(`padding:12px 20px;font-size:11.5px;color:var(--text3);line-height:1.5`)}>
                  {"Pulled from daily ledger balances in the parsed statements. Each entry links to the statement page it was read from."}
                </div>
              </div>
            </>
          ) : null}
          {b.popupIsInclude ? (
            <>
              <div>
                <div style={sx(`padding:12px 20px;background:var(--surface2);font-size:12px;color:var(--text2);display:flex;justify-content:space-between`)}>
                  <span>
                    {b.popupHeaderNote}
                  </span>
                  <span style={sx(`font:600 12.5px var(--mono);color:var(--ok)`)}>
                    {b.popupTotal}
                  </span>
                </div>
                {(b.popupRows || []).map((r, rI) => (
                  <React.Fragment key={rI}>
                    <div style={sx(`display:flex;align-items:center;gap:12px;padding:11px 20px;border-bottom:1px solid var(--border)`)}>
                      <span style={sx(`font:500 11px var(--mono);color:var(--text3);width:54px;flex:none`)}>
                        {r.date}
                      </span>
                      <div style={sx(`flex:1;min-width:0`)}>
                        <div style={sx(`font-size:12.5px;font-weight:500`)}>
                          {r.desc}
                        </div>
                        <div style={sx(`font-size:11px;color:var(--text3)`)}>
                          {r.channel}
                        </div>
                      </div>
                      <span style={sx(`font:600 12.5px var(--mono);color:var(--text)`)}>
                        {r.amount}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
                <div style={sx(`padding:12px 20px;font-size:11.5px;color:var(--text3);line-height:1.5`)}>
                  {b.popupFootNote}
                </div>
              </div>
            </>
          ) : null}
          {b.popupIsAvg3mo ? (
            <>
              <div>
                <div style={sx(`padding:12px 20px;background:var(--surface2);font-size:12px;color:var(--text2);display:flex;justify-content:space-between`)}>
                  <span>
                    {"3 most recent statements"}
                  </span>
                  <span style={sx(`font:600 12.5px var(--mono);color:var(--text)`)}>
                    {b.popupTotal}{" avg"}
                  </span>
                </div>
                {(b.popupRows || []).map((r, rI) => (
                  <React.Fragment key={rI}>
                    <div style={sx(`display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border)`)}>
                      <span style={sx(`font-size:12.5px;font-weight:600;width:90px;flex:none`)}>
                        {r.m}
                      </span>
                      <span style={sx(`font:500 12px var(--mono);color:var(--text2);flex:1`)}>
                        {r.n}
                      </span>
                      <span style={sx(`font:600 13px var(--mono);color:var(--text)`)}>
                        {r.rev}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
                <div style={sx(`padding:12px 20px;font-size:11.5px;color:var(--text3);line-height:1.5`)}>
                  {b.popupFootNote}
                </div>
              </div>
            </>
          ) : null}
          {b.popupIsRetarget ? (
            <>
              <div style={sx(`padding:18px 20px`)}>
                <div style={sx(`font-size:12.5px;color:var(--text2);line-height:1.6;margin-bottom:14px`)}>
                  {"This merchant's most recent month is $142k — below the $200k A-paper floor. Re-targeting to a B/C-paper program only applies if the industry is trucking. Confirm the merchant's industry:"}
                </div>
                <div style={sx(`display:flex;flex-direction:column;gap:9px`)}>
                  {(b.retargetOptions || []).map((opt, optI) => (
                    <React.Fragment key={optI}>
                      <button onClick={opt.onClick} style={sx(`${opt.style}`)}>
                        <span style={sx(`${opt.dot}`)} />
                        {opt.label}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
                <button onClick={b.confirmRetarget} style={sx(`${b.retargetConfirmStyle}`)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {b.retargetConfirmLabel}
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
