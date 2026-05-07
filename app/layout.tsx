import type { Metadata, Viewport } from "next";
import {
  Noto_Serif_SC,
  Ma_Shan_Zheng,
  ZCOOL_XiaoWei,
  Long_Cang,
  Cormorant_Garamond,
  Prompt,
} from "next/font/google";
import "./globals.css";

const siteUrl = `https://teerakulchon.vercel.app/`;

const title = "ธีรกุลชน Family";
const description =
  "ตระกูลธีรกุลชน 余 (yú) ถ่ายทอดด้วยจิตวิญญาณ คำสอนและความเชื่อ เพื่อให้ลูกหลานได้ระลึกถึงรากเหง้าและสายสกุลที่ส่งต่อกันมา";
const thumbnailAlt =
  "ตระกูลธีรกุลชน 余 (yú) ถ่ายทอดด้วยจิตวิญญาณ คำสอนและความเชื่อ เพื่อให้ลูกหลานได้ระลึกถึงรากเหง้าและสายสกุลที่ส่งต่อกันมา";

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-serif-sc",
  weight: ["400", "700", "900"],
  preload: false,
});

const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-brush",
  weight: "400",
  preload: false,
});

const zcoolXiaoWei = ZCOOL_XiaoWei({
  variable: "--font-elegant",
  weight: "400",
  preload: false,
});

const longCang = Long_Cang({
  variable: "--font-calligraphy",
  weight: "400",
  preload: false,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const prompt = Prompt({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${title}`,
  },
  description,
  applicationName: "Yu Family Tree",
  authors: [{ name: "Yu Family" }],
  creator: "Yu Family",
  publisher: "Yu Family",
  keywords: [
    "余氏家譜",
    "Yu family tree",
    "Yú Shì Jiā Pǔ",
    "ทะเบียนตระกูลอวี๋",
    "ผังตระกูล",
    "family genealogy",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Yu Family Tree",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: thumbnailAlt,
        type: "image/png",
      },
    ],
    locale: "th_TH",
    alternateLocale: ["zh_CN", "en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: "/twitter-image.png",
        width: 1200,
        height: 630,
        alt: thumbnailAlt,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#4d0606",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      className={`${notoSerifSC.variable} ${maShanZheng.variable} ${zcoolXiaoWei.variable} ${longCang.variable} ${cormorant.variable} ${prompt.variable} antialiased`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
