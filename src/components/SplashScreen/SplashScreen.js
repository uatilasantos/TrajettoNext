"use client";

import Image from "next/image";
import "./SplashScreen.css";

export default function SplashScreen() {
  return (
    <div className="splash">
      <Image
        src="/logobranco1.png"
        alt="Trajetto Express"
        width={220}
        height={100}
        priority
        className="splash-logo"
      />
    </div>
  );
}