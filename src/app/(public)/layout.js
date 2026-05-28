"use client";

import "../globals.css";
import { usePathname } from "next/navigation";

import Header from "@/components/Header/Header";
import HeaderHero from "@/components/Header/HeaderHero"; // componente que fizemos para a home
import Footer from "@/components/Footer/Footer";


export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isHome = pathname === "/" || pathname === "" || pathname === undefined;

  return (
    <html lang="pt-BR">
      <body>
        
        
        {isHome ? <HeaderHero /> : <Header />}

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}

