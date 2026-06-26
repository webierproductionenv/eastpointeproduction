/**
 * Force seed cabins — deletes existing cabin documents and re-seeds all 8 cabins.
 * Usage: $env:SANITY_TOKEN="your_token"; node scripts/seedCabins.cjs
 */
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'mjed1aqj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

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

async function run() {
  console.log('');
  console.log('🏠 Force Seeding Cabin Units...');
  console.log('');

  // Step 1: Delete ALL existing cabin documents (including drafts)
  const existingIds = await client.fetch('*[_type == "cabin"]._id');
  if (existingIds.length > 0) {
    console.log('🗑️  Removing ' + existingIds.length + ' existing cabin(s)...');
    for (const id of existingIds) {
      await client.delete(id);
      // Also delete any draft version
      if (!id.startsWith('drafts.')) {
        await client.delete('drafts.' + id).catch(() => {});
      }
      console.log('   Deleted: ' + id);
    }
    // Also check for orphaned drafts
    const draftIds = await client.fetch('*[_type == "cabin" && _id match "drafts.*"]._id');
    for (const id of draftIds) {
      await client.delete(id).catch(() => {});
    }
    console.log('');
  }

  // Step 2: Create all 8 cabins
  console.log('✨ Creating 8 cabin documents...');
  for (const cabin of cabins) {
    const result = await client.create(cabin);
    console.log('   ✅ ' + cabin.name + ' (' + result._id + ')');
  }

  console.log('');
  console.log('🎉 Done! All 8 cabins seeded successfully.');
  console.log('   Open /studio → Cabin Units to verify.');
  console.log('');
}

run().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
