'use client'
import Dropdown from "@/components/Dropdown";
import SearchBar from "@components/SearchBar"
import { useQuery } from "@contexts/QueryContext"

import { CiLocationOn } from "react-icons/ci";



export default function FiltersContainer() {
  const queryContext = useQuery();

  return (
    <div className="flex flex-row items-center justify-center border-b-[#ffc00c] border-2 px-2">
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