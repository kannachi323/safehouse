"use client";
import Image from "next/image";
import BKG1 from "@public/images/bkg1.jpg"
import RENT1 from "@public/images/rent1.jpg";
import RENT2 from "@public/images/rent2.jpg";
import { useState } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import Dropdown from "@components/Dropdown"
import SearchBar from "@components/SearchBar"
import { CiLocationOn } from "react-icons/ci";

const UCSC = {
  lat: 36.9905,
  lng: -122.0584,
};
const containerStyle = {
  width: "100%",
  height: "100%",
};
export default function FindPlacesContainer() {
  const [location, setLocation] = useState(UCSC);
  const [error, setError] = useState(null);
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    )
  }
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
        <Dropdown label={"......"} color={"#ffffff"}/>
        
      </div>
      
      <div className="flex flex-col justify-center items-center m-20 w-3/4">
        <b className="text-white text-xl pr-12">Find a specific location</b>
        <SearchBar
          children={
            <CiLocationOn className="text-4xl text-white hover:text-[#d4d2d2] cursor-pointer" onClick={getLocation}/>
          } 
        />
      </div>
      
    </div>
  );
}
