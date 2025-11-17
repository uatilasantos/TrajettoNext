import "./globals.css";

export const metadata = {
  title: "Trajetto Express",
  description: "Conectando lugares, entregando confiança.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
