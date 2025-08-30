import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Toaster } from 'sonner'
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "Swiirl - Market with communities, not to them.",
  description: "Connect with your brand community through intelligent AI conversations. Personalized experiences powered by Swiirl Pulse.",
  keywords: ["AI chat", "brand community", "customer engagement", "Swiirl Connect"],
  authors: [{ name: "Swiirl" }],
  openGraph: {
    title: "Swiirl - Market with communities, not to them.",
    description: "Connect with your brand community through intelligent AI conversations. Personalized experiences powered by Swiirl Pulse.",
    url: "https://swiirl-pulse.vercel.app/",

    siteName: "Swiirl",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Swiirl - Market with communities, not to them.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swiirl - Market with communities, not to them.",
    description: "Connect with your brand community through intelligent AI conversations. Personalized experiences powered by Swiirl Pulse.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://swiirl.io",
  },
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
