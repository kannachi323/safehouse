'use client'
import CreateInfoContainer from "@/containers/user-page/CreateInfoContainer";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Listing, ListingContentCard } from "@/components/Cards";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";

export default function Page() {
    const [listingValues, setListingValues] = useState<Listing>({
      uid: '',
      prices: '',
      address: '',
      city: '',
      state_code: '',
      zipcode: '',
      feature: {
        bed: 0,
        bath: 0
      }
    });

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user?.uid) {
        setListingValues((prevValues) => ({
          ...prevValues,
          uid: user.uid,
        }));
      }
    }, [user]);

    const handleListingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setListingValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };

    const debouncedListingChange = debounce(handleListingChange, 200);

    const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setListingValues((prevValues) => ({
        ...prevValues,
        feature: {
          ...prevValues.feature,
          [name]: value === "" ? 0 : Number(value), // Default to 0 if empty
        },
      }));
    };
    
    const debouncedFeatureChange = debounce(handleFeatureChange, 200);

    const handleSubmit = async (e : React.FormEvent) => {
      e.preventDefault();
      console.log(JSON.stringify(listingValues));

      try {
        const response = await fetch('/api/db/listings', {
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
        router.push("/user/properties/my-listings")
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

            <button className="text-lg font-medium bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 shadow-md focus:outline-none">
              Save and Exit
            </button>
          </div>

          <div className="relative flex flex-row bg-blue-500 h-[90vh]">
            {/* Left Column */}
            <div className="flex flex-col justify-evenly items-center w-1/2 h-full">
              <ListingContentCard
                className="flex flex-col rounded-lg border-2 border-gray-300 shadow-lg w-[80%]"
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
            <div className="relative flex flex-col items-center h-full w-1/2 overflow-y-scroll bg-red-50">
            
              <CreateInfoContainer
                onFeatureChange={debouncedFeatureChange}
                onListingChange={debouncedListingChange}
                onSubmit={handleSubmit}
              />
            
            </div>
            

          </div>
        </>
    )
}

