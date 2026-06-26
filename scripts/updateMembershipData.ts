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
  const filePath = path.join(process.cwd(), 'public', 'Membership', filename);
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
    const heroImg = await uploadLocalImage('MembershipHero.avif');

    const defaultBenefits = [
      'Priority booking access 6 months in advance',
      '10% off all stays, year-round',
      'Complimentary late check-out',
      'Exclusive invitations to community events'
    ];

    const defaultSteps = [
      { _key: 'step1', _type: 'object', title: 'Inquire', description: 'Contact our team via email or phone to express your interest.' },
      { _key: 'step2', _type: 'object', title: 'Connect', description: "We'll schedule a brief call to discuss your preferences." },
      { _key: 'step3', _type: 'object', title: 'Welcome', description: 'Receive your digital membership card and booking codes.' }
    ];

    const patchData = {
      'hero.subtitle': 'Join our exclusive community of nature lovers and luxury seekers.',
      'leftPanel.body': 'Members enjoy exclusive perks, priority booking windows, and discounted rates across all our luxury properties.',
      'leftPanel.benefits': defaultBenefits,
      'leftPanel.quote': "East Pointe isn't just a place to stay; it's a place to belong.",
      'rightPanel.body': 'We are currently accepting a limited number of new families into the East Pointe community. To ensure the privacy and quality of our retreats, we handle all applications personally.',
      'rightPanel.steps': defaultSteps
    };

    if (heroImg) patchData['hero.image'] = heroImg;

    for (const docId of ['membershipPage', 'drafts.membershipPage']) {
      console.log(`Updating ${docId}...`);
      const doc = await client.getDocument(docId).catch(() => null);
      if (doc) {
        await client
          .patch(docId)
          .setIfMissing({
            hero: { title: 'Membership' },
            leftPanel: { label: 'The Inner Circle', title: 'Why Join East Pointe?' },
            rightPanel: { title: 'Become a Member' }
          })
          .set(patchData)
          .commit();
        console.log(`${docId} updated successfully.`);
      } else {
        if (docId === 'membershipPage') {
          await client.create({
            _id: 'membershipPage',
            _type: 'membershipPage',
            hero: { title: 'Membership', subtitle: patchData['hero.subtitle'], image: heroImg },
            leftPanel: { label: 'The Inner Circle', title: 'Why Join East Pointe?', body: patchData['leftPanel.body'], benefits: patchData['leftPanel.benefits'], quote: patchData['leftPanel.quote'] },
            rightPanel: { title: 'Become a Member', body: patchData['rightPanel.body'], steps: patchData['rightPanel.steps'] }
          });
          console.log(`Created membershipPage successfully.`);
        }
      }
    }
    console.log('All Membership updates done!');
  } catch (error) {
    console.error('Error updating Sanity:', error);
  }
}

updateSanity();
