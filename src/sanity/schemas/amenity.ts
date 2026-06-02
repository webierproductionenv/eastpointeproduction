import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'amenity',
  title: 'Amenity Item',
  type: 'document',
  // Group fields into neat tabs
  groups: [
    { name: 'basic', title: 'Amenity Details' },
    { name: 'visual', title: 'Display Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Amenity Title',
      type: 'string',
      group: 'basic',
      description: 'The name of the amenity (e.g. Free High-Speed Wi-Fi, Private Lakeside Dock).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'basic',
      description: 'A brief sentence explaining this amenity to guests.',
    }),
    defineField({
      name: 'icon',
      title: 'Visual Icon Symbol',
      type: 'string',
      group: 'visual',
      description: 'Select an icon to visually represent this amenity in features lists.',
      options: {
        list: [
          { title: 'Car (Parking)', value: 'Car' },
          { title: 'Wind (Cooling)', value: 'Wind' },
          { title: 'Wifi', value: 'Wifi' },
          { title: 'Utensils (Kitchen)', value: 'Utensils' },
          { title: 'Bed (Linens)', value: 'Bed' },
          { title: 'Tv (Smart TV)', value: 'Tv' },
          { title: 'Flame (Heating/Fire)', value: 'Flame' },
          { title: 'Coffee', value: 'Coffee' },
          { title: 'Key (Check-in)', value: 'Key' },
          { title: 'LogOut (Checkout)', value: 'LogOut' },
          { title: 'Fish (Fishing)', value: 'Fish' },
          { title: 'Star', value: 'Star' },
          { title: 'ShieldCheck', value: 'ShieldCheck' },
          { title: 'Users', value: 'Users' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Sort Order',
      type: 'number',
      group: 'visual',
      description: 'Lower ranking numbers (e.g., 1, 2) display first in lists.',
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
      title: 'title',
      subtitle: 'icon',
    },
  },
})

