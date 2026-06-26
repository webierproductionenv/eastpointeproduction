/**
 * Utility to sanitize environment variables by stripping quotes and whitespace
 */
const cleanEnvVar = (val: any): string | undefined => {
  if (typeof val !== 'string') return undefined;
  const cleaned = val.replace(/^['"]|['"]$/g, '').trim();
  return cleaned || undefined;
};

// Cleaned environment variables with safe production fallbacks
export const SANITY_PROJECT_ID = cleanEnvVar(import.meta.env.VITE_SANITY_PROJECT_ID);
export const SANITY_DATASET = cleanEnvVar(import.meta.env.VITE_SANITY_DATASET);
export const WEB3FORMS_ACCESS_KEY = cleanEnvVar(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
