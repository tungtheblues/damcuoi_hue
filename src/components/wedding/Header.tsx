import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronUp, Gift, MapPin } from "lucide-react";
import GiftModal from "./elements/GiftModal";
import { motion, AnimatePresence } from "framer-motion";

// Bank details (moved outside component for memoization)
const bankDetails = {
  bride: {
    name: "Emma Johnson",
    bankName: "Chase Bank",
    accountNumber: "1234-5678-9012",
    qrImage:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&q=80",
  },
  groom: {
    name: "James Smith",
    bankName: "Bank of America",
    accountNumber: "9876-5432-1098",
    qrImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80",
  },
};

// CSS for animations
const buzzAnimationStyles = `
  @keyframes ping-slow {
    0% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
  
  @keyframes glow-pulse {
    0% {
      box-shadow: 0 0 5px 2px rgba(244, 63, 94, 0.4), 0 0 0px rgba(244, 63, 94, 0.1);
    }
    50% {
      box-shadow: 0 0 15px 5px rgba(244, 63, 94, 0.5), 0 0 20px 10px rgba(244, 63, 94, 0.3);
    }
    100% {
      box-shadow: 0 0 5px 2px rgba(244, 63, 94, 0.4), 0 0 0px rgba(244, 63, 94, 0.1);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .animate-ping-slow {
    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  
  .animate-glow {
    animation: glow-pulse 2s ease-in-out infinite;
  }
  
  .shimmer-effect {
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0.8) 50%, 
      rgba(255, 255, 255, 0) 100%);
    background-size: 200% 100%;
    animation: shimmer 2.5s infinite;
  }
`;

interface HeaderProps {
  links?: Array<{ label: string; href: string }>;
}

const Header = ({
  links = [
    { label: "Couples", href: "#schedule" },
    { label: "Tiệc cưới", href: "#venue" },
    { label: "Thư viện ảnh", href: "#gallery" },
    { label: "Gửi lời chúc", href: "#rsvp" },
    { label: "Lời ngỏ", href: "#our-story" },
  ],
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setShowScrollTop(scrollPosition > 300);

      // Close mobile menu on scroll
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Add animation styles on component mount
  useEffect(() => {
    // Add style element to head
    const styleEl = document.createElement("style");
    styleEl.innerHTML = buzzAnimationStyles;
    document.head.appendChild(styleEl);

    // Clean up on unmount
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // Use a specific click handler for outside clicks
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // If menu is open and the click is outside menu and toggle button
      if (
        mobileMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToVenue = () => {
    document.querySelector("#venue")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleOpenGiftModal = () => {
    setShowGiftModal(true);
  };

  const handleCloseGiftModal = () => {
    setShowGiftModal(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 
        ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-md py-2"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo/Monogram */}
          <div className="relative">
            <a
              href="#"
              className={`font-serif text-2xl md:text-3xl transition-colors flex items-center
              ${isScrolled ? "text-rose-600" : "text-white"}`}
            >
              <span className="relative z-10">T💖T</span>
              <span
                className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-current transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100 
                ${isScrolled ? "bg-rose-300" : "bg-white/60"}`}
              ></span>
            </a>
            <div
              className={`absolute -top-2 -left-2 -right-2 -bottom-2 rounded-full bg-rose-100/80 backdrop-blur-sm scale-0 transition-transform duration-300 hover:scale-100 
              ${isScrolled ? "opacity-100" : "opacity-0"}`}
            ></div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`relative group overflow-hidden font-medium transition-colors
                  ${
                    isScrolled
                      ? "text-gray-700 hover:text-rose-600"
                      : "text-white hover:text-rose-200"
                  }`}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100
                  ${isScrolled ? "bg-rose-400" : "bg-white"}`}
                ></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            className={`md:hidden transition-colors p-2 rounded-full
              ${
                isScrolled
                  ? "text-gray-700 hover:text-rose-500 hover:bg-rose-50"
                  : "text-white hover:text-rose-200 hover:bg-white/10"
              }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg transition-all transform origin-top opacity-100"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-5">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-700 hover:text-rose-500 transition-colors font-medium py-2 border-b border-rose-100 flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-2 text-rose-300 opacity-70">♥</span>
                  {link.label}
                </a>
              ))}
              <div className="pt-4 text-center">
                <p className="text-rose-600 font-serif text-lg">Tùng & Thảo</p>
                <p className="text-gray-500 text-sm italic mt-1">
                  Forever and Always
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Attention-Grabbing Gift Button */}
      <motion.div
        className={`fixed bottom-36 right-6 z-40 transition-all duration-300 transform ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Label that appears on hover */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: -5 }}
          className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white/90 text-rose-600 rounded-lg px-3 py-1 font-medium text-sm whitespace-nowrap shadow-md"
        >
          Mừng cưới 🎁
        </motion.div>

        {/* Outer glow effect */}
        <div className="absolute inset-0 rounded-full animate-glow"></div>

        <motion.button
          onClick={handleOpenGiftModal}
          aria-label="Mừng cưới"
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.2, 1, 1.15, 1],
            rotate: [0, 3, -3, 3, 0],
            y: [0, -4, 0, -3, 0],
            backgroundColor: [
              "#f43f5e", // rose-500
              "#e11d48", // rose-600
              "#f43f5e",
              "#e11d48",
              "#f43f5e",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          whileHover={{
            scale: 1.25,
            backgroundColor: "#be123c", // rose-700
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-rose-500 text-white rounded-full shadow-lg relative overflow-hidden"
        >
          {/* Shimmer overlay effect */}
          <div className="absolute inset-0 shimmer-effect pointer-events-none"></div>

          <div className="relative">
            <Gift size={24} />
            <div className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping-slow"></div>
          </div>
        </motion.button>
      </motion.div>

      {/* Location Button */}
      <motion.div
        className={`fixed bottom-20 right-6 z-40 transition-all duration-300 transform ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Label that appears on hover */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: -5 }}
          className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white/90 text-blue-600 rounded-lg px-3 py-1 font-medium text-sm whitespace-nowrap shadow-md"
        >
          Địa điểm 📍
        </motion.div>

        <motion.button
          onClick={scrollToVenue}
          aria-label="Địa điểm"
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.1, 1],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          whileHover={{
            scale: 1.25,
            backgroundColor: "#1e40af", // blue-700
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg relative"
        >
          <MapPin size={24} />
        </motion.button>
      </motion.div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-40 bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ChevronUp size={24} />
      </button>

      {/* Gift Modal */}
      <GiftModal isOpen={showGiftModal} onClose={handleCloseGiftModal} />
    </>
  );
};

export default Header;
