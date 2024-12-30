import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from 'next'
import "./globals.css";
import { AuthProvider } from '@/app/components/auth/AuthProvider';

interface RootLayoutProps {
  children: React.ReactNode
 }

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
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
