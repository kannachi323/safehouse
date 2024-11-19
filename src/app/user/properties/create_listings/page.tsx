'use client'
import CreateListingContainer from "@/containers/user-page/create-listings/CreateListingContainer";
import CreateFeatureContainer from "@/containers/user-page/create-listings/CreateFeatureContainer";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "@/contexts/AuthContext";
import { ListingContentCard } from "@/components/Cards"
import { useRouter } from "next/navigation";
import { Listing } from "@/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [listingValues, setListingValues] = useState<Listing>({
    price: 0.00,
    address: '',
    city: '',
    state: '',
    zip_code: '',
    uid: '',
    latitude: 0,
    longitude: 0,
    feature: {}
  });
  

  const { user } = useAuth();
  const router = useRouter();

  //as soon as we have a verified user, we can update the listingValues 
  useEffect(() => {
    if (user && user.uid) {
      setListingValues((prevValues) => ({
        ...prevValues,
        uid: user.uid,  // Update the uid in listingValues
      }));
    }
  }, [user]);  // Run the effect when the user object changes





  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(listingValues));

    try {
      
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingValues),
      });

      if (!response.ok) {
        console.log("Something went wrong with adding a new listing");
        return;
      }
      console.log("New listing created");
      router.replace("/user/properties")
    } catch (error) {
      console.error("Error during the server request:", error);
    }
  };

  return (
      <>
        <div className="relative flex items-center justify-between h-[10vh] px-8 bg-gray-50 shadow-lg rounded-md">
          <Link href="/user/properties">
            <div className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
              <IoMdClose className="text-3xl text-gray-600 hover:text-gray-800 cursor-pointer" />
            </div>
          </Link>
          
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-gray-700 px-4 py-2 rounded-md">
            Create a New Listing
          </h1>

          <button className="text-lg font-medium text-white px-4 py-2 rounded-full hover:bg-blue-700 shadow-md focus:outline-none">
            Save and Exit
          </button>
        </div>

        <div className="relative flex flex-row h-[90vh]">
          {/* Left Column */}
          <div className="flex flex-col justify-evenly items-center w-1/2 h-full">
            {/* TODO: add dots to showcase where in form the user is */}
            
            <ListingContentCard
              className="flex flex-col rounded-lg border-2 border-gray-300 shadow-lg w-[80%] h-2/3"
              listing={listingValues}
            />
          
            <div className="flex flex-row justify-evenly items-center w-full">
              
              <button
                className="w-1/5 bg-blue-600 text-white py-2 rounded-full 
                  hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                Show Preview
              </button> 
              <button
                form="listing-form"
                type="submit"
                className="w-1/5 bg-blue-600 text-white py-2 rounded-full 
                  hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                Publish
              </button> 


            </div>
            
          </div>
          
          {/* Right Column */}
          <div className="relative flex flex-col items-center h-full w-1/2 overflow-y-scroll">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-2 rounded-3xl w-[60%] min-h-full" id="listing-form" autoComplete="off">
              <CreateListingContainer listingValues={listingValues} setListingValues={setListingValues} />
              <CreateFeatureContainer listingValues={listingValues} setListingValues={setListingValues} />

            </form>
          
          </div>
          

        </div>
      </>
  )
}

