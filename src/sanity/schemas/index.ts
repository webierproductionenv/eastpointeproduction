import siteSettings from './siteSettings'
import homePage from './homePage'
import cabin from './cabin'
import cabinPage from './cabinPage'
import amenity from './amenity'
import amenitiesPage from './amenitiesPage'
import testimonial from './testimonial'
import communityPage from './communityPage'
import explorePage from './explorePage'
import membershipPage from './membershipPage'

export const schemaTypes = [
  // Global
  siteSettings,
  
  // Singleton Pages
  homePage,
  cabinPage,
  amenitiesPage,
  communityPage,
  explorePage,
  membershipPage,
  
  // Repeatable Documents
  cabin,
  amenity,
  testimonial,
]
