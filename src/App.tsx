import { Suspense, useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./components/home";
import LoadingPage from "./components/LoadingPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [readyToHide, setReadyToHide] = useState(false);

  useEffect(() => {
    // Directly set the body's overflow property based on isLoading
    document.body.style.overflow = isLoading ? "hidden" : "auto";

    // Set a class on the body for better control
    if (isLoading) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
  }, [isLoading]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Preload critical images
    const preloadImages = () => {
      const criticalImages = [
        "/images/gallery/photo1.jpg",
        "/images/gallery/photo9.jpg", // Hero background
      ];

      criticalImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadImages();

    const startTime = Date.now();
    const minLoadingTime = 3000; // 2 seconds minimum loading time

    // Listen for when the page is fully loaded
    const handleLoad = () => {
      const currentLoadTime = Date.now() - startTime;

      if (currentLoadTime < minLoadingTime) {
        // If loaded in less than minimum time, show loading for at least the minimum time
        const remainingTime = minLoadingTime - currentLoadTime;
        setTimeout(() => setReadyToHide(true), remainingTime);
      } else {
        // If loading took longer than minimum time, hide loading immediately
        setReadyToHide(true);
      }
    };

    // Check if already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingPage
            onProgressComplete={readyToHide ? handleLoadingComplete : undefined}
          />
        )}
      </AnimatePresence>

      <Suspense fallback={<LoadingPage />}>
        <div className={isLoading ? "invisible" : "visible"}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
}

export default App;
