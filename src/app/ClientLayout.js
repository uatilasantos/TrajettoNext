"use client";

import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen/SplashScreen";

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <SplashScreen />}
      {!loading && children}
    </>
  );
}