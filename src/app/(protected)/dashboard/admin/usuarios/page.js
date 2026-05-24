"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./usuario.module.css";

const apiUrl = "http://127.0.0.1:5036/admin/usuario";

function getIDUsuario(token) {
  if (!token) return 0;
  const decoded = jwtDecode(token);
  console.log("DECODED:", decoded.id_usuario);
  return decoded.id_usuario;
}
function getNomeUsuario(token) {
  if (!token) return 0;
  const decoded = jwtDecode(token);
  console.log("DECODED:", decoded.nome_usuario);
  return decoded.nome_usuario;
}


export default function UsuariosPage() {
  const [token, setToken] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioId, setUsuarioId] = useState([]);
  const [editando, setEditando] = useState(null);
  const [usuarioNome, setUsuarioNome] = useState("");

  useEffect(() => {
    const pegandoToken = localStorage.getItem("auth_token");
    if (pegandoToken) {
      setToken(pegandoToken);
      const id_usuario = getIDUsuario(pegandoToken);
      setUsuarioId(id_usuario);

      const usuario_nome = getNomeUsuario(pegandoToken);
      setUsuarioNome(usuario_nome);
    }
  }, []);

  const [form, setForm] = useState({
    nome_usuario: "",
    email: "",
    // telefone: "",
    // email: "",
    // cep: "",
    // logradouro: "",
    // numero: "",
    // complemento: "",
    // bairro: "",
    // cidade: "",
    // estado: "",
    // usuario_id: ""
  });

  const [visualizando, setVisualizando] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);


useEffect(() => {
  if (usuarioId) {
    carregarUsuarios();
  }
}, [usuarioId]);



async function carregarUsuarios() {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }

    const data = await response.json();

    console.log("USUÁRIOS:", data);

    setUsuarios(data);

  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
}






  async function deletarUsuario(id) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao excluir");
      alert("Usuário excluído com sucesso!");
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao excluir usuario:", error);
    }
  }

  async function DetalhesUsuario(id) {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      setVisualizando(data);
      setMostrarPopup(true);
    } catch (error) {
      console.error("Erro ao visualizar usuário:", error);
    }
  }



  return (
      <div className={styles.usuariosLista}>
        <h2>Lista de Usuários Ativos na Plataforma</h2>
        {/*classe local na tabela */}
        <table className={styles.tabelaUsuarios}>
          <thead className={styles.tabelaCabecalho}>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className={styles.tabelaCorpo} id="tabela-usuario">
            {usuarios.map((v)  => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.nome_usuario}</td>
                <td>{v.email}</td>
                <td>
                  {/* <button className={styles.btnEditar} onClick={() => carregarParaEdicao(v.id)}>
                    Editar
                  </button> */}
                  <button className={styles.btnExcluir} onClick={() => deletarUsuario(v.id)}>
                    Excluir
                  </button>
                  {/* <button className={styles.btnDetalhes} onClick={() => DetalhesCliente(v.id)}>
                    Exibir
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    // </div>
  );
}
