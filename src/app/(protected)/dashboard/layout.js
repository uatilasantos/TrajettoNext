export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{
        width: "300px",
        background: "#222",
        color: "#fff",
        height: "100vh",
        padding: "2rem"
      }}>
        <h3>Painel</h3>
        <br></br>
        <ul>
          {/* <li><a href="/dashboard/perfil">Perfil</a></li> */}
          <li><a href="/dashboard/teste">Teste</a></li>
          <li><a href="/dashboard/carga">Manifesto de Carga</a></li>
          <li><a href="/dashboard/veiculo">Cadastro de Veiculos</a></li>
          <li><a href="/dashboard/motorista">Cadastro Motoristas</a></li>
          <br></br>
          <br></br>
          <br></br>

          <li><a href="/">Logout</a></li>
        </ul>
      </aside>
      <main style={{ padding: "2rem", flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
