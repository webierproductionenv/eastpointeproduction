const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Replace this if necessary, or pass via environment variable
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'mjed1aqj', // Using the project ID from env
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const cabinMap = {
  'east-pointe-bayview': 'Bayview',
  'aston-harbor': 'Aston Harbor',
  'aspire': 'Aspire',
  'cedar-pointe': 'Cedar Pointe',
  'byrds-nest': "BYRD's Nest",
};

async function uploadImages() {
  console.log('Starting image upload for cabins...');

  // Fetch all existing cabins
  const cabins = await client.fetch(`*[_type == "cabin"]{_id, slug, name}`);
  
  for (const cabin of cabins) {
    if (!cabin.slug || !cabin.slug.current) continue;
    
    const folderName = cabinMap[cabin.slug.current];
    if (!folderName) {
      console.log(`No local image folder mapped for cabin: ${cabin.name} (${cabin.slug.current})`);
      continue;
    }

    const dirPath = path.join(__dirname, '..', 'public', 'Cabin', folderName);
    if (!fs.existsSync(dirPath)) {
      console.log(`Directory not found: ${dirPath}`);
      continue;
    }

    const files = fs.readdirSync(dirPath).filter(file => file.match(/\.(avif|jpg|jpeg|png|webp)$/i));
    
    if (files.length === 0) {
      console.log(`No images found in ${dirPath}`);
      continue;
    }

    console.log(`Found ${files.length} images for ${cabin.name}. Uploading...`);
    
    // Sort files logically if they are numbered (1.avif, 2.avif...)
    files.sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, '')) || 0;
      const numB = parseInt(b.replace(/\D/g, '')) || 0;
      return numA - numB;
    });

    const imageRefs = [];
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      console.log(`Uploading ${file}...`);
      
      const fileStream = fs.createReadStream(filePath);
      try {
        const asset = await client.assets.upload('image', fileStream, {
          filename: file,
        });
        imageRefs.push({
          _type: 'image',
          _key: `image_${Math.random().toString(36).substring(7)}`,
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        });
      } catch (err) {
        console.error(`Failed to upload ${file}:`, err.message);
      }
    }

    if (imageRefs.length > 0) {
      console.log(`Updating ${cabin.name} with ${imageRefs.length} images...`);
      await client.patch(cabin._id)
        .set({ images: imageRefs })
        .commit();
      console.log(`Successfully updated ${cabin.name}!`);
    }
  }
  
  console.log('All image uploads finished!');
}

if (!process.env.SANITY_TOKEN) {
  console.error("Please set SANITY_TOKEN environment variable.");
  process.exit(1);
}

uploadImages().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
