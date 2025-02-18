import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Burgers order app',
  description: 'Web application for burgers ordering',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <h4 className="text-center text-xs">
          Developed by{' '}
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/voitenko-developer/"
          >
            Andrii Voitenko
          </Link>{' '}
          and friends
        </h4>
      </body>
      <Analytics />
    </html>
  );
}
