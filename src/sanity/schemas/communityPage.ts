import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'communityPage',
  title: 'Community Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Gather & Celebrate' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Intro Section',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string', initialValue: 'Hosted at East Pointe' },
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Unforgettable Gatherings' },
        { name: 'body', title: 'Body Text', type: 'text' },
      ],
    }),
    defineField({
      name: 'eventCards',
      title: 'Event Type Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'icon', title: 'Icon', type: 'string', options: { list: [{ title: 'Heart', value: 'Heart' }, { title: 'Users', value: 'Users' }, { title: 'Briefcase', value: 'Briefcase' }] } },
          { name: 'features', title: 'Features List', type: 'array', of: [{ type: 'string' }] },
        ],
        preview: { select: { title: 'title', media: 'image' } },
      }],
    }),
    defineField({
      name: 'concierge',
      title: 'Concierge Section',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string', initialValue: 'Personal Concierge' },
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Start Planning Your Event' },
        { name: 'body', title: 'Body Text', type: 'text' },
        { name: 'bulletPoints', title: 'Bullet Points', type: 'array', of: [{ type: 'string' }] },
        { name: 'officeHours', title: 'Office Hours Text', type: 'string', initialValue: 'Office Hours: Mon-Fri, 9am - 5pm CST' },
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
  preview: { prepare() { return { title: 'Community Page' } } },
})
