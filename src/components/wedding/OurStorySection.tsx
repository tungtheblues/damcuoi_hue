import React from "react";

interface OurStorySectionProps {
  title?: string;
  introduction?: string;
  date?: string;
  titles?: string;
  description?: string;
  image?: string;
}

const OurStorySection = ({
  title = "Quote",
  introduction = "We've shared so many beautiful moments together. Here's a glimpse into our journey of love and friendship that led us to this special day.",
  date = "June 2018",
  titles = "From a couple",
  description = "In you, I've found the love of my life and my closest, truest friend. Together, we've built something beautiful—moment by moment, heart to heart.",
  image = "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
}: OurStorySectionProps) => {
  return (
    <section id="our-story" className="py-20 bg-rose-50 w-full">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl font-serif text-center font-bold text-rose-800 mb-8">
          {title}
        </h2>

        <div className="space-y-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div
              className={`w-full md:w-1/2 ${1 % 2 === 1 ? "md:order-2" : ""}`}
            >
              {image && (
                <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={image}
                    alt={titles}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-rose-200 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-20 h-20 text-rose-100 opacity-30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 text-rose-100 opacity-30 transform rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>

                {/* Content with romantic styling */}
                <div className="inline-flex items-center px-4 py-1 rounded-full bg-gradient-to-r from-rose-200 to-rose-100 text-rose-800 text-sm font-medium mb-4 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 mr-1.5 text-rose-600"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-3 relative">
                  {titles}
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
                </h3>
                <p className="text-gray-600 mt-5 italic first-letter:text-3xl first-letter:font-serif first-letter:text-rose-700 first-letter:mr-1 first-letter:float-left">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
