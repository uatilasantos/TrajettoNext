// "use client";

// import Link from "next/link";
// import LoginButton from "./LoginButton";
// import { FiMenu, FiX } from "react-icons/fi";
// import { useState } from "react";
// import "./HeaderHero.css";

// export default function HeaderHero() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="hero-header">
//       <div className="header-topbar">
//         {/*menu superior */}
//         <div className="hero-top">
//           <div className="logo">
//             <Link href="/">
//               <img src="/logo.png" alt="Trajetto Express" />
//             </Link>
//           </div>

//           <nav className={`nav ${open ? "open" : ""}`}>
//             <ul className="nav-list">
//               <li><Link href="/">Home</Link></li>
//               <li><Link href="/servicos">Serviços</Link></li>
//               <li><Link href="/planos">Planos</Link></li>
//               <li><Link href="/historia">Nossa história</Link></li>
//               <li><Link href="/sustentabilidade">Sustentabilidade</Link></li>
//             </ul>
//           </nav>

//           <div className="right-section">
//             <LoginButton />
//             <button className="menu-btn" onClick={() => setOpen(!open)}>
//               {open ? <FiX size={24} /> : <FiMenu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/*bloco abaixo do menu superior*/}
//         <div className="hero-content">
//           <h1>Simplifique sua Logística.<br/>Escolha o Plano Perfeito</h1>
//           <p>Gerencie suas entregas e otimize sua frota com nossos planos flexíveis e eficientes.</p>
//           <Link href="/planos" className="hero-btn">Ver Planos</Link>
//         </div>
//       </div>
//     </header>
//   );
// }



"use client";

import Link from "next/link";
import LoginButton from "./LoginButton";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import "./HeaderHero.css";

export default function HeaderHero() {
  const [open, setOpen] = useState(false);

  return (
    <header className="hero-header">
      <div className="header-topbar">

        <div className="header-align">
          <div className="logo">
            <Link href="/">
              <img src="/logobranco.png" alt="Trajetto Express" />
            </Link>
          </div>

          <nav className={`nav ${open ? "open" : ""}`}>
            <ul className="nav-list hero-nav">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/servicos">Serviços</Link></li>
              <li><Link href="/planos">Planos</Link></li>
              <li><Link href="/historia">Nossa história</Link></li>
            </ul>
          </nav>

          <div className="right-section">
            <LoginButton />
            <button className="menu-btn" onClick={() => setOpen(!open)}>
              {open ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        <div className="hero-content">
          <h1>Simplifique sua Logística.<br/></h1>
          <p>Gerencie suas entregas e otimize sua frota com nosso sistema.</p>
          {/* <Link href="/planos" className="hero-btn">Ver Planos</Link> */}
        </div>

      </div>
    </header>
  );
}
