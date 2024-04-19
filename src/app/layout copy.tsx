import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { ToasterProviders } from '@/lib/providers';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Salsa Calendar',
    template: '%s | Salsa Calendar',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="grid grid-cols-[auto,1fr]">
            <Sidebar />
            <div className="col-span-2">
              <ToasterProviders>{children}</ToasterProviders>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
