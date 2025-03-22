import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@progress/kendo-theme-default/dist/all.css";
import { AuthProviders } from './auth';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asclep Medical Center",
  description: "Healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviders>
          {children}
        </AuthProviders>
      </body>
    </html>
  );
}
