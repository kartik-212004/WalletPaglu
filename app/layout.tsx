import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import "../public/css/satoshi.css";

export const metadata: Metadata = {
  title: "Laxmi Crypto Funds",
  description: "A secure, client-side clean AF cryptocurrency wallet for Ethereum and Solana blockchains that doesn't suck.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-satoshi antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="container flex-grow mx-auto md:w-[80%] lg:w-[70%] xl:w-[55%] px-4 sm:px-6 md:px-8 pb-24 sm:pb-20">{children}</div>
          <Footer />
          <Toaster theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
