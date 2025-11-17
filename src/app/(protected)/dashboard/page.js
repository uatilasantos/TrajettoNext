"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import styles from "./dashboardcards.module.css";
//import { useRouter } from "next/navigation";
//import Link from "next/link";
//import Image from "next/image";
//import { getCookie } from "cookies-next";



const apiUrlCargas = "http://127.0.0.1:5036/dashboard/cargasCadastradas";

// pegar id do usuario a partir do token
export function getIDUsuario(token) {
  if (!token) return 0;

  const decoded = jwtDecode(token);
  console.log("DECODED:", decoded);
  return decoded.id_usuario;
}

// pegar nome do usuario a partir do token -> Caso for exibir Bem-vindo(a), Fulano!
function getNomeUsuario(token) {
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.nome_usuario;
}

export default function DashboardPage() {
  const [token, setToken] = useState(null);
  const [usuarioId, setUsuarioId] = useState("");
  const [cargas, setCargas] = useState(0);
  const [errorMessage, setErrorMessage] = useState("")

  // NUM DE CADASTRO DE CARGAS --------------------------------------------------------------------------
  useEffect(() => {
    const pegandoToken = localStorage.getItem("auth_token");
    if (pegandoToken) {
      setToken(pegandoToken);
      const id_usuario = getIDUsuario(pegandoToken);
      setUsuarioId(id_usuario);
    }
  }), [];

  useEffect(() => {
    if (!usuarioId) {
      return
    };
    const handleCargasCadastradas = async () => {
      try {
        console.log("Requisição com ID Usuario: " + usuarioId)

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
    // Para não dar loop infinito
    handleCargasCadastradas();

    // Para conseguir tem a troca de conta
  }, [usuarioId])

  const [motoristas, setMotoristas] = useState(0);
  const [clientes, setClientes] = useState(0);
  const [frete, setFretes] = useState(0);

  //Descomenta o bloco abaixo quando quiser integrar com a API Flask
  /*
    useEffect(() => {
      async function fetchData() {
        try {
          const [motRes, carRes, cliRes] = await Promise.all([
            fetch("http://127.0.0.1:5036/motoristas"),
            fetch("http://127.0.0.1:5036/cargas"),
            fetch("http://127.0.0.1:5036/clientes")
          ]);
  
          const [motData, carData, cliData] = await Promise.all([
            motRes.json(),
            carRes.json(),
            cliRes.json()
          ]);
  
          setMotoristas(motData.length);
          setCargas(carData.length);
          setClientes(cliData.length);
        } catch (error) {
          console.error("Erro ao buscar dados do dashboard:", error);
        }
      }
  
      fetchData();
    }, []);
    */

  return (
    <><div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Painel de Controle</h1>
      <h2 className={styles.title2}>Resumo Cadastral</h2>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3>Cargas Cadastradas</h3>
          <span>{cargas || cargas}</span>
        </div>
        <div className={styles.card}>
          <h3>Clientes Cadastrados</h3>
          <span>{clientes || 8}</span>
        </div>
        <div className={styles.card}>
          <h3>Motoristas Cadastrados</h3>
          <span>{motoristas || 4}</span>
        </div>
      </div>
    </div><div className={styles.dashboardContainer}>
        <h2 className={styles.title2}>Dados de Frete</h2>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <h3>Frete Total Faturado</h3>
            <span>{motoristas || 4}</span>
          </div>
          <div className={styles.card}>
            <h3>Total de Km's Rodados</h3>
            <span>{cargas || 19}</span>
          </div>
        </div>
      </div></>

  );
}
