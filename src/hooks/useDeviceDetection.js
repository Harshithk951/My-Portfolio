import { useState, useEffect } from 'react';

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
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const isTablet = /iPad|Android|Windows Phone/.test(navigator.userAgent);
    const hasTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };

    const deviceMemory = navigator.deviceMemory || 4;
    const networkType = navigator.connection?.effectiveType || 'unknown';
    const isSlow = networkType === '3g' || networkType === '4g';
    const isLowEnd = isMobile && (deviceMemory <= 2 || isSlow);

    setDeviceInfo({
      isMobile,
      isTablet,
      isLowEnd,
      hasTouch: hasTouch(),
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      networkType,
    });
  }, []);

  return deviceInfo;
};
