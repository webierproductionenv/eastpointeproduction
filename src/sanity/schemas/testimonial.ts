import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Guest Testimonial',
  type: 'document',
  fields: [
    defineField({ 
      name: 'name', 
      title: 'Guest Name', 
      type: 'string', 
      description: 'First and last name of the reviewer (e.g. Sarah & Michael J.).',
      validation: (Rule) => Rule.required() 
    }),
    defineField({ 
      name: 'location', 
      title: 'Guest Location', 
      type: 'string',
      description: 'Where the guest is from (e.g. Kansas City, MO).',
    }),
    defineField({ 
      name: 'quote', 
      title: 'Quote / Testimonial Text', 
      type: 'text', 
      description: 'The detailed review paragraph written by the guest.',
      validation: (Rule) => Rule.required() 
    }),
    defineField({ 
      name: 'rating', 
      title: 'Star Rating (1-5)', 
      type: 'number', 
      initialValue: 5, 
      description: 'Review score (1 to 5 stars max).',
      validation: (Rule) => Rule.min(1).max(5) 
    }),
    defineField({ 
      name: 'order', 
      title: 'Display Sort Order', 
      type: 'number',
      description: 'Lower values (e.g., 1, 2) display first in the testimonials carousel.',
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'location' } },
})

