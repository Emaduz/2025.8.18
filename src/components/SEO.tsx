/**
 * SEO component
 * Provides per-page meta and Open Graph tags using react-helmet-async.
 * Reuse on any page to customize og/meta without overriding the global tab title unless desired.
 */
import React from 'react';
import { Helmet } from 'react-helmet-async';

/** Props for SEO meta tags */
export interface SEOProps {
  /** Document/page title for OG and optional document title */
  title: string;
  /** Short description for search/OG */
  description: string;
  /** Absolute URL to preview image (1200x630 recommended) */
  image: string;
  /** Canonical page URL (absolute) */
  url: string;
  /** Open Graph type (e.g., "website", "article") */
  type?: 'website' | 'article' | string;
  /** Optional locale (defaults to en) */
  locale?: string;
  /**
   * Whether to also set the document title (<title>).
   * Defaults to false to keep the global tab title stable.
   */
  setTitle?: boolean;
}

/**
 * Injects standard meta tags and Open Graph/Twitter cards.
 * By default, it does not modify the <title> to keep the browser tab title global.
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  locale = 'en',
  setTitle = false,
}) => {
  const safeDescription = description?.slice(0, 300);

  return (
    <Helmet prioritizeSeoTags>
      {/* Optionally set the document title if requested */}
      {setTitle && <title>{title}</title>}

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Primary Meta (description) */}
      <meta name="description" content={safeDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content={locale} />

      {/* Optional hints for scrapers */}
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:type" content="image/png" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
