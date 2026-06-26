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
      description: 'Add or remove event cards here. Each card will be displayed on the Community page.',
      type: 'array',
      initialValue: [
        {
          _type: 'eventCard',
          title: 'Intimate Weddings',
          description: 'Say "I do" with the lake as your witness. Our grounds provide a stunning, natural cathedral for ceremonies up to 50 guests.',
          icon: 'Heart',
          features: ['Lakeside Ceremonies', 'Bridal Cabin Packages', 'Photography Access']
        },
        {
          _type: 'eventCard',
          title: 'Family Reunions',
          description: 'Reconnect without distractions. Book multiple cabins to keep the family close while giving everyone their own private space.',
          icon: 'Users',
          features: ['Communal Fire Pits', 'Large Group Dining', 'Safe Kids Play Areas']
        },
        {
          _type: 'eventCard',
          title: 'Corporate Retreats',
          description: 'Step away from the boardroom. Our inspiring environment fosters creativity, team bonding, and strategic thinking.',
          icon: 'Briefcase',
          features: ['High-Speed Wifi', 'Team Building Activities', 'Catering Partners']
        }
      ],
      of: [{ type: 'eventCard' }],
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
