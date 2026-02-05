import React, { useState, useEffect, useRef } from "react";
import Hero from "../components/Hero";
import {
  Users,
  Bed,
  Bath,
  MapPin,
  Clock,
  Camera,
  Map as MapIcon,
  Navigation,
  PlayCircle,
  Maximize2,
} from "lucide-react";
import CabinModal, { CabinData } from "../components/CabinModal";
import ImageViewer from "../components/ImageViewer";
import SEO from "../components/SEO";

// --- Animation Hook & Component ---

const useInView = (options = { threshold: 0.1, triggerOnce: true }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold, options.triggerOnce]);

  return { ref, isInView };
};

const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "none";
}> = ({ children, delay = 0, className = "", direction = "up" }) => {
  const { ref, isInView } = useInView();

  const transformClass = direction === "up" ? "translate-y-8" : "";

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isInView ? "opacity-100 translate-y-0" : `opacity-0 ${transformClass}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Helper to generate image paths based on folder structure
const getImages = (folder: string, count: number, ext: string = "avif") =>
  Array.from({ length: count }, (_, i) => `/Cabin/${folder}/${i + 1}.${ext}`);

const cabins: CabinData[] = [
  {
    id: 1,
    name: "East Pointe Bayview",
    sleeps: "15",
    bedrooms: "5 Bedrooms + Loft",
    baths: 3,
    desc: "A spacious 3,200 sq ft lakeside sanctuary perfect for large family reunions or wedding groups. Whether you're craving some quality time with loved ones, traveling for a wedding, or looking to unwind by the water, this spacious 5-bedroom + loft, 3-bath vacation rental cabin is the perfect home base! Gather around the crackling fire pit while gazing out at the still lake.",
    status: "Available",
    sqFt: "3,200",
    location: "Odessa, MO",
    features: [
      "Deck w/ dining area",
      "Covered patio w/ lounge seating",
      "2 gas grills, charcoal grill",
      "Private fire pit",
      "Direct Lake access",
      "Bench swing",
      "4 Smart TVs, video library",
      "Workstation for remote work",
    ],
    sleepingArrangements: [
      { room: "Bedroom 1", bed: "1 Queen Bed" },
      { room: "Bedroom 2", bed: "1 Queen Bed" },
      { room: "Bedroom 3", bed: "1 Queen Bed" },
      { room: "Bedroom 4", bed: "1 Queen Bed" },
      { room: "Bedroom 5", bed: "2 Twin Beds" },
      { room: "Loft", bed: "4 Twin Beds" },
      { room: "Living Room", bed: "1 Full Sleeper Sofa" },
    ],
    images: getImages("Bayview", 35, "avif"),
    bookingLink: "https://evolve.com/vacation-rentals/us/mo/odessa/552308",
  },
  {
    id: 4,
    name: "Aston Harbor",
    sleeps: "2",
    bedrooms: "Studio",
    baths: 1,
    desc: "Pet Friendly w/ Fee | BBQ Ready | Forest Views. Seeking a peaceful lakeside getaway? Look no further than this vacation rental in Odessa! With a cozy interior, furnished deck, and beautiful wooded setting just a short walk from Lake Lafayette, this 1-bath studio cabin has everything needed for a memorable couple’s retreat or rejuvenating solo escape.",
    status: "Available",
    location: "Odessa, MO",
    features: [
      "Furnished deck w/ outdoor dining",
      "Charcoal grill",
      "Kitchenette (fridge, microwave, air fryer)",
      "Pet friendly (w/ fee)",
      "Step-free access",
      "Lake Lafayette access on-site",
      "Flat-screen TV & Board games",
      "Driveway parking (2 vehicles)",
    ],
    sleepingArrangements: [{ room: "Studio", bed: "1 Queen Bed" }],
    images: getImages("Aston Harbor", 23, "avif"),
    bookingLink: "https://evolve.com/vacation-rentals/us/mo/odessa/552306",
  },
  {
    id: 5,
    name: "Aspire",
    sleeps: "7",
    bedrooms: "3 Bedrooms",
    baths: 2,
    desc: "Built w/ Recycled Materials | Relax Fireside | Day Trip to Kansas City | Easy Access to I-70. Discover the ideal blend of comfort and convenience in Odessa! This 3-bedroom, 2-bath vacation rental cabin offers a serene setting for your group's next visit to the Kansas City area. Plus, you'll be just a skip and a jump from nearby major highways, making trips to KC for game day and family fun a breeze.",
    status: "Available",
    location: "Odessa, MO",
    features: [
      "Built w/ Recycled Materials",
      "Private deck w/ outdoor seating",
      "Private fire pit",
      "Kitchen (stove/oven, fridge, microwave)",
      "Flat-screen TV",
      "Central A/C & heating",
      "Driveway parking (3 vehicles)",
      "Easy Access to I-70",
    ],
    sleepingArrangements: [
      { room: "Bedroom 1", bed: "1 Queen Bed" },
      { room: "Bedroom 2", bed: "1 Full Bed" },
      { room: "Bedroom 3", bed: "3 Twin Beds" },
    ],
    images: getImages("Aspire", 33, "avif"),
    bookingLink: "https://evolve.com/vacation-rentals/us/mo/odessa/562679",
  },
  {
    id: 3,
    name: "Cedar Pointe",
    sleeps: "6",
    bedrooms: "2 Bedrooms",
    baths: 1.5,
    desc: "Private Fire Pit w/ Seating | BBQ Ready | Outdoor Dining w/ Lake View. Lakefront relaxation awaits at this Odessa vacation rental. Whether you’re looking to fish, explore Historic Downtown shops and restaurants, or simply enjoy the tranquil countryside setting, this 2-bedroom, 1.5-bath cabin is perfect for you and your crew. When you’re ready to venture out, be sure to visit the Powell Gardens or catch a race just up the road at I-70 Speedway.",
    status: "Available",
    location: "Odessa, MO",
    features: [
      "Furnished porch w/ outdoor dining",
      "Wood-burning fire pit",
      "Kitchenette (stovetop, fridge, microwave, air fryer)",
      "Flat-screen TV & Board games",
      "Charcoal grill",
      "Driveway parking (5 vehicles)",
      "Lake Lafayette access on-site",
      "Single-story (5 steps access)",
      "No pets allowed",
    ],
    sleepingArrangements: [
      { room: "Bedroom 1", bed: "1 Queen Bed" },
      { room: "Bedroom 2", bed: "2 Twin Beds" },
      { room: "Living Room", bed: "1 Sleeper Sofa" },
    ],
    images: getImages("Cedar Pointe", 42, "avif"),
    bookingLink: "https://evolve.com/vacation-rentals/us/mo/odessa/552307",
  },
  {
    id: 2,
    name: "Byrd's Nest",
    sleeps: "4",
    bedrooms: "2 Bedrooms",
    baths: 1,
    desc: "Pet Friendly w/ Fee | Furnished Outdoor Space | BBQ Ready | 4 Mi to Downtown. Escape the city buzz at ‘Byrd's Nest’ — a vacation rental in Odessa. In addition to its peaceful setting just steps from Lake Lafayette, this charming 2-bedroom, 1-bath cabin offers easy access to local hot spots like Historic Downtown Odessa, Powell Gardens, I-70 Speedway, and more. When you’re not out exploring, be sure to spend some time around the fire pit or head inside to enjoy a relaxing game night.",
    status: "Available",
    location: "Odessa, MO",
    features: [
      "Furnished patio w/ outdoor dining",
      "Private fire pit",
      "Kitchenette (fridge, stovetop, microwave, air fryer)",
      "Pet friendly (w/ fee)",
      "Flat-screen TV, Fireplace",
      "Lake Lafayette access on-site",
      "Driveway parking (5 vehicles)",
      "Single-story cabin (1 step access)",
    ],
    sleepingArrangements: [
      { room: "Bedroom 1", bed: "1 Queen Bed" },
      { room: "Bedroom 2", bed: "2 Twin Beds" },
    ],
    images: getImages("BYRD's Nest", 36, "avif"),
    bookingLink: "https://evolve.com/vacation-rentals/us/mo/odessa/552309",
  },
  {
    id: 6,
    name: "Harbor View",
    sleeps: "10 - 13",
    bedrooms: "4 Bedrooms + Loft (5 beds)",
    baths: 2.5,
    desc: "Expansive views with plenty of room for everyone. Coming soon to our collection, this property will redefine lakeside luxury for large groups.",
    status: "Coming Soon",
    location: "Odessa, MO",
    sqFt: "3,500",
    images: [],
  },
  {
    id: 7,
    name: "TreeHaus",
    sleeps: "TBD",
    bedrooms: "TBD",
    baths: 0,
    desc: "Elevated luxury among the canopy. Experience nature from a new perspective in our upcoming treehouse experience.",
    status: "Coming Soon",
    location: "Odessa, MO",
    images: [],
  },
  {
    id: 8,
    name: "RocHaus",
    sleeps: "TBD",
    bedrooms: "TBD",
    baths: 0,
    desc: "Modern design meets rugged landscape. A stunning addition to our collection coming next season.",
    status: "Coming Soon",
    location: "Odessa, MO",
    images: [],
  },
];

const CabinCollection: React.FC = () => {
  const [selectedCabin, setSelectedCabin] = useState<CabinData | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const openModal = (cabin: CabinData) => {
    setSelectedCabin(cabin);
  };

  const closeModal = () => {
    setSelectedCabin(null);
  };

  return (
    <div className="bg-stone-50 pb-0">
      <SEO
        title="The Cabin Collection | Lake Cabin Rentals"
        description="Explore our hand-picked portfolio of luxury cabins including Bayview, Byrd's Nest, and Aspire. Perfect for family reunions, couples, and retreats in Odessa, MO."
        url="https://www.eastpointekc.com/cabins"
      />

      <Hero
        title="Lake Cabin Collection"
        subtitle="Discover our range of cabins designed to accommodate all group sizes, whether you're planning a cozy getaway for two or a lively retreat for a large gathering."
        image="/Cabin/CabinHero.avif"
        height="large"
      />

      <CabinModal
        isOpen={!!selectedCabin}
        onClose={closeModal}
        cabin={selectedCabin}
      />

      {/* Intro Text Block */}
      <section className="bg-white pt-20 pb-12">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-primary mb-8">
            Find Your Perfect Escape
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed font-light">
            Each cabin is thoughtfully crafted to match your vacation
            intentions. Click on any cabin below to view full details, sleeping
            arrangements, and amenities.
          </p>
        </div>
      </section>

      {/* Cabins Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {cabins.map((cabin, idx) => {
            const hasImages = cabin.images.length > 0;
            return (
              <div
                key={cabin.id}
                className={`bg-white group rounded-sm shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden transform hover:-translate-y-1 ${hasImages ? "cursor-pointer" : "cursor-default"}`}
                onClick={() => hasImages && openModal(cabin)}
              >
                {/* Main Image Area */}
                <div className="relative h-80 overflow-hidden bg-stone-100">
                  {hasImages ? (
                    <img
                      src={cabin.images[0]}
                      alt={cabin.name}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${cabin.status === "Coming Soon" ? "grayscale-[30%]" : ""}`}
                    />
                  ) : (
                    <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700">
                      <img
                        src="https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?q=80&w=800"
                        alt="Coming Soon Placeholder"
                        className="w-full h-full object-cover grayscale opacity-30 blur-[1px]"
                      />
                      <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center p-6">
                        <div className="bg-white/90 px-8 py-6 shadow-xl border-t-4 border-accent">
                          <span className="block font-serif text-2xl text-primary mb-1">
                            Coming Soon
                          </span>
                          <span className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">
                            New Addition
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {hasImages && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="bg-white/90 text-primary px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                        <Camera size={16} /> View Details
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div
                    className={`absolute top-4 right-4 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-sm z-10 ${
                      cabin.status === "Available"
                        ? "bg-white text-primary"
                        : "bg-accent text-primary"
                    }`}
                  >
                    {cabin.status === "Available" ? "Available" : "Coming Soon"}
                  </div>

                  {/* Index Number */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="text-5xl font-serif text-white/90 drop-shadow-md opacity-80">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Thumbnails Strip */}
                <div className="flex bg-stone-100 h-20 border-b border-stone-200">
                  {cabin.images.slice(0, 4).map((img, i) => (
                    <div
                      key={i}
                      className="flex-1 border-r border-stone-200 last:border-0 relative overflow-hidden group/thumb"
                    >
                      <img
                        src={img}
                        alt={`${cabin.name} view ${i + 1}`}
                        className={`w-full h-full object-cover transition-all duration-300 ${i === 0 ? "opacity-50" : "opacity-70 group-hover/thumb:opacity-100"}`}
                      />
                      {i === 3 && cabin.images.length > 4 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold">
                          +{cabin.images.length - 4}
                        </div>
                      )}
                    </div>
                  ))}
                  {/* Fill empty space if fewer than 4 images */}
                  {[...Array(Math.max(0, 4 - cabin.images.length))].map(
                    (_, i) => (
                      <div
                        key={`empty-${i}`}
                        className="flex-1 bg-stone-100 border-r border-stone-200 last:border-0 flex items-center justify-center"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-200/50"></div>
                      </div>
                    ),
                  )}
                </div>

                {/* Content Area */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-2xl font-serif text-primary mb-2 group-hover:text-secondary transition-colors">
                      {cabin.name}
                    </h3>
                    <div className="h-0.5 w-12 bg-stone-200 group-hover:bg-secondary transition-all duration-500"></div>
                  </div>

                  {cabin.status === "Available" ||
                  cabin.name === "Harbor View" ? (
                    <div className="flex flex-col gap-2 mb-6 text-stone-500 text-sm">
                      <div className="flex items-center">
                        <Bed size={16} className="mr-3 text-accent" />{" "}
                        {cabin.bedrooms}
                      </div>
                      {cabin.baths > 0 && (
                        <div className="flex items-center">
                          <Bath size={16} className="mr-3 text-accent" />{" "}
                          {cabin.baths} Bathrooms
                        </div>
                      )}
                      <div className="flex items-center">
                        <Users size={16} className="mr-3 text-accent" /> Sleeps{" "}
                        {cabin.sleeps}
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6 text-stone-400 italic text-sm py-2">
                      Full details coming soon...
                    </div>
                  )}

                  <p className="text-stone-500 text-sm mb-8 flex-grow leading-relaxed border-t border-stone-100 pt-4 line-clamp-3">
                    {cabin.desc}
                  </p>

                  <div className="mt-auto">
                    {cabin.status === "Available" ? (
                      <button className="w-full py-4 bg-stone-100 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 font-bold uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-2">
                        View Details
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-4 border border-stone-200 text-stone-300 font-bold uppercase text-[11px] tracking-[0.2em] cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bento Grid: Video & Map */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portrait Video */}
          <div className="lg:col-span-1 h-[500px] lg:h-[680px] relative rounded-sm overflow-hidden shadow-xl group border-4 border-white bg-stone-900">
            <video
              className="w-full h-full object-cover"
              poster="/Cabin/EastPointeAerial_thumb.avif"
              controls
              playsInline
            >
              <source
                src="https://res.cloudinary.com/dusub2qg5/video/upload/v1769971765/EastPointeAerial_ve13um.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Overlay Badge */}
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
              <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <PlayCircle size={14} className="text-accent" /> Aerial Tour
              </span>
            </div>
          </div>

          {/* Map */}
          <div
            className="lg:col-span-2 h-[550px] lg:h-[680px] relative rounded-sm shadow-xl group border-4 border-white bg-stone-100 cursor-pointer"
            onClick={() => setIsMapOpen(true)}
          >
            <img
              src="/Map.avif"
              alt="East Pointe Property Map"
              className="w-full h-full object-cover"
            />

            {/* Gradient & Text Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 lg:opacity-60 transition-opacity duration-300 pointer-events-none"></div>

            {/* Fullscreen Hint */}
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
              <Maximize2 className="text-white" size={20} />
            </div>

            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full pointer-events-none">
              <div className="flex items-center gap-2 text-accent mb-3">
                <MapIcon size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Property Layout
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                Grounds Map
              </h3>
              <p className="text-stone-300 max-w-lg font-light leading-relaxed hidden md:block">
                Get oriented with our property layout showing cabin locations,
                lake access points, and walking trails throughout the estate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Come See Us Section */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 skew-x-12 transform translate-x-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Text */}
            <div className="lg:w-1/2">
              <div className="inline-block p-3 border border-accent rounded-full mb-6">
                <MapPin className="text-accent" size={24} />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                Come See Us
              </h2>
              <p className="text-xl text-stone-300 mb-8 font-light">
                Visit our offices to explore our stunning lakeside cabins!
              </p>
              <p className="text-stone-400 leading-relaxed mb-10 max-w-lg">
                Experience the serene surroundings firsthand and discover your
                perfect getaway. We look forward to welcoming you!
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Location</h4>
                    <p className="text-stone-400">
                      Lake Lafayette, Odessa, MO 64076
                    </p>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=38.9458417,-93.9713331"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors"
                    >
                      <Navigation size={14} /> Get Directions
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Hours</h4>
                    <p className="text-stone-400">We are open year round!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Map/Image */}
            <div className="lg:w-1/2 w-full h-[500px] bg-stone-800 rounded-lg overflow-hidden border border-white/10 shadow-2xl relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12435.5!2d-93.9713331!3d38.9458417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c169965ad4a83d%3A0x1b1bb606912fe188!2sLake%20Lafayette!5e0!3m2!1sen!2sus!4v1709900000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(100%) invert(90%) contrast(0.8)",
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
                className="opacity-50 group-hover:opacity-80 transition-opacity duration-700"
              ></iframe>

              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="bg-primary/90 text-white px-8 py-4 border border-accent shadow-xl text-center">
                  <span className="block text-accent text-xs font-bold uppercase tracking-widest mb-1">
                    East Pointe
                  </span>
                  <span className="font-serif text-xl">Offices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImageViewer
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        images={["/Map.avif"]}
      />
    </div>
  );
};

export default CabinCollection;
