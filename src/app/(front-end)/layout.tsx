import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { SessionProvider } from 'next-auth/react';
import QueryClientProvider from '@/provider/query-provider';
import { auth } from '@/lib/auth';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import Sidebar from '@/components/Layout/Sidebar';
import { Toaster } from '@/components/ui/toaster';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Reservify: Boardmart's Event Place Reservation System",
  description: "Reserve your event place at Boardmart powered by Reservify App!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <QueryClientProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              {children}
              <Toaster />
              <Footer />
            </div>
            
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
