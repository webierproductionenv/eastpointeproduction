import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Guest Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'location', title: 'Guest Location', type: 'string' }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({ name: 'rating', title: 'Star Rating (1-5)', type: 'number', initialValue: 5, validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'location' } },
})
