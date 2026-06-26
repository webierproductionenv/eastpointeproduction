import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'explorePage',
  title: 'Explore Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Explore the Region' },
        { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Your ideal lake getaway, just a quick drive from the heart of Kansas City.' },
        { name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Intro Section',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string', initialValue: 'The Best of Both Worlds' },
        { name: 'title', title: 'Title', type: 'string', initialValue: 'A Quick Drive from KC' },
        { name: 'body1', title: 'Body Paragraph 1', type: 'text', initialValue: "Escape the hustle and bustle of the city and enjoy a stay at our charming lake cabins in Odessa, MO. Perfectly situated just outside the Kansas City Metropolitan area, East Pointe offers the ultimate compromise: rugged seclusion when you want it, and city excitement when you need it." },
        { name: 'body2', title: 'Body Paragraph 2', type: 'text', initialValue: "Whether you are in town for a Chiefs game, a Royals match, or simply exploring the rich culture of the Midwest, our cabins serve as your adventurous basecamp." },
        { name: 'image', title: 'Side Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'quoteSection',
      title: 'Quote Section',
      type: 'object',
      fields: [
        { name: 'quote', title: 'Quote Text', type: 'text', initialValue: "Experience the tranquility of lakeside living while maintaining easy access to the city's excitement." },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'discoverSection',
      title: 'Discover KC Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Discover Kansas City' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text', initialValue: "Explore the vibrant city known for its rich history, cultural attractions, and exciting entertainment options. From world-class BBQ to championship sports, it's all within reach." },
        {
          name: 'cards',
          title: 'Discovery Cards',
          type: 'array',
          initialValue: [
            { _key: 'card1', category: 'Championship City', title: 'Chiefs & Royals', description: 'Experience the thrill of Arrowhead Stadium or a classic ballgame at Kauffman Stadium. A short drive for an unforgettable game day.', icon: 'Trophy', isWide: false },
            { _key: 'card2', category: 'History & Arts', title: 'Union Station & Museums', description: 'Visit the iconic Union Station, the beautiful Nelson-Atkins Museum of Art, and the National WWI Museum.', icon: 'Building2', isWide: false },
            { _key: 'card3', category: 'Nightlife', title: 'Power & Light District', description: 'Immerse yourself in the rhythm of the 18th & Vine Jazz District or the vibrant energy of the Power & Light District.', icon: 'Music', isWide: false },
            { _key: 'card4', category: 'Shopping & Dining', title: 'Country Club Plaza', description: 'Enjoy premier shopping and indulge in legendary Kansas City BBQ at renowned restaurants throughout the city.', icon: 'ShoppingBag', isWide: false },
            { _key: 'card5', category: 'Nature & Flora', title: 'Powell Gardens', description: "Kansas City's premier botanical garden, set on 970 acres of lush meadows and diverse gardens just minutes away.", icon: 'Leaf', isWide: true }
          ],
          of: [{
            type: 'object',
            fields: [
              { name: 'category', title: 'Category', type: 'string' },
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'description', title: 'Description', type: 'text' },
              { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
              { name: 'icon', title: 'Icon', type: 'string', options: { list: [{ title: 'Trophy', value: 'Trophy' }, { title: 'Building2', value: 'Building2' }, { title: 'Music', value: 'Music' }, { title: 'ShoppingBag', value: 'ShoppingBag' }, { title: 'Leaf', value: 'Leaf' }] } },
              { name: 'isWide', title: 'Wide Card (spans 2 columns)', type: 'boolean', initialValue: false },
            ],
            preview: { select: { title: 'title', media: 'image' } },
          }],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'title', title: 'Meta Title', type: 'string' },
        { name: 'description', title: 'Meta Description', type: 'text' },
      ],
    }),
  ],
  preview: { prepare() { return { title: 'Explore Page' } } },
})
