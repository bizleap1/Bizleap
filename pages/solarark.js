// pages/work/solarark.js
import Image from "next/image";
import Link from "next/link";

export default function SolarArk() {
  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[55vh]">
        <Image
          src="/images/Solar.png"
          alt="Solar Ark Hero"
          fill
          className="object-cover"
          priority
        />
 <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6 md:px-20">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            Solar Ark
          </h1>
          <div className="w-16 h-1 bg-white/90 mb-6"></div>
          
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-3 text-white/90 text-sm md:text-base"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            <Link href="/" className="hover:underline transition-all duration-200">
              Home
            </Link>
            <span className="opacity-50">|</span>
            <Link href="/work" className="hover:underline transition-all duration-200">
              Projects
            </Link>
            <span className="opacity-50">|</span>
            <span className="font-semibold text-white">Solar Ark</span>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="w-full px-6 md:px-20 py-16 md:py-24">
  
  {/* Mobile = centered max-width  
      PC = full width, no max width */}
  <div className="max-w-4xl mx-auto md:max-w-none md:mx-0">

    <h2
      className="text-3xl md:text-4xl font-bold mb-8 text-gray-900"
      style={{ fontFamily: '"Noto Sans", sans-serif' }}
    >
      Project Overview
    </h2>

    <div
      className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-700"
      style={{ fontFamily: '"Noto Sans", sans-serif' }}
    >
      <p>
        <strong className="text-gray-900">Solar Ark</strong> represents a
        forward-thinking vision of renewable energy, blending advanced
        technology with clean-energy principles to create a sustainable solar
        ecosystem. Designed to harness sunlight with high efficiency, Solar Ark
        integrates intelligent energy systems, modern engineering, and
        future-ready innovations.
      </p>

      <p>
        The project focuses on reducing carbon footprints, delivering reliable
        solar output, and enabling smart-grid compatibility. With its sleek
        structural design and eco-centric implementation, Solar Ark redefines
        how residential and commercial setups utilize renewable energy.
      </p>
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-3 mt-12">
      {[
        "Brand Strategy",
        "Design",
        "Sustainability",
        "Energy Innovation",
      ].map((tag, idx) => (
        <span
          key={idx}
          className="px-5 py-2.5 border border-gray-800 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,0.1)] text-sm font-semibold bg-white hover:shadow-[3px_3px_0px_rgba(0,0,0,0.15)] transition-all duration-200"
          style={{ fontFamily: '"Noto Sans", sans-serif' }}
        >
          {tag}
        </span>
      ))}
    </div>

  </div>
</div>


      {/* Gallery */}
      <div className="w-full overflow-hidden space-y-4 md:space-y-8 px-6 md:px-0">
        {/* IMG 1 */}
        <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/Solar2.png"
            alt="Solar Ark installation showing modern solar panels"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* IMG 2 */}
        <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/Solar3.png"
            alt="Solar Ark technology and infrastructure details"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Back to Projects Link */}
      <div className="w-full px-6 md:px-20 py-12">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/work"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all duration-200 font-semibold group"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}