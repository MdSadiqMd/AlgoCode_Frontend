import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { SocketProvider } from "@/context/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Algocode",
  description: "An Online IDE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SocketProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </SocketProvider>
  );
}
