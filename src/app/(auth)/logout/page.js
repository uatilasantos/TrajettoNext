"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import { setCookie } from "cookies-next";

import Link from "next/link";
import Image from "next/image";
import styles from "./logout.module.css";

export default function LoginPage() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("token")

         
            const token = localStorage.getItem("token")
            localStorage.removeItem("userId");

            console.log(token)

            // exibindo um alert de confirmação que o logout funcionou
            alert("Você foi deslogado!")
            router.push("/");

        } catch (err) {
            console.error("Erro ao realizer logout:", err);
            setErrorMessage("Não foi possível realizar o logout, tente novamente mais tarde.")

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
            
            {/*Logout*/}
            <div className={styles.rightSide}>
                <div className={styles.formBox}>
                    <h2 className={styles.title}>Deseja sair da sua conta?</h2>
                    
                    <form className={styles.form} onSubmit={handleLogout}>
                        <button type='submit' className={styles.loginButton}>
                            Sair
                        </button>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                        <Link href="/" className={styles.backLink}>
                            Voltar para página inicial
                        </Link>

                    </form>
                </div>
            </div>
        </div >

    );

}
