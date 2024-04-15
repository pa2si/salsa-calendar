'use client';

import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

function HamburgerMenuBtn() {
  const [isActive, setIsActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const toggleIcon = () => {
    setIsActive((current) => !current); // Toggle the active state and force update
    setIsHovering(false); // Reset hovering to false on click to ensure it can be re-triggered
  };

  const handleMouseEnter = () => {
    if (!isActive) {
      setIsHovering(true); // Apply hover effects only when not active
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false); // Always remove hover effects on mouse leave
  };

  return (
    <div
      className={`text-xl transition duration-700 ease-in-out 
                 ${
                   isActive
                     ? 'rotate-180 scale-125'
                     : isHovering
                     ? 'rotate-180 scale-125'
                     : ''
                 }`}
      onClick={toggleIcon}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <RxHamburgerMenu />
    </div>
  );
}

export default HamburgerMenuBtn;
