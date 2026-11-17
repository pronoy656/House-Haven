import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { NavigationProgressBar } from "@/components/shared/NavigationProgressBar";
import { ToastContainer } from "@/components/shared/Toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Property & Real Estate Portal",
  description: "Modern property management and maintenance platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Suspense fallback={null}>
          <NavigationProgressBar />
          <ToastContainer />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
