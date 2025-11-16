"use client";

import Image from "../../../public/logo";

export default function Logo() {
  return (
    <div className="logo">
      <Image
        src="logo.png"
        alt="Trajetto Express"
        width={160}
        height={60}
        priority
      />
    </div>
  );
}
