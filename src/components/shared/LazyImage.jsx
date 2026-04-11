import { useEffect, useRef, useState } from 'react';

export const LazyImage = ({ src, alt, className, placeholderSrc, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholderSrc || src);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const img = new Image();
        img.onload = () => {
          setImageSrc(src);
          setIsLoaded(true);
        };
        img.onerror = () => {
          setImageSrc(src);
          setIsLoaded(false);
        };
        img.src = src;
        observer.unobserve(entry.target);
      }
    }, {
      rootMargin: '50px',
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
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
