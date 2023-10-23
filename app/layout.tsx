import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Github, BuyMeACoffee } from "@/components/icons";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

const clash = localFont({
  src: "../styles/ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spirals",
  description:
    "Generate beautiful AI spiral art with one click. Powered by Vercel and Replicate.",
  metadataBase: new URL("https://spirals.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrolled = false;
  return (
    <html lang="en">
      <body className={cn(clash.variable, inter.variable)}>
        <Toaster />
        <div className="fixed h-screen w-full bg-gradient-to-br from-violet-100 via-teal-50 to-amber-100" />
        <div
          className={`fixed top-0 w-full ${
            scrolled
              ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
              : "bg-white/0"
          } z-30 transition-all`}
        >
          <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
            <Link href="/" className="flex items-center font-display text-2xl">
              <Image
                src="/logo.png"
                alt="Logo image of a chat bubble"
                width="30"
                height="30"
                className="mr-2 rounded-sm"
                unoptimized
              />
              <p>Spirals</p>
            </Link>
            <div className="flex items-center space-x-4">
              <a
                href="https://vercel.com/templates/next.js/spirals"
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-3 py-1.5 text-sm text-white transition-colors hover:bg-white hover:text-black sm:flex"
              >
                <svg
                  className="h-4 w-4 group-hover:text-black"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L20 20H4L12 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Deploy to Vercel</p>
              </a>
              <a
                href="https://vercel.com/templates/next.js/spirals"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden"
              >
                <svg
                  width="1155"
                  height="1000"
                  viewBox="0 0 1155 1000"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                >
                  <path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="black" />
                </svg>
              </a>
              <a
                href="https://github.com/steven-tey/spirals"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
              </a>
            </div>
          </div>
        </div>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        <div className="absolute w-full py-5 text-center">
          <p className="text-gray-500">
            A project by{" "}
            <a
              className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
              href="https://twitter.com/steventey"
              target="_blank"
              rel="noopener noreferrer"
            >
              Steven Tey
            </a>
          </p>
          <a
            href="https://www.buymeacoffee.com/steventey"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-2 flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-6 py-2 transition-all duration-75 hover:scale-105"
          >
            <BuyMeACoffee className="h-6 w-6" />
            <p className="font-medium text-gray-600">Buy me a coffee</p>
          </a>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
