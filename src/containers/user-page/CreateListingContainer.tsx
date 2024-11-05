'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useState, ChangeEvent } from 'react';
import { ListingContentCard } from "@/components/Cards";
import { Listing } from "@components/Cards";
import { IoMdArrowRoundBack } from "react-icons/io";
import STATES from '@utils/states.json';
import Link from "next/link";

export default function CreateListingContainer() {
  // Call hooks at the top level without conditions
  const { user } = useAuth();
  const [showContent, setShowContent] = useState(false);
  const [listingValues, setListingValues] = useState<Listing>({ uid: user?.uid ?? "" });

  if (!user) {
    return null; // Return null if there's no user
  }

  const handleFeatureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setListingValues((prevValues) => ({
      ...prevValues,
      feature: {
        ...prevValues.feature,
        [name]: value === "" ? "" : Number(value),
      },
    }));
  };

  const handleListingChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setListingValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(listingValues));

    try {
      const response = await fetch("/api/db/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingValues),
      });
      if (!response.ok) {
        console.log("something went wrong with adding a new listing");
        return;
      }

      console.log("new listing created");
    } catch (error) {
      console.log(error, "some server stuff went wrong idk");
    }
  };

  return (
    <>
      <Link href="/user/properties">
        <IoMdArrowRoundBack
          className="text-4xl text-gray-600 hover:text-gray-800 m-4 cursor-pointer"
          onClick={() => setShowContent(!showContent)}
        />
      </Link>
      <div className="flex flex-row justify-around items-start w-full h-full p-8 gap-10 text-lg">
        <ListingContentCard
          className="flex flex-col w-1/2 h-auto rounded-lg border-2 border-gray-300 shadow-lg"
          listing={listingValues}
        />

        <div className="flex flex-col justify-start items-center text-lg w-1/3">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create a New Listing</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {/* Price */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1" htmlFor="prices">Price (per month)</label>
              <input
                type="text"
                name="prices"
                placeholder="$0.00"
                value={listingValues.prices}
                onChange={handleListingChange}
                className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1" htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                placeholder="123 Main St"
                value={listingValues.address}
                onChange={handleListingChange}
                className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1" htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={listingValues.city}
                onChange={handleListingChange}
                className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* State */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1" htmlFor="state">State</label>
              <select
                className="border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
                name="state"
                value={listingValues.state_code}
                onChange={handleListingChange}
              >
                <option value="">--Choose a State--</option>
                {Object.entries(STATES).map(([stateName, abbreviation]) => (
                  <option key={abbreviation} value={abbreviation}>
                    {stateName}
                  </option>
                ))}
              </select>
            </div>

            {/* Zipcode */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1" htmlFor="zipcode">ZIP Code</label>
              <input
                type="text"
                name="zipcode"
                placeholder="ZIP code"
                value={listingValues.zipcode}
                onChange={handleListingChange}
                className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Beds and Baths */}
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex flex-col w-1/2">
                <label className="text-gray-700 font-medium mb-1" htmlFor="feature.bed">Beds</label>
                <input
                  type="number"
                  name="bed"
                  placeholder="0"
                  value={listingValues.feature?.bed ?? ""}
                  onChange={handleFeatureChange}
                  className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="flex flex-col w-1/2">
                <label className="text-gray-700 font-medium mb-1" htmlFor="feature.bath">Baths</label>
                <input
                  type="number"
                  name="bath"
                  placeholder="0"
                  value={listingValues.feature?.bath ?? ""}
                  onChange={handleFeatureChange}
                  className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded mt-6 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Save Listing
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
