'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export function NextUIProviders({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export function ToasterProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  );
}
