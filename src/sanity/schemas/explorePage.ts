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
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
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
        { name: 'body1', title: 'Body Paragraph 1', type: 'text' },
        { name: 'body2', title: 'Body Paragraph 2', type: 'text' },
        { name: 'image', title: 'Side Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'quoteSection',
      title: 'Quote Section',
      type: 'object',
      fields: [
        { name: 'quote', title: 'Quote Text', type: 'text' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'discoverSection',
      title: 'Discover KC Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Discover Kansas City' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'cards',
          title: 'Discovery Cards',
          type: 'array',
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
