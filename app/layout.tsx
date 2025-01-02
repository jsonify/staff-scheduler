// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from 'next'
import "./globals.css";
import { AuthProvider } from '@/app/components/auth/AuthProvider';
import Navbar from '@/app/components/layout/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'ParaEducator Calendar',
  description: 'Calendar system for managing paraeducator assignments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}