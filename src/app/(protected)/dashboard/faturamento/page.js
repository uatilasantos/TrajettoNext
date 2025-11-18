"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function PaginaFaturamento() {
  const [cargas, setCargas] = useState([]);
  const [motoristas, setMotoristas] = useState([]);

  useEffect(() => {
    async function fetchMotoristas() {
      try {
        const res = await fetch("http://127.0.0.1:5036/motoristas");
        const data = await res.json();
        setMotoristas(data);
      } catch (err) {
        console.error("Erro ao carregar motoristas", err);
      }
    }

    async function fetchCargas() {
      try {
        const res = await fetch("http://127.0.0.1:5036/cargas");
        const data = await res.json();
        setCargas(data);
      } catch (err) {
        console.error("Erro ao carregar cargas", err);
      }
    }

    fetchMotoristas();
    fetchCargas();
  }, []);

  const parseKm = (distanciaStr) => {
    if (!distanciaStr) return 0;
    return Number(distanciaStr.replace(" km", "").replace(",", ".").trim());
  };

  const parseMoeda = (valorStr) => {
    if (!valorStr) return 0;
    return Number(
      valorStr.replace("R$", "").replace(".", "").replace(",", ".").trim()
    );
  };

  const valorDiesel = 6.06;
  const consumoMedio = 2.5;
  const pedagioBase = 3.5;

  const calcularPedagio = (km) => {
    if (km <= 60) return 0;
    const extra = km - 60;
    return Math.floor(extra / 15) * pedagioBase;
  };

  let totalKm = 0;
  let totalCombustivel = 0;
  let totalPedagios = 0;
  let totalBruto = 0;

  const totalSalarios = motoristas.reduce(
    (acc, m) => acc + Number(m.salario || 0),
    0
  );

  const dadosFaturamento = cargas
    .filter((c) => c && c.distancia && c.valor_frete)
    .map((c) => {
      const km = parseKm(c.distancia);
      const valorFrete = parseMoeda(c.valor_frete);

      const litrosConsumidos = km / consumoMedio;
      const combustivel = litrosConsumidos * valorDiesel;
      const pedagios = calcularPedagio(km);

      const liquidoSemSalario = valorFrete - combustivel - pedagios;

      totalKm += km;
      totalCombustivel += combustivel;
      totalPedagios += pedagios;
      totalBruto += valorFrete;

      return {
        nome: c.destino_carga,
        bruto: valorFrete,
        liquido: liquidoSemSalario,
      };
    });

  const totalLiquido =
    totalBruto - totalCombustivel - totalPedagios - totalSalarios;

  const format = (n) =>
    n.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        Faturamento
      </h1>

      {/* cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <Card titulo="Total de Pedágios" valor={`R$ ${format(totalPedagios)}`} />
        <Card titulo="Gasto com Combustível" valor={`R$ ${format(totalCombustivel)}`} />
        <Card titulo="Total de KM Rodados" valor={`${format(totalKm)} km`} />
        <Card titulo="Faturamento Bruto Total" valor={`R$ ${format(totalBruto)}`} />
        <Card titulo="Total gasto com salários" valor={`R$ ${format(totalSalarios)}`} />
        <Card titulo="Faturamento Líquido Total" valor={`R$ ${format(totalLiquido)}`} />
      </div>

      {/* faturamento bruto */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          width: "100%",
        }}
      >
        <h2 style={{ marginBottom: "15px", fontSize: "20px" }}>
          Faturamento Bruto
        </h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={dadosFaturamento}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bruto" stroke="blue" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* faturamento liquido */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          width: "100%",
        }}
      >
        <h2 style={{ marginBottom: "15px", fontSize: "20px" }}>
          Faturamento Líquido
        </h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={dadosFaturamento}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="liquido" stroke="green" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Card({ titulo, valor }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      }}
    >
      <p style={{ fontSize: "14px", opacity: 0.7 }}>{titulo}</p>
      <h3 style={{ fontSize: "22px", marginTop: "5px" }}>{valor}</h3>
    </div>
  );
}
