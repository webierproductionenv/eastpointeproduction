import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'membershipPage',
  title: 'Membership Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Membership' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'image', title: 'Hero Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'leftPanel',
      title: 'Left Panel (Why Join)',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string', initialValue: 'The Inner Circle' },
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Why Join East Pointe?' },
        { name: 'body', title: 'Body Text', type: 'text' },
        { name: 'benefits', title: 'Benefits List', type: 'array', of: [{ type: 'string' }] },
        { name: 'quote', title: 'Bottom Quote', type: 'string' },
      ],
    }),
    defineField({
      name: 'rightPanel',
      title: 'Right Panel (Steps)',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Become a Member' },
        { name: 'body', title: 'Body Text', type: 'text' },
        {
          name: 'steps',
          title: 'Process Steps',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Step Title', type: 'string' },
              { name: 'description', title: 'Step Description', type: 'text' },
            ],
            preview: { select: { title: 'title' } },
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
  preview: { prepare() { return { title: 'Membership Page' } } },
})
