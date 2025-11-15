"use client";

import "./Footer.css";
import { FiInstagram, FiYoutube, FiTwitter, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>TRAJETTO EXPRESS</h3>
          <p>Conectando lugares, entregando confiança.</p>
          <div className="social-icons">
            <a href="#">
              <FiInstagram />
            </a>
            <a href="#">
              <FiYoutube />
            </a>
            <a href="#">
              <FiTwitter />
            </a>
          </div>
        </div>

        <div className="footer-right">
          <h4>Newsletter</h4>
          <h5>Preencha seu e-mail e seja notificado sobre novidades.</h5>
          <form className="newsletter">

            <input placeholder="Digite seu e-mail" required/>
            <button onClick={() => {alert("Parabéns, agora você faz parte da lista de transmissão da nossa newssletter!");}} type="submit">
              <FiMail />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2025 Todos os direitos reservados - Trajetto Express - CNPJ:
          00.111.222/0001-55
        </p>
      </div>
    </footer>
  );
}
