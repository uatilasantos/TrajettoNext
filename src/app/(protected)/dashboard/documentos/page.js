"use client";

import styles from "./documentos.module.css";
import Image from "next/image";

export default function DocumentosPage() {
  // Função auxiliar: converte Blob → Base64
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async function consulta(id) {
    try {
      let url = "";

      let token = localStorage.getItem("auth_token");
      if (id === 1) url = "http://127.0.0.1:5036/relatorio/veiculos?token=" + token;
      else if (id === 2) url = "http://127.0.0.1:5036/relatorio/motoristas?token=" + token;
      else if (id === 3) url = "http://127.0.0.1:5036/relatorio/cargas?token=" + token;
      else if (id === 4) url = "http://127.0.0.1:5036/relatorio/clientes?token=" + token; 
      else return alert("Erro ao consultar");

      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro na requisição: " + response.status);
      const blob = await response.blob();
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, "_blank");
    } catch (erro) {
      console.error("Erro ao abrir PDF:", erro);
      alert("Falha ao abrir o documento!");
    }
  }



  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Consulta de Documentos</h1>

      <div className={styles.grid}>
        {/* Veículos (id = 1) */}
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Image src="/trucks.png" width={70} height={48} alt="Veículos" />
          </div>
          <h2>Veículos</h2>
          <div className={styles.actions}>
            <button onClick={() => consulta(1)}>Emitir</button>
          </div>
        </div>

        {/* Motoristas (id = 2) */}
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Image src="/driver.png" width={48} height={48} alt="Motoristas" />
          </div>
          <h2>Motoristas</h2>
          <div className={styles.actions}>
            <button onClick={() => consulta(2)}>Emitir</button>
          </div>
        </div>

        {/* Cargas (id = 3) */}
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Image src="/carga.png" width={48} height={48} alt="Cargas" />
          </div>
          <h2>Cargas</h2>
          <div className={styles.actions}>
            <button onClick={() => consulta(3)}>Emitir</button>
          </div>
        </div>

        {/* Clientes (id = 4) */}
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Image src="/clients.png" width={48} height={48} alt="Clientes" />
          </div>
          <h2>Clientes</h2>
          <div className={styles.actions}>
            <button onClick={() => consulta(4)}>Emitir</button>
          </div>
        </div>

      </div>
    </section>
  );
}
