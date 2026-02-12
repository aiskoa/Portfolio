import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className = '', placement = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-10 px-2 py-1 text-sm text-white bg-black rounded shadow-lg dark:bg-purple-700 whitespace-nowrap ${
          placement === 'top' ? '-top-8 left-1/2 transform -translate-x-1/2' : ''
        } ${className}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
