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
        { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Join our exclusive community of nature lovers and luxury seekers.' },
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
        { name: 'body', title: 'Body Text', type: 'text', initialValue: 'Members enjoy exclusive perks, priority booking windows, and discounted rates across all our luxury properties.' },
        { name: 'benefits', title: 'Benefits List', type: 'array', initialValue: ['Priority booking access 6 months in advance', '10% off all stays, year-round', 'Complimentary late check-out', 'Exclusive invitations to community events'], of: [{ type: 'string' }] },
        { name: 'quote', title: 'Bottom Quote', type: 'string', initialValue: "East Pointe isn't just a place to stay; it's a place to belong." },
      ],
    }),
    defineField({
      name: 'rightPanel',
      title: 'Right Panel (Steps)',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Become a Member' },
        { name: 'body', title: 'Body Text', type: 'text', initialValue: 'We are currently accepting a limited number of new families into the East Pointe community. To ensure the privacy and quality of our retreats, we handle all applications personally.' },
        {
          name: 'steps',
          title: 'Process Steps',
          type: 'array',
          initialValue: [
            { _key: 'step1', title: 'Inquire', description: 'Contact our team via email or phone to express your interest.' },
            { _key: 'step2', title: 'Connect', description: "We'll schedule a brief call to discuss your preferences." },
            { _key: 'step3', title: 'Welcome', description: 'Receive your digital membership card and booking codes.' }
          ],
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
