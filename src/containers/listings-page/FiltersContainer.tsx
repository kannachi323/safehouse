'use client'
import Dropdown from "@/components/DropdownElements/Dropdown";
import SearchBar from "@components/SearchBar"
import { useQuery } from '@/contexts/QueryContext';


import { CiLocationOn } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { BedBathFilters } from "@/components/DropdownElements/FiltersDropdownElements";



export default function FiltersContainer() {
  const { filters, refresh } = useQuery();
  console.log(filters)
  console.log(refresh)
  //Bed, baths
  
  return ( 
    <div className="flex flex-row items-center justify-center border-b-[#ffc00c] border-2 px-2 h-[8vh] w-full">
      <SearchBar className="relative inline-flex items-center justify-center rounded-lg bg-white h-9 border-[#013c6c] border-2 w-1/2">
          <CiLocationOn className="text-3xl text-black hover:text-[#d4d2d2] cursor-pointer m-0"/>
      </SearchBar>
      <div className="relative flex flex-row items-center justify-start w-[50%]">
        
        <Dropdown elements={BedBathFilters()} width='200%' position='top-[80%] left-0' action={true}
          className="inline-flex items-center justify-center m-3 pl-2 border-2 rounded-lg h-9 border-[#013c6c] text-[#013c6c] hover:bg-[#e7e6e6]"
        >
          Bed/baths
          <MdOutlineArrowDropDown className="self-center text-3xl" />
        </Dropdown>
        
        <Dropdown elements={['3500']}
          className="inline-flex items-center justify-center m-3 pl-2 border-2 rounded-lg h-9 border-[#013c6c] text-[#013c6c] hover:bg-[#e7e6e6]">
          Price
          <MdOutlineArrowDropDown className="self-center text-3xl" />
        </Dropdown>
        
        <button className="inline-flex items-center justify-center m-3 pl-2 border-2 rounded-lg h-9 border-[#013c6c] text-[#013c6c] hover:bg-[#e7e6e6]" 
          
        >
              More Filters
              <IoFilter className="self-center text-lg m-2"/>
              
              
        </button>

  
        <Dropdown className="inline-flex items-center justify-center m-3 pl-2 border-2 rounded-lg h-9 border-[#013c6c] text-[#013c6c] hover:bg-[#e7e6e6]" elements={[]}
        >
            Save search
            <MdOutlineArrowDropDown className="self-center text-3xl" />
        </Dropdown>
      </div>
    </div>
  )
}