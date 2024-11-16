'use client'
import Dropdown from "@/components/Dropdown/Dropdown";
import { BedBathFilters, PriceFilters, MoreFilters } from "@/components/Dropdown/FiltersDropdownElements";
import { useQuery } from "@/contexts/QueryContext";

import SearchBar from "@components/SearchBar"

import { CiLocationOn } from "react-icons/ci";

import { MdOutlineArrowDropDown } from "react-icons/md";




export default function FiltersContainer() {
  const { setFilters, filters } = useQuery();

  
  return ( 
    <div className="flex flex-row items-center justify-center border-b-[#ffc00c] border-2 px-2 h-[8vh] w-full">
      <SearchBar className="relative inline-flex items-center justify-center rounded-lg bg-white h-9 border-[#013c6c] border-2 w-1/2">
          <CiLocationOn className="text-3xl text-black hover:text-[#d4d2d2] cursor-pointer m-0"/>
      </SearchBar>
      <div className="relative flex flex-row items-center justify-start w-[50%]">
        
        <Dropdown elements={<BedBathFilters filters={filters} setFilters={setFilters}/>} width='200%' position='top-[85%] left-0' action={true}
          className="inline-flex items-center justify-center m-3 pl-2 border-2 rounded-lg h-9 border-[#013c6c] text-[#013c6c] hover:bg-[#e7e6e6] cursor-pointer"
        >
          Bed/baths
          <MdOutlineArrowDropDown className="self-center text-3xl" />
        </Dropdown>
        
        <Dropdown elements={<PriceFilters filters={filters} setFilters={setFilters} />} width='350%' position='top-[85%] left-0' action={true}
          className="inline-flex items-center justify-center m-3 pl-2 border-2 rounded-lg h-9 border-[#013c6c] text-[#013c6c] hover:bg-[#e7e6e6] cursor-pointer">
          Price
          <MdOutlineArrowDropDown className="self-center text-3xl" />
        </Dropdown>
        
        <Dropdown elements={<MoreFilters filters={filters} setFilters={setFilters} />} width='300%' position='top-[85%] left-0' action={true}
          className="inline-flex items-center justify-center m-3 pl-2 border-2 rounded-lg h-9 border-[#013c6c] text-[#013c6c] hover:bg-[#e7e6e6] cursor-pointer">
          More Filters
          <MdOutlineArrowDropDown className="self-center text-3xl" />
        </Dropdown>

  
        <Dropdown className="inline-flex items-center justify-center m-3 pl-2 border-2 rounded-lg h-9 border-[#013c6c] text-[#013c6c] hover:bg-[#e7e6e6]" elements={[]}
        >
            Save search
            <MdOutlineArrowDropDown className="self-center text-3xl" />
        </Dropdown>
      </div>
    </div>
  )
}



