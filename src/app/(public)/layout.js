// import "../globals.css";
// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";


// export const metadata = {
//   title: "Trajetto Express",
//   description: "Conectando lugares, entregando confiança.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="pt-BR">
//       <body>
//         <Header />
//         <main>{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }



"use client";

import "../globals.css";
import { usePathname } from "next/navigation";

import Header from "@/components/Header/Header";
import HeaderHero from "@/components/Header/HeaderHero"; // componente que fizemos para a home
import Footer from "@/components/Footer/Footer";

// export const metadata = {
//   title: "Trajetto Express",
//   description: "Conectando lugares, entregando confiança.",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isHome = pathname === "/" || pathname === "" || pathname === undefined;

  return (
    <html lang="pt-BR">
      <body>
        {/* Escolhe o header conforme a rota */}
        {isHome ? <HeaderHero /> : <Header />}

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
