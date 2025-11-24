"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import styles from "./faturamento.module.css";

// URL da API de faturamento
const apiUrlFaturamento = "http://127.0.0.1:5036/dashboard/faturamento";

export default function FaturamentoPage() {
  const [usuarioId, setUsuarioId] = useState(null);
  const [faturamento, setFaturamento] = useState(null);
  const [usuarioNome, setUsuarioNome] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  function getIDUsuario(token) {
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.id_usuario;
  }

  function getNomeUsuario(token) {
    if (!token) return "";
    const decoded = jwtDecode(token);
    return decoded.nome_usuario;
  }

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setUsuarioId(getIDUsuario(token));
      setUsuarioNome(getNomeUsuario(token));
    }
  }, []);

  useEffect(() => {
    if (!usuarioId) return;

    const fetchFaturamento = async () => {
      try {
        const response = await fetch(`${apiUrlFaturamento}/${usuarioId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar faturamento");
        }

        const data = await response.json();
        setFaturamento(data);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaturamento();
  }, [usuarioId]);

  if (loading) return <p className="text-center mt-10 text-lg">Carregando...</p>;
  if (errorMessage)
    return <p className="text-center mt-10 text-red-500">{errorMessage}</p>;
  if (!faturamento) return null;

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Faturamento</h1>
      <h2 className={styles.title2}>Usuário: {usuarioNome}</h2>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: 12 }}>{errorMessage}</div>
      )}

      {/* CARDS PRINCIPAIS */}
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3>Total Bruto</h3>
          <span>R$ {faturamento.total_bruto.toFixed(2)}</span>
        </div>

        <div className={styles.card}>
          <h3>Total Líquido</h3>
          <span>R$ {faturamento.total_liquido.toFixed(2)}</span>
        </div>

        <div className={styles.card}>
          <h3>Total de Salários</h3>
          <span>R$ {faturamento.total_salarios.toFixed(2)}</span>
        </div>

        <div className={styles.card}>
          <h3>Total de Combustível</h3>
          <span>R$ {faturamento.total_combustivel.toFixed(2)}</span>
        </div>

        <div className={styles.card}>
          <h3>Total de Pedágios</h3>
          <span>R$ {faturamento.total_pedagios.toFixed(2)}</span>
        </div>

        <div className={styles.card}>
          <h3>Total de KM Rodados</h3>
          <span>{faturamento.total_km.toFixed(1)} km</span>
        </div>
      </div>

      {/* DETALHAMENTO POR CARGA */}
      <h2 className={styles.title2} style={{ marginTop: 40 }}>
        Detalhamento por carga
      </h2>

      <div className={styles.cardsContainer}>
        {faturamento.detalhado.map((carga, index) => (
          <div key={index} className={styles.card}>
            <h3>{carga.nome}</h3>
            <span>Bruto: R$ {carga.bruto.toFixed(2)}</span>
            <span> Líquido: R$ {carga.liquido.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
