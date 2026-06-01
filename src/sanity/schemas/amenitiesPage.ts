import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'amenitiesPage',
  title: 'Amenities Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Guest Perks' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Intro Section',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string', initialValue: 'Our Amenities' },
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Comfort & Convenience' },
        { name: 'body', title: 'Body Text', type: 'text' },
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
  preview: {
    prepare() {
      return { title: 'Amenities Page' }
    },
  },
})
