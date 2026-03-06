import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Users,
  Bed,
  Bath,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Ruler,
} from "lucide-react";
import ImageViewer from "./ImageViewer";

export interface CabinData {
  id: number;
  name: string;
  sleeps: string;
  bedrooms: string;
  baths: number;
  desc: string;
  status: string;
  images: string[];
  location?: string;
  sqFt?: string;
  features?: string[];
  sleepingArrangements?: { room: string; bed: string }[];
  amenities?: string[];
  bookingLink?: string;
}

interface CabinModalProps {
  cabin: CabinData | null;
  isOpen: boolean;
  onClose: () => void;
}

const CabinModal: React.FC<CabinModalProps> = ({ cabin, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const thumbnailsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Scroll active thumbnail into view when index changes
  useEffect(() => {
    if (isOpen && cabin) {
      const activeThumb = thumbnailsRef.current[currentImageIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentImageIndex, isOpen, cabin]);

  if (!isOpen || !cabin) return null;

  const nextImage = () => {
    if (cabin.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % cabin.images.length);
    }
  };

  const prevImage = () => {
    if (cabin.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + cabin.images.length) % cabin.images.length,
      );
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-primary/80 backdrop-blur-sm animate-fade-in-fast touch-none"
          onClick={onClose}
        ></div>

        {/* Modal Container */}
        <div className="relative bg-white w-full h-[100dvh] md:h-[90vh] md:max-w-6xl md:rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-in">
          {/* Close Button (Mobile & Desktop) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/50 text-white rounded-full transition-colors md:hidden"
          >
            <X size={24} />
          </button>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-stone-100 hover:bg-stone-200 text-primary rounded-full transition-colors hidden md:block"
          >
            <X size={24} />
          </button>

          {/* Left Side: Image Gallery */}
          <div className="w-full md:w-1/2 bg-stone-100 relative flex flex-col h-[40dvh] md:h-full group">
            {cabin.images.length > 0 ? (
              <div
                className="relative flex-grow overflow-hidden cursor-zoom-in"
                onClick={() => setIsViewerOpen(true)}
              >
                <img
                  src={cabin.images[currentImageIndex]}
                  alt={cabin.name}
                  className="w-full h-full object-cover"
                />

                {/* Photo Counter Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md pointer-events-none border border-white/10 shadow-sm">
                  {currentImageIndex + 1} / {cabin.images.length}
                </div>

                {/* Fullscreen Icon Hint */}
                <div className="absolute top-4 left-4 bg-black/30 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <Maximize2 size={20} />
                </div>

                {/* Navigation Overlays */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="p-2 bg-black/30 hover:bg-black/50 text-white rounded-full pointer-events-auto transition-colors transform hover:scale-110"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="p-2 bg-black/30 hover:bg-black/50 text-white rounded-full pointer-events-auto transition-colors transform hover:scale-110"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-400">
                No images available
              </div>
            )}

            {/* Thumbnails strip */}
            {cabin.images.length > 0 && (
              <div className="h-20 bg-primary/5 flex overflow-x-auto snap-x scrollbar-hide">
                {cabin.images.map((img, idx) => (
                  <button
                    key={idx}
                    ref={(el) => {
                      thumbnailsRef.current[idx] = el;
                    }}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-24 h-full relative snap-start transition-all duration-200 ${currentImageIndex === idx ? "opacity-100 ring-2 ring-inset ring-secondary z-10" : "opacity-60 hover:opacity-100"}`}
                  >
                    <img
                      src={img}
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-1/2 bg-white flex flex-col flex-1 md:h-full overflow-hidden">
            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-8 md:p-12 space-y-8 custom-scrollbar">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 text-stone-500 text-sm mb-2">
                  <MapPin size={14} className="text-accent" />
                  <span className="uppercase tracking-widest">
                    {cabin.location || "Odessa, MO"}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
                  {cabin.name}
                </h2>

                {/* Quick Stats Grid */}
                <div className="flex flex-wrap gap-4 md:gap-8 py-6 border-y border-stone-100">
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-accent" />
                    <span className="font-bold text-stone-700">
                      {cabin.sleeps} Guests
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed size={20} className="text-accent" />
                    <span className="font-bold text-stone-700">
                      {cabin.bedrooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={20} className="text-accent" />
                    <span className="font-bold text-stone-700">
                      {cabin.baths} Baths
                    </span>
                  </div>
                  {cabin.sqFt && (
                    <div className="flex items-center gap-2">
                      <Ruler size={20} className="text-accent" />
                      <span className="font-bold text-stone-700">
                        {cabin.sqFt} Sq Ft
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold font-serif text-primary mb-3">
                  About the Space
                </h3>
                <p className="text-stone-600 leading-relaxed font-light">
                  {cabin.desc}
                </p>
              </div>

              {/* Sleeping Arrangements */}
              {cabin.sleepingArrangements && (
                <div>
                  <h3 className="text-lg font-bold font-serif text-primary mb-4">
                    Sleeping Arrangements
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cabin.sleepingArrangements.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-stone-50 p-4 rounded-sm border border-stone-100"
                      >
                        <span className="block text-xs font-bold uppercase text-stone-400 mb-1">
                          {item.room}
                        </span>
                        <span className="block font-medium text-primary">
                          {item.bed}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features/Amenities */}
              {cabin.features && (
                <div>
                  <h3 className="text-lg font-bold font-serif text-primary mb-4">
                    Property Highlights
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cabin.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-stone-600 text-sm"
                      >
                        <Check
                          size={16}
                          className="text-secondary mt-0.5 shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sticky Footer Action */}
            <div className="px-6 pt-6 pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-6 border-t border-stone-100 bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.05)] flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">
                  Status
                </p>
                <p
                  className={`font-bold ${cabin.status === "Available" ? "text-green-600" : "text-stone-400"}`}
                >
                  {cabin.status}
                </p>
              </div>

              {cabin.status === "Available" && cabin.bookingLink ? (
                <a
                  href={cabin.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300 rounded-sm bg-primary text-white hover:bg-secondary shadow-lg hover:shadow-xl inline-block text-center"
                >
                  Book Now
                </a>
              ) : (
                <button
                  className={`px-8 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300 rounded-sm ${
                    cabin.status === "Available"
                      ? "bg-primary text-white hover:bg-secondary shadow-lg hover:shadow-xl"
                      : "bg-stone-200 text-stone-400 cursor-not-allowed"
                  }`}
                  disabled={cabin.status !== "Available"}
                >
                  {cabin.status === "Available" ? "Book Now" : "Coming Soon"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ImageViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        images={cabin.images}
        initialIndex={currentImageIndex}
      />
    </>
  );
};

export default CabinModal;
