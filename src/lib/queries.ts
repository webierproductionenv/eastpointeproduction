// GROQ queries for fetching content from Sanity CMS

// ==================== SITE SETTINGS ====================
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  logo,
  email,
  phone,
  phoneLink,
  address,
  googleMapsUrl,
  googleMapsEmbedUrl,
  socialLinks,
  footerDescription,
  copyrightText,
  officeHours
}`;

// ==================== HOME PAGE ====================
export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  hero,
  philosophy,
  carouselItems[]{
    title,
    description,
    linkUrl,
    image,
    icon
  },
  immersiveSection,
  experiences,
  testimonialsSection,
  locationSection,
  amenitiesPreview,
  ctaSection,
  seo
}`;

// ==================== TESTIMONIALS ====================
export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc){
  name,
  location,
  quote,
  rating
}`;

// ==================== CABINS PAGE ====================
export const CABIN_PAGE_QUERY = `*[_type == "cabinPage"][0]{
  hero,
  intro,
  videoUrl,
  videoPoster,
  mapImage,
  comeSeeUs,
  seo
}`;

export const CABINS_QUERY = `*[_type == "cabin"] | order(order asc){
  _id,
  name,
  slug,
  sleeps,
  bedrooms,
  baths,
  sqFt,
  description,
  status,
  location,
  bookingLink,
  "images": images[].asset->url,
  features,
  sleepingArrangements
}`;

// ==================== AMENITIES PAGE ====================
export const AMENITIES_PAGE_QUERY = `*[_type == "amenitiesPage"][0]{
  hero,
  intro,
  seo
}`;

export const AMENITIES_QUERY = `*[_type == "amenity"] | order(order asc){
  title,
  description,
  icon
}`;

// ==================== COMMUNITY PAGE ====================
export const COMMUNITY_PAGE_QUERY = `*[_type == "communityPage"][0]{
  hero,
  intro,
  eventCards[]{
    title,
    description,
    image,
    icon,
    features
  },
  concierge,
  seo
}`;

// ==================== EXPLORE PAGE ====================
export const EXPLORE_PAGE_QUERY = `*[_type == "explorePage"][0]{
  hero,
  intro,
  quoteSection,
  discoverSection,
  seo
}`;

// ==================== MEMBERSHIP PAGE ====================
export const MEMBERSHIP_PAGE_QUERY = `*[_type == "membershipPage"][0]{
  hero,
  leftPanel,
  rightPanel,
  seo
}`;
