'use client'
import Link from "next/link";
import Image from "next/image"
import FindPlacesContainer from "@/containers/home-page/FindPlacesContainer"
import NavBar from "@/components/NavBar";
import { useGoogleMaps } from "@/contexts/GoogleMapsContext";
import { QueryProvider } from "@/contexts/QueryContext";
import { Carousel } from "@/components/Carousel";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TbSpy } from "react-icons/tb";
import { FaRegBookmark, FaTools, FaCloudUploadAlt } from "react-icons/fa"; 
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import Logo from "@/components/Logos";



export default function Home() {
  const [toggleContent, setToggleContent] = useState(true);

  const sample_images = ["/images/sample/sample1.jpg", "/images/sample/sample2.jpg", "/images/sample/sample3.jpg", 
    "/images/sample/sample4.jpg", "/images/sample/sample5.jpg", "/images/sample/sample6.jpg"
  ];
  
  const { isLoaded, loadError } = useGoogleMaps();

  if (!isLoaded) {
    return
  }
  if (loadError) {
    return <div className="self-center items-center">Sorry, experiencing some issues at the moment</div>
  }

  return(
    <QueryProvider>
        <NavBar/>

        
        {/* section 1 */}
        <div className="bg-[#f7f7f7] text-[#013c6c] flex flex-col justify-start items-center" >
          <FindPlacesContainer />

            {/* renter or landlord */}
            <div className="text-[#013c6c] flex flex-col items-center py-10 px-6">
              <div className="flex flex-row gap-6 p-5 shadow-lg rounded-2xl mb-10">
                <button className={`text-[#fdc100] py-3 px-8 rounded-full text-xl font-semibold transition-all duration-300 hover:bg-[#013c6c]
                  ${toggleContent && "bg-[#013c6c]"}`}
                  onClick={() => setToggleContent(true)}
                >
                  Renter
                </button>
                <button className={`text-[#013c6c] py-3 px-8 rounded-full text-xl font-semibold transition-all duration-300 hover:bg-[#fdc100]
                  ${!toggleContent && "bg-[#fdc100]"}`}
                  onClick={() => setToggleContent(false)}
                >
                  
                  Landlord
                </button>
              </div>
              {toggleContent ? <Renter /> : <Landlord />}
              
              
            </div>

          
        </div>

       
 

        <div className="bg-white text-[#013c6c] flex flex-col justify-start items-center py-10">
          <b className="text-[#013c6c] self-center text-3xl p-10 shadow-lg rounded-2xl">
            All your rental options from <span className="text-[#ffc00c]">trusted</span> sources
          </b>

          

          <div className="flex flex-row justify-evenly items-center w-full">
            
            <Image src={"/images/brands/apartments-com.png"}  alt="Some logo" width={300} height={100} />
            <Image src={"/images/brands/zillow.jpg"}  alt="Some logo" width={300} height={100} />
            <Image src={"/images/brands/redfin.png"}  alt="Some logo" width={200} height={100} />
            <Image src={"/images/brands/facebook.jpg"}  alt="Some logo" width={200} height={100} />
          </div>

          <div className="flex flex-row justify-evenly items-center gap-x-20 w-full h-full">
            <Image src={"/images/brands/realtor.png"}  alt="Some logo" width={200} height={100} />
            <Image src={"/images/brands/craigslist.png"}  alt="Some logo" width={300} height={100} />
            <Image src={"/images/brands/trulia.png"}  alt="Some logo" width={150} height={100} />
          </div>
          <Carousel images={sample_images}/>
          
        </div>

        {/* Section 3 */}
       
          <div className="flex flex-row justify-evenly items-center bg-[#f7f7f7] py-20 space-x-8">
            
            {/* First Card - Button inside linking to /rent */}
            <div className="w-[400px] h-[400px] bg-[#ffffff] rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <div className="flex flex-col justify-center items-center h-full p-6">
                <b className="text-[#013c6c] text-2xl mb-4">Find a Place to Rent</b>
                <Image src="/images/house.jpg" alt="roommates" width={200} height={100} className="mb-4 rounded-lg" />
                <Link href="/rent" passHref>
                  <button className="bg-[#ffc00c] text-[#013c6c] px-4 py-2 rounded-lg mt-4 hover:bg-[#fd9c00] transition-colors">
                    Explore Rentals
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Second Card - Button inside linking to /roommates */}
            <div className="w-[400px] h-[400px] bg-[#ffffff] rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <div className="flex flex-col justify-center items-center h-full p-6">
                <b className="text-[#013c6c] text-2xl mb-4">Find Roommates</b>
                <Image src="/images/roommates.jpg" alt="roommates" width={300} height={200} className="mb-4 rounded-lg" />
                <Link href="/roommates" passHref>
                  <button className="bg-[#ffc00c] text-[#013c6c] px-4 py-2 rounded-lg mt-4 hover:bg-[#fd9c00] transition-colors">
                    Find Roommates
                  </button>
                </Link>
              </div>
            </div>

          </div>
      


       

        {/* footer */}
        <div className="bg-white text-[#013c6c] py-8 flex flex-col justify-center items-center">
          <Logo className="text-4xl mb-8" />
      
          <div className="flex flex-row justify-center items-center gap-10">
            
            <Link href="/" className="text-lg hover:text-[#fdc100]">Home</Link>
            <span className="inline-flex">|</span>
            <Link href="/about" className="text-lg hover:text-[#fdc100]">About</Link>
            <span className="inline-flex">|</span>
            <Link href="/contact" className="text-lg hover:text-[#fdc100]">Contact</Link>
        
          </div>
        
    
        </div>
      </QueryProvider>
  );
}


function Renter() {
  return (
    <>
      <h2 className="text-4xl font-bold text-start py-5 mb-10">
        As a <span className="text-[#ffc00c]">renter</span>, you'll have access to
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {/* Messaging System */}
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 text-center max-w-xs">
          <div className="bg-[#013c6c] p-4 rounded-full">
            <BiMessageSquareDetail className="text-6xl text-[#ffc00c]" />
          </div>
          <p className="text-lg mt-4">
            Built-in messaging system that allows you to safely communicate with landlords
          </p>
        </div>

        {/* Scam Detection */}
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 text-center max-w-xs">
          <div className="bg-[#013c6c] p-4 rounded-full">
            <TbSpy className="text-6xl text-[#ffc00c]" />
          </div>
          <p className="text-lg mt-4">
            Scam detection system that ensures you only see legitimate listings
          </p>
          <b className="m-5">COMING SOON</b>
        </div>

        {/* Save Listings */}
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 text-center max-w-xs">
          <div className="bg-[#013c6c] p-4 rounded-full">
            <FaRegBookmark className="text-6xl text-[#ffc00c]" />
          </div>
          <p className="text-lg mt-4">
            Save your favorite listings for easy access and organization
          </p>
          
        </div>

        {/* Find Roommates */}
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 text-center max-w-xs">
          <div className="bg-[#013c6c] p-4 rounded-full">
            <BsPeopleFill className="text-6xl text-[#ffc00c]" />
          </div>
          
          <p className="text-lg mt-4">
            Find roommates and share your preferences with them
          </p>
          <b className="m-5">COMING SOON</b>
        </div>
      </div>
    
    </>
  )
}

function Landlord() {
  return (
    <>
      {/* landlord section */}
      <h2 className="text-4xl font-bold text-start py-5 mb-10">
        As a <span className="text-[#013c6c]">landlord</span>, you'll have access to
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        
        {/* dashboard */}
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 text-center max-w-xs">
          <div className="bg-[#ffc00c] p-4 rounded-full">
            
            <MdOutlineSpaceDashboard className="text-6xl text-[#013c6c]" />
          </div>
          <p className="text-lg mt-4">
            Track you listings statistics such as total views, user engagment, ratings, and more
          </p>
          <b className="m-5">COMING SOON</b>
        </div>

        {/* publish listings */}
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 text-center max-w-xs">
          <div className="bg-[#ffc00c] p-4 rounded-full">
            <FaCloudUploadAlt className="text-6xl text-[#013c6c]" />
          </div>
          <p className="text-lg mt-4">
            Create, edit, and publish your listings with our simple to use properties manager
          </p>
        </div>

        {/* Messaging System */}
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 text-center max-w-xs">
          <div className="bg-[#ffc00c] p-4 rounded-full">
            <BiMessageSquareDetail className="text-6xl text-[#013c6c]" />
          </div>
          <p className="text-lg mt-4">
            Built-in messaging system that allows you to safely communicate with renters
          </p>
        </div>

        {/* Track your listings */}
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 text-center max-w-xs">
          <div className="bg-[#ffc00c] p-4 rounded-full">
            <FaTools className="text-6xl text-[#013c6c]" />
            
          </div>
          <p className="text-lg mt-4">
            Tenant screening tools that perform background checks, credit checks, and rental history reviews.
          </p>
          <b className="m-5">COMING SOON</b>
        </div>


      </div>
    </>
  )
}