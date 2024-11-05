// components/Dropdown.tsx
'use client';

import React, { useState, ReactNode, useRef, useEffect } from 'react';
import Link from 'next/link';

interface DropdownProps {
  className?: string;
  width? : string;
  elements: ReactNode[];
  children: ReactNode; 
}

function Dropdown({ className, width, elements, children } : DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  
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
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className={className}>
        {children}
      </div>
      {isOpen && (
        <div className={`flex flex-col absolute top-[90%] mt-1 right-0 w-full py-2 bg-white rounded-md shadow-xl z-50`}
          style={{width : width}}
        >
          {elements}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
