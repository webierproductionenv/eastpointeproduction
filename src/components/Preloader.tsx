import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onFinish: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Lock body scroll during loading
    document.body.style.overflow = "hidden";

    // Trigger content fade-in
    const fadeTimer = setTimeout(() => setShowContent(true), 100);

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 8; // Smooth increment
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 40);

    // Ensure completion
    const timeout = setTimeout(() => {
      setProgress(100);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      clearTimeout(fadeTimer);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        setExit(true); // Start slide-up animation

        const finishTimer = setTimeout(() => {
          document.body.style.overflow = "unset";
          onFinish();
        }, 1200); // Matches transition duration

        return () => clearTimeout(finishTimer);
      }, 600); // Slight pause at 100% to let the user see it completed

      return () => clearTimeout(exitTimer);
    }
  }, [progress, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#1c1311] transition-transform duration-[1200ms] cubic-bezier(0.87, 0, 0.13, 1) ${
        exit ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`relative flex flex-col items-center justify-center w-full max-w-lg px-6 transition-all duration-700 transform ${
          showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } ${exit ? "opacity-0 translate-y-[-50px] duration-500" : ""}`}
      >
        {/* Background Monogram (Subtle Depth) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <img
            src="/logo.avif"
            alt="East Pointe Monogram"
            className="w-48 h-48 opacity-5"
          />
        </div>

        {/* Main Logo Text */}
        <div className="relative z-10 text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-cream tracking-[0.15em] mb-2 drop-shadow-sm">
            EAST POINTE
          </h1>
          <p className="text-accent/60 text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium">
            Lake Cabin Experience
          </p>
        </div>

        {/* Premium Loading Line */}
        <div className="relative z-10 w-full max-w-[240px] flex flex-col items-center">
          <div className="w-full h-[1px] bg-white/10 mb-4 overflow-hidden relative">
            <div
              className="absolute top-0 left-0 h-full bg-accent transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between w-full text-[10px] font-mono text-accent/50 uppercase tracking-widest">
            <span>Loading</span>
            <span>{Math.floor(progress).toString().padStart(3, "0")}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
