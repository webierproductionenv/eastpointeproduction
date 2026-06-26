import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import https from 'https';

const client = createClient({
  projectId: 'jlknt03a',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-03-07',
  token: 'skDdcM1KRLhkCEonjUIipuCpEmrWm61pgwM3sosKH2zDvuyE8zYeuIU9UfANr3onepiW9gZmmaMAyTPRrg87R4QDLK0cNvmMJSOvmZndXpRMAjySDzkEaKTR4CUhe05NrwkaVWVwOflZ5T2Vd5FyC1w7SW7QzCeAlqAZT2B39xOjn4K5Dipg'
});

async function uploadLocalImage(filename) {
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

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function uploadRemoteImage(url, filename) {
  console.log(`Downloading ${filename} from ${url}...`);
  const tempPath = path.join(process.cwd(), filename);
  await downloadImage(url, tempPath);
  console.log(`Uploading ${filename} to Sanity...`);
  const fileStream = fs.createReadStream(tempPath);
  const asset = await client.assets.upload('image', fileStream, { filename });
  fs.unlinkSync(tempPath); // cleanup
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id }
  };
}

async function updateSanity() {
  try {
    const heroImg = await uploadLocalImage('ExploreHero.avif');
    const quoteImg = await uploadRemoteImage('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920', 'ExploreQuoteBg.jpg');

    const patchData = {};
    if (heroImg) patchData['hero.image'] = heroImg;
    if (quoteImg) patchData['quoteSection.backgroundImage'] = quoteImg;

    for (const docId of ['explorePage', 'drafts.explorePage']) {
      console.log(`Updating ${docId}...`);
      const doc = await client.getDocument(docId).catch(() => null);
      if (doc) {
        await client.patch(docId).set(patchData).commit();
        console.log(`${docId} updated successfully.`);
      }
    }
    console.log('Images attached successfully!');
  } catch (error) {
    console.error('Error updating Sanity:', error);
  }
}

updateSanity();
