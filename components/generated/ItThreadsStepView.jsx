import React from 'react';
import { sx } from '../../lib/sx';

export default function ItThreadsStepView({ b }) {
  return (
    <>
    <div style={sx(`display:flex;flex-direction:column;min-height:0;flex:1`)}>
      <div style={sx(`flex:none;border-bottom:1px solid var(--border);background:var(--surface2)`)}>
        <div style={sx(`padding:12px 20px 10px;display:flex;align-items:center;gap:9px`)}>
          <svg width="17" height="13" viewBox="0 0 48 36">
            <path fill="#4285F4" d="M3.4 36h6.8V19.5L0 11.8v20.8C0 34.5 1.5 36 3.4 36z" />
            <path fill="#34A853" d="M37.8 36h6.8c1.9 0 3.4-1.5 3.4-3.4V11.8l-10.2 7.7z" />
            <path fill="#FBBC04" d="M37.8 5.6v13.9L48 11.8V7.3c0-4.2-4.8-6.6-8.2-4.1z" />
            <path fill="#EA4335" d="M10.2 19.5V5.6L24 16 37.8 5.6v13.9L24 29.9z" />
            <path fill="#C5221F" d="M0 7.3v4.5l10.2 7.7V5.6L8.2 3.2C4.8.7 0 3.1 0 7.3z" />
          </svg>
          <span style={sx(`font-size:12px;font-weight:600;color:var(--text2)`)}>
            {"Gmail · vega.capital inbox"}
          </span>
          <span style={sx(`margin-left:auto;font-size:11.5px;color:var(--text3)`)}>
            {b.itThreadsCountLabel}
          </span>
        </div>
        <div style={sx(`padding:0 20px 12px`)}>
          <div style={sx(`display:flex;align-items:center;gap:9px;border:1px solid var(--border2);background:var(--surface);border-radius:9px;padding:8px 12px`)} data-focus-within="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.8" strokeLinecap="round" style={sx(`flex:none`)}>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" />
            </svg>
            <input value={b.intakeQuery} onInput={b.setIntakeQuery} placeholder="Search sender, business, or subject…" style={sx(`flex:1;border:none;background:transparent;font-size:13px;color:var(--text);outline:none`)} />
          </div>
        </div>
      </div>
      <div style={sx(`flex:1;min-height:0;max-height:min(340px,50vh);overflow-y:auto;overflow-x:hidden`)}>
        {(b.itThreads || []).map((t, tI) => (
          <React.Fragment key={tI}>
            <div onClick={t.onPick} style={sx(`display:flex;align-items:center;gap:12px;padding:13px 20px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .12s`)} data-hover="background:var(--surface2)">
              <div style={sx(`${t.avaStyle}`)}>
                {t.initial}
              </div>
              <div style={sx(`flex:1;min-width:0`)}>
                <div style={sx(`display:flex;align-items:baseline;gap:8px`)}>
                  <span style={sx(`font-size:13px;font-weight:${t.fromWeight};color:var(--text)`)}>
                    {t.from}
                  </span>
                  <span style={sx(`font-size:11px;color:var(--text3)`)}>
                    {t.biz}
                  </span>
                  <span style={sx(`margin-left:auto;font:500 11px var(--mono);color:var(--text3);flex:none`)}>
                    {t.when}
                  </span>
                </div>
                <div style={sx(`font-size:12.5px;font-weight:600;color:var(--text2);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>
                  {t.subject}
                </div>
                <div style={sx(`font-size:12px;color:var(--text3);margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>
                  {t.snippet}
                </div>
              </div>
              <span style={sx(`flex:none;display:inline-flex;align-items:center;gap:5px;font:600 11px var(--mono);color:var(--text2);background:var(--surface2);border:1px solid var(--border);padding:4px 9px;border-radius:20px`)}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.4 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
                {t.countLabel}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </React.Fragment>
        ))}
        {b.itThreadsEmpty ? (
          <>
            <div style={sx(`padding:44px 20px;text-align:center;color:var(--text3)`)}>
              <div style={sx(`font-size:13.5px;font-weight:600;color:var(--text2);margin-bottom:3px`)}>
                {"No threads match"}
              </div>
              <div style={sx(`font-size:12.5px`)}>
                {"Try a different sender, business, or subject."}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
    </>
  );
}
