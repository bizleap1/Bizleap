import Head from "next/head";
import AboutSection from "../components/AboutSection";
import ClientsSection from "../components/ClientsSection";
import Hero from "../components/Hero";
import MediaSection from "../components/MediaSection";
import PortfolioCard from "../components/PortfolioCard";
import ServicesSection2 from "../components/Services";
import Stats from "../components/Stats";

import Work from "../components/Work";

export default function Home() {
  return (
    <>
    <Head>
        <title>Bizleap - Where Brands Leap Forward</title>
        <meta
          name="description"
          content="Bizleap is a digital marketing and web development agency helping brands grow online through SEO, modern websites, creative design, and technology-driven solutions."
        />
        <meta
          name="keywords"
          content="bizleap, digital marketing, web development, branding, seo services"
        />
      </Head>
    <section>
      <Hero/>
      <AboutSection/>
      <Stats/>
      
      <ServicesSection2/>
      
      
      <Work/>
      <MediaSection/>
      <ClientsSection/>
      
    
    </section>
    </>
  )
}
