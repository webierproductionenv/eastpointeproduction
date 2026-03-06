import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = "/logo.avif",
  url = "https://www.eastpointekc.com",
  type = "website",
  schema,
}) => {
  const siteTitle = "East Pointe";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Helper to find or create meta tags
    const updateMeta = (
      name: string,
      content: string,
      attribute: "name" | "property" = "name",
    ) => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 3. Helper for link tags (canonical)
    const updateLink = (rel: string, href: string) => {
      let element = document.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // 4. Update Meta Tags
    updateMeta("description", description);
    updateLink("canonical", url);

    // Open Graph
    updateMeta("og:title", fullTitle, "property");
    updateMeta("og:description", description, "property");
    updateMeta("og:image", image, "property");
    updateMeta("og:url", url, "property");
    updateMeta("og:type", type, "property");
    updateMeta("og:site_name", siteTitle, "property");

    // Twitter
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", image);

    // 5. Update JSON-LD Schema
    if (schema) {
      let script = document.querySelector("#schema-json-ld");
      if (!script) {
        script = document.createElement("script");
        script.id = "schema-json-ld";
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    } else {
      // Clean up schema if not present on this page to avoid stale data
      const script = document.querySelector("#schema-json-ld");
      if (script) {
        script.remove();
      }
    }
  }, [fullTitle, description, image, url, type, siteTitle, schema]);

  return null;
};

export default SEO;
