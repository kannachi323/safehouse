import FiltersContainer from "@/containers/rentals-page/FiltersContainer"
import ListingsContainer from "@containers/rentals-page/ListingsContainer"
import MapsContainer from "@containers/rentals-page/MapsContainer"

export default function Rent() {
    return (
        <>
          <div className="flex flex-col">
            <FiltersContainer />

            {/* content section */}
            <div className="flex flex-row">
              <MapsContainer />
              <ListingsContainer />
            </div>
              
          </div>
          <div className="flex">
              
          </div>
      
      
        </>
        
    )
}