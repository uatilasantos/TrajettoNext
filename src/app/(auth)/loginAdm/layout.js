import "./login.module.css";

export const metadata = {
  title: "Login | Trajetto Express",
  description: "Acesse sua conta Trajetto Express.",
};

export default function LoginLayout({ children }) {
  return (
    <div>
      {children}
    </div>

  );
}