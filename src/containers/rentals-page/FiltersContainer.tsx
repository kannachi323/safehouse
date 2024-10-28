'use client'
import { RangeSlider } from "@components/Sliders"
import { useState } from 'react';
import Dropdown from "@/components/Dropdown";
import SearchBar from "@components/SearchBar"
import { useQuery } from "@contexts/QueryContext"

import { CiLocationOn } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";



export default function FiltersContainer() {
  const queryContext = useQuery();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
  function toggleSidebar() {
    console.log("Menu toggled:", !isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-row items-center justify-center border-b-[#ffc00c] border-2 px-2 h-[8vh]">
      <SearchBar width="50%">
          <CiLocationOn className="text-3xl text-black hover:text-[#d4d2d2] cursor-pointer m-0"/>
      </SearchBar>
      <div className="relative flex flex-row items-center justify-start w-[50%]">
        
        <Dropdown color="#013c6c" elements={[]} 
          className="flex flex-row justify-around items-center m-3 border-2 rounded-lg h-9 border-[#013c6c] hover:bg-[#e7e6e6]">
          Bed/baths
        </Dropdown>
        
        <Dropdown color="#013c6c" elements={['3500']} context={queryContext}
          className="flex flex-row justify-around items-center m-3 border-2 rounded-lg h-9 border-[#013c6c] hover:bg-[#e7e6e6]">
          Price
        </Dropdown>
        
        <Dropdown color="#013c6c" elements={['Apartment', 'Condo', 'House']} 
          className="flex flex-row justify-around items-center m-3 border-2 rounded-lg h-9 border-[#013c6c] hover:bg-[#e7e6e6]">
          Home type
        </Dropdown>
        
        <div className="relative">
          <button
            className="flex flex-row justify-around items-center m-3 border-2 rounded-lg h-9 border-[#013c6c] hover:bg-[#e7e6e6]"
            onClick={toggleSidebar}
          >
            <span className="flex flex-row justify-between items-center w-full ml-2">
              More Filters
              <IoFilter className="self-center text-lg m-1"/>
            
            </span>
          </button>

          {isSidebarOpen && <SideBar/>}


        </div>
        

   
        
        <Dropdown color="013c6c" elements={[]}
          className="flex flex-row justify-around items-center m-3 border-2 rounded-lg h-9 border-[#013c6c] hover:bg-[#e7e6e6] bg-[#ffc00c]">
            Save search
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