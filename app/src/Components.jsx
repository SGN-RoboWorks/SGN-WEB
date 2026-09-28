import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Asset Imports
import compPhSensor from './assets/comp-ph-sensor.webp';
import compTdsEcSensor from './assets/comp-tds-ec-sensor.webp';
import compTurbiditySensor from './assets/comp-turbidity-sensor.webp';
import compDoSensor from './assets/comp-do-sensor.webp';
import compTempSensor from './assets/comp-temp-sensor.webp';
import compWaterPump from './assets/comp-water-pump.webp';
import compAirPump from './assets/comp-air-pump.webp';
import compSettlingFilter from './assets/comp-settling-filter.webp';
import compNftGrowBed from './assets/comp-nft-grow-bed.webp';

import aquaponicsHeroGreen from './assets/aquaponics-hero-green.webp';
import gallery6 from './assets/gallery-6.webp';

const brandLogo = '/IMG-20260903-WA0018.jpg';

// Nav links
const navLinks = ['Home', 'About', 'Service', 'Components', 'Contact'];

// Component items array (Selected items: 1, 2, 3, 4, 5, 9, 10, 11, 13)
const componentsData = [
  {
    id: 1,
    pdfNumber: "01",
    name: "pH Sensor / pH Meter",
    category: "Sensors & Monitoring",
    use: "Measures acidity & alkalinity levels in water",
    purpose: "Core water-quality control; critical for fish, shrimp and plant biological health.",
    description: "Continuous water acidity and alkalinity monitoring sensor essential for keeping optimal pH levels (6.8–7.2) for plant nutrient uptake and biological nitrification.",
    img: compPhSensor,
    specs: ["Range: 0-14 pH", "1-Wire / Analog output", "Waterproof BNC connector", "High precision probe"]
  },
  {
    id: 2,
    pdfNumber: "02",
    name: "TDS / EC Sensor",
    category: "Sensors & Monitoring",
    use: "Measures dissolved ionic content & electrical conductivity",
    purpose: "Tracks dissolved salts, nutrient minerals and changes in overall water quality.",
    description: "Electrical Conductivity (EC) and Total Dissolved Solids (TDS) sensor that measures dissolved nutrient concentrations to maintain perfect strength in nutrient solutions.",
    img: compTdsEcSensor,
    specs: ["Measurement range: 0-1000ppm / 0-2000µS/cm", "Plug & play interface", "Temperature compensated"]
  },
  {
    id: 3,
    pdfNumber: "03",
    name: "Turbidity Sensor",
    category: "Sensors & Monitoring",
    use: "Measures water cloudiness & suspended particles",
    purpose: "Helps monitor solids, floc density and mechanical filtration performance.",
    description: "Optical turbidity sensor that measures water cloudiness and particulate density, allowing automated tracking of biofloc levels and filter efficiency.",
    img: compTurbiditySensor,
    specs: ["Optical detection module", "0-4500 NTU response", "Analog & digital output options"]
  },
  {
    id: 4,
    pdfNumber: "04",
    name: "Dissolved Oxygen (DO) Sensor",
    category: "Sensors & Monitoring",
    use: "Measures dissolved oxygen concentration in water",
    purpose: "Critical for fish/shrimp respiration, plant roots and biofloc nitrifying bacteria.",
    description: "High-precision dissolved oxygen probe tracking real-time oxygenation (mg/L), essential for aquatic health, beneficial bacterial assimilation, and root respiration.",
    img: compDoSensor,
    specs: ["Optical / galvanic sensing", "Real-time mg/L reading", "Submersible probe body"]
  },
  {
    id: 5,
    pdfNumber: "05",
    name: "Water Temperature Sensor (DS18B20)",
    category: "Sensors & Monitoring",
    use: "Measures water temperature accurately",
    purpose: "Tracks thermal conditions for aquatic culture and microbial metabolic activity.",
    description: "Waterproof digital 1-Wire temperature sensor for continuous monitoring of thermal conditions, protecting biological stability and oxygen solubility.",
    img: compTempSensor,
    specs: ["DS18B20 digital sensor", "304 stainless steel probe", "-55°C to +125°C range", "High accuracy ±0.5°C"]
  },
  {
    id: 9,
    pdfNumber: "09",
    name: "Water Pump",
    category: "Flow & Circulation",
    use: "Moves water continuously between tanks, filters & grow beds",
    purpose: "Provides continuous circulation throughout the aquaponics recirculating loop.",
    description: "High-efficiency submersible/inline circulation pump designed for steady water turnover across culture tanks, filtration stages, and hydroponic channels.",
    img: compWaterPump,
    specs: ["Submersible / inline operation", "Low energy consumption", "Quiet magnetic impeller"]
  },
  {
    id: 10,
    pdfNumber: "10",
    name: "Air Pump + Air Stones / Diffusers",
    category: "Flow & Circulation",
    use: "Adds vital oxygen and thoroughly mixes culture water",
    purpose: "Maintains aeration levels and keeps biofloc particles in active suspension.",
    description: "Heavy-duty air pump system paired with fine-pore air stone diffusers to deliver maximum dissolved oxygen transfer and maintain active biofloc particle suspension.",
    img: compAirPump,
    specs: ["High output air compressor", "Micro-pore ceramic diffusers", "Non-stop continuous rating"]
  },
  {
    id: 11,
    pdfNumber: "11",
    name: "Mechanical Filter / Settling Filter",
    category: "Filtration & Growing",
    use: "Removes excess solid waste and detritus",
    purpose: "Controls suspended waste before water reaches plant root and biofilter stages.",
    description: "Swirl separator settling tank filter engineered to trap solid waste detritus before water reaches biological filtration units or plant roots.",
    img: compSettlingFilter,
    specs: ["Swirl separator geometry", "Quick drain purge valve", "Removes heavy organic solids"]
  },
  {
    id: 13,
    pdfNumber: "13",
    name: "Grow Bed / NFT Channels",
    category: "Filtration & Growing",
    use: "Holds growing plants securely",
    purpose: "Utilizes nutrient-rich aquaculture water for clean, sustainable plant production.",
    description: "Heavy-duty food-grade NFT (Nutrient Film Technique) channels and media grow beds that provide root support while plants absorb nitrified aquaculture nutrients.",
    img: compNftGrowBed,
    specs: ["Food-grade UV-stabilized PVC", "Optimum root aeration channel", "Includes end caps & fittings"]
  }
];

const categories = ["All Components", "Sensors & Monitoring", "Flow & Circulation", "Filtration & Growing"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function Components() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Components");
  const [selectedComp, setSelectedComp] = useState(null);

  const heroRef = useRef(null);
  const footerRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.25]);

  const filteredComponents = activeCategory === "All Components"
    ? componentsData
    : componentsData.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] overflow-x-hidden">

      {/* ═══════════════════════════════════════ */}
      {/* HERO SECTION                           */}
      {/* ═══════════════════════════════════════ */}
      <section id="home" ref={heroRef} className="relative h-[75vh] md:h-[85vh] overflow-hidden bg-black flex items-end">
        <motion.div className="absolute inset-0 z-0 origin-top-left" style={{ y: heroY, scale: heroScale }}>
          <img
            loading="eager"
            decoding="async"
            src={aquaponicsHeroGreen}
            alt="Hydroponic and Aquaponics components by SGN RoboWorks"
            className="w-full h-full object-cover object-center opacity-70"
          />
        </motion.div>

        {/* Hero Title Container */}
        <div className="relative z-10 p-8 md:p-20 max-w-6xl w-full pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-medium mb-4 tracking-wider uppercase"
          >
            Aquaponics • Mariculture • Biofloc
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-[Playfair_Display] text-white text-4xl md:text-7xl font-normal leading-tight tracking-tight uppercase"
          >
            Hydroponic & Aquaponics <br className="hidden md:block" />
            <span className="italic font-light text-gray-300">Available Components</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-300 text-sm md:text-lg max-w-2xl mt-4 font-light leading-relaxed"
          >
            Essential sensors, flow systems, aeration, and filtration equipment engineered for precision water-quality management and sustainable agritech operations.
          </motion.p>
        </div>

        {/* Top Navbar — Glassmorphic Pill */}
        <motion.nav
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-300 w-[90%] md:w-auto ${isScrolled ? "top-4" : "top-8"
            }`}
        >
          <div className={`nav-pill flex items-center justify-center font-medium px-4 md:px-8 py-2 rounded-full transition-all duration-300 w-full md:w-auto ${isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md border border-gray-200"
            : "bg-transparent"
            }`}>
            <div className="flex items-center gap-4 md:gap-6">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Components' ? '/components' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                  className={`text-[15px] md:text-[17px] tracking-wide transition-colors duration-300 ${isScrolled ? "text-black hover:text-gray-600" : "text-white hover:opacity-70"
                    } drop-shadow-sm ${link === 'Components' ? 'flex font-semibold underline underline-offset-4' : 'hidden md:flex'}`}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isScrolled ? "text-black" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute top-[120%] left-0 right-0 p-6 flex flex-col gap-4 rounded-3xl md:hidden ${isScrolled
                ? "bg-white/95 backdrop-blur-md shadow-lg border border-gray-200"
                : "glass-card border border-white/20 bg-black/90 backdrop-blur-md text-white"
                }`}
            >
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Components' ? '/components' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                  className={`text-lg font-medium transition-colors ${isScrolled ? "text-gray-800 hover:text-black" : "text-white hover:text-gray-300"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
            </motion.div>
          )}
        </motion.nav>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* COMPONENT CATALOGUE SECTION            */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-200 pb-8">
          <div>
            <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Product Catalogue</span>
            <h2 className="font-[Playfair_Display] text-3xl md:text-5xl font-normal text-[#1a1a1a] mt-1">
              Hydroponics & Aquaponics Components
            </h2>
          </div>
          <p className="text-gray-500 max-w-md text-sm md:text-base leading-relaxed">
            Essential components for building, monitoring, and scaling recirculating aquaculture, biofloc, and hydroponics installations.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${activeCategory === cat
                ? "bg-[#1a1a1a] text-white shadow-md scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Components Grid */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredComponents.map((comp) => (
            <motion.div
              key={comp.id}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[28px] border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Box */}
              <div className="relative h-64 w-full bg-[#f3f4f6] overflow-hidden flex items-center justify-center p-6 border-b border-gray-100">
                <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold tracking-wider">
                  #{comp.pdfNumber}
                </span>
                <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-gray-800 text-[11px] font-medium border border-gray-200">
                  {comp.category}
                </span>
                <img
                  loading="lazy"
                  decoding="async"
                  src={comp.img}
                  alt={comp.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                />
              </div>

              {/* Card Details */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-xl md:text-2xl text-[#1a1a1a] mb-2 group-hover:text-black">
                    {comp.name}
                  </h3>

                  {/* Primary Use Badge */}
                  <div className="mb-4 inline-block bg-gray-100 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700">
                    <span className="font-semibold text-black">Use:</span> {comp.use}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">
                    {comp.description}
                  </p>
                </div>

                {/* Specs Pill List */}
                <div>
                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">Key Purpose</span>
                    <p className="text-xs text-gray-700 leading-snug italic font-serif">
                      "{comp.purpose}"
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedComp(comp)}
                    className="w-full py-3 rounded-full border border-black/20 text-xs md:text-sm font-semibold text-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>View Specifications</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </section>

      {/* ═══════════════════════════════════════ */}
      {/* MODAL DIALOG FOR SPECS                 */}
      {/* ═══════════════════════════════════════ */}
      {selectedComp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[32px] max-w-2xl w-full overflow-hidden shadow-2xl relative border border-gray-100"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedComp(null)}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-800 transition-colors"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center">
                <img src={selectedComp.img} alt={selectedComp.name} className="max-h-64 object-contain drop-shadow-lg" />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Item #{selectedComp.pdfNumber}</span>
                  <h3 className="text-2xl font-bold text-black mt-1 mb-3">{selectedComp.name}</h3>
                  <p className="text-xs text-gray-600 mb-4">{selectedComp.description}</p>

                  <div className="mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Specifications</h4>
                    <ul className="space-y-1.5">
                      {selectedComp.specs.map((spec, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href="/contact"
                  className="w-full py-3 bg-black text-white text-center rounded-full text-xs font-semibold hover:bg-gray-800 transition-all mt-4"
                >
                  Inquire For Availability & Pricing
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ═══════════════════════════════════════ */}
      {/* BOOK YOUR APPOINTMENTS SECTION          */}
      {/* ═══════════════════════════════════════ */}
      <section id="contact" className="py-16 md:py-24 bg-white" ref={contactRef}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: '-100px' }}
          variants={fadeUp}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="relative w-full max-w-[1195px] h-auto md:min-h-[582px] bg-[#0a0a0a] rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl mx-auto">
            <div className="absolute inset-0 z-0">
              <img loading="lazy" decoding="async" src={gallery6} alt="Contact SGN RoboWorks Chennai" className="w-full h-full object-cover opacity-80 border-none" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#000000] via-[#000000]/60 to-transparent pointer-events-none"></div>
            </div>

            <div className="hidden md:block w-[420px] shrink-0 z-10"></div>

            <div className="relative z-10 flex-1 flex flex-col pt-12 md:pt-[80.89px] px-8 md:px-0 items-center md:items-start pb-12 md:pb-10">
              <div className="md:ml-[0px] flex flex-col items-center justify-center w-full max-w-[488px] h-auto md:min-h-[120px] mb-8 md:mb-[43px]">
                <h3 className="font-[Playfair_Display] text-white text-[26px] md:text-[38.5px] font-normal leading-none tracking-[0.05em] md:tracking-[0.1em]">
                  ORDER &amp; CONSULT
                </h3>
                <h3 className="font-[Playfair_Display] text-white text-[20px] md:text-[32px] font-normal leading-none mt-2 md:mt-4 ml-1 md:ml-[14px] tracking-[0.15em] md:tracking-[0.35em]">
                  AGRITECH COMPONENTS
                </h3>
              </div>

              <div className="w-full max-w-[592px] h-auto md:min-h-[149.18px] mb-8 md:mb-[50px]">
                <p className="text-[#dfdfdf] text-[15px] md:text-[16px] leading-[1.8] font-[Inter] font-light text-center md:text-left">
                  Need hydroponics, aquaponics, or biofloc components, sensors, or complete customized automated recirculating systems? Contact our engineering team in Chennai today for prompt quote and delivery across Tamil Nadu and India.
                </p>
              </div>

              <div className="md:ml-[205px]">
                <a href="/contact" className="w-[149px] h-[43.07px] flex items-center justify-center rounded-[21.5px] border border-white/60 text-white text-[14.5px] font-[Inter] font-medium hover:bg-white hover:text-black transition-all bg-white/5 backdrop-blur-md shadow-sm hover:shadow-md">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* FOOTER                                   */}
      {/* ═══════════════════════════════════════ */}
      <footer className="py-16 bg-white border-t border-gray-100" ref={footerRef}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: '-50px' }}
          variants={fadeIn}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div>
              <div className="flex items-center gap-4">
                <img loading="lazy" decoding="async" src={brandLogo} alt="SGN RoboWorks logo" className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gray-100 p-1" />
                <div>
                  <h4 className="font-[Playfair_Display] text-6xl md:text-8xl tracking-tighter leading-none">S G N</h4>
                  <p className="font-[Playfair_Display] text-base md:text-xl text-gray-800 tracking-wide mt-1">Roboworks</p>
                </div>
              </div>
              <p className="mt-8 text-gray-400 text-sm font-medium">@ 2026 Roboworks</p>
            </div>

            <div>
              <h5 className="text-lg font-bold mb-6">Quick access</h5>
              <ul className="space-y-5">
                {navLinks.map((link) => (
                  <li key={link}>
                    <a
                      href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Components' ? '/components' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                      className="text-black hover:text-gray transition-colors"
                    >
                      {link === 'About' ? 'About us' : link === 'Service' ? 'Services' : link === 'Components' ? 'Components' : link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

export default Components;
