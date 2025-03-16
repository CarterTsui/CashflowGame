import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CashFlow Tycoon - Financial Freedom Board Game",
  description: "A fun and educational board game focused on building wealth, managing cash flow, and achieving financial freedom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-green-800 text-white shadow-md">
          <div className="container mx-auto py-4 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="text-2xl font-bold mb-4 md:mb-0">
              CashFlow Tycoon
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="hover:text-green-300 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/game" className="hover:text-green-300 transition-colors">
                    Play Game
                  </Link>
                </li>
                <li>
                  <Link href="/premium" className="hover:text-green-300 transition-colors">
                    Premium
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <ClientBody>{children}</ClientBody>
        <footer className="bg-green-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">CashFlow Tycoon</h3>
                <p className="text-green-300">
                  A fun and educational board game focused on building wealth, managing cash flow,
                  and achieving financial freedom.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/game" className="text-green-300 hover:text-white transition-colors">
                      Play Game
                    </Link>
                  </li>
                  <li>
                    <Link href="/premium" className="text-green-300 hover:text-white transition-colors">
                      Premium Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-green-300 hover:text-white transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-green-300 hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Connect</h3>
                <p className="mb-4">
                  Sign up for our newsletter to get updates on new features and financial tips!
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-green-700 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-300 w-full"
                  />
                  <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-r-md transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-green-700 mt-8 pt-4 text-center text-green-300">
              © {new Date().getFullYear()} CashFlow Tycoon. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
