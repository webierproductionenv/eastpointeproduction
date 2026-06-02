import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Organize settings into clean, intuitive tabs (field groups)
  groups: [
    { name: 'general', title: 'General Info' },
    { name: 'contact', title: 'Contact & Location' },
    { name: 'social', title: 'Social Media' },
    { name: 'footer', title: 'Footer & Meta' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'EAST POINTE',
      group: 'general',
      description: 'The main name of your collection / resort (appears in headers and metadata).',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Lake Cabin Experience',
      group: 'general',
      description: 'The short catchy subtitle displayed beneath the main brand name.',
    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo Image',
      type: 'image',
      options: { hotspot: true },
      group: 'general',
      description: 'Upload your high-resolution brand logo (SVG or WebP/PNG recommended).',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email Address',
      type: 'string',
      initialValue: 'nick@eastpointekc.com',
      group: 'contact',
      description: 'The primary customer support email address.',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone Number',
      type: 'string',
      initialValue: '(816) 255-8683',
      group: 'contact',
      description: 'Formatted phone number shown on the website (e.g. (816) 255-8683).',
    }),
    defineField({
      name: 'phoneLink',
      title: 'Phone Dial Link',
      type: 'string',
      initialValue: '+18162558683',
      group: 'contact',
      description: 'Raw dial link for mobile buttons. MUST start with country code (e.g., +18162558683).',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'object',
      group: 'contact',
      description: 'The physical location of the cabins.',
      fields: [
        { name: 'line1', title: 'Street Address Line 1', type: 'string', initialValue: 'Lake Lafayette' },
        { name: 'city', title: 'City', type: 'string', initialValue: 'Odessa' },
        { name: 'state', title: 'State / Province', type: 'string', initialValue: 'MO' },
        { name: 'zip', title: 'ZIP / Postal Code', type: 'string', initialValue: '64076' },
      ],
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Directions URL',
      type: 'url',
      initialValue: 'https://www.google.com/maps/dir/?api=1&destination=38.9458417,-93.9713331',
      group: 'contact',
      description: 'Direct link to Google Maps driving directions (opens in new tab when clicked).',
    }),
    defineField({
      name: 'googleMapsEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      group: 'contact',
      description: 'The "src" attribute from the Google Maps iframe embed code (used to render the visual map).',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Profiles',
      type: 'object',
      group: 'social',
      description: 'Full profile URLs for social networks.',
      fields: [
        { name: 'instagram', title: 'Instagram Profile URL', type: 'url' },
        { name: 'facebook', title: 'Facebook Page URL', type: 'url' },
        { name: 'twitter', title: 'Twitter / X Profile URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Bio Description',
      type: 'text',
      initialValue: 'Redefining the cabin experience. Where luxury meets wilderness, and guests become family. Experience nature without compromise.',
      group: 'footer',
      description: 'A brief description paragraph displayed in the footer area of all pages.',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Footer Line',
      type: 'string',
      initialValue: 'East Pointe Collections. All rights reserved.',
      group: 'footer',
      description: 'Custom copyright text printed at the very bottom of the website pages.',
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Operating Hours',
      type: 'string',
      initialValue: 'We are open year round!',
      group: 'footer',
      description: 'Display label stating when your customer support / reception is active.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})

