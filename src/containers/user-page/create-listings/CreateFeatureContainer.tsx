import debounce from "lodash.debounce";
import { Listing } from "@/types";


interface Props {
    listingValues: Listing;
    setListingValues: (listingValues: Listing) => void;
}

export default function CreateFeatureContainer({listingValues, setListingValues} : Props) {
    
  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Narrow the type for checkboxes
    const finalValue =
        type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : type === "number"
            ? Number(value)
            : value;

    // Update state
    setListingValues({
        ...listingValues,
        feature: {
            ...listingValues.feature,
            [name]: finalValue,
        },
    });
  };
    
  const debouncedFeatureChange = debounce(handleFeatureChange, 200);

  return (
    <>
      <div className="w-full border-b-4 border-b-[#013c6c]">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-1">Features</h2>
      </div>
      {/* Beds and Baths */}
      <div className="flex flex-col w-full">
        
        <div className="flex flex-row gap-10">

        
          <div className="flex flex-col w-1/3">
            <label className="text-gray-700 font-medium mb-1" htmlFor="feature.bed">Beds</label>
            <input
              type="number"
              name="bed_count"
              placeholder="0"
              onChange={debouncedFeatureChange}
              className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="flex flex-col w-1/3">
            <label className="text-gray-700 font-medium mb-1" htmlFor="feature.bath">Baths</label>
            <input
              type="number"
              name="bath_count"
              placeholder="0"
              onChange={debouncedFeatureChange}
              className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
        </div>

        {/* Roommate Gender */}
        <div className="flex flex-col w-full mt-4">
            <label className="text-gray-700 font-medium mb-1" htmlFor="roommate_gender">Preferred Roommate Gender (optional)</label>
            <select
                name="roommate_gender"
                onChange={debouncedFeatureChange}
                className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
                <option value="any">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>

        {/* Room Type */}
        <div className="flex flex-col w-full mt-4">
            <label className="text-gray-700 font-medium mb-1" htmlFor="roommate_gender">Preferred Room Type (optional)</label>
            <select
                name="room_type"
                onChange={debouncedFeatureChange}
                className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
                <option value="any">Any</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="triple">Triple</option>
            </select>
        </div>
        

        {/* Description */}
        <div className="flex flex-col w-full mt-4">
            <label className="text-gray-700 font-medium mb-1" htmlFor="description">Description</label>
            <textarea
                name="description"
                rows={4}
                placeholder="Write a description..."
                onChange={debouncedFeatureChange}
                className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
        </div>

        {/* Policies */}
        <div className="flex flex-col w-full mt-4">
            <label className="text-gray-700 font-medium mb-1" htmlFor="policies">Policies</label>
            <textarea
                name="policies"
                rows={4}
                placeholder="Explain any policies that apply..."
                onChange={debouncedFeatureChange}
                className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
        </div>

      </div>
    </>
  );
}