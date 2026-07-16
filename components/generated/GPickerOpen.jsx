import React from 'react';
import { sx } from '../../lib/sx';

export default function GPickerOpen({ b }) {
  return (
    <>
    <div onClick={b.closeGPicker} style={sx(`position:fixed;inset:0;z-index:120;background:rgba(23,23,21,.45);display:flex;align-items:center;justify-content:center;padding:5vh 24px;animation:msgIn .18s ease`)}>
      <div onClick={b.stop} style={sx(`width:min(400px,95vw);background:#fff;border-radius:14px;box-shadow:0 24px 64px rgba(0,0,0,.3);overflow:hidden`)}>
        <div style={sx(`display:flex;align-items:center;gap:7px;background:#f1f3f4;padding:8px 12px`)}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
            <rect x="4" y="10" width="16" height="11" rx="2.5" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          <span style={sx(`font-size:11px;color:#5f6368`)}>
            {"accounts.google.com"}
          </span>
          <button onClick={b.closeGPicker} style={sx(`margin-left:auto;width:22px;height:22px;border:none;background:transparent;color:#5f6368;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:6px`)} data-hover="background:#e3e5e8">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div style={sx(`padding:28px 30px 6px;text-align:center`)}>
          <svg width="26" height="26" viewBox="0 0 48 48" style={sx(`margin-bottom:12px`)}>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          <div style={sx(`font-size:17.5px;font-weight:500;color:#1f1f1f;margin-bottom:4px`)}>
            {"Choose an account"}
          </div>
          <div style={sx(`font-size:13px;color:#5f6368`)}>
            {"to continue to "}
            <span style={sx(`color:#1a73e8;font-weight:500`)}>
              {"EasyMCA"}
            </span>
          </div>
        </div>
        <div style={sx(`padding:16px 10px 4px`)}>
          {(b.gAccountRows || []).map((a, aI) => (
            <React.Fragment key={aI}>
              <button onClick={a.onPick} style={sx(`width:100%;display:flex;align-items:center;gap:13px;padding:11px 20px;border:none;background:transparent;cursor:pointer;text-align:left;border-radius:10px`)} data-hover="background:#f7f8f8">
                <div style={sx(`width:32px;height:32px;border-radius:50%;background:${a.ava};color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;flex:none`)}>
                  {a.initial}
                </div>
                <div style={sx(`flex:1;min-width:0;line-height:1.3`)}>
                  <div style={sx(`font-size:13.5px;font-weight:500;color:#1f1f1f`)}>
                    {a.name}
                  </div>
                  <div style={sx(`font-size:12px;color:#5f6368;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                    {a.email}
                  </div>
                </div>
                {a.isBusy ? (
                  <>
                    <span style={sx(`width:14px;height:14px;border:2px solid #dadce0;border-top-color:#1a73e8;border-radius:50%;animation:spin .7s linear infinite;flex:none`)} />
                  </>
                ) : null}
              </button>
            </React.Fragment>
          ))}
          {b.gPickerOtherClosed ? (
            <>
              <button onClick={b.gPickerUseOther} style={sx(`width:100%;display:flex;align-items:center;gap:13px;padding:11px 20px;border:none;background:transparent;cursor:pointer;text-align:left;border-radius:10px`)} data-hover="background:#f7f8f8">
                <div style={sx(`width:32px;height:32px;border-radius:50%;border:1.5px dashed #c4c7cd;display:flex;align-items:center;justify-content:center;flex:none`)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="3.2" />
                    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
                  </svg>
                </div>
                <div style={sx(`font-size:13.5px;font-weight:500;color:#1f1f1f`)}>
                  {"Use another account"}
                </div>
              </button>
            </>
          ) : null}
          {b.gPickerOtherOpen ? (
            <>
              <div style={sx(`display:flex;gap:8px;padding:6px 20px 10px`)}>
                <input value={b.gPickerEmail} onInput={b.setGPickerEmail} onKeyDown={b.gPickerOtherKey} type="email" placeholder="you@gmail.com" style={sx(`flex:1;min-width:0;border:1px solid #dadce0;border-radius:8px;padding:8px 12px;font-size:13px;color:#1f1f1f;outline:none`)} data-focus="border-color:#1a73e8;box-shadow:0 0 0 3px rgba(26,115,232,.12)" />
                <button onClick={b.gPickerOtherGo} style={sx(`display:flex;align-items:center;gap:7px;border:none;background:#1a73e8;color:#fff;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer`)} data-hover="background:#1667cf">
                  {b.gPickerOtherBusy ? (
                    <>
                      <span style={sx(`width:12px;height:12px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;flex:none`)} />
                    </>
                  ) : null}
                  {"Continue"}
                </button>
              </div>
            </>
          ) : null}
        </div>
        <div style={sx(`padding:14px 30px 20px;font-size:11.5px;color:#5f6368;line-height:1.55;border-top:1px solid #eee;margin-top:10px`)}>
          {"To continue, Google will share your name, email address, and profile picture with EasyMCA. EasyMCA requests "}
          <span style={sx(`font-weight:600;color:#1f1f1f`)}>
            {"read-only"}
          </span>
          {" Gmail access — revoke anytime at myaccount.google.com/permissions."}
        </div>
      </div>
    </div>
    </>
  );
}
