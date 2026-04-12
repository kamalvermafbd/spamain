/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
 
import { useState, useEffect } from "react";
import { apiGet } from "./lib/api";
import HomeLibraryPrefetch from "./HomeLibraryPrefetch";
import ServicesPrefetch from "./ServicesPrefetch";
import PremiumBookingModalMock from "./PremiumBookingModalMock";
import MembershipPrefetch from "./MembershipPrefetch";
import MembershipPlans from "./MembershipPlans";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Navigation, 
  ChevronsDown, 
  MapPin, 
  Users, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  ArrowRight, 
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Phone,
  Info,
  Award, 
  Sparkles, 
  Volume2, 
  Headset,
  Globe,
  Play,
  PlayCircle,
  Youtube,
  Droplet,
  Wind,
  DoorOpen,
  User,
  ShieldAlert,
  Menu,
  X
} from "lucide-react";

const Navbar = () => {
 
  const [isOpen, setIsOpen] = useState(false);
const [bookingModalOpen, setBookingModalOpen] = useState(false);
  return (
   <>
    <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl shadow-2xl shadow-black/40 border-none">
      <div className="flex justify-between items-center px-6 md:px-12 py-4 lg:py-6 w-full max-w-screen-2xl mx-auto">
        <Link to="/" className="text-xl md:text-2xl font-headline tracking-tighter text-primary" onClick={() => setIsOpen(false)}>
          The Cinematic Sanctuary
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 font-headline tracking-wide uppercase text-sm">
          <Link className="text-secondary hover:text-primary transition-colors duration-500 hover:scale-105" to="/">Home</Link>
          <Link className="text-secondary hover:text-primary transition-colors duration-500 hover:scale-105" to="/about">About Us</Link>
          <Link className="text-secondary hover:text-primary transition-colors duration-500 hover:scale-105" to="/services">Services</Link>
          <Link className="text-secondary hover:text-primary transition-colors duration-500 hover:scale-105" to="/vlogs">Media</Link>
          <Link className="text-secondary hover:text-primary transition-colors duration-500 hover:scale-105" to="/contact">Contact Us</Link>
        </div>

        {/* Desktop CTA */}
       <button
  onClick={() => setBookingModalOpen(true)}
  className="hidden lg:block bg-primary hover:scale-105 transition-all duration-500 text-on-primary px-8 py-2.5 rounded-full font-body font-bold text-xs uppercase tracking-widest"
>
  Begin Your Ritual
</button>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-primary p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-2xl border-t border-outline-variant/10"
          >
            <div className="flex flex-col items-center py-8 gap-6 font-headline tracking-[0.2em] uppercase text-sm">
              <Link className="text-secondary hover:text-primary transition-colors py-2" to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link className="text-secondary hover:text-primary transition-colors py-2" to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
              <Link className="text-secondary hover:text-primary transition-colors py-2" to="/services" onClick={() => setIsOpen(false)}>Services</Link>
              <Link className="text-secondary hover:text-primary transition-colors py-2" to="/vlogs" onClick={() => setIsOpen(false)}>Media</Link>
              <Link className="text-secondary hover:text-primary transition-colors py-2" to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
              <button
  className="mt-4 bg-primary text-on-primary px-10 py-3 rounded-full font-body font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20"
  onClick={() => {
    setBookingModalOpen(true);
    setIsOpen(false);
  }}
>
  Begin Your Ritual
</button>
            </div>
          </motion.div>
        )}
          </AnimatePresence>
    </nav>

    {bookingModalOpen && (
      <PremiumBookingModalMock
  onClose={() => setBookingModalOpen(false)}
  selectedBranch={localStorage.getItem("selectedBranch") || ""}
/>
    )}
  </>
  );
};

const HomeHero = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");

    if (savedLocation) {
      console.log("📍 Existing saved location:", JSON.parse(savedLocation));
      return;
    }

    if (navigator.geolocation) {
      console.log("📡 Requesting location permission...");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          localStorage.setItem("userLocation", JSON.stringify(coords));

          console.log("✅ New location saved successfully:", coords);
        },
        (error) => {
          console.log("❌ Location permission denied or failed:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.log("⚠️ Geolocation not supported in this browser");
    }
  }, []);

  return (
  <>
  <header className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0 overflow-hidden">
  <video
    className="w-full h-full object-cover brightness-[0.7] scale-110"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  >
    <source
      src="https://ik.imagekit.io/qxanswwkt/Whisk_mmywkty1iwykjwn00so5ytotmtykrtlhbdmw0cn.mp4"
      type="video/mp4"
    />
  </video>
</div>
    <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background"></div>
    <div className="relative z-10 text-center px-6 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-body text-primary tracking-[0.5em] uppercase text-[10px] md:text-xs mb-6 block font-bold">
          The Art of Cinematic Stillness
        </span>
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-on-surface leading-[1.1] mb-8">
          Luxury Spa Rituals <br/><span className="italic text-secondary font-light">Across Faridabad</span>
        </h1>
        <p className="font-body text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          Step into a world where time dissolves. Relax, rejuvenate, and restore yourself with premium wellness experiences curated for the cinematic soul.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
           onClick={() => setBookingModalOpen(true)}
           className="w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary px-10 py-4 rounded-full font-body font-extrabold uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 transition-all duration-500">
            Book Appointment
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-3 border border-outline-variant/40 text-on-surface px-10 py-4 rounded-full font-body font-bold uppercase tracking-widest hover:bg-surface-container-high transition-all duration-500 backdrop-blur-md group">
            <MapPin className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            Find Nearest Branch
          </button>
        </div>
      </motion.div>
    </div>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
    >
      <ChevronsDown className="w-8 h-8 text-primary" />
    </motion.div>
  </header>

   {bookingModalOpen && (
  <PremiumBookingModalMock
    onClose={() => setBookingModalOpen(false)}
    selectedBranch={localStorage.getItem("selectedBranch") || ""}
  />
)}
 </>
  );
};
  
const ServicesHero = () => (
  <header className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0 z-0">
      <img 
        className="w-full h-full object-cover brightness-[0.3] scale-105" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdUDodJGgYt2riBhNAf1cUUOPrXugGK7U5U3Kq4WmGkdzmZ3sWnkXIa7tc_Z_W7eGtXGQ5F6A9tV2gXnPwRzwm_QuREhtb-w4o-InGqJ23VLe5Bl4DjbzqzyUm5yeaKrS4d9W8fUZYXmAWURROsI_1xHlz1zbeKn9i9Lka932E2cxcTtUxGiguyKxFOWEIipAkv1yDN-FBC-4fDkYuEEgvFMXMK7K2EhkLRUSKwfbDjjgOpsXDowrY8PHmdkEUCgnpEHfwhR-qgbbz"
        alt="Luxury spa services"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background"></div>
    <div className="relative z-10 text-center px-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-body text-primary tracking-[0.4em] uppercase text-xs mb-4 block font-bold">
          Treatment Menu
        </span>
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface leading-tight mb-8">
          Discover Your <br/><span className="italic text-secondary font-light">Healing Ritual</span>
        </h1>
        <p className="font-body text-on-surface-variant text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          A comprehensive collection of cinematic wellness experiences, from deep tissue restoration to signature skin rituals.
        </p>
        <button className="bg-primary text-on-primary px-12 py-5 rounded-full font-body font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-500 shadow-xl shadow-primary/20">
          Explore All Treatments
        </button>
      </motion.div>
    </div>
  </header>
);

const BranchFinder = () => {
  const [nearestBranch, setNearestBranch] = useState<any>(null);
 const [bookingModalOpen, setBookingModalOpen] = useState(false);
    useEffect(() => {
    const loadNearestBranch = async () => {
      try {
        const savedLocation = localStorage.getItem("userLocation");
        if (!savedLocation) return;

        const user = JSON.parse(savedLocation);

        const res = await apiGet("getBranches");

        if (!res?.success || !res.data?.length) return;

        const getDistance = (b: any) =>
          Math.sqrt(
            Math.pow(user.lat - Number(b.lat), 2) +
            Math.pow(user.lng - Number(b.lng), 2)
          );

        const nearest = [...res.data].sort(
          (a, b) => getDistance(a) - getDistance(b)
        )[0];

        setNearestBranch(nearest);
localStorage.setItem("selectedBranch", nearest.name || "");
        console.log("📍 Nearest branch loaded:", nearest);
      } catch (error) {
        console.error("❌ Branch fetch failed:", error);
      }
    };

    loadNearestBranch();
  }, []);

if (!nearestBranch) {
  return (
    <section className="py-24 px-6 bg-surface-container-lowest">
      <div className="max-w-screen-xl mx-auto">
        <div className="rounded-2xl border-2 border-primary/60 bg-surface-container-low p-10 md:p-16 text-center animate-pulse shadow-[0_0_30px_rgba(var(--color-primary),0.12)]">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>

          <h3 className="font-headline text-3xl text-on-surface mb-4">
            Finding Your Nearest Sanctuary
          </h3>

          <p className="font-body text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Please wait while we locate the nearest branch experience based on your current location.
          </p>
        </div>
      </div>
    </section>
  );
}
  return (
 <> 
  <section className="py-24 px-6 bg-surface-container-lowest relative overflow-hidden">
    <div className="max-w-screen-xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
        <div>
          <span className="text-primary font-body uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block">Discovery</span>
          <h2 className="font-headline text-3xl md:text-4xl text-on-surface">Your Nearest Sanctuary</h2>
        </div>
        <div className="flex items-center gap-3 text-on-surface-variant font-body text-xs uppercase tracking-widest bg-surface-container-high/50 border border-outline-variant/10 px-5 py-2.5 rounded-full backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
         Detecting Location: {nearestBranch.city || "Faridabad"}
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl overflow-hidden flex flex-col lg:flex-row items-stretch"
      >
        <div className="w-full lg:w-1/2 h-64 lg:h-auto relative group">
          <img 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            src={nearestBranch.img}
             alt={nearestBranch.name}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-md text-on-primary font-bold text-[10px] uppercase px-4 py-1.5 rounded-full tracking-widest shadow-lg">
            Most Visited
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
  {nearestBranch.area}, {nearestBranch.city}
</span>
            <div className="h-px flex-grow bg-outline-variant/20"></div>
          </div>
          <h3 className="font-headline text-3xl lg:text-4xl mb-6 text-on-surface">
  {nearestBranch.name}
</h3>
       
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-center gap-4 text-on-surface-variant">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                <Navigation className="w-4 h-4 text-primary" />
              </div>
             <span className="font-body text-sm">
  {nearestBranch.distance || "Nearest"} branch
</span>
            </div>
            <div className="flex items-center gap-4 text-on-surface-variant">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <span className="font-body text-sm">Next: Today, 4:30 PM</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <button 
             onClick={() => setBookingModalOpen(true)}
             className="flex-grow sm:flex-grow-0 bg-primary text-on-primary px-10 py-4 rounded-full font-body font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-xl shadow-primary/20">
              Book Now
            </button>
            <button className="flex-grow sm:flex-grow-0 border border-outline-variant/50 text-on-surface px-8 py-4 rounded-full font-body font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-all">
              <MessageCircle className="w-4 h-4 text-primary" />
              WhatsApp
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
   {bookingModalOpen && (
  <PremiumBookingModalMock
    onClose={() => setBookingModalOpen(false)}
    selectedBranch={nearestBranch?.name || ""}
  />
)}
  </>
);
    };

const HomeSignaturePreview = () => (
  <section className="py-24 px-6 md:px-12 bg-surface">
    <div className="max-w-screen-2xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-primary font-body uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Curated Menu</span>
        <h2 className="font-headline text-4xl md:text-6xl text-on-surface mb-6">Signature Rituals</h2>
        <p className="text-on-surface-variant font-body max-w-2xl mx-auto text-sm md:text-base">Masterful strokes and aromatic essences curated to dissolve the stresses of urban life.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[750px]">
        {/* Swedish Massage */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="md:col-span-8 group relative overflow-hidden rounded-2xl cursor-pointer"
        >
          <img 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP2FogJcs8lWddKoQ0Ys5PW2299bCnFv4cZ6lVH-QU910hEqYfHB98vG554kLYXE5vxCCkfeq00-4EXVZy2w4k1fhOMdMkyEEogiEQ7WoCebrp_NdyXhKhoxJH0t-mCeqffRm87R-n-hO5SkaU61ZLS9JztYIuxnij4yetzydCB5TmvDIxmJEg0rOqMo-DCfZxs849zJvtbrmE6n7w9aSeHTPXU-WPC2zjO2OoYpAz81D-t2GRQUzYbeOaO8Df14NQCk8iM6VwTUS7"
            alt="Swedish Massage"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <div className="flex items-center gap-4 text-primary text-[10px] uppercase tracking-widest mb-4 font-bold">
              <span>60/90 Minutes</span>
              <span className="w-1 h-1 rounded-full bg-primary/40"></span>
              <span>Restoration</span>
            </div>
            <h3 className="font-headline text-3xl md:text-4xl text-white mb-4">Swedish Massage</h3>
            <p className="text-on-surface-variant max-w-lg mb-8 text-sm leading-relaxed line-clamp-2">A timeless classic using long, gliding strokes to improve circulation and induce deep relaxation.</p>
            <button className="text-on-surface font-body font-bold uppercase text-[10px] tracking-widest flex items-center gap-3 group/btn">
              Explore Service <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2 text-primary" />
            </button>
          </div>
        </motion.div>

        {/* Deep Tissue */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-4 group relative overflow-hidden rounded-2xl cursor-pointer"
        >
          <img 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdUDodJGgYt2riBhNAf1cUUOPrXugGK7U5U3Kq4WmGkdzmZ3sWnkXIa7tc_Z_W7eGtXGQ5F6A9tV2gXnPwRzwm_QuREhtb-w4o-InGqJ23VLe5Bl4DjbzqzyUm5yeaKrS4d9W8fUZYXmAWURROsI_1xHlz1zbeKn9i9Lka932E2cxcTtUxGiguyKxFOWEIipAkv1yDN-FBC-4fDkYuEEgvFMXMK7K2EhkLRUSKwfbDjjgOpsXDowrY8PHmdkEUCgnpEHfwhR-qgbbz"
            alt="Deep Tissue"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h3 className="font-headline text-2xl text-white mb-3">Deep Tissue</h3>
            <p className="text-on-surface-variant text-xs mb-6 line-clamp-2">Targeted pressure for chronic tension and muscle knots.</p>
            <button className="text-primary font-body text-[10px] uppercase tracking-widest flex items-center gap-2">
              Explore <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>

        {/* Aroma Therapy */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-4 group relative overflow-hidden rounded-2xl cursor-pointer"
        >
          <img 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaU3iXko828hVvEsScsUwkgM-PlR-BwIZyAKF3jS-8EqUykYOWmyuQCdyYWX_mxljVJW1UDxFrx9QvVmNWUtxkJcgXvl9meQt55MzNceH8aik1dethjpOJTZdgmwU3oHkbBNKJqx2Vq908Fl1UrB8Ptl6NbuIE_ljxke2KEu8asdUzcfnhYKZbuhdKUhrvI47bjsFLqpKGoCZc3SAh2mqlsiBfgOSUcNEjmi_XuDsxv93Cxa7MSiYnGvoSLLA8lQ8lt3aDChOxdTy1"
            alt="Aroma Therapy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h3 className="font-headline text-2xl text-white mb-3">Aroma Therapy</h3>
            <p className="text-on-surface-variant text-xs mb-6 line-clamp-2">Sensory healing with organic botanical extracts.</p>
            <button className="text-primary font-body text-[10px] uppercase tracking-widest flex items-center gap-2">
              Explore <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>

        {/* Discover More */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-8 flex items-center justify-center bg-surface-container-high/30 rounded-2xl p-8 md:p-12 border border-outline-variant/10 group hover:bg-surface-container-high/50 transition-all"
        >
          <div className="text-center">
            <h3 className="font-headline text-3xl mb-4 text-on-surface">Discover the Full Menu</h3>
            <p className="text-on-surface-variant font-body mb-8 max-w-md mx-auto text-sm">From Thai rituals to specialized skin treatments, explore our comprehensive wellness collection.</p>
            <Link to="/services" className="inline-block bg-secondary text-on-secondary px-10 py-4 rounded-full font-body font-bold uppercase text-[10px] tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-500 shadow-lg">
              View All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const ServicesTreatmentGrid = ({ services = [] }: { services?: any[] }) => {
  const [spaServices, setSpaServices] = useState(services);
 const [bookingModalOpen, setBookingModalOpen] = useState(false);
const [selectedService, setSelectedService] = useState("");
 const [isPreparingBooking, setIsPreparingBooking] = useState(false);
useEffect(() => {
  setSpaServices(services);
}, [services]);
  return (
  <section className="py-24 px-6 md:px-12 bg-surface">
    <div className="max-w-screen-2xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-primary font-body uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Our Collection</span>
        <h2 className="font-headline text-4xl md:text-6xl text-on-surface mb-6">Therapeutic Rituals</h2>
        <p className="text-on-surface-variant font-body max-w-2xl mx-auto text-sm md:text-base">Explore our full range of curated treatments designed for total restoration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 🔴 REPLACED static array with API prefetched services */}
{spaServices.map((item, idx) => (
  <motion.div 
    key={item.no || idx}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: idx * 0.1 }}
    className="glass-card rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-500"
  >
    <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
      {item.src?.endsWith(".mp4") ? (
        <video
          src={item.src}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      ) : (
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
      )}

      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-primary font-bold uppercase tracking-widest">
        {item.duration}
      </div>
    </div>
    
    <div className="p-8">
      <h3 className="font-headline text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">
        {item.title}
      </h3>
      <p className="text-on-surface-variant text-sm font-body leading-relaxed mb-8">
        {item.desc}
      </p>
      <button 
   onClick={() => {
  if (isPreparingBooking) return;

  setSelectedService(item.title);
  setIsPreparingBooking(true);   
    setBookingModalOpen(true);
 
}}
       className="w-full py-4 bg-primary/10 text-primary rounded-full font-body font-bold uppercase text-[10px] tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-500">
        Book Ritual
      </button>
    </div>
  </motion.div>
))}
      </div>
    </div>
{isPreparingBooking && (
  <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md flex items-center justify-center px-6">
    <div className="w-full max-w-md rounded-3xl border border-primary/30 bg-[#111]/95 p-8 text-center shadow-[0_0_40px_rgba(212,175,55,0.15)]">
      <div className="mx-auto mb-5 h-12 w-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-3">
        Preparing Your Ritual
      </p>
      <p className="text-sm text-white/75 leading-relaxed">
        Personalizing your selected service and loading available durations...
      </p>
    </div>
  </div>
)}
{bookingModalOpen && (
  <PremiumBookingModalMock
    onClose={() => {
  setBookingModalOpen(false);
  setIsPreparingBooking(false);
}}
    selectedBranch={localStorage.getItem("selectedBranch") || ""}
    defaultBookingType="service"
    defaultSelectedOption={selectedService}
   onServiceReady={() => setIsPreparingBooking(false)}
  />
)}
   
  </section>
);
};
const ExclusiveRituals = ({
  plans = [],
}: {
  plans?: any[];
}) => {
  const [selectedMembership, setSelectedMembership] = useState("");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isPreparingMembership, setIsPreparingMembership] = useState(false);

  return (
  <section className="bg-surface-container-lowest py-32 px-6 md:px-12 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
    <div className="max-w-screen-2xl mx-auto relative z-10">
      
     <div className="text-center mb-20">
        <h2 className="font-headline text-5xl mb-6 text-on-surface">Exclusive Rituals</h2>
       
        <p className="text-on-surface-variant font-body max-w-2xl mx-auto">Elevate your wellness journey with curated memberships designed for consistent restoration and cinematic luxury.</p>
      </div>
     
<MembershipPlans
  plans={plans}
  selectedPlan={selectedMembership}
  onCardSelect={(plan: any) => {
    setSelectedMembership(plan.name);
  }}
  onSelectPlan={(plan: any) => {
    setSelectedMembership(plan.name);
    setIsPreparingMembership(true);
    setBookingModalOpen(true);
  }}
/>
     
           {isPreparingMembership && (
          <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md flex items-center justify-center px-6">
            <div className="w-full max-w-md rounded-3xl border border-primary/30 bg-[#111]/95 p-8 text-center shadow-[0_0_40px_rgba(212,175,55,0.15)]">
              <div className="mx-auto mb-5 h-12 w-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-3">
                Preparing Membership
              </p>
              <p className="text-sm text-white/75 leading-relaxed">
                Loading your selected wellness membership...
              </p>
            </div>
          </div>
        )}

        {bookingModalOpen && (
          <PremiumBookingModalMock
            onClose={() => {
              setBookingModalOpen(false);
              setIsPreparingMembership(false);
            }}
            selectedBranch={localStorage.getItem("selectedBranch") || ""}
            defaultBookingType="membership"
            defaultSelectedOption={selectedMembership}
            onServiceReady={() => setIsPreparingMembership(false)}
          />
        )}
      </div>
    </section>
  );
};

const Standards = () => (
  <section className="py-24 px-6 bg-surface-container-low relative overflow-hidden">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="w-full lg:w-1/2">
          <div className="mb-10">
            <span className="text-primary font-body uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Our Philosophy</span>
            <h2 className="font-headline text-4xl md:text-5xl text-on-surface mb-6 leading-tight">
              The Standards of <br/><span className="text-primary italic">Cinematic Excellence</span>
            </h2>
            <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed">
              We don't just provide massages; we curate atmospheres where the body finds its rhythm and the mind finds its silence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { icon: Award, title: "Certified Artisans", desc: "Each therapist undergoes 500+ hours of specialized training in international wellness." },
              { icon: Sparkles, title: "Clinical Hygiene", desc: "Hospital-grade sterilization and single-use ritual kits for every session." },
              { icon: Volume2, title: "Acoustic Design", desc: "Custom sound-engineered sanctuaries designed for absolute auditory peace." },
              { icon: Headset, title: "Tailored Rituals", desc: "Consultation-led approach ensuring every session meets your unique needs." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <item.icon className="w-5 h-5" />
                </div>
                <h5 className="font-headline text-lg text-on-surface">{item.title}</h5>
                <p className="text-on-surface-variant text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img 
              className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjT42j3Bc07QIGy4U-lWyi1vcNSg6h5lCNTUMHFWk6esfm-ZTuspfFwNYE3iIEF3JoFRyDVTy7yI1FgsnoYXKUIiU_br7aJTXmOqAqQdkGADcOB76lNRqgxJuAjWcUMXFcj7Qj4MX7JayQdELY8RxJXFbdSSxPTngXgL05sp91FQk5HRAab6F8KSO1X-ZAraDPDqlLuoY83y53Hl_2r75x8cTeMwyocONDHIsvm4bCLjr5pNlARYhJ7_v2TeUxpizg0R5XgInqRVS8"
              alt="Luxury spa ambiance"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000"></div>
          </div>
          
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="absolute -bottom-6 -left-6 glass-card p-6 rounded-xl border border-outline-variant/20 shadow-2xl"
          >
            <div className="text-primary font-headline text-4xl mb-1">12+</div>
            <div className="text-secondary font-body uppercase text-[10px] tracking-widest font-bold">Years of Excellence</div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#0e0e0e] w-full pt-20 pb-10">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-12 max-w-screen-2xl mx-auto">
      <div className="col-span-1">
        <div className="text-xl font-headline text-primary mb-6">The Cinematic Sanctuary</div>
        <p className="font-body text-sm leading-relaxed text-on-surface-variant mb-8">
          A sanctuary of cinematic stillness, dedicated to the art of holistic restoration and modern wellness rituals.
        </p>
        <div className="flex gap-4">
          <Play className="w-6 h-6 text-primary cursor-pointer hover:scale-110 transition-transform" />
          <MessageCircle className="w-6 h-6 text-primary cursor-pointer hover:scale-110 transition-transform" />
          <Mail className="w-6 h-6 text-primary cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>
      <div>
        <h5 className="text-primary font-bold mb-6 font-body uppercase text-xs tracking-widest">Our Sanctuaries</h5>
        <ul className="space-y-4 font-body text-base">
          <li><a className="text-on-surface-variant hover:text-primary transition-all duration-400" href="#">Faridabad Sector 15</a></li>
          <li><a className="text-on-surface-variant hover:text-primary transition-all duration-400" href="#">Faridabad NIT</a></li>
        </ul>
      </div>
      <div>
        <h5 className="text-primary font-bold mb-6 font-body uppercase text-xs tracking-widest">Services</h5>
        <ul className="space-y-4 font-body text-base">
          <li><a className="text-on-surface-variant hover:text-primary transition-all duration-400" href="#">Massage Therapy</a></li>
          <li><a className="text-on-surface-variant hover:text-primary transition-all duration-400" href="#">Skin Rituals</a></li>
        </ul>
      </div>
      <div>
        <h5 className="text-primary font-bold mb-6 font-body uppercase text-xs tracking-widest">Connect</h5>
        <ul className="space-y-4 font-body text-base">
          <li><a className="text-on-surface-variant hover:text-primary transition-all duration-400" href="#">YouTube</a></li>
          <li><a className="text-on-surface-variant hover:text-primary transition-all duration-400" href="#">WhatsApp</a></li>
          <li><a className="text-on-surface-variant hover:text-primary transition-all duration-400" href="#">Newsletter</a></li>
        </ul>
      </div>
    </div>
    <div className="mt-20 pt-8 border-t border-outline-variant/10 max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="font-body text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
        © 2024 The Cinematic Sanctuary Spa. All Rights Reserved.
      </p>
      <div className="flex gap-8 text-[10px] uppercase tracking-widest text-on-surface-variant opacity-60">
        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
      </div>
    </div>
  </footer>
);

const Contact = () => (
  <main className="pt-32 pb-24 bg-background">
    {/* Hero Section */}
    <section className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-primary font-body font-semibold tracking-widest uppercase text-xs mb-4 block"
        >
          Reservation & Inquiries
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-headline leading-[1.1] mb-8 tracking-tighter text-on-surface"
        >
          Enter the <br/><span className="italic text-secondary">Sanctuary.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-on-surface-variant max-w-xl leading-relaxed font-body"
        >
          Serving premium wellness experiences across Faridabad. Begin your journey toward tranquility by reserving your session today.
        </motion.p>
        <div className="mt-12 flex flex-wrap gap-6">
          <a className="flex items-center gap-3 bg-surface-container-high px-8 py-4 rounded-full hover:bg-surface-container-highest transition-all duration-400 group" href="tel:+910000000000">
            <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-body font-bold text-on-surface">Call Now</span>
          </a>
          <a className="flex items-center gap-3 bg-surface-container-high px-8 py-4 rounded-full hover:bg-surface-container-highest transition-all duration-400 group" href="https://wa.me/910000000000">
            <MessageCircle className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-body font-bold text-on-surface">WhatsApp</span>
          </a>
        </div>
      </div>
      <div className="lg:col-span-5 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl"
        >
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK9ICvZ65EMsQO-sM2TgaCS7YFK4tatpg5XIGz20-1OeUEy8joG0sNLpBhPGvsuzhYv7hSQhWc3uU-bCC-iByytwUMcD8NclprtM5FmnOdrgsfcqIlaL92NRK-Xu5qtk0onr27DHCKBu-R4pGNK_tgBfXDhOpZUOAdSS3YLSulEsUo6MFABqV8jFjObyfglb_pQ4xEmimV_l6qNfJ1wiQnp-B31NVfvPXV2QgaYfTM20ybkvMZ4UnprLDzhUP-ID5VeRekZbH-1gu4"
            alt="Luxury spa interior"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute -bottom-8 -left-8 glass-card p-8 rounded-xl max-w-[280px] border border-outline-variant/20"
        >
          <ShieldCheck className="w-8 h-8 text-primary mb-4 block" />
          <p className="text-sm font-body text-on-surface leading-relaxed">Exclusivity is our hallmark. Exact branch locations are shared privately via WhatsApp upon booking confirmation.</p>
        </motion.div>
      </div>
    </section>

    {/* Booking & Contact Grid */}
    <section className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
      {/* Booking Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-12 rounded-xl shadow-2xl border border-outline-variant/10"
      >
        <h2 className="text-3xl font-headline mb-10 text-on-surface">Request a Ritual</h2>
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <label className="block text-xs font-body uppercase tracking-widest text-on-surface-variant mb-2">Full Name</label>
              <input className="w-full bg-transparent border-0 border-b border-outline-variant/40 py-3 focus:ring-0 focus:border-primary transition-all text-on-surface outline-none" placeholder="E.g. Julianne Moore" type="text"/>
            </div>
            <div className="relative">
              <label className="block text-xs font-body uppercase tracking-widest text-on-surface-variant mb-2">Phone Number</label>
              <input className="w-full bg-transparent border-0 border-b border-outline-variant/40 py-3 focus:ring-0 focus:border-primary transition-all text-on-surface outline-none" placeholder="+91 00000 00000" type="tel"/>
            </div>
          </div>
          <div className="relative">
            <label className="block text-xs font-body uppercase tracking-widest text-on-surface-variant mb-2">Preferred Sanctuary Branch</label>
            <select className="w-full bg-transparent border-0 border-b border-outline-variant/40 py-3 focus:ring-0 focus:border-primary transition-all text-on-surface appearance-none outline-none cursor-pointer">
              <option className="bg-surface text-on-surface">Select a location</option>
              <option className="bg-surface text-on-surface">Faridabad Sector 15</option>
              <option className="bg-surface text-on-surface">Faridabad NIT</option>
            </select>
          </div>
          <div className="relative">
            <label className="block text-xs font-body uppercase tracking-widest text-on-surface-variant mb-2">Preferred Service</label>
            <div className="flex flex-wrap gap-3 mt-4">
              <button className="px-5 py-2 rounded-lg bg-surface-container-high text-secondary text-sm border border-outline-variant/20 hover:border-primary transition-all" type="button">Massage Therapy</button>
              <button className="px-5 py-2 rounded-lg bg-primary text-on-primary text-sm font-bold" type="button">Skin Rituals</button>
              <button className="px-5 py-2 rounded-lg bg-surface-container-high text-secondary text-sm border border-outline-variant/20 hover:border-primary transition-all" type="button">Body Polish</button>
            </div>
          </div>
          <div className="relative">
            <label className="block text-xs font-body uppercase tracking-widest text-on-surface-variant mb-2">Special Notes (Optional)</label>
            <textarea className="w-full bg-transparent border-0 border-b border-outline-variant/40 py-3 focus:ring-0 focus:border-primary transition-all text-on-surface outline-none" placeholder="Any preferences or health concerns?" rows={3}></textarea>
          </div>
          <button className="w-full py-5 rounded-full bg-primary text-on-primary font-bold text-lg hover:scale-[1.02] transition-transform duration-500 shadow-lg shadow-primary/20" type="submit">
            Confirm Appointment Request
          </button>
          <div className="mt-8 flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-on-surface-variant italic font-body">
              Your privacy is our priority. Upon confirmation, a concierge will reach out via WhatsApp with your dedicated therapist profile and precise suite directions.
            </p>
          </div>
        </form>
      </motion.div>

      {/* Map & Presence */}
      <div className="flex flex-col justify-between">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-headline mb-6 text-on-surface">Our Footprint</h2>
          <p className="text-on-surface-variant leading-relaxed mb-12 font-body">We operate discreet, high-end suites strategically located for accessibility while ensuring absolute privacy for our esteemed guests.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-xl bg-surface-container-low transition-all hover:bg-surface-container group cursor-default">
              <h3 className="text-primary font-headline text-xl mb-2">Sector 15</h3>
              <p className="text-sm text-on-surface-variant mb-4 font-body">The Premium Business Hub</p>
              <div className="flex items-center gap-2 text-xs text-secondary font-body tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Available Today
              </div>
            </div>
            <div className="p-8 rounded-xl bg-surface-container-low transition-all hover:bg-surface-container group cursor-default">
              <h3 className="text-primary font-headline text-xl mb-2">NIT Branch</h3>
              <p className="text-sm text-on-surface-variant mb-4 font-body">The Urban Oasis</p>
              <div className="flex items-center gap-2 text-xs text-secondary font-body tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Available Today
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-container-lowest flex items-center justify-center group"
        >
          {/* Stylized Abstract Map Visual */}
          <div className="absolute inset-0 opacity-30 grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-50">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbB2dhKdSdVtaadej-HBEOhUmmik_PCf93juKT67GHYgYpyTKTkyRqc-MCC6PMGSXIDxaZbuPLf3vyvKQbM2tWKuUsb84U4pj1GTPBhGBT-48kz4mbvygafQ6VyVdi2CT3iMtaISdnF0fYLVKg76ZJQoTqni6YYUs7Jek40EXfoNjQTKsu0jWj2OMI4my2AS1rkepJib6JvdlujixvCZg4jQ6HNvAxIoZurBo0CjffW3dhdcZ51obfxCfZkSQVsdO8-HYfHRGHIOJs"
              alt="Abstract map of Faridabad"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 text-center">
            <MapPin className="w-12 h-12 text-primary mb-4 mx-auto drop-shadow-[0_0_10px_rgba(233,195,73,0.5)]" />
            <p className="text-primary font-headline text-2xl">Faridabad, HR</p>
          </div>
        </motion.div>

        <div className="mt-12 flex items-center gap-10">
          <a className="text-on-surface-variant hover:text-primary transition-all text-sm uppercase tracking-widest flex items-center gap-2 group font-body" href="#">
            <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
            YouTube
          </a>
          <a className="text-on-surface-variant hover:text-primary transition-all text-sm uppercase tracking-widest flex items-center gap-2 group font-body" href="#">
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Newsletter
          </a>
        </div>
      </div>
    </section>
  </main>
);

const Vlogs = ({ videos = [] }: { videos?: any[] }) => {
  const [sanctuaryVideos, setSanctuaryVideos] = useState(videos);
  const [activeVideo, setActiveVideo] = useState<any>(null);

useEffect(() => {
  const initVideos = async () => {
    try {
      const cachedVideos = localStorage.getItem("sanctuaryVideos");

      if (cachedVideos) {
        console.log("📦 Using cached sanctuary videos");
        setSanctuaryVideos(JSON.parse(cachedVideos));
        return;
      }

      console.log("🚀 No cache found, calling API");
      const res = await apiGet("getLibraryVideos");

      if (res?.success) {
        setSanctuaryVideos(res.data || []);
        localStorage.setItem(
          "sanctuaryVideos",
          JSON.stringify(res.data || [])
        );
      }
    } catch (error) {
      console.error("❌ Sanctuary init failed:", error);
    }
  };

  initVideos();
}, []);

  return (
  
  <main className="pt-32 pb-24 bg-background">
    {/* Featured Video Hero */}
    <section className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
        <div className="lg:col-span-7">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-body text-primary uppercase tracking-[0.3em] text-xs font-bold mb-4 block"
          >
            Premiere Selection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-headline text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter text-on-surface mb-6"
          >
            Unveiling The Ritual of Silence
          </motion.h1>
        </div>
        <div className="lg:col-span-5 pb-4">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-body text-lg text-on-surface-variant leading-relaxed max-w-md"
          >
            Step inside our Faridabad NIT sanctuary for an exclusive guided walkthrough of our signature meditative massage experience.
          </motion.p>
        </div>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative w-full aspect-video rounded-xl overflow-hidden group shadow-2xl shadow-black/60"
      >
        <video
  className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
>
  <source
    src="https://delivery.pixelbin.io/predictions/outputs/30d/veo31Fast/generate/019d72dc-8590-7dd2-8a71-8027b47d05b2/result_0.mp4"
    type="video/mp4"
  />
</video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-10 left-10 hidden md:block">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30">
              <span className="font-body text-primary text-sm font-bold">LATEST RELEASE</span>
            </div>
            <span className="font-body text-secondary text-sm">14:22 • High Definition</span>
          </div>
        </div>
      </motion.div>
    </section>

    {/* Shorts Style Cards (Asymmetric Layout) */}
    <section className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-32">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="font-headline text-4xl text-on-surface">Daily Rituals</h2>
          <p className="font-body text-on-surface-variant mt-2">Bite-sized wellness moments for your home sanctuary.</p>
        </div>
        <button className="font-body text-primary hover:underline underline-offset-8 transition-all flex items-center gap-2 group">
          View All Shorts <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[
          { title: "Morning Mindfulness Tea", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_U7Rhyo-TyPXFxw3ppCQ7f-wKFz-VWbpE0baeFuVc_JAvXOYxwXilrxj9Cvz064dHoT9pCNWcUT9qWDTcRgQwkAiJ-sh4OpbQ4LmB5lwOp6Emk03WIQT6maYE0SxiZYX2xnL6i8CB-eNmXyLGlY1Ef2-ly7jIRgcCdeDZWVUBQdtnl1qePLca6517YA8eD7oUacLPB1KHR9wjBMsj_Ok56_5NiuMzPsUiN6DqWcmGB3gKeOV8_un9zc_1PGIQbdE4HR1IumfbAfym" },
          { title: "5-Min Spinal Flow", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuChtwdI9fm0w_HaftB6Yyomx85x3tNV5BVe-dTckrfV5yNuInAJ8lR_AUwjJ6JJxeAFiRQy_YPN8GbK7g7czLh5mT71dC4Vk9EkrvwI-lP-oI1MO0n_qmgOFs9c7FmwQ7JpX5c-E9I5zxLq-Ts_pWy07qTcd4bGTYHAWPGh7tg5lcKogXiPZpX5v2S5uaBPuX7DcsRQPZlKyuv-rjenpgw7cDhzZPFXntdi3i6SD59Xbo4zL41OGerClMCSwbxI_FDm23-NBZZrAkRl", offset: true },
          { title: "Evening Reset Atmosphere", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTzbujK-emLeXCTHTLtaYIbQD3_RxEuZWCOJXUalAYv5Q6z1hNVkGBoXGmhroA0O-jGlXazW5isGGEyNmGKz0Kgm4A0SCbRkIUD6_bkUPVtPey_2PbGJ9jc2yga2dc2h4JQQNGVqlIgaUK17l-xQS6Wmnh-XjyBLf-YFDKU5gCkTJytn3GxR39Dtw36ZWF4Ug4bhEPYyHYbFFtx1UNxG_qLWUU-t2FcH5Vuz2auInxZE9w_ifDVWOUURjCG47k57WjDgFcEVB9RR1W" },
          { title: "Pressure Point Relief", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR3GuIzkK1MQMNOs8rjg3Ryi_aRubga4a3nOKBbI0_Rp1KT4vpNwpb3BM9kRbMG2NKgYyv1WxStdEtKKcmEhFlot7wZALagj7KcRNu-iKlfWLI7AvmBgaDXskwJDdmfujtYgif_ZM6DHGZpI6HwdzciKflzs9EAd_5DN5kP_DdFGYBVpccKv8-K3kphe4iA7LyBZmCbz5PWcmO6OTbmZTXL7ou48ILkkM1eDvm_olCQ_cKkyiiPHrW1RwWtrGYlCSZF9gxOwIyXxoH", offset: true },
          { title: "Nature Sounds Meditation", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAT0OQRaetjC8TGMXTktLkxKPDU3KPb3kmFanLwaOlKBWOTva7oV-z4HC44k5erIrdtmAtgEkIo2sSdDP91qzGGCe-JV3EJuF8kUaLXgf16Cjm1PVtkw76Q5sgEZpTOkfJ07HWfjwbno4ijWsO8rqiojEr6lSw-qcHJg55aP7LuY8RMwijU_uJLTxg-_Jju17zmJAbFEnxbVVje0uYL_Ld7QohQEbDet8iB26RXTRWhhrAHN9VrYJneTltjXHo70KT-lym0PL9B0N3C", desktopOnly: true }
        ].map((short, idx) => (
          <div key={idx} className={`flex flex-col gap-4 ${short.offset ? 'mt-8 md:mt-16' : ''} ${short.desktopOnly ? 'hidden lg:flex' : 'flex'}`}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="aspect-[9/16] rounded-xl overflow-hidden relative group cursor-pointer"
            >
              <img 
                src={short.src} 
                alt={short.title} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/10">
                  <p className="text-xs font-body text-on-surface leading-snug">{short.title}</p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>

    {/* The Sanctuary Library: Video Clips */}
    <section className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="font-headline text-4xl text-on-surface">The Sanctuary Library</h2>
          <p className="font-body text-on-surface-variant mt-2">Cinematic glimpses into our ritual performances.</p>
        </div>
        <div className="w-24 h-px bg-primary/40 hidden md:block mb-4"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        
       {sanctuaryVideos.map((video, idx) => (
    
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
           {video.src.endsWith(".mp4") ? (
  <video
    src={video.src}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    muted
    loop
    playsInline
    autoPlay
    preload="metadata"
  />
) : (
  <img
    src={video.src}
    alt={video.title}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    referrerPolicy="no-referrer"
  />
)}

              
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-on-primary" />
              </div>
            </div>
            <span className="font-body text-primary text-xs font-bold uppercase tracking-widest block mb-2">{video.tag}</span>
            <h3 className="font-headline text-xl text-on-surface group-hover:text-primary transition-colors">{video.title}</h3>
            <p className="font-body text-on-surface-variant text-sm mt-3 line-clamp-2">{video.desc}</p>
          <button
  onClick={() => setActiveVideo(video)}
  className="mt-4 font-body text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 group/btn"
>
  WATCH GUIDE
  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
</button>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Wellness Library: Daily Blogs */}
    <section className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="font-headline text-4xl text-on-surface">Wellness Library</h2>
          <p className="font-body text-on-surface-variant mt-2">Daily insights into the art of cinematic living.</p>
        </div>
        <button className="font-body text-primary hover:underline underline-offset-8 transition-all flex items-center gap-2 group">
          View All Articles <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            category: "Rituals",
            date: "Oct 24, 2024",
            title: "The Science of Silence",
            excerpt: "How intentional quietude during massage therapy rewires the brain for deep relaxation.",
            src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop"
          },
          {
            category: "Aromatherapy",
            date: "Oct 22, 2024",
            title: "Rare Botanicals: Oud",
            excerpt: "Exploring the mystical properties of liquid gold and its role in our signature blends.",
            src: "https://images.pexels.com/photos/20943443/pexels-photo-20943443.jpeg"
          },
          {
            category: "Lifestyle",
            date: "Oct 20, 2024",
            title: "Morning Tea Rituals",
            excerpt: "Three mindful tea ceremonies to begin your day with cinematic clarity and focus.",
            src: "https://images.pexels.com/photos/30681927/pexels-photo-30681927.jpeg"
          },
          {
            category: "Design",
            date: "Oct 18, 2024",
            title: "Sanctuary Architecture",
            excerpt: "The philosophy behind our dark, moody interiors and how they aid sensory deprivation.",
            src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
          }
        ].map((post, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 group hover:border-primary/30 transition-all duration-500"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={post.src} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-body text-primary uppercase tracking-widest font-bold">{post.category}</span>
                <span className="text-[10px] font-body text-on-surface-variant uppercase tracking-widest">{post.date}</span>
              </div>
              <h3 className="font-headline text-xl text-on-surface mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
              <button className="font-body text-secondary hover:text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
                Read More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Subscribe CTA (Glassmorphism Bento Style) */}
    <section className="max-w-screen-2xl mx-auto px-6 md:px-12">
      <div className="glass-card rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 max-w-xl text-center md:text-left">
          <h2 className="font-headline text-4xl md:text-5xl text-on-surface mb-6">Enter Our Digital Sanctuary</h2>
          <p className="font-body text-lg text-on-surface-variant mb-8">
            Join 250k+ subscribers on YouTube for weekly cinematic meditations and behind-the-scenes wellness secrets.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button className="bg-primary text-on-primary px-10 py-4 rounded-full font-body font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-xl shadow-primary/30">
              <Youtube className="w-6 h-6 fill-current" />
              Subscribe on YouTube
            </button>
            <button className="border border-outline-variant text-on-surface px-10 py-4 rounded-full font-body font-bold hover:bg-white/5 transition-colors">
              Recent Uploads
            </button>
          </div>
        </div>
        <div className="relative z-10 grid grid-cols-2 gap-4">
          <div className="bg-surface-container-high p-6 rounded-2xl text-center">
            <div className="text-3xl font-headline text-primary mb-1">2.4M</div>
            <div className="text-xs font-body text-on-surface-variant uppercase tracking-widest">Views</div>
          </div>
          <div className="bg-surface-container-high p-6 rounded-2xl text-center mt-8">
            <div className="text-3xl font-headline text-primary mb-1">50+</div>
            <div className="text-xs font-body text-on-surface-variant uppercase tracking-widest">Ritual Guides</div>
          </div>
        </div>
      </div>
    </section>
    {activeVideo && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-6">
    <div className="max-w-md w-full bg-surface p-8 rounded-2xl text-center border border-primary/20 shadow-2xl">
      <h3 className="font-headline text-2xl text-primary mb-4">
        {activeVideo.title}
      </h3>
      <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-8">
        Full cinematic guide for this ritual is coming soon ✨
      </p>
      <button
        onClick={() => setActiveVideo(null)}
        className="bg-primary text-on-primary px-8 py-3 rounded-full font-body font-bold uppercase text-xs tracking-widest"
      >
        Close
      </button>
    </div>
  </div>
)}
  </main>
);
};

const Services = ({
  services = [],
  membershipPlans = [],
}: {
  services?: any[];
  membershipPlans?: any[];
}) => (
  <div className="bg-background">
    <ServicesHero />
    <ServicesTreatmentGrid services={services} />
    <ExclusiveRituals plans={membershipPlans} />
  </div>
);

const About = () => (
  <div className="pt-20">
    {/* About Hero */}
    <header className="relative h-[600px] flex items-center justify-center overflow-hidden">




<div className="absolute inset-0 z-0">
  <video
    className="w-full h-full object-cover brightness-[0.55]"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  >
    <source
      src="https://ik.imagekit.io/qxanswwkt/Whisk_gdzhvdo2gtohdtm00cnzuwytgjz0qtl2gdzk1yy.mp4"
      type="video/mp4"
    />
  </video>
</div>


      
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background"></div>
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-primary tracking-[0.4em] uppercase text-xs mb-4 block"
        >
          Our Story
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface leading-none mb-8"
        >
          Crafting Moments of <br/><span className="italic text-secondary font-light">Pure Transcendence</span>
        </motion.h1>
      </div>
    </header>

    {/* Wellness Philosophy Cards (Unchanged) */}
    <section className="py-24 px-6 bg-background">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-8 glass-card rounded-2xl">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-2xl mb-4 text-on-surface">Mindful Touch</h3>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              Our philosophy centers on the power of intentional touch to release stored tension and restore energetic flow.
            </p>
          </div>
          <div className="text-center p-8 glass-card rounded-2xl">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <Volume2 className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-2xl mb-4 text-on-surface">Aromatic Soul</h3>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              We use rare botanical essences to engage the senses and guide the mind into a state of deep, cinematic calm.
            </p>
          </div>
          <div className="text-center p-8 glass-card rounded-2xl">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-2xl mb-4 text-on-surface">Inner Peace</h3>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              Every ritual is a step towards internal harmony, designed to leave you feeling balanced and profoundly renewed.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Hygiene Promise Section (Unchanged) */}
    <section className="py-24 px-6 bg-surface-container-low">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop" 
            alt="Clean spa environment" 
            className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="w-full md:w-1/2">
          <span className="text-primary font-body uppercase tracking-widest text-xs font-bold mb-4 block">Our Commitment</span>
          <h2 className="font-headline text-4xl mb-6 text-on-surface">The Hygiene Promise</h2>
          <p className="text-on-surface-variant font-body mb-8 leading-relaxed">
            Your safety and comfort are our highest priorities. We adhere to clinical-grade sterilization standards, ensuring every sanctuary is a pristine haven for your wellness journey.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-on-surface">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-body text-sm">Hospital-grade sterilization of all equipment</span>
            </div>
            <div className="flex items-center gap-4 text-on-surface">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-body text-sm">Single-use biodegradable treatment kits</span>
            </div>
            <div className="flex items-center gap-4 text-on-surface">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-body text-sm">HEPA-filtered air purification in every suite</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Why Choose Our Sanctuary (New Trust Section) */}
    <section className="py-32 px-6 bg-background">
      <div className="max-w-screen-xl mx-auto text-center mb-20">
        <h2 className="font-headline text-4xl md:text-5xl text-on-surface mb-6">Why Choose Our Sanctuary</h2>
        <div className="w-24 h-px bg-primary/40 mx-auto"></div>
      </div>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Award, title: "Certified Wellness Standards", desc: "Internationally recognized protocols for safety and excellence." },
          { icon: Droplet, title: "Premium Imported Oils", desc: "Pure, organic botanical extracts sourced from the world's finest distilleries." },
          { icon: Wind, title: "Fresh Linen Every Session", desc: "Crisp, high-thread-count linens replaced after every single guest." },
          { icon: DoorOpen, title: "Private Luxury Suites", desc: "Completely secluded environments for total peace and privacy." },
          { icon: Sparkles, title: "Hygiene First Rituals", desc: "A meticulous cleaning choreography performed before every treatment." },
          { icon: User, title: "Personalized Wellness Journeys", desc: "Custom-tailored experiences designed for your unique physical needs." }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="p-10 glass-card rounded-2xl border border-outline-variant/10 hover:shadow-[0_0_30px_rgba(233,195,73,0.1)] transition-all duration-500"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
              <item.icon className="w-7 h-7" />
            </div>
            <h4 className="font-headline text-xl mb-4 text-on-surface">{item.title}</h4>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Cinematic Image Strip (New) */}
    <section className="w-full overflow-hidden py-10">
      <div className="flex flex-col md:flex-row gap-4 h-[400px] md:h-[500px]">
        {[
          "https://images.unsplash.com/photo-1544161515-436cefb65794?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1591343395082-e120087004b4?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop"
        ].map((src, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: idx * 0.2 }}
            className="flex-1 relative group overflow-hidden"
          >
            <img 
              src={src} 
              alt={`Spa ambience ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* The Sanctuary Promise (Redesigned Manifesto) */}
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?q=80&w=2070&auto=format&fit=crop" 
              alt="Candle-lit spa room" 
              className="rounded-2xl shadow-2xl relative z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <span className="text-primary font-body uppercase tracking-[0.3em] text-xs font-bold mb-6 block">Our Vow</span>
          <h2 className="font-headline text-4xl md:text-6xl text-on-surface mb-10 leading-tight">The Sanctuary <br/><span className="italic text-secondary">Promise</span></h2>
          <div className="space-y-8 text-on-surface-variant font-body text-lg leading-relaxed italic">
            <p>
              "In the flicker of a single candle, we find the beginning of silence. Our promise is not just a service, but a sacred transition from the noise of the world to the music of the soul."
            </p>
            <p>
              "We curate every scent, every sound, and every touch to ensure that when you step through our doors, you aren't just entering a spa—you are entering a cinematic masterpiece of healing."
            </p>
          </div>
          <div className="mt-12 flex items-center gap-6">
            <div className="w-16 h-px bg-primary/40"></div>
            <span className="font-headline text-primary text-xl tracking-widest uppercase">The Sanctuary Team</span>
          </div>
        </div>
      </div>
    </section>

    {/* Final CTA (Unchanged) */}
    <section className="py-24 px-6 bg-surface-container-high text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-headline text-4xl mb-8 text-on-surface">Begin Your Journey</h2>
        <p className="text-on-surface-variant font-body mb-12">
          The sanctuary is waiting. Secure your moment of cinematic stillness today.
        </p>
        <button className="bg-primary text-on-primary px-12 py-5 rounded-full font-body font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-500 shadow-xl shadow-primary/20">
          Book Appointment
        </button>
      </div>
    </section>
  </div>
);

const Home = ({
  membershipPlans = [],
}: {
  membershipPlans?: any[];
}) => (
  <>
    <HomeLibraryPrefetch />

    <HomeHero />
    <BranchFinder />
    <HomeSignaturePreview />
    <Standards />
  </>
);

export default function App() {
  const [services, setServices] = useState<any[]>([]);
const [membershipPlans, setMembershipPlans] = useState<any[]>([]);
  return (
    <Router>
      <ServicesPrefetch onLoaded={setServices} />
<MembershipPrefetch onLoaded={setMembershipPlans} />
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route
  path="/"
  element={<Home membershipPlans={membershipPlans} />}
/>
          <Route path="/about" element={<About />} />
          <Route
  path="/services"
  element={
    <Services
      services={services}
      membershipPlans={membershipPlans}
    />
  }
/>
          <Route path="/vlogs" element={<Vlogs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
