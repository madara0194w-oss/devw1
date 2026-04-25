/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Linkedin, Instagram, ArrowUpRight, Star, ArrowRight, Layout, Code, Database, Droplet, Activity, ShoppingBag } from 'lucide-react';

const LOGO_URL = "https://res.cloudinary.com/drufv7gh5/image/upload/v1776345587/image-removebg-preview_8_jx6n6q.png";

const projects = [
  {
    id: 1,
    title: "Luxe Dining Experience",
    short: "Reservation systems & Sensory UI.",
    tech: "Next.js • Stripe • Sanity",
    glow: "bg-orange-500/20",
    glowIcon: "text-amber-400 bg-gradient-to-br from-orange-400/30 to-amber-600/30 shadow-[0_0_40px_rgba(245,158,11,0.5)] border border-amber-300/30",
    icon: <Droplet className="w-10 h-10 drop-shadow-[0_0_15px_rgba(245,158,11,1)]" />
  },
  {
    id: 2,
    title: "Medical Professionalism",
    short: "Patient-centric booking & HIPAA-ready design.",
    tech: "React • Firebase • Tailwind",
    glow: "bg-cyan-500/20",
    glowIcon: "text-cyan-400 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 shadow-[0_0_40px_rgba(6,182,212,0.5)] border border-cyan-300/30",
    icon: <Activity className="w-10 h-10 drop-shadow-[0_0_15px_rgba(6,182,212,1)]" />
  },
  {
    id: 3,
    title: "Scalable Retail Solutions",
    short: "High-conversion checkout & Inventory sync.",
    tech: "Shopify • Remix • Prisma",
    glow: "bg-purple-500/20",
    glowIcon: "text-purple-400 bg-gradient-to-br from-purple-400/30 to-fuchsia-600/30 shadow-[0_0_40px_rgba(168,85,247,0.5)] border border-purple-300/30",
    icon: <ShoppingBag className="w-10 h-10 drop-shadow-[0_0_15px_rgba(168,85,247,1)]" />
  }
];

export default function App() {
  const [activePage, setActivePage] = useState('Home');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [forcedLandscape, setForcedLandscape] = useState(false);

  const navItems = ['Home', 'Services', 'Projects', 'About Us'];

  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isSmall = window.innerWidth < 768;

      if (isSmall && isPortrait) {
        setIsMobilePortrait(true);
        // Only trigger splash if not already handled
        if (!forcedLandscape && !showSplash) {
          setShowSplash(true);
        }
      } else {
        setIsMobilePortrait(false);
        // If they tilt to landscape during splash, we skip everything
        if (showSplash) {
          setShowSplash(false);
          setForcedLandscape(false);
        }
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, [forcedLandscape, showSplash]);

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        // Only if still in mobile portrait mode
        if (window.innerHeight > window.innerWidth && window.innerWidth < 768) {
          setForcedLandscape(true);
        }
        setShowSplash(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <div className={`relative w-full h-full ${forcedLandscape ? 'forced-landscape' : ''}`}>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-3xl flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Logo with Breathing Glow */}
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 0px rgba(168, 230, 193, 0))",
                  "drop-shadow(0 0 20px rgba(168, 230, 193, 0.4))",
                  "drop-shadow(0 0 0px rgba(168, 230, 193, 0))"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-8"
            >
              <img src={LOGO_URL} alt="NexTechZen Logo" className="w-48 md:w-64 h-auto" />
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4 relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "linear" }}
                className="h-full bg-[#a8e6c1]"
              />
            </div>

            {/* Label */}
            <p className="text-[#a8e6c1] text-[10px] font-bold tracking-[0.2em] uppercase">
              Optimizing Interface for Nextechzen...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative w-full h-full overflow-hidden bg-black">

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          crossOrigin="anonymous"
        >
          <source src="https://res.cloudinary.com/drufv7gh5/video/upload/v1777025407/Glass_sphere_glides_202604241609_hzpiaz.mp4" type="video/mp4" />
        </video>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: 180 }}
          animate={{ opacity: 1, x: 0, rotate: 180 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="absolute left-4 top-2 md:left-10 md:top-6 z-20 pointer-events-none"
          style={{ writingMode: 'vertical-rl' }}
        >
          <h1 className="text-white text-lg md:text-3xl font-bold uppercase tracking-normal drop-shadow-lg whitespace-nowrap">
            NEXTECHZEN
          </h1>
          <p className="text-white/70 text-[8px] md:text-sm font-medium tracking-normal uppercase whitespace-nowrap pr-2 md:pr-4">
            A Webdevelopment Company
          </p>
        </motion.div>

        {/* Navigation Menu */}
        <motion.nav
          initial={{ opacity: 0, y: -50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="absolute top-16 md:top-20 left-[40%] md:left-[40%] z-30 flex items-center gap-1 md:gap-8 bg-black/40 backdrop-blur-xl border border-[#a8e6c1]/20 px-1 py-1 md:px-4 md:py-2 rounded-full"
        >
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              className={
                activePage === item
                  ? "px-3 md:px-7 py-1 md:py-2 rounded-full bg-[#a8e6c1] text-[#1b3526] font-medium text-[9px] md:text-sm hover:bg-[#8cedba] transition-colors duration-300 whitespace-nowrap cursor-pointer"
                  : "text-white/90 text-[9px] md:text-sm font-normal tracking-wide hover:text-white transition-all duration-300 px-2 whitespace-nowrap cursor-pointer"
              }
            >
              {item}
            </button>
          ))}
        </motion.nav>

        {/* Contact Us Button */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="absolute right-2 top-4 md:right-14 md:top-12 z-30"
        >
          <button className="text-white text-sm md:text-lg font-medium px-5 py-2 md:px-12 md:py-3 rounded-full border-2 border-white hover:bg-white hover:text-black transition-all duration-300">
            Chat On Whatsapp
          </button>
        </motion.div>

        {/* Transform Button & Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="absolute left-1 bottom-4 md:left-10 md:bottom-6 z-30 flex flex-col items-start gap-4"
        >
          <div className="ml-4 flex flex-col gap-2">
            <h3 className="text-white text-sm md:text-base font-medium tracking-wide uppercase">Follow Us</h3>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed">
              By contacting us, you<br />
              take the first step toward<br />
              unlocking your full online<br />
              potential.
            </p>
          </div>

          {/* Social Icons */}
          <div className="ml-4 flex items-center gap-3 md:gap-4 text-white">
            <a href="#" className="hover:text-white/70 transition-colors">
              <Facebook size={18} className="md:w-6 md:h-6" />
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              <Linkedin size={18} className="md:w-6 md:h-6" />
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              <Instagram size={18} className="md:w-6 md:h-6" />
            </a>
          </div>

          <button className="flex items-center gap-2 md:gap-2 text-white text-[8px] md:text-sm font-medium pl-6 md:pl-4 pr-1 md:pr-2 py-1 md:py-2 rounded-full border border-white/60 md:border-2 border-white hover:bg-white/20 transition-all duration-300">
            <span className="md:hidden">Architecting the digital future your vision deserves and can inhabit</span>
            <span className="hidden md:inline">Architecting the digital future your vision deserves and can inhabit</span>
            <div className="flex items-center justify-center shrink-0 w-5 h-5 md:w-8 md:h-8 rounded-full bg-green-300 text-black">
              <svg width="12" height="12" className="md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </button>
        </motion.div>

        {/* Bottom Right Widgets */}
        {activePage === 'Home' && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="absolute right-8 bottom-6 md:right-16 md:bottom-12 z-30 flex flex-col items-end gap-4"
          >
            {/* What We Do */}
            <div className="max-w-[200px] md:max-w-[320px] bg-black/40 backdrop-blur-xl border border-white/20 p-3 md:p-5 rounded-2xl shadow-xl w-full">
              <h3 className="text-white text-[10px] md:text-[13px] font-bold tracking-[0.2em] uppercase mb-1 md:mb-2">What We Do</h3>
              <p className="text-white/80 text-[10px] md:text-[13px] leading-relaxed">
                We transform complex business challenges into intuitive, high-performing digital solutions.
              </p>
            </div>

            {/* Reviews */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center justify-between shadow-xl w-full">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img className="w-8 h-8 rounded-full border-2 border-[#1b3526] object-cover" src="https://i.pravatar.cc/100?img=33" alt="User 1" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#1b3526] object-cover" src="https://i.pravatar.cc/100?img=47" alt="User 2" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#1b3526] object-cover" src="https://i.pravatar.cc/100?img=12" alt="User 3" />
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-[#8cedba] text-[#8cedba]" />
                    <Star className="w-3.5 h-3.5 fill-[#8cedba] text-[#8cedba]" />
                    <Star className="w-3.5 h-3.5 fill-[#8cedba] text-[#8cedba]" />
                    <Star className="w-3.5 h-3.5 fill-[#8cedba] text-[#8cedba]" />
                    <Star className="w-3.5 h-3.5 fill-[#8cedba] text-[#8cedba]" />
                  </div>
                  <span className="text-white/90 text-[11px] font-medium mt-0.5 tracking-wide">Trusted by clients</span>
                </div>
              </div>
              <div className="p-1.5 bg-black/40 backdrop-blur-xl rounded-full shadow-sm cursor-pointer hover:bg-black/50 transition border border-white/10">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content Area */}
        {activePage === 'Home' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="absolute top-[45%] md:top-[42%] left-[44%] md:left-[42%] z-20 pointer-events-none w-max max-w-[80%] md:max-w-none px-4 text-left"
          >
            <h2 className="text-white font-bold tracking-wide drop-shadow-2xl leading-tight text-left mb-4 md:mb-6" style={{ fontSize: 'clamp(1.2rem, 4.5vw, 2.5rem)' }}>
              Engineering<br />
              Digital Excellence
            </h2>
            <p className="text-white/80 text-[10px] md:text-base max-w-md leading-relaxed drop-shadow-lg">
              NexTechZen crafts pixel-perfect, lightning-fast websites<br className="md:hidden" /> and powerful web applications that drive real business growth.
            </p>
          </motion.div>
        )}

        {activePage === 'Services' && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-[41%] left-[55%] md:left-[40%] z-20 pointer-events-none w-max px-4 text-left"
            >
              <h2 className="text-white text-lg md:text-3xl lg:text-4xl font-bold tracking-wide drop-shadow-2xl leading-tight text-left">
                Mastering<br />
                The Digital Landscape
              </h2>
              <p className="text-white/80 text-[10px] md:text-base max-w-md leading-relaxed drop-shadow-lg mt-2">
                From concept to launch, we deliver tailored technology that empowers your growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="absolute top-[55%] right-4 md:right-16 z-20 w-max px-2 grid grid-cols-3 gap-2"
            >
              {/* Card 1 */}
              <div className="bg-black/40 backdrop-blur-xl border border-white/20 p-2 md:p-6 rounded-xl flex flex-col gap-2 md:gap-4 shadow-xl relative group hover:bg-black/50 transition-all duration-300 cursor-pointer w-[140px] md:w-[240px]">
                <div className="p-2 md:p-3 bg-white/10 w-max rounded-lg">
                  <Layout className="w-3 h-3 md:w-4 md:h-4 text-[#a8e6c1]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-[11px] md:text-[14px] font-bold mb-1 md:mb-2 tracking-wide drop-shadow-md">UI/UX Design</h3>
                  <p className="text-white/70 text-[9px] md:text-[12px] leading-relaxed drop-shadow-sm">
                    Intuitive, engaging, and beautiful user experiences that delight your customers.
                  </p>
                </div>
                <div className="mt-1 md:mt-2 flex items-center justify-between">
                  <span className="text-[#a8e6c1]/80 text-[8px] md:text-[10px] font-semibold uppercase tracking-wider group-hover:text-[#8cedba] transition-colors drop-shadow-sm">Learn More</span>
                  <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#a8e6c1]/80 group-hover:text-[#8cedba] transition-colors" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-black/40 backdrop-blur-xl border border-white/20 p-2 md:p-6 rounded-xl flex flex-col gap-2 md:gap-4 shadow-xl relative group hover:bg-black/50 transition-all duration-300 cursor-pointer w-[140px] md:w-[240px]">
                <div className="p-2 md:p-3 bg-white/10 w-max rounded-lg">
                  <Code className="w-3 h-3 md:w-4 md:h-4 text-[#a8e6c1]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-[11px] md:text-[14px] font-bold mb-1 md:mb-2 tracking-wide drop-shadow-md">Custom Web Apps</h3>
                  <p className="text-white/70 text-[9px] md:text-[12px] leading-relaxed drop-shadow-sm">
                    Robust, scalable, and lightning-fast applications with modern tech stacks.
                  </p>
                </div>
                <div className="mt-1 md:mt-2 flex items-center justify-between">
                  <span className="text-[#a8e6c1]/80 text-[8px] md:text-[10px] font-semibold uppercase tracking-wider group-hover:text-[#8cedba] transition-colors drop-shadow-sm">Learn More</span>
                  <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#a8e6c1]/80 group-hover:text-[#8cedba] transition-colors" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-black/40 backdrop-blur-xl border border-white/20 p-2 md:p-6 rounded-xl flex flex-col gap-2 md:gap-4 shadow-xl relative group hover:bg-black/50 transition-all duration-300 cursor-pointer w-[140px] md:w-[240px]">
                <div className="p-2 md:p-3 bg-white/10 w-max rounded-lg">
                  <Database className="w-3 h-3 md:w-4 md:h-4 text-[#a8e6c1]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-[11px] md:text-[14px] font-bold mb-1 md:mb-2 tracking-wide drop-shadow-md">Backend Systems</h3>
                  <p className="text-white/70 text-[9px] md:text-[12px] leading-relaxed drop-shadow-sm">
                    Secure, high-performance architectures and APIs that power your platform.
                  </p>
                </div>
                <div className="mt-1 md:mt-2 flex items-center justify-between">
                  <span className="text-[#a8e6c1]/80 text-[8px] md:text-[10px] font-semibold uppercase tracking-wider group-hover:text-[#8cedba] transition-colors drop-shadow-sm">Learn More</span>
                  <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#a8e6c1]/80 group-hover:text-[#8cedba] transition-colors" />
                </div>
              </div>

            </motion.div>
          </>
        )}

        {activePage === 'Projects' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-[32%] left-[60%] md:left-[59%] -translate-x-1/2 z-20 w-[70%] md:w-[85%] max-w-4xl h-[40%] md:h-[45%] flex gap-1.5 md:gap-4"
            >
              {projects.map((proj) => {
                const isHovered = hoveredProject === proj.id;
                const widthClass = hoveredProject === null
                  ? "w-1/3"
                  : isHovered ? "w-1/2" : "w-1/4";

                return (
                  <div
                    key={proj.id}
                    onMouseEnter={() => setHoveredProject(proj.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className={`${widthClass} transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] relative rounded-2xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-xl flex flex-col items-center justify-center group cursor-pointer`}
                  >
                    {/* Glow Background */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl scale-150 rounded-full ${proj.glow}`} />

                    {/* Vertical centering wrapper */}
                    <div className="flex flex-col items-center justify-center h-full w-full p-2.5 md:p-6 relative z-10 transition-transform duration-700 group-hover:-translate-y-4">
                      {/* Icon */}
                      <div className={`p-2 md:p-4 rounded-xl md:rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] mb-2 md:mb-4 flex items-center justify-center ${isHovered ? proj.glowIcon + ' scale-105' : 'bg-white/10 text-white/50 border border-transparent shadow-none'}`}>
                        {proj.icon}
                      </div>

                      <h3 className={`text-white text-[11px] md:text-xl font-bold tracking-wide transition-colors duration-500 text-center ${isHovered ? 'opacity-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]' : 'opacity-70'}`}>
                        {proj.title}
                      </h3>

                      <p className={`text-white/70 text-[8px] md:text-sm mt-1 md:mt-2 text-center leading-relaxed max-w-xs transition-opacity duration-500 delay-100 ${isHovered ? 'opacity-100' : 'opacity-80'}`}>
                        {proj.short}
                      </p>
                    </div>

                    {/* Tech Stack - Fades in on hover */}
                    <div className={`absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 w-max opacity-0 transition-opacity duration-500 delay-100 pointer-events-none z-10 ${isHovered ? 'opacity-100' : ''}`}>
                      <span className="text-white/60 text-[7px] md:text-[9px] font-mono tracking-[0.1em] md:tracking-[0.2em] uppercase bg-black/40 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/10 backdrop-blur-xl">
                        {proj.tech}
                      </span>
                    </div>

                    {/* Enter Site Button - appears on hover */}
                    <div className={`absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 opacity-0 translate-y-4 transition-all duration-500 delay-200 z-10 ${isHovered ? 'opacity-100 translate-y-0' : ''}`}>
                      <button className="flex items-center gap-1.5 md:gap-2 bg-[#a8e6c1] hover:bg-[#8cedba] text-[#1b3526] px-3 py-1.5 md:px-5 md:py-2 rounded-full font-bold text-[8px] md:text-xs tracking-wide transition-colors shadow-[0_0_20px_rgba(168,230,193,0.3)]">
                        Enter Site <ArrowRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="absolute right-8 bottom-10 md:right-20 md:bottom-16 z-30"
            >
              <p className="text-white text-[8px] md:text-sm font-bold tracking-[0.2em] uppercase drop-shadow-2xl">
                A selection of our past achievements and digital solutions.
              </p>
            </motion.div>
          </>
        )}

        {activePage === 'About Us' && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-[50%] left-[60%] md:top-[50%] md:left-[59%] -translate-x-1/2 -translate-y-1/2 z-20 w-[70%] md:w-[85%] max-w-4xl bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-2 md:p-12 shadow-2xl flex flex-col md:flex-row gap-1.5 md:gap-12 overflow-y-auto max-h-[90%]"
            >
              {/* Left Side (The "Who") */}
              <div className="flex-1 pl-12 md:pl-0">
                <h2 className="text-[#a8e6c1] text-[9px] md:text-sm font-bold tracking-[0.3em] uppercase mb-1.5 md:mb-6">Who We Are</h2>
                <p className="text-white text-[10px] md:text-xl font-medium leading-relaxed">
                  NexTechZen is a boutique development collective. We don't just build websites; we architect digital legacies. Our mission is to bridge the gap between complex engineering and intuitive user experiences.
                </p>
              </div>

              {/* Right Side (The "Values") */}
              <div className="flex-1 flex flex-row md:flex-col gap-1 md:gap-4 justify-center md:items-end">
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-2 py-1.5 md:px-6 md:py-4 rounded-2xl w-full max-w-[180px] md:max-w-[280px] group hover:bg-black/50 transition-all duration-300">
                  <h4 className="text-[#a8e6c1] text-[8px] md:text-xs font-bold tracking-widest uppercase mb-0.5">Precision</h4>
                  <p className="text-white/80 text-[9px] md:text-sm">100% pixel-perfect layouts.</p>
                </div>
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-2 py-1.5 md:px-6 md:py-4 rounded-2xl w-full max-w-[180px] md:max-w-[280px] group hover:bg-black/50 transition-all duration-300 ml-0 md:mr-8">
                  <h4 className="text-[#a8e6c1] text-[8px] md:text-xs font-bold tracking-widest uppercase mb-0.5">Performance</h4>
                  <p className="text-white/80 text-[9px] md:text-sm">Lightning-fast load speeds.</p>
                </div>
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-2 py-1.5 md:px-6 md:py-4 rounded-2xl w-full max-w-[180px] md:max-w-[280px] group hover:bg-black/50 transition-all duration-300">
                  <h4 className="text-[#a8e6c1] text-[8px] md:text-xs font-bold tracking-widest uppercase mb-0.5">Partnership</h4>
                  <p className="text-white/80 text-[9px] md:text-sm">We grow with your business.</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="absolute right-8 bottom-10 md:right-20 md:bottom-16 z-30"
            >
              <p className="text-white text-[8px] md:text-sm font-bold tracking-[0.2em] uppercase drop-shadow-2xl">
                Bridging innovation and excellence.
              </p>
            </motion.div>
          </>
        )}

        {/* Foreground Image */}
        <img
          src="https://res.cloudinary.com/drufv7gh5/image/upload/v1777060340/rsz_69eaddef800cc_xdsuic.png"
          alt="User uploaded image"
          className="relative z-10 w-full h-full object-fill block pointer-events-none drop-shadow-2xl"
        />
      </main>
    </div>
  );
}
