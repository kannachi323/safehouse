'use client'
import BKG1 from "@public/images/bkg1.jpg"

import Dropdown from "@components/Dropdown"
import SearchBar from "@components/SearchBar"
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { QueryProvider } from "@/contexts/QueryContext";

export default function FindPlacesContainer() {
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
        <b className="text-white text-xl">Select a school</b>
        <Dropdown elements={schoolList} className="relative bg-white flex flex-row justify-between items-center border-2 w-56 h-8
          border-white rounded-lg text-base">
          -------
          <MdOutlineArrowDropDown className="inline-flex text-3xl" />
        </Dropdown>
        
      </div>
      
      <div className="flex flex-col justify-center items-center m-20 w-1/2">
        <b className="text-white text-xl">Find a specific location</b>
        <QueryProvider>

          <SearchBar className="inline-flex items-center justify-center rounded-lg bg-white h-9 border-[#013c6c] border-2 w-full">
            <CiLocationOn className="text-3xl text-[#013c6c]hover:text-[#d4d2d2] cursor-pointer m-0"
            />
          </SearchBar>

        </QueryProvider>
        
      </div>
      
    </div>
  );
}