'use client'
import BKG1 from "@public/images/bkg1.jpg"
import SearchBar from "@components/SearchBar"
import { CiLocationOn } from "react-icons/ci";

export default function FindPlacesContainer() {
  return (
    <div className="flex flex-col justify-center items-center bg-blue-500 relative h-[45vh] w-full text-3xl"
      style={{
        backgroundImage: `url(${BKG1.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >

        <b className="text-white text-xl mb-2">Find a specific location</b>
        

        <SearchBar className="relative inline-flex items-center justify-center rounded-lg bg-white h-10 border-[#013c6c] border-2 w-[45%]">
          <CiLocationOn className="text-3xl text-[#013c6c] hover:text-[#d4d2d2] cursor-pointer" />
        </SearchBar>

    

    </div>
  );
}