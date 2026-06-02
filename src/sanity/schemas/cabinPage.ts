import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cabinPage',
  title: 'Cabins Page',
  type: 'document',
  // Group fields into beautiful tabs for a cleaner editing experience
  groups: [
    { name: 'hero', title: 'Hero Banner' },
    { name: 'content', title: 'Introduction & Map' },
    { name: 'media', title: 'Video Tour' },
    { name: 'seo', title: 'SEO Settings' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      description: 'The main promotional banner displayed at the top of the cabins page.',
      fields: [
        { name: 'title', title: 'Hero Title', type: 'string', initialValue: 'Lake Cabin Collection' },
        { name: 'subtitle', title: 'Hero Subtitle', type: 'text' },
        { 
          name: 'image', 
          title: 'Hero Background Image', 
          type: 'image', 
          options: { hotspot: true },
          description: 'A striking background photograph showing the collection of cabins.'
        },
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Introductory Statement',
      type: 'object',
      group: 'content',
      description: 'Welcome text that greets users as they begin exploring the cabin catalogue.',
      fields: [
        { name: 'label', title: 'Section Small Label', type: 'string', initialValue: 'Our Portfolio' },
        { name: 'title', title: 'Section Main Heading', type: 'string', initialValue: 'Find Your Perfect Escape' },
        { name: 'body', title: 'Description Paragraph', type: 'text' },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Aerial Tour Video Link',
      type: 'url',
      group: 'media',
      description: 'The YouTube, Vimeo, or raw MP4 video URL showing a beautiful aerial overview of the cabins.',
    }),
    defineField({
      name: 'videoPoster',
      title: 'Video Thumbnail Cover Image',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
      description: 'The still photo shown to guests before they hit "Play" on the tour video.',
    }),
    defineField({
      name: 'mapImage',
      title: 'Property Overlay Map Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
      description: 'A beautiful visual map illustrating the positions / locations of all cabins on the lake.',
    }),
    defineField({
      name: 'comeSeeUs',
      title: 'Come See Us Callout',
      type: 'object',
      group: 'content',
      description: 'An invitation section encouraging visitors to schedule a tour or booking.',
      fields: [
        { name: 'title', title: 'Heading Title', type: 'string', initialValue: 'Come See Us' },
        { name: 'subtitle', title: 'Sub-heading Caption', type: 'text' },
        { name: 'body', title: 'Section Description Text', type: 'text' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      description: 'Search engine optimization options for this page.',
      fields: [
        { name: 'title', title: 'Meta Page Title', type: 'string' },
        { name: 'description', title: 'Meta Page Description', type: 'text' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Cabins Index Page Settings' }
    },
  },
})

