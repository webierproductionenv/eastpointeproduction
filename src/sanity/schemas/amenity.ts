import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'amenity',
  title: 'Amenity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Amenity Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name for this amenity',
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
      title: 'Display Order',
      type: 'number',
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
