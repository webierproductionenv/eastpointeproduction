import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'eastpointe',
  title: 'East Pointe CMS',

  // ⚠️ REPLACE with your Sanity project ID from sanity.io/manage
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Site-wide settings
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),

            S.divider(),

            // Singleton pages
            S.listItem()
              .title('Home Page')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            S.listItem()
              .title('Cabins Page')
              .child(
                S.document()
                  .schemaType('cabinPage')
                  .documentId('cabinPage')
              ),
            S.listItem()
              .title('Amenities Page')
              .child(
                S.document()
                  .schemaType('amenitiesPage')
                  .documentId('amenitiesPage')
              ),
            S.listItem()
              .title('Community Page')
              .child(
                S.document()
                  .schemaType('communityPage')
                  .documentId('communityPage')
              ),
            S.listItem()
              .title('Explore Page')
              .child(
                S.document()
                  .schemaType('explorePage')
                  .documentId('explorePage')
              ),
            S.listItem()
              .title('Membership Page')
              .child(
                S.document()
                  .schemaType('membershipPage')
                  .documentId('membershipPage')
              ),

            S.divider(),

            // Repeatable document types
            S.listItem()
              .title('Cabins')
              .schemaType('cabin')
              .child(S.documentTypeList('cabin').title('All Cabins')),

            S.listItem()
              .title('Amenities')
              .schemaType('amenity')
              .child(S.documentTypeList('amenity').title('All Amenities')),

            S.listItem()
              .title('Testimonials')
              .schemaType('testimonial')
              .child(S.documentTypeList('testimonial').title('All Testimonials')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
