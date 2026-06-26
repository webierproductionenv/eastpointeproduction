import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'jlknt03a',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-03-07',
  token: 'skDdcM1KRLhkCEonjUIipuCpEmrWm61pgwM3sosKH2zDvuyE8zYeuIU9UfANr3onepiW9gZmmaMAyTPRrg87R4QDLK0cNvmMJSOvmZndXpRMAjySDzkEaKTR4CUhe05NrwkaVWVwOflZ5T2Vd5FyC1w7SW7QzCeAlqAZT2B39xOjn4K5Dipg'
});

const defaultEventCards = [
  {
    _key: 'item1',
    _type: 'eventCard',
    title: 'Intimate Weddings',
    description: 'Say "I do" with the lake as your witness. Our grounds provide a stunning, natural cathedral for ceremonies up to 50 guests.',
    icon: 'Heart',
    features: ['Lakeside Ceremonies', 'Bridal Cabin Packages', 'Photography Access']
  },
  {
    _key: 'item2',
    _type: 'eventCard',
    title: 'Family Reunions',
    description: 'Reconnect without distractions. Book multiple cabins to keep the family close while giving everyone their own private space.',
    icon: 'Users',
    features: ['Communal Fire Pits', 'Large Group Dining', 'Safe Kids Play Areas']
  },
  {
    _key: 'item3',
    _type: 'eventCard',
    title: 'Corporate Retreats',
    description: 'Step away from the boardroom. Our inspiring environment fosters creativity, team bonding, and strategic thinking.',
    icon: 'Briefcase',
    features: ['High-Speed Wifi', 'Team Building Activities', 'Catering Partners']
  }
];

async function updateSanity() {
  try {
    const defaultBody = "East Pointe isn't just for quiet getaways; it's a vibrant backdrop for your most important milestones. From intimate lakeside weddings to productive corporate retreats, our grounds offer the perfect blend of privacy and community.";
    
    // Update both published and draft to make sure it shows up for the user
    for (const docId of ['communityPage', 'drafts.communityPage']) {
      console.log(`Updating ${docId}...`);
      
      const doc = await client.getDocument(docId).catch(() => null);
      if (doc) {
        await client
          .patch(docId)
          .setIfMissing({ 
            'hero.subtitle': 'Create lasting memories in the heart of nature.',
            intro: { label: 'Hosted at East Pointe', title: 'Unforgettable Gatherings' },
            'concierge.body': "We don't believe in automated forms for your special moments. Every event at East Pointe is tailored specifically to your vision. Connect directly with our Events Coordinator to discuss availability, packages, and custom arrangements.",
            'concierge.bulletPoints': ['Custom layout planning', 'Vendor recommendations (Catering, Florals, etc.)', 'Group accommodation discounts']
          })
          .set({
            'hero.subtitle': 'Create lasting memories in the heart of nature.',
            'intro.body': defaultBody,
            eventCards: defaultEventCards,
            'concierge.body': "We don't believe in automated forms for your special moments. Every event at East Pointe is tailored specifically to your vision. Connect directly with our Events Coordinator to discuss availability, packages, and custom arrangements.",
            'concierge.bulletPoints': ['Custom layout planning', 'Vendor recommendations (Catering, Florals, etc.)', 'Group accommodation discounts']
          })
          .commit();
        console.log(`${docId} updated successfully.`);
      } else {
        if (docId === 'communityPage') {
           await client.create({
             _id: 'communityPage',
             _type: 'communityPage',
             intro: {
               label: 'Hosted at East Pointe',
               title: 'Unforgettable Gatherings',
               body: defaultBody
             },
             eventCards: defaultEventCards
           });
           console.log(`Created communityPage successfully.`);
        }
      }
    }
    console.log('All done!');
  } catch (error) {
    console.error('Error updating Sanity:', error);
  }
}

updateSanity();
