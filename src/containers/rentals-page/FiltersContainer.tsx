'use-client';
import Dropdown from "@/components/Dropdown";
import SearchBar from "@components/SearchBar"
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineSavedSearch } from "react-icons/md";

import { useState } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

export default function FiltersContainer() {
  return (
    <div className="flex flex-row items-center justify-center border-b-[#ffc00c] p-1 border-2 w-screen">
      <SearchBar width="50%">
          <CiLocationOn className="text-3xl text-black hover:text-[#d4d2d2] cursor-pointer m-0"/>
      </SearchBar>
      <div className="flex flex-row items-center justify-start w-[50%]">
        
        <Dropdown color="#013c6c" elements={[]} 
          className="flex flex-row justify-around items-center m-3 border-2 rounded-lg h-9 border-[#013c6c] hover:bg-[#e7e6e6]">
          Bed/baths
        </Dropdown>
        
        <Dropdown color="#013c6c" elements={[]} 
          className="flex flex-row justify-around items-center m-3 border-2 rounded-lg h-9 border-[#013c6c] hover:bg-[#e7e6e6]">
          Price
        </Dropdown>
        
        <Dropdown color="#013c6c" elements={[]} 
          className="flex flex-row justify-around items-center m-3 border-2 rounded-lg h-9 border-[#013c6c] hover:bg-[#e7e6e6]">
          Home type
        </Dropdown>
        
        <Dropdown color="#013c6c" elements={[]} 
          className="flex flex-row justify-around items-center m-3 border-2 rounded-lg h-9 border-[#013c6c] hover:bg-[#e7e6e6]">
          All Filters
        </Dropdown>
        
        <Dropdown color="013c6c" elements={[]}
          className="flex flex-row justify-around items-center m-3 border-2 rounded-lg h-9 border-[#013c6c] hover:bg-[#e7e6e6] bg-[#ffc00c]">
            Save search
        </Dropdown>
      </div>
    </div>
  )
}