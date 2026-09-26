/**
 * AUTHOR REGISTRY
 * Approved authors: Kaushal B, Akshat Soni, Indrajit Kshirsagar
 * Aditya Sule is NOT an approved author and must NOT be added here.
 * Any blog records attributed to Aditya Sule require MANUAL reassignment.
 */
export const AUTHORS_DATA = [
  {
    id: "kaushal-b",
    name: "Kaushal B",
    role: "Co-Founder & Growth Specialist",
    bio: "Kaushal is a growth marketer and AI specialist with a deep understanding of enterprise-scale automation. He helps brands transform their operations through advanced technology.",
    image: "/kaushal banginwar.JPEG",
    socials: {
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/"
    }
  },
  {
    id: "akshat-soni",
    name: "Akshat Soni",
    role: "Lead Designer & Strategist",
    bio: "Akshat merges premium visual design with psychological conversion strategies to craft B2B experiences that drive measurable impact.",
    image: "/team/akshat soni.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/"
    }
  },
  {
    id: "indrajit-kshirsagar",
    name: "Indrajit Kshirsagar",
    role: "SEO & Technical Lead",
    bio: "Indrajit specializes in technical SEO, site architecture, and performance optimization, ensuring that high-converting websites dominate search engine results.",
    image: "/team/indrajit kshirsagar.jpeg",
    socials: {
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/"
    }
  }
];

/**
 * Helper: get author slug from name
 * Returns null if the author is not in the approved registry.
 */
export function getAuthorSlug(authorName) {
  const author = AUTHORS_DATA.find((a) => a.name === authorName);
  return author ? author.id : null;
}
