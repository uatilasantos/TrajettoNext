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

      if (id === 1) url = "http://127.0.0.1:5036/relatorio/veiculos";
      else if (id === 2) url = "http://127.0.0.1:5036/relatorio/motoristas";
      else if (id === 3) url = "http://127.0.0.1:5036/relatorio/cargas";
      else if (id === 4) url = "http://127.0.0.1:5036/relatorio/empresa";
      else if (id === 5) url = "http://127.0.0.1:5036/relatorio/faturamento";
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

  async function EnviarPorEmail(id) {
    try {
      const destinatario = prompt("Digite o e-mail do destinatário:");
      if (!destinatario) return;

      let url = "";
      let nome = "";
      if (id === 1) { url = "http://127.0.0.1:5036/relatorio/veiculos"; nome = "veiculos.pdf"; }
      else if (id === 2) { url = "http://127.0.0.1:5036/relatorio/motoristas"; nome = "motoristas.pdf"; }
      else if (id === 3) { url = "http://127.0.0.1:5036/relatorio/cargas"; nome = "cargas.pdf"; }
      else if (id === 4) { url = "http://127.0.0.1:5036/relatorio/empresa"; nome = "empresa.pdf"; }
      else if (id === 5) { url = "http://127.0.0.1:5036/relatorio/faturamento"; nome = "faturamento.pdf"; }
      else return alert("Erro ao consultar");

      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro ao buscar arquivo: " + response.status);
      const blob = await response.blob();
      const base64PDF = await blobToBase64(blob);

      const envio = await fetch("http://127.0.0.1:5036/envia/Email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinatario: destinatario,
          assunto: "Relatório solicitado",
          mensagem: "Segue em anexo o relatório solicitado.",
          arquivo_nome: nome,
          arquivo_base64: base64PDF,
        }),
      });

      const resultado = await envio.json();

      if (envio.ok) {
        alert("📨 E-mail enviado com sucesso!");
      } else {
        alert("❌ Erro ao enviar e-mail: " + (resultado.erro || "desconhecido"));
      }
    } catch (erro) {
      console.error("Erro ao enviar por e-mail:", erro);
      alert("Falha ao enviar o documento!");
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
            <button onClick={() => EnviarPorEmail(1)}>Enviar por e-mail</button>
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
            <button onClick={() => EnviarPorEmail(2)}>Enviar por e-mail</button>
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
            <button onClick={() => EnviarPorEmail(3)}>Enviar por e-mail</button>
          </div>
        </div>

        {/* Empresa (id = 4) */}
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Image src="/empresa.png" width={48} height={48} alt="Empresa" />
          </div>
          <h2>Empresa</h2>
          <div className={styles.actions}>
            <button onClick={() => consulta(4)}>Emitir</button>
            <button onClick={() => EnviarPorEmail(4)}>Enviar por e-mail</button>
          </div>
        </div>

        {/* Financeiro (id = 5) */}
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Image src="/financeiro.png" width={48} height={48} alt="Financeiro" />
          </div>
          <h2>Financeiro</h2>
          <div className={styles.actions}>
            <button onClick={() => consulta(5)}>Emitir</button>
            <button onClick={() => EnviarPorEmail(5)}>Enviar por e-mail</button>
          </div>
        </div>
      </div>
    </section>
  );
}
