import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// ⚠️ REPLACE 'YOUR_PROJECT_ID' with your actual Sanity project ID from sanity.io/manage
const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID';
const DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';
const API_VERSION = '2024-01-01';

export const sanityClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: true, // `true` for production (cached, fast)
  // No token needed for public read-only access
});

// Image URL builder — converts Sanity image references to CDN URLs
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source) return null;
  return builder.image(source);
}

/**
 * Helper to get a usable image URL from Sanity image reference.
 * Returns the Sanity CDN URL or the fallback if source is null/undefined.
 */
export function getImageUrl(source: any, fallback: string = ''): string {
  if (!source) return fallback;
  // If it's already a plain URL string (not a Sanity reference), return as-is
  if (typeof source === 'string' && !source.startsWith('image-')) {
    return source;
  }
  try {
    const url = urlFor(source);
    return url ? url.auto('format').url() : fallback;
  } catch {
    return fallback;
  }
}
