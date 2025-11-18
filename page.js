
  
  return (
    <>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.title}>Painel de Controle</h1>
        <h2 className={styles.title2}>Resumo Cadastral</h2>

        

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

      
    </>
  );
}