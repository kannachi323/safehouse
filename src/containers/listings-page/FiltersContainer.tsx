'use client'
import { RangeSlider } from "@components/Sliders"
import { useState } from 'react';
import Dropdown from "@/components/Dropdown";
import SearchBar from "@components/SearchBar"
import { useQuery } from "@contexts/QueryContext"

import { CiLocationOn } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";



export default function FiltersContainer() {
  const queryContext = useQuery();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
  function toggleSidebar() {
    console.log("Menu toggled:", !isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-row items-center justify-center border-b-[#ffc00c] border-2 px-2 h-[8vh] w-full">
      <SearchBar className="inline-flex items-center justify-center rounded-lg bg-white h-9 border-[#013c6c] border-2 w-1/2" context={queryContext}>
          <CiLocationOn className="text-3xl text-black hover:text-[#d4d2d2] cursor-pointer m-0"/>
      </SearchBar>
      <div className="relative flex flex-row items-center justify-start w-[50%]">
        
        <Dropdown elements={[]} 
          className="inline-flex items-center justify-center m-3 pl-2 border-2 rounded-lg h-9 border-[#013c6c] text-[#013c6c] hover:bg-[#e7e6e6]">
          Bed/baths
          <MdOutlineArrowDropDown className="self-center text-3xl" />
        </Dropdown>
        
        <Dropdown elements={['3500']}
          className="inline-flex items-center justify-center m-3 pl-2 border-2 rounded-lg h-9 border-[#013c6c] text-[#013c6c] hover:bg-[#e7e6e6]">
          Price
          <MdOutlineArrowDropDown className="self-center text-3xl" />
        </Dropdown>
        
        <Dropdown className="inline-flex items-center justify-center m-3 pl-2 border-2 rounded-lg h-9 border-[#013c6c] text-[#013c6c] hover:bg-[#e7e6e6]" elements={['Apartment', 'Condo', 'House']}>
          Home type
          <MdOutlineArrowDropDown className="self-center text-3xl" />
        </Dropdown>
        
        <Dropdown className="inline-flex items-center justify-center m-3 pl-2 border-2 rounded-lg h-9 border-[#013c6c] text-[#013c6c] hover:bg-[#e7e6e6]" elements={[]}>
              More Filters
              <IoFilter className="self-center text-lg m-2"/>
              
              
        </Dropdown>

  
        <Dropdown className="inline-flex items-center justify-center m-3 pl-2 border-2 rounded-lg h-9 border-[#013c6c] text-[#013c6c] hover:bg-[#e7e6e6]" elements={[]}
        >
            Save search
            <MdOutlineArrowDropDown className="self-center text-3xl" />
        </Dropdown>
      </div>
    </div>
  )

  function SideBar() {
    return (
      <ul
        className="flex flex-col items-start justify-evenly absolute right-[5%] top-[80%] mt-1 bg-white w-[30vw] border rounded-lg shadow-lg z-50 p-3"
      >
          
        <h2 className="text-xl font-bold border-b-2 border-b-[#ffc00c] w-full">More Filters</h2>
       
          <li className="text-xl font-bold my-5 w-full hover:bg-[#e7e6e6] cursor-pointer" onClick={toggleSidebar}>
            Square Feet 
          </li>
          
          <RangeSlider min={0} max={5000}/>
          
          <li className="text-xl font-bold my-5 w-full hover:bg-[#e7e6e6] cursor-pointer" onClick={toggleSidebar}>
            Distance
          </li>
          <li className="text-xl font-bold my-5 w-full hover:bg-[#e7e6e6] cursor-pointer" onClick={toggleSidebar}>
            Parking
          </li>
          <li className="text-xl font-bold my-5 w-full hover:bg-[#e7e6e6] cursor-pointer" onClick={toggleSidebar}>
            Pet status
          </li>
          <li className="text-xl font-bold my-5 w-full hover:bg-[#e7e6e6] cursor-pointer " onClick={toggleSidebar}>
            Laundry
          </li>
          <li className="text-xl font-bold my-5 w-full hover:bg-[#e7e6e6] cursor-pointer " onClick={toggleSidebar} >
            Parking
          </li>
          <li className="text-xl font-bold w-full flex flex-row justify-evenly items-center ">
            <button className="border-2 rounded-lg">Reset</button>
            <button>Apply</button>
          </li>

      </ul>
    )
  }
}