import React from 'react';
import { sx } from '../../lib/sx';

export default function GmailShowDetailView({ b }) {
  return (
    <>
    <div>
      <div style={sx(`display:flex;align-items:center;gap:12px;border:1px solid var(--border);border-radius:12px;padding:13px 15px;margin-bottom:6px`)}>
        {b.gmailHasPicture ? (
          <>
            <div style={sx(`${b.gmailAvatarStyle}`)} />
          </>
        ) : null}
        {b.gmailNoPicture ? (
          <>
            <div style={sx(`width:38px;height:38px;border-radius:50%;background:var(--accent-bg);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;flex:none`)}>
              {b.gmailInitial}
            </div>
          </>
        ) : null}
        <div style={sx(`flex:1;min-width:0`)}>
          <div style={sx(`font-size:13.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>
            {b.gmailName}
          </div>
          <div style={sx(`font-size:12px;color:var(--text3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>
            {b.gmailEmail}
          </div>
        </div>
        <span style={sx(`${b.gmailStatusStyle}`)}>
          <span style={sx(`${b.gmailDotStyle}`)} />
          {b.gmailStatusLabel}
        </span>
      </div>
      <div style={sx(`display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 2px;border-bottom:1px solid var(--border)`)}>
        <span style={sx(`font-size:12.5px;color:var(--text2)`)}>
          {"Last synced"}
        </span>
        <span style={sx(`font-size:12.5px;font-weight:600;color:var(--text)`)}>
          {b.gmailLastSyncRel}{" "}
          {b.gmailHasSyncAbs ? (
            <>
              <span style={sx(`font-weight:400;color:var(--text3)`)}>
                {"· "}{b.gmailLastSyncAbs}
              </span>
            </>
          ) : null}
        </span>
      </div>
      <div style={sx(`display:flex;justify-content:space-between;align-items:center;gap:12px;padding:8px 2px;border-bottom:1px solid var(--border)`)}>
        <span style={sx(`font-size:12.5px;color:var(--text2)`)}>
          {"Pull data since"}
        </span>
        <input type="date" value={b.gmailSince} onInput={b.changeGmailSince} style={sx(`border:1px solid var(--border2);border-radius:8px;padding:6px 9px;font:500 12px var(--sans);color:var(--text);background:var(--surface);outline:none`)} data-focus="border-color:var(--accent)" />
      </div>
      <div style={sx(`display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 2px;border-bottom:1px solid var(--border)`)}>
        <span style={sx(`font-size:12.5px;color:var(--text2)`)}>
          {"Mailbox messages"}
        </span>
        <span style={sx(`font:600 12.5px var(--mono);color:var(--text)`)}>
          {b.gmailMsgTotal}
        </span>
      </div>
      <div style={sx(`display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 2px`)}>
        <span style={sx(`font-size:12.5px;color:var(--text2)`)}>
          {"Messages since "}{b.gmailSinceLabel}
        </span>
        <span style={sx(`font:600 12.5px var(--mono);color:var(--text)`)}>
          {b.gmailMsgSince}
        </span>
      </div>
      {b.gmailHasApiNote ? (
        <>
          <div style={sx(`display:flex;gap:8px;align-items:flex-start;background:var(--warn-bg);border-radius:10px;padding:11px 12px;margin-top:10px;font-size:11.5px;color:#7a4a12;line-height:1.5`)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none;margin-top:1px`)}>
              <path d="M12 9v4m0 4h.01" />
              <circle cx="12" cy="12" r="9" />
            </svg>
            {b.gmailApiNote}
          </div>
        </>
      ) : null}
      {b.gmailHasError ? (
        <>
          <div style={sx(`display:flex;gap:8px;align-items:flex-start;background:var(--bad-bg);border-radius:10px;padding:11px 12px;margin-top:10px;font-size:12px;color:var(--bad);line-height:1.5`)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none;margin-top:1px`)}>
              <path d="M12 9v4m0 4h.01" />
              <circle cx="12" cy="12" r="9" />
            </svg>
            {b.gmailError}
          </div>
        </>
      ) : null}
      {b.gmailConnected ? (
        <>
          <div style={sx(`display:flex;gap:9px;margin-top:16px`)}>
            <button onClick={b.gmailSync} style={sx(`flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:var(--accent);color:#fff;border:none;border-radius:8px;padding:11px;font-size:13px;font-weight:500;cursor:pointer`)} data-hover="background:var(--accent2)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                <path d="M21 3v6h-6" />
              </svg>
              {b.gmailSyncLabel}
            </button>
            <button onClick={b.gmailDisconnect} style={sx(`flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:var(--surface);color:var(--bad);border:1px solid var(--border2);border-radius:8px;padding:11px;font-size:13px;font-weight:500;cursor:pointer`)} data-hover="background:var(--bad-bg);border-color:var(--bad)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.4 13.5 21 11a5 5 0 0 0-7-7l-2.6 2.5" />
                <path d="m5.6 10.5-2.6 2.6a5 5 0 0 0 7 7l2.6-2.6" />
                <path d="m4 4 16 16" />
              </svg>
              {"Disconnect"}
            </button>
          </div>
        </>
      ) : null}
      {b.gmailDisconnectedState ? (
        <>
          <div style={sx(`margin-top:16px`)}>
            <div style={sx(`font-size:11.5px;color:var(--text3);line-height:1.5;margin-bottom:10px`)}>
              {"EasyMCA’s access token was revoked. Reconnect with Google to resume syncing — your settings are kept."}
            </div>
            <button onClick={b.gmailConnect} style={sx(`width:100%;display:flex;align-items:center;justify-content:center;gap:10px;background:#fff;border:1px solid #dadce0;border-radius:10px;padding:12px;font:500 14px var(--sans);color:#3c4043;cursor:pointer`)} data-hover="background:#f8f9fa;border-color:#c6c9ce">
              <svg width="17" height="17" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62Z" />
                <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z" />
                <path fill="#FBBC05" d="M3.97 10.72a5.41 5.41 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z" />
                <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
              </svg>
              {b.gmailConnectLabel}{"\n                "}
            </button>
          </div>
        </>
      ) : null}
    </div>
    </>
  );
}
