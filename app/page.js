import Banner from "@/components/Banner";
import FAQ from "@/components/FAQ";
import HowItWorks from "@/components/HowItWorks";
import Register from "@/components/Register";
import WCU from "@/components/WCU";

export default function Home() {
  return (
    <main className="">
      <Banner />
      <WCU />
      <HowItWorks />
      <Register />
      <FAQ />
    </main>
  );
}
