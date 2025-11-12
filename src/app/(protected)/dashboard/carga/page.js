"use client";

import { useState, useEffect } from "react";
import styles from "./carga.module.css";

const apiUrl = "http://127.0.0.1:5036/cargas";
const usuariosApiUrl = "http://127.0.0.1:5036/clientes";
const apiUrlMotoristas = "http://127.0.0.1:5036/motoristas";
const apiUrlVeiculos = "http://127.0.0.1:5036/veiculos";




// const [clientes, setClientes] = useState([]);
// const [motoristas, setMotoristas] = useState([]);
// const [veiculos, setVeiculos] = useState([]);



export default function CargasPage() {
  const [cargas, setCargas] = useState([]);
  const [editando, setEditando] = useState(null);
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
    distancia: ""
  });

  const [visualizando, setVisualizando] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  


  useEffect(() => {
    carregarCargas();
  }, []);

  async function carregarCargas() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCargas(data);
    } catch (error) {
      console.error("Erro ao carregar cargas:", error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }


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
      const response = await fetch(`${apiUrl}/${id}`);
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
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao excluir");
      alert("Carga excluída com sucesso!");
      carregarCargas();
    } catch (error) {
      console.error("Erro ao excluir carga:", error);
    }
  }

  async function DetalhesCarga(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();
    setVisualizando(data);
    setMostrarPopup(true);
  } catch (error) {
    console.error("Erro ao visualizar carga:", error);
  }
}


// Carrega clientes, motorista e veículo

// useEffect(() => {
//   carregarCargas();
//   carregarClientes();
//   carregarMotoristas();
//   carregarVeiculos();
// }, []);

// async function carregarClientes() {
//   try {
//     const resposta = await fetch(usuariosApiUrl);
//     const data = await resposta.json();
//     setClientes(data);
//   } catch (error) {
//     console.error("Erro ao carregar clientes:", error);
//   }
// }

// async function carregarMotoristas() {
//   try {
//     const resposta = await fetch(apiUrlMotoristas);
//     const data = await resposta.json();
//     setMotoristas(data);
//   } catch (error) {
//     console.error("Erro ao carregar motoristas:", error);
//   }
// }

// async function carregarVeiculos() {
//   try {
//     const resposta = await fetch(apiUrlVeiculos);
//     const data = await resposta.json();
//     setVeiculos(data);
//   } catch (error) {
//     console.error("Erro ao carregar veículos:", error);
//   }
// }








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
          <input name="cliente_id" placeholder="Cliente" value={form.cliente_id} onChange={handleChange} />
          <input name="tipo_carga" placeholder="Tipo Carga" value={form.tipo_carga} onChange={handleChange} required />
          <input name="peso_carga" placeholder="Peso" value={form.peso_carga} onChange={handleChange} required />
          <input name="motorista_id" placeholder="Motorista" value={form.motorista_id} onChange={handleChange} />  
          <input name="veiculo_id" placeholder="Veículo" value={form.veiculo_id} onChange={handleChange} />
          <h3>Dados do Frete</h3>
          <input name="origem_carga" placeholder="Origem Carga" value={form.origem_carga} onChange={handleChange} />
          <input name="destino_carga" placeholder="Destino Carga" value={form.destino_carga} onChange={handleChange} />
          <input name="valor_frete" placeholder="Valor do Frete" value={form.valor_frete} onChange={handleChange} />
          <input name="valor_km" placeholder="Valor Km" value={form.valor_km} onChange={handleChange} />
          <input name="distancia" placeholder="Distância" value={form.distancia} onChange={handleChange} />
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
              <th>Tipo de Carga</th>
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
                <td>{v.cliente_id}</td>
                <td>{v.tipo_carga}</td>
                <td>{v.peso_carga}</td>
                <td>{v.motorista_id}</td>
                <td>{v.veiculo_id}</td>
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
