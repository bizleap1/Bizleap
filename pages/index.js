import AboutSection from "../components/AboutSection";
import Hero from "../components/Hero";
import ServicesSection2 from "../components/Services";

import Work from "../components/Work";

export default function Home() {
  return (
    <section>
      <Hero/>
      <AboutSection/>
      <ServicesSection2/>
      <Work/>
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-2">Next + Tailwind Boilerplate</h1>
        <p className="text-gray-600">A clean, minimal starting point.</p>
      </div>
    </main>
    </section>
  )
}
