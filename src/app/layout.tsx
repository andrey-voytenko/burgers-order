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
          </Link>
          {', '}
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/vitaliy-lysenko-264530107/"
          >
            Vitaliy Lysenko
          </Link>
          {', '}
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/dmitry-lysenko-264207186/"
          >
            Dmitry Lysenko
          </Link>{' '}
          and friends
        </h4>
      </body>
      <Analytics />
    </html>
  );
}
