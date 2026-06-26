const { createClient } = require('@sanity/client');
const c = createClient({
  projectId: 'jlknt03a',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

(async () => {
  const cabins = await c.fetch('*[_type == "cabin"]{_id, name, status}');
  console.log('Updating ' + cabins.length + ' cabins to Available...\n');
  for (const cab of cabins) {
    await c.patch(cab._id).set({ status: 'Available' }).commit();
    console.log('  ✅ ' + cab.name + ': ' + (cab.status || 'null') + ' → Available');
  }
  console.log('\n🎉 Done! All cabins set to Available.');
})();
