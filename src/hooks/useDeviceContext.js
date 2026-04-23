import { createContext, useContext } from 'react';

/**
 * DeviceContext - Centralized device detection state
 * 
 * Avoids redundant useDeviceDetection hook calls across components.
 * Device detection is expensive, so we compute it once in App.jsx
 * and share the result via context to all child components.
 */
export const DeviceContext = createContext({
  isMobile: false,
  isTablet: false,
  isLowEnd: false,
  hasTouch: false,
  pixelRatio: 1,
  networkType: 'unknown',
});

/**
 * Hook to access device detection info from context
 * Must be used within a DeviceProvider
 * 
 * @returns {Object} Device info object
 * @throws {Error} If used outside of DeviceProvider
 */
export const useDeviceInfo = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDeviceInfo must be used within DeviceProvider');
  }
  return context;
};
