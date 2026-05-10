import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  reverse = false,
  ...props
}) {
  const containerRef = React.useRef(null);
  const [isPaused, setIsPaused] = React.useState(false);

  // Apply reverse prop by flipping direction
  const finalDirection = reverse
    ? direction === "left"
      ? "right"
      : direction === "up"
      ? "down"
      : direction
    : direction;

  const items = React.Children.toArray(children);
  const isVertical = finalDirection === "up" || finalDirection === "down";

  return (
    <>
      <style>
        {`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% / 3));
          }
        }

        @keyframes scroll-y {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(calc(-100% / 3));
          }
        }

        .marquee-scroller {
          display: flex;
          animation: ${
          isVertical ? "scroll-y" : "scroll"
        } ${duration}s linear infinite;
        }

        .marquee-scroller.reverse {
          animation-direction: reverse;
        }

        .marquee-scroller.paused {
          animation-play-state: paused;
        }
      `}
      </style>
      <div
        ref={containerRef}
        role="region"
        aria-label="Scrolling marquee"
        className={cn(
          "flex w-full overflow-hidden",
          isVertical && "flex-col",
          className,
        )}
        style={{
          ...(fade && {
            maskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`,
            WebkitMaskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`,
          }),
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        {...props}
      >
        <div
          className={cn(
            "marquee-scroller flex shrink-0",
            isVertical && "flex-col",
            reverse && "reverse",
            isPaused && "paused",
          )}
        >
          {items.map((item) => (
            <div
              key={`first-${item.key}`}
              className={cn("flex shrink-0", isVertical && "w-full")}
            >
              {item}
            </div>
          ))}
          {items.map((item) => (
            <div
              key={`second-${item.key}`}
              className={cn("flex shrink-0", isVertical && "w-full")}
            >
              {item}
            </div>
          ))}
          {items.map((item) => (
            <div
              key={`third-${item.key}`}
              className={cn("flex shrink-0", isVertical && "w-full")}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

Marquee.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  duration: PropTypes.number,
  pauseOnHover: PropTypes.bool,
  direction: PropTypes.oneOf(["left", "right", "up", "down"]),
  fade: PropTypes.bool,
  fadeAmount: PropTypes.number,
  reverse: PropTypes.bool,
};

export default Marquee;
