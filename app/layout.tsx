import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Toaster } from 'sonner'
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "Swiirl Pulse - AI-Powered Brand Community Chat",
  description: "Connect with your brand community through intelligent AI conversations. Personalized experiences powered by Swiirl Pulse.",
  keywords: ["AI chat", "brand community", "customer engagement", "Swiirl Connect"],
  authors: [{ name: "Swiirl" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
