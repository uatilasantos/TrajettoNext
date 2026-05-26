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