// export default function DashboardLayout({ children }) {
//   return (
//     <div style={{ display: "flex" }}>
//       <aside style={{
//         width: "300px",
//         background: "#222",
//         color: "#fff",
//         height: "100vh",
//         padding: "2rem"
//       }}>
//         <h3>Painel</h3>
//         <br></br>
//         <ul>
//           {/* <li><a href="/dashboard/perfil">Perfil</a></li> */}
//           <li><a href="/dashboard/teste">Teste</a></li>
//           <li><a href="/dashboard/carga">Manifesto de Carga</a></li>
//           <li><a href="/dashboard/veiculo">Cadastro de Veiculos</a></li>
//           <li><a href="/dashboard/motorista">Cadastro Motoristas</a></li>
//           <br></br>
//           <br></br>
//           <br></br>

//           <li><a href="/">Logout</a></li>
//         </ul>
//       </aside>
//       <main style={{ padding: "2rem", flex: 1 }}>
//         {children}
//       </main>
//     </div>
//   );
// }



import Image from "next/image";
import styles from "./dashboard.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logoBox}>
          <Image
            src="/logobranco.png"
            alt="Logo Trajetto Express"
            width={180}
            height={80}
            priority
            className={styles.logo}
          />
        </div>

        <h4>Painel</h4>

        <ul>
          <li><a href="/dashboard/carga">Manifesto de Carga</a></li>
          <li><a href="/dashboard/veiculo">Veículos</a></li>
          <li><a href="/dashboard/motorista">Motoristas</a></li>
          <li><a href="/dashboard/documentos">Consulta documentos</a></li>
          <li><a href="/dashboard/faturamento">Faturamento</a></li>
        </ul>

        <ul>
          <li>
            <a href="/" className={styles.logout}>Logout</a>
          </li>
        </ul>
      </aside>

      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}

