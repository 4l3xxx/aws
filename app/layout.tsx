import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { I18nProvider } from "@/components/i18n-provider"

export const metadata: Metadata = {
  title: "PT. Agri Wangi Sentosa – Patuahwattee Tea Plantation",
  description:
    "Perkebunan Teh Patuahwattee dikelola PT. Agri Wangi Sentosa. Teh premium dari dataran tinggi, berkelanjutan dengan sertifikasi Rainforest Alliance.",
  generator: "v0.app",
  icons: {
    icon: "/images/agriwangi-logo.png",
    shortcut: "/images/agriwangi-logo.png",
    apple: "/images/agriwangi-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <I18nProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
