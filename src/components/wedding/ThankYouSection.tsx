import React from "react";

interface ThankYouSectionProps {
  title?: string;
  names?: string;
  backgroundImage?: string;
}

const ThankYouSection = ({
  title = "Thank You!",
  names = "Vương & Huệ",
  backgroundImage = "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=1920&q=80",
}: ThankYouSectionProps) => {
  return (
    <section
      id="thank-you"
      className="relative py-16 w-full min-h-[25vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",

        height: "31.5vh",
      }}
    >
      {/* <div className="absolute inset-0 bg-black/20"></div> */}

      <div className="relative z-10 text-center">
        <div className="relative inline-block">
          {/* Heart background with animation */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
            <div
              className="absolute inset-0 bg-rose-500/70"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            ></div>

            {/* Small dots around the heart */}
            <div className="absolute inset-0 w-full h-full">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 rounded-full bg-red-300"
                  style={{
                    left: `${Math.random() * 140 - 20}%`,
                    top: `${Math.random() * 140 - 20}%`,
                    opacity: Math.random() * 0.8 + 0.2,
                    animation: `float ${
                      Math.random() * 3 + 2
                    }s infinite ease-in-out`,
                  }}
                ></div>
              ))}
            </div>

            {/* Thank you text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 font-['Pacifico',_cursive]">
                {title}
              </h2>
              <div className="w-8 h-0.5 bg-white/70 mb-1"></div>
              <p className="text-xs sm:text-sm text-white font-serif italic">
                {names}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouSection;
