"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Instagram } from "lucide-react";

const influencersData = [
  { id: 2, name: "ntskatesworld", instagramLink: "https://www.instagram.com/ntskatesworld/", category: "Health & Fitness", followers: 20100, engagement: "1.59%", avgViews: "8,500", budget: "On Request", minBudget: 1200000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: true, image: "images/Nt Skates world.jpeg" },
  { id: 3, name: "playcreative.in", instagramLink: "https://www.instagram.com/playcreative.in/", category: "Jewellery", followers: 33500, engagement: "1.44%", avgViews: "4,500", budget: "On Request", minBudget: 1000000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: true, image: "images/playcreative.in.jpg" },
  { id: 4, name: "marvelfitnessjaitala", instagramLink: "https://www.instagram.com/marvelfitnessjaitala/", category: "Health & Fitness", followers: 4654, engagement: "1.14%", avgViews: "1,614", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: true, image: "images/marvelfitnessjaitala.jpg" },
  { id: 5, name: "ntx_brand", instagramLink: "https://www.instagram.com/ntx_brand/", category: "Education", followers: 4659, engagement: "1%", avgViews: "1,614", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: true, image: "images/ntx_brand.jpg" },
  { id: 6, name: "kpmakeoverbykajal", instagramLink: "https://www.instagram.com/kpmakeoverbykajal/", category: "Makeup & Nailart", followers: 6845, engagement: "1.20%", avgViews: "1,614", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "female", recommended: false, image: "images/kp make over .png" },
  { id: 7, name: "bizleap.in", instagramLink: "https://www.instagram.com/bizleap.in/", category: "Business", followers: 871, engagement: "1%", avgViews: "1,614", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: true, image: "images/bizleap.jpg" },
  { id: 8, name: "ssitnagpur.in", instagramLink: "https://www.instagram.com/ssitnagpur.in/", category: "Education", followers: 183, engagement: "-", avgViews: "-", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/SSIT.PNG" },
  { id: 9, name: "taubys", instagramLink: "https://www.instagram.com/taubys/", category: "Food & Restaurant", followers: 829, engagement: "1%", avgViews: "1,614", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/taubys.jpg" },
  { id: 10, name: "barcode.ytl", instagramLink: "https://www.instagram.com/barcode.ytl/", category: "Food & Restaurant", followers: 150, engagement: "-", avgViews: "-", budget: "On Request", minBudget: 500000, location: "Nagpur", platforms: ["instagram", "facebook"], gender: "male", recommended: false, image: "images/barcode.ytl.jpg" },
  // … (add remaining items if needed)
];

export default function InfluencerPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredInfluencers = influencersData.filter((inf) => {
    const matchesSearch = inf.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || inf.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 md:px-12">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-semibold text-center mb-10"
      >
        Our <span className="text-yellow-400">Influencers</span>
      </motion.h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-3 text-neutral-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search influencer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="text-yellow-400 w-5 h-5" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
          >
            <option>All</option>
            <option>Education</option>
            <option>Health & Fitness</option>
            <option>Jewellery</option>
            <option>Food & Restaurant</option>
            <option>Makeup & Nailart</option>
            <option>Business</option>
            <option>Real Estate</option>
          </select>
        </div>
      </div>

      {/* Influencer Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredInfluencers.map((inf) => (
          <motion.div
            key={inf.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-yellow-400 transition"
          >
            <img
              src={inf.image}
              alt={inf.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-1">{inf.name}</h3>
              <p className="text-sm text-neutral-400 mb-3">{inf.category}</p>

              <div className="space-y-1 text-sm mb-4">
                <p><span className="text-yellow-400">Followers:</span> {inf.followers}</p>
                <p><span className="text-yellow-400">Engagement:</span> {inf.engagement}</p>
                <p><span className="text-yellow-400">Avg Views:</span> {inf.avgViews}</p>
                <p><span className="text-yellow-400">Budget:</span> {inf.budget}</p>
              </div>

              <a
                href={inf.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-yellow-400 text-black rounded-xl py-2 font-medium hover:bg-yellow-300 transition"
              >
                <Instagram className="w-4 h-4" /> View Profile
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
