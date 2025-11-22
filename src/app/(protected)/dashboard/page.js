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

/* -------------------------------------------------------------- URL DAS APIS ----------------------------------------------------------------------- */
const apiUrlCargas = "http://127.0.0.1:5036/dashboard/cargasCadastradas";
const apiUrlMotoristas = "http://127.0.0.1:5036/dashboard/motoristasCadastrados";
const apiUrlVeiculos = "http://127.0.0.1:5036/dashboard/veiculosCadastrados";
const apiUrlClientes = "http://127.0.0.1:5036/dashboard/clientesCadastrados";
const apiUrlTotais = "http://127.0.0.1:5036/dashboard/totaisCargas";

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

  /*-------------------------Totais de frete------------------*/

const [totalFrete, setTotalFrete] = useState(0);
const [totalKM, setTotalKM] = useState(0);

useEffect(() => {
  if (!usuarioId) return;

  const fetchTotaisCargas = async () => {
    try {
      const response = await fetch(`${apiUrlTotais}/${usuarioId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar totais de cargas");
      }

      const data = await response.json();
      setTotalFrete(data.TotalFrete);
      setTotalKM(data.TotalKM);
    } catch (err) {
      console.error(err);
    }
  };

  fetchTotaisCargas();
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

        <div className={styles.card}>
          <h3>Total de faturamento</h3>
          <span>R$ {totalFrete.toFixed(2)}</span>
        </div>

        <div className={styles.card}>
          <h3>Total de KM rodados</h3>
          <span>{totalKM}</span>
        </div>
        
      </div>
    </div>

    </>

  );
}