"use client";

import { useEffect, useState } from "react";
import styles from "./dashboardcards.module.css";

const apiCargas = "http://127.0.0.1:5036/cargas";
const apiMotoristas = "http://127.0.0.1:5036/motoristas";
const apiClientes = "http://127.0.0.1:5036/clientes";

function getIDUsuarioFromToken(token) {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const decoded = JSON.parse(atob(payload));
    return decoded.id_usuario ?? null;
  } catch {
    return null;
  }
}

function parseKm(distanciaStr) {
  if (!distanciaStr) return 0;
  return Number(String(distanciaStr).replace(" km", "").replace(",", ".").trim()) || 0;
}

function parseMoeda(valorStr) {
  if (!valorStr) return 0;
  return Number(String(valorStr).replace("R$", "").replace(/\./g, "").replace(",", ".").trim()) || 0;
}

export default function DashboardPage() {
  const [usuarioId, setUsuarioId] = useState(null);
  const [cargas, setCargas] = useState(null);
  const [motoristas, setMotoristas] = useState(null);
  const [clientes, setClientes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    const id = getIDUsuarioFromToken(token);
    setUsuarioId(id);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function fetchStaticCounts() {
      try {
        setLoading(true);
        const [motRes, cliRes] = await Promise.all([
          fetch(apiMotoristas),
          fetch(apiClientes)
        ]);

        if (!mounted) return;

        const motData = motRes.ok ? await motRes.json() : [];
        const cliData = cliRes.ok ? await cliRes.json() : [];

        setMotoristas(Array.isArray(motData) ? motData.length : 0);
        setClientes(Array.isArray(cliData) ? cliData.length : 0);
      } catch {
        setErrorMessage("Erro ao carregar dados básicos.");
        setMotoristas(0);
        setClientes(0);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchStaticCounts();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function fetchCargasAll() {
      try {
        setLoading(true);
        const res = await fetch(apiCargas);
        if (!mounted) return;

        const data = res.ok ? await res.json() : [];

        if (!Array.isArray(data)) {
          setCargas([]);
          return;
        }

        let userCargas = data;
        if (usuarioId !== null && data.some(c => c?.usuario_id !== undefined)) {
          userCargas = data.filter(c => Number(c.usuario_id) === Number(usuarioId));
        }

        setCargas(userCargas);
      } catch {
        setErrorMessage("Erro ao carregar cargas.");
        setCargas([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchCargasAll();
    return () => { mounted = false; };
  }, [usuarioId]);

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
    <>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.title}>Painel de Controle</h1>
        <h2 className={styles.title2}>Resumo Cadastral</h2>

        {errorMessage && (
          <div style={{ color: "red", marginBottom: 12 }}>{errorMessage}</div>
        )}

        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <h3>Cargas Cadastradas</h3>
            <span>{Array.isArray(cargas) ? cargas.length : (cargas ?? 0)}</span>
            <small style={{ display: "block", opacity: 0.7 }}>
              {loading && "Carregando..."}
            </small>
          </div>

          <div className={styles.card}>
            <h3>Clientes Cadastrados</h3>
            <span>{clientes ?? 0}</span>
            <small style={{ display: "block", opacity: 0.7 }}>
              {loading && "Carregando..."}
            </small>
          </div>

          <div className={styles.card}>
            <h3>Motoristas Cadastrados</h3>
            <span>{motoristas ?? 0}</span>
            <small style={{ display: "block", opacity: 0.7 }}>
              {loading && "Carregando..."}
            </small>
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
