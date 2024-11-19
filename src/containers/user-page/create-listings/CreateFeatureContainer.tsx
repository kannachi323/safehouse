import debounce from "lodash.debounce";
import { Listing } from "@/types";


interface Props {
    listingValues: Listing;
    setListingValues: (listingValues: Listing) => void;
}

export default function CreateFeatureContainer({listingValues, setListingValues} : Props) {
    const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
  
        setListingValues({
          ...listingValues,
          feature: {
            ...listingValues.feature,
            [name]: value === "" ? 0 : Number(value),
          },
        });
    };
      
    const debouncedFeatureChange = debounce(handleFeatureChange, 200);

  return (
    <>
      <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">Feature Info</h2>
      {/* Beds and Baths */}
      <div className="flex items-center justify-start w-full gap-4">
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
    </>
  );
}