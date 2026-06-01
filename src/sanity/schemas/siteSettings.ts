import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'EAST POINTE',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Lake Cabin Experience',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'nick@eastpointekc.com',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
      initialValue: '(816) 255-8683',
    }),
    defineField({
      name: 'phoneLink',
      title: 'Phone Link (tel: format)',
      type: 'string',
      initialValue: '+18162558683',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        { name: 'line1', title: 'Line 1', type: 'string', initialValue: 'Lake Lafayette' },
        { name: 'city', title: 'City', type: 'string', initialValue: 'Odessa' },
        { name: 'state', title: 'State', type: 'string', initialValue: 'MO' },
        { name: 'zip', title: 'ZIP', type: 'string', initialValue: '64076' },
      ],
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Directions URL',
      type: 'url',
      initialValue: 'https://www.google.com/maps/dir/?api=1&destination=38.9458417,-93.9713331',
    }),
    defineField({
      name: 'googleMapsEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'twitter', title: 'Twitter/X URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      initialValue: 'Redefining the cabin experience. Where luxury meets wilderness, and guests become family. Experience nature without compromise.',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: 'East Pointe Collections. All rights reserved.',
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
      initialValue: 'We are open year round!',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
