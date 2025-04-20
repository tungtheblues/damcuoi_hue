import React from "react";
import Header from "./wedding/Header";
import HeroSection from "./wedding/HeroSection";
import OurStorySection from "./wedding/OurStorySection";
import VenueSection from "./wedding/VenueSection";
import Couples from "./wedding/Couples";
import GallerySection from "./wedding/GallerySection";
import RSVPSection from "./wedding/RSVPSection";
import Footer from "./wedding/Footer";
import ThankYouSection from "./wedding/ThankYouSection";

const Home = () => {
  // Wedding date - October 15, 2024
  // const weddingDate = new Date("2025-05-01");

  // Couple information
  // const coupleNames = "Tùng & Thảo";

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <Header />

      {/* Hero Section with Countdown */}
      {/* <HeroSection weddingDate={weddingDate} /> */}
      <HeroSection />
      <Couples />

      {/* Venue Information */}
      <VenueSection />

      {/* Photo Gallery */}
      <GallerySection />

      {/* RSVP Form */}
      <RSVPSection />
      {/* Our Story Section */}
      <OurStorySection />

      <ThankYouSection />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
