// app/layout.tsx (ou app/RootLayout.tsx selon ton projet)
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manasseakpovi.com"),
  title: {
    default: "Manasse Akpovi - Plateforme de profils professionnels",
    template: "%s | Manasse Akpovi",
  },
  description:
    "Découvrez et explorez les profils professionnels créés sur la plateforme Manasse Akpovi.",
  openGraph: {
    type: "website",
    url: "https://manasseakpovi.com",
    title: "Manasse Akpovi - Profils professionnels",
    description:
      "Accédez aux profils professionnels créés sur la plateforme Manasse Akpovi.",
    images: [
      {
        url: "https://manasseakpovi.com/default-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Image de couverture de la plateforme Manasse Akpovi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manasse Akpovi - Profils professionnels",
    description:
      "Explorez les profils professionnels sur la plateforme Manasse Akpovi.",
    images: ["https://manasseakpovi.com/default-profile.jpg"],
  },
  alternates: {
    canonical: "https://manasseakpovi.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
