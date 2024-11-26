'use client';
import RENT1 from "@public/images/rent1.jpg";
import RENT2 from "@public/images/rent2.jpg";
import BKG from "@public/images/bkg1.jpg";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlinePersonOutline} from "react-icons/md";
import { Listing } from "@/types";
import { IoMdClose } from "react-icons/io";
import { FaPhone, FaRegBookmark, FaBookmark, FaBed} from "react-icons/fa6";
import MapsContainer from "@containers/listings-page/MapsContainer"
import { createChat } from '@/firebase/db';
import { useAuth } from "@/contexts/AuthContext";
import { ChatInput } from "./Inputs";

interface ListingContentCardProps {
  className?: string;
  listing?: Listing;
  toggleFunction?: () => void;
  children?: React.ReactNode;
}



export function ListingContentCard({ className, listing, toggleFunction, children }: ListingContentCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
 

  const images = [RENT1, RENT2, BKG];

  function nextStep() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  function prevStep() {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }

  return (
    <>
      {/* Main Listing Card */}
      <div
        className={`${className} bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer`}
        onClick={toggleFunction}
      >
        <div
          id="framer-slideshow"
          className="relative w-full h-1/2"
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          <Image
            src={images[currentIndex]}
            alt="Listing Image"
            className="object-cover w-full h-full"
          />
          {showArrows && (
            <button className="absolute top-1/2 left-0 text-white" onClick={(e) => { e.stopPropagation(); prevStep(); }}>
              <MdKeyboardArrowLeft className="text-5xl" />
            </button>
          )}
          {showArrows && (
            <button className="absolute top-1/2 right-0 text-white" onClick={(e) => { e.stopPropagation(); nextStep(); }}>
              <MdKeyboardArrowRight className="text-5xl" />
            </button>
          )}
        </div>

        {listing && (
          <div className="flex flex-col justify-evenly w-full p-4">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">${listing.price}/mo</h1>
            <p className="text-gray-700 mt-2">
              {listing.address + ' '}
            </p>
            <p className="text-gray-700 mt-2">
              {listing.city + ' '}{listing.state + ' '}{listing.zip_code}
            </p>
            {listing.feature && (
              <p className="text-gray-600 text-sm mt-2">
                {listing.feature.bed_count ?? 0} bd / {listing.feature.bath_count ?? 0} ba
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </>
  );
}

interface ListingFullDetailsCardProps {
  className?: string;
  listing?: Listing;
  onClose: () => void;
}

export function ListingFullDetailsCard({ className, listing, onClose }: ListingFullDetailsCardProps) {
  const { user } = useAuth();
  const [showCreateChat, setShowCreateChat] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  function handleSaveListing() {
    //TODO: do some db stuff to save listing
    setIsSaved(!isSaved);
  }

  async function handleCreateChat(e: React.FormEvent) {
    e.preventDefault();
    try {
      const form = e.target as HTMLFormElement;
      const textarea = form.querySelector("textarea") as HTMLTextAreaElement;

      await createChat(user?.uid, listing?.uid, textarea.value.trim());
      
    } catch (error) {
      console.error("Something went wrong...", error);
    }

    setShowCreateChat(false);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose} // Close the popup when the backdrop is clicked
      />

      {/* Popup Content */}
      <div
        className={`${className} fixed inset-10 z-[50]`}
      >
        <IoMdClose
          className="absolute top-4 right-4 text-black text-3xl cursor-pointer"
          onClick={onClose}
        />


       
        <ListingContentCard listing={listing} className="flex-grow w-1/2 h-full cursor-default">
          <MapsContainer width="100%" height="25%" showRadius={false} listing={listing}/>
          
        </ListingContentCard>
          
  
        
        <div className="relative flex flex-col w-1/2 h-full">
            {/* Fixed Header Section */}
            <div className="flex flex-row justify-evenly items-center h-[10%] bg-white p-4 shadow-md z-50">
              <button
                className="flex items-center px-4 py-2  bg-[#fdc100] text-[#023c6c] rounded-lg"
                onClick={() => handleSaveListing()}
              >
                {isSaved ? <FaBookmark className="text-2xl mr-2" /> : <FaRegBookmark className="text-2xl mr-2" />}
                Save Listing
              </button>
              
              {/* Contact Button */}
              <button
                className="flex items-center px-4 py-2 bg-[#023c6c] text-[#fdc100] rounded-lg"
                onClick={() => setShowCreateChat(true)}
              >
                <FaPhone className="mr-3"/>
                Contact Landlord
              </button>
              
            </div>


            <div className="flex flex-col w-full h-[90%] z-50 pr-5 overflow-y-auto text-[#023c6c]">
              {/* this content should be scrollable */}
              <h2 className="text-xl w-full py-5">{listing?.feature?.description? listing.feature.description : 'No description available...'}</h2>
              
              <b className="text-2xl bg-[#fdc100] p-2">Room Preferences</b>
              
              <div className="flex flex-row justify-evenly items-center p-2 mb-10">
                <FaBed className="text-5xl mr-2"/>
                <p className="text-md p-2">{listing?.feature?.room_type? listing.feature.room_type : 'No room type available...'}</p>
                <MdOutlinePersonOutline className="text-5xl mr-2"/>
                <p className="text-md pl-2">{listing?.feature?.roommate_gender? listing.feature.roommate_gender : 'No roommate gender preferences available...'}</p>
              </div>
                
        
              
              
              
              
             
              <b className="text-2xl bg-[#fdc100] p-2">Policies</b>
                
              <p className="text-md w-full py-5 px-3">{listing?.feature?.policies? listing?.feature.policies : 'No policies available...'}</p>
              <p className="text-md w-full py-5 px-3">{listing?.feature?.is_pets? listing.feature.is_pets : 'No pet options available...'}</p>




              
            </div>

            

          
        </div>
        
        {showCreateChat && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
              onClick={() => setShowCreateChat(false)}
            />
            
            <form
              onSubmit={handleCreateChat}
              className="fixed inset-30 z-[70] w-3/4 bg-white p-6 rounded-md shadow-lg"
              autoComplete="off"
            > 
              <IoMdClose
                className="absolute top-4 right-4 text-black text-3xl cursor-pointer"
                onClick={() => setShowCreateChat(false)}
              />
              <h2 className="text-xl font-bold mb-4">What do you want to ask the landlord?</h2>
              <textarea

                className="p-4 h-40 rounded-md border border-slate-300 w-full"
                placeholder="Type your message here..."
              />
              <button
                type="submit"
                className="bg-[#ffc00c] text-[#023c6c] h-10 px-6 py-2 rounded-md hover:bg-[#e5a700] mt-4"
              >
                Send Message
              </button>
            </form>
          </>
        )}

  
      
      </div>

     
      
    </>
  );
}