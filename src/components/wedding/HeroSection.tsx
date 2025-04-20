import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountdownTimer from "./elements/CountdownTimer";
import GiftModal from "./elements/GiftModal";
import ActionButton from "./elements/ActionButton";

interface HeroSectionProps {
  coupleNames?: string;
  weddingDate?: Date;
  backgroundImage?: string;
}

const HeroSection = ({
  // coupleNames = " Tùng 💍 Thảo ",
  weddingDate = new Date("2025-05-04"),
  backgroundImage = "/images/gallery/photo9.jpg",
}: HeroSectionProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showGiftModal, setShowGiftModal] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +weddingDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  // Function to scroll to the RSVP section
  const handleScrollToRSVP = () => {
    const rsvpSection = document.getElementById("rsvp");
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to scroll to the Venue section
  const handleScrollToVenue = () => {
    const venueSection = document.getElementById("venue");
    if (venueSection) {
      venueSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenGiftModal = () => setShowGiftModal(true);
  const handleCloseGiftModal = () => setShowGiftModal(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-filter backdrop-blur-[2px]"></div>
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 text-center w-full max-w-4xl px-4 sm:px-6 mx-auto"
      >
        <HeaderDivider />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1.2 }}
          className="text-md md:text-xl mb-2 uppercase tracking-[0.2em] font-light text-white/80"
        >
          We're getting married
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 1.5, type: "spring" }}
          className="text-5xl md:text-7xl font-['Great_Vibes',cursive] mb-8 text-white drop-shadow-sm"
        >
          <span>Vương</span>
          <span className="inline-flex items-center mx-1 md:mx-2 text-rose-500 animate-pulse">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 md:w-8 md:h-8 fill-current"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </span>
          <span>Huệ</span>
        </motion.h1>

        {/* Save the Date Component */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 1.2 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          className="inline-block bg-rose-500/90 text-white rounded-lg px-6 py-3 mb-8 shadow-sm relative overflow-hidden group cursor-pointer"
        >
          <motion.span
            className="absolute inset-0 bg-rose-400/30"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 1.2 }}
          />
          <span className="block text-sm font-semibold tracking-wide mb-1 relative">
            SAVE THE DATE
          </span>
          <span className="block text-xl md:text-2xl font-medium relative">
            04-05-2025
          </span>
        </motion.h2>

        {/* Countdown Timer */}
        <CountdownTimer timeLeft={timeLeft} />

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.0, duration: 1.2 }}
          className="flex flex-col items-center sm:flex-row gap-4 justify-center mt-6 mb-6 w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto"
        >
          <ActionButton
            variant="outline"
            onClick={handleScrollToRSVP}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            }
            label="Gửi lời chúc"
          />
          <ActionButton
            variant="primary"
            onClick={handleOpenGiftModal}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            }
            label="Mừng cưới"
          />{" "}
          <ActionButton
            variant="outline"
            onClick={handleScrollToVenue}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
            label="Tiệc cưới"
          />
        </motion.div>
      </motion.div>

      {/* Gift Modal */}
      <GiftModal isOpen={showGiftModal} onClose={handleCloseGiftModal} />
    </section>
  );
};

// Header Divider Component
const HeaderDivider = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5, duration: 1.2 }}
    className="mb-6 flex justify-center items-center"
  >
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 64 }}
      transition={{ delay: 1.0, duration: 1.5 }}
      className="h-[1px] bg-white/60"
    ></motion.div>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, duration: 1.0, type: "spring" }}
      className="mx-3 text-white/80 text-lg"
    >
      ♥
    </motion.div>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 64 }}
      transition={{ delay: 1.0, duration: 1.5 }}
      className="h-[1px] bg-white/60"
    ></motion.div>
  </motion.div>
);

export default HeroSection;
