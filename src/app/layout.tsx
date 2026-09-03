import type { Metadata } from "next";
import { Caveat, Kalam, Manrope } from "next/font/google";
import { CursorFollower } from "@/components/CursorFollower";
import { PageLoader } from "@/components/PageLoader";
import "./globals.css";

const kalam = Kalam({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AgriByYou — Agriculture & Organic Farm",
  description:
    "AgriByYou is an agriculture and organic farm bringing fresh produce, dairy, and honest farming practices from our fields to your table.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${kalam.variable} ${caveat.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-body bg-cream text-ink antialiased">
        <PageLoader />
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}
