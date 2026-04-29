import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const MacOSDock = ({ 
  apps, 
  onAppClick, 
  openApps: _openApps = [],
  className = ''
}) => {
  const [mouseX, setMouseX] = useState(null);
  const [touchX, setTouchX] = useState(null);
  const [isTouchDevice] = useState(() => {
    return typeof window !== 'undefined' && (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  });
  const [currentScales, setCurrentScales] = useState(apps.map(() => 1));
  const [currentPositions, setCurrentPositions] = useState([]);
  const dockRef = useRef(null);
  const iconRefs = useRef([]);
  const animationFrameRef = useRef(null);
  const iconCenters = useRef([]);
  const lastMouseMoveTime = useRef(0);
  const lastTouchTime = useRef(0);

  const getResponsiveConfig = useCallback(() => {
    if (typeof window === 'undefined') {
      return { baseIconSize: 56, maxScale: 1.6, effectWidth: 240 };
    }

    const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
    
    if (smallerDimension < 480) {
      return {
        baseIconSize: Math.max(44, smallerDimension * 0.09),
        maxScale: 1.4,
        effectWidth: smallerDimension * 0.4
      };
    } else if (smallerDimension < 768) {
      return {
        baseIconSize: Math.max(52, smallerDimension * 0.08),
        maxScale: 1.5,
        effectWidth: smallerDimension * 0.35
      };
    } else if (smallerDimension < 1024) {
      return {
        baseIconSize: Math.max(56, smallerDimension * 0.065),
        maxScale: 1.6,
        effectWidth: smallerDimension * 0.3
      };
    } else {
      return {
        baseIconSize: Math.max(56, Math.min(68, smallerDimension * 0.045)),
        maxScale: 1.7,
        effectWidth: 300
      };
    }
  }, []);

  const [config, setConfig] = useState(getResponsiveConfig);
  const { baseIconSize, maxScale, effectWidth } = config;
  const minScale = 1.0;
  const baseSpacing = Math.max(4, baseIconSize * 0.08);

  // Helper to compute positions from scales (used before calculatePositions is defined)
  const computePositions = useCallback((scales, iconSize, spacing) => {
    let currentX = 0;
    return scales.map((scale) => {
      const scaledWidth = iconSize * scale;
      const centerX = currentX + (scaledWidth / 2);
      currentX += scaledWidth + spacing;
      return centerX;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newConfig = getResponsiveConfig();
      setConfig(newConfig);
      // Reset scales and positions to match new config
      const newBaseIconSize = newConfig.baseIconSize;
      const newBaseSpacing = Math.max(4, newBaseIconSize * 0.08);
      const newScales = apps.map(() => minScale);
      setCurrentScales(newScales);
      setCurrentPositions(computePositions(newScales, newBaseIconSize, newBaseSpacing));
      // Update icon centers
      iconCenters.current = apps.map((_, index) => 
        (index * (newBaseIconSize + newBaseSpacing)) + (newBaseIconSize / 2)
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsiveConfig, apps, minScale, computePositions]);


  const calculateTargetMagnification = useCallback((mousePosition) => {
    if (mousePosition === null) {
      return apps.map(() => minScale);
    }

    return apps.map((_, index) => {
      const normalIconCenter = iconCenters.current[index] || 0;
      const minX = mousePosition - (effectWidth / 2);
      const maxX = mousePosition + (effectWidth / 2);
      
      if (normalIconCenter < minX || normalIconCenter > maxX) {
        return minScale;
      }
      
      const theta = ((normalIconCenter - minX) / effectWidth) * 2 * Math.PI;
      const cappedTheta = Math.min(Math.max(theta, 0), 2 * Math.PI);
      const scaleFactor = (1 - Math.cos(cappedTheta)) / 2;
      
      return minScale + (scaleFactor * (maxScale - minScale));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apps, effectWidth, maxScale, minScale]);

  const calculatePositions = useCallback((scales) => {
    let currentX = 0;
    
    return scales.map((scale) => {
      const scaledWidth = baseIconSize * scale;
      const centerX = currentX + (scaledWidth / 2);
      currentX += scaledWidth + baseSpacing;
      return centerX;
    });
  }, [baseIconSize, baseSpacing]);

  const animateToTargetRef = useRef(null);

  const animateToTarget = useCallback(() => {
    // Use touchX on touch devices, mouseX on desktop
    const activeX = isTouchDevice ? touchX : mouseX;
    const targetScales = calculateTargetMagnification(activeX);
    const targetPositions = calculatePositions(targetScales);
    const lerpFactor = activeX !== null ? 0.2 : 0.12;

    setCurrentScales(prevScales => {
      return prevScales.map((currentScale, index) => {
        const diff = targetScales[index] - currentScale;
        return currentScale + (diff * lerpFactor);
      });
    });

    setCurrentPositions(prevPositions => {
      return prevPositions.map((currentPos, index) => {
        const diff = targetPositions[index] - currentPos;
        return currentPos + (diff * lerpFactor);
      });
    });

    const scalesNeedUpdate = currentScales.some((scale, index) => 
      Math.abs(scale - targetScales[index]) > 0.002
    );
    const positionsNeedUpdate = currentPositions.some((pos, index) => 
      Math.abs(pos - targetPositions[index]) > 0.1
    );
    
    if (scalesNeedUpdate || positionsNeedUpdate || activeX !== null) {
      animationFrameRef.current = requestAnimationFrame(() => animateToTargetRef.current?.());
    }
  }, [mouseX, touchX, calculateTargetMagnification, calculatePositions, currentScales, currentPositions, isTouchDevice]);

  // Keep the ref in sync with the latest callback
  useEffect(() => {
    animateToTargetRef.current = animateToTarget;
  }, [animateToTarget]);

  // Pre-calculate centers for magnification logic on mount
  useEffect(() => {
    iconCenters.current = apps.map((_, index) => 
      (index * (baseIconSize + baseSpacing)) + (baseIconSize / 2)
    );
  }, [apps, baseIconSize, baseSpacing]);

  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animateToTarget);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateToTarget]);

  const handleMouseMove = useCallback((e) => {
    const now = performance.now();
    
    if (now - lastMouseMoveTime.current < 16) {
      return;
    }
    
    lastMouseMoveTime.current = now;
    
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      const padding = Math.max(8, baseIconSize * 0.12);
      setMouseX(e.clientX - rect.left - padding);
    }
  }, [baseIconSize]);

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (dockRef.current && e.touches.length > 0) {
      const rect = dockRef.current.getBoundingClientRect();
      const padding = Math.max(8, baseIconSize * 0.12);
      setTouchX(e.touches[0].clientX - rect.left - padding);
      lastTouchTime.current = performance.now();
    }
  }, [baseIconSize]);

  const handleTouchMove = useCallback((e) => {
    if (!isTouchDevice || e.touches.length === 0) return;
    
    const now = performance.now();
    if (now - lastTouchTime.current < 16) {
      return;
    }
    
    lastTouchTime.current = now;
    
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      const padding = Math.max(8, baseIconSize * 0.12);
      setTouchX(e.touches[0].clientX - rect.left - padding);
    }
  }, [baseIconSize, isTouchDevice]);

  const handleTouchEnd = useCallback(() => {
    setTouchX(null);
  }, []);

  const createBounceAnimation = (element) => {
    const bounceHeight = Math.max(-8, -baseIconSize * 0.15);
    element.style.transition = 'transform 0.2s ease-out';
    element.style.transform = `translateY(${bounceHeight}px)`;
    
    setTimeout(() => {
      element.style.transform = 'translateY(0px)';
    }, 200);
  };

  const handleAppClick = (appId, index) => {
    if (iconRefs.current[index]) {
      createBounceAnimation(iconRefs.current[index]);
    }
    if (onAppClick) {
      onAppClick(appId);
    }
  };

  const contentWidth = currentPositions.length > 0 
    ? Math.max(...currentPositions.map((pos, index) => 
        pos + (baseIconSize * currentScales[index]) / 2
      ))
    : (apps.length * (baseIconSize + baseSpacing)) - baseSpacing;

  const padding = Math.max(8, baseIconSize * 0.12);

  return (
    <div 
      ref={dockRef}
      className={`backdrop-blur-md ${className}`}
      style={{
        width: `${contentWidth + padding * 2}px`,
        background: 'rgba(45, 45, 45, 0.75)',
        borderRadius: `${Math.max(12, baseIconSize * 0.4)}px`,
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: `
          0 ${Math.max(4, baseIconSize * 0.1)}px ${Math.max(16, baseIconSize * 0.4)}px rgba(0, 0, 0, 0.4),
          0 ${Math.max(2, baseIconSize * 0.05)}px ${Math.max(8, baseIconSize * 0.2)}px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          inset 0 -1px 0 rgba(0, 0, 0, 0.2)
        `,
        padding: `${padding}px`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div 
        className="relative"
        style={{
          height: `${baseIconSize}px`,
          width: '100%'
        }}
      >
        {apps.map((app, index) => {
          const scale = currentScales[index];
          const position = currentPositions[index] || 0;
          const scaledSize = baseIconSize * scale;
          const Icon = app.icon;
          
          return (
            <button
              key={app.id}
              ref={(el) => { iconRefs.current[index] = el; }}
              className="absolute cursor-pointer flex flex-col items-center justify-center group bg-transparent border-0 p-0"
              aria-label={app.name}
              title={app.name}
              onClick={() => handleAppClick(app.id, index)}
              type="button"
              style={{
                left: `${position - scaledSize / 2}px`,
                bottom: '0px',
                width: `${scaledSize}px`,
                height: `${scaledSize}px`,
                transformOrigin: 'bottom center',
                zIndex: Math.round(scale * 10)
              }}
            >
              <div
                className="flex items-center justify-center text-white/80 group-hover:text-white transition-colors"
                style={{
                  width: `${scaledSize}px`,
                  height: `${scaledSize}px`,
                  filter: `drop-shadow(0 ${scale > 1.2 ? Math.max(2, baseIconSize * 0.05) : Math.max(1, baseIconSize * 0.03)}px ${scale > 1.2 ? Math.max(4, baseIconSize * 0.1) : Math.max(2, baseIconSize * 0.06)}px rgba(0,0,0,${0.2 + (scale - 1) * 0.15}))`
                }}
              >
                <Icon size={scaledSize * 0.6} strokeWidth={1.5} />
              </div>
              
              {/* App Indicator Dot */}
              {app.isActive && (
                <div 
                  className="absolute"
                  style={{
                    bottom: `${Math.max(-2, -baseIconSize * 0.05)}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: `${Math.max(3, baseIconSize * 0.06)}px`,
                    height: `${Math.max(3, baseIconSize * 0.06)}px`,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};


MacOSDock.propTypes = {
  apps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      isActive: PropTypes.bool
    })
  ).isRequired,
  onAppClick: PropTypes.func.isRequired,
  openApps: PropTypes.array,
  className: PropTypes.string
};

export default MacOSDock;
