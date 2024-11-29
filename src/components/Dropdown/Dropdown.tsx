// components/Dropdown.tsx
'use client';

import React, { useState, ReactNode, useRef, useEffect } from 'react';

interface DropdownProps {
  className?: string;
  width?: string;
  position?: string;
  elements: ReactNode;
  children: ReactNode;
  hover?: boolean;
  action?: boolean;
  function?: (params : string) => void
}

function Dropdown({ className, width, elements, children, hover = false, action = false, position = 'top-[80%] right-0'}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleAction = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const actionAttr = target.getAttribute('action-attr');
    

    if (actionAttr?.endsWith('close') && action) {
      closeDropdown();
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={hover ? openDropdown : undefined}
      onMouseLeave={hover ? closeDropdown : undefined}
    >
      <div onClick={!hover ? toggleDropdown : undefined} className={className}>
        {children}
      </div>
      {isOpen && (
        <div
          className={`flex flex-col absolute ${position} w-full bg-white rounded-md shadow-xl z-50`}
          style={{ width: width }} onClick={action ? handleAction : undefined}
        >
          {elements}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
