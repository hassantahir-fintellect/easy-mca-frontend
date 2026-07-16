import React from 'react';
import { sx } from '../../lib/sx';

export default function ItDocsStepView({ b }) {
  return (
    <>
    <div style={sx(`display:flex;flex-direction:column;min-height:0`)}>
      <div style={sx(`padding:12px 20px;border-bottom:1px solid var(--border);background:var(--surface2);flex:none`)}>
        <button onClick={b.backToIntakeThreads} style={sx(`display:inline-flex;align-items:center;gap:6px;border:none;background:none;padding:0;color:var(--accent);font:600 12px var(--sans);cursor:pointer;margin-bottom:7px`)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          {"Back to inbox"}
        </button>
        <div style={sx(`font-size:13.5px;font-weight:600`)}>
          {b.itSubject}
        </div>
        <div style={sx(`font-size:11.5px;color:var(--text3);margin-top:1px`)}>
          {b.itSender}
        </div>
      </div>
      <div style={sx(`padding:11px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:9px;flex-wrap:wrap;flex:none`)}>
        <span style={sx(`font:600 10.5px var(--sans);text-transform:uppercase;letter-spacing:.07em;color:var(--text3)`)}>
          {"Date range"}
        </span>
        <input type="date" value={b.itFrom} onInput={b.setIntakeFrom} style={sx(`border:1px solid var(--border2);border-radius:8px;padding:6px 8px;font:500 12px var(--sans);color:var(--text);background:var(--surface);outline:none`)} data-focus="border-color:var(--accent)" />
        <span style={sx(`font-size:11.5px;color:var(--text3)`)}>
          {"to"}
        </span>
        <input type="date" value={b.itTo} onInput={b.setIntakeTo} style={sx(`border:1px solid var(--border2);border-radius:8px;padding:6px 8px;font:500 12px var(--sans);color:var(--text);background:var(--surface);outline:none`)} data-focus="border-color:var(--accent)" />
        <span style={sx(`margin-left:auto;display:inline-flex;gap:6px;align-items:center`)}>
          <button onClick={b.allIntakeDocs} style={sx(`border:1px solid var(--border2);background:var(--surface);color:var(--accent);padding:5px 10px;border-radius:7px;font:600 11px var(--sans);cursor:pointer`)} data-hover="background:var(--accent-bg)">
            {"Select all"}
          </button>
          <button onClick={b.clearIntakeDocs} style={sx(`border:1px solid var(--border2);background:var(--surface);color:var(--text2);padding:5px 10px;border-radius:7px;font:600 11px var(--sans);cursor:pointer`)} data-hover="background:var(--surface2)">
            {"None"}
          </button>
        </span>
      </div>
      <div style={sx(`overflow-y:auto;overflow-x:hidden;flex:1;min-height:0`)}>
        {(b.itDocs || []).map((d, dI) => (
          <React.Fragment key={dI}>
            <div onClick={d.onToggle} style={sx(`${d.rowStyle}`)} data-hover="background:var(--surface2)">
              <div style={sx(`${d.boxStyle}`)}>
                {d.on ? (
                  <>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </>
                ) : null}
              </div>
              <div style={sx(`width:32px;height:32px;border-radius:8px;flex:none;display:flex;align-items:center;justify-content:center;background:var(--surface2);border:1px solid var(--border)`)}>
                {d.isPdf ? (
                  <>
                    <span style={sx(`font:700 8.5px var(--mono);color:var(--bad)`)}>
                      {"PDF"}
                    </span>
                  </>
                ) : null}
                {d.isImg ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-4.35-4.35a1.5 1.5 0 0 0-2.12 0L5 20" />
                    </svg>
                  </>
                ) : null}
              </div>
              <div style={sx(`flex:1;min-width:0`)}>
                <div style={sx(`font:600 12.5px var(--mono);color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>
                  {d.name}
                </div>
                <div style={sx(`font-size:11px;color:var(--text3);margin-top:1px`)}>
                  {d.kind}{" · "}{d.size}
                </div>
              </div>
              <span style={sx(`flex:none;font:500 11px var(--mono);color:var(--text3)`)}>
                {d.dateLabel}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div style={sx(`padding:13px 20px;border-top:1px solid var(--border);display:flex;align-items:center;gap:12px;flex:none;background:var(--surface)`)}>
        <span style={sx(`font:600 11.5px var(--mono);color:var(--text2)`)}>
          {b.itSelSummary}
        </span>
        <span style={sx(`flex:1`)} />
        <button onClick={b.closeIntakeTask} style={sx(`border:1px solid var(--border2);background:var(--surface);color:var(--text2);padding:11px 16px;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer`)} data-hover="background:var(--surface2)">
          {"Cancel"}
        </button>
        <button onClick={b.confirmIntakeManual} title="Hand off the selected documents and drive the scrub yourself in the conversation." style={sx(`${b.itManualStyle}`)}>
          {"Scrub manually"}
        </button>
        <button onClick={b.confirmIntakeDocs} style={sx(`${b.itConfirmStyle}`)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {b.itConfirmLabel}
        </button>
      </div>
    </div>
    </>
  );
}
