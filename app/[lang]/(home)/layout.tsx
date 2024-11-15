"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ToastProvider from "@/components/common/ToastProvider";
import Header from "@/components/common/Header";
import useUserStore from "@/stores/userStore";
import { useEffect } from "react";
import useAppStore from "@/stores/appStore";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Rental Management Platform",
//   description: "Will add later",
// };

export default function RootLayout({
  children,
  params:{lang}
}: Readonly<{
  children: React.ReactNode;
  params:any
}>) {
  const {fetchUser} = useUserStore();
  const {setLocale} = useAppStore();
  useEffect(()=>{
    fetchUser();
    setLocale(lang);
  },[fetchUser, lang, setLocale]);
  return (
    <html lang={lang}>
      <title>Rental Management Platform</title>
      <meta name="description" content="Rental Management" />
      <body className={inter.className}>
        <ToastProvider>
          <Header />

          <main className="min-h-screen flex justify-center items-center">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
