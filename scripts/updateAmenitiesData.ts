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

async function uploadLocalImage(filename) {
  const filePath = path.join(process.cwd(), 'public', 'Amenities', filename);
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
    const heroImg = await uploadLocalImage('AmenitiesHero.jpeg');

    const patchData = {
      'hero.subtitle': "We've thought of everything, so you don't have to.",
      'intro.body': "Explore the fantastic amenities waiting for you in each cabin. We integrate thoughtful services to ensure your time with us is seamless from check-in to check-out. We can't wait for you to find your perfect getaway retreat with us!"
    };

    if (heroImg) patchData['hero.image'] = heroImg;

    for (const docId of ['amenitiesPage', 'drafts.amenitiesPage']) {
      console.log(`Updating ${docId}...`);
      const doc = await client.getDocument(docId).catch(() => null);
      if (doc) {
        await client
          .patch(docId)
          .setIfMissing({
            hero: { title: 'Guest Perks' },
            intro: { label: 'Our Amenities', title: 'Comfort & Convenience' },
          })
          .set(patchData)
          .commit();
        console.log(`${docId} updated successfully.`);
      } else {
        if (docId === 'amenitiesPage') {
          await client.create({
            _id: 'amenitiesPage',
            _type: 'amenitiesPage',
            hero: { title: 'Guest Perks', subtitle: patchData['hero.subtitle'], image: heroImg },
            intro: { label: 'Our Amenities', title: 'Comfort & Convenience', body: patchData['intro.body'] }
          });
          console.log(`Created amenitiesPage successfully.`);
        }
      }
    }
    console.log('All Amenities updates done!');
  } catch (error) {
    console.error('Error updating Sanity:', error);
  }
}

updateSanity();
