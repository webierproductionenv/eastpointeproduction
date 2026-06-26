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
    const heroImg = await uploadLocalImage('public/Home/LandingImage.avif');
    const c1Img = await uploadLocalImage('public/Cabin/Aspire/1.avif');
    const c2Img = await uploadLocalImage('public/Cabin/Bayview/2.avif');
    const c3Img = await uploadLocalImage('public/Home/Comfort.avif');
    const c4Img = await uploadLocalImage('public/Home/Nature.avif');
    const mapImg = await uploadLocalImage('public/Map.avif');
    const e1Img = await uploadLocalImage('public/Home/Hiking.avif');
    const e2Img = await uploadLocalImage('public/Membership/MembershipHero.avif');
    const e3Img = await uploadLocalImage('public/Home/Relax.avif');
    const ctaImg = await uploadLocalImage('public/Home/HomeCTA.avif');

    const defaultCarouselItems = [
      { _key: 'c1', _type: 'object', title: 'The Collection', description: 'Discover our hand-picked portfolio of luxury cabins, each offering unique architecture and premium amenities.', linkUrl: '/cabins', icon: 'Star', ...(c1Img ? { image: c1Img } : {}) },
      { _key: 'c2', _type: 'object', title: 'Comfort & Ease', description: "From chef's kitchens to high-speed wifi, we've curated every detail to make your stay effortless.", linkUrl: '/comfort', icon: 'Wind', ...(c2Img ? { image: c2Img } : {}) },
      { _key: 'c3', _type: 'object', title: 'Gather Together', description: 'Spaces designed for connection. Large dining tables, fire pits, and game rooms for making memories.', linkUrl: '/gather', icon: 'Users', ...(c3Img ? { image: c3Img } : {}) },
      { _key: 'c4', _type: 'object', title: 'Explore Nature', description: 'Hiking trails, alpine lakes, and hidden waterfalls await just minutes from your doorstep.', linkUrl: '/beyond', icon: 'Mountain', ...(c4Img ? { image: c4Img } : {}) }
    ];

    const defaultExperiences = [
      { _key: 'e1', _type: 'object', category: 'Adventure', title: 'Anglers Haven', description: 'A quiet cove just a short walk from the house.', icon: 'Fish', ...(e1Img ? { image: e1Img } : {}) },
      { _key: 'e2', _type: 'object', category: 'Relaxation', title: 'Lake Activities', description: 'Swimming, kayaking, or simply enjoying family fun by the water.', icon: 'Anchor', ...(e2Img ? { image: e2Img } : {}) },
      { _key: 'e3', _type: 'object', category: 'Tranquility', title: 'Rest & Relaxation', description: 'Peaceful moments fishing by the lake or reading on the dock.', icon: 'Fish', ...(e3Img ? { image: e3Img } : {}) }
    ];

    const defaultDistances = [
      { _key: 'd1', _type: 'object', time: '35 Mins', destination: 'Downtown Kansas City', icon: 'Car' },
      { _key: 'd2', _type: 'object', time: '2.5 Hours', destination: 'St. Louis', icon: 'Car' },
      { _key: 'd3', _type: 'object', time: '40 Mins', destination: 'MCI Airport', icon: 'Plane' },
      { _key: 'd4', _type: 'object', time: '32 Mins', destination: 'Truman Sports Complex', icon: 'Car' },
      { _key: 'd5', _type: 'object', time: '25 Mins', destination: 'Warrensburg', icon: 'Car' },
      { _key: 'd6', _type: 'object', time: '15 Mins', destination: 'Powell Gardens', icon: 'Car' }
    ];

    const defaultAmenities = [
      { _key: 'a1', _type: 'object', title: '5-Star Service', description: '24/7 Concierge & Support', icon: 'Star' },
      { _key: 'a2', _type: 'object', title: 'Fresh Air', description: 'Secluded Private Locations', icon: 'Wind' },
      { _key: 'a3', _type: 'object', title: 'Secure & Safe', description: 'Smart Locks & Security', icon: 'ShieldCheck' },
      { _key: 'a4', _type: 'object', title: 'Family Ready', description: 'Games, Cribs & More', icon: 'Users' }
    ];

    const patchData = {
      'philosophy.body': "Welcome to EastPointe At EastPointe, the land, the environment, and our faith in GOD mean everything to us. Our cabins are intentionally built using reclaimed and recycled wood and materials. This rustic style is by design. We believe there is beauty in imperfection. While you're here, take time to slow down. Walk the roads, visit the lake, and enjoy the peaceful surroundings. Most of all, we hope your time here brings you peace, rest, and a chance to reconnect with what matters most. Thank you for being part of the EastPointe story.",
      'carouselItems': defaultCarouselItems,
      'immersiveSection.body': "Step outside and immerse yourself in the breathtaking landscapes that surround our properties. Hiking trails, alpine lakes, and hidden waterfalls await just minutes from your doorstep.",
      'experiences.subtitle': "Whether you seek adrenaline-pumping adventure or serene nature walks, our location offers endless opportunities to explore.",
      'experiences.items': defaultExperiences,
      'locationSection.body': "East Pointe is strategically located in the heart of Missouri's beautiful countryside. A perfect escape that feels worlds away, yet conveniently close to major hubs.",
      'locationSection.distances': defaultDistances,
      'amenitiesPreview.items': defaultAmenities,
      'ctaSection.subtitle': "Join our family of travelers and experience the difference of a true luxury retreat."
    };

    if (heroImg) patchData['hero.image'] = heroImg;
    if (mapImg) patchData['immersiveSection.mapImage'] = mapImg;
    if (ctaImg) patchData['ctaSection.backgroundImage'] = ctaImg;

    for (const docId of ['homePage', 'drafts.homePage']) {
      console.log(`Updating ${docId}...`);
      const doc = await client.getDocument(docId).catch(() => null);
      if (doc) {
        await client
          .patch(docId)
          .setIfMissing({
            hero: { title: 'East Pointe', subtitle: 'Lake Cabin Experience' },
            philosophy: { label: 'Our Philosophy', title: 'Discover the perfect lake escape', highlightedText: 'perfect lake escape', linkText: 'Explore Our Philosophy', linkUrl: '/cabins' },
            immersiveSection: { label: 'The Surroundings', title: 'Beyond the Cabin', linkText: 'Discover the Area', linkUrl: '/beyond' },
            experiences: { title: 'Curated Experiences', viewAllText: 'View All Activities', viewAllLink: '/beyond' },
            testimonialsSection: { title: 'Guest Stories' },
            locationSection: { label: 'The Location', title: 'Nestled in Nature', locationName: 'Lake Lafayette', locationAddress: 'Odessa, Missouri 64076' },
            amenitiesPreview: { title: 'The East Pointe Standard' },
            ctaSection: { title: 'Ready to Escape?', primaryButtonText: 'Book Your Stay', primaryButtonLink: '/cabins', secondaryButtonText: 'Become a Member', secondaryButtonLink: '/family' }
          })
          .set(patchData)
          .commit();
        console.log(`${docId} updated successfully.`);
      } else {
        if (docId === 'homePage') {
          await client.create({
            _id: 'homePage',
            _type: 'homePage',
            hero: { title: 'East Pointe', subtitle: 'Lake Cabin Experience', image: heroImg },
            philosophy: { label: 'Our Philosophy', title: 'Discover the perfect lake escape', highlightedText: 'perfect lake escape', body: patchData['philosophy.body'], linkText: 'Explore Our Philosophy', linkUrl: '/cabins' },
            carouselItems: defaultCarouselItems,
            immersiveSection: { mapImage: mapImg, label: 'The Surroundings', title: 'Beyond the Cabin', body: patchData['immersiveSection.body'], linkText: 'Discover the Area', linkUrl: '/beyond' },
            experiences: { title: 'Curated Experiences', subtitle: patchData['experiences.subtitle'], items: defaultExperiences, viewAllText: 'View All Activities', viewAllLink: '/beyond' },
            testimonialsSection: { title: 'Guest Stories' },
            locationSection: { label: 'The Location', title: 'Nestled in Nature', locationName: 'Lake Lafayette', locationAddress: 'Odessa, Missouri 64076', body: patchData['locationSection.body'], distances: defaultDistances },
            amenitiesPreview: { title: 'The East Pointe Standard', items: defaultAmenities },
            ctaSection: { title: 'Ready to Escape?', subtitle: patchData['ctaSection.subtitle'], backgroundImage: ctaImg, primaryButtonText: 'Book Your Stay', primaryButtonLink: '/cabins', secondaryButtonText: 'Become a Member', secondaryButtonLink: '/family' }
          });
          console.log(`Created homePage successfully.`);
        }
      }
    }
    console.log('All Home Page updates done!');
  } catch (error) {
    console.error('Error updating Sanity:', error);
  }
}

updateSanity();
