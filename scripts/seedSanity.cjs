/**
 * Sanity CMS Seed Script
 * ======================
 * Populates Sanity database with existing hardcoded data from the frontend.
 * 
 * Usage:
 *   set SANITY_TOKEN=your_token_here
 *   node scripts/seedSanity.cjs
 * 
 * Get a token from: https://www.sanity.io/manage → Project → API → Tokens → Add API Token (Editor role)
 */

const { createClient } = require('@sanity/client');

const SANITY_PROJECT_ID = 'mjed1aqj';
const SANITY_DATASET = 'production';
const SANITY_TOKEN = process.env.SANITY_TOKEN;

if (!SANITY_TOKEN) {
  console.error('❌ ERROR: SANITY_TOKEN environment variable is required.');
  console.error('');
  console.error('Set it before running:');
  console.error('  Windows (CMD):       set SANITY_TOKEN=your_token_here && node scripts/seedSanity.cjs');
  console.error('  Windows (PowerShell): $env:SANITY_TOKEN="your_token_here"; node scripts/seedSanity.cjs');
  console.error('  Mac/Linux:           SANITY_TOKEN=your_token_here node scripts/seedSanity.cjs');
  console.error('');
  console.error('Get a token from: https://www.sanity.io/manage → Your Project → API → Tokens');
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN,
  useCdn: false,
});

// ============================================================
// CABIN DATA (from CabinCollection.tsx hardcoded array)
// ============================================================
const cabins = [
  {
    _type: 'cabin',
    name: 'East Pointe Bayview',
    slug: { _type: 'slug', current: 'east-pointe-bayview' },
    order: 1,
    sleeps: '15',
    bedrooms: '5 Bedrooms + Loft',
    baths: 3,
    sqFt: '3,200',
    description: "A spacious 3,200 sq ft lakeside sanctuary perfect for large family reunions or wedding groups. Whether you're craving some quality time with loved ones, traveling for a wedding, or looking to unwind by the water, this spacious 5-bedroom + loft, 3-bath vacation rental cabin is the perfect home base! Gather around the crackling fire pit while gazing out at the still lake.",
    status: 'Available',
    location: 'Odessa, MO',
    bookingLink: 'https://evolve.com/vacation-rentals/us/mo/odessa/552308',
    features: [
      'Deck w/ dining area',
      'Covered patio w/ lounge seating',
      '2 gas grills, charcoal grill',
      'Private fire pit',
      'Direct Lake access',
      'Bench swing',
      '4 Smart TVs, video library',
      'Workstation for remote work',
    ],
    sleepingArrangements: [
      { _key: 'sa1', room: 'Bedroom 1', bed: '1 Queen Bed' },
      { _key: 'sa2', room: 'Bedroom 2', bed: '1 Queen Bed' },
      { _key: 'sa3', room: 'Bedroom 3', bed: '1 Queen Bed' },
      { _key: 'sa4', room: 'Bedroom 4', bed: '1 Queen Bed' },
      { _key: 'sa5', room: 'Bedroom 5', bed: '2 Twin Beds' },
      { _key: 'sa6', room: 'Loft', bed: '4 Twin Beds' },
      { _key: 'sa7', room: 'Living Room', bed: '1 Full Sleeper Sofa' },
    ],
  },
  {
    _type: 'cabin',
    name: 'Aston Harbor',
    slug: { _type: 'slug', current: 'aston-harbor' },
    order: 2,
    sleeps: '2',
    bedrooms: 'Studio',
    baths: 1,
    description: "Pet Friendly w/ Fee | BBQ Ready | Forest Views. Seeking a peaceful lakeside getaway? Look no further than this vacation rental in Odessa! With a cozy interior, furnished deck, and beautiful wooded setting just a short walk from Lake Lafayette, this 1-bath studio cabin has everything needed for a memorable couple's retreat or rejuvenating solo escape.",
    status: 'Available',
    location: 'Odessa, MO',
    bookingLink: 'https://evolve.com/vacation-rentals/us/mo/odessa/552306',
    features: [
      'Furnished deck w/ outdoor dining',
      'Charcoal grill',
      'Kitchenette (fridge, microwave, air fryer)',
      'Pet friendly (w/ fee)',
      'Step-free access',
      'Lake Lafayette access on-site',
      'Flat-screen TV & Board games',
      'Driveway parking (2 vehicles)',
    ],
    sleepingArrangements: [
      { _key: 'sa1', room: 'Studio', bed: '1 Queen Bed' },
    ],
  },
  {
    _type: 'cabin',
    name: 'Aspire',
    slug: { _type: 'slug', current: 'aspire' },
    order: 3,
    sleeps: '7',
    bedrooms: '3 Bedrooms',
    baths: 2,
    description: "Built w/ Recycled Materials | Relax Fireside | Day Trip to Kansas City | Easy Access to I-70. Discover the ideal blend of comfort and convenience in Odessa! This 3-bedroom, 2-bath vacation rental cabin offers a serene setting for your group's next visit to the Kansas City area. Plus, you'll be just a skip and a jump from nearby major highways, making trips to KC for game day and family fun a breeze.",
    status: 'Available',
    location: 'Odessa, MO',
    bookingLink: 'https://evolve.com/vacation-rentals/us/mo/odessa/562679',
    features: [
      'Built w/ Recycled Materials',
      'Private deck w/ outdoor seating',
      'Private fire pit',
      'Kitchen (stove/oven, fridge, microwave)',
      'Flat-screen TV',
      'Central A/C & heating',
      'Driveway parking (3 vehicles)',
      'Easy Access to I-70',
    ],
    sleepingArrangements: [
      { _key: 'sa1', room: 'Bedroom 1', bed: '1 Queen Bed' },
      { _key: 'sa2', room: 'Bedroom 2', bed: '1 Full Bed' },
      { _key: 'sa3', room: 'Bedroom 3', bed: '3 Twin Beds' },
    ],
  },
  {
    _type: 'cabin',
    name: 'Cedar Pointe',
    slug: { _type: 'slug', current: 'cedar-pointe' },
    order: 4,
    sleeps: '6',
    bedrooms: '2 Bedrooms',
    baths: 1.5,
    description: "Private Fire Pit w/ Seating | BBQ Ready | Outdoor Dining w/ Lake View. Lakefront relaxation awaits at this Odessa vacation rental. Whether you're looking to fish, explore Historic Downtown shops and restaurants, or simply enjoy the tranquil countryside setting, this 2-bedroom, 1.5-bath cabin is perfect for you and your crew. When you're ready to venture out, be sure to visit the Powell Gardens or catch a race just up the road at I-70 Speedway.",
    status: 'Available',
    location: 'Odessa, MO',
    bookingLink: 'https://evolve.com/vacation-rentals/us/mo/odessa/552307',
    features: [
      'Furnished porch w/ outdoor dining',
      'Wood-burning fire pit',
      'Kitchenette (stovetop, fridge, microwave, air fryer)',
      'Flat-screen TV & Board games',
      'Charcoal grill',
      'Driveway parking (5 vehicles)',
      'Lake Lafayette access on-site',
      'Single-story (5 steps access)',
      'No pets allowed',
    ],
    sleepingArrangements: [
      { _key: 'sa1', room: 'Bedroom 1', bed: '1 Queen Bed' },
      { _key: 'sa2', room: 'Bedroom 2', bed: '2 Twin Beds' },
      { _key: 'sa3', room: 'Living Room', bed: '1 Sleeper Sofa' },
    ],
  },
  {
    _type: 'cabin',
    name: "Byrd's Nest",
    slug: { _type: 'slug', current: 'byrds-nest' },
    order: 5,
    sleeps: '4',
    bedrooms: '2 Bedrooms',
    baths: 1,
    description: "Pet Friendly w/ Fee | Furnished Outdoor Space | BBQ Ready | 4 Mi to Downtown. Escape the city buzz at 'Byrd's Nest' — a vacation rental in Odessa. In addition to its peaceful setting just steps from Lake Lafayette, this charming 2-bedroom, 1-bath cabin offers easy access to local hot spots like Historic Downtown Odessa, Powell Gardens, I-70 Speedway, and more. When you're not out exploring, be sure to spend some time around the fire pit or head inside to enjoy a relaxing game night.",
    status: 'Available',
    location: 'Odessa, MO',
    bookingLink: 'https://evolve.com/vacation-rentals/us/mo/odessa/552309',
    features: [
      'Furnished patio w/ outdoor dining',
      'Private fire pit',
      'Kitchenette (fridge, stovetop, microwave, air fryer)',
      'Pet friendly (w/ fee)',
      'Flat-screen TV, Fireplace',
      'Lake Lafayette access on-site',
      'Driveway parking (5 vehicles)',
      'Single-story cabin (1 step access)',
    ],
    sleepingArrangements: [
      { _key: 'sa1', room: 'Bedroom 1', bed: '1 Queen Bed' },
      { _key: 'sa2', room: 'Bedroom 2', bed: '2 Twin Beds' },
    ],
  },
  {
    _type: 'cabin',
    name: 'Harbor View',
    slug: { _type: 'slug', current: 'harbor-view' },
    order: 6,
    sleeps: '10 - 13',
    bedrooms: '4 Bedrooms + Loft (5 beds)',
    baths: 2.5,
    sqFt: '3,500',
    description: 'Expansive views with plenty of room for everyone. Coming soon to our collection, this property will redefine lakeside luxury for large groups.',
    status: 'Coming Soon',
    location: 'Odessa, MO',
  },
  {
    _type: 'cabin',
    name: 'TreeHaus',
    slug: { _type: 'slug', current: 'treehaus' },
    order: 7,
    sleeps: 'TBD',
    bedrooms: 'TBD',
    baths: 0,
    description: 'Elevated luxury among the canopy. Experience nature from a new perspective in our upcoming treehouse experience.',
    status: 'Coming Soon',
    location: 'Odessa, MO',
  },
  {
    _type: 'cabin',
    name: 'RocHaus',
    slug: { _type: 'slug', current: 'rochaus' },
    order: 8,
    sleeps: 'TBD',
    bedrooms: 'TBD',
    baths: 0,
    description: 'Modern design meets rugged landscape. A stunning addition to our collection coming next season.',
    status: 'Coming Soon',
    location: 'Odessa, MO',
  },
];

// ============================================================
// AMENITY DATA (from ComfortConvenience.tsx hardcoded array)
// ============================================================
const amenities = [
  { _type: 'amenity', title: 'Parking', description: 'Ample parking available directly on the premises for your convenience.', icon: 'Car', order: 1 },
  { _type: 'amenity', title: 'Cooling', description: 'Central air conditioning to keep you cool during warm lakeside summers.', icon: 'Wind', order: 2 },
  { _type: 'amenity', title: 'High Speed Wifi', description: 'Stay connected with reliable high-speed internet coverage throughout the cabin.', icon: 'Wifi', order: 3 },
  { _type: 'amenity', title: 'Kitchens & Kitchenettes', description: 'Fully stocked culinary spaces where guests can prepare their own gourmet meals.', icon: 'Utensils', order: 4 },
  { _type: 'amenity', title: 'Bed Linens', description: "Luxury bedding with extra pillows and blankets for the ultimate night's sleep.", icon: 'Bed', order: 5 },
  { _type: 'amenity', title: 'Smart TVs', description: 'Entertainment ready with built-in streaming options for movie nights.', icon: 'Tv', order: 6 },
  { _type: 'amenity', title: 'Heating', description: 'Cozy central heating to keep you warm during crisp autumns and winters.', icon: 'Flame', order: 7 },
  { _type: 'amenity', title: 'Custom Coffee Bar', description: 'Equipped with coffee makers and pour-over options for your morning ritual.', icon: 'Coffee', order: 8 },
  { _type: 'amenity', title: 'Self Check-in', description: 'Seamless arrival experience with a secure, personalized door code.', icon: 'Key', order: 9 },
  { _type: 'amenity', title: 'Easy Checkout', description: 'Extra easy checkout experience.', icon: 'LogOut', order: 10 },
  { _type: 'amenity', title: 'Private Fire Pit', description: 'These are fun and keep you engaged throughout the evening.', icon: 'Flame', order: 11 },
  { _type: 'amenity', title: 'Private BBQ Grill', description: 'Each location has a BBQ grill... Because this is Kansas City!', icon: 'Utensils', order: 12 },
  { _type: 'amenity', title: 'Fishing Equipment', description: 'Available on request. We have docks and shorelines available for you to cast your line.', icon: 'Fish', order: 13 },
];

// ============================================================
// TESTIMONIAL DATA (from Home.tsx hardcoded section)
// ============================================================
const testimonials = [
  {
    _type: 'testimonial',
    name: 'Sarah Jenkins',
    location: 'Atlanta, GA',
    quote: 'The most restorative weekend of my life. The cabin was impeccable, and the silence of the forest was exactly what we needed.',
    rating: 5,
    order: 1,
  },
  {
    _type: 'testimonial',
    name: 'Michael & David',
    location: 'Charlotte, NC',
    quote: 'East Pointe thought of everything. From the pre-stocked firewood to the locally sourced coffee awaiting our arrival. Pure magic.',
    rating: 5,
    order: 2,
  },
  {
    _type: 'testimonial',
    name: 'The Thompson Family',
    location: 'Nashville, TN',
    quote: 'We hosted our family reunion here. The communal spaces were perfect for gathering, yet everyone had their own private retreat.',
    rating: 5,
    order: 3,
  },
];

// ============================================================
// SEED FUNCTION
// ============================================================
async function seed() {
  console.log('');
  console.log('🌱 East Pointe — Sanity CMS Seed Script');
  console.log('========================================');
  console.log(`   Project: ${SANITY_PROJECT_ID}`);
  console.log(`   Dataset: ${SANITY_DATASET}`);
  console.log('');

  // ---- Check for existing data ----
  const existingCabins = await client.fetch('count(*[_type == "cabin"])');
  const existingAmenities = await client.fetch('count(*[_type == "amenity"])');
  const existingTestimonials = await client.fetch('count(*[_type == "testimonial"])');

  console.log('📊 Current Database Status:');
  console.log(`   Cabins:       ${existingCabins} documents`);
  console.log(`   Amenities:    ${existingAmenities} documents`);
  console.log(`   Testimonials: ${existingTestimonials} documents`);
  console.log('');

  let totalCreated = 0;

  // ---- Seed Cabins ----
  if (existingCabins === 0) {
    console.log('🏠 Seeding Cabin Units...');
    for (const cabin of cabins) {
      const result = await client.create(cabin);
      console.log(`   ✅ Created: ${cabin.name} (${result._id})`);
      totalCreated++;
    }
    console.log(`   → ${cabins.length} cabins created`);
  } else {
    console.log(`⏭️  Skipping Cabins (${existingCabins} already exist)`);
  }

  console.log('');

  // ---- Seed Amenities ----
  if (existingAmenities === 0) {
    console.log('✨ Seeding Amenity Items...');
    for (const amenity of amenities) {
      const result = await client.create(amenity);
      console.log(`   ✅ Created: ${amenity.title} (${result._id})`);
      totalCreated++;
    }
    console.log(`   → ${amenities.length} amenities created`);
  } else {
    console.log(`⏭️  Skipping Amenities (${existingAmenities} already exist)`);
  }

  console.log('');

  // ---- Seed Testimonials ----
  if (existingTestimonials === 0) {
    console.log('💬 Seeding Guest Reviews...');
    for (const testimonial of testimonials) {
      const result = await client.create(testimonial);
      console.log(`   ✅ Created: ${testimonial.name} (${result._id})`);
      totalCreated++;
    }
    console.log(`   → ${testimonials.length} testimonials created`);
  } else {
    console.log(`⏭️  Skipping Testimonials (${existingTestimonials} already exist)`);
  }

  console.log('');
  console.log('========================================');
  console.log(`🎉 Done! ${totalCreated} total documents created.`);
  console.log('');
  console.log('Next steps:');
  console.log('  1. Open /studio in your browser');
  console.log('  2. Check Cabin Units, Amenity Items, Guest Reviews');
  console.log('  3. Edit/add data as needed');
  console.log('  4. Upload cabin images via Studio UI');
  console.log('');
}

seed().catch((err) => {
  console.error('');
  console.error('❌ Seed failed:', err.message);
  if (err.statusCode === 403) {
    console.error('   → Token does not have write permissions. Create an "Editor" token.');
  }
  process.exit(1);
});
