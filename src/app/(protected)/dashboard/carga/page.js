"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./carga.module.css";

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


const apiUrlCargas = "http://127.0.0.1:5036/cargas";
const usuariosapiUrlCargas = "http://127.0.0.1:5036/clientes";
const apiUrlCargasMotoristas = "http://127.0.0.1:5036/motoristas";
const apiUrlCargasVeiculos = "http://127.0.0.1:5036/veiculos";


export default function CargasPage() {
  const [token, setToken] = useState("");
  const [cargas, setCargas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [usuarioId, setUsuarioId] = useState("");
  const [usuarioNome, setUsuarioNome] = useState("")
  const [clientes, setClientes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [motoristas, setMotoristas] = useState([]);
  const [cidadesSP, setCidadesSP] = useState([]);


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
    tipo_carga: "",
    peso_carga: "",
    motorista_id: "",
    veiculo_id: "",
    cliente_id: "",
    origem_carga: "",
    destino_carga: "",
    valor_frete: "",
    valor_km: "",
    distancia: "",
    usuario_id: ""
  });

  const [visualizando, setVisualizando] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);


  /* aqui */
  useEffect(() => {
    if (!usuarioId) return;
    carregarCargas();
    carregarClientes();
    carregarVeiculos();
    carregarMotoristas();
    carregarCidadesSP();
  }, [usuarioId]);


  async function carregarCargas() {
    try {
      const response = await fetch(`${apiUrlCargas}/cargasCadastradas/${usuarioId}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log("RETORNO DA API:", data);

      const lista = Array.isArray(data)
        ? data
        : data.Cargas || [];

      setCargas(lista);

    } catch (error) {
      console.log("Erro ao carregar cargas:", error);
      setCargas([]);
    }
  }

  /*até aqui*/

async function carregarClientes() {
  if (!usuarioId) return;

  try {
    const resposta = await fetch(`${apiUrlCargas}/clientesCadastrados/${usuarioId}`);
    const data = await resposta.json();
    setClientes(data);
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
  }
}


async function carregarVeiculos() {
  if (!usuarioId) return;

  try {
    const resposta = await fetch(`${apiUrlCargas}/veiculosCadastrados/${usuarioId}`);
    const data = await resposta.json();
    setVeiculos(data);
  } catch (error) {
    console.error("Erro ao carregar veículos:", error);
  }
}


async function carregarMotoristas() {
  if (!usuarioId) return;

  try {
    const resposta = await fetch(`${apiUrlCargas}/motoristasCadastrados/${usuarioId}`);
    const data = await resposta.json();
    setMotoristas(data);
  } catch (error) {
    console.error("Erro ao carregar motoristas:", error);
  }
}


  async function carregarCidadesSP() {
    const apiIbgeUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/35/municipios";

    try {
      const response = await fetch(apiIbgeUrl);
      let cidades = await response.json();
      cidades.sort((a, b) => a.nome.localeCompare(b.nome));

      setCidadesSP(cidades);

    } catch (error) {
      console.error("Erro ao carregar cidades:", error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }


  async function handleSubmit(e) {
    e.preventDefault();
    const method = editando ? "PUT" : "POST";
    const url = editando ? `${apiUrlCargas}/${editando}` : apiUrlCargas;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          usuario_id: usuarioId /* aqui */
        }),
      });

      if (!response.ok) {
        alert("Erro ao salvar carga.");
        return;
      }

      limparFormulario();
      carregarCargas();
      alert(editando ? "Carga atualizada!" : "Carga cadastrada!");
    } catch (error) {
      console.error("Erro ao salvar carga:", error);
    }
  }



  async function carregarParaEdicao(id) {
    try {
      const response = await fetch(`${apiUrlCargas}/${id}`);
      const data = await response.json();
      setForm(data);
      setEditando(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Erro ao carregar carga para edição:", error);
    }
  }

  async function deletarCarga(id) {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;

    try {
      const response = await fetch(`${apiUrlCargas}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao excluir");
      alert("Carga excluída com sucesso!");
      carregarCargas();
    } catch (error) {
      console.error("Erro ao excluir carga:", error);
    }
  }

  async function DetalhesCarga(id) {
    try {
      const response = await fetch(`${apiUrlCargas}/${id}`);
      const data = await response.json();
      setVisualizando(data);
      setMostrarPopup(true);
    } catch (error) {
      console.error("Erro ao visualizar carga:", error);
    }
  }


  function limparFormulario() {
    setForm({
      tipo_carga: "",
      peso_carga: "",
      motorista_id: "",
      veiculo_id: "",
      cliente_id: "",
      origem_carga: "",
      destino_carga: "",
      valor_frete: "",
      valor_km: "",
      distancia: ""
    });
    setEditando(null);
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1>Manifesto de Carga</h1>
        <form onSubmit={handleSubmit} className={styles.formCarga}>
          <h3>Dados da Carga</h3>
          <select name="cliente_id" value={form.cliente_id} onChange={handleChange} required> <option value="">Selecione um cliente</option> {clientes.map((c) => (<option key={c.id} value={c.id}> {c.id} - {c.razao_social} </option>))} </select>
          <select name="tipo_carga" value={form.tipo_carga} onChange={handleChange} required > <option value="">Selecione o tipo de carga</option> <option value="seca">Seca</option> <option value="refrigerada">Refrigerada</option> </select>
          <input name="peso_carga" placeholder="Peso" value={form.peso_carga} onChange={handleChange} required />
          <select name="motorista_id" value={form.motorista_id} onChange={handleChange}> <option value="">Selecione um motorista</option> {motoristas.map((m) => (<option key={m.id} value={m.id}> {m.id} - {m.nome} </option>))} </select>
          <select name="veiculo_id" value={form.veiculo_id} onChange={handleChange}> <option value="">Selecione um veículo</option> {veiculos.map((v) => (<option key={v.id} value={v.id}> {v.id} - {v.placa} - {v.peso_maximo_kg}kg </option>))} </select>
          <h3>Dados do Frete</h3>
          <select name="origem_carga" value={form.origem_carga} onChange={handleChange} required> <option value="">Selecione uma cidade de origem</option> {cidadesSP.map((c) => (<option key={c.id} value={c.nome}>{c.nome}</option>))}</select>
          <select name="destino_carga" value={form.destino_carga} onChange={handleChange} required> <option value="">Selecione uma cidade de destino</option> {cidadesSP.map((c) => (<option key={c.id} value={c.nome}>{c.nome}</option>))} </select>


          <button id="btn-salvar" type="submit">
            {editando ? "Salvar Alterações" : "Cadastrar carga"}
          </button>
        </form>

        {mostrarPopup && visualizando && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <h3>Detalhes da Carga</h3>
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

      <div className={styles.cargasLista}>
        <h2>Lista de Cargas</h2>
        {/*classe local na tabela */}
        <table className={styles.tabelaCargas}>
          <thead className={styles.tabelaCabecalho}>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Peso</th>
              <th>Motorista</th>
              <th>Veículo</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Valor frete</th>
              <th>Valor KM</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className={styles.tabelaCorpo} id="tabela-cargas">
            {cargas.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.cliente}</td>
                <td>{v.tipo_carga}</td>
                <td>{v.peso_carga}</td>
                <td>{v.motorista}</td>
                <td>{v.veiculo}</td>
                <td>{v.origem_carga}</td>
                <td>{v.destino_carga}</td>
                <td>{v.valor_frete}</td>
                <td>{v.valor_km}</td>
                <td>
                  <button className={styles.btnEditar} onClick={() => carregarParaEdicao(v.id)}>
                    Editar
                  </button>
                  <button className={styles.btnExcluir} onClick={() => deletarCarga(v.id)}>
                    Excluir
                  </button>
                  <button className={styles.btnDetalhes} onClick={() => DetalhesCarga(v.id)}>
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