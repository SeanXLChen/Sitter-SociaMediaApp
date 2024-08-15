import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Followbar from "./components/Followbar";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import { Session } from "inspector";
import { NextAuthProvider } from "./components/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>

          <LoginModal />
          <RegisterModal />

          <div className="h-screen bg-black text-white">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
              <div className="grid grid-cols-4 h-full">

                <div className='col-span-1 h-full pr-4 md:pr-6'>
                  <Sidebar />
                </div>

                <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                  <div >{children}</div>
                </div>

                <div>
                  <Followbar />
                </div>

              </div>
            </div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
