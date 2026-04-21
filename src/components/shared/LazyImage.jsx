import { useEffect, useRef, useState } from 'react';

/**
 * LazyImage Component - Optimized for responsive images and modern formats
 * 
 * Features:
 * - Lazy loading with IntersectionObserver
 * - Responsive image support via srcSet
 * - Modern image format support (WebP, AVIF) with JPEG fallback
 * - Placeholder support for skeleton loading
 * - Accessibility attributes
 * 
 * @param {string} src - Fallback image source (required)
 * @param {string} alt - Image alt text (required for accessibility)
 * @param {string} className - CSS classes
 * @param {string} placeholderSrc - Optional placeholder image for skeleton effect
 * @param {Object} srcSet - Optional responsive image sources { webp: string, avif: string, jpeg: string }
 * @param {boolean} loadImmediately - Skip lazy loading and load immediately
 * @param {Function} onLoad - Callback when image loads
 * @param {...props} rest - Additional img element props
 */
export const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholderSrc, 
  srcSet,
  loadImmediately = false,
  onLoad,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholderSrc || src);
  const [imageSrcSet, setImageSrcSet] = useState('');
  const [imageType, setImageType] = useState('image/jpeg');
  const imgRef = useRef(null);

  // Check browser support for image formats
  const getSupportedFormat = async () => {
    const canvas = document.createElement('canvas');
    
    // Check AVIF support (highest quality)
    if (canvas.toDataURL('image/avif')) {
      return { format: 'avif', type: 'image/avif' };
    }
    
    // Check WebP support
    if (canvas.toDataURL('image/webp')) {
      return { format: 'webp', type: 'image/webp' };
    }
    
    // Fallback to JPEG
    return { format: 'jpeg', type: 'image/jpeg' };
  };

  // Load image with proper format and srcset
  const loadImage = async (immediately = false) => {
    if (!src) return;

    // Determine supported format
    const { format, type } = await getSupportedFormat();
    setImageType(type);

    // Build srcset if provided
    if (srcSet && srcSet[format]) {
      setImageSrcSet(srcSet[format]);
    } else if (srcSet) {
      // Use jpeg srcset as fallback
      setImageSrcSet(srcSet.jpeg || '');
    }

    // Create new image to preload
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      onLoad?.();
    };

    img.onerror = () => {
      // Fallback: use original src if format-specific fails
      setImageSrc(src);
      setIsLoaded(false);
      console.warn(`Failed to load image: ${src}`);
    };

    // Set image source based on format
    if (srcSet?.[format]) {
      img.srcset = srcSet[format];
    }
    img.src = src;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || loadImmediately) {
          loadImage(loadImmediately);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, srcSet]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      srcSet={imageSrcSet}
      type={imageType}
      alt={alt}
      className={`${isLoaded ? 'loaded' : 'loading'} ${className}`.trim()}
      loading="lazy"
      {...props}
    />
  );
};    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-75'} ${className}`}
      loading="lazy"
      {...props}
    />
  );
};

export default LazyImage;
