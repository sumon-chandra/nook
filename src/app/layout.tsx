import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import AuthContext from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
     title: "NOOK A Chatting app",
     description: "Chatting with your favorite!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
          <html lang="en">
               <body className={inter.className}>
                    <AuthContext>
                         <Toaster richColors position="bottom-center" />
                         {children}
                    </AuthContext>
               </body>
          </html>
     );
}
