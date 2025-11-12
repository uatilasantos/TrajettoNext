"use client";

import { useEffect, useState } from "react";
import styles from "./dashboardcards.module.css";

export default function DashboardPage() {
  const [motoristas, setMotoristas] = useState(0);
  const [cargas, setCargas] = useState(0);
  const [clientes, setClientes] = useState(0);

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
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Painel de Controle</h1>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3>Motoristas Cadastrados</h3>
          <span>{motoristas || 4}</span>
        </div>
        <div className={styles.card}>
          <h3>Cargas Cadastradas</h3>
          <span>{cargas || 19}</span>
        </div>
        <div className={styles.card}>
          <h3>Clientes Cadastrados</h3>
          <span>{clientes || 8}</span>
        </div>
      </div>
    </div>
  );
}
