import React from 'react';

export function StarBorder({
  as = 'div',
  className = '',
  color = 'cyan',
  speed = '6s',
  symbol = '*',
  children,
  ...props
}) {
  const colorVariants = {
    cyan: 'from-cyan-500 to-blue-500',
    pink: 'from-pink-500 to-purple-500',
    green: 'from-green-500 to-emerald-500',
    yellow: 'from-yellow-500 to-orange-500',
    white: 'from-white to-gray-300',
  };

  const borderColor = colorVariants[color] || colorVariants.cyan;

  return (
    <div
      className={`relative ${className}`}
      {...props}
      style={{
        ...props.style,
        '--border-color': color,
      }}
    >
      {/* Animated border */}
      <div
        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
        style={{
          animation: `border-spin ${speed} linear infinite`,
          padding: '2px',
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative rounded-lg bg-black z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes border-spin {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default StarBorder;
