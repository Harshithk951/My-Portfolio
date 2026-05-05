/**
 * SEOHead Component
 * 
 * Dynamically manage document head tags for SEO and social sharing.
 * Uses React Helmet-like approach with direct DOM manipulation.
 * 
 * Usage:
 * <SEOHead 
 *   title="Page Title"
 *   description="Page description"
 *   ogImage="https://example.com/image.png"
 * />
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';

const SEOHead = ({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
  ogType = 'website',
  twitterHandle,
  twitterCardType = 'summary_large_image',
  canonical,
  structured,
}) => {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
      updateMetaTag('og:title', title);
      updateMetaTag('twitter:title', title);
    }

    // Update description
    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description);
      updateMetaTag('twitter:description', description);
    }

    // Update keywords
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update OpenGraph tags
    if (ogImage) {
      updateMetaTag('og:image', ogImage);
      updateMetaTag('og:image:width', '1200');
      updateMetaTag('og:image:height', '630');
      updateMetaTag('twitter:image', ogImage);
    }

    if (ogUrl) {
      updateMetaTag('og:url', ogUrl);
      updateMetaTag('twitter:url', ogUrl);
    }

    if (ogType) {
      updateMetaTag('og:type', ogType);
    }

    // Add default site name and locale
    updateMetaTag('og:site_name', 'Harshith Kumar Portfolio');
    updateMetaTag('og:locale', 'en_US');

    // Update Twitter tags
    if (twitterHandle) {
      updateMetaTag('twitter:creator', twitterHandle);
    }

    if (twitterCardType) {
      updateMetaTag('twitter:card', twitterCardType);
    }

    // Update canonical link
    if (canonical) {
      updateCanonicalLink(canonical);
    }

    // Add structured data (JSON-LD)
    if (structured) {
      addStructuredData(structured);
    }
  }, [title, description, keywords, ogImage, ogUrl, ogType, twitterHandle, twitterCardType, canonical, structured]);

  return null;
};

SEOHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogImage: PropTypes.string,
  ogUrl: PropTypes.string,
  ogType: PropTypes.string,
  twitterHandle: PropTypes.string,
  twitterCardType: PropTypes.string,
  canonical: PropTypes.string,
  structured: PropTypes.object,
};

/**
 * Update or create a meta tag
 */
function updateMetaTag(name, content) {
  if (!content) return;

  const isOgTag = name.startsWith('og:') || name.startsWith('twitter:');
  const selector = isOgTag ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  const attr = isOgTag ? 'property' : 'name';

  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }

  element.content = content;
}

/**
 * Update canonical link
 */
function updateCanonicalLink(href) {
  let link = document.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }

  link.href = href;
}

/**
 * Add structured data (JSON-LD)
 */
function addStructuredData(data) {
  // Remove existing structured data scripts
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-seo-managed="true"]');
  existingScripts.forEach(script => script.remove());

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  script.dataset.seoManaged = 'true';
  document.head.appendChild(script);
}

export default SEOHead;
