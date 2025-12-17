"use client";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Mail } from "lucide-react";

const founders = [
  {
    name: "Akshat Soni",
    role: "Co-Founder & CEO",
    image: "/team/akshat.jpg",
    linkedin: "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiBjpHAq6iQAxX8yzgGHa19OF8QFnoECBwQAQ&url=https%3A%2F%2Fin.linkedin.com%2Fin%2Ftheakshatsoni&usg=AOvVaw1jyn5w2G8sfM5A77RFb3eE&cshid=1760604807211931&opi=89978449",
    instagram: "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiBw-_Yq6iQAxUYzDgGHWNRAdEQFnoECCAQAQ&url=https%3A%2F%2Fwww.instagram.com%2Fakshatsoni.in%2F&usg=AOvVaw3PESBA4FruVlwXfbvqKsxD&opi=89978449",
    
  },
  {
    name: "Kaushal Banginwar",
    role: "Co-Founder & CTO",
    image: "/team/77.png",
    linkedin: "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiL7MTnq6iQAxUJ1TgGHaIeOs8QFnoECBoQAQ&url=https%3A%2F%2Fin.linkedin.com%2Fin%2Fkaushalbanginwar&usg=AOvVaw2kTuQvtbZNzZ1X_6KSLhjW&opi=89978449",
    instagram: "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiL7MTnq6iQAxUJ1TgGHaIeOs8QFnoECB0QAQ&url=https%3A%2F%2Fwww.instagram.com%2Fkaushalbanginwar.in%2F&usg=AOvVaw3gv5GYW0bxmVyub0ofGM9t&opi=89978449",
    
  },
];

const team = [
  {
    name: "Samir Thumbe",
    role: "CFO",
    image: "/team/79.png",
    style: { transform: "scale(1.1) translateY(-10px)" },
    size: "h-48 w-48",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Antara Vibhandik",
    role: "Senior Designer",
    image: "/team/80.png",
    style: { transform: "scale(1.05) translateX(5px)" },
    size: "h-44 w-44",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Neil Vyas",
    role: "Content Manager",
    image: "/team/81.png",
    style: { transform: "translateY(10px)" },
    size: "h-52 w-52",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Kalyani Banginwar",
    role: "UI UX Designer",
    image: "/team/82.png",
    size: "h-48 w-48",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Kartik Pillai",
    role: "SEO Expert",
    image: "/team/83.png",
    size: "h-44 w-44",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Ebin Edison",
    role: "AD Expert",
    image: "/team/84.png",
    size: "h-48 w-48",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Prakriti Jain",
    role: "HR",
    image: "/team/85.png",
    size: "h-48 w-48",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Ashi Jain",
    role: "General Manager",
    image: "/team/86.png",
    size: "h-44 w-44",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Lakshay Sharma",
    role: "UI/Business Analyst",
    image: "/team/87.png",
    size: "h-48 w-48",
    linkedin: "https://linkedin.com/in/",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const hoverVariants = {
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function Team() {
  return (<>
  <Head>
  <title>Our Team | Bizleap</title>
  <meta
    name="description"
    content="Meet the Bizleap team — a passionate group of designers, developers, marketers, and creators driving innovation and digital growth."
  />
</Head>

    <main className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.section 
        className="text-center mb-20 mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Meet Our Team
        </motion.h1>
        <motion.p
          className="text-xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          The passionate individuals behind our success story
        </motion.p>
      </motion.section>

      {/* Founders Section */}
      <section className="text-center mb-32">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white">Our </span>
          <span className="text-yellow-400">Leadership</span>
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {founders.map((person, i) => (
            <motion.div
              key={i}
              className="group relative w-80 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl overflow-hidden p-8 border border-zinc-800"
              variants={itemVariants}
              whileHover="hover"
              custom={i}
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="relative mx-auto mb-6">
                  <div className={`rounded-full p-1 bg-gradient-to-r from-yellow-400 to-amber-600 ${person.size || "h-56 w-56"} mx-auto`}>
                    <div className="rounded-full overflow-hidden bg-zinc-900 h-full w-full">
                      <Image
                        src={person.image}
                        alt={person.name}
                        width={300}
                        height={300}
                        className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{person.name}</h3>
                <p className="text-yellow-400 font-medium mb-4">{person.role}</p>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  Driving innovation and excellence in every aspect of our business.
                </p>
                
                <div className="flex justify-center gap-4">
                  <motion.a 
                    href={person.linkedin} 
                    target="_blank"
                    className="p-2 bg-zinc-800 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a 
                    href={person.instagram} 
                    target="_blank"
                    className="p-2 bg-zinc-800 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Members Section */}
      <section className="text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-yellow-400">Amazing</span>
          <span className="text-white"> Team</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {team.map((person, i) => (
            <motion.div
              key={i}
              className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl overflow-hidden p-6 border border-zinc-800 hover:border-yellow-400/30 transition-colors duration-300"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className={`mx-auto mb-5 rounded-full overflow-hidden border-2 border-zinc-700 group-hover:border-yellow-400/50 transition-colors duration-300 ${person.size || "h-48 w-48"}`}>
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={250}
                    height={250}
                    className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500"
                    style={person.style}
                  />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{person.name}</h3>
                <p className="text-yellow-400 text-sm font-medium mb-3">{person.role}</p>
                
                {person.linkedin && (
                  <motion.a 
                    href={person.linkedin}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Linkedin className="w-4 h-4" />
                    Connect
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      
    </main>
</>  
);
}