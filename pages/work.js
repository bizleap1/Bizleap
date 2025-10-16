// pages/work.js
import { useState } from "react";
import Image from "next/image";
import PortfolioSection from "../components/PortfolioCard";

export default function Work() {
  const [activeProject, setActiveProject] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Solar Ark",
      thumb: "/images/Solar.png",
      images: ["/images/Solar2.png", "/images/Solar3.png"],
      description:
        "Solar Ark is a smart solar initiative blending innovation and sustainability through next-gen energy systems.",
    },
    {
      id: 2,
      title: "Masato",
      thumb: "/images/Masato.png",
      images: ["/images/Masato2.png"],
      description:
        "Masato delivers authentic culinary experiences wrapped in tradition and taste with modern aesthetics.",
    },
    {
      id: 3,
      title: "Meher Infra Solutions",
      thumb: "/images/Meher.png",
      images: ["/images/Meher2.png"],
      description:
        "Meher Infra Solutions focuses on sustainable infrastructure development with futuristic design approaches.",
    },
    {
      id: 4,
      title: "Tuli Restro",
      thumb: "/images/Tuii.png",
      images: ["/images/Tuii2.png"],
      description:
        "Tuli Restro combines fine dining and vibrant ambiance to redefine culinary luxury and experience.",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white px-6 md:px-16 lg:px-24 py-20">
      {/* Inline animation styles */}
      <style jsx>{`
        @keyframes fadeBlur {
          from {
            opacity: 0;
            filter: blur(8px);
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }
        @keyframes expand {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 2000px;
            transform: translateY(0);
          }
        }
        .animate-fadeBlur {
          animation: fadeBlur 0.6s ease-in-out both;
        }
        .animate-expand {
          animation: expand 0.5s ease-in-out both;
        }
      `}</style>

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight animate-fadeBlur">
        Explore our <br />
        <span className="text-yellow-400">Work</span>
      </h1>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-10 mt-16 animate-fadeBlur">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`cursor-pointer border border-gray-700 rounded-2xl bg-gradient-to-b from-gray-900/60 to-black hover:border-yellow-400 transition-all hover:shadow-[0_0_25px_rgba(255,255,0,0.15)] ${
              activeProject === project.id ? "scale-[1.01]" : ""
            } animate-fadeBlur`}
            onClick={() =>
              setActiveProject(activeProject === project.id ? null : project.id)
            }
          >
            {/* Thumbnail */}
            <div className="w-full h-64 relative overflow-hidden rounded-t-2xl">
              <Image
                src={project.thumb}
                alt={project.title}
                fill
                className="object-contain bg-black transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Title and Desc */}
            <div className="p-6 transition-all duration-500 hover:brightness-110">
              <h2 className="text-2xl font-semibold mb-2 text-yellow-400">
                {project.title}
              </h2>
              <p className="text-gray-300 text-sm md:text-base">
                {activeProject === project.id
                  ? project.description
                  : "Click to explore more..."}
              </p>
            </div>

            {/* Expanded Section */}
            {activeProject === project.id && (
              <div className="p-6 border-t border-gray-700 animate-expand">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {project.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative cursor-pointer group overflow-hidden rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFullscreenImage(img);
                      }}
                    >
                      <Image
                        src={img}
                        alt={project.title}
                        width={400}
                        height={250}
                        className="object-contain bg-black transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-gray-300">{project.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Image Viewer */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeBlur"
          onClick={() => setFullscreenImage(null)}
        >
          <Image
            src={fullscreenImage}
            alt="Fullscreen"
            width={1200}
            height={800}
            className="object-contain max-h-[90vh] rounded-lg"
          />
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-yellow-400"
            onClick={() => setFullscreenImage(null)}
          >
            ✕
          </button>
        </div>
      )}
      <PortfolioSection/>
    </div>
  );
}
