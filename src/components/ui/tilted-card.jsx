import { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { SPRING_SMOOTH } from '@/lib/animationConfig';
import './tilted-card.css';

const springValues = SPRING_SMOOTH;

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const lastCallRef = useRef(0);
  const rectCacheRef = useRef(null);
  const rectCacheTimeRef = useRef(0);

  const x = useMotionValue();
  const y = useMotionValue();
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  // Overlay opacity: always visible (independent of tilt effects)
  const overlayOpacity = useSpring(1);
  // Caption opacity: only visible on hover
  const captionOpacity = useSpring(0);

  // Throttle mouse events to 32ms (better for smooth interactions)
  const handleMouse = useCallback((e) => {
    if (!ref.current) return;

    const now = Date.now();
    if (now - lastCallRef.current < 32) return;
    lastCallRef.current = now;

    // Cancel any pending RAF
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      // Cache rect to avoid multiple layout queries
      let rect = rectCacheRef.current;
      if (!rect || now - rectCacheTimeRef.current > 100) {
        rect = ref.current.getBoundingClientRect();
        rectCacheRef.current = rect;
        rectCacheTimeRef.current = now;
      }

      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;

      const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
      const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

      rotateX.set(rotationX);
      rotateY.set(rotationY);

      // Only update caption position if tooltip is enabled
      if (showTooltip) {
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }
    });
  }, [rotateAmplitude, rotateX, rotateY, showTooltip, x, y]);

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    captionOpacity.set(1);
  }

  function handleMouseLeave() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    captionOpacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{
            width: imageWidth,
            height: imageHeight
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div 
            className="tilted-card-overlay"
            style={{ opacity: overlayOpacity }}
          >
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity: captionOpacity
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}

TiltedCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string,
  captionText: PropTypes.string,
  containerHeight: PropTypes.string,
  containerWidth: PropTypes.string,
  imageHeight: PropTypes.string,
  imageWidth: PropTypes.string,
  scaleOnHover: PropTypes.number,
  rotateAmplitude: PropTypes.number,
  showMobileWarning: PropTypes.bool,
  showTooltip: PropTypes.bool,
  overlayContent: PropTypes.node,
  displayOverlayContent: PropTypes.bool,
};
