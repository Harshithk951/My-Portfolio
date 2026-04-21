import { useState, useEffect } from 'react';
import { detectDeviceCapabilities } from '@/lib/utils';

/**
 * useDeviceDetection Hook
 * 
 * Detects device capabilities and caches result for performance.
 * Device detection is expensive, so result is cached on first call.
 * 
 * @returns {Object} Device info with properties:
 *   - isMobile: boolean
 *   - isTablet: boolean
 *   - isLowEnd: boolean (mobile with ≤2GB RAM or slow connection)
 *   - hasTouch: boolean
 *   - pixelRatio: number (1-2)
 *   - networkType: string ('4g', '3g', 'slow-2g', 'unknown')
 * 
 * @example
 * const { isMobile, isLowEnd } = useDeviceDetection();
 * 
 * if (isLowEnd) {
 *   // Reduce animations and effects
 * }
 */
let deviceCapabilitiesCache = null;

export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isLowEnd: false,
    hasTouch: false,
    pixelRatio: 1,
    networkType: 'unknown',
  });

  useEffect(() => {
    // Use cached result if available (avoid recomputing)
    if (deviceCapabilitiesCache === null) {
      deviceCapabilitiesCache = detectDeviceCapabilities();
    }
    
    setDeviceInfo(deviceCapabilitiesCache);
  }, []);

  return deviceInfo;
};

  return deviceInfo;
};
