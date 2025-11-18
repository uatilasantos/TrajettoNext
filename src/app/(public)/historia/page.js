import styles from "./historia.module.css";
import Image from "next/image";

export default function HistoriaPage() {
  return (
    <main className={styles.container}>
      {/* <h1 className={styles.title}>Nossos Serviços</h1> */}
      <h3 className={styles.descricao}>A TRAJETTO é uma startup de mobilidade logistica, nascida a partir de um projeto de universitario,
        onde uma grupo de amigos se uniram para desenvolver um projeto que combinava 3 materias que eram ministradas no semestre em questão.
        Focados e determinados a entregar algo diferente e que fizesse sentido, nasceu a TRAJETTO.
      </h3>

      {/*bloco 1*/}
      <section className={styles.card}>
        <div className={styles.image}>
          <Image
           src="/mission.png"
            alt="Missão"
            width={220}
            height={220}
          />
        </div>

        <div className={styles.text}>
          <h2>Missão</h2>
          <p>
            Nossa missão é atender a todos os nossos clientes com excelência e prontidão, proporcionando
            a mais alta tecnologia de gerenciamento logistico do mercado.
          </p>
        </div>
      </section>

      {/*bloco 2*/}
      <section className={`${styles.card} ${styles.reverse}`}>
        <div className={styles.image}>
          <Image
            src="/visao.png"
            alt="Visão"
            width={220}
            height={220}
          />
        </div>

        <div className={styles.text}>
          <h2>Visão</h2>
          <p>
            Nossa visão é alcançar o posto mais alto em tecnologia, pesquisa e genciamento logistico, sendo referẽncia nacional e mundial
            no segmento.
          </p>
        </div>
      </section>

      {/*bloco 3*/}
      <section className={styles.card}>
        <div className={styles.image}>
          <Image
            src="/valores.png"
            alt="Valores"
            width={220}
            height={220}
          />
        </div>

        <div className={styles.text}>
          <h2>Valores</h2>
          <p>
            Nossos valores são pautados e praticados em transparência, caráter, pontualidade e acessibilidade,
            acreditamos em uma ambiente que atenda a todos, onde tudo com trabalho e dedicação é possível.
          </p>
        </div>
      </section>
    
    </main>
  );
}
