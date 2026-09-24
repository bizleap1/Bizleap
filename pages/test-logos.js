import Image from 'next/image';

const logos = [
  { name: "Academypath", logo: "/new logos/Academypath.png" },
  { name: "ChatGPT 1", logo: "/new logos/ChatGPT Image Sep 24, 2026, 01_39_08 PM.png" },
  { name: "ChatGPT 2", logo: "/new logos/ChatGPT Image Sep 24, 2026, 01_41_58 PM.png" },
  { name: "ChatGPT 3", logo: "/new logos/ChatGPT Image Sep 24, 2026, 01_50_50 PM.png" },
  { name: "ChatGPT 4", logo: "/new logos/ChatGPT Image Sep 24, 2026, 01_52_08 PM.png" },
  { name: "ChatGPT 5", logo: "/new logos/ChatGPT Image Sep 24, 2026, 01_56_27 PM.png" },
  { name: "ChatGPT 6", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_11_39 PM.png" },
  { name: "ChatGPT 7", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_23_11 PM.png" },
  { name: "ChatGPT 8", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_25_57 PM.png" },
  { name: "ChatGPT 9", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_27_36 PM.png" },
  { name: "ChatGPT 10", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_29_00 PM.png" },
  { name: "ChatGPT 11", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_30_21 PM.png" },
  { name: "ChatGPT 12", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_32_14 PM (1).png" },
  { name: "ChatGPT 13", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_32_14 PM.png" },
  { name: "ChatGPT 14", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_35_09 PM.png" },
  { name: "ChatGPT 15", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_38_04 PM.png" },
  { name: "ChatGPT 16", logo: "/new logos/ChatGPT Image Sep 24, 2026, 02_41_36 PM.png" },
  { name: "ChatGPT 17", logo: "/new logos/ChatGPT Image Sep 24, 2026, 03_26_04 PM.png" },
  { name: "ChatGPT 18", logo: "/new logos/ChatGPT Image Sep 24, 2026, 03_27_32 PM.png" },
  { name: "ChatGPT 19", logo: "/new logos/ChatGPT Image Sep 24, 2026, 03_28_59 PM.png" },
  { name: "ChatGPT 20", logo: "/new logos/ChatGPT Image Sep 24, 2026, 03_30_17 PM.png" },
  { name: "ChatGPT 21", logo: "/new logos/ChatGPT Image Sep 24, 2026, 12_37_58 PM.png" },
  { name: "MANI", logo: "/new logos/MANI.png" },
  { name: "ST", logo: "/new logos/ST.png" },
  { name: "VIKALP EDUCATION", logo: "/new logos/VIKALP_EDUCATION_logo_1080x1350_transparent.png" },
  { name: "asian street", logo: "/new logos/asian street.png" },
  { name: "barcode", logo: "/new logos/barcode.png" },
  { name: "barcode1", logo: "/new logos/barcode1.png" },
  { name: "binous", logo: "/new logos/binous.png" },
  { name: "mysa", logo: "/new logos/mysa.png" },
  { name: "rajwadi", logo: "/new logos/rajwadi.png" },
  { name: "suko", logo: "/new logos/suko.png" },
  { name: "wealth acumen", logo: "/new logos/wealth acumen.png" },
  { name: "ziely", logo: "/new logos/ziely.png" }
];

export default function TestLogos() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px', backgroundColor: 'black', color: 'white' }}>
      {logos.map((logo, idx) => (
        <div key={idx} style={{ border: '1px solid #333', padding: '10px', width: '300px' }}>
          <img src={logo.logo} alt={logo.name} style={{ width: '100%', height: 'auto', filter: 'brightness(0) invert(1)' }} />
          <p style={{ wordBreak: 'break-all' }}>{logo.logo}</p>
        </div>
      ))}
    </div>
  );
}
