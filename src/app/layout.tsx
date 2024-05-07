import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Petcare - Home away from home for your pet",
  description: "Take care of your pet when you are away",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-sm min-h-screen text-zinc-900 bg-[#E5E8EC]`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
