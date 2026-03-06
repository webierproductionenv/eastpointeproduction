import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../types";
import {
  Menu,
  Instagram,
  Facebook,
  X,
  Mail,
  Mountain,
  TreePine,
  ArrowRight,
  Twitter,
} from "lucide-react";

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    } else {
      const scrollY = window.scrollY;
      setIsMenuOpen(true);
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    }
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Use a slightly higher threshold for smoother feel
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMenu();
    window.scrollTo(0, 0);
  }, [location]);

  const isHome = location.pathname === "/";

  // --- Styling Logic ---

  // 1. Structure & Padding (Based purely on Scroll to avoid jumping when opening menu)
  const navPadding = isScrolled ? "py-4" : "py-6";

  // 2. Background (Visual state)
  // If menu is open, we need a solid background to cover page content.
  // If scrolled, we want the glass effect.
  // If top & home, transparent.
  let navBackground = "";

  if (isMenuOpen) {
    navBackground = "bg-primary"; // Solid dark brown when menu is open
  } else if (isScrolled) {
    navBackground = "bg-primary/90 backdrop-blur-md shadow-lg";
  } else if (isHome) {
    navBackground = "bg-transparent"; // Transparent on top of home hero
  } else {
    navBackground = "bg-primary"; // Solid on other pages at top
  }

  // 3. Text Colors
  const textColor = "text-white";
  const logoBorder =
    isScrolled || !isHome || isMenuOpen ? "border-accent" : "border-white/30";

  return (
    <div className="min-h-screen flex flex-col bg-cream text-stone-900 font-sans selection:bg-accent selection:text-primary">
      {/* --- Navigation Bar --- */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${navBackground} ${navPadding}`}
      >
        <div className="container mx-auto px-6 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo Section */}
            <NavLink
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-5 group relative z-50"
            >
              {/* Replaced Icon with Logo Image */}
              <img
                src="logo.avif"
                alt="East Pointe Logo"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span
                  className={`text-xl md:text-2xl font-serif font-bold tracking-widest leading-none ${textColor}`}
                >
                  EAST POINTE
                </span>
                <span
                  className={`text-[0.6rem] uppercase tracking-[0.3em] font-medium opacity-70 ${textColor} ml-0.5`}
                >
                  Lake Cabin Experience
                </span>
              </div>
            </NavLink>

            {/* Desktop Navigation (Visible on XL screens and up) */}
            <nav className="hidden xl:flex items-center space-x-10">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-xs font-bold uppercase tracking-[0.15em] py-2 relative group overflow-hidden transition-colors duration-300 ${
                      isActive
                        ? "text-accent"
                        : "text-white/80 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{item.label}</span>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-[1px] bg-accent transform origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-6 relative z-50">
              {/* CTA Button */}
              <NavLink
                to="/cabins"
                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 border text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isMenuOpen
                    ? "border-white/30 text-white hover:bg-white hover:text-primary"
                    : isScrolled || !isHome
                      ? "border-accent text-accent hover:bg-accent hover:text-primary"
                      : "border-white text-white hover:bg-white hover:text-primary"
                }`}
              >
                Book Now
              </NavLink>

              {/* Menu Toggle Button (Visible on Laptops/Tablets/Mobile) */}
              <button
                onClick={toggleMenu}
                className={`xl:hidden p-1 transition-colors duration-300 hover:scale-110 active:scale-95 ${
                  isMenuOpen
                    ? "text-white rotate-90"
                    : isScrolled || !isHome
                      ? "text-accent"
                      : "text-white"
                }`}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X size={32} strokeWidth={1.5} />
                ) : (
                  <Menu size={32} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Full Screen Menu Overlay --- */}
      <div
        className={`fixed inset-0 z-40 bg-primary transform transition-transform duration-500 cubic-bezier(0.65, 0, 0.35, 1) ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ paddingTop: "100px" /* Offset for navbar */ }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <Mountain className="absolute -bottom-24 -right-24 w-[600px] h-[600px] text-white" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-[150px]"></div>
        </div>

        <div className="container mx-auto px-6 h-full flex flex-col relative z-10 overflow-y-auto pb-10">
          <div className="flex-grow flex flex-col md:flex-row md:items-center justify-center gap-12 md:gap-24">
            {/* Main Navigation Links */}
            <div className="flex flex-col space-y-6 md:space-y-8 items-center md:items-start">
              <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 opacity-50 block md:hidden">
                Menu
              </span>
              {NAV_ITEMS.map((item, idx) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `text-3xl md:text-5xl font-serif text-white hover:text-accent transition-all duration-300 transform hover:translate-x-4 ${
                      isActive ? "italic text-accent" : ""
                    }`
                  }
                  style={{
                    transitionDelay: `${100 + idx * 50}ms`,
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen
                      ? "translateY(0)"
                      : "translateY(20px)",
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Secondary Info / CTA for Mobile Menu */}
            <div
              className={`flex flex-col items-center md:items-start space-y-8 pt-8 md:pt-0 md:border-l md:border-white/10 md:pl-16 transition-all duration-700 delay-300 ${
                isMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-center md:text-left">
                <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">
                  Contact Us
                </h4>
                <p className="text-stone-300 text-lg font-light">
                  +1 (816) 255-8683
                </p>
                <p className="text-stone-300 text-lg font-light">
                  nick@eastpointekc.com
                </p>
              </div>

              <div className="text-center md:text-left">
                <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">
                  Follow Us
                </h4>
                <div className="flex space-x-6 text-white">
                  <a
                    href="https://www.instagram.com/eastpointekc/"
                    className="hover:text-accent transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                  <a href="#" className="hover:text-accent transition-colors">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="hover:text-accent transition-colors">
                    <Twitter size={24} />
                  </a>
                </div>
              </div>

              <NavLink
                to="/cabins"
                onClick={closeMenu}
                className="bg-accent text-primary px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,197,176,0.3)] flex items-center gap-3"
              >
                Book Your Stay <ArrowRight size={16} />
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* --- Footer --- */}
      <footer className="bg-primary text-cream py-20 border-t border-earth relative overflow-hidden">
        <Mountain className="absolute bottom-0 right-0 text-white/5 h-[500px] w-[500px] transform translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-5 group mb-8">
                {/* Replaced Icon with Logo Image */}
                <img
                  src="/logo.avif"
                  alt="East Pointe Logo"
                  className="h-10 md:h-12 w-auto object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-serif font-bold tracking-widest leading-none text-white">
                    EAST POINTE
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-[0.3em] font-medium opacity-70 text-white ml-0.5">
                    Lake Cabin Experience
                  </span>
                </div>
              </div>
              <p className="max-w-md text-stone-300 leading-relaxed mb-8 text-lg font-light">
                Redefining the cabin experience. Where luxury meets wilderness,
                and guests become family. Experience nature without compromise.
              </p>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className="text-sm font-bold mb-8 tracking-[0.2em] uppercase text-accent">
                Explore
              </h4>
              <ul className="space-y-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className="text-stone-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-sm font-bold mb-8 tracking-[0.2em] uppercase text-accent">
                Get in Touch
              </h4>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4 text-stone-400 group">
                  <div className="mt-1 p-2 bg-white/5 rounded-full group-hover:bg-accent group-hover:text-primary transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block text-white mb-1">
                      Email us for any questions or booking
                    </span>
                    <span className="group-hover:text-white transition-colors">
                      nick@eastpointekc.com
                    </span>
                  </div>
                </li>
                <li className="flex flex-col gap-4 mt-8">
                  <div className="text-stone-400 text-sm">
                    Follow our journey
                  </div>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/eastpointekc/"
                      className="p-3 bg-white/5 rounded-full hover:bg-accent hover:text-primary transition-all duration-300"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-white/5 rounded-full hover:bg-accent hover:text-primary transition-all duration-300"
                    >
                      <Facebook size={20} />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-white/5 rounded-full hover:bg-accent hover:text-primary transition-all duration-300"
                    >
                      <Twitter size={20} />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
            <p>
              &copy; {new Date().getFullYear()} East Pointe Collections. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
