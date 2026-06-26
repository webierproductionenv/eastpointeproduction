import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cabin',
  title: 'Cabin Entry',
  type: 'document',
  // Group individual cabin specifications into beautiful tabs
  groups: [
    { name: 'basic', title: 'General Info' },
    { name: 'specs', title: 'Specifications' },
    { name: 'media', title: 'Gallery & Media' },
    { name: 'details', title: 'Features & Sleeping' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Cabin Name',
      type: 'string',
      group: 'basic',
      description: 'The unique name of this cabin (e.g. Cedar Ridge, Lakeview Lodge).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'basic',
      description: 'Unique address path identifier. Click "Generate" to automatically create from the Cabin Name.',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Sort Order',
      type: 'number',
      group: 'basic',
      description: 'Custom rank number for website list. Lower numbers (e.g., 1, 2, 3) appear first.',
    }),
    defineField({
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      group: 'basic',
      description: 'Select the current operational state of this cabin property.',
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
      title: 'Physical Location Label',
      type: 'string',
      group: 'basic',
      initialValue: 'Odessa, MO',
      description: 'Region or section of property (e.g. North Peninsula, Odessa, MO).',
    }),
    defineField({
      name: 'bookingLink',
      title: 'Booking Checkout URL',
      type: 'url',
      group: 'basic',
      description: 'Direct link to booking calendar checkouts (e.g., Airbnb, VRBO, or custom booking system).',
    }),
    defineField({
      name: 'sleeps',
      title: 'Max Occupancy (Guests)',
      type: 'string',
      group: 'specs',
      description: 'The total number of guest beds/spots (e.g. 6 guests, Up to 8).',
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms Count',
      type: 'string',
      group: 'specs',
      description: 'Number of dedicated bedroom rooms (e.g., 3 Bedrooms, Studio Loft).',
    }),
    defineField({
      name: 'baths',
      title: 'Bathrooms Count',
      type: 'number',
      group: 'specs',
      description: 'Number of restrooms (e.g., 1.5, 2, 3).',
    }),
    defineField({
      name: 'sqFt',
      title: 'Interior Square Footage',
      type: 'string',
      group: 'specs',
      description: 'Size of the cabin interior (e.g., 1,200 sq ft).',
    }),
    defineField({
      name: 'description',
      title: 'Overview Description',
      type: 'text',
      group: 'specs',
      description: 'An engaging, rich overview description describing the details, design, and environment of the cabin.',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Showcase Images',
      type: 'array',
      group: 'media',
      description: 'Upload high-quality visual photos of this cabin. You can rearrange them by dragging. Click "Add item" to upload more images.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Brief description of the image for accessibility and SEO.'
            }
          ]
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Special Amenities & Highlights',
      type: 'array',
      group: 'details',
      description: 'Bullet-point highlights of specific features (e.g. Outdoor Hot Tub, Stone Fireplace, Private Dock).',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'sleepingArrangements',
      title: 'Sleeping Room Configurations',
      type: 'array',
      group: 'details',
      description: 'Break down rooms and bed layouts to help guests plan their stay.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'room', title: 'Room / Area Name (e.g., Master Bedroom, Loft)', type: 'string' },
            { name: 'bed', title: 'Bed Specification (e.g., 1 King Bed, 2 Bunk Beds)', type: 'string' },
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

