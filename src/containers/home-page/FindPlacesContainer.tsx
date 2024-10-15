import Dropdown from "@components/Dropdown"
import SearchBar from "@components/SearchBar"
import { CiLocationOn } from "react-icons/ci";

export default function FindPlacesContainer() {
  return (
    
       <div className="w-full flex flex-row justify-evenly items-center text-3xl">
          <div className="flex flex-col justify-center items-center">
            <b>Find your school</b>
            <Dropdown label={"hello"} color={"#ffffff"}/>
            
          </div>

          <div className="border-r-white border-r-dashed border-r-2 h-full"></div>
          
          <div className="flex flex-col justify-center items-center">
            <b>Find a specific location</b>
            <SearchBar children={<CiLocationOn className="text-6xl"/>} />
           

            
          </div>
            
        </div>
    
    
   
  );

}


