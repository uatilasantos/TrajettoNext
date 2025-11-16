"use client";

import { useEffect, useState } from "react";
import styles from "./home.module.css";


export default function Slider() {
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.titulo}>
        <h2> Parceiros </h2>
      </div>
      <section className={styles.slider}>
        <div className={styles.sliderContent}>
          <div
            className={`${styles.slideBox} ${styles.primeiro}`}
            style={{ marginLeft: `${(current - 1) * -25}%` }}>

            <img className={styles.imgDesktop} src="/banner.png" alt="slide 1" />
            <img className={styles.imgMobile} src="/banner_mobile1.png" alt="slide 1 mobile" />
          </div>

          <div className={styles.slideBox}>
            <img className={styles.imgDesktop} src="/banner2.png" alt="slide 2" />
            <img className={styles.imgMobile} src="/banner_mobile2.png" alt="slide 2 mobile" />
          </div>

          <div className={styles.slideBox}>
            <img className={styles.imgDesktop} src="/banner3.png" alt="slide 3" />
            <img className={styles.imgMobile} src="/banner_mobile3.png" alt="slide 3 mobile" />
          </div>

          <div className={styles.navAuto}>
            <div className={current === 1 ? styles.active : ""}></div>
            <div className={current === 2 ? styles.active : ""}></div>
            <div className={current === 3 ? styles.active : ""}></div>
          </div>
        </div>
      </section>


      {/* ---- CARDS INFERIORES ---- */}
      <div className={styles.titulo}>
        <h2>Controle na palma da mão</h2>
      </div>
      <div className={styles.cardsWrapper}>
        <div className={`${styles.card} ${styles.card1}`}>
          <img src="/driver.png" alt="Cargas" className={styles.cardIcon} />
          <h3>Motoristas</h3>
          <p>Gerencie e consulte todos os motoristas da sua empresa.</p>
        </div>

        <div className={`${styles.card} ${styles.card2}`}>
          <img src="/truck2.png" alt="Veículos" className={styles.cardIcon} />
          <h3>Veículos</h3>
          <p>Gerencie sua frota de veículos, saiba em tempo real onde cada veçulo está.</p>
        </div>

        <div className={`${styles.card} ${styles.card3}`}>
          <img src="/carga.png" alt="relatorios" className={styles.cardIcon} />
          <h3>Entregas</h3>
          <p>Consulte e acompanhe todas as entregas registradas.</p>
        </div>
      </div>
    </main>
  );
}
