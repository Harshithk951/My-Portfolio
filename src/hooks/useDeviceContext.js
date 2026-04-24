import { createContext, useContext } from 'react';

/**
 * DeviceContext - Centralized device detection state
 * 
 * Context provider for sharing device detection info across the application.
 * Device detection is computationally expensive, so we compute it once in App.jsx
 * and share the result via context to avoid redundant calculations in child components.
 * 
 * @type {React.Context}
 * @property {boolean} isMobile - True if viewport width < 768px
 * @property {boolean} isTablet - True if viewport width 768px-1024px
 * @property {boolean} isLowEnd - True if device has low-end capabilities (low RAM, slow CPU)
 * @property {boolean} hasTouch - True if device supports touch input
 * @property {number} pixelRatio - Device pixel ratio (e.g., 2 for retina displays)
 * @property {string} networkType - Detected network type ('4g', '3g', 'slow-2g', 'unknown')
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
 * useDeviceInfo Hook
 * 
 * Access device detection information from DeviceContext.
 * Provides data about the user's device capabilities, screen size, and network conditions.
 * Essential for responsive rendering and performance optimization.
 * 
 * @returns {Object} Device info object containing isMobile, isTablet, isLowEnd, hasTouch, pixelRatio, networkType
 * @throws {Error} If used outside of DeviceProvider in component tree
 * 
 * @example
 * // In a component:
 * import { useDeviceInfo } from '@/hooks/useDeviceContext';
 * 
 * function MyComponent() {
 *   const { isMobile, isTablet, isLowEnd } = useDeviceInfo();
 *   return (
 *     <div>
 *       {isMobile && <p>Showing mobile layout</p>}
 *       {isLowEnd && <LoadingSpinner />}
 *     </div>
 *   );
 * }
 */
export const useDeviceInfo = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDeviceInfo must be used within DeviceProvider');
  }
  return context;
};
