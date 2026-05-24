"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./dashboard.module.css";

export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.dashboardContainer}>
      {/*botão menu mobile hambunguer */}
      <button
        className={styles.menuToggle}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/*barra menu */}
      <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ""}`}>
        <div className={styles.logoBox}>
          <Image
            src="/logobranco1.png"
            alt="Logo Trajetto Express"
            width={160}
            height={60}
            priority
            className={styles.logo}
          />
        </div>

        <h4>Painel Administrativo</h4>
        <ul>
          <li><a href="/dashboard_admin/">Inicio</a></li>
          <li><a href="/dashboard_admin/usuarios">Usuários</a></li>
          <li><a href="/dashboard_admin/carga">- Cargas cadastradas</a></li>
          <li><a href="/dashboard_admin/cliente">- Clientes cadastrados</a></li>
          <li><a href="/dashboard_admin/motorista">- Motoristas</a></li>
          <li><a href="/dashboard_admin/veiculo">- Veículos</a></li>
          {/* Esse bloco abaixo adicionar posteriormente faturamento e relatorios de usu da plataforma */}
          {/* <li><a href="/dashboard/documentos">Consulta documentos</a></li>
          <li><a href="/dashboard/faturamento">Faturamento</a></li>
          <li><a href="/dashboard/faturamento">Testes</a></li> */}
        

        </ul>
        <ul>
          <li><a href="/logout" className={styles.logout}>Logout</a></li>
        </ul>
      </aside>

      {/*Conteúdo*/}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
