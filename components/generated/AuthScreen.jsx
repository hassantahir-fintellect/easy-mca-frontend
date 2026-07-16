import React from 'react';
import { sx } from '../../lib/sx';
import AuthLoginScreen2 from './AuthLoginScreen2';
import AuthSignupEmailView2 from './AuthSignupEmailView2';

export default function AuthScreen({ b }) {
  return (
    <>
    <div data-screen-label="Auth" style={sx(`position:fixed;inset:0;z-index:200;background:var(--bg);overflow-y:auto`)}>
      <div style={sx(`position:absolute;top:0;left:0;right:0;height:300px;background:linear-gradient(180deg,#edf3fe,rgba(237,243,254,0));pointer-events:none`)} />
      <div style={sx(`position:relative;min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 24px`)}>
        <div style={sx(`display:flex;align-items:center;gap:9px;margin-bottom:26px`)}>
          <div style={sx(`width:30px;height:30px;border-radius:9px;background:#17171a;display:flex;align-items:center;justify-content:center`)}>
            <div style={sx(`width:11px;height:11px;background:#fff;border-radius:2px;transform:rotate(45deg)`)} />
          </div>
          <div style={sx(`font-size:17px;font-weight:600;letter-spacing:-.01em`)}>
            {"EasyMCA"}
          </div>
        </div>
        <div style={sx(`width:min(400px,100%);background:var(--surface);border:1px solid var(--border);border-radius:14px;box-shadow:var(--shadow-lg);padding:28px`)}>
          {/* LOGIN */}
          {b.authLoginScreen ? <AuthLoginScreen2 b={b} /> : null}
          {/* SIGNUP: email */}
          {b.authSignupEmail ? <AuthSignupEmailView2 b={b} /> : null}
          {/* SIGNUP: verify */}
          {b.authSignupVerify ? (
            <>
              <a onClick={b.authBackToEmail} style={sx(`display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:500;color:var(--text3);cursor:pointer;margin-bottom:14px`)} data-hover="color:var(--text)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 6-6 6 6 6" />
                </svg>
                {"Back"}
              </a>
              <h1 style={sx(`font-size:19px;font-weight:600;margin:0 0 4px;letter-spacing:-.015em`)}>
                {"Check your email"}
              </h1>
              <p style={sx(`font-size:13px;color:var(--text3);margin:0 0 18px;line-height:1.5`)}>
                {"We sent a 6-digit code to "}
                <span style={sx(`color:var(--text);font-weight:500`)}>
                  {b.authEmail2}
                </span>
                {"."}
              </p>
              <input value={b.authCode} onInput={b.setAuthCode} onKeyDown={b.authCodeKey} inputMode="numeric" maxLength="6" placeholder="······" style={sx(`width:100%;text-align:center;font:600 21px var(--mono);letter-spacing:10px;border:1px solid var(--border2);background:var(--surface);border-radius:10px;padding:12px;color:var(--text);outline:none;margin-bottom:14px`)} data-focus="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg)" />
              {b.authError ? (
                <>
                  <div style={sx(`font-size:12.5px;color:var(--bad);background:var(--bad-bg);border-radius:8px;padding:8px 11px;margin-bottom:12px`)}>
                    {b.authError}
                  </div>
                </>
              ) : null}
              <button onClick={b.authVerify} style={sx(`width:100%;display:flex;align-items:center;justify-content:center;gap:9px;border:none;background:var(--accent);color:#fff;padding:10px;border-radius:9px;font-size:13.5px;font-weight:600;cursor:pointer`)} data-hover="background:var(--accent2)">
                {b.authBusyVerify ? (
                  <>
                    <span style={sx(`width:13px;height:13px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;flex:none`)} />
                  </>
                ) : null}
                {b.authVerifyLabel}
              </button>
              <div style={sx(`text-align:center;font-size:12.5px;color:var(--text3);margin-top:18px`)}>
                {"Didn’t get it? "}
                <a onClick={b.authResend} style={sx(`color:var(--accent);font-weight:500;cursor:pointer`)}>
                  {"Resend code"}
                </a>
              </div>
            </>
          ) : null}
          {/* SIGNUP: profile */}
          {b.authSignupProfile ? (
            <>
              <h1 style={sx(`font-size:19px;font-weight:600;margin:0 0 4px;letter-spacing:-.015em`)}>
                {"Set up your profile"}
              </h1>
              <p style={sx(`font-size:13px;color:var(--text3);margin:0 0 18px`)}>
                {"Last step — how you’ll appear to your team."}
              </p>
              <div style={sx(`margin-bottom:13px`)}>
                <label style={sx(`display:block;font-size:12px;font-weight:600;color:var(--text2);margin-bottom:6px`)}>
                  {"Full name"}
                </label>
                <input value={b.authName} onInput={b.setAuthName} onKeyDown={b.authCreateKey} placeholder="Jordan Reyes" style={sx(`width:100%;border:1px solid var(--border2);background:var(--surface);border-radius:9px;padding:9px 12px;font-size:13.5px;color:var(--text);outline:none`)} data-focus="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg)" />
              </div>
              <div style={sx(`margin-bottom:14px`)}>
                <label style={sx(`display:block;font-size:12px;font-weight:600;color:var(--text2);margin-bottom:6px`)}>
                  {"Password"}
                </label>
                <input type="password" value={b.authPw2} onInput={b.setAuthPw2} onKeyDown={b.authCreateKey} placeholder="8+ characters" style={sx(`width:100%;border:1px solid var(--border2);background:var(--surface);border-radius:9px;padding:9px 12px;font-size:13.5px;color:var(--text);outline:none`)} data-focus="border-color:#b9cdf5;box-shadow:0 0 0 3px var(--accent-bg)" />
              </div>
              {b.authError ? (
                <>
                  <div style={sx(`font-size:12.5px;color:var(--bad);background:var(--bad-bg);border-radius:8px;padding:8px 11px;margin-bottom:12px`)}>
                    {b.authError}
                  </div>
                </>
              ) : null}
              <button onClick={b.authCreate} style={sx(`width:100%;display:flex;align-items:center;justify-content:center;gap:9px;border:none;background:var(--accent);color:#fff;padding:10px;border-radius:9px;font-size:13.5px;font-weight:600;cursor:pointer`)} data-hover="background:var(--accent2)">
                {b.authBusyCreate ? (
                  <>
                    <span style={sx(`width:13px;height:13px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;flex:none`)} />
                  </>
                ) : null}
                {b.authCreateLabel}
              </button>
            </>
          ) : null}
        </div>
        <div style={sx(`margin-top:18px;font:500 11px var(--mono);color:var(--text3);background:var(--surface2);padding:5px 12px;border-radius:999px`)}>
          {"Demo workspace · any credentials work"}
        </div>
      </div>
      {/* simulated verification email */}
      {b.authMail ? (
        <>
          <div style={sx(`position:fixed;right:22px;bottom:22px;z-index:210;width:320px;background:#17171a;color:#fff;border-radius:13px;box-shadow:0 18px 48px rgba(0,0,0,.3);padding:15px 16px;animation:srcSlide .35s ease`)}>
            <div style={sx(`display:flex;align-items:center;gap:9px;margin-bottom:10px`)}>
              <div style={sx(`width:26px;height:26px;border-radius:7px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;flex:none`)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="m3.5 7 8.5 6 8.5-6" />
                </svg>
              </div>
              <div style={sx(`line-height:1.25;min-width:0`)}>
                <div style={sx(`font-size:12.5px;font-weight:600`)}>
                  {"EasyMCA — verification code"}
                </div>
                <div style={sx(`font-size:10.5px;color:rgba(255,255,255,.55)`)}>
                  {"verify@easymca.app · just now"}
                </div>
              </div>
            </div>
            <div style={sx(`display:flex;align-items:center;gap:10px`)}>
              <div style={sx(`font:600 20px var(--mono);letter-spacing:4px`)}>
                {"482916"}
              </div>
              <button onClick={b.authUseCode} style={sx(`margin-left:auto;border:none;background:var(--accent);color:#fff;padding:6px 12px;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer`)} data-hover="background:var(--accent2)">
                {"Use code"}
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
    </>
  );
}
