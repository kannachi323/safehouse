'use client';

import { MdOutlineArrowDropDown } from "react-icons/md";
import { useState } from "react";

// TypeScript type definitions for props
type DropdownProps = {
  color: string;
  elements: string[];
};

export default function Dropdown({ color, elements }: DropdownProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [label, setLabel] = useState("......");

  return (
    <>
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`relative bg-white flex flex-row justify-between items-center border-2 w-56 h-8
          border-white rounded-lg text-[${color}] text-base px-2`}
      >
        {label}
        <MdOutlineArrowDropDown className="self-center text-4xl" />
      </button>

      {showOptions && (
        <DropdownOptions
          elements={elements}
          setLabel={setLabel}
          setShowOptions={setShowOptions}
        />
      )}
    </>
  );
}

type DropdownOptionsProps = {
  elements: string[];
  setLabel: (label: string) => void;
  setShowOptions: (show: boolean) => void;
};

function DropdownOptions({ elements, setLabel, setShowOptions }: DropdownOptionsProps) {
  return (
    <div className="absolute left-1/6 top-1/2 mt-7 bg-white w-56 border rounded-lg shadow-lg z-10">
      {elements.map((element, index) => (
        <button
          key={index}
          className="p-2 w-full text-left text-base hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            setLabel(element);
            setShowOptions(false);
          }}
        >
          {element}
        </button>
      ))}
    </div>
  );
}
