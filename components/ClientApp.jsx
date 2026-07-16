'use client';
import { useEffect } from 'react';
import AppLogic from './AppLogic';
import { installDcEffects } from '@/lib/dc-effects';
import QueryProvider from './QueryProvider';

export default function ClientApp() {
  useEffect(() => installDcEffects(document), []);
  return (
    <QueryProvider>
      <AppLogic />
    </QueryProvider>
  );
}
