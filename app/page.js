'use client';
import dynamic from 'next/dynamic';

// The app is a fully client-side interactive workspace (keyboard shortcuts,
// localStorage, Google OAuth) — render client-only to avoid hydration drift.
const App = dynamic(() => import('@/components/ClientApp'), { ssr: false });

export default function Page() {
  return <App />;
}
