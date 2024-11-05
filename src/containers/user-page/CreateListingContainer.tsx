'use client'
import { MdAdd } from "react-icons/md";
import { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { ListingContentCard } from "@/components/Cards";
import { Listing } from "@components/Cards";
import debounce from 'lodash.debounce';
import { IoMdArrowRoundBack } from "react-icons/io";
import STATES from '@utils/states.json'


export default function CreateListingContainer() {
  const [showContent, setShowContent] = useState(false);

  const [listingValues, setListingValues] = useState<Listing>({
    prices: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    features: '',
    id: 0,
  });

  const [debouncedValues, setDebouncedValues] = useState<Listing>(listingValues);

  const updateDebouncedValues = debounce((values: Listing) => setDebouncedValues(values), 500);

  useEffect(() => {
    updateDebouncedValues(listingValues);
  }, [listingValues, updateDebouncedValues]);

  useEffect(() => {
    return () => {
      updateDebouncedValues.cancel();
    };
  }, [updateDebouncedValues]);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setListingValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    return 'blah';
  };

  return showContent ? (
    <> 
      <IoMdArrowRoundBack className="text-5xl text-black m-2 hover:text-[#3d3c3c] cursor-pointer" onClick={() => setShowContent(!showContent)} />
      <div className="flex flex-row justify-center items-center w-full h-full text-3xl gap-20">
        <ListingContentCard
          className="flex flex-col w-2/5 h-[70%] rounded-lg border-2 border-[#013c6c]"
          listing={debouncedValues}
        />

        <div className="flex flex-col justify-center items-center text-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                name="prices"
                placeholder="Price"
                value={listingValues.prices}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <p>/mo</p>
            </div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={listingValues.address}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={listingValues.city}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <select
              className="border rounded p-2"
              name="state"
              value={listingValues.state}
              onChange={handleChange}
            >
              <option value="">--Choose a State--</option>
              {Object.entries(STATES).map(([stateName, abbreviation]) => (
                <option key={abbreviation} value={abbreviation}>
                  {stateName}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              value={listingValues.zipcode}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded mt-4"
            >
              Save Listing
            </button>
          </form>
        </div>
      </div>
    </>
  ) : (
    <div
      className="flex flex-col justify-center items-center bg-red-500 w-1/3 h-1/2 m-5 text-3xl rounded-3xl"
      onClick={() => setShowContent(!showContent)}
    >
      Create a new listing
      <MdAdd className="text-3xl" />
    </div>
  );
}
