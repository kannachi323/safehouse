'use client';
import PHOTO from "@public/images/photo.jpg";
import { useState } from 'react';
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlinePersonOutline}  from "react-icons/md";
import { Listing } from "@/types";
import { IoMdClose } from "react-icons/io";
import { FaPhone, FaRegBookmark, FaBookmark, FaBed} from "react-icons/fa6";
import MapsContainer from "@containers/listings-page/MapsContainer"
import { createChat } from '@/firebase/db';
import { useAuth } from "@/contexts/AuthContext";


interface ListingContentCardProps {
  className?: string;
  listing?: Listing;
  toggleFunction?: () => void;
  children?: React.ReactNode;
  animate?: boolean;
}

export function ListingContentCard({
  className = "",
  listing,
  toggleFunction,
  children,
  animate = true,
}: ListingContentCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showArrows, setShowArrows] = useState(false);

  const images = listing?.media || [];


  const nextStep = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevStep = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

  return (
    <div
      className={`${className} bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer ${animate && "transform transition hover:scale-105 hover:shadow-2xl"}`}
      onClick={toggleFunction}
    >
      {/* Slideshow Section */}
      <div
        id="framer-slideshow"
        className="relative w-full max-h-[50%] aspect-[4/3] overflow-hidden"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        {images.length > 0 ? (
          <Image
            src={images[currentIndex].ref}
            alt="Listing Image"
            className="object-cover w-full h-full"
            fill
          />
      
          ) : (
        
            <Image
              src={PHOTO.src}
              alt="Listing Image"
              className="object-cover w-full h-full"
              fill
            />
        )}
        
        {showArrows && images.length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation();
                prevStep();
              }}
            >
              <MdKeyboardArrowLeft className="text-2xl" />
            </button>
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation();
                nextStep();
              }}
            >
              <MdKeyboardArrowRight className="text-2xl" />
            </button>
          </>
        )}
      </div>

      {/* Listing Information Section */}
      <div className="p-4 h-1/4 w-full flex flex-col justify-evenly">
        {/* Price */}
        <h2 className="text-xl font-semibold text-gray-800">${listing?.price ?? "N/A"} / mo</h2>
        {/* Address */}
        <p className="text-gray-600 mt-1">
          {listing?.address ?? "Unknown Address"}
        </p>
        <p className="text-gray-600">
          {listing?.city ?? "Unknown City"} {listing?.state ?? "Unknown State"} {listing?.zip_code ?? ""}
        </p>
        {/* Features */}
        {listing?.feature && (
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">
            <span>{listing.feature.bed_count ?? 0} bd</span> •{" "}
            <span>{listing.feature.bath_count ?? 0} ba</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}


interface ListingFullDetailsCardProps {
  className?: string;
  listing?: Listing;
  onClose: () => void;
  preview?: boolean;
}

export function ListingFullDetailsCard({ className, listing, onClose, preview=false}: ListingFullDetailsCardProps) {
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
    alert("Message sent! Check your message in the Messages tab");
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
          className="absolute top-3 right-3 text-black text-3xl cursor-pointer"
          onClick={onClose}
        />


       
        <ListingContentCard listing={listing} className="w-1/2 h-full cursor-default" animate={false}>
          <MapsContainer width="100%" height="25%" showRadius={false} listing={listing}/>
          
        </ListingContentCard>
          
  
        
        <div className="relative flex flex-col w-1/2 h-full">
            {/* Fixed Header Section */}
            <div className="flex flex-row justify-evenly items-center h-[10%] w-full bg-white p-4 shadow-md z-50 mb-5">
              <button
                className="flex items-center px-4 py-2  bg-[#fdc100] text-[#023c6c] rounded-lg"
                onClick={() => handleSaveListing()}
              >
                {isSaved && !preview ? <FaBookmark className="text-2xl mr-2" /> : <FaRegBookmark className="text-2xl mr-2" />}
                Save Listing
              </button>
              
              {/* Contact Button */}
              <button
                className="flex items-center px-4 py-2 bg-[#023c6c] text-[#fdc100] rounded-lg"
                onClick={() => {
                  if (!preview) {
                    setShowCreateChat(true)
                  }
                }}
              >
                <FaPhone className="mr-3"/>
                Contact Landlord
              </button>
              
            </div>


            <div className="flex flex-col w-full h-[90%] z-50 pr-5 overflow-y-auto text-[#023c6c]">
              {/* this content should be scrollable */}
              <b className="text-2xl bg-[#fdc100] p-2">Description</b>
              <h2 className="text-xl w-full py-5">{listing?.feature?.description? listing.feature.description : 'No description available...'}</h2>
              
              <b className="text-2xl bg-[#fdc100] p-2">Room Preferences</b>
              
              <div className="flex flex-row justify-evenly items-center p-2">
                <FaBed className="text-5xl mr-2"/>
                <p className="text-md p-2">{listing?.feature?.room_type? listing.feature.room_type : 'No room type available...'}</p>
                <MdOutlinePersonOutline className="text-5xl mr-2"/>
                <p className="text-md pl-2">{listing?.feature?.roommate_gender? listing.feature.roommate_gender : 'No roommate gender preferences available...'}</p>
              </div>
                
        
              
              
              
              
             
              <b className="text-2xl bg-[#fdc100] p-2">Policies</b>
                
              <p className="text-md w-full py-5 px-3">{listing?.feature?.policies? listing?.feature.policies : 'No policies available...'}</p>
             




              
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