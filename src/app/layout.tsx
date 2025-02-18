import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      <SpeedInsights/>
    </html>
  )
}
