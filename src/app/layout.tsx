import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
     title: "NOOK A Chatting app",
     description: "Chatting with your favorite!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
          <html lang="en">
               <body className={inter.className}>
                    <Toaster richColors position="bottom-center" />
                    {children}
               </body>
          </html>
     );
}
