export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{
        width: "200px",
        background: "#222",
        color: "#fff",
        height: "100vh",
        padding: "1rem"
      }}>
        <h3>Painel</h3>
        <ul>
          <li><a href="/">Início</a></li>
          <li><a href="/dashboard/perfil">Perfil</a></li>
        </ul>
      </aside>
      <main style={{ padding: "2rem", flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
