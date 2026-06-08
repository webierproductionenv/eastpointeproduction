import { defineConfig, buildLegacyTheme } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import BrandLogo from './components/BrandLogo'
import StudioNavbar from './components/StudioNavbar'
import { 
  Settings, 
  Home, 
  Compass, 
  Users, 
  Tent, 
  Sparkles, 
  Heart,
  FileText,
  Bookmark,
  Palmtree
} from 'lucide-react'
import { SANITY_PROJECT_ID, SANITY_DATASET } from '../lib/env'
import './studio.css'

// Build a custom luxury theme matching the East Pointe design language
export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': '#2c1e1a',           // Dark Brown
  '--white': '#fdfbf9',           // Warm Off-White Cream
  '--gray': '#8a7560',            // Warm Taupe Grey
  '--gray-base': '#8a7560',

  '--component-bg': '#fdfbf9',
  '--component-text-color': '#2c1e1a',

  /* Brand Colors */
  '--brand-primary': '#a67c52',    // Amber Gold

  /* Default buttons styling */
  '--default-button-color': '#8a7560',
  '--default-button-primary-color': '#a67c52',
  '--default-button-success-color': '#4a7c59',
  '--default-button-warning-color': '#d4a373',
  '--default-button-danger-color': '#a94442',

  /* Notification States */
  '--state-info-color': '#5c8098',
  '--state-success-color': '#4a7c59',
  '--state-warning-color': '#d4a373',
  '--state-danger-color': '#a94442',

  /* Navigation Bar overrides (Matches public site header) */
  '--main-navigation-color': '#2c1e1a',
  '--main-navigation-color--inverted': '#f5f0e6',

  /* Focus rings */
  '--focus-color': '#a67c52',
})

export default defineConfig({
  name: 'eastpointe',
  title: 'East Pointe CMS',
  icon: BrandLogo, // Custom logo for the workspace

  // Sanity Project ID & Dataset configuration
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  basePath: '/studio',

  // Custom Studio layout elements
  studio: {
    components: {
      navbar: StudioNavbar, // Premium custom navbar header with back button
    }
  },

  theme: myTheme, // Custom legacy theme styles

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('East Pointe Studio')
          .items([
            // 1. SITE-WIDE CONFIGURATION
            S.listItem()
              .title('Site Configurations')
              .icon(Settings)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Global Settings')
              ),

            S.divider(),

            // 2. PAGE TEMPLATES (Singletons)
            S.listItem()
              .title('Home Page')
              .icon(Home)
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
                  .title('Home Page Config')
              ),
            S.listItem()
              .title('Cabins Page')
              .icon(Tent)
              .child(
                S.document()
                  .schemaType('cabinPage')
                  .documentId('cabinPage')
                  .title('Cabins Page Config')
              ),
            S.listItem()
              .title('Amenities Page')
              .icon(Sparkles)
              .child(
                S.document()
                  .schemaType('amenitiesPage')
                  .documentId('amenitiesPage')
                  .title('Amenities Page Config')
              ),
            S.listItem()
              .title('Community Page')
              .icon(Users)
              .child(
                S.document()
                  .schemaType('communityPage')
                  .documentId('communityPage')
                  .title('Community Page Config')
              ),
            S.listItem()
              .title('Explore Page')
              .icon(Compass)
              .child(
                S.document()
                  .schemaType('explorePage')
                  .documentId('explorePage')
                  .title('Explore Page Config')
              ),
            S.listItem()
              .title('Membership Page')
              .icon(Bookmark)
              .child(
                S.document()
                  .schemaType('membershipPage')
                  .documentId('membershipPage')
                  .title('Membership Page Config')
              ),

            S.divider(),

            // 3. DATABASE RECORDS (Repeatables)
            S.listItem()
              .title('Cabin Units')
              .icon(Tent)
              .schemaType('cabin')
              .child(S.documentTypeList('cabin').title('All Cabin Listings')),

            S.listItem()
              .title('Amenity Items')
              .icon(Sparkles)
              .schemaType('amenity')
              .child(S.documentTypeList('amenity').title('All Amenities')),

            S.listItem()
              .title('Guest Reviews')
              .icon(Heart)
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

