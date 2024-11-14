'use client'
import BKG1 from "@public/images/bkg1.jpg"

import Dropdown from "@/components/DropdownElements/Dropdown"
import SearchBar from "@components/SearchBar"
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { QueryProvider } from "@/contexts/QueryContext";
import { useState } from "react";

export default function FindPlacesContainer() {
  const [selectedSchool, setSelectedSchool] = useState('-- Select --');

  const schoolList : string[] = ["UC Santa Cruz", "UC Berkeley", "UCLA", "UC Riverside", "UC Santa Barbara", 
    "UC Davis", "UC San Diego", "UC Irvine"]

  return (
    <div className="flex flex-row justify-between items-center bg-blue-500 relative h-[45vh] w-full text-3xl"
      style={{
        backgroundImage: `url(${BKG1.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >

      <div className="flex flex-col justify-center items-center m-20 w-1/2">
        <b className="text-white text-xl mb-2">Select a school</b>
        <div className="flex flex-row items-center">
          <Dropdown className="relative bg-white flex flex-row justify-between items-center 
            border-[#013c6c] border-2 rounded-lg w-52 h-9 text-base px-2 mb-2"
            action={true}
            elements={schoolList.map((school) => (
              <li
                key={school}
                className="p-2 hover:bg-gray-200 list-none text-base rounded-md"
                onClick={() => setSelectedSchool(school)}
              >
                {school}
              </li>
            ))}
          >
            {selectedSchool}
            <MdOutlineArrowDropDown className="inline-flex text-3xl" />
          </Dropdown>
        </div>
      

        
      </div>
      
      <div className="flex flex-col justify-center items-center m-20 w-2/3">
        <b className="text-white text-xl mb-2">Find a specific location</b>
        <QueryProvider>

          <SearchBar className="relative inline-flex items-center justify-center rounded-lg bg-white h-10 border-[#013c6c] border-2 w-full">
            <CiLocationOn className="text-3xl text-[#013c6c] hover:text-[#d4d2d2] cursor-pointer"
            />
          </SearchBar>

        </QueryProvider>
        
      </div>
      
    </div>
  );
}