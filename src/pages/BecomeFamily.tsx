import React from "react";
import Hero from "../components/Hero";
import { Check, Mail, Phone } from "lucide-react";
import SEO from "../components/SEO";
import ContactSection from "../components/ContactSection";
import { useSanity } from "../hooks/useSanity";
import { MEMBERSHIP_PAGE_QUERY, SITE_SETTINGS_QUERY } from "../lib/queries";
import { getImageUrl } from "../lib/sanity";

const defaultBenefits = [
  "Priority booking access 6 months in advance",
  "10% off all stays, year-round",
  "Complimentary late check-out",
  "Exclusive invitations to community events"
];

const defaultSteps = [
  {
    title: "Inquire",
    description: "Contact our team via email or phone to express your interest."
  },
  {
    title: "Connect",
    description: "We'll schedule a brief call to discuss your preferences."
  },
  {
    title: "Welcome",
    description: "Receive your digital membership card and booking codes."
  }
];

const BecomeFamily: React.FC = () => {
  const { data: pageData } = useSanity<any>(MEMBERSHIP_PAGE_QUERY);
  const { data: siteSettings } = useSanity<any>(SITE_SETTINGS_QUERY);

  const hero = pageData?.hero;
  const leftPanel = pageData?.leftPanel;
  const rightPanel = pageData?.rightPanel;
  const seoData = pageData?.seo;

  const benefits = leftPanel?.benefits && leftPanel.benefits.length > 0 ? leftPanel.benefits : defaultBenefits;
  const steps = rightPanel?.steps && rightPanel.steps.length > 0 ? rightPanel.steps : defaultSteps;

  return (
    <div className="bg-stone-50">
      <SEO
        title={seoData?.title || "Membership & Exclusive Perks"}
        description={seoData?.description || "Become an East Pointe member for exclusive booking priority, discounts, and access to private community events."}
        url="https://www.eastpointekc.com/family"
      />

      <Hero
        title={hero?.title || "Membership"}
        subtitle={hero?.subtitle || "Join our exclusive community of nature lovers and luxury seekers."}
        image={getImageUrl(hero?.image, "https://picsum.photos/1920/1080?random=8")}
        height="medium"
      />

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Side: Info */}
            <div className="md:w-1/2 p-10 md:p-14 bg-primary text-cream flex flex-col justify-between relative overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

              <div className="relative z-10">
                <span className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
                  {leftPanel?.label || "The Inner Circle"}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-tight">
                  {leftPanel?.title || "Why Join East Pointe?"}
                </h2>
                <p className="mb-10 text-stone-300 font-light leading-relaxed">
                  {leftPanel?.body || "Members enjoy exclusive perks, priority booking windows, and discounted rates across all our luxury properties."}
                </p>
                <ul className="space-y-6">
                  {benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <div className="p-1 bg-accent/20 rounded-full mr-4 mt-0.5">
                        <Check className="text-accent" size={16} />
                      </div>
                      <span className="text-stone-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                <p className="text-sm text-accent italic font-serif">
                  "{leftPanel?.quote || "East Pointe isn't just a place to stay; it's a place to belong."}"
                </p>
              </div>
            </div>

            {/* Right Side: Contact / Process */}
            <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center bg-white">
              <h3 className="text-3xl font-serif text-primary mb-6">
                {rightPanel?.title || "Become a Member"}
              </h3>
              <p className="text-stone-500 leading-relaxed mb-8 font-light">
                {rightPanel?.body || "We are currently accepting a limited number of new families into the East Pointe community. To ensure the privacy and quality of our retreats, we handle all applications personally."}
              </p>

              <div className="space-y-6">
                {steps.map((step: any, idx: number) => (
                  <div key={idx} className="bg-stone-50 p-6 rounded-sm border border-stone-100">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      {step.title}
                    </h4>
                    <p className="text-sm text-stone-500 pl-8">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 space-y-4">
                <a
                  href={`mailto:${siteSettings?.email || "nick@eastpointekc.com"}?subject=Membership Inquiry`}
                  className="block w-full bg-primary text-white font-bold py-4 px-6 rounded-sm hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-3"
                >
                  <Mail size={18} /> Email Membership Team
                </a>
                <a
                  href={siteSettings?.phoneLink || "tel:+18162558683"}
                  className="block w-full border border-primary text-primary font-bold py-4 px-6 rounded-sm hover:bg-stone-50 transition-all duration-300 text-center flex items-center justify-center gap-3"
                >
                  <Phone size={18} /> Call {siteSettings?.phone || "(816) 255-8683"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default BecomeFamily;
