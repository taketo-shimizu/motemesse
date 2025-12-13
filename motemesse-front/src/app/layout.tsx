import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BaseDataProvider from "@/components/BaseDataProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "モテメッセ - AIが恋愛メッセージを作成するアプリ",
  description: "モテメッセは、AIが恋愛シーンに最適なメッセージを作成するアプリです。デートの誘い、告白、関係を深めるメッセージなど、あなたの恋愛をサポートします。",
  keywords: "モテメッセ,恋愛メッセージ,AI恋愛,デート誘い方,告白メッセージ,恋愛サポート,モテる方法,恋愛アプリ",
  openGraph: {
    title: "モテメッセ - AIが恋愛メッセージを作成するアプリ",
    description: "AIがあなたの恋愛をサポート。最適なメッセージで成功率アップ！",
    url: "https://motemesse.vercel.app",
    siteName: "モテメッセ",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "モテメッセ - AIが恋愛メッセージを作成するアプリ",
    description: "AIがあなたの恋愛をサポート。最適なメッセージで成功率アップ！",
  },
  alternates: {
    canonical: "https://motemesse.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "354f1c546edff422", // Google Search Console認証コード
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = 'G-G1GVJE6HFQ';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "モテメッセ",
    "description": "AIが恋愛シーンに最適なメッセージを作成するアプリです。デートの誘い、告白、関係を深めるメッセージなど、あなたの恋愛をサポートします。",
    "url": "https://motemesse.vercel.app",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JPY"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": "100"
    }
  };

  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
        <BaseDataProvider>
          {children}
        </BaseDataProvider>
      </body>
    </html>
  );
}
