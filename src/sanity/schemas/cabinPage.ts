import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cabinPage',
  title: 'Cabins Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Lake Cabin Collection' },
        { name: 'subtitle', title: 'Subtitle', type: 'text' },
        { name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Intro Section',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string', initialValue: 'Our Portfolio' },
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Find Your Perfect Escape' },
        { name: 'body', title: 'Body Text', type: 'text' },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Aerial Tour Video URL',
      type: 'url',
    }),
    defineField({
      name: 'videoPoster',
      title: 'Video Poster Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mapImage',
      title: 'Property Map Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'comeSeeUs',
      title: 'Come See Us Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Come See Us' },
        { name: 'subtitle', title: 'Subtitle', type: 'text' },
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
      return { title: 'Cabins Page' }
    },
  },
})
