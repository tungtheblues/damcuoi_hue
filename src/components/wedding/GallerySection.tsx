import React, { useState } from "react";
import { motion } from "framer-motion";
import PhotoLightbox from "./PhotoLightbox";

// Gallery Image Component with Lazy Loading
const GalleryImage = ({
  src,
  alt,
  onClick,
  delay = 0,
}: {
  src: string;
  alt: string;
  onClick: () => void;
  delay?: number;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className="relative overflow-hidden rounded-lg shadow-md aspect-[3/4] cursor-pointer group"
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 bg-gray-200 ${
          isLoaded ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      ></div>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white text-lg">View</span>
      </div>
    </motion.div>
  );
};

// Gallery Section Component
const GallerySection = ({ id = "gallery" }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    "/images/gallery/photo1.jpg",
    "/images/gallery/photo2.jpg",
    "/images/gallery/photo3.jpg",
    "/images/gallery/photo4.jpg",
    "/images/gallery/photo5.jpg",
    "/images/gallery/photo6.jpg",
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  return (
    <section id={id} className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif text-rose-800 mb-4">
            Thư viện ảnh
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
          Wedding photos is updating...
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <GalleryImage
              key={index}
              src={image}
              alt={`Wedding gallery image ${index + 1}`}
              onClick={() => openLightbox(index)}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="#rsvp"
            className="inline-block px-6 py-3 border-2 border-rose-400 text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
          >
            Gửi lời chúc
          </a>
        </motion.div>
      </div>

      {/* Lightbox Component */}
      {lightboxOpen && (
        <PhotoLightbox
          images={galleryImages}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={() =>
            setCurrentImageIndex((currentImageIndex + 1) % galleryImages.length)
          }
          onPrev={() =>
            setCurrentImageIndex(
              (currentImageIndex - 1 + galleryImages.length) %
                galleryImages.length
            )
          }
        />
      )}
    </section>
  );
};

export default GallerySection;
