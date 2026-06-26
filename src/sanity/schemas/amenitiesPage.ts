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
        { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: "We've thought of everything, so you don't have to." },
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
        { name: 'body', title: 'Body Text', type: 'text', initialValue: "Explore the fantastic amenities waiting for you in each cabin. We integrate thoughtful services to ensure your time with us is seamless from check-in to check-out. We can't wait for you to find your perfect getaway retreat with us!" },
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
