"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./conta.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

const apiSolicitarOtp = "http://127.0.0.1:5036/usuario/solicitar-otp";
const apiConfirmarOtp = "http://127.0.0.1:5036/usuario/confirmar-otp";

export default function contaPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    nome_usuario: ""
  });

  const [otp, setOtp] = useState("");
  const [etapaOtp, setEtapaOtp] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // =========================
  // ETAPA 1 → SOLICITAR OTP
  // =========================
  const handleConta = async (e) => {
    e.preventDefault();

    if (isLoading) return; // evita múltiplos envios

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(apiSolicitarOtp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setEtapaOtp(true);
      } else {
        setErrorMessage(data.erro || "Erro ao enviar OTP");
      }

    } catch (err) {
      console.error("Erro ao solicitar OTP: ", err);
      setErrorMessage("Erro ao solicitar OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // ETAPA 2 → CONFIRMAR OTP
  // =========================
  const handleConfirmarOtp = async (e) => {
    e.preventDefault();

    if (isLoading) return; // evita múltiplos envios

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(apiConfirmarOtp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: otp
        })
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        router.push("/");
      } else {
        setErrorMessage(data.erro || "OTP inválido");
      }

    } catch (err) {
      console.error("Erro ao confirmar OTP: ", err);
      setErrorMessage("Erro ao confirmar OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSide}>
        <div className={styles.brand}>
          <Image
            src="/logobranco1.png"
            alt="Trajetto Express"
            width={300}
            height={100}
            priority
          />
          <p>Conectando lugares, entregando confiança.</p>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.formBox}>
          <h2>Cadastro de Usuário</h2>

          {/* FORM 1 - DADOS */}
          {!etapaOtp && (
            <form className={styles.form} onSubmit={handleConta}>
              <label>Nome de Usuário</label>
              <input
                type="text"
                placeholder="Digite seu nome de usuário"
                value={formData.nome_usuario}
                onChange={(e) =>
                  setFormData({ ...formData, nome_usuario: e.target.value })
                }
                required
              />

              <label>E-mail</label>
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite a sua senha"
                value={formData.senha}
                onChange={(e) =>
                  setFormData({ ...formData, senha: e.target.value })
                }
                required
              />

              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              <button
                type="submit"
                className={styles.loginButton}
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar código"}
              </button>

              <Link href="/" className={styles.backLink}>
                Voltar para página inicial
              </Link>
            </form>
          )}

          {/* FORM 2 - OTP */}
          {etapaOtp && (
            <form className={styles.form} onSubmit={handleConfirmarOtp}>
              <label>Digite o código enviado ao e-mail</label>
              <input
                type="text"
                placeholder="Código OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              <button
                type="submit"
                className={styles.loginButton}
                disabled={isLoading}
              >
                {isLoading ? "Confirmando..." : "Confirmar cadastro"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}