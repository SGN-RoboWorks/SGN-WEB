import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Assets
import gallery4 from './assets/gallery-4.png';
import contactHero from './assets/0dcff79c73a67da491af0896b36e228a98cc1ab4.png';
import gallery6 from './assets/gallery-6.png';

// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
};

const navLinks = ['Home', 'About', 'Service', 'Contact'];

function Contact() {
    const [openFaq, setOpenFaq] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const stickyNavRef = useRef(null);

    // Scroll listener for sticky nav
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.85);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const faqs = [
        {
            q: "Is SGN RoboWorks a product company or a service company?",
            a: "SGN RoboWorks operates as both, developing proprietary intelligent systems (products) while also providing customized automation and consulting services for various industries."
        },
        {
            q: "What makes SGN RoboWorks different from typical AI or automation startups?",
            a: "Our focus is on deep integration of hardware and software, creating resilient, self-optimizing ecosystems rather than just isolated software tools or basic automation."
        },
        {
            q: "Are SGN RoboWorks solutions only for agriculture-related industries?",
            a: "While SGN Agritech is a major focus, our RoboWorks division provides solutions across manufacturing, smart infrastructure, and secure digital environments."
        },
        {
            q: "Who can work with SGN RoboWorks—startups or large enterprises?",
            a: "We work with organizations of all sizes, from startups looking for rapid prototyping to large enterprises seeking complex industrial optimization."
        }
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-[#f5f5f5] min-h-screen">
            {/* ═══════════════════════════════════════ */}
            {/* HERO SECTION                             */}
            {/* ═══════════════════════════════════════ */}
            <section className="relative h-screen overflow-hidden bg-black">
                <div className="absolute inset-0">
                    <img
                        src={contactHero}
                        alt="Contact Hero"
                        className="w-full h-full object-cover opacity-80"
                    />
                </div>

                {/* Top Navbar — Glassmorphic Pill */}
                <motion.nav
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute z-20 left-1/2 -translate-x-1/2 top-8"
                >
                    <div className="nav-pill flex items-center justify-center font-medium">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                                className="text-white text-[17px] tracking-wide hover:opacity-70 transition-opacity drop-shadow-sm"
                            >
                                {link}
                            </a>
                        ))}
                        <span className="text-white text-[17px] font-[Playfair_Display] tracking-wide ml-2 drop-shadow-sm">SGN Agritech</span>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white"
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
                </motion.nav>

                {/* Mobile menu dropdown */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed top-20 left-4 right-4 z-30 glass-card p-6 flex flex-col gap-4 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                                className="text-white text-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link}
                            </a>
                        ))}
                        <span className="text-white text-lg font-semibold">SGN Agritech</span>
                    </motion.div>
                )}

                {/* Hero Text */}
                <div className="absolute bottom-24 left-8 md:left-16 z-10 pointer-events-none">
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="font-[Playfair_Display] text-white text-7xl md:text-9xl font-normal tracking-wider"
                    >
                        CONTACT US
                    </motion.h1>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* STICKY NAVBAR (appears after hero)      */}
            {/* ═══════════════════════════════════════ */}
            <div
                ref={stickyNavRef}
                className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex justify-center py-4 transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="nav-pill nav-pill-white">
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href={link === 'About' ? '/about' : link === 'Service' ? '/service' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : '#'}
                            className="text-black text-xs font-semibold tracking-wider hover:opacity-60 transition-opacity"
                        >
                            {link}
                        </a>
                    ))}
                    <div className="h-4 w-[1px] bg-black/10 mx-2"></div>
                    <span className="text-black text-xs font-bold tracking-wider">SGN Agritech</span>
                </div>
            </div>

            {/* ═══════════════════════════════════════ */}
            {/* CONTACT FORM SECTION                     */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20">
                    {/* Left Side: Info */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <h2 className="text-5xl md:text-6xl font-normal mb-6">
                            Questions ? <br /> We Got All Answers !
                        </h2>
                        <p className="text-gray-500 text-lg mb-12">
                            Fill in the form or contact us. Our team will get back to you shortly.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.81 12.81 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 text-lg">+91 9952915707 +91 8610284297 +91 6381207641</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 text-lg">sgnroboworks@gmail.com</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 text-lg">Kodungaiyur, Chennai-600051</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
                            <input type="text" className="w-full bg-[#f0f0f0] rounded-full px-6 py-4 outline-none transition-all focus:ring-2 focus:ring-black/5" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                            <input type="email" className="w-full bg-[#f0f0f0] rounded-full px-6 py-4 outline-none transition-all focus:ring-2 focus:ring-black/5" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Service Interested in</label>
                            <input type="text" className="w-full bg-[#f0f0f0] rounded-full px-6 py-4 outline-none transition-all focus:ring-2 focus:ring-black/5" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea rows="4" className="w-full bg-[#f0f0f0] rounded-[30px] px-6 py-4 outline-none transition-all focus:ring-2 focus:ring-black/5 resize-none"></textarea>
                        </div>
                        <button className="w-full bg-black text-white rounded-full py-4 font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors">
                            Send Message
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* FAQ SECTION                              */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 bg-[#f5f5f5]">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-normal text-center mb-16">
                        Frequently Asked Question ( FAQ’s )
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-[20px] overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-lg font-medium text-gray-800">{faq.q}</span>
                                    <span className={`transform transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </span>
                                </button>
                                {openFaq === i && (
                                    <div className="px-8 pb-6 animate-fadeIn">
                                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════ */}
            {/* REACH US SECTION                         */}
            {/* ═══════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h3 className="text-4xl font-normal mb-10">Reach us on</h3>

                    <div className="flex gap-6 mb-20">
                        {['linkedin', 'instagram', 'twitter', 'facebook', 'youtube'].map((social) => (
                            <a key={social} href="#" className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                <img src={`https://cdn.simpleicons.org/${social}`} alt={social} className="w-6 h-6" />
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-12 pt-12 border-t border-gray-100">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="font-[Playfair_Display] flex flex-col">
                                    <span className="text-7xl font-bold leading-[0.8]">S G N</span>
                                    <span className="text-3xl">Roboworks</span>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm">@ 2026 Roboworks</p>
                        </div>

                        <div>
                            <h5 className="text-lg font-bold mb-6">Quick access</h5>
                            <ul className="space-y-4">
                                <li><a href="/" className="text-gray-700 hover:text-black transition-colors">Home</a></li>
                                <li><a href="/about" className="text-gray-700 hover:text-black transition-colors">About us</a></li>
                                <li><a href="/service" className="text-gray-700 hover:text-black transition-colors">Services</a></li>
                                <li><a href="/contact" className="text-gray-700 hover:text-black transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-20 text-center">
                        <p className="text-gray-400 text-sm">Designed & Developed by</p>
                        <p className="text-gray-600 text-sm font-semibold tracking-[0.15em] mt-1">TECHLON</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
