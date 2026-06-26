const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'jlknt03a',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const defaultEventCards = [
  {
    _key: 'ec1',
    _type: 'eventCard',
    title: "Intimate Weddings",
    description: "Say \"I do\" with the lake as your witness. Our grounds provide a stunning, natural cathedral for ceremonies up to 50 guests.",
    localImage: 'Wedding.avif',
    icon: "Heart",
    features: ["Lakeside Ceremonies", "Bridal Cabin Packages", "Photography Access"]
  },
  {
    _key: 'ec2',
    _type: 'eventCard',
    title: "Family Reunions",
    description: "Reconnect without distractions. Book multiple cabins to keep the family close while giving everyone their own private space.",
    localImage: 'Reunion.avif',
    icon: "Users",
    features: ["Communal Fire Pits", "Large Group Dining", "Safe Kids Play Areas"]
  },
  {
    _key: 'ec3',
    _type: 'eventCard',
    title: "Corporate Retreats",
    description: "Step away from the boardroom. Our inspiring environment fosters creativity, team bonding, and strategic thinking.",
    localImage: 'Corporate.avif',
    icon: "Briefcase",
    features: ["High-Speed Wifi", "Team Building Activities", "Catering Partners"]
  }
];

async function seedCommunity() {
  console.log('Seeding Community Page cards...');

  const eventCards = [];

  for (const card of defaultEventCards) {
    const filePath = path.join(__dirname, '..', 'public', 'Community', card.localImage);
    let assetRef = null;

    if (fs.existsSync(filePath)) {
      console.log(`Uploading image ${card.localImage}...`);
      const fileStream = fs.createReadStream(filePath);
      const asset = await client.assets.upload('image', fileStream, {
        filename: card.localImage,
      });
      assetRef = {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id }
      };
    } else {
      console.warn(`File not found: ${filePath}`);
    }

    eventCards.push({
      _key: card._key,
      _type: 'eventCard',
      title: card.title,
      description: card.description,
      icon: card.icon,
      features: card.features,
      ...(assetRef ? { image: assetRef } : {})
    });
  }

  const doc = {
    _id: 'communityPage',
    _type: 'communityPage',
    eventCards: eventCards
  };

  console.log('Writing communityPage document to Sanity...');
  await client.createOrReplace(doc);

  console.log('Done! Community Page seeded.');
}

seedCommunity().catch(err => {
  console.error(err);
  process.exit(1);
});
