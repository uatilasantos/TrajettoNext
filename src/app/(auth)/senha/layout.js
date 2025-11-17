import "./senha.module.css";

export const metadata = {
  title: "Mudança de Senha | Trajetto Express",
  description: "Redefina a sua senha.",
};

export default function SenhaLayout({ children }) {
  return (
    <div>
      {children}
    </div>

  );
}