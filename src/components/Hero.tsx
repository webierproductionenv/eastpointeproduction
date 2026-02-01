import React, { useState, useEffect } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  overlayOpacity?: number;
  height?: "full" | "large" | "medium" | "small";
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  image,
  overlayOpacity = 0.4,
  height = "medium",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setIsLoaded(true);
  }, [image]);

  const heightClass = {
    full: "h-screen",
    large: "h-[80vh]",
    medium: "h-[60vh]",
    small: "h-[40vh]",
  }[height];

  return (
    <div
      className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden bg-primary`}
    >
      {/* Image with Fade-In */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-[2000ms] ease-in-out hover:scale-105"
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-1000"
        style={{ opacity: isLoaded ? overlayOpacity : 0 }}
      />

      {/* Content */}
      <div
        className={`relative z-10 text-center text-white px-4 max-w-4xl transition-all duration-1000 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-tight drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl font-light tracking-wide text-stone-100 drop-shadow-md max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default Hero;
