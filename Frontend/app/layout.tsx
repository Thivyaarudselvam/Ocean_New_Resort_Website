import React from "react"
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ocean View Resort - Room Reservation System',
  description: 'Experience luxury at Ocean View Resort. Book your perfect getaway with our easy-to-use room reservation system.',
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
