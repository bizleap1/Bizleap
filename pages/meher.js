// pages/work/meher.js
import Image from "next/image";
import Link from "next/link";

export default function Meher() {
  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[55vh]">
        <Image
          src="/images/Meher.png"
          alt="Meher Infra Solutions Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6 md:px-20">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            Meher Infra Solutions
          </h1>
          <div className="w-16 h-1 bg-white/90 mb-6"></div>

          {/* Breadcrumb */}
          <div
            className="flex items-center gap-3 text-white/90 text-sm md:text-base"
            style={{ fontFamily: '"Noto Sans", sans-serif' }}
          >
            <Link href="/" className="hover:underline transition-all duration-200">Home</Link>
            <span className="opacity-50">|</span>
            <Link href="/work" className="hover:underline transition-all duration-200">Projects</Link>
            <span className="opacity-50">|</span>
            <span className="font-semibold text-white">Meher Infra Solutions</span>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="w-full px-6 md:px-20 py-16 md:py-24">
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
              <strong className="text-gray-900">Meher Infra Solutions</strong> focuses on sustainable infrastructure development with futuristic and efficient design approaches.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-12">
            {["Brand Strategy", "Design", "Infrastructure", "Sustainability"].map((tag, idx) => (
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
        <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/Meher2.png"
            alt="Meher Infra Solutions Project Visual"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Back to Projects */}
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