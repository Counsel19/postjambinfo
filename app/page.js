"use client"

import Banner from "@/components/Banner";
import FAQ from "@/components/FAQ";
import HowItWorks from "@/components/HowItWorks";
import Register from "@/components/Register";
import WCU from "@/components/WCU";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const { handleInputChange } = useAppContext()
  return (
    <main onClick={() => handleInputChange("showDesktopDD", false)}>
      <Banner />
      <WCU />
      <HowItWorks />
      <Register />
      <FAQ />
    </main>
  );
}
