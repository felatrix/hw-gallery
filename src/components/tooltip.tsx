import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div
          className="absolute z-10 left-1/2 transform -translate-x-1/2 bottom-full bg-gray-800 text-white text-center 
        p-2 rounded-md opacity-100 pointer-events-auto transition-opacity duration-300 min-w-[100px]"
        >
          {text}
          <svg
            className="absolute text-gray-800 h-2 w-full left-1/2 top-full transform -translate-x-1/2"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
