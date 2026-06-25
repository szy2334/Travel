import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "中国5A景区探索",
  description: "以中国地图为入口的 5A 景区智能探索平台高保真原型"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
