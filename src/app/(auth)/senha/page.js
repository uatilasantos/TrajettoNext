"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


import Link from "next/link";
import Image from "next/image";
import styles from "./senha.module.css";

// url da nossa api para a mudança de senha
const apiUrl = "http://127.0.0.1:5036/usuario/mudancaSenha";

export default function MudancaSenhaPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        senha: "",
        confirma_senha: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleMudancaSenha = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            if (formData.senha != formData.confirma_senha) {
                setErrorMessage("As senhas precisam ser iguais")
                return;
            }
            const response = await fetch(apiUrl, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);

            if(response.ok){
                alert("Senha alterada com sucesso");
                router.push("/");
            

            } else{
                setErrorMessage(data.message)
            }


        
        } catch (err) {
            console.error("Erro ao realizar troca de senha:", err);
            setErrorMessage("Não foi possivel alterar a senha: " || data.message)
    
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

        {/* Mudança de senha aqui */}
        <div className={styles.rightSide}>
            <div className={styles.formBox}>
                <h2 className={styles.title}>Redefina sua senha</h2>

                <form className={styles.form} onSubmit={handleMudancaSenha}>
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
                        placeholder="Digite a nova senha"
                        value={formData.senha}
                        onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                        required
                    />

                    <label>Confirme sua senha</label>
                    <input
                        type="password"
                        placeholder="Confirme a nova senha"
                        value={formData.confirma_senha}
                        onChange={(e) => setFormData({ ...formData, confirma_senha: e.target.value })}
                        required
                    />
                    <br></br>

                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                    <button type="submit" className={styles.loginButton}>
                        Redefinir
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
