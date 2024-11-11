'use client'
import STATES from '@utils/states.json';

interface Props {
  onListingChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFeatureChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CreateInfoContainer({onListingChange, onFeatureChange, onSubmit} : Props) {
  

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col justify-center gap-2 rounded-3xl w-[60%] min-h-full" id="listing-form">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">Property Info</h2>
        {/* Price */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1" htmlFor="prices">Price (per month)</label>
          <input
            
            type="text"
            name="prices"
            placeholder="$0.00"
            onChange={onListingChange}  
            className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1" htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            placeholder="123 Main St"
            onChange={onListingChange}  
            className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1" htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={onListingChange}  
            className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* State */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1" htmlFor="state">State</label>
          <select
            className="border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
            name="state_code"
            onChange={onListingChange}  
            required
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
            onChange={onListingChange}  
            className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Beds and Baths */}
        <div className="flex items-center justify-start w-full gap-4">
          <div className="flex flex-col w-1/3">
            <label className="text-gray-700 font-medium mb-1" htmlFor="feature.bed">Beds</label>
            <input
              type="number"
              name="bed"
              placeholder="0"
              onChange={onFeatureChange}
              className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="flex flex-col w-1/3">
            <label className="text-gray-700 font-medium mb-1" htmlFor="feature.bath">Baths</label>
            <input
              type="number"
              name="bath"
              placeholder="0"
              onChange={onFeatureChange}
              className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
        </div>
      </form>
    </>
  );
}
