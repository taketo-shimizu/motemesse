import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "モテメッセ - AIが恋愛メッセージを作成するアプリ",
  description: "モテメッセは、AIが恋愛シーンに最適なメッセージを作成するアプリです。デートの誘い、告白、関係を深めるメッセージなど、あなたの恋愛をサポートします。",
  keywords: "モテメッセ,恋愛メッセージ,AI恋愛,デート誘い方,告白メッセージ,恋愛サポート,モテる方法,恋愛アプリ",
  openGraph: {
    title: "モテメッセ - AIが恋愛メッセージを作成するアプリ",
    description: "AIがあなたの恋愛をサポート。最適なメッセージで成功率アップ！",
    url: "https://motemesse.vercel.app/chat",
    siteName: "モテメッセ",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "https://motemesse.vercel.app/logo.png",
        width: 1536,
        height: 1024,
        alt: "モテメッセ - AIが恋愛メッセージを作成するアプリ",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "モテメッセ - AIが恋愛メッセージを作成するアプリ",
    description: "AIがあなたの恋愛をサポート。最適なメッセージで成功率アップ！",
    images: ["https://motemesse.vercel.app/logo.png"],
  },
  alternates: {
    canonical: "https://motemesse.vercel.app/chat",
  },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}