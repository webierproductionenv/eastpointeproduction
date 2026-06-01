import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // --- HERO ---
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'East Pointe' },
        { name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Lake Cabin Experience' },
        { name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } },
      ],
    }),

    // --- PHILOSOPHY ---
    defineField({
      name: 'philosophy',
      title: 'Philosophy Section',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string', initialValue: 'Our Philosophy' },
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Discover the perfect lake escape' },
        { name: 'highlightedText', title: 'Highlighted/Italic Text', type: 'string', initialValue: 'perfect lake escape' },
        { name: 'body', title: 'Body Text', type: 'text' },
        { name: 'linkText', title: 'Link Text', type: 'string', initialValue: 'Explore Our Philosophy' },
        { name: 'linkUrl', title: 'Link URL', type: 'string', initialValue: '/cabins' },
      ],
    }),

    // --- CAROUSEL ---
    defineField({
      name: 'carouselItems',
      title: 'Featured Cards Carousel',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'linkUrl', title: 'Link URL', type: 'string' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name: Star, Wind, Users, Mountain',
              options: {
                list: [
                  { title: 'Star', value: 'Star' },
                  { title: 'Wind', value: 'Wind' },
                  { title: 'Users', value: 'Users' },
                  { title: 'Mountain', value: 'Mountain' },
                  { title: 'Anchor', value: 'Anchor' },
                  { title: 'Map', value: 'Map' },
                  { title: 'ShieldCheck', value: 'ShieldCheck' },
                  { title: 'Heart', value: 'Heart' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
    }),

    // --- IMMERSIVE SECTION (Map + Beyond) ---
    defineField({
      name: 'immersiveSection',
      title: 'Immersive Section (Map + Beyond)',
      type: 'object',
      fields: [
        { name: 'mapImage', title: 'Map Image', type: 'image', options: { hotspot: true } },
        { name: 'label', title: 'Label', type: 'string', initialValue: 'The Surroundings' },
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Beyond the Cabin' },
        { name: 'body', title: 'Body Text', type: 'text' },
        { name: 'linkText', title: 'Link Text', type: 'string', initialValue: 'Discover the Area' },
        { name: 'linkUrl', title: 'Link URL', type: 'string', initialValue: '/beyond' },
      ],
    }),

    // --- CURATED EXPERIENCES ---
    defineField({
      name: 'experiences',
      title: 'Curated Experiences Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Curated Experiences' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'items',
          title: 'Experience Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'category', title: 'Category Label', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'string' },
                { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
                {
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Fish', value: 'Fish' },
                      { title: 'Anchor', value: 'Anchor' },
                      { title: 'Mountain', value: 'Mountain' },
                      { title: 'Wind', value: 'Wind' },
                    ],
                  },
                },
              ],
              preview: {
                select: { title: 'title', media: 'image' },
              },
            },
          ],
        },
        { name: 'viewAllText', title: 'View All Button Text', type: 'string', initialValue: 'View All Activities' },
        { name: 'viewAllLink', title: 'View All Link URL', type: 'string', initialValue: '/beyond' },
      ],
    }),

    // --- TESTIMONIALS ---
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Guest Stories' },
      ],
    }),

    // --- LOCATION ---
    defineField({
      name: 'locationSection',
      title: 'Location Section',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string', initialValue: 'The Location' },
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Nestled in Nature' },
        { name: 'locationName', title: 'Location Name', type: 'string', initialValue: 'Lake Lafayette' },
        { name: 'locationAddress', title: 'Location Address', type: 'string', initialValue: 'Odessa, Missouri 64076' },
        { name: 'body', title: 'Body Text', type: 'text' },
        {
          name: 'distances',
          title: 'Distance Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'time', title: 'Time/Distance', type: 'string' },
                { name: 'destination', title: 'Destination', type: 'string' },
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Car', value: 'Car' },
                      { title: 'Plane', value: 'Plane' },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    }),

    // --- AMENITIES PREVIEW ---
    defineField({
      name: 'amenitiesPreview',
      title: 'Amenities Preview Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'The East Pointe Standard' },
        {
          name: 'items',
          title: 'Preview Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'string' },
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Star', value: 'Star' },
                      { title: 'Wind', value: 'Wind' },
                      { title: 'ShieldCheck', value: 'ShieldCheck' },
                      { title: 'Users', value: 'Users' },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    }),

    // --- CTA ---
    defineField({
      name: 'ctaSection',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Ready to Escape?' },
        { name: 'subtitle', title: 'Subtitle', type: 'text' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
        { name: 'primaryButtonText', title: 'Primary Button Text', type: 'string', initialValue: 'Book Your Stay' },
        { name: 'primaryButtonLink', title: 'Primary Button Link', type: 'string', initialValue: '/cabins' },
        { name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string', initialValue: 'Become a Member' },
        { name: 'secondaryButtonLink', title: 'Secondary Button Link', type: 'string', initialValue: '/family' },
      ],
    }),

    // --- SEO ---
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'title', title: 'Meta Title', type: 'string' },
        { name: 'description', title: 'Meta Description', type: 'text' },
        { name: 'image', title: 'OG Image', type: 'image' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
