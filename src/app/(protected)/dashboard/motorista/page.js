"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./motorista.module.css";

const apiUrl = "http://127.0.0.1:5036/motoristas";


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


export default function motoristaPage() {
  const [token, setToken] = useState("");
  const [motoristas, setMotoristas] = useState([]);
  const [usuarioId, setUsuarioId] = useState(0);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    rg: "",
    salario: "",
    data_nascimento: "",
    numero_cnh: "",
    categoria_cnh: "",
    validade_cnh: "",
    telefone: "",
    email: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [visualizando, setVisualizando] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  

  useEffect(() => {
    const tk = localStorage.getItem("auth_token");
    if (tk) {
      setToken(tk);
      const id = getIDUsuario(tk);
      setUsuarioId(id);
    }
  }, []);


  useEffect(() => {
    if (usuarioId) carregarMotoristas();
  }, [usuarioId]);


  async function carregarMotoristas() {
    if (!usuarioId) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5036/cargas/motoristasCadastrados/${usuarioId}`
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        setMotoristas(data);
      } else if (Array.isArray(data.Motoristas)) {
        setMotoristas(data.Motoristas);
      } else {
        setMotoristas([]);
      }
    } catch (error) {
      console.error("Erro ao carregar motoristas:", error);
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
        salario: parseFloat(form.salario) || 0,
      }),
    });

    if (!response.ok) {
      alert("Erro ao salvar motorista.");
      return;
    }

    limparFormulario();
    carregarMotoristas();
    alert(editando ? "Motorista atualizado!" : "Motorista cadastrado!");
  } catch (error) {
    console.error("Erro ao salvar motoristas:", error);
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
      console.error("Erro ao carregar motorista para edição:", error);
    }
  }

  async function deletarMotoristas(id) {
    if (!confirm("Tem certeza que deseja excluir este motorista?")) return;

    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao excluir");
      alert("Motorista excluído com sucesso!");
      carregarMotoristas();
    } catch (error) {
      console.error("Erro ao excluir motorista:", error);
    }
  }

  async function DetalhesMotorista(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();
    setVisualizando(data);
    setMostrarPopup(true);
  } catch (error) {
    console.error("Erro ao visualizar motorista:", error);
  }
}


  function limparFormulario() {
    setForm({
      nome: "",
      cpf: "",
      rg: "",
      salario: "",
      data_nascimento: "",
      numero_cnh: "",
      categoria_cnh: "",
      validade_cnh: "",
      telefone: "",
      email: "",
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
    });
    setEditando(null);
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1>Cadastro de Motoristas</h1>

        <form onSubmit={handleSubmit} className={styles.formMotorista}>
          <h3>Dados Pessoais</h3>
          <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
          <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required />
          <input name="rg" placeholder="RG" value={form.rg} onChange={handleChange} required />
          <input name="salario" placeholder="Salário" value={form.salario} onChange={handleChange} required />
          <input type="text" name="data_nascimento" placeholder="Data de Nascimento" value={form.data_nascimento} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }} onChange={handleChange} required/>
          <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} />
          <input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
          <h3>Habilitação</h3>
          <input name="numero_cnh" placeholder="CNH" value={form.numero_cnh} onChange={handleChange} required />
          <input name="categoria_cnh" placeholder="Categoria CNH" value={form.categoria_cnh} onChange={handleChange} required />
          <input type="text" name="validade_cnh" placeholder="Validade CNH" value={form.validade_cnh} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }} onChange={handleChange} required/>
          <h3>Endereço</h3>
          <input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />          
          <input name="logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} />
          <input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} />
          <input name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />
          <input name="estado" placeholder="UF" value={form.estado} onChange={handleChange} />
          <input name="numero" placeholder="Número" value={form.numero} onChange={handleChange} />
          <input name="complemento" placeholder="Complemento" value={form.complemento} onChange={handleChange} />


          <button id="btn-salvar" type="submit">
            {editando ? "Salvar Alterações" : "Cadastrar motorista"}
          </button>
        </form>

          {mostrarPopup && visualizando && (
            <div className={styles.popupOverlay}>
              <div className={styles.popupContent}>
                <h3>Detalhes do Motorista</h3>
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

      <div className={styles.motoristasLista}>
        <h2>Lista de Motoristas</h2>
        {/*classe local na tabela */}
        <table className={styles.tabelaMotoristas}>
          <thead className={styles.tabelaCabecalho}>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Categoria CNH</th>
              <th>Validade CNH</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className={styles.tabelaCorpo} id="tabela-motoristas">
            {motoristas.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.nome}</td>
                <td>{v.cpf}</td>
                <td>{v.categoria_cnh}</td>
                <td>{v.validade_cnh}</td>
                <td>{v.telefone}</td>
                <td>{v.email}</td>
                <td>
                  <button className={styles.btnEditar} onClick={() => carregarParaEdicao(v.id)}>
                    Editar
                  </button>
                  <button className={styles.btnExcluir} onClick={() => deletarMotoristas(v.id)}>
                    Excluir
                  </button>
                  <button className={styles.btnDetalhes} onClick={() => DetalhesMotorista(v.id)}>
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
