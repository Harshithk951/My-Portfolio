/**
 * Image Optimization Utilities
 * 
 * Helpers for generating responsive image srcsets and optimized URLs
 * Supports multiple image sizes and formats (AVIF, WebP, JPEG)
 */

/**
 * Generate a responsive srcset string for an image
 * Assumes images are stored in a format like: image.jpg, image@2x.jpg, etc.
 * 
 * @param {string} imageUrl - Base image URL (e.g., "/images/hero.jpg")
 * @param {number[]} widths - Array of image widths to generate (e.g., [640, 1024, 1920])
 * @returns {Object} Object with srcset keys for different formats
 * 
 * @example
 * const srcsets = generateResponsiveSrcset('/images/hero.jpg', [640, 1024, 1920]);
 * // Returns: { jpeg: "...", webp: "...", avif: "..." }
 */
export const generateResponsiveSrcset = (imageUrl, widths = [640, 1024, 1280, 1920]) => {
  const basePath = imageUrl.split('.').slice(0, -1).join('.');

  const formats = ['jpeg', 'webp', 'avif'];
  const srcsets = {};

  formats.forEach(format => {
    const srcsetArray = widths.map(width => {
      const filename = `${basePath}.${width}w.${format}`;
      return `${filename} ${width}w`;
    });
    
    srcsets[format] = srcsetArray.join(', ');
  });

  return srcsets;
};

/**
 * Detect if browser supports a specific image format
 * 
 * @param {string} format - Format to check: 'avif', 'webp', or 'jpeg'
 * @returns {Promise<boolean>} True if format is supported
 * 
 * @example
 * const supportsWebP = await checkImageFormatSupport('webp');
 */
export const checkImageFormatSupport = async (format) => {
  const canvas = document.createElement('canvas');
  
  const mimeTypes = {
    avif: 'image/avif',
    webp: 'image/webp',
    jpeg: 'image/jpeg'
  };

  const mimeType = mimeTypes[format] || 'image/jpeg';
  
  try {
    return canvas.toDataURL(mimeType) !== canvas.toDataURL('image/png');
  } catch {
    return false;
  }
};

/**
 * Get the best supported image format based on browser capabilities
 * Priority order: AVIF > WebP > JPEG
 * 
 * @returns {Promise<string>} Format name: 'avif', 'webp', or 'jpeg'
 * 
 * @example
 * const format = await getBestImageFormat();
 */
export const getBestImageFormat = async () => {
  const supportsAvif = await checkImageFormatSupport('avif');
  if (supportsAvif) return 'avif';

  const supportsWebp = await checkImageFormatSupport('webp');
  if (supportsWebp) return 'webp';

  return 'jpeg';
};

/**
 * Preload an image for critical above-the-fold content
 * Ensures image is available before rendering
 * 
 * @param {string} src - Image source URL
 * @returns {Promise<void>} Resolves when image is loaded
 * 
 * @example
 * await preloadImage('/images/hero.jpg');
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = src;
  });
};

/**
 * Generate a picture element with multiple source formats
 * For use in custom image components
 * 
 * @param {Object} config - Configuration object
 * @param {string} config.src - Fallback image source
 * @param {string} config.alt - Image alt text
 * @param {Object} config.srcSet - Format-specific srcsets
 * @returns {HTMLElement} Picture element
 * 
 * @example
 * const picture = createPictureElement({
 *   src: 'image.jpg',
 *   alt: 'My image',
 *   srcSet: { avif: '...', webp: '...', jpeg: '...' }
 * });
 */
export const createPictureElement = ({ src, alt, srcSet }) => {
  const picture = document.createElement('picture');
  
  // Create source elements for each format
  if (srcSet?.avif) {
    const sourceAvif = document.createElement('source');
    sourceAvif.srcset = srcSet.avif;
    sourceAvif.type = 'image/avif';
    picture.appendChild(sourceAvif);
  }
  
  if (srcSet?.webp) {
    const sourceWebp = document.createElement('source');
    sourceWebp.srcset = srcSet.webp;
    sourceWebp.type = 'image/webp';
    picture.appendChild(sourceWebp);
  }
  
  // Fallback img element
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  picture.appendChild(img);
  
  return picture;
};

/**
 * Calculate optimal image size based on device viewport
 * Returns a responsive width for image optimization services
 * 
 * @returns {number} Recommended image width in pixels
 * 
 * @example
 * const width = getOptimalImageWidth();
 */
export const getOptimalImageWidth = () => {
  if (typeof globalThis === 'undefined') return 1280;

  const dpr = globalThis.devicePixelRatio || 1;
  const viewportWidth = globalThis.innerWidth;
  
  // Calculate based on viewport and DPR
  return Math.ceil(viewportWidth * dpr);
};

export default {
  generateResponsiveSrcset,
  checkImageFormatSupport,
  getBestImageFormat,
  preloadImage,
  createPictureElement,
  getOptimalImageWidth,
};
