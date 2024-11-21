'use client'
import BKG1 from "@public/images/bkg1.jpg";

import Dropdown from "@/components/Dropdown/Dropdown";
import SearchBar from "@components/SearchBar";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { QueryProvider } from "@/contexts/QueryContext";
import { useState } from "react";

export default function FindPlacesContainer() {
  const [selectedSchool, setSelectedSchool] = useState('-- Select --');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSchoolSelect = (school) => {
    setSelectedSchool(school); // Update selected school
    setIsDropdownOpen(false); // Close dropdown
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility

  const schoolList = [
    "UC Santa Cruz",
    "UC Berkeley",
    "UCLA",
    "UC Riverside",
    "UC Santa Barbara",
    "UC Davis",
    "UC San Diego",
    "UC Irvine",
  ];

  return (
    <div
      className="flex flex-row justify-between items-center bg-blue-500 relative h-[45vh] w-full text-3xl"
      style={{
        backgroundImage: `url(${BKG1.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Select a School Section */}
      <div className="flex flex-col justify-center items-center m-20 w-1/2">
        <b className="text-white text-xl mb-2">Select a school</b>
        <div className="flex flex-row items-center relative">
          {/* Dropdown Trigger */}
          <div
            className="relative bg-white flex flex-row justify-between items-center 
            border-[#013c6c] border-2 rounded-lg w-52 h-9 text-base px-2 mb-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <span>{selectedSchool}</span>
            <MdOutlineArrowDropDown className="inline-flex text-3xl" />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <ul className="absolute top-12 left-0 bg-white border-[#013c6c] border-2 rounded-lg w-52 mt-1 z-10">
              {schoolList.map((school) => (
                <li
                  key={school}
                  className="p-2 hover:bg-gray-200 list-none text-base rounded-md cursor-pointer"
                  onClick={() => handleSchoolSelect(school)} // Select school and close dropdown
                >
                  {school}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Find a Specific Location Section */}
      <div className="flex flex-col justify-center items-center m-20 w-2/3">
        <b className="text-white text-xl mb-2">Find a specific location</b>
        <QueryProvider>
          <SearchBar className="relative inline-flex items-center justify-center rounded-lg bg-white h-10 border-[#013c6c] border-2 w-full">
            <CiLocationOn className="text-3xl text-[#013c6c] hover:text-[#d4d2d2] cursor-pointer" />
          </SearchBar>
        </QueryProvider>
      </div>
    </div>
  );
}
