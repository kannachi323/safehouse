'use client'
import BKG1 from "@public/images/bkg1.jpg"

import Dropdown from "@components/Dropdown"
import SearchBar from "@components/SearchBar"
import { CiLocationOn } from "react-icons/ci";

import { LoadScript, GoogleMap } from "@react-google-maps/api";
const containerStyle = {
  width: '100%',
  height: '45vh'
};
const location = {
  lat: 37.7749,
  lng: -122.4194
};

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
      <div className="w-3/4 h-[45vh]">
        <LoadScript googleMapsApiKey="AIzaSyBb2d6e4k7NtHJxX5lk65KUhvBZLYDE5Ww">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={12}
          ></GoogleMap>
        </LoadScript>
      </div>

      <div className="flex flex-col justify-center items-center m-20 w-">
        <b className="text-white text-xl">Select a school</b>
        <Dropdown color={"#013c6c"} elements={schoolList} className="relative bg-white flex flex-row justify-between items-center border-2 w-56 h-8
          border-white rounded-lg text-base">
          -------
        </Dropdown>
        
      </div>
      
      <div className="flex flex-col justify-center items-center m-20 w-1/2">
        <b className="text-white text-xl">Find a specific location</b>
        <SearchBar width="40vw">
          <CiLocationOn className="text-3xl text-[#013c6c]hover:text-[#d4d2d2] cursor-pointer m-0"
          />
        </SearchBar>
      </div>
      
    </div>
  );
}


