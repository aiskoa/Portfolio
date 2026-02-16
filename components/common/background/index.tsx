import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      {/* The Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bgChess.gif')",
          filter: "blur(5px)",
        }}
      />
      
      {/* The Overlay for Theme Tinting */}
      {/* Light Mode: White overlay with 85% opacity (image shows through 15%) */}
      {/* Dark Mode: Black overlay with 70% opacity (image shows through 30%) */}
      <div className="absolute inset-0 bg-white/85 dark:bg-black/70 transition-colors duration-300" />
    </div>
  );
};

export default Background;
