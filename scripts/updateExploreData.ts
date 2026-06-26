import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: 'jlknt03a',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-03-07',
  token: 'skDdcM1KRLhkCEonjUIipuCpEmrWm61pgwM3sosKH2zDvuyE8zYeuIU9UfANr3onepiW9gZmmaMAyTPRrg87R4QDLK0cNvmMJSOvmZndXpRMAjySDzkEaKTR4CUhe05NrwkaVWVwOflZ5T2Vd5FyC1w7SW7QzCeAlqAZT2B39xOjn4K5Dipg'
});

async function uploadImage(filename) {
  const filePath = path.join(process.cwd(), 'public', 'Explore', filename);
  if (fs.existsSync(filePath)) {
    console.log(`Uploading ${filename}...`);
    const fileStream = fs.createReadStream(filePath);
    const asset = await client.assets.upload('image', fileStream, { filename });
    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id }
    };
  }
  return undefined;
}

async function updateSanity() {
  try {
    const quickDriveImg = await uploadImage('QuickDrive.avif');
    const chiefsImg = await uploadImage('ChiefsAndRoyals.avif');
    const unionImg = await uploadImage('UnionStation.avif');
    const powerImg = await uploadImage('PowerAndLight.avif');
    const plazaImg = await uploadImage('CountryPlaza.avif');
    const powellImg = await uploadImage('Powell.webp');

    const defaultCards = [
      { _key: 'card1', _type: 'object', category: 'Championship City', title: 'Chiefs & Royals', description: 'Experience the thrill of Arrowhead Stadium or a classic ballgame at Kauffman Stadium. A short drive for an unforgettable game day.', icon: 'Trophy', isWide: false, ...(chiefsImg ? { image: chiefsImg } : {}) },
      { _key: 'card2', _type: 'object', category: 'History & Arts', title: 'Union Station & Museums', description: 'Visit the iconic Union Station, the beautiful Nelson-Atkins Museum of Art, and the National WWI Museum.', icon: 'Building2', isWide: false, ...(unionImg ? { image: unionImg } : {}) },
      { _key: 'card3', _type: 'object', category: 'Nightlife', title: 'Power & Light District', description: 'Immerse yourself in the rhythm of the 18th & Vine Jazz District or the vibrant energy of the Power & Light District.', icon: 'Music', isWide: false, ...(powerImg ? { image: powerImg } : {}) },
      { _key: 'card4', _type: 'object', category: 'Shopping & Dining', title: 'Country Club Plaza', description: 'Enjoy premier shopping and indulge in legendary Kansas City BBQ at renowned restaurants throughout the city.', icon: 'ShoppingBag', isWide: false, ...(plazaImg ? { image: plazaImg } : {}) },
      { _key: 'card5', _type: 'object', category: 'Nature & Flora', title: 'Powell Gardens', description: "Kansas City's premier botanical garden, set on 970 acres of lush meadows and diverse gardens just minutes away.", icon: 'Leaf', isWide: true, ...(powellImg ? { image: powellImg } : {}) }
    ];

    const patchData = {
      'hero.subtitle': 'Your ideal lake getaway, just a quick drive from the heart of Kansas City.',
      'intro.body1': 'Escape the hustle and bustle of the city and enjoy a stay at our charming lake cabins in Odessa, MO. Perfectly situated just outside the Kansas City Metropolitan area, East Pointe offers the ultimate compromise: rugged seclusion when you want it, and city excitement when you need it.',
      'intro.body2': 'Whether you are in town for a Chiefs game, a Royals match, or simply exploring the rich culture of the Midwest, our cabins serve as your adventurous basecamp.',
      'quoteSection.quote': "Experience the tranquility of lakeside living while maintaining easy access to the city's excitement.",
      'discoverSection.subtitle': "Explore the vibrant city known for its rich history, cultural attractions, and exciting entertainment options. From world-class BBQ to championship sports, it's all within reach.",
      'discoverSection.cards': defaultCards
    };

    if (quickDriveImg) {
      patchData['intro.image'] = quickDriveImg;
    }

    for (const docId of ['explorePage', 'drafts.explorePage']) {
      console.log(`Updating ${docId}...`);
      const doc = await client.getDocument(docId).catch(() => null);
      if (doc) {
        await client.patch(docId).set(patchData).commit();
        console.log(`${docId} updated successfully.`);
      } else {
        if (docId === 'explorePage') {
          await client.create({
            _id: 'explorePage',
            _type: 'explorePage',
            hero: { title: 'Explore the Region', subtitle: patchData['hero.subtitle'] },
            intro: { label: 'The Best of Both Worlds', title: 'A Quick Drive from KC', body1: patchData['intro.body1'], body2: patchData['intro.body2'], image: quickDriveImg },
            quoteSection: { quote: patchData['quoteSection.quote'] },
            discoverSection: { title: 'Discover Kansas City', subtitle: patchData['discoverSection.subtitle'], cards: defaultCards }
          });
          console.log(`Created explorePage successfully.`);
        }
      }
    }
    console.log('All Explore updates done!');
  } catch (error) {
    console.error('Error updating Sanity:', error);
  }
}

updateSanity();
