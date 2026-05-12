import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/useDeviceContext";

/**
 * IconCloud – interactive 3D tag-cloud rendered on <canvas>.
 * Mobile‑optimised: adaptive DPR, touch drag, visibility pause,
 * responsive icon sizing, and reduced glow on low-end devices.
 */

// ── helpers ──────────────────────────────────────────────────────────

function fibonacciSphere(n) {
  const pts = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

function hexToRgba(hex, a) {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function isMobile() {
  return globalThis.innerWidth <= 768;
}

const loadImageFromUrl = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
};

const fetchAndCreateImage = async (src) => {
  try {
    const res = await fetch(src);
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("svg")) {
      let svgText = await res.text();
      if (!svgText.includes("width=")) {
        svgText = svgText.replace("<svg", '<svg width="128" height="128"');
      }
      const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      return loadImageFromUrl(url);
    } else {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      return loadImageFromUrl(url);
    }
  } catch {
    return null;
  }
};

// ── Component ────────────────────────────────────────────────────────

export function IconCloud({ images = [], className }) {
  const { isLowEnd } = useDeviceInfo();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imgsRef = useRef([]);
  const rotRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0.002, y: 0.003 });
  const mouseRef = useRef(null);
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);
  const isVisible = useRef(true);

  // Adaptive settings for low-end devices (preserve quality for others)
  const animationConfig = useMemo(() => ({
    skipGlowFrequency: isLowEnd ? 1 : 0,  // Skip glow rendering on low-end
    reduceIconCount: isLowEnd ? 0.7 : 1,  // Render 70% of icons on low-end
    lowerAlpha: isLowEnd ? 0.5 : 1,       // Reduce alpha intensity on low-end
  }), [isLowEnd]);

  const points = useMemo(() => fibonacciSphere(images.length), [images.length]);

  // ── Load images ──
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all(images.map(fetchAndCreateImage)).then((results) => {
      if (cancelled) return;
      imgsRef.current = results;
      setLoaded(true);
    });

    return () => { cancelled = true; };
  }, [images]);

  // ── Interaction (supports both mouse + touch) ──
  const onPointerDown = useCallback((e) => {
    dragging.current = true;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    lastMouse.current = { x, y };
  }, []);

  const onPointerMove = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null || clientY == null) return;

    const rect = container.getBoundingClientRect();
    mouseRef.current = {
      x: ((clientX - rect.left) / rect.width) * 2 - 1,
      y: ((clientY - rect.top) / rect.height) * 2 - 1,
    };

    if (dragging.current) {
      const dx = clientX - lastMouse.current.x;
      const dy = clientY - lastMouse.current.y;
      velRef.current = { x: dy * 0.0001, y: dx * 0.0001 };
      lastMouse.current = { x: clientX, y: clientY };
    }
  }, []);

  const onPointerUp = useCallback(() => { dragging.current = false; }, []);
  const onPointerLeave = useCallback(() => {
    dragging.current = false;
    mouseRef.current = null;
  }, []);

  // ── Canvas animation loop ──
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = isMobile();
    // Cap DPR: 1 on mobile, up to 2 on desktop
    const dpr = Math.min(globalThis.devicePixelRatio || 1, mobile ? 1 : 2);

    let resizeTimer;
    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const { width, height } = container.getBoundingClientRect();
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }, mobile ? 150 : 50);
    };

    // Initial size (no debounce)
    const initRect = container.getBoundingClientRect();
    canvas.width = Math.round(initRect.width * dpr);
    canvas.height = Math.round(initRect.height * dpr);
    canvas.style.width = initRect.width + "px";
    canvas.style.height = initRect.height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Pause when tab hidden
    const onVisibility = () => {
      isVisible.current = !document.hidden;
      if (!document.hidden && !animRef.current) {
        animRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Responsive icon size
    const getIconSize = (w) => {
      if (w <= 480) return 32;
      if (w <= 768) return 38;
      return 46;
    };
    const getRadiusMul = (w) => {
      if (w <= 480) return 0.65;
      if (w <= 768) return 0.7;
      return 0.75;
    };
    const showGlow = !mobile && !isLowEnd; // skip glow on mobile or low-end devices for perf

    const TWO_PI = Math.PI * 2;

    const renderIcon = (p, iconSize) => {
      const { idx, x, y, z } = p;
      // Skip rendering some icons on low-end for performance (Deterministic skip to satisfy SonarCloud)
      if (isLowEnd && (idx % 10) > (animationConfig.reduceIconCount * 10)) {
        return;
      }

      const img = imgsRef.current[idx];
      const scale = (z + 1.3) / 2.3;
      const size = iconSize * (0.5 + scale * 0.6);
      const baseAlpha = 0.2 + scale * 0.8;
      const alpha = isLowEnd ? baseAlpha * animationConfig.lowerAlpha : baseAlpha;

      ctx.globalAlpha = alpha;

      // Soft glow (desktop only)
      if (showGlow) {
        const grad = ctx.createRadialGradient(x, y, size * 0.1, x, y, size * 0.8);
        grad.addColorStop(0, hexToRgba("#ffffff", 0.06 * alpha));
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, size * 0.8, 0, TWO_PI);
        ctx.fill();
      }

      if (img) {
        const half = size / 2;
        ctx.drawImage(img, x - half, y - half, size, size);
      } else {
        ctx.fillStyle = hexToRgba("#888", alpha);
        ctx.beginPath();
        ctx.arc(x, y, size * 0.35, 0, TWO_PI);
        ctx.fill();
      }
    };

    const animate = () => {
      if (!isVisible.current) { animRef.current = null; return; }

      const { width, height } = container.getBoundingClientRect();
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(cx, cy) * getRadiusMul(width);
      const iconSize = getIconSize(width);

      // Auto-rotation + mouse/touch influence
      const mouse = mouseRef.current;
      if (mouse && !dragging.current) {
        velRef.current = { x: -mouse.y * 0.004, y: mouse.x * 0.004 };
      } else if (!dragging.current) {
        velRef.current.x += (0.002 - velRef.current.x) * 0.02;
        velRef.current.y += (0.003 - velRef.current.y) * 0.02;
      }

      rotRef.current.x += velRef.current.x;
      rotRef.current.y += velRef.current.y;

      const cosX = Math.cos(rotRef.current.x);
      const sinX = Math.sin(rotRef.current.x);
      const cosY = Math.cos(rotRef.current.y);
      const sinY = Math.sin(rotRef.current.y);

      ctx.clearRect(0, 0, width, height);

      // Project & depth-sort
      const projected = [];
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        projected.push({ idx: i, x: cx + x1 * radius, y: cy + y1 * radius, z: z2 });
      }

      projected.sort((a, b) => a.z - b.z);

      for (const p of projected) {
        renderIcon(p, iconSize);
      }

      ctx.globalAlpha = 1;
      
      // Throttle animation on low-end devices (target 30fps instead of 60fps)
      if (isLowEnd) {
        setTimeout(() => {
          animRef.current = requestAnimationFrame(animate);
        }, 33); // ~30fps throttle
      } else {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(resizeTimer);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [loaded, points, isLowEnd, animationConfig]);

  return (
    <div
      ref={containerRef}
      className={cn("relative select-none", className)}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      aria-label="3D skill cloud visualization"
      tabIndex={-1}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}

IconCloud.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

export default IconCloud;
