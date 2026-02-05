import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Star,
  Wind,
  Map,
  ShieldCheck,
  Users,
  Mountain as MountainIcon,
  Anchor,
  Snowflake,
  MapPin,
  Car,
  Plane,
  ChevronDown,
  Quote,
  Fish,
  Navigation,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
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

// --- Carousel Data ---
const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: "The Collection",
    desc: "Discover our hand-picked portfolio of luxury cabins, each offering unique architecture and premium amenities.",
    link: "/cabins",
    img: "Cabin/Aspire/1.avif",
    icon: Star,
  },
  {
    id: 2,
    title: "Comfort & Ease",
    desc: "From chef's kitchens to high-speed wifi, we've curated every detail to make your stay effortless.",
    link: "/comfort",
    img: "Cabin/Bayview/2.avif",
    icon: Wind,
  },
  {
    id: 3,
    title: "Gather Together",
    desc: "Spaces designed for connection. Large dining tables, fire pits, and game rooms for making memories.",
    link: "/gather",
    img: "/Home/Comfort.avif",
    icon: Users,
  },
  {
    id: 4,
    title: "Explore Nature",
    desc: "Hiking trails, alpine lakes, and hidden waterfalls await just minutes from your doorstep.",
    link: "/beyond",
    img: "/Home/Nature.avif",
    icon: MountainIcon,
  },
];

const Home: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Initialize scroll position to the middle set on load
  useEffect(() => {
    if (sliderRef.current) {
      const scrollContainer = sliderRef.current;
      if (scrollContainer.scrollLeft === 0 && scrollContainer.scrollWidth > 0) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
      }
    }
  }, []);

  // Auto-scroll & Infinite Loop Logic
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!sliderRef.current) return;
      const scrollContainer = sliderRef.current;

      const oneSetWidth = scrollContainer.scrollWidth / 3;

      if (!isHovered) {
        scrollContainer.scrollLeft += 1;
      }

      if (scrollContainer.scrollLeft >= oneSetWidth * 2) {
        scrollContainer.scrollLeft -= oneSetWidth;
      } else if (scrollContainer.scrollLeft <= 5) {
        scrollContainer.scrollLeft += oneSetWidth;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollContainer = sliderRef.current;

    const oneSetWidth = scrollContainer.scrollWidth / 3;
    const scrollAmount =
      scrollContainer.clientWidth < 768
        ? window.innerWidth * 0.85
        : window.innerWidth * 0.3;

    if (direction === "left") {
      if (scrollContainer.scrollLeft < oneSetWidth) {
        scrollContainer.scrollLeft += oneSetWidth;
      }
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      if (scrollContainer.scrollLeft >= oneSetWidth * 2) {
        scrollContainer.scrollLeft -= oneSetWidth;
      }
      scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "East Pointe",
    description:
      "Lake cabin experience and community nestled in nature near Kansas City.",
    image: "https://www.eastpointekc.com/logo.avif",
    url: "https://www.eastpointekc.com",
    telephone: "+18005550123",
    email: "nick@eastpointekc.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lake Lafayette",
      addressLocality: "Odessa",
      addressRegion: "MO",
      postalCode: "64076",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.9458417,
      longitude: -93.9713331,
    },
    priceRange: "$$$",
  };

  return (
    <div className="bg-white">
      <SEO
        title="Lake Cabin Experience near Kansas City"
        description="Experience the perfect balance of rugged nature and refined comfort at East Pointe. Luxury lake cabin rentals in Odessa, MO, just minutes from Kansas City."
        image="/Home/LandingImage.avif"
        schema={schema}
      />

      {/* --- HERO SECTION --- */}
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src="/Home/LandingImage.avif"
          alt="East Pointe Luxury Cabins"
          className="absolute inset-0 w-full h-full object-cover animate-scale-in"
        />

        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 tracking-tight drop-shadow-lg">
            East Pointe
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-widest text-stone-100 drop-shadow-md max-w-2xl mx-auto uppercase">
            Lake Cabin Experience
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="text-white/80 w-10 h-10" strokeWidth={1} />
        </div>
      </div>

      {/* --- INTRO / PHILOSOPHY --- */}
      <section className="py-24 md:py-32 container mx-auto px-6 text-center">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <span className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-6 block">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-6xl font-serif text-primary mb-10 leading-tight">
              Discover the{" "}
              <span className="italic text-secondary">perfect lake escape</span>
            </h2>
            <div className="w-24 h-[1px] bg-secondary mx-auto mb-10"></div>
            <p className="text-stone-500 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
              East Pointe isn't just a destination; it's a feeling. We provide
              the perfect balance of rugged nature and refined comfort, ensuring
              that your escape into the woods doesn't mean leaving civilization
              behind.
            </p>
            <Link
              to="/cabins"
              className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:text-secondary transition-colors border-b border-primary hover:border-secondary pb-1"
            >
              Explore Our Philosophy
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* --- FEATURED CARDS CAROUSEL (ARROWS) --- */}
      <section className="bg-stone-50 py-24 overflow-hidden relative group">
        <FadeIn>
          {/* Wrapper controls hover state for both buttons and slider */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Navigation Arrows (Visible on Hover) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollCarousel("left");
              }}
              className="absolute left-4 md:left-10 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 text-primary p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollCarousel("right");
              }}
              className="absolute right-4 md:right-10 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 text-primary p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white"
              aria-label="Scroll Right"
            >
              <ChevronRight size={28} />
            </button>

            <div
              ref={sliderRef}
              className="flex overflow-x-hidden scrollbar-hide"
            >
              {/* Render items 3 times for robust infinite scroll (Start, Middle, End sets) */}
              {[...Array(3)].map((_, groupIndex) => (
                <div key={groupIndex} className="flex shrink-0 items-stretch">
                  {CAROUSEL_ITEMS.map((item, index) => (
                    <div
                      key={`${groupIndex}-${index}`}
                      className="w-[85vw] md:w-[30vw] flex-shrink-0 px-4"
                    >
                      <Link
                        to={item.link}
                        className="group/card block h-full bg-white shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 rounded-sm overflow-hidden"
                        draggable="false"
                      >
                        <div className="h-80 overflow-hidden relative">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                            draggable="false"
                          />
                          <div className="absolute inset-0 bg-primary/10 group-hover/card:bg-transparent transition-colors"></div>
                        </div>
                        <div className="p-10 relative">
                          <div className="absolute -top-8 right-8 bg-white border border-stone-200 text-primary p-4 rounded-full shadow-lg group-hover/card:bg-primary group-hover/card:text-white group-hover/card:border-primary transition-colors duration-300">
                            <item.icon size={24} />
                          </div>
                          <h3 className="text-2xl font-serif text-primary mb-4">
                            {item.title}
                          </h3>
                          <p className="text-stone-500 mb-8 leading-relaxed line-clamp-3">
                            {item.desc}
                          </p>
                          <span className="text-secondary text-xs font-bold uppercase tracking-widest group-hover/card:underline">
                            Explore
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* --- IMMERSIVE SECTION (Visual Break) --- */}
      <section className="py-0">
        <div className="flex flex-col md:flex-row w-full">
          {/* Image Side (Left) - Height Driven by Image */}
          <div className="md:w-1/2">
            <img
              src="/Map.avif"
              alt="Property Map"
              className="w-full h-auto block"
            />
          </div>

          {/* Text Side (Right) */}
          <div className="md:w-1/2 bg-primary text-cream flex items-center justify-center p-12 md:p-24 relative overflow-hidden">
            <MountainIcon className="absolute -bottom-20 -right-20 text-white/5 w-96 h-96" />

            <FadeIn className="relative z-10 max-w-lg">
              <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4 block">
                The Surroundings
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Beyond the Cabin
              </h2>
              <p className="text-stone-300 text-lg mb-10 leading-relaxed font-light">
                Step outside and immerse yourself in the breathtaking landscapes
                that surround our properties. Hiking trails, alpine lakes, and
                hidden waterfalls await just minutes from your doorstep.
              </p>
              <Link
                to="/beyond"
                className="px-10 py-4 border border-cream/30 text-cream hover:bg-cream hover:text-primary transition-all duration-300 font-bold uppercase text-xs tracking-[0.2em]"
              >
                Discover the Area
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- THINGS TO DO SECTION --- */}
      <section className="py-24 container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">
              Curated Experiences
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg font-light">
              Whether you seek adrenaline-pumping adventure or serene nature
              walks, our location offers endless opportunities to explore.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn delay={0}>
            <div className="relative group overflow-hidden h-[500px] cursor-pointer">
              <img
                src="/Home/Hiking.avif"
                alt="Anglers Haven"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 text-secondary mb-3">
                    <Fish size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Adventure
                    </span>
                  </div>
                  <h3 className="text-3xl font-serif text-white mb-2">
                    Anglers Haven
                  </h3>
                  <p className="text-stone-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    A quiet cove just a short walk from the house.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="relative group overflow-hidden h-[500px] cursor-pointer">
              <img
                src="/Membership/MembershipHero.avif"
                alt="Lake"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 text-secondary mb-3">
                    <Anchor size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Relaxation
                    </span>
                  </div>
                  <h3 className="text-3xl font-serif text-white mb-2">
                    Lake Activities
                  </h3>
                  <p className="text-stone-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Swimming, kayaking, or simply enjoying family fun by the
                    water.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="relative group overflow-hidden h-[500px] cursor-pointer">
              <img
                src="/Home/Relax.avif"
                alt="Fishing"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 text-secondary mb-3">
                    <Fish size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Tranquility
                    </span>
                  </div>
                  <h3 className="text-3xl font-serif text-white mb-2">
                    Rest & Relaxation
                  </h3>
                  <p className="text-stone-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Peaceful moments fishing by the lake or reading on the dock.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="text-center mt-16">
          <Link
            to="/beyond"
            className="px-8 py-3 bg-white border border-primary text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            View All Activities
          </Link>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="bg-stone-100 py-24 relative overflow-hidden">
        {/* Decorative Quote Icon */}
        <Quote className="absolute top-10 left-10 text-stone-200 w-64 h-64 opacity-50 transform -rotate-12 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <FadeIn>
            <h2 className="text-center text-3xl md:text-4xl font-serif text-primary mb-16">
              Guest Stories
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FadeIn delay={0}>
              <div className="bg-white p-10 shadow-sm rounded-sm h-full flex flex-col">
                <div className="flex text-secondary mb-6">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-stone-600 italic mb-8 flex-grow leading-relaxed">
                  "The most restorative weekend of my life. The cabin was
                  impeccable, and the silence of the forest was exactly what we
                  needed."
                </p>
                <div>
                  <h5 className="font-bold text-primary">Sarah Jenkins</h5>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">
                    Atlanta, GA
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="bg-white p-10 shadow-sm rounded-sm h-full flex flex-col transform md:-translate-y-4">
                <div className="flex text-secondary mb-6">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-stone-600 italic mb-8 flex-grow leading-relaxed">
                  "East Pointe thought of everything. From the pre-stocked
                  firewood to the locally sourced coffee awaiting our arrival.
                  Pure magic."
                </p>
                <div>
                  <h5 className="font-bold text-primary">Michael & David</h5>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">
                    Charlotte, NC
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="bg-white p-10 shadow-sm rounded-sm h-full flex flex-col">
                <div className="flex text-secondary mb-6">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-stone-600 italic mb-8 flex-grow leading-relaxed">
                  "We hosted our family reunion here. The communal spaces were
                  perfect for gathering, yet everyone had their own private
                  retreat."
                </p>
                <div>
                  <h5 className="font-bold text-primary">
                    The Thompson Family
                  </h5>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">
                    Nashville, TN
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- LOCATION SECTION --- */}
      <section className="bg-stone-900 text-white py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <FadeIn>
                <div className="flex items-center gap-2 text-accent mb-6">
                  <MapPin size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    The Location
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-serif mb-8 leading-tight">
                  Nestled in Nature
                </h2>
                <div className="mb-10 p-6 bg-white/5 border border-white/10 rounded-sm">
                  <p className="text-xl font-serif text-white tracking-wide">
                    Lake Lafayette
                  </p>
                  <p className="text-lg text-accent mb-4">
                    Odessa, Missouri 64076
                  </p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=38.9458417,-93.9713331"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-accent transition-colors"
                  >
                    <Navigation size={16} /> Get Directions
                  </a>
                </div>
                <p className="text-stone-400 text-lg leading-relaxed mb-10 font-light">
                  East Pointe is strategically located in the heart of
                  Missouri's beautiful countryside. A perfect escape that feels
                  worlds away, yet conveniently close to major hubs.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                      <Car size={26} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-white mb-1">
                        35 Mins from Kansas City
                      </h4>
                      <p className="text-stone-500 text-sm">
                        A quick scenic drive east on I-70
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                      <Car size={26} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-white mb-1">
                        2.5 Hours from St. Louis
                      </h4>
                      <p className="text-stone-500 text-sm">
                        Easy access across the state
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                      <Plane size={26} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-white mb-1">
                        45 Mins from MCI Airport
                      </h4>
                      <p className="text-stone-500 text-sm">
                        Kansas City International Airport
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:w-1/2 w-full h-[600px] rounded-sm overflow-hidden shadow-2xl relative border border-white/10 group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12435.5!2d-93.9713331!3d38.9458417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c169965ad4a83d%3A0x1b1bb606912fe188!2sLake%20Lafayette!5e0!3m2!1sen!2sus!4v1709900000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(100%) contrast(1.1) brightness(0.8)",
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="East Pointe Location"
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-700"
              ></iframe>

              {/* Custom Map Overlay Marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-accent opacity-20"></span>
                  <div className="relative bg-primary border border-accent text-white px-6 py-3 shadow-2xl">
                    <span className="font-serif font-bold text-sm tracking-[0.2em] whitespace-nowrap">
                      EAST POINTE
                    </span>
                  </div>
                  <div className="absolute -bottom-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- AMENITIES PREVIEW --- */}
      <section className="py-24 container mx-auto px-6 border-b border-stone-100">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-primary mb-4">
              The East Pointe Standard
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <FadeIn delay={0}>
            <div className="flex flex-col items-center text-center group">
              <div className="p-5 bg-stone-50 rounded-full mb-6 text-stone-400 group-hover:bg-primary group-hover:text-accent transition-all duration-300">
                <Star size={28} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-primary mb-2 text-lg">
                5-Star Service
              </h4>
              <p className="text-sm text-stone-500">24/7 Concierge & Support</p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="flex flex-col items-center text-center group">
              <div className="p-5 bg-stone-50 rounded-full mb-6 text-stone-400 group-hover:bg-primary group-hover:text-accent transition-all duration-300">
                <Wind size={28} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-primary mb-2 text-lg">Fresh Air</h4>
              <p className="text-sm text-stone-500">
                Secluded Private Locations
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex flex-col items-center text-center group">
              <div className="p-5 bg-stone-50 rounded-full mb-6 text-stone-400 group-hover:bg-primary group-hover:text-accent transition-all duration-300">
                <ShieldCheck size={28} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-primary mb-2 text-lg">
                Secure & Safe
              </h4>
              <p className="text-sm text-stone-500">Smart Locks & Security</p>
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col items-center text-center group">
              <div className="p-5 bg-stone-50 rounded-full mb-6 text-stone-400 group-hover:bg-primary group-hover:text-accent transition-all duration-300">
                <Users size={28} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-primary mb-2 text-lg">
                Family Ready
              </h4>
              <p className="text-sm text-stone-500">Games, Cribs & More</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section
        className="relative py-40 bg-fixed bg-cover bg-center group"
        style={{
          backgroundImage: 'url("/Home/HomeCTA.avif")',
        }}
      >
        {/* Subtle hover effect: Starts at 50% opacity, fades to 25% opacity on hover */}
        <div className="absolute inset-0 bg-black/50 transition-colors duration-700 ease-in-out group-hover:bg-black/25"></div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-7xl font-serif text-white mb-8 drop-shadow-lg">
              Ready to Escape?
            </h2>
            <p className="text-xl md:text-2xl text-stone-100 mb-12 max-w-2xl mx-auto font-light drop-shadow-md">
              Join our family of travelers and experience the difference of a
              true luxury retreat.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link
                to="/cabins"
                className="px-12 py-5 bg-accent text-primary font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Book Your Stay
              </Link>
              <Link
                to="/family"
                className="px-12 py-5 border border-white/50 backdrop-blur-sm text-white font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all duration-300 hover:-translate-y-1"
              >
                Become a Member
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Home;
