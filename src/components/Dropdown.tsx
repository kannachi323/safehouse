'use client';

import { MdOutlineArrowDropDown } from "react-icons/md";
import { useState } from "react";

// TypeScript type definitions for props
type DropdownProps = {
  color: string;
  elements: string[];
  children: string;
  className: string;
};

export default function Dropdown({ color, elements, children, className }: DropdownProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('')

  return (
    <>
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={className + ` text-[${color}]`}
      >
        <span className="flex flex-row justify-around items-center w-full pl-2">
          {selectedLabel ? selectedLabel : children}
          <MdOutlineArrowDropDown className="self-center text-3xl" />
        </span>
      
      </button>

      {showOptions && (
        <DropdownOptions
          elements={elements}
          setSelectedLabel={setSelectedLabel}
          setShowOptions={setShowOptions}
        />
      )}
    </>
  );
}

type DropdownOptionsProps = {
  elements: string[];
  setSelectedLabel: (label: string) => void;
  setShowOptions: (show: boolean) => void;
};

function DropdownOptions({ elements, setSelectedLabel, setShowOptions }: DropdownOptionsProps) {
  return (
    <div className="absolute left-1/6 top-1/2 mt-7 bg-white w-56 border rounded-lg shadow-lg z-10">
      {elements.map((element, index) => (
        <button
          key={index}
          className="p-2 w-full text-left text-base hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            setSelectedLabel(element);
            setShowOptions(false);
          }}
        >
          {element}
        </button>
      ))}
    </div>
  );
}
