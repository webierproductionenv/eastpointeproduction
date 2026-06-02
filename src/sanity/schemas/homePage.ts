import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  // Group the massive list of sections into clean tabs for easy editing
  groups: [
    { name: 'hero', title: 'Hero Banner' },
    { name: 'about', title: 'Philosophy & Carousel' },
    { name: 'immersive', title: 'Surroundings & Map' },
    { name: 'experiences', title: 'Experiences & Amenities' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'cta', title: 'Call To Action' },
    { name: 'seo', title: 'SEO Settings' },
  ],
  fields: [
    // --- HERO ---
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      description: 'The main introductory banner section at the top of the homepage.',
      fields: [
        { name: 'title', title: 'Banner Title', type: 'string', initialValue: 'East Pointe' },
        { name: 'subtitle', title: 'Banner Subtitle', type: 'string', initialValue: 'Lake Cabin Experience' },
        { 
          name: 'image', 
          title: 'Hero Background Image', 
          type: 'image', 
          options: { hotspot: true },
          description: 'A beautiful landscape or cabin photo. Recommended size: 1920x1080px (WebP recommended).'
        },
      ],
    }),

    // --- PHILOSOPHY ---
    defineField({
      name: 'philosophy',
      title: 'Philosophy Section',
      type: 'object',
      group: 'about',
      description: 'Brief text section highlighting your core values and hospitality philosophy.',
      fields: [
        { name: 'label', title: 'Section Label', type: 'string', initialValue: 'Our Philosophy' },
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Discover the perfect lake escape' },
        { name: 'highlightedText', title: 'Highlighted / Italic Text', type: 'string', initialValue: 'perfect lake escape', description: 'Specify which words in the title should be styled as italic/gold accent.' },
        { name: 'body', title: 'Body Text Description', type: 'text', description: 'Write a compelling paragraph detailing what makes East Pointe special.' },
        { name: 'linkText', title: 'Button Label', type: 'string', initialValue: 'Explore Our Philosophy' },
        { name: 'linkUrl', title: 'Button Redirection Link', type: 'string', initialValue: '/cabins', description: 'Use relative paths (e.g. /cabins) or absolute URLs.' },
      ],
    }),

    // --- CAROUSEL ---
    defineField({
      name: 'carouselItems',
      title: 'Featured Cards Carousel',
      type: 'array',
      group: 'about',
      description: 'Cards that users can swipe / slide through in the philosophy section.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Card Title', type: 'string' },
            { name: 'description', title: 'Card Description', type: 'text' },
            { name: 'linkUrl', title: 'Click Redirection Link', type: 'string' },
            { name: 'image', title: 'Featured Card Image', type: 'image', options: { hotspot: true } },
            {
              name: 'icon',
              title: 'Visual Icon Name',
              type: 'string',
              description: 'Pick an icon symbol to represent this feature card.',
              options: {
                list: [
                  { title: 'Star', value: 'Star' },
                  { title: 'Wind', value: 'Wind' },
                  { title: 'Users', value: 'Users' },
                  { title: 'Mountain', value: 'Mountain' },
                  { title: 'Anchor', value: 'Anchor' },
                  { title: 'Map', value: 'Map' },
                  { title: 'Shield Check', value: 'ShieldCheck' },
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
      group: 'immersive',
      description: 'Large interactive section introducing the broader surroundings.',
      fields: [
        { name: 'mapImage', title: 'Visual Property Map Image', type: 'image', options: { hotspot: true } },
        { name: 'label', title: 'Section Label', type: 'string', initialValue: 'The Surroundings' },
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Beyond the Cabin' },
        { name: 'body', title: 'Section Body Description Text', type: 'text' },
        { name: 'linkText', title: 'Button Label', type: 'string', initialValue: 'Discover the Area' },
        { name: 'linkUrl', title: 'Button Redirection Link', type: 'string', initialValue: '/beyond' },
      ],
    }),

    // --- CURATED EXPERIENCES ---
    defineField({
      name: 'experiences',
      title: 'Curated Experiences Section',
      type: 'object',
      group: 'experiences',
      description: 'Highlight beautiful local activities (fishing, boating, hiking, etc.).',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Curated Experiences' },
        { name: 'subtitle', title: 'Section Subtitle / Intro Description', type: 'text' },
        {
          name: 'items',
          title: 'Experience Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'category', title: 'Category Label (e.g. WATER, ADVENTURE)', type: 'string' },
                { name: 'title', title: 'Activity Title', type: 'string' },
                { name: 'description', title: 'Activity Description Paragraph', type: 'string' },
                { name: 'image', title: 'Activity Card Image', type: 'image', options: { hotspot: true } },
                {
                  name: 'icon',
                  title: 'Activity Symbol Icon',
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
        { name: 'viewAllText', title: 'View All Button Label', type: 'string', initialValue: 'View All Activities' },
        { name: 'viewAllLink', title: 'View All Button Redirection Link', type: 'string', initialValue: '/beyond' },
      ],
    }),

    // --- TESTIMONIALS ---
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section Settings',
      type: 'object',
      group: 'testimonials',
      description: 'Configure details for guest reviews list component.',
      fields: [
        { name: 'title', title: 'Section Main Heading', type: 'string', initialValue: 'Guest Stories' },
      ],
    }),

    // --- LOCATION ---
    defineField({
      name: 'locationSection',
      title: 'Location & Distances',
      type: 'object',
      group: 'immersive',
      description: 'Display physical location information and driving / travel times.',
      fields: [
        { name: 'label', title: 'Section Label', type: 'string', initialValue: 'The Location' },
        { name: 'title', title: 'Section Main Title', type: 'string', initialValue: 'Nestled in Nature' },
        { name: 'locationName', title: 'Location Area Name (e.g. Lake Lafayette)', type: 'string', initialValue: 'Lake Lafayette' },
        { name: 'locationAddress', title: 'City / State Text Line', type: 'string', initialValue: 'Odessa, Missouri 64076' },
        { name: 'body', title: 'Location Section Paragraph', type: 'text' },
        {
          name: 'distances',
          title: 'Distance/Travel Time Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'time', title: 'Travel Duration (e.g. 45 Mins Drive)', type: 'string' },
                { name: 'destination', title: 'Destination Name (e.g. Kansas City)', type: 'string' },
                {
                  name: 'icon',
                  title: 'Travel Mode Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Car / Drive', value: 'Car' },
                      { title: 'Plane / Fly', value: 'Plane' },
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
      group: 'experiences',
      description: 'Showcase highlights of the quality services or assets available at East Pointe.',
      fields: [
        { name: 'title', title: 'Section Main Heading', type: 'string', initialValue: 'The East Pointe Standard' },
        {
          name: 'items',
          title: 'Amenities Highlight Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Amenity Title', type: 'string' },
                { name: 'description', title: 'Amenity Description Paragraph', type: 'string' },
                {
                  name: 'icon',
                  title: 'Amenity Icon Indicator',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Star', value: 'Star' },
                      { title: 'Wind', value: 'Wind' },
                      { title: 'Shield Check', value: 'ShieldCheck' },
                      { title: 'Users / Family', value: 'Users' },
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
      group: 'cta',
      description: 'Earthy, gold bottom banner inviting guests to complete reservations or memberships.',
      fields: [
        { name: 'title', title: 'CTA Main Heading', type: 'string', initialValue: 'Ready to Escape?' },
        { name: 'subtitle', title: 'CTA Subheading Intro text', type: 'text' },
        { 
          name: 'backgroundImage', 
          title: 'CTA Background Image', 
          type: 'image', 
          options: { hotspot: true },
          description: 'A beautiful ambient photo to display behind the CTA banner.'
        },
        { name: 'primaryButtonText', title: 'Primary Button Label', type: 'string', initialValue: 'Book Your Stay' },
        { name: 'primaryButtonLink', title: 'Primary Button Redirection URL', type: 'string', initialValue: '/cabins' },
        { name: 'secondaryButtonText', title: 'Secondary Button Label', type: 'string', initialValue: 'Become a Member' },
        { name: 'secondaryButtonLink', title: 'Secondary Button Redirection URL', type: 'string', initialValue: '/family' },
      ],
    }),

    // --- SEO ---
    defineField({
      name: 'seo',
      title: 'SEO & Social Settings',
      type: 'object',
      group: 'seo',
      description: 'Control how this homepage appears in search engine rankings and social media shares.',
      fields: [
        { name: 'title', title: 'Meta Page Title', type: 'string', description: 'Recommended length: 50-60 characters. Appears in browser tab.' },
        { name: 'description', title: 'Meta Page Description', type: 'text', description: 'Recommended length: 150-160 characters. Appears in Google search results snippets.' },
        { name: 'image', title: 'OG Open Graph Image', type: 'image', description: 'Thumbnail image shown when this homepage link is shared on WhatsApp, Facebook, iMessage, etc.' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page Content' }
    },
  },
})

