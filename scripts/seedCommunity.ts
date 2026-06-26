import { getCliClient } from 'sanity/cli';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = getCliClient();

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

  console.log('Writing communityPage eventCards to Sanity...');
  await client.createIfNotExists({ _id: 'communityPage', _type: 'communityPage' });
  await client.patch('communityPage').set({ eventCards: eventCards }).commit();

  console.log('Done! Community Page seeded.');
}

seedCommunity().catch(err => {
  console.error(err);
  process.exit(1);
});
