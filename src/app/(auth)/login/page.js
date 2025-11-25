"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

import Link from "next/link";
import Image from "next/image";
import styles from "./login.module.css";

const apiUrl = "http://127.0.0.1:5036/usuario/login";

export default function LoginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        senha: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);


            if (response.ok) {
                if (data.message === "senha invalida") {
                    setErrorMessage("Senha inválida");
                    return;
                }

                const token = data.token;
                localStorage.setItem("auth_token", token);
                if (token) {
                    setCookie("auth_token", token, {
                        maxAge: 60 * 60, // duração do toke, aqui é uma hora
                        path: "/"
                    });
                    
                    // gambiarra para salvar o token, pq o token está salvando pelo next/front 
                    if (typeof window !== "undefined") {
                        localStorage.setItem("auth_token", token);
                        router.push("/dashboard");
                    }

                    router.push("/dashboard");
                } else {
                    console.log("Erro, token não recebido.")
                    setErrorMessage("Verifique suas credenciais")
                }
            } else {
                setErrorMessage(data.message || "ERRO AO REALIZAR LOGIN")
            }

        } catch (err) {
            console.error("Erro ao realizer login:", err);
            setErrorMessage("Não foi possível realizar o login, tente novamente mais tarde.")

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
                        src="/logobranco1.png"
                        alt="Trajetto Express"
                        width={300}
                        height={100}
                        priority
                    />
                    <p>Conectando lugares, entregando confiança.</p>
                </div>
            </div>

            {/* Lado do login */}
            <div className={styles.rightSide}>
                <div className={styles.formBox}>
                    <h2 className={styles.title}>Faça login em sua conta</h2>

                    <form className={styles.form} onSubmit={handleLogin}>
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
                            placeholder="Digite sua senha"
                            value={formData.senha}
                            onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                            required
                        />

                        <div className={styles.actions}>
                            <a href="/senha" className={styles.smallLink}>
                                Esqueci minha senha
                            </a>
                        </div>

                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                        <p className={styles.subtitle}>
                            <br />
                            Ainda não tem conta?{" "}
                            <a href="/conta" className={styles.linkHighlight}>
                                Criar conta
                            </a>
                        </p>

                        <button type="submit" className={styles.loginButton}>
                            Entrar
                        </button>

                        <Link href="/" className={styles.backLink}>
                            Voltar para página inicial
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
