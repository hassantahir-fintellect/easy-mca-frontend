import React from 'react';
import { sx } from '../../lib/sx';

export default function IntegrationsView({ b }) {
  return (
    <>
    <div data-screen-label="Integrations" style={sx(`flex:1;overflow-y:auto;overflow-x:hidden;background:var(--surface)`)}>
      <div className="view-wrap" style={sx(`max-width:880px;margin:0 auto;padding:64px 40px 88px`)}>
        <div style={sx(`display:flex;align-items:flex-start;gap:16px`)}>
          <div style={sx(`flex:1;min-width:0`)}>
            <h1 style={sx(`font-size:22px;font-weight:600;margin:0 0 5px;letter-spacing:-.015em;color:var(--text)`)}>
              {"Integrations"}
            </h1>
            <p style={sx(`font-size:13.5px;color:var(--text3);margin:0`)}>
              {"Agents read and write where you already work. Outputs sync back automatically."}
            </p>
          </div>
          <button onClick={b.openAddIntegration} style={sx(`flex:none;display:inline-flex;align-items:center;gap:7px;border:none;background:var(--accent);color:#fff;padding:8px 14px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;margin-top:2px;box-shadow:var(--shadow)`)} data-hover="background:var(--accent2)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {"Add integration"}
          </button>
        </div>
        <div style={sx(`height:1px;background:var(--border);margin:22px 0 24px`)} />
        <div className="rg-2" style={sx(`display:grid;grid-template-columns:repeat(2,1fr);gap:12px`)}>
          {b.gmailCardVisible ? (
            <>
              <div onClick={b.openGmail} style={sx(`background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:13px;cursor:pointer;transition:border-color .14s,box-shadow .14s`)} data-hover="border-color:var(--border2);box-shadow:var(--shadow)">
                <div style={sx(`width:36px;height:36px;border-radius:9px;background:#fff;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex:none`)}>
                  <svg width="19" height="14" viewBox="0 0 48 36">
                    <path fill="#4285F4" d="M3.4 36h6.8V19.5L0 11.8v20.8C0 34.5 1.5 36 3.4 36z" />
                    <path fill="#34A853" d="M37.8 36h6.8c1.9 0 3.4-1.5 3.4-3.4V11.8l-10.2 7.7z" />
                    <path fill="#FBBC04" d="M37.8 5.6v13.9L48 11.8V7.3c0-4.2-4.8-6.6-8.2-4.1z" />
                    <path fill="#EA4335" d="M10.2 19.5V5.6L24 16 37.8 5.6v13.9L24 29.9z" />
                    <path fill="#C5221F" d="M0 7.3v4.5l10.2 7.7V5.6L8.2 3.2C4.8.7 0 3.1 0 7.3z" />
                  </svg>
                </div>
                <div style={sx(`flex:1;min-width:0`)}>
                  <div style={sx(`font-size:13.5px;font-weight:600;color:var(--text)`)}>
                    {"Gmail"}
                  </div>
                  <div style={sx(`font-size:12px;color:var(--text3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>
                    {b.gmailCardSub}
                  </div>
                </div>
                <span style={sx(`${b.gmailCardStatusStyle}`)}>
                  {b.gmailCardStatus}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </>
          ) : null}
          {(b.integrations || []).map((i, iI) => (
            <React.Fragment key={iI}>
              <div style={sx(`background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:13px`)}>
                <div style={sx(`width:36px;height:36px;border-radius:9px;background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;color:var(--text2);flex:none`)}>
                  {i.initial}
                </div>
                <div style={sx(`flex:1;min-width:0`)}>
                  <div style={sx(`font-size:13.5px;font-weight:600;color:var(--text)`)}>
                    {i.name}
                  </div>
                  <div style={sx(`font-size:12px;color:var(--text3)`)}>
                    {i.kind}
                  </div>
                </div>
                <span style={sx(`${i.style}`)}>
                  {i.status}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
