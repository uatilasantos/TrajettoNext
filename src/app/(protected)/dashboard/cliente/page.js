"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./cliente.module.css";

const apiUrl = "http://127.0.0.1:5036/clientes";

export function getIDUsuario(token) {
  if (!token) return 0;
  const decoded = jwtDecode(token);
  //console.log("DECODED:", decoded);
  return decoded.id_usuario;
}

export default function ClientesPage() {
  const [token, setToken] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [usuarioId, setUsuarioId] = useState([]);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    const pegandoToken = localStorage.getItem("auth_token");
    if (pegandoToken) {
      setToken(pegandoToken);
      const id_usuario = getIDUsuario(pegandoToken);
      setUsuarioId(id_usuario);
      console.log("ID DO USUÁRIO:", id_usuario);
      setForm((prev) => ({
        ...prev,
        usuario_id: id_usuario
      }));
    }
  }, []);

  const [form, setForm] = useState({
    cnpj: "",
    razao_social: "",
    telefone: "",
    email: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    usuario_id: ""
  });

  const [visualizando, setVisualizando] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);



  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    const cep = form.cep.replace(/\D/g, "");

    if (cep.length !== 8) return;

    async function buscarCEP() {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();

        if (!dados.erro) {
          setForm((prev) => ({
            ...prev,
            logradouro: dados.logradouro || "",
            bairro: dados.bairro || "",
            cidade: dados.localidade || "",
            estado: dados.uf || "",
          }));
        }
      } catch (error) {
        console.error("Erro ao consultar CEP:", error);
      }
    }

    buscarCEP();
  }, [form.cep]);


  async function handleSubmit(e) {
    e.preventDefault();
    const method = editando ? "PUT" : "POST";
    const url = editando ? `${apiUrl}/${editando}` : apiUrl;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
        }),
      });
      if (!response.ok) {
        const erro = await response.text();
        console.error("Erro retorno API:", erro);
        alert("Erro ao salvar cliente. Veja o console.");
        return;
      }

      if (!response.ok) {
        alert("Erro ao salvar cliente.");
        return;
      }

      limparFormulario();
      carregarClientes();
      alert(editando ? "Cliente atualizado!" : "Cliente cadastrado!");
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  }



  async function carregarParaEdicao(id) {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      setForm(data);
      setEditando(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Erro ao carregar cliente para edição:", error);
    }
  }

  async function deletarCliente(id) {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;

    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao excluir");
      alert("Cliente excluído com sucesso!");
      carregarClientes();
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  }

  async function DetalhesCliente(id) {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      setVisualizando(data);
      setMostrarPopup(true);
    } catch (error) {
      console.error("Erro ao visualizar cliente:", error);
    }
  }


  function limparFormulario() {
    setForm({
      cnpj: "",
      razao_social: "",
      email: "",
      telefone: "",
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: ""
    });
    setEditando(null);
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1>Cadastro de Clientes</h1>

        <form onSubmit={handleSubmit} className={styles.formCliente}>
          <h3>Dados do Cliente</h3>
          <input name="razao_social" placeholder="Razão Social" value={form.razao_social} onChange={handleChange} required />
          <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} required />
          <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} />
          <input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
          <h3>Endereço</h3>
          <input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
          <input name="logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} />
          <input name="numero" placeholder="Número" value={form.numero} onChange={handleChange} />
          <input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} />
          <input name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />
          <input name="estado" placeholder="UF" value={form.estado} onChange={handleChange} />
          <input name="complemento" placeholder="Complemento" value={form.complemento} onChange={handleChange} />


          <button id="btn-salvar" type="submit">
            {editando ? "Salvar Alterações" : "Cadastrar cliente"}
          </button>
        </form>

        {mostrarPopup && visualizando && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <h3>Detalhes do Cliente</h3>
              <ul>
                {Object.entries(visualizando).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key.replace("_", " ")}:</strong> {value || "—"}
                  </li>
                ))}
              </ul>
              <button className={styles.btnFechar} onClick={() => setMostrarPopup(false)}>Fechar</button>
            </div>
          </div>
        )}

      </div>

      <div className={styles.clientesLista}>
        <h2>Lista de Clientes</h2>
        {/*classe local na tabela */}
        <table className={styles.tabelaClientes}>
          <thead className={styles.tabelaCabecalho}>
            <tr>
              <th>ID</th>
              <th>CNPJ</th>
              <th>Razão Social</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>CEP</th>
              <th>Logradouro</th>
              <th>Cidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className={styles.tabelaCorpo} id="tabela-cliente">
            {clientes.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.cnpj}</td>
                <td>{v.razao_social}</td>
                <td>{v.email}</td>
                <td>{v.telefone}</td>
                <td>{v.cep}</td>
                <td>{v.logradouro}</td>
                <td>{v.cidade}</td>
                <td>
                  <button className={styles.btnEditar} onClick={() => carregarParaEdicao(v.id)}>
                    Editar
                  </button>
                  <button className={styles.btnExcluir} onClick={() => deletarCliente(v.id)}>
                    Excluir
                  </button>
                  <button className={styles.btnDetalhes} onClick={() => DetalhesCliente(v.id)}>
                    Exibir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
