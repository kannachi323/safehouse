'use client'
import CreateListingContainer from "@/containers/user-page/create-listings/CreateListingContainer";
import CreateFeatureContainer from "@/containers/user-page/create-listings/CreateFeatureContainer";
import CreateMediaContainer from "@/containers/user-page/create-listings/CreateMediaContainer";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ListingContentCard, ListingFullDetailsCard } from "@/components/Cards"
import { useRouter } from "next/navigation";
import { Listing } from "@/types";
import { useEffect, useState } from "react";
import UserManagerContainer from "@/containers/user-page/UserManagerContainer";


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
    feature: {},
    media: [],
  });
  const [togglePreview, setTogglePreview] = useState(false);
  

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
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listings`, {
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
      alert('Listing added successfully!');
      router.replace("/user/properties")
      

    } catch (error) {
      console.error("Error during the server request:", error);
    }
      
  };

  async function handleTogglePreview() {
    if (!listingValues.address || !listingValues.city || !listingValues.state || !listingValues.zip_code) {
      alert("Please fill in address, city, state, and zip code");
      return;
    }
    const place = listingValues.address + ' ' + listingValues.city + ', ' + listingValues.state + ' ' + listingValues.zip_code;
   
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/geocode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ place }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch coordinates');
    }
  
    const coordinates = await response.json();
    console.log(coordinates); // Should log the coordinates


    setListingValues({
      ...listingValues,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    })
    
    setTogglePreview(!togglePreview);
  }

  return (
      <UserManagerContainer node="properties">
        <div className="h-full w-4/5">
        
        
        <div id="header" className="relative flex items-center justify-between h-[10vh] px-8 bg-gray-50 shadow-lg rounded-md">
         
          {/* Breadcrumb Section */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center text-gray-700 space-x-2">
            <Link href="/user/properties" className="hover:underline">
              <span className="text-xl font-semibold">Properties</span>
            </Link>
            <span className="text-xl">{'>'}</span> {/* Separator */}
            <span className="text-xl font-semibold text-[#fdc100]">Create Listing</span>
          </div>

          {/* Save and Exit Button */}
          <button className="text-lg font-medium bg-[#013c6c] text-white px-4 py-2 rounded-full shadow-md focus:outline-none">
            Save and Exit
          </button>

          <button
            form="listing-form"
            type="submit"
            className="text-lg font-medium px-10 py-2 bg-[#fdc100] text-[#013c6c] rounded-full"
            >
            Publish
          </button> 
        </div>

          <div className="relative flex flex-row h-[90vh]">
            {/* popup container for the listing preview */}
            {togglePreview && 
              <ListingFullDetailsCard className="fixed flex flex-row bg-white rounded-lg p-10 gap-x-8 z-[99]" listing={listingValues} 
              onClose={() =>setTogglePreview(false)} preview={true} />
            }

            {/* Left Column */}
            <div className="flex flex-col justify-evenly items-center w-1/2 h-full">
              {/* TODO: add dots to showcase where in form the user is */}
              
              <ListingContentCard
                animate={false}
                className="flex flex-col rounded-lg border-2 border-gray-300 shadow-lg w-[80%] h-2/3"
                listing={listingValues}
              />
            
              <div className="flex flex-row justify-evenly items-center w-full">
                
                <button onClick={handleTogglePreview}
                  className="p-5 py-3 bg-[#013c6c] text-white rounded-full">
                  Show Preview
                </button> 
               


              </div>
              
            </div>
            
            {/* Right Column */}
            <div className="relative flex flex-col items-center w-1/2 overflow-y-scroll py-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 rounded-3xl w-[90%] overflow-y-auto px-5 pb-2" id="listing-form" autoComplete="off">
                <CreateMediaContainer listingValues={listingValues} setListingValues={setListingValues} />
                <CreateListingContainer listingValues={listingValues} setListingValues={setListingValues} />
                
                <CreateFeatureContainer listingValues={listingValues} setListingValues={setListingValues} />
                
              </form>
            
            </div>
            

          </div>
        </div>
      </UserManagerContainer>
  )
}

