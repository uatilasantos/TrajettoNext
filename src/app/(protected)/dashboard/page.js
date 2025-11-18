"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import styles from "./dashboardcards.module.css";

/* --------------------------------------------------------FUNÇÕES PARA INFORMAÇÕES DO USUÁRIO---------------------------------------------------------------*/
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

/*---------------------------------------------------------- FRETE ??????? ----------------------------------------------------------------------- */
function parseKm(distanciaStr) {
  if (!distanciaStr) return 0;
  return Number(String(distanciaStr).replace(" km", "").replace(",", ".").trim()) || 0;
}

function parseMoeda(valorStr) {
  if (!valorStr) return 0;
  return Number(String(valorStr).replace("R$", "").replace(/\./g, "").replace(",", ".").trim()) || 0;
}
/* -------------------------------------------------------------- URL DAS APIS ----------------------------------------------------------------------- */
const apiUrlCargas = "http://127.0.0.1:5036/dashboard/cargasCadastradas";
const apiUrlMotoristas = "http://127.0.0.1:5036/dashboard/motoristasCadastrados";
const apiUrlVeiculos = "http://127.0.0.1:5036/dashboard/veiculosCadastrados";
const apiUrlClientes = "http://127.0.0.1:5036/dashboard/clientesCadastrados";

const apiCargas = "http://127.0.0.1:5036/cargas";
const apiMotoristas = "http://127.0.0.1:5036/motoristas";
const apiClientes = "http://127.0.0.1:5036/clientes";

export default function DashboardPage() {
  const [token, setToken] = useState(null);
  const [usuarioId, setUsuarioId] = useState("");
  const [usuarioNome, setUsuarioNome] = useState("")
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("")

  /* ------------------------------------------------------------ Gerando informações do usuario ----------------------------------------------- */
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

  /*---------------------------------------------------------- CARGAS CADASTRADAS ------------------------------------------------------------- */
  const [cargas, setCargas] = useState(0);
  useEffect(() => {
    if (!usuarioId) {
      return
    };
    const handleCargasCadastradas = async () => {
      try {
        const responseCargas = await fetch(`${apiUrlCargas}/${usuarioId}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        });
        const data = await responseCargas.json();
        setCargas(data["Cargas"]);

      } catch (err) {
        console.error("Erro ao buscar cargas:", err);

      }
    }
    handleCargasCadastradas();
  }, [usuarioId]);

  /* --------------------------------------------------------- MOTORISTAS CADASTRADOS ---------------------------------------------------------- */
  const [motoristas, setMotoristas] = useState(0);
  useEffect(() => {
    if (!usuarioId) {
      return
    };
    const handleMotoristasCadastrados = async () => {
      try {
        const responseMotoristas = await fetch(`${apiUrlMotoristas}/${usuarioId}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        });
        const data = await responseMotoristas.json();
        setMotoristas(data["Motoristas"]);

      } catch (err) {
        console.error("Erro ao buscar motoristas:", err);

      }
    }
    handleMotoristasCadastrados();
  }, [usuarioId]);

  /* -------------------------------------------------------- CLIENTES CADASTRADOS --------------------------------------------------------------*/
  const [clientes, setClientes] = useState(0);
  useEffect(() => {
    if (!usuarioId) {
      return
    };
    const handleClientesCadastrados = async () => {
      try {
        const responseClientes = await fetch(`${apiUrlClientes}/${usuarioId}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        });
        const data = await responseClientes.json();
        setClientes(data["Clientes"]);

      } catch (err) {
        console.error("Erro ao buscar clientes:", err);

      }
    }
    handleClientesCadastrados();
  }, [usuarioId]);

  /* -------------------------------------------------------- VEÍCULOS CADASTRADOS  ------------------------------------------------------------ */
  const [veiculos, setVeiculos] = useState(0);
  useEffect(() => {
    if (!usuarioId) {
      return
    };
    const handleVeiculosCadastrados = async () => {
      try {
        const responseVeiculos = await fetch(`${apiUrlVeiculos}/${usuarioId}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        });
        const data = await responseVeiculos.json();
        setVeiculos(data["Veiculos"]);

      } catch (err) {
        console.error("Erro ao buscar veiculos:", err);

      }
    }
    handleVeiculosCadastrados();
  }, [usuarioId]);
  /* ------------------------------------------------------------------------------------------------------------------------------------------- */

  const [freteTotal, kmTotal] = (() => {
    if (!cargas || !Array.isArray(cargas) || cargas.length === 0) return [0, 0];
    let ft = 0;
    let km = 0;

    for (const c of cargas) {
      ft += parseMoeda(c.valor_frete);
      km += parseKm(c.distancia);
    }
    return [ft, km];
  })();

  const formatCurrency = (n) =>
    (n ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatNumber = (n, decimals = 0) =>
    (n ?? 0).toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

  return (
    <><div className={styles.dashboardContainer}>

      <h1 className={styles.title}>Bem-vindo(a), {usuarioNome}!</h1>

      <h1 className={styles.title}>Painel de Controle</h1>
      <h2 className={styles.title2}>Resumo Cadastral</h2>

      {errorMessage && (
          <div style={{ color: "red", marginBottom: 12 }}>{errorMessage}</div>
        )}
        
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3>Cargas Cadastradas</h3>
          <span>{cargas}</span>
        </div>
        <div className={styles.card}>
          <h3>Clientes Cadastrados</h3>
          <span>{clientes}</span>
        </div>
        <div className={styles.card}>
          <h3>Motoristas Cadastrados</h3>
          <span>{motoristas}</span>
        </div>

        <div className={styles.card}>
          <h3>Veículos Cadastrados</h3>
          <span>{veiculos}</span>
        </div>
      </div>
    </div>
      <div className={styles.dashboardContainer} style={{ marginTop: 20 }}>
        <h2 className={styles.title2}>Dados de Frete</h2>

        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <h3>Frete Total Faturado(Bruto)</h3>
            <span>{formatCurrency(freteTotal)}</span>
            <small style={{ display: "block", opacity: 0.7 }}>
              {Array.isArray(cargas)
                ? `${cargas.length} viagens`
                : loading
                ? "Carregando..."
                : "Nenhuma viagem"}
            </small>
          </div>

          <div className={styles.card}>
            <h3>Total de Km's Rodados</h3>
            <span>{`${formatNumber(kmTotal, 2)} km`}</span>
            <small style={{ display: "block", opacity: 0.7 }}>
              {loading && "Carregando..."}
            </small>
          </div>
        </div>
      </div>

    </>

  );
}
