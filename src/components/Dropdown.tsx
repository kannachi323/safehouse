'use client';

import { MdOutlineArrowDropDown } from "react-icons/md";
import { useState } from "react";
import { QueryContextProps } from "@contexts/QueryContext"

// TypeScript type definitions for props
type DropdownProps = {
  color: string;
  elements: string[];
  children: string;
  className: string;
  context?: any;
};

export default function Dropdown({ color, elements, children, className, context }: DropdownProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [label, setLabel] = useState('')

  const { setFilters } = context || {};
 

  return (
    <div className="relative"> {/* Added relative positioning to parent div */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={className + ` text-[${color}]`}
      >
        <span className="flex flex-row justify-between items-center w-full pl-2">
          {label ? label : children}
          <MdOutlineArrowDropDown className="self-center text-3xl" />
        </span>
      </button>

      {showOptions && (
        <DropdownOptions
          elements={elements}
          setLabel={setLabel}
          setShowOptions={setShowOptions}
          contextProps = {setFilters}
        />
      )}
    </div>
  );
}

type DropdownOptionsProps = {
  elements: string[];
  setLabel: (label: string) => void;
  setShowOptions: (show: boolean) => void;
  contextProps : any;
};

function DropdownOptions({ elements, setLabel, setShowOptions, contextProps }: DropdownOptionsProps) {
  return (
    <div className="absolute left-0 top-[80%] mt-1 bg-white w-full border rounded-lg shadow-lg z-50">
      {elements.map((element, index) => (
        <button
          key={index}
          className="p-2 w-full text-left text-base hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            setLabel(element);
            setFilters()
            setShowOptions(false);
            
          }}
        >
          {element}
        </button>
      ))}
    </div>
  );
}
