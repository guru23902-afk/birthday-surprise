import type { Metadata } from "next";
import "./globals.css";
import data from "@/config/data.json";

export const metadata: Metadata = {
  title: data.seo.title,
  description: data.seo.description,
  openGraph: {
    title: data.seo.title,
    description: data.seo.description,
    images: [{ url: data.seo.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: data.seo.title,
    description: data.seo.description,
    images: [data.seo.ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#f43f5e" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
