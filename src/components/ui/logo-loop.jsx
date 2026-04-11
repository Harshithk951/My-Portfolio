import React, { useState } from 'react';

export function LogoLoop({
  logos = [],
  speed = 100,
  direction = 'left',
  logoHeight = 60,
  gap = 60,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = true,
  fadeOutColor = '#ffffff',
  ariaLabel = 'Logo loop',
  useCustomRender = true,
}) {
  const [isHovering, setIsHovering] = useState(false);

  const distance = (speed / 100) * 50;
  const duration = Math.max(20, (logos.length * logoHeight * 0.08) / distance);

  const animationName = direction === 'left' ? 'scroll-left' : 'scroll-right';
  
  const maskStyle = fadeOut
    ? {
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }
    : {};

  const containerStyle = {
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
    ...maskStyle,
  };

  const innerStyle = {
    display: 'flex',
    gap: `${gap}px`,
    animation: `${animationName} ${duration}s linear infinite`,
    animationPlayState: isHovering && hoverSpeed === 0 ? 'paused' : 'running',
    flexShrink: 0,
  };

  return (
    <>
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 2)); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(calc(-100% / 2)); }
            100% { transform: translateX(0); }
          }
          .logo-loop-item {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logo-loop-item a {
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: inherit;
          }
          .logo-loop-item svg {
            width: 100%;
            height: 100%;
            color: #d1d5db;
            transition: color 0.3s ease;
          }
          .logo-loop-item a:hover svg {
            color: #ffffff;
          }
        `}
      </style>
      <div
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div style={innerStyle}>
          {/* Single set - duplicated by CSS animation for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`logo-${index}`}
              className="logo-loop-item"
              style={{ height: `${logoHeight}px`, width: `${logoHeight}px` }}
              title={logo.title}
              aria-label={logo.title || `Logo ${index + 1}`}
            >
              {logo.node ? (
                <span
                  style={{
                    fontSize: `${logoHeight * 0.6}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {logo.node}
                </span>
              ) : logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ height: '100%', objectFit: 'contain' }}
                />
              ) : null}
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`logo-dup-${index}`}
              className="logo-loop-item"
              style={{ height: `${logoHeight}px`, width: `${logoHeight}px` }}
              title={logo.title}
              aria-label={logo.title || `Logo ${index + 1}`}
              aria-hidden="true"
            >
              {logo.node ? (
                <span
                  style={{
                    fontSize: `${logoHeight * 0.6}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {logo.node}
                </span>
              ) : logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ height: '100%', objectFit: 'contain' }}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LogoLoop;
