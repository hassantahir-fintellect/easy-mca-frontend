import React from 'react';
import { sx } from '../../lib/sx';

export default function GmailShowSetupView({ b }) {
  return (
    <>
    <div style={sx(`text-align:center;padding:8px 8px 4px`)}>
      <div style={sx(`width:52px;height:52px;border-radius:14px;background:#fff;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:var(--shadow)`)}>
        <svg width="26" height="20" viewBox="0 0 48 36">
          <path fill="#4285F4" d="M3.4 36h6.8V19.5L0 11.8v20.8C0 34.5 1.5 36 3.4 36z" />
          <path fill="#34A853" d="M37.8 36h6.8c1.9 0 3.4-1.5 3.4-3.4V11.8l-10.2 7.7z" />
          <path fill="#FBBC04" d="M37.8 5.6v13.9L48 11.8V7.3c0-4.2-4.8-6.6-8.2-4.1z" />
          <path fill="#EA4335" d="M10.2 19.5V5.6L24 16 37.8 5.6v13.9L24 29.9z" />
          <path fill="#C5221F" d="M0 7.3v4.5l10.2 7.7V5.6L8.2 3.2C4.8.7 0 3.1 0 7.3z" />
        </svg>
      </div>
      <div style={sx(`font-size:16px;font-weight:600;letter-spacing:-.01em;margin-bottom:6px`)}>
        {"Connect your Google account"}
      </div>
      <div style={sx(`font-size:13px;color:var(--text3);line-height:1.6;max-width:360px;margin:0 auto 20px;text-wrap:pretty`)}>
        {"Google will open a sign-in pop-up to choose an account. EasyMCA requests "}
        <span style={sx(`color:var(--text2);font-weight:500`)}>
          {"read-only"}
        </span>
        {" Gmail access — agents can read deal emails, never send or delete."}
      </div>
      <div style={sx(`display:flex;justify-content:center;gap:8px;margin-bottom:20px`)}>
        <span style={sx(`display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:500;color:var(--text2);background:var(--surface2);padding:4px 10px;border-radius:999px`)}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {"Read messages"}
        </span>
        <span style={sx(`display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:500;color:var(--text2);background:var(--surface2);padding:4px 10px;border-radius:999px`)}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {"Read attachments"}
        </span>
        <span style={sx(`display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:500;color:var(--text3);background:var(--surface2);padding:4px 10px;border-radius:999px;text-decoration:line-through`)}>
          {"Send mail"}
        </span>
      </div>
      {b.gmailHasError ? (
        <>
          <div style={sx(`display:flex;gap:8px;align-items:flex-start;text-align:left;background:var(--bad-bg);border-radius:10px;padding:11px 12px;margin-bottom:14px;font-size:12px;color:var(--bad);line-height:1.5`)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none;margin-top:1px`)}>
              <path d="M12 9v4m0 4h.01" />
              <circle cx="12" cy="12" r="9" />
            </svg>
            {b.gmailError}
          </div>
        </>
      ) : null}
      <button onClick={b.gmailConnect} style={sx(`width:100%;max-width:340px;display:inline-flex;align-items:center;justify-content:center;gap:10px;background:#fff;border:1px solid #dadce0;border-radius:999px;padding:11px;font:500 14px var(--sans);color:#3c4043;cursor:pointer;box-shadow:var(--shadow)`)} data-hover="background:#f8f9fa;border-color:#c6c9ce">
        <svg width="17" height="17" viewBox="0 0 18 18">
          <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62Z" />
          <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z" />
          <path fill="#FBBC05" d="M3.97 10.72a5.41 5.41 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z" />
          <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
        </svg>
        {b.gmailConnectLabel}{"\n            "}
      </button>
      <div style={sx(`margin-top:14px;font-size:11px;color:var(--text3)`)}>
        {"OAuth 2.0 · scope: gmail.readonly · revoke anytime at myaccount.google.com/permissions"}
      </div>
    </div>
    </>
  );
}
