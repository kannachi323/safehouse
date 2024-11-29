'use client'
import { Listing } from '@/types';
import STATES from '@utils/states.json';
import debounce from "lodash.debounce";

interface Props {
  listingValues: Listing;
  setListingValues: (listingValues: Listing) => void;

}

export default function CreateListingContainer({listingValues, setListingValues} : Props) {
 

  const handleListingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const updatedValue = name === 'price' || name === 'latitude' || name === 'longitude'
    ? parseFloat(value) || 0  // Use parseFloat for float numbers, and fallback to 0 if invalid
    : value;

    setListingValues({
      ...listingValues,
      [name]: updatedValue,
    });
  };

  const debouncedListingChange = debounce(handleListingChange, 200);

  return (
    <>
      <div className="w-full border-b-4 border-b-[#013c6c]">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-1">Property</h2>
      </div>
      {/* Price */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1" htmlFor="prices">Price (per month)</label>
        <input
          type="text"
          name="price"
          placeholder="$0.00"
          onChange={debouncedListingChange}  
          className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
          autoComplete="off"
        />
      </div>

      {/* Address */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1" htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          placeholder="123 Main St"
          onChange={debouncedListingChange}  
          className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
          autoComplete="new-address"
        />
      </div>

      {/* City */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1" htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={debouncedListingChange}  
          className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
          autoComplete="new-city"
        />
      </div>

      {/* State */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1" htmlFor="state">State</label>
        <select
          className="border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
          name="state"
          onChange={debouncedListingChange}  
          required
          autoComplete="new-state"
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
          name="zip_code"
          placeholder="ZIP code"
          onChange={debouncedListingChange}  
          className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
          autoComplete="new-zipcode"
        />
      </div>
    </>
  );
}
