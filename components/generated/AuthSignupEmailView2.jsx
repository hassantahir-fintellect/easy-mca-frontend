import React from 'react';
import { sx } from '../../lib/sx';

export default function AuthSignupEmailView2({ b }) {
  return (
    <>
    <h1 style={sx(`font-size:19px;font-weight:600;margin:0 0 4px;letter-spacing:-.015em`)}>
      {"Create your account"}
    </h1>
    <p style={sx(`font-size:13px;color:var(--text3);margin:0 0 18px`)}>
      {"Start with your work email — your team joins the same workspace."}
    </p>
    <button onClick={b.authGoogle} style={sx(`width:100%;display:flex;align-items:center;justify-content:center;gap:9px;border:1px solid var(--border2);background:var(--surface);color:var(--text);padding:9px;border-radius:9px;font-size:13.5px;font-weight:500;cursor:pointer`)} data-hover="background:var(--surface2)">
      <svg width="15" height="15" viewBox="0 0 48 48" style={sx(`flex:none`)}>
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
      {b.authGoogleLabel}
    </button>
    <div style={sx(`display:flex;align-items:center;gap:10px;margin:16px 0`)}>
      <div style={sx(`flex:1;height:1px;background:var(--border)`)} />
      <span style={sx(`font-size:11px;color:var(--text3)`)}>
        {"or"}
      </span>
      <div style={sx(`flex:1;height:1px;background:var(--border)`)} />
    </div>
    <div style={sx(`margin-bottom:14px`)}>
      <label style={sx(`display:block;font-size:12px;font-weight:600;color:var(--text2);margin-bottom:6px`)}>
        {"Work email"}
      </label>
      <input type="email" value={b.authEmail2} onInput={b.setAuthEmail2} onKeyDown={b.authEmailKey} placeholder="you@company.com" style={sx(`width:100%;border:1px solid var(--border2);background:var(--surface);border-radius:9px;padding:9px 12px;font-size:13.5px;color:var(--text);outline:none`)} data-focus="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg)" />
    </div>
    {b.authError ? (
      <>
        <div style={sx(`font-size:12.5px;color:var(--bad);background:var(--bad-bg);border-radius:8px;padding:8px 11px;margin-bottom:12px`)}>
          {b.authError}
        </div>
      </>
    ) : null}
    <button onClick={b.authContinueEmail} style={sx(`width:100%;border:none;background:var(--accent);color:#fff;padding:10px;border-radius:9px;font-size:13.5px;font-weight:600;cursor:pointer`)} data-hover="background:var(--accent2)">
      {"Continue"}
    </button>
    <div style={sx(`text-align:center;font-size:12.5px;color:var(--text3);margin-top:18px`)}>
      {"Already have an account? "}
      <a onClick={b.goLogin} style={sx(`color:var(--accent);font-weight:500;cursor:pointer`)}>
        {"Sign in"}
      </a>
    </div>
    </>
  );
}
