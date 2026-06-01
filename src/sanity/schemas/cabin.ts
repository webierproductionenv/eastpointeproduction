import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cabin',
  title: 'Cabin',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Cabin Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'sleeps',
      title: 'Sleeps (guests)',
      type: 'string',
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'string',
    }),
    defineField({
      name: 'baths',
      title: 'Bathrooms',
      type: 'number',
    }),
    defineField({
      name: 'sqFt',
      title: 'Square Footage',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'Available' },
          { title: 'Coming Soon', value: 'Coming Soon' },
          { title: 'Unavailable', value: 'Unavailable' },
        ],
      },
      initialValue: 'Available',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Odessa, MO',
    }),
    defineField({
      name: 'bookingLink',
      title: 'Booking URL',
      type: 'url',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'features',
      title: 'Features / Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'sleepingArrangements',
      title: 'Sleeping Arrangements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'room', title: 'Room Name', type: 'string' },
            { name: 'bed', title: 'Bed Type', type: 'string' },
          ],
          preview: {
            select: { title: 'room', subtitle: 'bed' },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
      media: 'images.0',
    },
  },
})
