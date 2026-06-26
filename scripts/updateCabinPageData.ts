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

async function uploadLocalImage(relativePath) {
  const filePath = path.join(process.cwd(), relativePath);
  if (fs.existsSync(filePath)) {
    console.log(`Uploading ${path.basename(filePath)}...`);
    const fileStream = fs.createReadStream(filePath);
    const asset = await client.assets.upload('image', fileStream, { filename: path.basename(filePath) });
    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id }
    };
  }
  return undefined;
}

async function updateSanity() {
  try {
    const heroImg = await uploadLocalImage('public/Cabin/CabinHero.avif');
    const mapImg = await uploadLocalImage('public/Map.avif');

    const patchData = {
      'hero.subtitle': "Discover our range of cabins designed to accommodate all group sizes, whether you're planning a cozy getaway for two or a lively retreat for a large gathering.",
      'intro.body': "Each cabin is thoughtfully crafted to match your vacation intentions. Click on any cabin below to view full details, sleeping arrangements, and amenities.",
      'comeSeeUs.subtitle': "Visit our offices to explore our stunning lakeside cabins!",
      'comeSeeUs.body': "Experience the serene surroundings firsthand and discover your perfect getaway. We look forward to welcoming you!"
    };

    if (heroImg) patchData['hero.image'] = heroImg;
    if (mapImg) patchData['mapImage'] = mapImg;

    for (const docId of ['cabinPage', 'drafts.cabinPage']) {
      console.log(`Updating ${docId}...`);
      const doc = await client.getDocument(docId).catch(() => null);
      if (doc) {
        await client
          .patch(docId)
          .setIfMissing({
            hero: { title: 'Lake Cabin Collection' },
            intro: { label: 'Our Portfolio', title: 'Find Your Perfect Escape' },
            comeSeeUs: { title: 'Come See Us' },
          })
          .set(patchData)
          .commit();
        console.log(`${docId} updated successfully.`);
      } else {
        if (docId === 'cabinPage') {
          await client.create({
            _id: 'cabinPage',
            _type: 'cabinPage',
            hero: { title: 'Lake Cabin Collection', subtitle: patchData['hero.subtitle'], image: heroImg },
            intro: { label: 'Our Portfolio', title: 'Find Your Perfect Escape', body: patchData['intro.body'] },
            mapImage: mapImg,
            comeSeeUs: { title: 'Come See Us', subtitle: patchData['comeSeeUs.subtitle'], body: patchData['comeSeeUs.body'] }
          });
          console.log(`Created cabinPage successfully.`);
        }
      }
    }
    console.log('All Cabin Page updates done!');
  } catch (error) {
    console.error('Error updating Sanity:', error);
  }
}

updateSanity();
