"use client";

import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";

const MouseEnterContext = createContext([false, () => {}]);

// ── CardContainer ─────────────────────────────────────────────────────
export const CardContainer = ({ children, className = "", containerClassName = "" }) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);

  // Detect if device supports hover (for tablets with touch + mouse capability)
  useEffect(() => {
    const checkHoverSupport = () => {
      if (typeof globalThis === 'undefined') return true;
      // Check if device supports hover via media query simulation
      const hasMouse = globalThis.matchMedia('(hover: hover)').matches;
      setSupportsHover(hasMouse);
    };
    
    checkHoverSupport();
    globalThis.addEventListener('resize', checkHoverSupport);
    return () => globalThis.removeEventListener('resize', checkHoverSupport);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!supportsHover || !containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  }, [supportsHover]);

  const handleMouseEnter = useCallback(() => {
    if (!supportsHover) return;
    setIsMouseEntered(true);
  }, [supportsHover]);

  const handleMouseLeave = useCallback(() => {
    if (!supportsHover) return;
    setIsMouseEntered(false);
    if (containerRef.current) {
      containerRef.current.style.transform =
        "rotateY(0deg) rotateX(0deg)";
    }
  }, [supportsHover]);

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={`flex items-center justify-center ${containerClassName}`}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          role="presentation"
          className={`relative transition-all duration-200 ease-linear ${className}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

CardContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

// ── CardBody ──────────────────────────────────────────────────────────
export const CardBody = ({ children, className = "" }) => {
  return (
    <div
      className={`[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  );
};

CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// ── CardItem ──────────────────────────────────────────────────────────
export const CardItem = ({
  as: Component = "div",
  children,
  className = "",
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();

  const transform = isMouseEntered
    ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
    : "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";

  return (
    <Component
      ref={ref}
      className={`transition duration-200 ease-linear ${className}`}
      style={{ transform }}
      {...rest}
    >
      {children}
    </Component>
  );
};

CardItem.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  translateX: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  translateY: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  translateZ: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rotateX: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rotateY: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rotateZ: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

// ── Hook (internal only — not exported to avoid HMR issues) ───────────
const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error(
      "useMouseEnter must be used within a MouseEnterContext provider"
    );
  }
  return context;
};
