"use client";

import { useEffect, useState } from "react";
import styles from "./slider.module.css";


export default function Slider() {
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.slider}>
      <div className={styles.sliderContent}>
        <input type="radio" name="btn-radio" id="radio1" checked={current === 1} readOnly />
        <input type="radio" name="btn-radio" id="radio2" checked={current === 2} readOnly />
        <input type="radio" name="btn-radio" id="radio3" checked={current === 3} readOnly />

        <div className={`${styles.slideBox} ${styles.primeiro}`} style={{ marginLeft: `${(current - 1) * -25}%` }}>
          <img className={styles.imgDesktop} src="banner1.png" alt="slide 1" />
        </div>

        <div className={styles.slideBox}>
          <img className={styles.imgDesktop} src="banner2.png" alt="slide 2" />
        </div>

        <div className={styles.slideBox}>
          <img className={styles.imgDesktop} src="banner3.png" alt="slide 3" />
        </div>

        <div className={styles.navAuto}>
          <div className={current === 1 ? styles.active : ""}></div>
          <div className={current === 2 ? styles.active : ""}></div>
          <div className={current === 3 ? styles.active : ""}></div>
        </div>

        <div className={styles.navManual}>
          <button onClick={() => setCurrent(1)} className={styles.manualBtn}></button>
          <button onClick={() => setCurrent(2)} className={styles.manualBtn}></button>
          <button onClick={() => setCurrent(3)} className={styles.manualBtn}></button>
        </div>
      </div>
    </section>
  );
}
