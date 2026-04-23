import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Activity, Zap, AlertCircle } from 'lucide-react';
import { ANIMATION_PRESETS } from '@/lib/animationConfig';

/**
 * PerformanceDashboard Component
 * 
 * Displays real-time Web Vitals and performance metrics.
 * Visible by adding ?perf=1 to the URL in development mode.
 * 
 * Metrics tracked:
 * - LCP (Largest Contentful Paint): Time to largest content element
 * - FCP (First Contentful Paint): Time to first paint
 * - CLS (Cumulative Layout Shift): Layout stability
 * - FID (First Input Delay): Input responsiveness (deprecated, using INP)
 * - INP (Interaction to Next Paint): Interaction responsiveness
 * - TTFB (Time to First Byte): Server response time
 */
const PerformanceDashboard = ({ onClose }) => {
  const [metrics, setMetrics] = useState({});
  const [performance, setPerformance] = useState(null);

  useEffect(() => {
    // Get stored metrics from window object (set by analytics.js)
    const storedMetrics = window.__PERF_METRICS__ || {};
    setMetrics(storedMetrics);

    // Get Navigation Timing data
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const navigationStart = timing.navigationStart;
      
      setPerformance({
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        tcp: timing.connectEnd - timing.connectStart,
        ttfb: timing.responseStart - navigationStart,
        download: timing.responseEnd - timing.responseStart,
        domInteractive: timing.domInteractive - navigationStart,
        domComplete: timing.domComplete - navigationStart,
        pageLoadTime: timing.loadEventEnd - navigationStart,
      });
    }

    // Subscribe to metric updates
    const handleMetricUpdate = (e) => {
      setMetrics(e.detail);
    };

    window.addEventListener('perf-metric-update', handleMetricUpdate);
    return () => window.removeEventListener('perf-metric-update', handleMetricUpdate);
  }, []);

  const getMetricStatus = (name, value) => {
    // Web Vitals thresholds (good/needs improvement/poor)
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },      // milliseconds
      FCP: { good: 1800, poor: 3000 },      // milliseconds
      CLS: { good: 0.1, poor: 0.25 },       // unitless
      INP: { good: 200, poor: 500 },        // milliseconds
      TTFB: { good: 600, poor: 1200 },      // milliseconds
    };

    const threshold = thresholds[name];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'bg-green-500/20 border-green-500 text-green-400';
      case 'needs-improvement':
        return 'bg-yellow-500/20 border-yellow-500 text-yellow-400';
      case 'poor':
        return 'bg-red-500/20 border-red-500 text-red-400';
      default:
        return 'bg-gray-500/20 border-gray-500 text-gray-400';
    }
  };

  return (
    <motion.div
      variants={ANIMATION_PRESETS.SLIDE_RIGHT}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed bottom-4 right-4 w-96 bg-slate-950/95 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl z-[9999] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold text-white text-sm">Performance Metrics</h3>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Close dashboard"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {/* Web Vitals Section */}
        {Object.keys(metrics).length > 0 && (
          <div className="space-y-3 mb-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Web Vitals</h4>
            {Object.entries(metrics).map(([name, data]) => {
              const status = getMetricStatus(name, data.value);
              const statusColor = getStatusColor(status);
              return (
                <div key={name} className={`p-3 rounded border ${statusColor} transition-all`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold">{name}</span>
                    <span className="text-sm font-mono">{data.value.toFixed(1)}{data.unit || ''}</span>
                  </div>
                  <div className="w-full bg-black/40 rounded h-1">
                    <div
                      className={`h-full rounded transition-all ${
                        status === 'good' ? 'bg-green-500' : status === 'needs-improvement' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{
                        width: `${Math.min((data.value / 5000) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Navigation Timing Section */}
        {performance && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Navigation Timing</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(performance).map(([key, value]) => (
                <div key={key} className="bg-slate-800/50 p-2 rounded border border-slate-700">
                  <div className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  <div className="font-mono text-cyan-400 font-semibold">{Math.round(value)}ms</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Device Info Section */}
        <div className="mt-4 pt-4 border-t border-slate-700 space-y-2 text-xs">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Device Info</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-slate-500">Screen Size:</span>
              <span className="text-cyan-400 ml-2">{window.innerWidth}x{window.innerHeight}</span>
            </div>
            <div>
              <span className="text-slate-500">Pixel Ratio:</span>
              <span className="text-cyan-400 ml-2">{window.devicePixelRatio}x</span>
            </div>
            <div>
              <span className="text-slate-500">User Agent:</span>
              <span className="text-cyan-400 ml-2 text-xs truncate">{navigator.userAgent.substring(0, 30)}...</span>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-4 p-2 bg-blue-900/20 border border-blue-700/50 rounded text-xs text-blue-300">
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>Performance dashboard is visible in dev mode. Metrics update as page elements load. Check browser DevTools for more details.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-700 bg-slate-900/50 text-xs text-slate-400">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-3 h-3 text-yellow-400" />
          <span>Tip: Add ?perf=1 to URL to toggle dashboard</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceDashboard;
