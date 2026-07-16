# EasyMCA Platform — Next.js

Next.js conversion of the original single-file EasyMCA build (Claude-generated HTML). The full app — three personas (Marcus · broker, Diana · underwriter, Talia · funder), auth flow, home/ask composer, unified chat, underwriting & scrubbing workspaces, workflows canvas, agents + per-agent configuration, tasks, knowledge base, integrations (incl. real Gmail OAuth), renewals, funder fundability review, command palette (⌘K), notifications, and toasts — is preserved 1:1.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Project structure

```
app/
  layout.js             # Root layout — fonts (Geist / Geist Mono / Newsreader) + metadata
  globals.css           # Design tokens (CSS variables), keyframes, scrollbar, responsive helpers
  page.js               # Entry — mounts the client app (ssr disabled; app is fully interactive)
components/
  ClientApp.jsx         # Installs hover/focus style effects, renders AppLogic
  AppLogic.jsx          # All application state + behavior (React class component)
  generated/            # 43 view components (Root + 42 views/panels), one file each:
    Root.jsx            #   Shell: sidebar, topbar, view routing, overlays, toast
    HomeView.jsx        #   Home / ask composer
    UwView.jsx          #   Underwriting workspace (Diana)
    ScrubbingView.jsx   #   Scrubbing workspace
    IntakeView.jsx      #   Broker auto-intake pipeline + WhatsApp transcript
    FundabilityView.jsx #   Funder decision workspace (Talia)
    WfListView.jsx / WfCanvasView.jsx / WfHasInspectorView.jsx   # Workflows gallery + canvas
    AgentsView.jsx / AgentConfigView.jsx                          # Agent list + config
    KnowledgeView.jsx / KAddOpen.jsx                              # Knowledge base + add modal
    IntegrationsView.jsx / GmailShowSetupView.jsx / ...           # Integrations incl. Gmail OAuth
    AuthScreen.jsx / AuthLoginScreen.jsx / AuthSignupEmailView.jsx # Auth (login / signup / verify)
    PaletteOpen.jsx / OnboardOpen.jsx / GPickerOpen.jsx / ...     # Overlays & modals
lib/
  sx.js                 # css-string → React style object (cached) — keeps original styling 1:1
  dc-effects.js         # data-hover / data-focus / data-focus-within runtime (hover & focus styles)
```

## How views receive data

`AppLogic.jsx` holds all state and computes a bindings object in `renderVals()`.
Every generated component receives it as the `b` prop:

```jsx
export default function HomeView({ b }) { ... {b.greeting} ... onClick={b.newChat} ... }
```

This mirrors the original architecture exactly, so all behavior (personas, agent
runs, typing simulations, palette, autonomy settings persisted to localStorage,
etc.) works unchanged.

## Styling

The original design system is fully custom (no component framework), built on
CSS variables in `app/globals.css` plus per-element inline styles. Those are
preserved verbatim via the `sx()` helper, so the UI is pixel-identical to the
source. Hover/focus states from the original `style-hover` / `style-focus`
attributes are applied at runtime by `lib/dc-effects.js`.

If you want to migrate to Tailwind or shadcn/ui later, do it view-by-view —
each file in `components/generated/` is independent.

## Gmail integration (optional)

The Integrations page includes a real Google OAuth flow (Google Identity
Services, `gmail.readonly` scope). To use it, create an OAuth Client ID in
Google Cloud Console (Web application, your origin in Authorized JavaScript
origins) and paste it into the Gmail setup screen in the app. Without a client
ID, the app falls back to a simulated account chooser.

## Notes

- The app is client-only (`ssr: false`) because it relies on keyboard
  shortcuts, localStorage, timers, and OAuth — there is no server data layer.
- React 18 / Next 14 App Router, JavaScript (no TypeScript). Path alias `@/*`
  is configured in `jsconfig.json`..
