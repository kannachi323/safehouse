import { useState, useEffect } from "react";
import { Filters } from "@/types";

interface FilterDropdownProps {
    filters: Filters;
    setFilters: (filter: Filters | ((prevFilters: Filters) => Filters)) => void;
}
  

export function BedBathFilters({filters, setFilters} : FilterDropdownProps) {
    

    // State for tracking bed and bath input values
    const [bed, setBed] = useState<number | undefined>(filters.bed_count);
    const [bath, setBath] = useState<number | undefined>(filters.bath_count);

    useEffect(() => {
        setBed(filters.bed_count);
        setBath(filters.bath_count);
    }, [filters.bed_count, filters.bath_count]);

   
    // Function to handle updating filters when Apply button is clicked
    function handleBedBathFilters() {
        // No need to query DOM, just use the state values
        console.log(bath, bed); // Log the values to ensure they're correct
  
        setFilters({
            ...filters,  // Retain other filters in the state
            bed_count: bed,  // Update only bedCount
            bath_count: bath,  // Update only bathCount
        });
    }
  
    return (
        <div className="flex flex-col rounded-md">
            <b className="text-base px-5 py-3 mb-3 bg-slate-100 rounded-md">Number of Bathrooms</b>
            <label className="text-gray-700 font-medium px-5" htmlFor="feature.bath">Baths</label>
            <input
                type="number"
                name="bath"
                placeholder="0"
                value={bath || ""} 
                onChange={(e) => setBath(e.target.value ? parseInt(e.target.value) : undefined)} 
                className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-1/3 ml-5 mb-2"
                required
                min={0}
            />
            <b className="text-base px-5 py-3 my-3 bg-slate-100 rounded-md">Number of Bedrooms</b>
            <label className="text-gray-700 font-medium px-5" htmlFor="feature.bed">Beds</label>
            <input
                type="number"
                name="bed"
                placeholder="0"
                value={bed || ""} 
                onChange={(e) => setBed(e.target.value ? parseInt(e.target.value) : undefined)} 
                className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-1/3 ml-5 mb-5"
                required
                min={0}
            />
  
            <button 
                className="self-center text-md text-white bg-[#023c6c] w-1/2 rounded-full py-2 m-5"
                onClick={handleBedBathFilters}
                action-attr="close"
            >
                Apply
            </button>
        </div>
    );
  }
  
  export function PriceFilters({ filters, setFilters }: FilterDropdownProps) {
    const [minPrice, setMinPrice] = useState<number | undefined>(filters.min_price || undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(filters.max_price || undefined);

    useEffect(() => {
        setMinPrice(filters.min_price);
        setMaxPrice(filters.max_price);
    }, [filters.min_price, filters.max_price]);
  

    function handlePriceFilters() {
        setFilters({
            ...filters,
            min_price: minPrice,
            max_price: maxPrice
        });
    }

    return (
        <div className="flex flex-col w-full rounded-md">
            <b className="text-lg px-3 py-2 bg-slate-100 rounded-md mb-4">Price Range</b>
          
            <div className="flex flex-row items-center justify-between gap-4 px-4">
                {/* Min Price Input */}
                <div className="flex flex-col w-1/2">
                    <label className="text-gray-700 font-medium mb-2" htmlFor="min-price">
                        Min Price
                    </label>
                    <input
                        type="number"
                        id="min-price"
                        placeholder="0"
                        value={minPrice || ""}
                        onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value) : undefined)}
                        className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full"
                        min={0}
                    />
                </div>
                <span className="mt-7">-</span>

                {/* Max Price Input */}
                <div className="flex flex-col w-1/2">
                    <label className="text-gray-700 font-medium mb-2" htmlFor="max-price">
                        Max Price
                    </label>
                    <input
                        type="number"
                        id="max-price"
                        placeholder="0"
                        value={maxPrice || ""}
                        onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : undefined)}
                        className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full"
                        min={0}
                    />
                </div>
            </div>

            {/* Apply Button */}
            <button
                className="self-center text-md text-white bg-[#023c6c] w-1/3 rounded-full py-2 mt-6 mb-3"
                onClick={handlePriceFilters}
                action-attr="close"
            >
                Apply
            </button> 
        </div>
    );
}

export function MoreFilters({ filters, setFilters } : FilterDropdownProps) {
  const [maxDistance, setMaxDistance] = useState<number | undefined>();
  const [minSqft, setMinSqft] = useState<number | undefined>();
  const [maxSqft, setMaxSqft] = useState<number | undefined>();

  useEffect(() => {
    setMaxDistance(filters.max_distance);
    
  
  }, [filters.max_distance]);

  function handleMoreFilters() {
    setFilters({
        ...filters,
        max_distance: maxDistance
    });
}
  

  return (
    <div className="flex flex-col justify-evenly w-full rounded-md">
      <b className="text-lg px-3 py-2 bg-slate-100 rounded-md mb-4">Distance from School (COMING SOON)</b>
      <div className="flex flex-row items-center justify-between gap-4 px-4 mb-4">
          <input
              type="number"
              id="max-distance"
              placeholder="Max"
              value={maxDistance|| ""}
              onChange={(e) => setMaxDistance(e.target.value ? parseInt(e.target.value) : undefined)}
              className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full"
              min={0}
          />
          
      </div>
      
      <b className="text-lg px-3 py-2 bg-slate-100 rounded-md mb-4">Square Feet (COMING SOON)</b>
      <div className="flex flex-row items-center justify-between gap-4 px-4 mb-4">
          <input
              type="number"
              id="min-sqft"
              placeholder="Min"
              value={minSqft || ""}
              onChange={(e) => setMinSqft(e.target.value ? parseInt(e.target.value) : undefined)}
              className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full"
              min={0}
          />
          <span>-</span>
          <input
              type="number"
              id="max-sqft"
              placeholder="Max"
              value={maxSqft || ""}
              onChange={(e) => setMaxSqft(e.target.value ? parseInt(e.target.value) : undefined)}
              className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-full"
              min={0}
          />
      </div>


      <b className="text-lg px-3 py-2 bg-slate-100 rounded-md mb-4">Other</b>
      <div className="flex flex-row justify-start items-center gap-4 px-4 mb-4">
        <p className="text-gray-700 font-medium">Room Type</p>
        <select className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-1/3">
          <option value="Any">Any</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Triple">Triple</option>
        </select>
      </div>
      <div className="flex flex-row justify-start items-center gap-4 px-4 mb-4">
        <p className="text-gray-700 font-medium">Roommate Gender</p>
        <select className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300 w-1/3">
          <option value="Any">Any</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
        </select>
          
      </div>
      {/* Apply Button */}
      <button
        className="self-center text-md text-white bg-[#023c6c] w-1/3 rounded-full py-2 mt-6 mb-3"
        onClick={handleMoreFilters}
        action-attr="close"
        >
            Apply
      </button> 
    </div>
  )
}
