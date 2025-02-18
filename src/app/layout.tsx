import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import { Analytics } from '@vercel/analytics/vue';

export const metadata: Metadata = {
  title: 'Burgers order app',
  description: 'Web application for burgers ordering',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics/>
    </html>
  )
}
