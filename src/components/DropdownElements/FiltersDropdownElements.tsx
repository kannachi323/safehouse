import { useState } from "react";
import { useQuery } from "@/contexts/QueryContext";

export function BedBathFilters() {
    const { setFilters, filters } = useQuery();

    // State for tracking bed and bath input values
    const [bed, setBed] = useState<number | undefined>(filters.bedCount);
    const [bath, setBath] = useState<number | undefined>(filters.bathCount);

    // Function to handle updating filters when Apply button is clicked
    function handleBedBathFilters() {
        // No need to query DOM, just use the state values
        console.log(bath, bed); // Log the values to ensure they're correct

        setFilters({
            ...filters,  // Retain other filters in the state
            bedCount: bed,  // Update only bedCount
            bathCount: bath,  // Update only bathCount
        });
    }

    return (
        <div className="flex flex-col justify-between">
            <b className="text-base px-5 py-3 my-3 bg-slate-100">Number of Bathrooms</b>
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
            <b className="text-base px-5 py-3 my-3 bg-slate-100">Number of Bedrooms</b>
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
            >
                Apply
            </button>
        </div>
    );
}
