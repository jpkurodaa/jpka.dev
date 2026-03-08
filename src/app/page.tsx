import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Worlds from "@/components/sections/Worlds";
import Timeline from "@/components/sections/Timeline";
import Now from "@/components/sections/Now";
import Connect from "@/components/sections/Connect";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <Manifesto />
        <Worlds />
        <Timeline />
        <Now />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
