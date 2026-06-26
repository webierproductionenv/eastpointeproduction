import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'eventCard',
  title: 'Event Card',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      description: 'Upload an image for this card.',
      options: { hotspot: true }
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Heart', value: 'Heart' },
          { title: 'Users', value: 'Users' },
          { title: 'Briefcase', value: 'Briefcase' }
        ]
      }
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [{ type: 'string' }]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
})
