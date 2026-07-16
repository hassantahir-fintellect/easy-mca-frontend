import React from 'react';
import { sx } from '../../lib/sx';
import HomeView from './HomeView';
import UwView from './UwView';
import ScrubbingView from './ScrubbingView';
import RenewalsView from './RenewalsView';
import ShowSourcePromptView from './ShowSourcePromptView';
import ChatEmptyView from './ChatEmptyView';
import ChatActiveView from './ChatActiveView';
import AgentsView from './AgentsView';
import TasksView from './TasksView';
import KnowledgeView from './KnowledgeView';
import ConversationsView from './ConversationsView';
import IntegrationsView from './IntegrationsView';
import IntakeView from './IntakeView';
import FundedView from './FundedView';
import FundabilityView from './FundabilityView';
import AgentConfigView from './AgentConfigView';
import WfListView from './WfListView';
import WfHasInspectorView from './WfHasInspectorView';
import WfCanvasView from './WfCanvasView';
import PaletteOpen from './PaletteOpen';
import ReviewOpen from './ReviewOpen';
import PopupIsResolutionView from './PopupIsResolutionView';
import ScrubPopupView from './ScrubPopupView';
import SrcPanelOpen from './SrcPanelOpen';
import ForgedReviewOpen from './ForgedReviewOpen';
import ScrubOcrOpen from './ScrubOcrOpen';
import IntPickerOpen from './IntPickerOpen';
import GmailShowSetupView from './GmailShowSetupView';
import GmailShowDetailView from './GmailShowDetailView';
import ItThreadsStepView from './ItThreadsStepView';
import ItDocsStepView from './ItDocsStepView';
import KAddOpen from './KAddOpen';
import OnboardOpen from './OnboardOpen';
import AuthLoginScreen from './AuthLoginScreen';
import AuthSignupEmailView from './AuthSignupEmailView';
import AuthScreen from './AuthScreen';
import GPickerOpen from './GPickerOpen';

export default function Root({ b }) {
  return (
    <>
    <div style={sx(`height:100vh;display:flex;overflow:hidden;background:var(--bg);position:relative`)}>
      {/* ============ SIDEBAR ============ */}
      {b.sidebarOpen ? (
        <div className="sidebar-backdrop" onClick={b.closeSidebar} />
      ) : null}
      <aside className={b.sidebarOpen ? 'app-sidebar open' : 'app-sidebar'} style={sx(`width:232px;flex:none;background:var(--side-bg);border-right:1px solid var(--side-border);display:flex;flex-direction:column;padding:10px 10px 12px;position:relative;z-index:1;overflow-y:auto;overflow-x:hidden`)}>
        <div style={sx(`display:flex;align-items:center;gap:8px;padding:4px 6px 12px`)}>
          <div style={sx(`width:24px;height:24px;border-radius:7px;background:#17171a;display:flex;align-items:center;justify-content:center;flex:none`)}>
            <div style={sx(`width:9px;height:9px;background:#fff;border-radius:1.5px;transform:rotate(45deg)`)} />
          </div>
          <div style={sx(`font-size:13.5px;font-weight:600;letter-spacing:-.01em;color:var(--text)`)}>
            {"EasyMCA"}
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--side-dim)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
          <button className="sidebar-close" onClick={b.closeSidebar} title="Close menu" style={sx(`margin-left:auto;width:26px;height:26px;border-radius:7px;border:none;background:transparent;color:var(--side-dim);cursor:pointer;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--side-active-bg);color:var(--text)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <button onClick={b.openPalette} style={sx(`display:flex;align-items:center;gap:8px;width:100%;border:1px solid var(--border);background:var(--surface);color:var(--side-text);padding:7px 9px;border-radius:8px;font-size:12.5px;font-weight:500;cursor:pointer;box-shadow:var(--shadow);margin-bottom:6px;text-align:left`)} data-hover="color:var(--text);border-color:var(--border2)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={sx(`flex:none`)}>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
          <span>
            {"Quick actions"}
          </span>
          <span style={sx(`margin-left:auto;font:500 10.5px var(--mono);color:var(--side-dim)`)}>
            {"⌘K"}
          </span>
        </button>
        <button onClick={b.newChat} style={sx(`display:flex;align-items:center;gap:8px;width:100%;border:1px solid var(--border);background:var(--surface);color:var(--text);padding:7px 9px;border-radius:8px;font-size:12.5px;font-weight:500;cursor:pointer;box-shadow:var(--shadow);margin-bottom:12px;text-align:left`)} data-hover="background:var(--surface2)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" style={sx(`flex:none`)}>
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>
            {"New conversation"}
          </span>
        </button>
        <nav style={sx(`display:flex;flex-direction:column;gap:1px`)}>
          <a onClick={b.goHome} style={sx(`${b.navHome}`)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V20h14V9.5" />
            </svg>
            {"Home"}
          </a>
          <a onClick={b.goConversations} style={sx(`${b.navConversations}`)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
              <path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6.1A8.5 8.5 0 1 1 21 11.5Z" />
            </svg>
            {"Conversations"}
          </a>
          <a onClick={b.goAgents} style={sx(`${b.navAgents}`)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
            </svg>
            {"Agents"}
          </a>
          <a onClick={b.goTasks} style={sx(`${b.navTasks}`)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
              <path d="M9 11l2 2 4-4" />
              <rect x="4" y="4" width="16" height="16" rx="3.5" />
            </svg>
            {"Tasks"}
            <span style={sx(`margin-left:auto;font:600 10px var(--mono);background:var(--side-active-bg);color:var(--side-text);padding:1px 6px;border-radius:10px`)}>
              {"3"}
            </span>
          </a>
          <a onClick={b.goWorkflows} style={sx(`${b.navWorkflows}`)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
              <circle cx="6" cy="6" r="2.4" />
              <circle cx="18" cy="18" r="2.4" />
              <path d="M8.4 6H15a3 3 0 0 1 3 3v6.6" />
            </svg>
            {"Workflows"}
          </a>
        </nav>
        <div style={sx(`font-size:10.5px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--side-dim);padding:18px 8px 5px`)}>
          {"Workspace"}
        </div>
        <nav style={sx(`display:flex;flex-direction:column;gap:1px`)}>
          <a onClick={b.goKnowledge} style={sx(`${b.navKnowledge}`)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15.5H6.5A2.5 2.5 0 0 0 4 21Z" />
              <path d="M4 18.5V21" />
            </svg>
            {"Knowledge"}
          </a>
          <a onClick={b.goIntegrations} style={sx(`${b.navIntegrations}`)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
              <path d="M10 7 7 4 3 8l3 3" />
              <path d="m14 17 3 3 4-4-3-3" />
              <path d="M8 13 13 8m-2 8 5-5" />
            </svg>
            {"Integrations"}
          </a>
          <a onClick={b.goOrganizations} style={sx(`${b.navOrganizations}`)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
              <rect x="4" y="9" width="16" height="11" rx="2" />
              <path d="M9 9V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V9" />
            </svg>
            {"Organizations"}
          </a>
          <a onClick={b.goSettings} style={sx(`${b.navSettings}`)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={sx(`flex:none`)}>
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1A2 2 0 1 1 7.1 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1Z" />
            </svg>
            {"Settings"}
          </a>
        </nav>
        <div style={sx(`margin-top:auto;padding-top:18px`)}>
          <div style={sx(`font-size:10.5px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--side-dim);padding:0 8px 5px`)}>
            {"View as"}
          </div>
          <div style={sx(`display:flex;flex-direction:column;gap:1px;margin-bottom:12px`)}>
            <button onClick={b.pickMarcus} style={sx(`${b.psMarcusStyle}`)}>
              <span style={sx(`${b.psMarcusAva}`)}>
                {"MV"}
              </span>
              <div style={sx(`line-height:1.2;min-width:0;flex:1`)}>
                <div style={sx(`font-weight:500;color:inherit`)}>
                  {"Marcus Vega"}
                </div>
                <div style={sx(`font-size:10.5px;color:var(--side-dim);font-weight:400`)}>
                  {"Broker · Vega Capital"}
                </div>
              </div>
              {b.personaMarcus ? (
                <>
                  <span style={sx(`width:6px;height:6px;border-radius:50%;background:var(--accent);flex:none`)} />
                </>
              ) : null}
            </button>
            <button onClick={b.pickDiana} style={sx(`${b.psDianaStyle}`)}>
              <span style={sx(`${b.psDianaAva}`)}>
                {"DK"}
              </span>
              <div style={sx(`line-height:1.2;min-width:0;flex:1`)}>
                <div style={sx(`font-weight:500;color:inherit`)}>
                  {"Diana Koenig"}
                </div>
                <div style={sx(`font-size:10.5px;color:var(--side-dim);font-weight:400`)}>
                  {"Underwriter · Northbridge"}
                </div>
              </div>
              {b.personaDiana ? (
                <>
                  <span style={sx(`width:6px;height:6px;border-radius:50%;background:var(--accent);flex:none`)} />
                </>
              ) : null}
            </button>
            <button onClick={b.pickTalia} style={sx(`${b.psTaliaStyle}`)}>
              <span style={sx(`${b.psTaliaAva}`)}>
                {"TB"}
              </span>
              <div style={sx(`line-height:1.2;min-width:0;flex:1`)}>
                <div style={sx(`font-weight:500;color:inherit`)}>
                  {"Talia Brooks"}
                </div>
                <div style={sx(`font-size:10.5px;color:var(--side-dim);font-weight:400`)}>
                  {"Funder · Pinnacle Advance"}
                </div>
              </div>
              {b.personaTalia ? (
                <>
                  <span style={sx(`width:6px;height:6px;border-radius:50%;background:var(--accent);flex:none`)} />
                </>
              ) : null}
            </button>
          </div>
          <div style={sx(`border-top:1px solid var(--side-border);padding-top:11px;display:flex;align-items:center;gap:9px`)}>
            <div style={sx(`width:28px;height:28px;border-radius:50%;background:${b.userAvaBg};color:${b.userAvaColor};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex:none`)}>
              {b.userInitials}
            </div>
            <div style={sx(`line-height:1.2;min-width:0`)}>
              <div style={sx(`font-size:12.5px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text)`)}>
                {b.userName}
              </div>
              <div style={sx(`font-size:10.5px;color:var(--side-dim)`)}>
                {b.userRole}
              </div>
            </div>
            <button onClick={b.signOut} title="Sign out" style={sx(`margin-left:auto;flex:none;width:28px;height:28px;border-radius:7px;border:none;background:transparent;color:var(--side-dim);cursor:pointer;display:flex;align-items:center;justify-content:center`)} data-hover="background:var(--side-active-bg);color:var(--text)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="m16 17 5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
      {/* ============ MAIN ============ */}
      <main style={sx(`flex:1;min-width:0;display:flex;flex-direction:column;overflow:hidden;position:relative;z-index:1`)}>
        {/* GLOBAL TOPBAR */}
        <header style={sx(`height:46px;flex:none;border-bottom:1px solid var(--border);background:var(--surface);display:flex;align-items:center;gap:8px;padding:0 16px`)}>
          <button className="sidebar-toggle" onClick={b.toggleSidebar} title="Menu" style={sx(`width:32px;height:32px;margin-left:-6px;border-radius:7px;border:none;background:transparent;color:var(--text2);cursor:pointer;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--surface2);color:var(--text)">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div style={sx(`font-size:13px;font-weight:600;letter-spacing:-.005em;color:var(--text)`)}>
            {b.topbarTitle}
          </div>
          <div style={sx(`margin-left:auto;display:flex;align-items:center;gap:2px`)}>
            <button style={sx(`display:flex;align-items:center;gap:6px;border:none;background:transparent;color:var(--text2);font-size:12.5px;font-weight:500;padding:6px 9px;border-radius:7px;cursor:pointer`)} data-hover="background:var(--surface2);color:var(--text)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.4-3 4" />
                <path d="M12 17.5h.01" />
              </svg>
              {"Help"}
            </button>
            <button style={sx(`position:relative;width:32px;height:32px;border-radius:7px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center`)} data-hover="background:var(--surface2)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6.1A8.5 8.5 0 1 1 21 11.5Z" />
              </svg>
              <span style={sx(`position:absolute;top:5px;right:5px;min-width:13px;height:13px;border-radius:8px;background:#17171a;color:#fff;font:600 8.5px var(--mono);display:flex;align-items:center;justify-content:center;padding:0 3px`)}>
                {"7"}
              </span>
            </button>
            <button onClick={b.toggleNotifs} style={sx(`position:relative;width:32px;height:32px;border-radius:7px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center`)} data-hover="background:var(--surface2)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.7 21a2 2 0 0 1-3.4 0" />
              </svg>
              {b.hasUnreadNotifs ? (
                <>
                  <span style={sx(`position:absolute;top:6px;right:7px;width:6px;height:6px;border-radius:50%;background:var(--bad);border:1.5px solid var(--surface)`)} />
                </>
              ) : null}
            </button>
            <div style={sx(`width:26px;height:26px;border-radius:50%;background:${b.userAvaBg};color:${b.userAvaColor};display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:600;margin-left:6px`)}>
              {b.userInitials}
            </div>
          </div>
        </header>
        {/* NOTIFICATIONS PANEL */}
        {b.notifOpen ? (
          <>
            <div onClick={b.closeNotifs} style={sx(`position:fixed;inset:0;z-index:70`)} />
            <div style={sx(`position:fixed;top:50px;right:14px;z-index:71;width:min(366px,92vw);background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 18px 48px rgba(16,15,13,.2);overflow:hidden;animation:msgIn .16s ease both`)}>
              <div style={sx(`display:flex;align-items:center;gap:8px;padding:12px 15px;border-bottom:1px solid var(--border)`)}>
                <span style={sx(`font-size:13px;font-weight:600`)}>
                  {"Notifications"}
                </span>
                <span style={sx(`flex:1`)} />
                <button onClick={b.markAllNotifsRead} style={sx(`border:none;background:transparent;color:var(--accent);font-size:12px;font-weight:500;cursor:pointer;padding:3px 5px;border-radius:6px`)} data-hover="background:var(--accent-bg)">
                  {"Mark all read"}
                </button>
              </div>
              <div style={sx(`max-height:60vh;overflow-y:auto`)}>
                {(b.notifList || []).map((n, nI) => (
                  <React.Fragment key={nI}>
                    <button onClick={n.onClick} style={sx(`${n.rowStyle}`)} data-hover="filter:brightness(.985)">
                      <span style={sx(`${n.dotStyle}`)} />
                      <span style={sx(`${n.monoStyle}`)}>
                        {n.mono}
                      </span>
                      <span style={sx(`flex:1;min-width:0`)}>
                        <span style={sx(`display:block;font-size:12.5px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                          {n.title}
                        </span>
                        <span style={sx(`display:block;font-size:11.5px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                          {n.sub}
                        </span>
                      </span>
                      <span style={sx(`font:500 10.5px var(--mono);color:var(--text3);flex:none;align-self:flex-start;margin-top:1px`)}>
                        {n.time}
                      </span>
                    </button>
                  </React.Fragment>
                ))}
              </div>
              {b.notifEmpty ? (
                <>
                  <div style={sx(`padding:22px;text-align:center;font-size:12.5px;color:var(--text3)`)}>
                    {"You’re all caught up."}
                  </div>
                </>
              ) : null}
            </div>
          </>
        ) : null}
        {/* HOME */}
        {b.isHome ? <HomeView b={b} /> : null}
        {/* UNDERWRITING WORKSPACE */}
        {b.isUw ? <UwView b={b} /> : null}
        {/* SCRUBBING WORKSPACE (Marcus) */}
        {b.isScrubbing ? <ScrubbingView b={b} /> : null}
        {/* RENEWALS (Marcus) */}
        {b.isRenewals ? <RenewalsView b={b} /> : null}
        {/* UNIFIED CHAT */}
        {b.isChat ? (
          <>
            <div data-screen-label="Conversation" style={sx(`flex:1;display:flex;flex-direction:column;min-height:0;background:var(--surface)`)}>
              {/* header */}
              <div className="hdr-resp" style={sx(`height:46px;flex:none;padding:0 20px;border-bottom:1px solid var(--border);background:var(--surface);display:flex;align-items:center;gap:12px`)}>
                <h1 style={sx(`font-size:13px;font-weight:600;margin:0;color:var(--text)`)}>
                  {b.chatTitle}
                </h1>
                <div style={sx(`margin-left:auto;display:flex;gap:2px;background:var(--surface2);border-radius:8px;padding:2px`)}>
                  {(b.agentPills || []).map((p, pI) => (
                    <React.Fragment key={pI}>
                      <button onClick={p.onClick} style={sx(`${p.style}`)}>
                        {p.name}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
                <button onClick={b.newChat} style={sx(`display:flex;align-items:center;gap:6px;border:1px solid var(--border);background:var(--surface);color:var(--text2);padding:6px 11px;border-radius:8px;font-size:12.5px;font-weight:500;cursor:pointer`)} data-hover="background:var(--surface2);color:var(--text)">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  {"New"}
                </button>
              </div>
              {/* EMPTY / HERO */}
              {b.chatEmpty ? <ChatEmptyView b={b} /> : null}
              {/* ACTIVE THREAD */}
              {b.chatActive ? <ChatActiveView b={b} /> : null}
            </div>
          </>
        ) : null}
        {/* AGENTS */}
        {b.isAgents ? <AgentsView b={b} /> : null}
        {/* TASKS */}
        {b.isTasks ? <TasksView b={b} /> : null}
        {/* KNOWLEDGE */}
        {b.isKnowledge ? <KnowledgeView b={b} /> : null}
        {/* CONVERSATIONS */}
        {b.isConversations ? <ConversationsView b={b} /> : null}
        {/* INTEGRATIONS */}
        {b.isIntegrations ? <IntegrationsView b={b} /> : null}
        {/* BROKER AUTO-INTAKE PIPELINE (Marcus) */}
        {b.isIntake ? <IntakeView b={b} /> : null}
        {/* FUNDER FUNDABILITY (Talia) */}
        {b.isFundability ? <FundabilityView b={b} /> : null}
        {/* AGENT CONFIGURATION + PROMPT MANAGEMENT */}
        {b.isAgentConfig ? <AgentConfigView b={b} /> : null}
        {/* WORKFLOWS */}
        {b.isWorkflows ? (
          <>
            {/* LIST / GALLERY */}
            {b.isWfList ? <WfListView b={b} /> : null}
            {/* CANVAS / WORKSPACE */}
            {b.isWfCanvas ? <WfCanvasView b={b} /> : null}
          </>
        ) : null}
        {/* GENERIC */}
        {b.isGeneric ? (
          <>
            <div style={sx(`flex:1;display:flex;align-items:center;justify-content:center`)}>
              <div style={sx(`text-align:center;max-width:420px;padding:40px`)}>
                <div style={sx(`width:46px;height:46px;border-radius:12px;background:var(--surface2);display:flex;align-items:center;justify-content:center;margin:0 auto 18px`)}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="6" cy="6" r="2.4" />
                    <circle cx="18" cy="18" r="2.4" />
                    <path d="M8.4 6H15a3 3 0 0 1 3 3v6.6" />
                  </svg>
                </div>
                <h1 style={sx(`font-size:20px;font-weight:600;margin:0 0 8px`)}>
                  {b.genericTitle}
                </h1>
                <p style={sx(`font-size:14px;color:var(--text2);line-height:1.6;margin:0`)}>
                  {b.genericBody}
                </p>
              </div>
            </div>
          </>
        ) : null}
      </main>
      {/* TOAST */}
      {b.toast ? (
        <>
          <div style={sx(`position:fixed;bottom:26px;left:50%;transform:translateX(-50%);background:#17171a;color:#fff;padding:11px 16px;border-radius:10px;box-shadow:0 12px 34px rgba(0,0,0,.24);display:flex;align-items:center;gap:11px;z-index:60;animation:msgIn .3s ease both`)}>
            <span style={sx(`width:20px;height:20px;border-radius:50%;background:var(--ok);display:flex;align-items:center;justify-content:center;flex:none`)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span style={sx(`font-size:13px;font-weight:500`)}>
              {b.toast}
            </span>
            {b.toastCtaLabel ? (
              <>
                <button onClick={b.toastCtaClick} style={sx(`margin-left:4px;flex:none;border:none;background:var(--accent);color:#fff;padding:6px 13px;border-radius:7px;font-size:12.5px;font-weight:600;cursor:pointer`)} data-hover="background:var(--accent2)">
                  {b.toastCtaLabel}
                </button>
              </>
            ) : null}
          </div>
        </>
      ) : null}
      {/* TASK SNACKBAR (top, after source integration) */}
      {b.taskSnack ? (
        <>
          <div style={sx(`position:fixed;top:58px;left:50%;transform:translateX(-50%);z-index:75;width:min(560px,92vw);background:#17171a;color:#fff;border-radius:12px;box-shadow:0 18px 48px rgba(0,0,0,.28);padding:12px 14px;display:flex;align-items:center;gap:12px;animation:msgIn .25s ease both`)}>
            <span style={sx(`width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;flex:none`)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <rect x="8" y="2" width="8" height="4" rx="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="m9 14 2 2 4-4" />
              </svg>
            </span>
            <span style={sx(`flex:1;min-width:0`)}>
              <span style={sx(`display:block;font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                {b.taskSnackTitle}
              </span>
              <span style={sx(`display:block;font-size:11.5px;color:rgba(255,255,255,.6);white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
                {b.taskSnackSub}
              </span>
            </span>
            <button onClick={b.openTaskSnack} style={sx(`flex:none;border:none;background:var(--accent);color:#fff;padding:7px 14px;border-radius:8px;font-size:12.5px;font-weight:600;cursor:pointer`)} data-hover="background:var(--accent2)">
              {"Open task"}
            </button>
            <button onClick={b.dismissTaskSnack} title="Dismiss" style={sx(`flex:none;width:26px;height:26px;border:none;background:transparent;color:rgba(255,255,255,.55);cursor:pointer;border-radius:6px;display:flex;align-items:center;justify-content:center`)} data-hover="background:rgba(255,255,255,.1);color:#fff">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </>
      ) : null}
      {/* COMMAND PALETTE */}
      {b.paletteOpen ? <PaletteOpen b={b} /> : null}
      {/* MANUAL DOCUMENT REVIEW */}
      {b.reviewOpen ? <ReviewOpen b={b} /> : null}
      {/* SCRUB SOURCE POPUPS (deposit source / negative days / resolution letter) */}
      {b.scrubPopup ? <ScrubPopupView b={b} /> : null}
      {/* SOURCES & EDIT INSPECTOR DRAWER (right-side slide-over, split panes) */}
      {b.srcPanelOpen ? <SrcPanelOpen b={b} /> : null}
      {/* FORGED-DOCUMENT REVIEW (Marcus) */}
      {b.forgedReviewOpen ? <ForgedReviewOpen b={b} /> : null}
      {/* OCR LOW-CONFIDENCE MANUAL REVIEW (Marcus) */}
      {b.scrubOcrOpen ? <ScrubOcrOpen b={b} /> : null}
    </div>
    {/* ADD INTEGRATION PICKER */}
    {b.intPickerOpen ? <IntPickerOpen b={b} /> : null}
    {/* GMAIL INTEGRATION — REAL GOOGLE OAUTH */}
    {b.gmailOpen ? (
      <>
        <div onClick={b.closeGmail} style={sx(`position:fixed;inset:0;z-index:85;background:rgba(23,23,21,.4);display:flex;align-items:center;justify-content:center;padding:4vh 24px;animation:msgIn .16s ease both`)}>
          <div onClick={b.stop} style={sx(`width:min(540px,95vw);max-height:92vh;background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 24px 64px rgba(16,15,13,.18);overflow:hidden;display:flex;flex-direction:column`)}>
            <div style={sx(`padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:11px;flex:none`)}>
              <div style={sx(`width:34px;height:34px;border-radius:9px;background:#fff;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex:none`)}>
                <svg width="19" height="14" viewBox="0 0 48 36">
                  <path fill="#4285F4" d="M3.4 36h6.8V19.5L0 11.8v20.8C0 34.5 1.5 36 3.4 36z" />
                  <path fill="#34A853" d="M37.8 36h6.8c1.9 0 3.4-1.5 3.4-3.4V11.8l-10.2 7.7z" />
                  <path fill="#FBBC04" d="M37.8 5.6v13.9L48 11.8V7.3c0-4.2-4.8-6.6-8.2-4.1z" />
                  <path fill="#EA4335" d="M10.2 19.5V5.6L24 16 37.8 5.6v13.9L24 29.9z" />
                  <path fill="#C5221F" d="M0 7.3v4.5l10.2 7.7V5.6L8.2 3.2C4.8.7 0 3.1 0 7.3z" />
                </svg>
              </div>
              <div style={sx(`flex:1;min-width:0`)}>
                <div style={sx(`font-size:14.5px;font-weight:600`)}>
                  {"Gmail"}
                </div>
                <div style={sx(`font-size:12px;color:var(--text3)`)}>
                  {"Google OAuth 2.0 · read-only · runs in your browser"}
                </div>
              </div>
              <button onClick={b.closeGmail} style={sx(`width:32px;height:32px;border-radius:8px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--surface2)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div style={sx(`padding:20px;overflow-y:auto;overflow-x:hidden`)}>
              {b.gmailShowSetup ? <GmailShowSetupView b={b} /> : null}
              {b.gmailShowDetail ? <GmailShowDetailView b={b} /> : null}
            </div>
          </div>
        </div>
      </>
    ) : null}
    {/* INTAKE CONFIRM TASK — pick documents from Gmail */}
    {b.intakeTaskOpen ? (
      <>
        <div onClick={b.closeIntakeTask} style={sx(`position:fixed;inset:0;z-index:85;background:rgba(23,23,21,.4);display:flex;align-items:center;justify-content:center;padding:4vh 24px;animation:msgIn .16s ease both`)}>
          <div onClick={b.stop} style={sx(`width:min(640px,95vw);max-height:90vh;background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:0 24px 64px rgba(16,15,13,.18);overflow:hidden;display:flex;flex-direction:column`)}>
            <div style={sx(`padding:15px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:11px;flex:none`)}>
              <div style={sx(`width:32px;height:32px;border-radius:9px;background:var(--accent-bg);color:var(--accent);display:flex;align-items:center;justify-content:center;font:600 12px var(--mono);flex:none`)}>
                {"Ci"}
              </div>
              <div style={sx(`flex:1;min-width:0`)}>
                <div style={sx(`font-size:14.5px;font-weight:600`)}>
                  {"Confirm documents to intake"}
                </div>
                <div style={sx(`font-size:12px;color:var(--text3)`)}>
                  {b.itSubtitle}
                </div>
              </div>
              <button onClick={b.closeIntakeTask} style={sx(`width:32px;height:32px;border-radius:8px;border:1px solid var(--border2);background:var(--surface);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none`)} data-hover="background:var(--surface2)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {b.itThreadsStep ? <ItThreadsStepView b={b} /> : null}
            {b.itDocsStep ? <ItDocsStepView b={b} /> : null}
          </div>
        </div>
      </>
    ) : null}
    {/* ===== ADD KNOWLEDGE (intent-first) ===== */}
    {b.kAddOpen ? <KAddOpen b={b} /> : null}
    {/* ===== SOURCE ONBOARDING (after sign up) ===== */}
    {b.onboardOpen ? <OnboardOpen b={b} /> : null}
    {/* ===== AUTH (sign in / sign up / verify) ===== */}
    {b.isAuthScreen ? <AuthScreen b={b} /> : null}
    {/* ===== SIMULATED GOOGLE ACCOUNT CHOOSER ===== */}
    {b.gPickerOpen ? <GPickerOpen b={b} /> : null}
    </>
  );
}
