import AboutSection from "../components/AboutSection";
import ClientsSection from "../components/ClientsSection";
import Hero from "../components/Hero";
import PortfolioCard from "../components/PortfolioCard";
import ServicesSection2 from "../components/Services";
import Stats from "../components/Stats";

import Work from "../components/Work";

export default function Home() {
  return (
    <section>
      <Hero/>
      <AboutSection/>
      <Stats/>
      <ServicesSection2/>
      
      
      <Work/>
      <ClientsSection/>
      
    
    </section>
  )
}
