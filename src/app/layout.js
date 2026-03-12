// import "./globals.css";

// export const metadata = {
//   title: "Trajetto Express",
//   description: "Conectando lugares, entregando confiança.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="pt-BR">
//       <body>{children}</body>
//     </html>

//   );
// }



// "use client";

// import "./globals.css";
// import { useEffect, useState } from "react";
// import SplashScreen from "@/components/SplashScreen/SplashScreen";

// export const metadata = {
//   title: "Trajetto Express",
//   description: "Conectando lugares, entregando confiança.",
// };

// export default function RootLayout({ children }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 3000); // deixa visível por 1.5s

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <html lang="pt-BR">
//       <body>
//         {loading && <SplashScreen />}
//         {!loading && children}
//       </body>
//     </html>
//   );
// }



import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Trajetto Express",
  description: "Conectando lugares, entregando confiança.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}