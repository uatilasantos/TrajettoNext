"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./conta.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

const apiUrl = "http://127.0.0.1:5036/usuario";

export default function contaPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    nome_usuario: ""
  })

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConta = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        router.push("/dashboard");
      } else {
        setErrorMessage(data.message)
      }


    } catch (err) {
      console.error("Erro ao cadastrar: ", err)
      setErrorMessage("Não foi possivel cadastrar: " || data.message)
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className={styles.loginContainer}>
      {/* Lado com logo */}
      <div className={styles.leftSide}>
        <div className={styles.brand}>
          <Image
            src="/logobranco.png"
            alt="Trajetto Express"
            width={300}
            height={100}
            priority
          />
          <p>Conectando lugares, entregando confiança.</p>
        </div>
      </div>

      {/* Lado da conta vai aqui */}
      <div className={styles.rightSide}>
        <div className={styles.formBox}>
          <h2> Cadastro de Usuário</h2>

          <form className={styles.form} onSubmit={handleConta}>
            <label>Nome de Usuário</label>
            <input
              type="text"
              placeholder="Digite seu nome de usuário"
              value={formData.nome_usuario}
              onChange={(e) => setFormData({ ...formData, nome_usuario: e.target.value })}
              required
            />

            <label>E-mail</label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite a sua senha"
              value={formData.senha}
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              required
            />
            <br></br>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            
            <button type="submit" className={styles.loginButton}>
              Cadastrar
            </button>

            <Link href="/" className={styles.backLink}>
              Voltar para página inicial
            </Link>
          </form>



        </div>
      </div>
    </div >
  );
}






