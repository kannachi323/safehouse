'use client'
import { RangeSlider } from "@components/Sliders";
import { useState } from 'react';
import Dropdown from "@/components/Dropdown";
import SearchBar from "@components/SearchBar";
import { useQuery } from "@contexts/QueryContext";

import { CiLocationOn } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";

export default function FiltersContainer() {
  const queryContext = useQuery();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    parking: 'None', // 'Included', 'Extra Charge', or 'None'
    petStatus: 'None',
    laundry: 'None',
  });

  function toggleSidebar() {
    console.log("Menu toggled:", !isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOptionChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <div className="flex flex-row items-center justify-center border-b-[#ffc00c] border-2 px-2 h-[8vh] w-full">
      <SearchBar className="inline-flex items-center justify-center rounded-lg bg-white h-9 border-[#013c6c] border-2 w-1/2" context={queryContext}>
        <CiLocationOn className="text-3xl text-black hover:text-[#d4d2d2] cursor-pointer m-0"/>
      </SearchBar>
      <div className="relative flex flex-row items-center justify-start w-[50%]">
        
        <Dropdown color="#013c6c" elements={['1','2','3','4','5']} 
          className="flex flex-row justify-around items-center m-3 border-2 rounded-lg h-9 border-[#013c6c] hover:bg-[#e7e6e6]">
          Beds
        </Dropdown>
        
        <Dropdown color="#013c6c" elements={['1','2','3','4','5']} 
          className="flex flex-row justify-around items-center m-3 border-2 rounded-lg h-9 border-[#013c6c] hover:bg-[#e7e6e6]">
          Baths
        </Dropdown>
        
        <Dropdown color="#013c6c" elements={['<1,000','1,000-2,000','2,000-3,000','3,000-4,000','4,000-5,000','5,000+']} context={queryContext}
          className="flex flex-row justify-around items-center m-3 border-2 rounded-lg h-9 border-[#013c6c] hover:bg-[#e7e6e6]">
          Price/month
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
  );

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

        <li className="text-xl font-bold my-5 w-full hover:bg-[#e7e6e6] cursor-pointer">
          Parking
          <div className="flex flex-col gap-2 mt-2">
            {['Included', 'Extra Charge', 'None'].map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.parking === option}
                  onChange={() => handleOptionChange('parking', option)}
                  className="w-5 h-5 cursor-pointer mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </li>

        <li className="text-xl font-bold my-5 w-full hover:bg-[#e7e6e6] cursor-pointer">
          Pet Status
          <div className="flex flex-col gap-2 mt-2">
            {['Included', 'Extra Charge', 'None'].map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.petStatus === option}
                  onChange={() => handleOptionChange('petStatus', option)}
                  className="w-5 h-5 cursor-pointer mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </li>

        <li className="text-xl font-bold my-5 w-full hover:bg-[#e7e6e6] cursor-pointer">
          Laundry
          <div className="flex flex-col gap-2 mt-2">
            {['In-Unit', 'On-Site', 'None'].map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.laundry === option}
                  onChange={() => handleOptionChange('laundry', option)}
                  className="w-5 h-5 cursor-pointer mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </li>

        <li className="text-xl font-bold w-full flex flex-row justify-evenly items-center">
          <button
            className="border-2 rounded-lg px-4 py-2 hover:bg-[#f0f0f0]"
            onClick={() => setFilters({ parking: 'None', petStatus: 'None', laundry: 'None' })}
          >
            Reset
          </button>
          <button className="border-2 rounded-lg px-4 py-2 hover:bg-[#f0f0f0]">
            Apply
          </button>
        </li>
      </ul>
    );
  }
}
